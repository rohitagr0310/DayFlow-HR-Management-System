from datetime import date
from typing import List, Optional

from pydantic import BaseModel, EmailStr

from ..models import UserRole
from .company import Company
from .salary import SalarySetting


# Base user schema
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str


# Schema for creating a new user
class UserCreate(UserBase):
    role: UserRole
    joining_date: date


# Schema for creating user in DB (includes hashed password)
class UserCreateInDB(UserCreate):
    hashed_password: str
    login_id: str
    company_id: int


# User Resume details
class UserResume(BaseModel):
    description: Optional[str] = None
    skills: Optional[List[str]] = []
    certifications: Optional[List[str]] = []


# User Private Info details
class UserPrivateInfo(BaseModel):
    date_of_birth: Optional[date] = None
    personal_email: Optional[EmailStr] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    gender: Optional[str] = None
    marital_status: Optional[str] = None
    nationality: Optional[str] = None
    emergency_contact: Optional[str] = None


# Schema for updating a user's profile
class UserUpdate(BaseModel):
    resume: Optional[UserResume] = None
    private_info: Optional[UserPrivateInfo] = None


# Schema for reading a user's public profile
class User(UserBase):
    id: int
    login_id: str
    role: UserRole
    company: Company
    resume: UserResume
    private_info: UserPrivateInfo

    class Config:
        from_attributes = True


# A minimal user summary for lists
class UserSummary(BaseModel):
    id: int
    name: str
    profile_picture_url: Optional[str] = None


# A complete user schema for admin-level views
class UserForAdmin(User):
    salary_setting: Optional[SalarySetting] = None
