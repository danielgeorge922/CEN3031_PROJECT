import uuid

from pydantic import EmailStr, BaseModel, Field
from sqlmodel import Relationship
from typing import List, Optional

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
    user_points: int | None = None
    
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
    likes: Optional[int] = 0
    dislikes: Optional[int] = 0
    liked_by_user: Optional[bool] = False
    disliked_by_user: Optional[bool] = False

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

class LikeBase(BaseModel):
    user_id: int
    answer_id: int

class LikeCreate(LikeBase):
    pass

class LikeRead(LikeBase):
    id: int

    class Config:
        orm_mode: True

class DislikeBase(BaseModel):
    user_id: int
    answer_id: int

class DislikeCreate(DislikeBase):
    pass

class DislikeRead(DislikeBase):
    id: int

    class Config:
        orm_mode: True
