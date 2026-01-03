from pydantic import BaseModel, EmailStr


# Schema for the initial company and admin registration
class AdminCompanyRegister(BaseModel):
    company_name: str
    admin_name: str
    email: EmailStr
    password: str
