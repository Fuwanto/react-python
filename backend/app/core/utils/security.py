import os
from datetime import datetime, timedelta
from fastapi import HTTPException, status, Depends, Request
from fastapi.security import OAuth2PasswordBearer
from core.crud.user_crud import get_user_by_username
from api.dependecies import get_db
from sqlalchemy.orm import Session
from jose import jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(
        minutes=int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30))
    )
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode,
        os.getenv("SECRET_KEY", ""),
        algorithm=os.getenv("ALGORITHM", "HS256"),
    )
    return encoded_jwt


def verify_token(token: str):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token,
            os.getenv("SECRET_KEY", ""),
            algorithms=[os.getenv("ALGORITHM", "HS256")],
        )
        return payload
    except jwt.decode.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.decode.JWTError:
        raise credentials_exception


async def get_current_user(request: Request, db: Session = Depends(get_db)):
    token = request.cookies.get("csrf_access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user = verify_token(token)
    user_db = get_user_by_username(db, user["sub"])
    if user_db is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user_db
