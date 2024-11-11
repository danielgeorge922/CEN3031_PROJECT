from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends
from app.db.models import User
import jwt

from pydantic import EmailStr

from app.schema import UserLog, UserCreate, UserBase
from app.core.security import verify_password, get_password_hash, oauth2_scheme, ALGORITHM
from app.core.config import ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY

def create_user(db: Session, user_create: UserCreate):
    db_obj = User(
        email=user_create.email,
        hashed_password=get_password_hash(user_create.password),
        first_name=user_create.first_name,
        last_name=user_create.last_name
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj

def get_user_by_email(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()