
from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from app.crud import get_user_by_email
from app.schema import UserBase, UserRead
from app.core.security import oauth2_scheme
from app.core.config import SECRET_KEY, ALGORITHM
import jwt
from app.main import get_db

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserRead:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

    user = get_user_by_email(db, email)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user