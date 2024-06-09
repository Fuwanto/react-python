from fastapi import APIRouter
from core.schemas import PostComplete, CategoryBase
from sqlalchemy.orm import Session
from api.dependecies import get_db
from fastapi import Depends
from core.crud.post_crud import get_most_liked_posts, get_most_category_posts


router = APIRouter(prefix="/stats", tags=["stats"])


@router.get("/most_liked_posts", response_model=list[PostComplete])
async def most_liked_posts_weekend(db: Session = Depends(get_db)):
    return get_most_liked_posts(db=db)


@router.get("/most_categories", response_model=list[CategoryBase])
async def most_tags(db: Session = Depends(get_db)):
    return get_most_category_posts(db=db)
