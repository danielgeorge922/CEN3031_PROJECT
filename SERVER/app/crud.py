from sqlalchemy.orm import Session
from fastapi import HTTPException, status, Depends
from app.db.models import User, Question, Answer
import jwt

from pydantic import EmailStr

from app.schema import UserLog, UserCreate, UserBase, QuestionCreate, AnswerCreate
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

def create_question(db: Session, question_create: QuestionCreate, user_email: str):
    db_question = Question(
        title = question_create.title,
        test = question_create.text,
        class_id = question_create.class_id,
        user_email = user_email,
    )

    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

def create_answer(db: Session, answer_create: answerCreate)
    db_answer = Answer(
        content = answer_create.text;
        question_id = answer_create.id
        user_id = answer_create.user_id
    )

    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

