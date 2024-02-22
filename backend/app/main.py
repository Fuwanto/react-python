from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.config.database import engine

# from app.api import router as api_router (soon)

app = FastAPI()

# CORS
origins = ["http://localhost", "http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize database
from core.config.database import Base

Base.metadata.create_all(bind=engine)

# Routes
# app.include_router(api_router) (soon)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)
