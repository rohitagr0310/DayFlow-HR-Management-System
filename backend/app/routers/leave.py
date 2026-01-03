from typing import List

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session

from ..models import models

from ..schemas import schemas
from ..database.deps import get_db
from .users import get_current_active_user, get_current_admin_user

router = APIRouter(prefix="/leave", tags=["Leave"])


@router.post(
    "/apply", response_model=schemas.LeaveRequest, status_code=status.HTTP_201_CREATED
)
async def apply_for_leave(
    *,
    db: Session = Depends(get_db),
    leave_in: schemas.LeaveRequestCreate = Depends(),
    attachment: UploadFile = File(None),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Allows an employee to apply for leave.
    Attachment is optional. In a real app, this would be saved to a file store
    and the URL would be stored in `attachment_url`.
    """
    # Placeholder for file upload logic
    attachment_url = None
    if attachment:
        # For demo, we'll just use the filename.
        # In a real app:
        # file_location = f"files/{attachment.filename}"
        # with open(file_location, "wb+") as file_object:
        #     file_object.write(attachment.file.read())
        # attachment_url = file_location
        attachment_url = f"uploads/{attachment.filename}"  # Dummy URL
        print(f"Received attachment: {attachment.filename}")

    leave_request = models.LeaveRequest(
        **leave_in.dict(), user_id=current_user.id, attachment_url=attachment_url
    )
    db.add(leave_request)
    db.commit()
    db.refresh(leave_request)
    return leave_request


@router.get("/", response_model=List[schemas.LeaveRequest])
def get_leave_requests(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_active_user),
):
    """
    Retrieves leave requests.
    - Admins see all requests in their company.
    - Employees see only their own requests.
    """
    if current_user.role == schemas.UserRole.ADMIN:
        company_user_ids = [user.id for user in current_user.company.users]
        return (
            db.query(models.LeaveRequest)
            .filter(models.LeaveRequest.user_id.in_(company_user_ids))
            .all()
        )

    return (
        db.query(models.LeaveRequest)
        .filter(models.LeaveRequest.user_id == current_user.id)
        .all()
    )


@router.put("/{request_id}/status", response_model=schemas.LeaveRequest)
def update_leave_request_status(
    request_id: int,
    status_in: schemas.LeaveRequestUpdateStatus,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_admin_user),
):
    """
    Approve or reject a leave request. (Admin only)
    """
    leave_request = (
        db.query(models.LeaveRequest)
        .filter(models.LeaveRequest.id == request_id)
        .first()
    )

    if not leave_request:
        raise HTTPException(status_code=404, detail="Leave request not found")

    # Check if the admin belongs to the same company as the user who made the request
    if leave_request.employee.company_id != current_user.company_id:
        raise HTTPException(
            status_code=403, detail="Not authorized to update this request"
        )

    leave_request.status = status_in.status
    leave_request.admin_comments = status_in.comments
    db.commit()
    db.refresh(leave_request)
    return leave_request
