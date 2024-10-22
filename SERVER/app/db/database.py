from sqlmodel import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DB_URL = 'postgresql://alexruah@localhost:5432/CEN3031' 


engine = create_engine(DB_URL, echo=True)

SesionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


def get_db():
    db = SesionLocal()
    try:
        yield db
    finally:
        db.close()