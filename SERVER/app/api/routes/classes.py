from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.schema import ClassCreate, ClassRead, UserBase
from app.db.models import Class, User
from app.main import get_db
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/classes", response_model=ClassRead)
def create_class(class_: ClassCreate, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    db_class = Class(
        name=class_.name,
        description=class_.description
    )
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class

@router.get("/classes", response_model=List[ClassRead])
def get_classes(db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    user = db.query(User).filter(User.email == current_user.email).first()
    return user.classes

@router.post("/classes/{class_id}/join", response_model=ClassRead)
def join_class(class_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    user = db.query(User).filter(User.email == current_user.email).first()
    class_ = db.query(Class).filter(Class.id == class_id).first()
    if not class_:
        raise HTTPException(status_code=404, detail="Class not found")
    user.classes.append(class_)
    db.commit()
    return class_