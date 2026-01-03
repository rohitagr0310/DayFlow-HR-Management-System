from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import date, datetime

from ..models import models

from ..schemas import schemas
from ..database.deps import get_db
from .users import get_current_active_user

router = APIRouter(prefix="/attendance", tags=["Attendance"])


@router.post("/check-in", response_model=schemas.Attendance)
def check_in(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Records a check-in for the current user for today's date.
    If an attendance record for today already exists, it will be updated.
    """
    today = date.today()
    attendance = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.user_id == current_user.id,
            models.Attendance.date == today,
        )
        .first()
    )
    if not attendance:
        attendance = models.Attendance(user_id=current_user.id, date=today)

    if attendance.check_in:
        raise HTTPException(status_code=400, detail="Already checked in today")

    attendance.check_in = datetime.now()
    db.add(attendance)
    db.commit()
    db.refresh(attendance)
    return attendance


@router.post("/check-out", response_model=schemas.Attendance)
def check_out(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Records a check-out for the current user for today's date.
    A check-in must exist for the day.
    """
    today = date.today()
    attendance = (
        db.query(models.Attendance)
        .filter(
            models.Attendance.user_id == current_user.id,
            models.Attendance.date == today,
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
