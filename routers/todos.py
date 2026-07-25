from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import or_

import models
import schemas

from database import get_db
from oauth2 import get_current_user

router = APIRouter(prefix="/todos", tags=["Todos"])

@router.post("/", response_model= schemas.TodoResponse)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_todo = models.Todo(title = todo.title, description = todo.description, owner_id = current_user.id)
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)

    return new_todo

@router.get("/")
def read_all_todos(search: str | None = None, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    query = db.query(models.Todo).filter(models.Todo.owner_id == current_user.id)
    if search:
        query = query.filter(or_(models.Todo.title.ilike(f"%{search}%"), models.Todo.description.ilike(f"%{search}%")))
    return query.all()

@router.get("/{todo_id}", response_model=schemas.TodoResponse)
def read_todo_by_id(todo_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == current_user.id).first()
    if todo:
        return todo
    else:
        raise HTTPException(status_code=404, detail="Todo not found")

@router.put("/{todo_id}")
def update_todo(todo_id: int, todo: schemas.TodoUpdate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    todo_obj = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == current_user.id).first()
    if todo_obj:
        todo_obj.title = todo.title
        todo_obj.description = todo.description
        db.commit()
        db.refresh(todo_obj)

        return todo_obj
    else:
        raise HTTPException(status_code=404, detail="Todo not found")

@router.delete("/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    todo_obj = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == current_user.id).first()
    if todo_obj:
        db.delete(todo_obj)
        db.commit()

        return {
            "message": "Todo deleted successfully"
        }

    else:
        raise HTTPException(status_code=404, detail="Todo not found")

@router.patch("/{todo_id}/complete")
def complete_todo(todo_id: int, completed_data: schemas.TodoComplete, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    todo_obj = db.query(models.Todo).filter(models.Todo.id == todo_id, models.Todo.owner_id == current_user.id).first()
    if todo_obj:
        todo_obj.completed = completed_data.completed
        db.commit()
        db.refresh(todo_obj)

        return todo_obj
    else:
        raise HTTPException(status_code=404, detail="Todo not found")