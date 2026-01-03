"use client"

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const attendanceData = [
  { month: "Jan", present: 340, absent: 20, late: 10 },
  { month: "Feb", present: 355, absent: 15, late: 8 },
  { month: "Mar", present: 360, absent: 12, late: 6 },
  { month: "Apr", present: 365, absent: 10, late: 5 },
]

const departmentDistribution = [
  { name: "Engineering", value: 40, color: "#3b82f6" },
  { name: "Sales", value: 25, color: "#10b981" },
  { name: "HR", value: 15, color: "#f59e0b" },
  { name: "Finance", value: 10, color: "#ef4444" },
  { name: "Operations", value: 10, color: "#8b5cf6" },
]

const salaryTrendData = [
  { month: "Jan", actualSpend: 450000, budgeted: 450000 },
  { month: "Feb", actualSpend: 455000, budgeted: 450000 },
  { month: "Mar", actualSpend: 460000, budgeted: 450000 },
  { month: "Apr", actualSpend: 465000, budgeted: 450000 },
]

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Analytics & Reports</h2>
        <p className="text-muted-foreground">Organization-wide analytics and performance metrics</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Trends</CardTitle>
            <CardDescription>Monthly attendance summary</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="present" fill="#10b981" />
                <Bar dataKey="absent" fill="#ef4444" />
                <Bar dataKey="late" fill="#f59e0b" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Distribution</CardTitle>
            <CardDescription>Employee count by department</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={departmentDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {departmentDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Salary Expense Trend</CardTitle>
            <CardDescription>Actual vs Budgeted spend</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salaryTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                <Legend />
                <Line type="monotone" dataKey="actualSpend" stroke="#3b82f6" name="Actual Spend" />
                <Line type="monotone" dataKey="budgeted" stroke="#10b981" name="Budgeted" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Key Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded">
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">145</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded">
              <p className="text-sm text-muted-foreground">Avg Attendance</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">94.2%</p>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded">
              <p className="text-sm text-muted-foreground">Pending Leaves</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">12</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded">
              <p className="text-sm text-muted-foreground">Monthly Payroll</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">₹45L</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
