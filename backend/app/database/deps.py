from typing import Iterator

from sqlalchemy.orm import Session

from .database import SessionLocal


def get_db() -> Iterator[Session]:
    """
    Dependency to get a database session.
    Ensures the session is always closed after the request.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
