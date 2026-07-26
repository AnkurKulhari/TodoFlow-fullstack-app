from fastapi import FastAPI
from database import engine
import models
from fastapi.middleware.cors import CORSMiddleware
from routers import auth
from routers import todos

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(auth.router)
app.include_router(todos.router)

origins = [
    "http://localhost:5173",
    "https://todo-flow-fullstack-app-git-main-ankurkulharis-projects.vercel.app",
    "https://todo-flow-fullstack-9wmpo7d1e-ankurkulharis-projects.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)