"use client"

import { Home, Users, Clock, Calendar, Building2, Briefcase, DollarSign, FileText, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AdminSidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function AdminSidebar({ currentPage, onNavigate }: AdminSidebarProps) {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "employees", icon: Users, label: "Employee Mgmt" },
    { id: "attendance", icon: Clock, label: "Attendance" },
    { id: "leaves", icon: Calendar, label: "Leave Mgmt" },
    { id: "departments", icon: Briefcase, label: "Departments" },
    { id: "roles", icon: FileText, label: "Roles" },
    { id: "salary", icon: DollarSign, label: "Salary Structure" },
    { id: "reports", icon: BarChart3, label: "Reports" },
    { id: "company-settings", icon: Building2, label: "Settings" },
  ]

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground overflow-y-auto">
      <div className="p-6 border-b border-sidebar-border sticky top-0 bg-sidebar">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Dayflow Admin</h1>
      </div>
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentPage === item.id
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className="w-full justify-start gap-3"
              onClick={() => onNavigate(item.id)}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Button>
          )
        })}
      </nav>
    </aside>
  )
}
