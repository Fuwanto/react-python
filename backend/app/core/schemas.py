from pydantic import BaseModel, EmailStr
from typing import Optional


"""User schemas"""


class BioSchema(BaseModel):
    description: str


class UserBase(BaseModel):
    username: str
    email: EmailStr


class UserCreate(UserBase):
    password: str


class UserComplete(UserBase):
    id: int
    bio: Optional[str]

    class Config:
        from_attributes = True


"""Token schemas"""


class Token(BaseModel):
    access_token: str
    token_type: str
    user: UserComplete


"""Post schemas"""


class PostBase(BaseModel):
    description: str
    owner_id: int
    owner_username: str
    category: str


class PostComplete(PostBase):
    id: int
    likes: int
    comments: int

    class Config:
        from_attributes = True


"""Category schemas"""


class CategoryComplete(BaseModel):
    id: int
    name: str
    cant: int


"""Comment schemas"""


class CommentComplete(BaseModel):
    id: int
    content: str
    owner_id: int
    owner_username: str
    post_id: int
