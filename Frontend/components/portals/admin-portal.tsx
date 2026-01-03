"use client"

import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { AttendanceReports } from "@/components/admin/attendance-reports"
import { CompanySettings } from "@/components/admin/company-settings"
import { Departments } from "@/components/admin/departments"
import { EmployeeManagement } from "@/components/admin/employee-management"
import { LeaveManagement } from "@/components/admin/leave-management"
import { Reports } from "@/components/admin/reports"
import { Roles } from "@/components/admin/roles"
import { SalaryStructure } from "@/components/admin/salary-structure"
import { Header } from "@/components/layout/header"
import { useEmployees } from "@/hooks/use-employees"
import { useAuth } from "@/lib/auth-context"
import { mockCompanySettings as initialCompanySettings } from "@/lib/mock-data"
import { useState } from "react"

export function AdminPortal() {
  const { logout } = useAuth()
  const [currentPage, setCurrentPage] = useState("dashboard")
  const { employees, setEmployees } = useEmployees()
  const [companySettings, setCompanySettings] = useState(initialCompanySettings)

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={logout} />
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {currentPage === "dashboard" && <AdminDashboard employees={employees} />}
            {currentPage === "employees" && <EmployeeManagement employees={employees} setEmployees={setEmployees} />}
            {currentPage === "attendance" && <AttendanceReports />}
            {currentPage === "leaves" && <LeaveManagement />}
            {currentPage === "departments" && <Departments />}
            {currentPage === "roles" && <Roles />}
            {currentPage === "salary" && <SalaryStructure />}
            {currentPage === "reports" && <Reports />}
            {currentPage === "company-settings" && (
              <CompanySettings settings={companySettings} onSave={setCompanySettings} />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
