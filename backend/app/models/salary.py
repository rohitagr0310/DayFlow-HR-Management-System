import enum
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    Enum,
    Float,
)
from sqlalchemy.orm import relationship

from ..database import Base


class SalarySetting(Base):
    __tablename__ = "salary_settings"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)

    monthly_wage = Column(Float, nullable=False, default=0)
    work_days_per_week = Column(Integer, default=5)
    work_hours_per_day = Column(Float, default=8)

    user = relationship("User", back_populates="salary_setting")
    components = relationship("SalaryComponent", back_populates="salary_setting")


class SalaryComponentType(str, enum.Enum):
    PERCENTAGE_OF_WAGE = "PercentageOfWage"
    PERCENTAGE_OF_BASIC = "PercentageOfBasic"
    FIXED = "Fixed"


class SalaryComponent(Base):
    __tablename__ = "salary_components"
    id = Column(Integer, primary_key=True, index=True)
    salary_setting_id = Column(
        Integer, ForeignKey("salary_settings.id"), nullable=False
    )

    name = Column(String, nullable=False)
    type = Column(Enum(SalaryComponentType), nullable=False)
    value = Column(Float, nullable=False)

    salary_setting = relationship("SalarySetting", back_populates="components")
