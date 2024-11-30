import uuid

from pydantic import EmailStr, BaseModel, Field
from sqlmodel import Relationship
from typing import List

class UserBase(BaseModel):
    email: EmailStr     
    
class UserLog(UserBase):
    password: str
    
class UserCreate(UserLog):
    first_name: str
    last_name: str
    
class UserRead(UserBase):
    id: int
    first_name: str
    last_name: str
    
    class Config:
        orm_mode = True
    
class questionBase(BaseModel):
    title: str
    text: str
    
class answerBase(BaseModel):
    text: str
    
class questionCreate(questionBase):
    class_id: int
    answer_id: int | None = None
    
class answerCreate(answerBase):
    question_id: int
    user_id: int

class QuestionBase(BaseModel):
    title: str
    text: str

class QuestionCreate(QuestionBase):
    class_id: int

class QuestionWithAnswerCreate(QuestionBase):
    class_id: int
    answer_text: str

class QuestionRead(QuestionBase):
    id: int
    user_id: int
    class_id: int

    class Config:
        orm_mode: True

class AnswerBase(BaseModel):
    text: str

class AnswerCreate(AnswerBase):
    question_id: int

class AnswerRead(AnswerBase):
    id: int
    question_id: int
    user_id: int

    class Config:
        orm_mode: True

class ClassBase(BaseModel):
    name: str
    description: str | None = None

class ClassCreate(ClassBase):
    pass

class ClassRead(ClassBase):
    id: int

    class Config:
        orm_mode: True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None
