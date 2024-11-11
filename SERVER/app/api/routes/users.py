from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.schema import *
from app.crud import create_user, get_user_by_email
from app.main import get_db
from app.core.security import verify_password, create_access_token, oauth2_scheme
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM
import jwt


router = APIRouter()

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserBase:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

    user = get_user_by_email(db, email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user

@router.post("/token", response_model=Token)
def create_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = get_user_by_email(db, form_data.username)
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(subject=user.email, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")

@router.post("/register", response_model=Token)
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="User already registered")
    user = create_user(db, user)
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(subject=user.email, expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")

@router.post("/login", response_model=Token)
def login_user(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    return create_token(form_data=form_data, db=db)

@router.get("/me", response_model=UserBase)
def read_users_me(current_user: UserBase = Depends(get_current_user)):
    return current_user