from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.db.database import get_db, Base, engine
from app.api.main import api_router
from app.api.routes.classes import router as classes_router

app = FastAPI()

origins = ['http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],    
)

app.include_router(api_router, dependencies=[Depends(get_db)])

api_router.include_router(questions.router, prefix="/questions", tags=["questions"])

api_router.include_router(answers.router, prefix="/answers", tags=["answers"])