from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from db.models import User

from pydantic import EmailStr

from schema import UserLogin, UserRegister
from core.security import verify_password, get_password_hash



def create_user(db: Session, user_create: UserRegister):
    db_obj = User.model_validate(
        user_create, update={"hashed_password": get_password_hash(user_create.password)}
    )
    db.add(db_obj)
    db.commit()
    db.refresh(db_obj)
    return db_obj


def get_user_by_email(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()

