import requests
import json
import random
import sys

BASE_URL = "http://localhost:8001"

def test_flow():
    rand_int = random.randint(1000, 9999)
    email = f"api_admin_{rand_int}@apitest.com"
    password = "StrongPassword123!"
    
    # 1. Signup
    print(f"Testing Signup for {email}...")
    signup_url = f"{BASE_URL}/auth/register-company"
    signup_payload = {
        "company_name": f"API Test Corp {rand_int}",
        "admin_name": "API Admin",
        "email": email,
        "password": password
    }
    
    try:
        response = requests.post(signup_url, json=signup_payload)
        
        if response.status_code == 201:
            print("Signup Successful!")
            print(response.json())
        elif response.status_code == 400 and "Email already registered" in response.text:
            print("User already exists (unexpected for random email).")
        else:
            print(f"Signup Failed: {response.status_code}")
            print(response.text)
            return False
            
    except requests.exceptions.ConnectionError:
        print(f"Error: Could not connect to {BASE_URL}. Is the backend running?")
        return False

    # 2. Login
    print("\nTesting Login...")
    login_url = f"{BASE_URL}/auth/login"
    login_payload = {
        "username": email,
        "password": password
    }
    
    response = requests.post(login_url, data=login_payload)
    
    if response.status_code == 200:
        print("Login Successful!")
        token_data = response.json()
        print(f"Token Type: {token_data.get('token_type')}")
        print("Access Token obtained.")
        return True
    else:
        print(f"Login Failed: {response.status_code}")
        print(response.text)
        return False

if __name__ == "__main__":
    if test_flow():
        print("\nFlow Verification COMPLETE: SUCCESS")
    else:
        print("\nFlow Verification FAILED")
