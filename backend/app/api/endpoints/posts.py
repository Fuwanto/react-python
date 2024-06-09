import os
from fastapi import APIRouter, Depends, UploadFile, Form, File
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from core.schemas import PostComplete, CommentComplete, LikeComplete
from core.models.user import User
from core.utils.security import get_current_user
from core.crud.post_crud import (
    create_post,
    get_post,
    get_posts,
    get_posts_by_owner,
    get_posts_by_username,
    delete_post,
    create_comment,
    get_comments_by_post,
    delete_comment,
    create_like,
)
from api.dependecies import get_db

router = APIRouter(prefix="/posts", tags=["posts"])


@router.post("/create_post", response_model=PostComplete)
def create_new_post(
    description: str = Form(...),
    image: UploadFile = File(...),
    category: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_post(
        db=db,
        description=description,
        image=image,
        user=current_user,
        category=category,
    )


@router.delete("/delete_post/{post_id}", response_model=PostComplete)
def delete_post_by_id(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return delete_post(db=db, post_id=post_id, current_user=current_user)


@router.get("/get_post/{post_id}", response_model=PostComplete)
async def get_post_by_id(post_id: int, db: Session = Depends(get_db)):
    return get_post(db=db, post_id=post_id)


@router.get("/get_posts", response_model=list[PostComplete])
async def get_all_posts(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_posts(db=db, skip=skip, limit=limit)


@router.get("/user_posts/{user_username}", response_model=list[PostComplete])
async def get_posts_by_user(
    user_username: str, skip: int = 0, limit: int = 10, db: Session = Depends(get_db)
):
    return get_posts_by_username(db=db, owner_username=user_username)


@router.get("/my_posts", response_model=list[PostComplete])
async def get_posts_by_owner_id(
    skip: int = 0,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return get_posts_by_owner(db=db, owner=current_user, skip=skip, limit=limit)


@router.get("/images/{user_id}/{post_id}")
async def get_post_image(user_id: int, post_id: int, db: Session = Depends(get_db)):
    base_directory = "statics/images/users"
    return FileResponse(os.path.join(base_directory, str(user_id), f"{post_id}.png"))


"""Comments"""


@router.post("/comment/{post_id}", response_model=CommentComplete)
async def comment_post(
    post_id: int,
    content: str = Form(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return create_comment(db=db, post_id=post_id, content=content, user=current_user)


@router.get("/comments/{post_id}", response_model=list[CommentComplete])
async def get_comments(post_id: int, db: Session = Depends(get_db)):
    return get_comments_by_post(db=db, post_id=post_id)


"""Likes"""


@router.post("/like/{post_id}", response_model=LikeComplete)
async def like_post(
    post_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return {"liked": create_like(db=db, post_id=post_id, user=current_user)}
