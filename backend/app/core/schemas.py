from pydantic import BaseModel, EmailStr
from typing import Optional


"""Token schemas"""


class Token(BaseModel):
    access_token: str
    token_type: str


"""/Token schemas"""


"""User schemas"""


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserComplete(UserBase):
    id: int

    class Config:
        from_attributes = True


"""/User schemas"""

"""Post schemas"""


class PostBase(BaseModel):
    description: str
    owner_id: int


class PostComplete(PostBase):
    id: int
    likes: int
    comments: int

    class Config:
        from_attributes = True


"""/Post schemas"""
