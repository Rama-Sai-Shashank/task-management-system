from fastapi import APIRouter, HTTPException
from models.user import UserRegister, UserLogin
from database import user_collection
from utils.password import hash_password, verify_password
from utils.jwt import create_access_token, get_current_user
from fastapi import Depends
from bson import ObjectId

auth_router = APIRouter()

# REGISTER
@auth_router.post("/register")
def register(user: UserRegister):
    existing_user = user_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    hashed_pwd = hash_password(user.password)

    user_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_pwd
    })

    return {"message": "User registered successfully"}

# LOGIN
@auth_router.post("/login")
def login(user: UserLogin):
    db_user = user_collection.find_one({"email": user.email})
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": str(db_user["_id"])})
    return {"access_token": token, "token_type": "bearer"}

@auth_router.get("/me")
def get_me(user_id: str = Depends(get_current_user)):
    user = user_collection.find_one({"_id": ObjectId(user_id)}, {"password": 0})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    user["_id"] = str(user["_id"])
    return user