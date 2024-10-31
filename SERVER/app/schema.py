import uuid

from pydantic import EmailStr, BaseModel, Field
from sqlmodel import Relationship

class UserBase(BaseModel):
    email: EmailStr     
    
class UserLog(UserBase):
    password: str


class QuestionBase(BaseModel):
    question: str
    
class QuestionCreate(QuestionBase):
    class_code: str
    user: UserBase
    
    