from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from jose import JWTError, jwt
from sqlalchemy.orm import Session

from app.core import security
from app.core.security import settings
from fastapi.security import OAuth2PasswordBearer

from app.database.database import get_db
from app.models.user import UserRole
from app.schemas.token import TokenData
from app.schemas.user import User, UserCreate, UserForAdmin, UserUpdate

router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")


async def get_current_user(
    db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
        token_data = TokenData(email=email)
    except JWTError:
        raise credentials_exception
    user = security.get_user_by_email(db, email=token_data.email)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
):
    if not current_user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


async def get_current_admin_user(
    current_user: User = Depends(get_current_active_user),
):
    if current_user.role != UserRole.ADMIN:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="The user doesn't have enough privileges",
        )
    return current_user


@router.post(
    "/users",
    response_model=User,
    status_code=status.HTTP_201_CREATED,
    tags=["Users"],
)
def create_user(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
    current_user: User = Depends(get_current_admin_user),
):
    """
    Create new user. (Admin only)
    """
    user = security.get_user_by_email(db, email=user_in.email)
    if user:
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )

    login_id = security.generate_login_id(
        db, user_in.first_name, user_in.last_name, user_in.joining_date
    )
    temp_password = security.generate_temp_password()

    # In a real app, you'd email this password or display it to the admin once.
    print(f"Temporary password for {user_in.email}: {temp_password}")

    new_user = security.create_user(
        db,
        user=user_in,
        company_id=current_user.company_id,
        password=temp_password,
        login_id=login_id,
    )
    return new_user



@router.get("/users", response_model=List[User], tags=["Users"])
def read_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """
    Retrieve all users in the company. (Admin only)
    """
    users = (
        db.query(User)
        .filter(User.company_id == current_user.company_id)
        .offset(skip)
        .limit(limit)
        .all()
    )
    return users


@router.get("/users/me", response_model=User, tags=["Users"])
def read_users_me(
    current_user: User = Depends(get_current_active_user),
):
    """
    Get current user.
    """
    return current_user


@router.get("/users/{user_id}", response_model=UserForAdmin, tags=["Users"])
def read_user_by_id(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_admin_user),
):
    """
    Get a specific user by id. (Admin only)
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user or user.company_id != current_user.company_id:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/users/{user_id}", response_model=User, tags=["Users"])
def update_user(
    *,
    db: Session = Depends(get_db),
    user_id: int,
    user_in: UserUpdate,
    current_user: User = Depends(get_current_active_user),
):
    """
    Update a user's profile.
    Admins can update anyone in their company.
    Employees can only update their own profile.
    """
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    is_admin = current_user.role == UserRole.ADMIN
    is_self = current_user.id == user.id

    if not is_admin and not is_self:
        raise HTTPException(status_code=403, detail="Not enough permissions")

    if user_in.private_info:
        for field, value in user_in.private_info.dict(exclude_unset=True).items():
            setattr(user, f"private_info_{field}", value)

    if user_in.resume:
        for field, value in user_in.resume.dict(exclude_unset=True).items():
            setattr(user, f"resume_{field}", value)

    db.add(user)
    db.commit()
    db.refresh(user)
    return user
