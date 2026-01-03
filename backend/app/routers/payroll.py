from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..schemas import schemas

from ..models import models

from ..utils import security
from ..database.deps import get_db
from .users import get_current_admin_user

router = APIRouter(
    prefix="/payroll", tags=["Payroll"], dependencies=[Depends(get_current_admin_user)]
)


@router.put("/settings/{user_id}", response_model=schemas.SalarySetting)
def update_salary_settings(
    user_id: int,
    settings_in: schemas.SalarySettingCreate,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user),
):
    """
    Update the salary settings for a specific user. (Admin only)
    This is an idempotent operation that will create or replace the entire salary structure.
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user or user.company_id != current_admin.company_id:
        raise HTTPException(status_code=404, detail="User not found in your company")

    # The user must have a 'Basic' component if other components are percentage-of-basic
    has_basic = any(comp.name.lower() == "basic" for comp in settings_in.components)
    needs_basic = any(
        comp.type == schemas.SalaryComponentType.PERCENTAGE_OF_BASIC
        for comp in settings_in.components
    )
    if needs_basic and not has_basic:
        raise HTTPException(
            status_code=400,
            detail="A 'Basic' component is required when using PercentageOfBasic type",
        )

    setting = security.update_or_create_salary_setting(db, user, settings_in)
    return setting


@router.get("/settings/{user_id}", response_model=schemas.SalarySetting)
def get_salary_settings(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin_user),
):
    """
    Get the salary settings for a specific user. (Admin only)
    """
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user or user.company_id != current_admin.company_id:
        raise HTTPException(status_code=404, detail="User not found in your company")

    if not user.salary_setting:
        raise HTTPException(
            status_code=404, detail="Salary settings not configured for this user"
        )

    return user.salary_setting
