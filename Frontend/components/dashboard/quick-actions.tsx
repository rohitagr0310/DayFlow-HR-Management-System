"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, Calendar, FileText } from "lucide-react"

interface QuickActionsProps {
  onAction: (action: string) => void
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    { id: "employees", icon: Users, label: "Employee List", color: "from-blue-500 to-blue-600" },
    { id: "attendance", icon: Clock, label: "Mark Attendance", color: "from-green-500 to-green-600" },
    { id: "leaves", icon: Calendar, label: "Apply Leave", color: "from-orange-500 to-orange-600" },
    { id: "payroll", icon: FileText, label: "View Payslips", color: "from-purple-500 to-purple-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {actions.map((action) => {
        const Icon = action.icon
        return (
          <Card
            key={action.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => onAction(action.id)}
          >
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className={`bg-gradient-to-br ${action.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="font-semibold text-foreground">{action.label}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
