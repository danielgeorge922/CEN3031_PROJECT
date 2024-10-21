import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from schema import UserBase, UserRegister, UserLogin
from crud import create_user, get_user_by_email
from app.main import get_db
from core.security import verify_password


router = APIRouter()


@router.post("/register", response_model=UserBase)
def register_user(user: UserRegister, db: Session = Depends(get_db)):
    db_obj = create_user(db, user)
    return db_obj

@router.post("/login", response_model=UserBase)
def login_user(user: UserLogin, db: Session = Depends(get_db)):
    db_obj = get_user_by_email(db, user.email)
    if not db_obj:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(user.password, db_obj.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    return db_obj
