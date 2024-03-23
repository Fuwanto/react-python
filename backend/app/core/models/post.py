from core.config.database import Base
from sqlalchemy import Table
from sqlalchemy import Column, ForeignKey, Integer, String


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    description = Column(String(255), index=True)
    image_route = Column(String(255), nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)

    def set_image_route(self, image_route: str):
        self.image_route = image_route
        return self
