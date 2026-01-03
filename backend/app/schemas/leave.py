from datetime import date
from typing import Optional

from pydantic import BaseModel

from app.models.leave import LeaveStatus, LeaveType


# Base schema for a leave request
class LeaveRequestBase(BaseModel):
    leave_type: LeaveType
    start_date: date
    end_date: date
    remarks: Optional[str] = None


# Schema for creating a new leave request
class LeaveRequestCreate(LeaveRequestBase):
    pass


# Schema for updating the status of a leave request (by an admin)
class LeaveRequestUpdateStatus(BaseModel):
    status: LeaveStatus
    comments: Optional[str] = None


# Schema for reading a leave request
class LeaveRequest(LeaveRequestBase):
    id: int
    user_id: int
    status: LeaveStatus
    admin_comments: Optional[str] = None

    class Config:
        from_attributes = True
