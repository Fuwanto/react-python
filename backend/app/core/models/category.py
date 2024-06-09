from core.config.database import Base
from sqlalchemy import Column, Integer, String


class Category(Base):
    __tablename__ = "categories"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(255), index=True, unique=True, nullable=False)
    cant = Column(Integer, default=1)

    def increment_cant(self):
        self.cant += 1
        return self
