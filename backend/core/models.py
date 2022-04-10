from pydantic import BaseModel


class CheckRequest(BaseModel):
    """api incoming items"""
    target: str
