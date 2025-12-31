from fastapi import APIRouter, Depends, HTTPException
from database import task_collection
from models.task import TaskCreate, TaskUpdate
from utils.jwt import get_current_user
from bson import ObjectId
from datetime import datetime

task_router = APIRouter()

# CREATE TASK
@task_router.post("/")
def create_task(task: TaskCreate, user_id: str = Depends(get_current_user)):
    new_task = {
        "title": task.title,
        "description": task.description,
        "completed": False,
        "user_id": user_id,
        "created_at": datetime.utcnow()
    }
    task_collection.insert_one(new_task)
    return {"message": "Task created"}

# GET TASKS (only user's tasks)
@task_router.get("/")
def get_tasks(user_id: str = Depends(get_current_user)):
    tasks = []
    for task in task_collection.find({"user_id": user_id}):
        task["_id"] = str(task["_id"])
        tasks.append(task)
    return tasks

# UPDATE TASK
@task_router.put("/{task_id}")
def update_task(
    task_id: str,
    task: TaskUpdate,
    user_id: str = Depends(get_current_user)
):
    result = task_collection.update_one(
        {"_id": ObjectId(task_id), "user_id": user_id},
        {"$set": {k: v for k, v in task.dict().items() if v is not None}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task updated"}

# DELETE TASK
@task_router.delete("/{task_id}")
def delete_task(task_id: str, user_id: str = Depends(get_current_user)):
    result = task_collection.delete_one(
        {"_id": ObjectId(task_id), "user_id": user_id}
    )
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}
