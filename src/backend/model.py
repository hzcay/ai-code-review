from sqlalchemy import Column, Integer, String, Boolean
from database import Base
from sqlalchemy.sql.sqltypes import TIMESTAMP
from sqlalchemy.sql.expression import text 

# class Post(Base):
#     __tablename__ = "posts"

#     id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
#     title = Column(String, nullable=False)
#     content = Column(String, nullable=False)
#     published = Column(Boolean, server_default='FALSE', nullable=False)
#     created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))
    
class chat(Base):
    __tablename__ = "chat"

    id = Column(Integer, primary_key=True, nullable=False, autoincrement=True)
    message = Column(String, nullable=False)
    response = Column(String, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))