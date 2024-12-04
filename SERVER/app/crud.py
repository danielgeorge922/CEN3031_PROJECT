from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends
from app.db.models import User, Answer
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

def add_point_to_user(user_id: int, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if user:
        user.user_points += 1
        db.commit()

def like_answer(answer_id: int, user_id: int, db: Session):
    answer = db.query(Answer).filter(Answer.id == answer_id).first()
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    answer.likes += 1
    db.commit()

def dislike_answer(answer_id: int, user_id: int, db: Session):
    answer = db.query(Answer).filter(Answer.id == answer_id).first()
    if not answer:
        raise HTTPException(status_code=404, detail="Answer not found")
    answer.dislikes += 1
    db.commit()