from sqlmodel import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

DB_URL = ''


engine = create_engine(DB_URL)

SesionLocal = sessionmaker(autocommit=False, autoflush=False)

Base = declarative_base()


