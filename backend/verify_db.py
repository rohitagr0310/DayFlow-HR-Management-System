import os
from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker

# Database connection string from .env
DATABASE_URL = "postgresql://dayflow_user:dayflow_password@localhost:5432/dayflow_db"

def verify_user(email):
    try:
        engine = create_engine(DATABASE_URL)
        SessionLocal = sessionmaker(bind=engine)
        session = SessionLocal()

        print(f"Checking for user with email: {email}")
        
        # SQL query to check user
        query = text("SELECT id, email, first_name, last_name, role, company_id FROM users WHERE email = :email")
        result = session.execute(query, {"email": email}).fetchone()
        
        if result:
            print(f"User found: ID={result.id}, Email={result.email}, Role={result.role}, CompanyID={result.company_id}")
            
            # Check company
            company_query = text("SELECT id, name FROM companies WHERE id = :id")
            company_result = session.execute(company_query, {"id": result.company_id}).fetchone()
            if company_result:
                print(f"Company found: ID={company_result.id}, Name={company_result.name}")
            else:
                print("Error: Linked company not found!")
            
            return True
        else:
            print("User not found.")
            return False
            
    except Exception as e:
        print(f"Database error: {e}")
        return False
    finally:
        session.close()

if __name__ == "__main__":
    verify_user("testadmin@testcorp.com")
