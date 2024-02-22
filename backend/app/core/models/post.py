from app.core.config.database import Base
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from app.core.models.relations import user_post_likes, user_post_comments


class Post(Base):
    __tablename__ = "posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(String)
    likes = Column(Integer, default=0)
    comments = Column(Integer, default=0)
    owner_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="posts")

    liked_by = relationship(
        "User", secondary=user_post_likes, back_populates="liked_posts"
    )

    commented_by = relationship(
        "User", secondary=user_post_comments, back_populates="commented_posts"
    )
