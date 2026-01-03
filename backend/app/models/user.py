import enum
from sqlalchemy import (
    Boolean,
    Column,
    ForeignKey,
    Integer,
    String,
    Enum,
    Date,
    JSON,
)
from sqlalchemy.orm import relationship

from app.database.database import Base


class UserRole(str, enum.Enum):
    ADMIN = "Admin"
    EMPLOYEE = "Employee"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    login_id = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    joining_date = Column(Date, nullable=False)
    profile_picture_url = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)

    company_id = Column(Integer, ForeignKey("companies.id"))
    company = relationship("Company", back_populates="users")

    # Resume Info
    resume_description = Column(String, nullable=True)
    resume_skills = Column(JSON, nullable=True)
    resume_certifications = Column(JSON, nullable=True)

    # Private Info
    private_info_date_of_birth = Column(Date, nullable=True)
    private_info_personal_email = Column(String, nullable=True)
    private_info_phone = Column(String, nullable=True)
    private_info_address = Column(String, nullable=True)
    private_info_gender = Column(String, nullable=True)
    private_info_marital_status = Column(String, nullable=True)
    private_info_nationality = Column(String, nullable=True)
    private_info_emergency_contact = Column(String, nullable=True)

    # Relationships
    attendances = relationship("Attendance", back_populates="employee")
    leave_requests = relationship("LeaveRequest", back_populates="employee")
    salary_setting = relationship("SalarySetting", back_populates="user", uselist=False)

    @property
    def resume(self):
        return {
            "description": self.resume_description,
            "skills": self.resume_skills,
            "certifications": self.resume_certifications,
        }

    @property
    def private_info(self):
        return {
            "date_of_birth": self.private_info_date_of_birth,
            "personal_email": self.private_info_personal_email,
            "phone": self.private_info_phone,
            "address": self.private_info_address,
            "gender": self.private_info_gender,
            "marital_status": self.private_info_marital_status,
            "nationality": self.private_info_nationality,
            "emergency_contact": self.private_info_emergency_contact,
        }
