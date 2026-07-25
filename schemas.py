from pydantic import BaseModel, EmailStr
from datetime import datetime

class TodoCreate(BaseModel):
    title: str
    description: str | None = None

class TodoUpdate(BaseModel):
    title: str
    description: str | None = None

class TodoOwner(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True

class TodoResponse(BaseModel):
    id: int
    title: str
    description: str | None = None
    completed: bool
    created_at: datetime
    owner: TodoOwner

    class Config:
        from_attributes = True

class TodoComplete(BaseModel):
    completed: bool

class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr
    created_at: datetime

    class Config:
        from_attributes = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: int | None = None