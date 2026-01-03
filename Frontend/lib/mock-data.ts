// Mock data for the Dayflow HRMS application
export interface Employee {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  designation: string
  dateOfJoining: string
  salary: number
  status: "Active" | "Inactive"
  avatar?: string
}

export interface AttendanceLog {
  id: string
  employeeId: string
  date: string
  checkInTime: string
  checkOutTime?: string
  totalHours?: number
  status: "Present" | "Absent" | "OnLeave"
}

export interface LeaveRequest {
  id: string
  employeeId: string
  leaveType: "Sick" | "Casual" | "Paid"
  startDate: string
  endDate: string
  reason: string
  status: "Pending" | "Approved" | "Rejected"
  appliedOn: string
}

export interface CompanySettings {
  name: string
  logo: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  country: string
  industry: string
  foundedYear: number
  website: string
  taxId: string
}

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  role: "Admin" | "HR" | "Employee"
  avatar?: string
}

export const mockEmployees: Employee[] = [
  {
    id: "EMP001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    phone: "+1-555-0101",
    department: "Engineering",
    designation: "Senior Developer",
    dateOfJoining: "2022-01-15",
    salary: 120000,
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  },
  {
    id: "EMP002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    phone: "+1-555-0102",
    department: "Marketing",
    designation: "Marketing Manager",
    dateOfJoining: "2021-06-20",
    salary: 95000,
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  },
  {
    id: "EMP003",
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.j@company.com",
    phone: "+1-555-0103",
    department: "Engineering",
    designation: "Junior Developer",
    dateOfJoining: "2023-03-10",
    salary: 75000,
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
  },
  {
    id: "EMP004",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.w@company.com",
    phone: "+1-555-0104",
    department: "HR",
    designation: "HR Specialist",
    dateOfJoining: "2020-11-05",
    salary: 65000,
    status: "Active",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: "EMP005",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.b@company.com",
    phone: "+1-555-0105",
    department: "Sales",
    designation: "Sales Executive",
    dateOfJoining: "2022-05-18",
    salary: 70000,
    status: "Inactive",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
  },
]

export const mockAttendanceLogs: AttendanceLog[] = [
  {
    id: "ATT001",
    employeeId: "EMP001",
    date: "2025-01-03",
    checkInTime: "09:00 AM",
    checkOutTime: "06:30 PM",
    totalHours: 9.5,
    status: "Present",
  },
  {
    id: "ATT002",
    employeeId: "EMP002",
    date: "2025-01-03",
    checkInTime: "08:45 AM",
    checkOutTime: "06:00 PM",
    totalHours: 9.25,
    status: "Present",
  },
  {
    id: "ATT003",
    employeeId: "EMP003",
    date: "2025-01-03",
    status: "OnLeave",
  },
  {
    id: "ATT004",
    employeeId: "EMP004",
    date: "2025-01-03",
    checkInTime: "09:15 AM",
    checkOutTime: "05:45 PM",
    totalHours: 8.5,
    status: "Present",
  },
  {
    id: "ATT005",
    employeeId: "EMP001",
    date: "2025-01-02",
    checkInTime: "09:05 AM",
    checkOutTime: "06:35 PM",
    totalHours: 9.5,
    status: "Present",
  },
  {
    id: "ATT006",
    employeeId: "EMP001",
    date: "2025-01-01",
    status: "Absent",
  },
]

export const mockLeaveRequests: LeaveRequest[] = [
  {
    id: "LEV001",
    employeeId: "EMP001",
    leaveType: "Paid",
    startDate: "2025-01-10",
    endDate: "2025-01-12",
    reason: "Personal work",
    status: "Approved",
    appliedOn: "2024-12-28",
  },
  {
    id: "LEV002",
    employeeId: "EMP002",
    leaveType: "Sick",
    startDate: "2025-01-05",
    endDate: "2025-01-05",
    reason: "Medical appointment",
    status: "Pending",
    appliedOn: "2025-01-03",
  },
  {
    id: "LEV003",
    employeeId: "EMP003",
    leaveType: "Casual",
    startDate: "2025-01-03",
    endDate: "2025-01-04",
    reason: "Family emergency",
    status: "Approved",
    appliedOn: "2024-12-30",
  },
  {
    id: "LEV004",
    employeeId: "EMP004",
    leaveType: "Paid",
    startDate: "2024-12-25",
    endDate: "2024-12-31",
    reason: "Vacation",
    status: "Approved",
    appliedOn: "2024-12-10",
  },
  {
    id: "LEV005",
    employeeId: "EMP001",
    leaveType: "Sick",
    startDate: "2024-12-20",
    endDate: "2024-12-20",
    reason: "Doctor appointment",
    status: "Rejected",
    appliedOn: "2024-12-19",
  },
]

export const mockCompanySettings: CompanySettings = {
  name: "Dayflow Enterprises",
  logo: "https://api.dicebear.com/7.x/initials/svg?seed=Dayflow&backgroundColor=0066cc&textColor=fff",
  email: "hr@dayflow.com",
  phone: "+1-555-0100",
  address: "123 Business Avenue",
  city: "San Francisco",
  state: "CA",
  zipCode: "94105",
  country: "United States",
  industry: "Technology",
  foundedYear: 2020,
  website: "www.dayflow.com",
  taxId: "98-7654321",
}

export const mockCurrentUser: User = {
  id: "EMP001",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@company.com",
  role: "Admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
}

export const mockAdminUser: User = {
  id: "ADM001",
  firstName: "Admin",
  lastName: "User",
  email: "admin@dayflow.com",
  role: "Admin",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
}

export const mockEmployeeUser: User = {
  id: "EMP002",
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@company.com",
  role: "Employee",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
}

export const leaveBalance = {
  sick: { total: 10, used: 2, remaining: 8 },
  casual: { total: 12, used: 3, remaining: 9 },
  paid: { total: 20, used: 5, remaining: 15 },
}

export const mockRecentActivity = [
  { id: "1", type: "Login", user: "John Doe", time: "09:00 AM", date: "2025-01-03" },
  { id: "2", type: "Leave Approved", user: "Jane Smith", time: "10:30 AM", date: "2025-01-03" },
  { id: "3", type: "Employee Added", user: "Sarah Williams", time: "02:15 PM", date: "2025-01-02" },
  { id: "4", type: "Attendance Marked", user: "Robert Johnson", time: "09:05 AM", date: "2025-01-02" },
]
