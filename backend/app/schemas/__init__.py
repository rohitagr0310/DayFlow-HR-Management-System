# This file makes the 'schemas' directory a package and exposes all schemas.

from app.schemas.auth import AdminCompanyRegister
from app.schemas.attendance import Attendance, AttendanceBase
from app.schemas.company import Company, CompanyBase, CompanyCreate
from app.schemas.leave import (
    LeaveRequest,
    LeaveRequestBase,
    LeaveRequestCreate,
    LeaveRequestUpdateStatus,
)
from app.schemas.salary import (
    SalaryComponent,
    SalaryComponentBase,
    SalaryComponentCreate,
    SalarySetting,
    SalarySettingBase,
    SalarySettingCreate,
)
from app.schemas.token import Token, TokenData
from app.schemas.user import (
    User,
    UserBase,
    UserCreate,
    UserCreateInDB,
    UserForAdmin,
    UserPrivateInfo,
    UserResume,
    UserSummary,
    UserUpdate,
)

__all__ = [
    "AdminCompanyRegister",
    "Attendance",
    "AttendanceBase",
    "Company",
    "CompanyBase",
    "CompanyCreate",
    "LeaveRequest",
    "LeaveRequestBase",
    "LeaveRequestCreate",
    "LeaveRequestUpdateStatus",
    "SalaryComponent",
    "SalaryComponentBase",
    "SalaryComponentCreate",
    "SalarySetting",
    "SalarySettingBase",
    "SalarySettingCreate",
    "Token",
    "TokenData",
    "User",
    "UserBase",
    "UserCreate",
    "UserCreateInDB",
    "UserForAdmin",
    "UserPrivateInfo",
    "UserResume",
    "UserSummary",
    "UserUpdate",
]
