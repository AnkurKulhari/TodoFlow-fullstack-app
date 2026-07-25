from http.client import HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from models import User
from sqlalchemy.orm import Session
from database import get_db
import schemas

SECRET_KEY = "9f7b2d8c5e1a4f6b8c3d9e2f1a7b5c6d8e4f9a2b1c7d5e8f3a6b9c2d1e4f7a8"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

    return encoded_jwt

def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id", None)
        if user_id is None:
            raise HTTPException(status_code=404, detail="Invalid Token")
        token_data = schemas.TokenData(user_id=user_id)
        return token_data
    except JWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    token_data = verify_access_token(token)
    user = db.query(User).filter_by(id=token_data.user_id).first()
    if not user:
        raise HTTPException(status_code=401, detail= "User not found")

    return user