import uuid

from pydantic import EmailStr, BaseModel, Field
from sqlmodel import Relationship

class UserBase(BaseModel):
    email: EmailStr     
    
class UserLog(UserBase):
    password: str
    
class UserCreate(UserLog):
    first_name: str
    last_name: str
    
    
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

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: str | None = None
