import enum
from sqlalchemy import (
    Column,
    ForeignKey,
    Integer,
    String,
    Enum,
    Date,
)
from sqlalchemy.orm import relationship

from ..database import Base


class LeaveStatus(str, enum.Enum):
    PENDING = "Pending"
    APPROVED = "Approved"
    REJECTED = "Rejected"


class LeaveType(str, enum.Enum):
    PAID = "Paid"
    SICK = "Sick"
    UNPAID = "Unpaid"


class LeaveRequest(Base):
    __tablename__ = "leave_requests"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    leave_type = Column(Enum(LeaveType), nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    remarks = Column(String, nullable=True)
    status = Column(Enum(LeaveStatus), default=LeaveStatus.PENDING)
    attachment_url = Column(String, nullable=True)
    admin_comments = Column(String, nullable=True)

    employee = relationship("User", back_populates="leave_requests")
