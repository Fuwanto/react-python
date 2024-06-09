from sqlalchemy.orm import Session
from core.models.category import Category


def create_category(db: Session, new_category: str):
    new_category_upper = new_category.upper()
    category = db.query(Category).filter(Category.name == new_category_upper).first()
    if category:
        category.increment_cant()
        db.commit()
        db.refresh(category)
        return category

    db_category = Category(name=new_category_upper)
    db.add(db_category)
    db.commit()
    db.refresh(db_category)
    return db_category
