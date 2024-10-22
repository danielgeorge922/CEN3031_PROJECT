from fastapi import FastAPI, Depends
from app.db.database import get_db, Base, engine
from app.api.main import api_router

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(api_router, dependencies=[Depends(get_db)])