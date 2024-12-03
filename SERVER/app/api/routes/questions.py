from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import EmailStr
from typing import List

from app.schema import QuestionCreate, QuestionRead, AnswerCreate, AnswerRead, UserBase, QuestionWithAnswerCreate
from app.db.models import Question, Answer, User
from app.main import get_db
from app.api.dependencies import get_current_user

router = APIRouter()

@router.post("/questions", response_model=QuestionRead)
def create_question(question: QuestionCreate, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    db_question = Question(
        title=question.title,
        text=question.text,
        class_id=question.class_id,
        user_id=current_user.id
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)
    return db_question

@router.get("/user/questions", response_model=List[QuestionRead])
def get_user_questions(db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    user = db.query(User).filter(User.email == current_user.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    questions = db.query(Question).filter(Question.class_id.in_([class_.id for class_ in user.classes])).all()
    return questions

@router.get("/{class_id}/questions", response_model=List[QuestionRead])
def get_questions_by_class(class_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    questions = db.query(Question).filter(Question.class_id == class_id).all()
    return questions

@router.post("/questions/{question_id}/answers", response_model=AnswerRead)
def create_answer(question_id: int, answer: AnswerCreate, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    db_answer = Answer(
        text=answer.text,
        question_id=question_id,
        user_id=current_user.id
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    return db_answer

@router.post("/questions_with_answer", response_model=QuestionRead)
def create_question_with_answer(question_with_answer: QuestionWithAnswerCreate, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    db_question = Question(
        title=question_with_answer.title,
        text=question_with_answer.text,
        class_id=question_with_answer.class_id,
        user_id=current_user.id
    )
    db.add(db_question)
    db.commit()
    db.refresh(db_question)

    db_answer = Answer(
        text=question_with_answer.answer_text,
        question_id=db_question.id,
        user_id=current_user.id
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)

    return db_question

@router.get("/questions/{question_id}/answers", response_model = List[AnswerRead])
def get_answers_by_question(question_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    answers = db.query(Answer).filter(Answer.question_id == question_id).all()
    return answers
