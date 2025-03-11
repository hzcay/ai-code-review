import time
from typing import Optional
from fastapi import Depends, FastAPI, Response, status, HTTPException
from fastapi.params import Body
from pydantic import BaseModel
from random import randrange
from psycopg2.extras import RealDictCursor
import model
from schemas import PostCreate, Post, ChatBase, ChatResponse
from sqlalchemy.orm import Session
from database import engine, get_db
from chatbot import chat
from fastapi.middleware.cors import CORSMiddleware


model.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Thêm CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Địa chỉ frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Hello World"}

@app.get("/sqlalchemy")
def test_posts(db: Session = Depends(get_db)):
    return {"status": "success"}

@app.get("/posts")
def get_posts(db: Session = Depends(get_db)):
    posts = db.query(model.chat).all()
    return {"data": posts}

@app.post("/posts", status_code=status.HTTP_201_CREATED, response_model=ChatResponse)
def create_posts(post: ChatBase, db: Session = Depends(get_db)):
    response = chat(post.message, db)
    new_post = model.chat(message = post.message, response = response)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@app.get("/posts/{id}")
def get_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("SELECT * FROM posts WHERE id = %s", (id,))
    # post = cursor.fetchone()
    # if not post:
    #     raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} was not found")
    post = db.query(model.chat).filter(model.chat.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} was not found")
    return {"data": post}

@app.delete("/posts/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(id: int, db: Session = Depends(get_db)):
    # cursor.execute("DELETE FROM posts WHERE id = %s", (id,))
    # conn.commit()
    post = db.query(model.chat).filter(model.chat.id == id).first()
    if not post:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} was not found")
    db.delete(post)
    db.commit()
    return Response(status_code=status.HTTP_204_NO_CONTENT)

@app.put("/posts/{id}")
def update_post(id: int, post: ChatBase, db : Session = Depends(get_db)):
    post_query = db.query(model.chat).filter(model.chat.id == id).first()
    if not post_query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"post with id: {id} was not found")
    post_query.message = post.message
    # Regenerate the response
    response = chat(post.message, db)
    post_query.response = response
    db.commit()
    db.refresh(post_query)
    
    return post_query

