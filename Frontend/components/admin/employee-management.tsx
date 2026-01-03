"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { EmployeeForm } from "@/components/employees/employee-form"
import type { Employee } from "@/lib/mock-data"
import { Plus, Edit2, Trash2 } from "lucide-react"

interface EmployeeManagementProps {
  employees: Employee[]
  setEmployees: (employees: Employee[]) => void
}

export function EmployeeManagement({ employees, setEmployees }: EmployeeManagementProps) {
  const [showForm, setShowForm] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | undefined>()
  const [searchTerm, setSearchTerm] = useState("")

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddEmployee = () => {
    setEditingEmployee(undefined)
    setShowForm(true)
  }

  const handleEditEmployee = (employee: Employee) => {
    setEditingEmployee(employee)
    setShowForm(true)
  }

  const handleSaveEmployee = (data: Omit<Employee, "id">) => {
    if (editingEmployee) {
      setEmployees(employees.map((e) => (e.id === editingEmployee.id ? { ...e, ...data } : e)))
    } else {
      const newEmployee: Employee = {
        ...data,
        id: `EMP${String(employees.length + 1).padStart(3, "0")}`,
      }
      setEmployees([...employees, newEmployee])
    }
    setShowForm(false)
  }

  const handleDeleteEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employee Management</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your workforce</p>
        </div>
        <Button onClick={handleAddEmployee} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </Button>
      </div>

      {showForm ? (
        <EmployeeForm employee={editingEmployee} onSubmit={handleSaveEmployee} onCancel={() => setShowForm(false)} />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>All registered employees in your organization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEmployees.map((emp) => (
                  <TableRow key={emp.id}>
                    <TableCell className="font-medium">
                      {emp.firstName} {emp.lastName}
                    </TableCell>
                    <TableCell>{emp.email}</TableCell>
                    <TableCell>{emp.department}</TableCell>
                    <TableCell>{emp.designation}</TableCell>
                    <TableCell>
                      <Badge variant={emp.status === "Active" ? "default" : "secondary"}>{emp.status}</Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleEditEmployee(emp)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleDeleteEmployee(emp.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
