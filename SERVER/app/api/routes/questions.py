from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import EmailStr
from typing import List

from app.schema import *
from app.db.models import Question, Answer, User, Like, Dislike
from app.main import get_db
from app.api.dependencies import get_current_user
from app.crud import add_point_to_user, like_answer, dislike_answer, undislike_answer, unlike_answer

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
    
    add_point_to_user(current_user.id, db)
    
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
def create_answer(question_id: int, answer: AnswerBase, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    db_answer = Answer(
        text=answer.text,
        question_id=question_id,
        user_id=current_user.id
    )
    db.add(db_answer)
    db.commit()
    db.refresh(db_answer)
    
    add_point_to_user(current_user.id, db)
    
    return db_answer

@router.put("/answers/{answer_id}/like", status_code=200)
def like_answer_route(answer_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    existing_like = db.query(Like).filter(Like.answer_id == answer_id, Like.user_id == current_user.id).first()
    if existing_like:
        raise HTTPException(status_code=400, detail="User has already liked this answer")
    
    existing_dislike = db.query(Dislike).filter(Dislike.answer_id == answer_id, Dislike.user_id == current_user.id).first()
    if existing_dislike:
        db.delete(existing_dislike)
    
    like_answer(answer_id, current_user.id, db)
    return {"message": "Answer liked successfully"}

@router.put("/answers/{answer_id}/dislike", status_code=200)
def dislike_answer_route(answer_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    existing_dislike = db.query(Dislike).filter(Dislike.answer_id == answer_id, Dislike.user_id == current_user.id).first()
    if existing_dislike:
        raise HTTPException(status_code=400, detail="User has already disliked this answer")
    
    existing_like = db.query(Like).filter(Like.answer_id == answer_id, Like.user_id == current_user.id).first()
    if existing_like:
        db.delete(existing_like)
    
    dislike_answer(answer_id, current_user.id, db)
    return {"message": "Answer disliked successfully"}

@router.put("/answers/{answer_id}/unlike", status_code=200)
def unlike_answer_route(answer_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    unlike_answer(answer_id, current_user.id, db)
    return {"message": "Answer unliked successfully"}

@router.put("/answers/{answer_id}/undislike", status_code=200)
def undislike_answer_route(answer_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    undislike_answer(answer_id, current_user.id, db)
    return {"message": "Answer undisliked successfully"}

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

@router.get("/questions/{question_id}/answers", response_model=List[AnswerRead])
def get_answers_by_question(question_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    answers = db.query(Answer).filter(Answer.question_id == question_id).all()
    result = []
    for answer in answers:
        likes_count = db.query(Like).filter(Like.answer_id == answer.id).count()
        dislikes_count = db.query(Dislike).filter(Dislike.answer_id == answer.id).count()
        liked_by_user = db.query(Like).filter(Like.answer_id == answer.id, Like.user_id == current_user.id).first() is not None
        disliked_by_user = db.query(Dislike).filter(Dislike.answer_id == answer.id, Dislike.user_id == current_user.id).first() is not None
        result.append({
            "id": answer.id,
            "question_id": answer.question_id,
            "user_id": answer.user_id,
            "text": answer.text,
            "likes": likes_count,
            "dislikes": dislikes_count,
            "liked_by_user": liked_by_user,
            "disliked_by_user": disliked_by_user
        })
    return result

@router.get("/answers/{answer_id}/liked", status_code=200)
def check_if_liked(answer_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    existing_like = db.query(Like).filter(Like.answer_id == answer_id, Like.user_id == current_user.id).first()
    if existing_like:
        return {"liked": True}
    return {"liked": False}

@router.get("/answers/{answer_id}/disliked", status_code=200)
def check_if_disliked(answer_id: int, db: Session = Depends(get_db), current_user: UserBase = Depends(get_current_user)):
    existing_dislike = db.query(Dislike).filter(Dislike.answer_id == answer_id, Dislike.user_id == current_user.id).first()
    if existing_dislike:
        return {"disliked": True}
    return {"disliked": False}
