from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends
from app.db.models import User, Answer, Like, Dislike
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
    existing_like = db.query(Like).filter(Like.answer_id == answer_id, Like.user_id == user_id).first()
    if existing_like:
        raise HTTPException(status_code=400, detail="User has already liked this answer")
    
    new_like = Like(user_id=user_id, answer_id=answer_id)
    db.add(new_like)
    db.commit()

def dislike_answer(answer_id: int, user_id: int, db: Session):
    existing_dislike = db.query(Dislike).filter(Dislike.answer_id == answer_id, Dislike.user_id == user_id).first()
    if existing_dislike:
        raise HTTPException(status_code=400, detail="User has already disliked this answer")
    
    new_dislike = Dislike(user_id=user_id, answer_id=answer_id)
    db.add(new_dislike)
    db.commit()

def unlike_answer(answer_id: int, user_id: int, db: Session):
    like = db.query(Like).filter(Like.answer_id == answer_id, Like.user_id == user_id).first()
    if not like:
        raise HTTPException(status_code=404, detail="Like not found")
    db.delete(like)
    db.commit()

def undislike_answer(answer_id: int, user_id: int, db: Session):
    dislike = db.query(Dislike).filter(Dislike.answer_id == answer_id, Dislike.user_id == user_id).first()
    if not dislike:
        raise HTTPException(status_code=404, detail="Dislike not found")
    db.delete(dislike)
    db.commit()