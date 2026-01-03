from datetime import date, datetime
from pydantic import BaseModel

from ..models import AttendanceStatus, AttendanceType


# Base schema for attendance
class AttendanceBase(BaseModel):
    date: date
    check_in: Optional[datetime] = None
    check_out: Optional[datetime] = None


# Schema for reading attendance records
class Attendance(AttendanceBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
