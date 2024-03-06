from core.config.database import Base
from sqlalchemy import Table, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from core.models.user import User
from core.models.post import Post


"""User-Post relations"""
# Many-to-many relationship table between users and posts for likes
user_post_likes = Table(
    "user_post_likes",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), nullable=False),
    Column("post_id", Integer, ForeignKey("posts.id"), nullable=False),
)

# Many-to-many relationship table between users and posts for comments.
user_post_comments = Table(
    "user_post_comments",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id"), nullable=False),
    Column("post_id", Integer, ForeignKey("posts.id"), nullable=False),
    Column("comment", String(255), nullable=False),
)


User.posts = relationship("Post", back_populates="owner")

User.liked_posts = relationship(
    "Post", secondary=user_post_likes, back_populates="liked_by"
)

User.commented_posts = relationship(
    "Post", secondary=user_post_comments, back_populates="commented_by"
)


Post.owner = relationship("User", back_populates="posts")

Post.liked_by = relationship(
    "User", secondary="user_post_likes", back_populates="liked_posts"
)

Post.commented_by = relationship(
    "User", secondary="user_post_comments", back_populates="commented_posts"
)

"""/User-Post relations"""
