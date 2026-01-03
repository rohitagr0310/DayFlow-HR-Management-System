from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from . import schemas, models, security
from .deps import get_db

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register-company", response_model=schemas.User, status_code=status.HTTP_201_CREATED)
def register_company_and_admin(
    *, db: Session = Depends(get_db), form_data: schemas.AdminCompanyRegister
):
    """
    Registers a new company and its first administrator.
    This is the initial setup endpoint for a new tenant.
    """
    db_company = security.get_user_by_email(db, email=form_data.email)
    if db_company:
        raise HTTPException(
            status_code=400, detail="Email already registered to another company"
        )
    
    # 1. Create the company
    company = security.create_company(db, company=schemas.CompanyCreate(name=form_data.company_name))

    # 2. Create the admin user
    first_name, _, last_name = form_data.admin_name.partition(" ")
    user_schema = schemas.UserCreate(
        first_name=first_name,
        last_name=last_name or "Admin",
        email=form_data.email,
        role=schemas.UserRole.ADMIN,
        joining_date=datetime.date.today(),
    )
    
    login_id = security.generate_login_id(db, first_name, last_name, user_schema.joining_date)

    admin_user = security.create_user(
        db,
        user=user_schema,
        company_id=company.id,
        password=form_data.password,
        login_id=login_id
    )
    return admin_user


@router.post("/login", response_model=schemas.Token)
def login_for_access_token(
    db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()
):
    """
    Logs in a user and returns a JWT access token.
    """
    user = security.get_user_by_email(db, email=form_data.username)
    if not user or not security.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = security.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
