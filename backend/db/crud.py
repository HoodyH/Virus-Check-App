from sqlalchemy.orm import Session

from . import models, schemas


def create_item(db: Session, item: schemas.ItemCreate):
    """create operation for a user, will add a row on the database"""
    db_item = models.Item(
        target=item.target,
        is_threat=item.is_threat,
        harmless=item.harmless,
        malicious=item.malicious,
        suspicious=item.suspicious,
        timeout=item.timeout,
        undetected=item.undetected,
    )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item


def get_items(db: Session, skip: int = 0, limit: int = 100):
    """read operation on the database"""
    return db.query(models.Item).offset(skip).limit(limit).all()
