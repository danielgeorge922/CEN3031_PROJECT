from fastapi import FastAPI, Depends
from enum import Enum
from typing import Annotated
from sqlalchemy.orm import Session

from db.database import SesionLocal, engine

app = FastAPI()


def get_db():
    db = SesionLocal
    
    try:
        yield db
    finally:
        db.close()
        
db_dependency = Annotated[Session, Depends(get_db)]
        

