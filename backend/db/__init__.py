from sqlalchemy.orm import Session
from .database import SessionLocal, engine
from . import models

models.Base.metadata.create_all(bind=engine)


def get_db():
    """get current active session"""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
