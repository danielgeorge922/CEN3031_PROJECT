from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship
from app.db.database import Base

user_classes = Table(
    'user_classes',
    Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id'), primary_key=True),
    Column('class_id', Integer, ForeignKey('classes.id'), primary_key=True),
)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    user_points = Column(Integer, default=0)

    classes = relationship("Class", secondary=user_classes, back_populates="users")
    questions = relationship("Question", back_populates="user")
    answers = relationship("Answer", back_populates="user")
    liked_answers = relationship("Like", back_populates="user")
    disliked_answers = relationship("Dislike", back_populates="user")

class Class(Base):
    __tablename__ = 'classes'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)

    users = relationship("User", secondary=user_classes, back_populates="classes")
    questions = relationship("Question", back_populates="class_")

class Question(Base):
    __tablename__ = 'questions'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    text = Column(String, nullable=False, default="N/A")
    class_id = Column(Integer, ForeignKey('classes.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    is_answered = Column(Boolean, default=False)

    class_ = relationship("Class", back_populates="questions")
    user = relationship("User", back_populates="questions")
    answers = relationship("Answer", back_populates="question")

class Answer(Base):
    __tablename__ = 'answers'
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String, nullable=False)
    question_id = Column(Integer, ForeignKey('questions.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship("User", back_populates="answers")
    question = relationship("Question", back_populates="answers")
    liked_by_users = relationship("Like", back_populates="answer")
    disliked_by_users = relationship("Dislike", back_populates="answer")

class Like(Base):
    __tablename__ = 'likes'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    answer_id = Column(Integer, ForeignKey('answers.id'), nullable=False)

    user = relationship("User", back_populates="liked_answers")
    answer = relationship("Answer", back_populates="liked_by_users")

class Dislike(Base):
    __tablename__ = 'dislikes'
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    answer_id = Column(Integer, ForeignKey('answers.id'), nullable=False)

    user = relationship("User", back_populates="disliked_answers")
    answer = relationship("Answer", back_populates="disliked_by_users")