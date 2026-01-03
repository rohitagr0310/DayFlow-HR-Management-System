from datetime import datetime
from typing import Optional
from pydantic import BaseModel


# Base Schemas (common attributes)
class CompanyBase(BaseModel):
    name: str
    logo_url: Optional[str] = None


# Schema for creation
class CompanyCreate(CompanyBase):
    pass


# Schema for reading (e.g., in API responses)
class Company(CompanyBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
