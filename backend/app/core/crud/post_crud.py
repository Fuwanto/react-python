import os
from fastapi import UploadFile
from sqlalchemy.orm import Session
from core.models.post import Post
from core.models.user import User


def create_post(db: Session, description: str, image: UploadFile, owner: User):
    db_post = Post(
        description=description,
        image_route="default.png",
        owner_id=owner.id,
    )
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    """save image"""
    user_id = owner.id
    post_id = db_post.id
    base_directory = "statics/images/users"
    user_directory = os.path.join(base_directory, str(user_id))

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    file_path = os.path.join(user_directory, f"{post_id}.png")

    try:
        with open(file_path, "wb") as f:
            f.write(image.file.read())
            db_post.image_route = file_path
            db.commit()
            db.refresh(db_post)
    except FileNotFoundError as e:
        db.delete(db_post)
        db.commit()
        raise e

    return db_post


def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()


def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Post).offset(skip).limit(limit).all()


def get_posts_by_owner(db: Session, owner: User, skip: int = 0, limit: int = 10):
    return (
        db.query(Post).filter(Post.owner_id == owner.id).offset(skip).limit(limit).all()
    )


def delete_post(db: Session, post_id: int, current_user: User):
    base_directory = "statics/images/users"
    user_directory = os.path.join(base_directory, str(current_user.id))

    if not os.path.exists(user_directory):
        os.makedirs(user_directory)

    file_path = os.path.join(user_directory, f"{post_id}.png")

    try:
        os.remove(file_path)
        db_post = db.query(Post).filter(Post.id == post_id).first()
        db.delete(db_post)
        db.commit()
    except FileNotFoundError as e:
        raise e

    return db_post
