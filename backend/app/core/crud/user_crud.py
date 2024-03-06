from sqlalchemy.orm import Session
from core.models.user import User
from core.schemas import UserCreate
import bcrypt


def create_user_bd(db: Session, new_user: UserCreate):
    hashed_password = bcrypt.hashpw(new_user.password.encode("utf-8"), bcrypt.gensalt())
    db_user = User(
        email=new_user.email,
        username=new_user.username,
        hashed_password=hashed_password,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def verify_user_credentials(db: Session, email: str, password: str):
    user = get_user_by_email(db, email)
    if user:
        if bcrypt.checkpw(
            password.encode("utf-8"), user.hashed_password.encode("utf-8")
        ):
            return user
    return None
