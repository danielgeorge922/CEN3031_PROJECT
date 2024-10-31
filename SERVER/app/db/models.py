from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy import Table
from sqlalchemy.orm import relationship
from app.db.database import Base


class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=True, index=True)
    email = Column(String, unique=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

    questions = relationship("Question", back_populates="user")
    answers = relationship("Answer", back_populates="user")
    
    
    
class Class(Base):
    __tablename__ = 'classes'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)

    questions = relationship("Question", back_populates="class_")
    

user_classes = Table(
    'user_classes',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('class_id', Integer, ForeignKey('classes.id'), primary_key=True)
)
    
    
class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    content = Column(String, nullable=False)
    class_id = Column(Integer, ForeignKey('classes.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    is_answered = Column(Boolean, default=False)

    user = relationship("User", back_populates="questions")
    class_ = relationship("Class", back_populates="questions")
    answers = relationship("Answer", back_populates="question")
    
    
class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True, index=True)
    content = Column(String, nullable=False)
    question_id = Column(Integer, ForeignKey('questions.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", back_populates="answers")
    question = relationship("Question", back_populates="answers")