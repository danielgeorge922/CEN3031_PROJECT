from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.db.models import User

from pydantic import EmailStr

from app.schema import UserLog
from app.core.security import verify_password, get_password_hash



def create_user(db: Session, user_create: UserLog):
    db_obj = User(
        email = user_create.email,
        hashed_password = get_password_hash(user_create.password)
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def get_user_by_email(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()