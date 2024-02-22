from sqlalchemy import Table, Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from app.core.config.database import Base

# Many-to-many relationship table between users and posts for likes
user_post_likes = Table(
    "user_post_likes",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("post_id", Integer, ForeignKey("posts.id")),
)

# Many-to-many relationship table between users and posts for comments.
user_post_comments = Table(
    "user_post_comments",
    Base.metadata,
    Column("user_id", Integer, ForeignKey("users.id")),
    Column("post_id", Integer, ForeignKey("posts.id")),
    Column("comment", String),
)
