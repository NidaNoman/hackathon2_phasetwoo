from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import auth, tasks

app = FastAPI(
    title="Phase-2 Todo Web Application",
    description="API for the Phase-2 Todo Web Application, providing user authentication and task management.",
    version="2.0.0",
)

# Set up CORS middleware
origins = [
    "http://localhost:3000", # Common Next.js dev port
    "http://localhost:3002",  # User's current frontend URL
    "http://127.0.0.1:3000", # Also allow 127.0.0.1 for consistency
    "http://127.0.0.1:3002", # Also allow 127.0.0.1 for consistency
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(tasks.router, prefix="/api/v1/tasks", tags=["tasks"])


@app.get("/")
async def read_root():
    return {"message": "Welcome to the Phase-2 Todo Web Application Backend!"}


