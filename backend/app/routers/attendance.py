from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date, datetime

from app.models.attendance import Attendance

from app.schemas.attendance import Attendance as AttendanceSchema
from app.schemas.user import User as UserSchema
from app.database.database import get_db
from app.routers.users import get_current_active_user

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/check-in", response_model=AttendanceSchema)
def check_in(
    db: Session = Depends(get_db),
    current_user: UserSchema = Depends(get_current_active_user),
):
    """
    Records a check-in for the current user for today's date.
    If an attendance record for today already exists, it will be updated.
    """
    today = date.today()
    attendance = (
        db.query(Attendance)
        .filter(
            Attendance.user_id == current_user.id,
            Attendance.date == today,
        )
        .first()
    )
    if not attendance:
        attendance = Attendance(user_id=current_user.id, date=today)

    if attendance.check_in:
        raise HTTPException(status_code=400, detail="Already checked in today")

    attendance.check_in = datetime.now()
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance


@router.post("/check-out", response_model=AttendanceSchema)
def check_out(
    db: Session = Depends(get_db),
    current_user: UserSchema = Depends(get_current_active_user),
):
    """
    Records a check-out for the current user for today's date.
    A check-in must exist for the day.
    """
    today = date.today()
    attendance = (
        db.query(Attendance)
        .filter(
            Attendance.user_id == current_user.id,
            Attendance.date == today,
        )
        .first()
    )
    if not attendance or not attendance.check_in:
        raise HTTPException(status_code=400, detail="Must check-in before checking out")

    if attendance.check_out:
        raise HTTPException(status_code=400, detail="Already checked out today")

    attendance.check_out = datetime.now()
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance
