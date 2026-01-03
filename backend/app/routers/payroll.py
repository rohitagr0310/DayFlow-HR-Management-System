from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.salary import SalaryComponentType
from app.models.user import User
from app.routers.users import get_current_admin_user
from app.schemas.salary import SalarySetting, SalarySettingCreate
from app.core import security


router = APIRouter(
    prefix="/payroll", tags=["Payroll"], dependencies=[Depends(get_current_admin_user)]
)


@router.put("/settings/{user_id}", response_model=SalarySetting)
def update_salary_settings(
    user_id: int,
    settings_in: SalarySettingCreate,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user),
):
    """
    Update the salary settings for a specific user. (Admin only)
    This is an idempotent operation that will create or replace the entire salary structure.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user or user.company_id != current_admin.company_id:
        raise HTTPException(status_code=404, detail="User not found in your company")

    # The user must have a 'Basic' component if other components are percentage-of-basic
    has_basic = any(comp.name.lower() == "basic" for comp in settings_in.components)
    needs_basic = any(
        comp.type == SalaryComponentType.PERCENTAGE_OF_BASIC
        for comp in settings_in.components
    )
    if needs_basic and not has_basic:
        raise HTTPException(
            status_code=400,
            detail="A 'Basic' component is required when using PercentageOfBasic type",
        )

    setting = security.update_or_create_salary_setting(db, user, settings_in)
    return setting


@router.get("/settings/{user_id}", response_model=SalarySetting)
def get_salary_settings(
    user_id: int,
    db: Session = Depends(get_db),
    current_admin: User = Depends(get_current_admin_user),
):
    """
    Get the salary settings for a specific user. (Admin only)
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user or user.company_id != current_admin.company_id:
        raise HTTPException(status_code=404, detail="User not found in your company")

    if not user.salary_setting:
        raise HTTPException(
            status_code=404, detail="Salary settings not configured for this user"
        )

    return user.salary_setting
