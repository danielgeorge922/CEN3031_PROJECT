import uuid

from pydantic import EmailStr, BaseModel, Field
from sqlmodel import Relationship

class UserBase(BaseModel):
    email: EmailStr 
    username: str
    
class UserLogin(BaseModel):
    email: EmailStr
    password: str
    
    
class UserRegister(UserBase):
    password: str
    