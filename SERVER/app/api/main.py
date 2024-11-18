from fastapi import APIRouter

from app.api.routes import users, questions, classes

api_router = APIRouter()

api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(questions.router, prefix="/questions", tags=["questions"])
api_router.include_router(classes.router, prefix="/classes", tags=["classes"])