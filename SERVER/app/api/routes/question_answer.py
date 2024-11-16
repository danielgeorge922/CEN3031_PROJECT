from fastapi import APIRouter, Depends HTTPException
from sqlalchemy.orm import Session
from app.schema import *
from app.crud import create_question, create_answer
from app.main import get_db
from app.core.security import get_current_user

router = APIRouter()

@router.post("/questions", response_model = QuestionResponse)
def post_question(
    question: questionCreate,
    db: Session = Depends(get_db),
    current_user: UserBase = Depends(get_current_user)
):
    question.user_id = current_user.id
    
    db_class = db.query(Class).filter(Class.id == question.class_id).first()
    if not db_class:
        raise HTTPException(status_code = 404, detail = "Class not found")

    # creating question
    db_question = create_question(db, question, current_user.id)
    return db_question


@router.post("/answers", response_model = AnswerResponse)
def post_answer(
    answer: answerCreate,
    db: Session = Depends(get_db),
    current_user: UserBase = Depends(get_current_user)
):
    # post question
    answer.user_id = current_user.id
    new_answer = create_answer(db, answer)
    return new_answer

