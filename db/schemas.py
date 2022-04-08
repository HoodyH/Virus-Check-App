import datetime
from pydantic import BaseModel


class ItemBase(BaseModel):
    """base schema to represent items"""
    target: str
    is_threat: bool = False
    harmless: int = 0
    malicious: int = 0
    suspicious: int = 0
    timeout: int = 0
    undetected: int = 0


class Item(ItemBase):
    """schema to display an item"""
    id: int
    timestamp: datetime.datetime

    class Config:
        orm_mode = True


class ItemCreate(ItemBase):
    """schema to create a new item"""
    pass
