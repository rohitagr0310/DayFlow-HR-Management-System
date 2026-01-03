# This file makes the 'models' directory a package and exposes all models.
# This allows other parts of the application to import models from `app.models`
# directly, e.g., `from app.models import User, Company`.
# It also ensures that all models are registered with SQLAlchemy's metadata
# before `Base.metadata.create_all()` is called in `main.py`.

from .attendance import Attendance
from .company import Company
from .leave import LeaveRequest, LeaveStatus, LeaveType
from .salary import SalarySetting, SalaryComponent, SalaryComponentType
from .user import User, UserRole

__all__ = [
    "Attendance",
    "Company",
    "LeaveRequest",
    "LeaveStatus",
    "LeaveType",
    "SalarySetting",
    "SalaryComponent",
    "SalaryComponentType",
    "User",
    "UserRole",
]
