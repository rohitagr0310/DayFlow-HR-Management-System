# Dayflow - Human Resource Management System

*Every workday, perfectly aligned.*

---

## 1. Executive Summary

Dayflow is a comprehensive, multi-tenant Human Resource Management System (HRMS) designed to eliminate the inefficiencies of manual HR processes. It provides a secure, centralized, and streamlined platform for managing the entire employee lifecycle, from onboarding and profile management to attendance, leave, and payroll.

The system is built around a role-based access model, providing distinct, tailored experiences for Administrators and Employees. By automating key workflows like salary calculation and leave tracking, Dayflow reduces administrative overhead, minimizes human error, and provides clear visibility into workforce data.

---

## 2. System Architecture & User Management

### 2.1. Onboarding a New Company

The system's architecture begins with company registration, a one-time process for creating a new, isolated tenant.

1.  **Admin Sign-Up**: A company's journey with Dayflow starts when its first **Super Administrator** navigates to the Sign-Up page. They register the company by providing a company name, their own administrative credentials (name, email), and a password.
2.  **Tenant Creation**: This single act creates the company's dedicated workspace, ensuring all their data (employees, payroll, etc.) is kept separate from other companies.

### 2.2. User Roles and Access Control

| Role               | Access & Capabilities                                                                                                                                                                                                          |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Admin/HR Officer** | **Full System Control.** Can add/remove employees, view and edit all fields in any employee's profile, access the sensitive "Salary Info" tab, manage payroll, and approve/reject time-off requests. They are the system's power users. |
| **Employee**       | **Self-Service Access.** Can view their own profile, update non-critical personal information, track their personal attendance, view their salary history, and submit leave requests for approval. Their access is read-only for most system data. |

### 2.3. Employee Onboarding and Login

1.  **Admin Creates User**: Admins are responsible for adding all subsequent users to the system. When creating a user, the Admin provides basic details like name, email, and joining date.
2.  **Automatic Credential Generation**: The system then automatically generates a unique **Login ID** and a **temporary password** for the new employee.
    -   **Login ID Formula**: `First two letters of first name` + `First two letters of last name` + `Year of joining` + `3-digit serial number`. For example, **Jo**hn **Do**e joining in **2023** as the 5th employee would be `JODO2023005`.
3.  **Secure First Login**: The employee uses these credentials to log in. It is recommended that the system prompts the user to change their temporary password upon their first login to secure their account.

---

## 3. Core Features: A Detailed Breakdown

### 3.1. Main Dashboard & Employee Directory

The central hub of the application is the employee directory, which serves as a live overview of the workforce. It features a grid of **Employee Cards**, each providing at-a-glance information: the employee's photo, name, and a real-time **Status Indicator**:
-   **Green**: Employee is Checked-In and present.
-   **Yellow**: Employee is absent and has not applied for time off for the day.

A prominent **Check-In/Out** widget allows employees to mark their attendance directly from the dashboard, which instantly updates their status.

### 3.2. Employee Profile: The Digital Dossier

The employee profile is a comprehensive, tab-based record of all employee information.

#### 1. **Resume Tab**
Serves as a digital CV within the organization, containing the employee's professional summary, skills, and certifications.

#### 2. **Private Info Tab**
Centralizes critical HR data necessary for communication and record-keeping, such as date of birth, contact information, address, and emergency contacts.

#### 3. **Salary Info Tab (Visible to Admins ONLY)**
This is the control panel for an employee's compensation.
-   **Wage Structure**: Admins define a `Monthly Wage`, and the `Yearly Wage` is automatically calculated (`Monthly * 12`).
-   **Salary Components**: This powerful feature allows Admins to break down the monthly wage into components like:
    -   Basic
    -   House Rent Allowance (HRA)
    -   Performance Bonus
    -   Travel Allowance
-   **Automated Calculation Engine**: Each component can be a `Fixed` value or a `Percentage`. Percentage-based components are calculated from the `Basic` component's value, not the total wage.
    -   **Example Calculation**:
        -   `Monthly Wage`: ₹50,000
        -   `Basic` component is `50%` of Wage -> `₹25,000`
        -   `HRA` component is `50%` of **Basic** -> `₹12,500`
        -   `Fixed Allowance` is `Fixed` -> `₹2,000`
    -   The system ensures the sum of all components does not exceed the total `Monthly Wage`.

### 3.3. Attendance Module

This module forms the backbone of the payroll calculation, ensuring accuracy and transparency.
-   **Live Tracking**: Every check-in and check-out is logged.
-   **Detailed Records**: Employees and Admins can view day-wise breakdowns of attendance, including total work hours, break times, and extra hours.
-   **Payroll Integration**: The system uses this data to calculate the number of **payable days** for the month. Any unapproved absences or unpaid leave days automatically reduce the payable day count, ensuring payroll is always accurate.

### 3.4. Leave & Time-Off Module

This module automates the entire leave management workflow.
1.  **Submission**: An employee initiates a leave request, selecting the type (`Paid`, `Sick`, `Unpaid`), date range, and optionally attaching supporting documents (e.g., sick leave certificate).
2.  **Pending Approval**: The request enters a `Pending` state and is routed to the appropriate Admin/HR Officer.
3.  **Admin Review**: The Admin reviews the request, checks team availability, and can **Approve** or **Reject** it with comments.
4.  **Finalization**: The employee is notified of the outcome. If approved, the dates are logged, and the employee's available leave balance is automatically decremented.