from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.event import listens_for
from core.config.database import Base, SessionLocal
from core.crud.category_crud import create_category


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    description = Column(String(255), index=True)
    category = Column(String(255), index=True)
    image_route = Column(String(255), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    owner_username = Column(String(255), ForeignKey("users.username"), nullable=False)

    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)

    def set_image_route(self, image_route: str):
        self.image_route = image_route
        return self

    def increase_likes(self):
        self.likes += 1
        return self

    def decrease_likes(self):
        self.likes -= 1
        return self

    def increase_comments(self):
        self.comments += 1
        return self

    def decrease_comments(self):
        self.comments -= 1
        return self


@listens_for(Post, "after_insert")
def create_category_for_post(mapper, connection, target):
    db = SessionLocal()
    try:
        create_category(db, target.category)
    finally:
        db.close()
