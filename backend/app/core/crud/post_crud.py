import os
from fastapi import UploadFile
from sqlalchemy.orm import Session
from core.models.post import Post
from core.models.user import User
from core.models.category import Category
from core.models.like import Like
from core.models.comment import Comment


def save_image(db: Session, image: UploadFile, user: User, db_post: Post):
    user_id = user.id
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


""" CRUD operations for Post model """


def create_post(
    db: Session, description: str, image: UploadFile, user: User, category: str
):
    try:
        db_post = Post(
            description=description,
            category=category,
            image_route="default.png",
            owner_id=user.id,
            owner_username=user.username,
        )
        db.add(db_post)
        db.commit()
        db.refresh(db_post)

    except Exception as e:
        raise e
    else:
        save_image(db, image, user, db_post)

    return db_post


def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()


def get_posts(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Post).offset(skip).limit(limit).all()


def get_posts_by_owner(db: Session, owner: User, skip: int = 0, limit: int = 10):
    return (
        db.query(Post).filter(Post.owner_id == owner.id).offset(skip).limit(limit).all()
    )


def get_posts_by_username(
    db: Session, owner_username: str, skip: int = 0, limit: int = 10
):
    return (
        db.query(Post)
        .filter(Post.owner_username == owner_username)
        .offset(skip)
        .limit(limit)
        .all()
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


"""Stats"""


def get_most_liked_posts(db: Session, limit: int = 10):
    return db.query(Post).order_by(Post.likes.desc()).limit(limit).all()


def get_most_category_posts(db: Session, limit: int = 10):
    return db.query(Category).order_by(Category.cant.desc()).limit(limit).all()


"""Comments"""


def create_comment(db: Session, post_id: int, content: str, user: User):
    db_comment = Comment(content=content, user_username=user.username, post_id=post_id)
    db.add(db_comment)
    db.commit()
    db.refresh(db_comment)
    db_post = db.query(Post).filter(Post.id == post_id).first()
    db_post.increase_comments()  # type: ignore
    db.commit()
    return db_comment


def get_comments_by_post(db: Session, post_id: int):
    return db.query(Comment).filter(Comment.post_id == post_id).all()


def delete_comment(db: Session, comment_id: int):
    db_comment = db.query(Comment).filter(Comment.id == comment_id).first()
    db.delete(db_comment)
    db.commit()
    return db_comment


"""Likes"""


def create_like(db: Session, post_id: int, user: User):
    like = (
        db.query(Like).filter(Like.post_id == post_id, Like.user_id == user.id).first()
    )
    if like:
        db.delete(like)
        db_post = db.query(Post).filter(Post.id == post_id).first()
        db_post.decrease_likes()  # type: ignore
        db.commit()
        return False
    else:
        db_like = Like(user_id=user.id, post_id=post_id)
        db.add(db_like)
        db_post = db.query(Post).filter(Post.id == post_id).first()
        db_post.increase_likes()  # type: ignore
        db.commit()
        db.refresh(db_like)
    return True
