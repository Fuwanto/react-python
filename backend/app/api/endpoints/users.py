import os
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from fastapi.responses import FileResponse
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from api.dependecies import get_db
from core.crud.user_crud import (
    get_user_by_email,
    create_user_bd,
    verify_user_credentials,
    get_user_by_username,
    update_profile_photo,
    update_bio,
)
from core.schemas import UserComplete, UserCreate, Token, BioSchema
from core.models.user import User
from core.utils.security import (
    create_access_token,
    get_current_user,
    refresh_token,
    delete_token,
    oauth2_scheme,
)

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create_user", response_model=UserComplete)
def create_user(
    new_user: UserCreate,
    db: Session = Depends(get_db),
):
    db_user = get_user_by_email(db, email=new_user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create_user_bd(db=db, new_user=new_user)


# Authentication


@router.post("/login", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
):
    user = verify_user_credentials(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Create a token
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/refresh_token", response_model=Token)
async def refresh_access_token(token: str = Depends(oauth2_scheme)):
    return refresh_token(token)


@router.post("/logout", status_code=200)
async def logout(token: str = Depends(oauth2_scheme)):
    delete_token(token)
    return {"message": "Logout successful"}


# /Authentication


@router.get("/me", response_model=UserComplete)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user


@router.get("/get_user/{user_username}", response_model=UserComplete)
async def get_user(user_username: str, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user_username)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@router.get("/images/{user_id}")
def get_profile_photo(user_id: int):
    base_directory = "statics/images/users"
    user_directory = os.path.join(base_directory, str(user_id))
    file_path = os.path.join(user_directory, "profile_photo.png")

    if not os.path.exists(file_path):
        default_directory = os.path.join(base_directory, "default.png")
        return FileResponse(default_directory)

    return FileResponse(file_path)


@router.put("/update_profile_photo", response_model=UserComplete)
def new_profile_photo(
    image: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):

    return update_profile_photo(db=db, current_user=current_user, image=image)


@router.put("/update_bio", response_model=UserComplete)
def new_bio(
    bio: BioSchema,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return update_bio(db=db, current_user=current_user, bio=bio.description)
