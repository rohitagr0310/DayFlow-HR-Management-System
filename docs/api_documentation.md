# Dayflow API Documentation (Detailed)

This document provides a detailed specification of the Dayflow HRMS RESTful API, including data models, endpoints, request/response formats, and status codes.

## Base URL & Authentication

-   **Base URL**: All API endpoints are prefixed with `/api`.
-   **Authentication**: All endpoints (except `register-company` and `login`) require a `Bearer Token` in the `Authorization` header. The token is obtained from the `POST /auth/login` endpoint.

---

## Data Models

#### `Company`
```typescript
{
  id: string; // UUID
  name: string;
  logoUrl: string;
  createdAt: string; // ISO 8601
}
```

#### `User`
```typescript
{
  id: string; // UUID
  companyId: string;
  loginId: string; // e.g., JODO2023001
  email: string;
  firstName: string;
  lastName: string;
  role: "Admin" | "Employee";
  profilePictureUrl: string;
  joiningDate: string; // YYYY-MM-DD
  privateInfo: {
    dateOfBirth: string; // YYYY-MM-DD
    personalEmail: string;
    phone: string;
    address: string;
    gender: "Male" | "Female" | "Other";
    maritalStatus: "Single" | "Married";
    nationality: string;
    emergencyContact: string;
  };
  resume: {
    description: string;
    skills: string[];
    certifications: string[];
  };
}
```

#### `SalarySettings` (Admin Only)
```typescript
{
  monthlyWage: number;
  workDaysPerWeek: number;
  workHoursPerDay: number;
  components: {
    name: string; // e.g., "Basic", "HRA"
    type: "PercentageOfWage" | "PercentageOfBasic" | "Fixed";
    value: number; // The percentage (e.g., 50) or fixed amount
  }[];
}
```

---

## 1. Authentication & Company

### `POST /auth/register-company`

-   **Description**: Registers a new company and its first administrator.
-   **Request Body**:
    ```json
    {
      "companyName": "Innovate Corp",
      "adminName": "Alice Wonder",
      "email": "alice@innovate.com",
      "password": "strongpassword123"
    }
    ```
-   **Responses**:
    -   `201 Created`:
        ```json
        {
          "message": "Company and admin account created successfully.",
          "company": { /* Company object */ },
          "admin": { /* User object */ }
        }
        ```
    -   `400 Bad Request`: Validation error (e.g., password too weak, email already exists).

### `POST /auth/login`

-   **Description**: Logs in an existing user.
-   **Request Body**:
    ```json
    { "email": "alice@innovate.com", "password": "strongpassword123" }
    ```
-   **Responses**:
    -   `200 OK`:
        ```json
        {
          "token": "jwt.token.string",
          "user": { "id": "...", "role": "Admin", "name": "Alice Wonder" }
        }
        ```
    -   `401 Unauthorized`: Invalid credentials.

---

## 2. User & Profile Management

### `POST /users`

-   **Description**: Creates a new user (employee or admin). Server auto-generates Login ID and temporary password.
-   **Access**: Admin
-   **Request Body**:
    ```json
    {
      "firstName": "Bob",
      "lastName": "Builder",
      "email": "bob@innovate.com",
      "role": "Employee",
      "joiningDate": "2023-11-01"
    }
    ```
-   **Responses**:
    -   `201 Created`:
        ```json
        {
          "message": "User created successfully.",
          "user": { /* User object */ },
          "tempPassword": "generated-password-to-display"
        }
        ```
    -   `403 Forbidden`: Requesting user is not an Admin.

### `GET /users`

-   **Description**: Retrieves a summary list of all employees.
-   **Access**: All authenticated users.
-   **Response `200 OK`**:
    ```json
    [
      {
        "id": "user-uuid-bob",
        "name": "Bob Builder",
        "profilePictureUrl": "...",
        "attendanceStatus": "Present" // Present, Absent, OnLeave
      }
    ]
    ```

### `GET /users/{id}`

-   **Description**: Retrieves a single user's full profile.
-   **Access**: Employee (own profile), Admin (any profile).
-   **Response `200 OK`**: A full `User` object. The `salaryInfo` field is only included if the requester is an Admin.

### `PUT /users/{id}`

-   **Description**: Updates a user's profile. Employees can only update parts of `privateInfo` and `resume`.
-   **Access**: Employee (own profile), Admin (any profile).
-   **Request Body**: A partial `User` object with fields to update.
    ```json
    {
      "resume": { "skills": ["React", "Node.js", "MongoDB"] }
    }
    ```
-   **Response `200 OK`**: `{ "message": "Profile updated successfully.", "user": { /* updated User object */ } }`

---

## 3. Salary & Payroll (Admin Only)

### `GET /payroll/settings/{userId}`

-   **Description**: Retrieves the configured salary structure for a user.
-   **Access**: Admin
-   **Response `200 OK`**: A `SalarySettings` object.

### `PUT /payroll/settings/{userId}`

-   **Description**: Creates or updates the salary structure for a user.
-   **Access**: Admin
-   **Request Body**: A full `SalarySettings` object.
-   **Response `200 OK`**: `{ "message": "Payroll settings updated successfully." }`

---

## 4. Attendance

### `GET /attendance`

-   **Description**: Retrieves attendance records.
-   **Access**: Employee (own records), Admin (all records, filterable by `userId`).
-   **Query Params**: `?userId={id}&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
-   **Response `200 OK`**:
    ```json
    [
      {
        "date": "2026-01-03",
        "status": "Present",
        "checkIn": "09:01",
        "checkOut": "17:35",
        "workHours": "8h 34m"
      }
    ]
    ```

### `POST /attendance/check-in`

-   **Description**: Records a check-in for the currently authenticated user.
-   **Access**: Employee
-   **Response `200 OK`**: `{ "message": "Checked-in successfully at 09:01." }`

### `POST /attendance/check-out`

-   **Description**: Records a check-out for the currently authenticated user.
-   **Access**: Employee
-   **Response `200 OK`**: `{ "message": "Checked-out successfully at 17:35." }`

---

## 5. Leave & Time-Off

### `POST /leave/apply`

-   **Description**: Submits a leave request. Use `multipart/form-data` for attachments.
-   **Access**: Employee
-   **Request Body**:
    ```json
    {
      "leaveType": "Sick",
      "startDate": "2026-02-10",
      "endDate": "2026-02-11",
      "remarks": "Doctor's appointment.",
      "attachment": "(optional file)"
    }
    ```
-   **Response `201 Created`**: `{ "message": "Leave request submitted.", "leaveRequest": { ... } }`

### `GET /leave`

-   **Description**: Retrieves leave requests.
-   **Access**: Employee (own), Admin (all, filterable).
-   **Query Params**: `?status=Pending|Approved|Rejected&userId={id}`
-   **Response `200 OK`**: An array of leave request objects.

### `PUT /leave/{id}/status`

-   **Description**: Approves or rejects a leave request.
-   **Access**: Admin
-   **Request Body**:
    ```json
    {
      "status": "Approved", // or "Rejected"
      "comments": "Get well soon."
    }
    ```
-   **Response `200 OK`**: `{ "message": "Leave request has been Approved." }`