"use client"

import { Clock, Calendar, DollarSign, Home, User, Bell, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard" },
    { id: "attendance", icon: Clock, label: "Attendance" },
    { id: "leaves", icon: Calendar, label: "Leaves" },
    { id: "payroll", icon: DollarSign, label: "Payroll" },
    { id: "profile", icon: User, label: "My Profile" },
    { id: "announcements", icon: Bell, label: "Announcements" },
    { id: "documents", icon: FileText, label: "Documents" },
  ]

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground overflow-y-auto">
      <div className="p-6 border-b border-sidebar-border sticky top-0 bg-sidebar">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">Dayflow</h1>
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
