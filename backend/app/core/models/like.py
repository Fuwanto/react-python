from core.config.database import Base
from sqlalchemy.event import listens_for
from sqlalchemy import Column, Integer, String, ForeignKey
from core.config.database import Base, SessionLocal
from core.models.post import Post


class Like(Base):
    __tablename__ = "likes"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
