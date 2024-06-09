from core.config.database import Base
from sqlalchemy import Column, Integer, String


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    username = Column(String(255), index=True, unique=True, nullable=False)
    email = Column(String(255), index=True, unique=True, nullable=False)
    bio = Column(String(255), default="")
    hashed_password = Column(String(255), nullable=False)
    profile_photo = Column(String(255), default="default.png")

    def set_profile_photo(self, image_route: str):
        self.profile_photo = image_route
        return self

    def set_bio(self, bio: str):
        self.bio = bio
        return self
