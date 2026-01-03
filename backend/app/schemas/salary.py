from typing import List
from pydantic import BaseModel

from ..models import SalaryComponentType


# Base schema for a salary component
class SalaryComponentBase(BaseModel):
    name: str
    type: SalaryComponentType
    value: float


# Schema for creating a new salary component
class SalaryComponentCreate(SalaryComponentBase):
    pass


# Schema for reading a salary component
class SalaryComponent(SalaryComponentBase):
    id: int

    class Config:
        from_attributes = True


# Base schema for salary settings
class SalarySettingBase(BaseModel):
    monthly_wage: float
    work_days_per_week: int
    work_hours_per_day: float


# Schema for creating new salary settings, including components
class SalarySettingCreate(SalarySettingBase):
    components: List[SalaryComponentCreate]


# Schema for reading salary settings
class SalarySetting(SalarySettingBase):
    id: int
    components: List[SalaryComponent]

    class Config:
        from_attributes = True
