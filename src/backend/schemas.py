from pydantic import BaseModel
from datetime import datetime
    
class PostBase(BaseModel):
    title: str
    content: str
    published: bool = True
    
class PostCreate(PostBase):
    pass

class ChatBase(BaseModel):
    message: str

class ChatResponse(BaseModel):
    message: str
    response: str
    id: int
    created_at: datetime
    
    class Config:
        orm_mode = True

class Post(BaseModel):
    id : int
    title: str
    content: str
    published: bool
    created_at: datetime
    
    class Config:
        orm_mode = True