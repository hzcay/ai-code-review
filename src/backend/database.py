from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# URL-encode the password to handle special characters
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Hzcay%40123@localhost:5432/fastapi"

#tao ket noi database
engine = create_engine(SQLALCHEMY_DATABASE_URL)

#tao session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#tao base
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
