from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from api.dependecies import get_db
from core.crud.user_crud import (
    get_user_by_email,
    create_user_bd,
    verify_user_credentials,
)
from core.schemas import User, UserCreate, Token
from core.utils.security import create_access_token, get_current_user

router = APIRouter(prefix="/users", tags=["users"])


@router.post("/create_user", response_model=User)
def create_user(
    new_user: UserCreate,
    db: Session = Depends(get_db),
):
    db_user = get_user_by_email(db, email=new_user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    return create_user_bd(db=db, new_user=new_user)


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


@router.get("/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_user)):
    return current_user
