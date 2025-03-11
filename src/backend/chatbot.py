from google import genai
import time
from typing import Optional
from fastapi import Depends, FastAPI, Response, status, HTTPException
from fastapi.params import Body
from pydantic import BaseModel
from random import randrange
from psycopg2.extras import RealDictCursor
import model
from sqlalchemy.orm import Session
from database import engine, get_db
from schemas import ChatBase

def get_history(db: Session = Depends(get_db)):
    chat_history = db.query(model.chat).all()
    return chat_history


def chat(message: str, db: Session = Depends(get_db)):
    db = next(get_db())
    history = get_history(db)

    formatted_history = "\n".join([f"{x.message} \n {x.response}" for x in history])

    client = genai.Client(api_key="AIzaSyC8CglNErhZEo7wcQ_ZQV7vjkp4H19cAMQ")

    try:
        response = client.models.generate_content(
            model='gemini-2.0-flash', 
            contents = formatted_history + "\n\nUser: " + message
        )
        
        if hasattr(response, 'text'):
            return response.text
        else:
            # Nếu không có text, thử lấy từ các cấu trúc khác
            try:
                return response.candidates[0].content.parts[0].text
            except (AttributeError, IndexError, KeyError):
                return "Xin lỗi, tôi không thể xử lý yêu cầu này. Vui lòng thử lại."
    except Exception as e:
        print(f"Error generating response: {e}")
        return f"Lỗi khi gọi API: {str(e)}"