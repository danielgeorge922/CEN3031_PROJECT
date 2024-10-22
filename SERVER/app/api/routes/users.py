import uuid
from typing import Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.schema import UserBase, UserLog
from app.crud import create_user, get_user_by_email
from app.main import get_db
from app.core.security import verify_password


router = APIRouter()


@router.post("/register", response_model=UserBase)
def register_user(user: UserLog, db: Session = Depends(get_db)):
    if get_user_by_email(db, user.email):
        raise HTTPException(status_code=400, detail="User already registered")
    else:
        return create_user(db, user)
    

@router.post("/login", response_model=UserBase)
def login_user(user: UserLog, db: Session = Depends(get_db)):
    db_obj = get_user_by_email(db, user.email)
    if not db_obj:
        raise HTTPException(status_code=404, detail="User not found")
    if not verify_password(user.password, db_obj.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect password")
    return db_obj
