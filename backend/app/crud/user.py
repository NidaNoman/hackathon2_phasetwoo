# backend/app/crud/user.py
# T021 [P] [US1] Implement backend CRUD operations for User

from typing import Optional

from sqlmodel import Session, select

from app.schemas.user import UserCreate
from app.core.security import get_password_hash
from app.db.models import User


def create_user(session: Session, user_create: UserCreate) -> User:
    """
    Creates a new user in the database.
    """
    hashed_password = get_password_hash(user_create.password)
    db_user = User(username=user_create.username, password_hash=hashed_password)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user

def get_user_by_username(session: Session, username: str) -> Optional[User]:
    """
    Retrieves a user by their username.
    """
    statement = select(User).where(User.username == username)
    user = session.exec(statement).first()
    return user

def get_user_by_id(session: Session, user_id: int) -> Optional[User]:
    """
    Retrieves a user by their ID.
    """
    statement = select(User).where(User.id == user_id)
    user = session.exec(statement).first()
    return user
