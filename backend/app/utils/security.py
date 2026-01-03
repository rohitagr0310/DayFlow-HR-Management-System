import secrets
import string
from datetime import datetime, timedelta, date

from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

from .models import models

from .schemas import schemas
from ..config.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# --- Password and JWT ---
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM
    )
    return encoded_jwt


# --- User ---
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()


def generate_login_id(db: Session, first_name: str, last_name: str, joining_date: date):
    year = joining_date.year
    prefix = (first_name[:2] + last_name[:2]).upper()

    # Find the latest serial number for this prefix and year
    latest_user = (
        db.query(models.User)
        .filter(models.User.login_id.like(f"{prefix}{year}%"))
        .order_by(models.User.login_id.desc())
        .first()
    )

    if latest_user:
        last_serial = int(latest_user.login_id[-3:])
        new_serial = last_serial + 1
    else:
        new_serial = 1

    return f"{prefix}{year}{new_serial:03d}"


def generate_temp_password(length: int = 12):
    alphabet = string.ascii_letters + string.digits + string.punctuation
    return "".join(secrets.choice(alphabet) for i in range(length))


def create_user(
    db: Session, user: schemas.UserCreate, company_id: int, password: str, login_id: str
):
    hashed_password = get_password_hash(password)
    db_user = models.User(
        **user.dict(),
        hashed_password=hashed_password,
        login_id=login_id,
        company_id=company_id,
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --- Company ---
def create_company(db: Session, company: schemas.CompanyCreate):
    db_company = models.Company(**company.dict())
    db.add(db_company)
    db.commit()
    db.refresh(db_company)
    return db_company


# --- Salary ---
def update_or_create_salary_setting(
    db: Session, user: models.User, setting: schemas.SalarySettingCreate
):
    # Delete existing components if they exist
    if user.salary_setting:
        db.query(models.SalaryComponent).filter(
            models.SalaryComponent.salary_setting_id == user.salary_setting.id
        ).delete()

    # Create or update the setting
    db_setting = user.salary_setting or models.SalarySetting(user_id=user.id)

    db_setting.monthly_wage = setting.monthly_wage
    db_setting.work_days_per_week = setting.work_days_per_week
    db_setting.work_hours_per_day = setting.work_hours_per_day

    db.add(db_setting)

    # Create new components
    for comp in setting.components:
        db_comp = models.SalaryComponent(**comp.dict(), salary_setting=db_setting)
        db.add(db_comp)

    db.commit()
    db.refresh(db_setting)
    return db_setting
