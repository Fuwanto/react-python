from app.core.config.database import Base
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy.orm import relationship
from app.core.models.relations import user_post_likes, user_post_comments


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True, unique=True)
    email = Column(String, index=True, unique=True)
    password = Column(String)
    profile_photo = Column(String, default="default.jpg")

    posts = relationship("Post", back_populates="owner")

    liked_posts = relationship(
        "Post", secondary=user_post_likes, back_populates="liked_by"
    )

    commented_posts = relationship(
        "Post", secondary=user_post_comments, back_populates="commented_by"
    )
