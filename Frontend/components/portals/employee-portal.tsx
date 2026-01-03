"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { StatsCard } from "@/components/dashboard/stats-card"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { AttendanceView } from "@/components/attendance/attendance-view"
import { LeaveView } from "@/components/leaves/leave-view"
import { PayrollView } from "@/components/payroll/payroll-view"
import { EmployeeProfile } from "@/components/employee/employee-profile"
import { Announcements } from "@/components/employee/announcements"
import { Documents } from "@/components/employee/documents"
import { mockRecentActivity, leaveBalance, type AttendanceLog, type LeaveRequest } from "@/lib/mock-data"
import { Users, Calendar, Clock } from "lucide-react"

export function EmployeePortal() {
  const { user, logout } = useAuth()
  const [currentPage, setCurrentPage] = useState("dashboard")
  const [attendanceLogs, setAttendanceLogs] = useState<AttendanceLog[]>([
    {
      id: "ATT001",
      employeeId: user?.id || "EMP002",
      date: "2025-01-03",
      checkInTime: "09:00 AM",
      checkOutTime: "06:30 PM",
      totalHours: 9.5,
      status: "Present",
    },
  ])
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([
    {
      id: "LEV001",
      employeeId: user?.id || "EMP002",
      leaveType: "Paid",
      startDate: "2025-01-10",
      endDate: "2025-01-12",
      reason: "Personal work",
      status: "Approved",
      appliedOn: "2024-12-28",
    },
  ])

  const handleClockIn = () => {
    const today = new Date().toISOString().split("T")[0]
    const checkInTime = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    setAttendanceLogs([
      ...attendanceLogs,
      {
        id: `ATT${String(attendanceLogs.length + 1).padStart(3, "0")}`,
        employeeId: user?.id || "EMP002",
        date: today,
        checkInTime,
        status: "Present",
      },
    ])
  }

  const handleClockOut = () => {
    const today = new Date().toISOString().split("T")[0]
    const updatedLogs = attendanceLogs.map((log) => {
      if (log.employeeId === (user?.id || "EMP002") && log.date === today && !log.checkOutTime) {
        const checkOut = new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        return { ...log, checkOutTime: checkOut }
      }
      return log
    })
    setAttendanceLogs(updatedLogs)
  }

  const handleApplyLeave = (data: Omit<LeaveRequest, "id" | "appliedOn" | "status">) => {
    const newLeave: LeaveRequest = {
      ...data,
      id: `LEV${String(leaveRequests.length + 1).padStart(3, "0")}`,
      appliedOn: new Date().toISOString().split("T")[0],
      status: "Pending",
    }
    setLeaveRequests([...leaveRequests, newLeave])
  }

  const stats = [
    { title: "Present Today", value: 1, icon: <Clock className="w-6 h-6" />, color: "green" as const },
    { title: "Leave Balance", value: 32, icon: <Calendar className="w-6 h-6" />, color: "blue" as const },
    { title: "Total Earnings", value: "$4,250", icon: <Users className="w-6 h-6" />, color: "purple" as const },
  ]

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={logout} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {currentPage === "dashboard" && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold">Welcome, {user?.firstName}!</h1>
                  <p className="text-muted-foreground mt-1">Here's your HRMS dashboard</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.map((stat, i) => (
                    <StatsCard key={i} {...stat} />
                  ))}
                </div>

                <QuickActions
                  onAction={(action) => {
                    if (action === "attendance") setCurrentPage("attendance")
                    else if (action === "leaves") setCurrentPage("leaves")
                    else if (action === "payroll") setCurrentPage("payroll")
                  }}
                />

                <RecentActivity activities={mockRecentActivity} />
              </div>
            )}

            {currentPage === "attendance" && (
              <AttendanceView logs={attendanceLogs} onClockIn={handleClockIn} onClockOut={handleClockOut} />
            )}

            {currentPage === "leaves" && (
              <LeaveView leaveRequests={leaveRequests} leaveBalance={leaveBalance} onApplyLeave={handleApplyLeave} />
            )}

            {currentPage === "payroll" && <PayrollView />}
            {currentPage === "profile" && <EmployeeProfile />}
            {currentPage === "announcements" && <Announcements />}
            {currentPage === "documents" && <Documents />}
          </div>
        </main>
      </div>
    </div>
  )
}
