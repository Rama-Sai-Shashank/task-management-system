from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.auth import auth_router
from routes.tasks import task_router

app = FastAPI()

# ✅ CORS CONFIG (Local + Vercel)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",                      # local React
        "https://task-management-system-ram.vercel.app"  # Vercel frontend
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(task_router, prefix="/tasks", tags=["Tasks"])

@app.get("/")
def root():
    return {"message": "Backend running successfully"}
