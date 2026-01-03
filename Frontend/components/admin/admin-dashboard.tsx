"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Users, TrendingUp, AlertCircle, CheckCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { Employee } from "@/lib/mock-data"

interface AdminDashboardProps {
  employees: Employee[]
}

export function AdminDashboard({ employees }: AdminDashboardProps) {
  const activeEmployees = employees.filter((e) => e.status === "Active").length
  const inactiveEmployees = employees.filter((e) => e.status === "Inactive").length

  const stats = [
    { title: "Total Employees", value: employees.length, icon: <Users className="w-6 h-6" />, color: "blue" as const },
    { title: "Active", value: activeEmployees, icon: <CheckCircle className="w-6 h-6" />, color: "green" as const },
    { title: "Inactive", value: inactiveEmployees, icon: <AlertCircle className="w-6 h-6" />, color: "red" as const },
    { title: "Growth", value: "+12%", icon: <TrendingUp className="w-6 h-6" />, color: "purple" as const },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Overview and management of your organization</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatsCard key={i} {...stat} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Employees</CardTitle>
          <CardDescription>Latest employee additions to your organization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employees.slice(0, 5).map((emp) => (
                <TableRow key={emp.id}>
                  <TableCell className="font-medium">
                    {emp.firstName} {emp.lastName}
                  </TableCell>
                  <TableCell>{emp.email}</TableCell>
                  <TableCell>{emp.department}</TableCell>
                  <TableCell>
                    <Badge variant={emp.status === "Active" ? "default" : "secondary"}>{emp.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
