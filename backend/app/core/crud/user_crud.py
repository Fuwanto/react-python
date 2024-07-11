import os
import bcrypt
from fastapi import UploadFile
from sqlalchemy.orm import Session
from core.models.user import User
from core.schemas import UserCreate
from core.utils.optimize import optimize_and_save_image


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


def update_bio(db: Session, current_user: User, bio: str):
    current_user.bio = bio
    db.commit()
    db.refresh(current_user)
    return current_user


def update_profile_photo(db: Session, current_user: User, image: UploadFile):
    base_directory = "statics/images/users"
    user_directory = os.path.join(base_directory, str(current_user.id))

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)
    file_path = os.path.join(user_directory, "profile_photo.webp")

    optimize_and_save_image(new_image=image, save_path=file_path)

    current_user.set_profile_photo(file_path)
    db.commit()
    db.refresh(current_user)

    return current_user
