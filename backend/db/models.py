from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, DateTime

from .database import Base


class Item(Base):
    """database model that represent an item"""

    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    target = Column(String, index=True)
    is_threat = Column(Boolean, index=True)
    harmless = Column(Integer, index=True)
    malicious = Column(Integer, index=True)
    suspicious = Column(Integer, index=True)
    timeout = Column(Integer, index=True)
    undetected = Column(Integer, index=True)
    timestamp = Column(DateTime, index=True, default=datetime.utcnow)
