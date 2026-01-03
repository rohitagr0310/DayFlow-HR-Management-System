"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Employee } from "@/lib/mock-data"

interface EmployeeFormProps {
  employee?: Employee
  onSubmit: (employee: Omit<Employee, "id">) => void
  onCancel: () => void
}

export function EmployeeForm({ employee, onSubmit, onCancel }: EmployeeFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "Engineering",
    designation: "",
    dateOfJoining: new Date().toISOString().split("T")[0],
    salary: 0,
    status: "Active" as const,
  })

  useEffect(() => {
    if (employee) {
      setFormData({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        department: employee.department,
        designation: employee.designation,
        dateOfJoining: employee.dateOfJoining,
        salary: employee.salary,
        status: employee.status,
      })
    }
  }, [employee])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "salary" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{employee ? "Edit Employee" : "Add New Employee"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">First Name</label>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Last Name</label>
              <Input
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@company.com"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Phone</label>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1-555-0000"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
              >
                <option>Engineering</option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Designation</label>
              <Input
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="Job title"
                className="mt-1"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Date of Joining</label>
              <Input
                name="dateOfJoining"
                type="date"
                value={formData.dateOfJoining}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Salary</label>
              <Input
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleChange}
                placeholder="0"
                className="mt-1"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{employee ? "Update" : "Add"} Employee</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
