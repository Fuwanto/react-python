from core.config.database import Base, SessionLocal
from sqlalchemy.event import listens_for
from sqlalchemy import Column, Integer, String, ForeignKey
from core.models.post import Post


class Comment(Base):
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    content = Column(String(255), nullable=False)
    post_id = Column(Integer, ForeignKey("posts.id"), nullable=False)
    user_username = Column(String(255), ForeignKey("users.username"), nullable=False)

    def set_content(self, content: str):
        self.content = content
        return self
