from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .database.database import engine, Base
from .routers import auth, users, attendance, leave, payroll

# This command will create all tables in the database.
# In a real production environment, you would use a migration tool like Alembic.
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Dayflow HRMS API",
    description="The backend API for the Dayflow Human Resource Management System.",
    version="1.0.0",
)

# CORS (Cross-Origin Resource Sharing)
# In a production environment, you should restrict this to your frontend's domain.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include API routers
app.include_router(auth.router)
app.include_router(users.router)
app.include_router(attendance.router)
app.include_router(leave.router)
app.include_router(payroll.router)


@app.get("/", tags=["Root"])
def read_root():
    return {"message": "Welcome to the Dayflow HRMS API"}
