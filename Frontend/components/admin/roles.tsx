"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface Role {
  id: string
  name: string
  description: string
  employees: number
  permissions: string[]
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Manager",
    description: "Department Manager",
    employees: 5,
    permissions: ["View Reports", "Approve Leave", "Manage Team"],
  },
  {
    id: "2",
    name: "Senior Engineer",
    description: "Senior Software Engineer",
    employees: 8,
    permissions: ["View Reports", "Code Review"],
  },
  {
    id: "3",
    name: "HR Executive",
    description: "Human Resources",
    employees: 3,
    permissions: ["Manage Employees", "Payroll", "Leave Mgmt"],
  },
  {
    id: "4",
    name: "Finance Lead",
    description: "Finance Manager",
    employees: 2,
    permissions: ["View Payroll", "Approve Expenses"],
  },
]

export function Roles() {
  const [roles, setRoles] = useState<Role[]>(mockRoles)
  const [showForm, setShowForm] = useState(false)
  const [newRole, setNewRole] = useState({ name: "", description: "" })

  const handleAdd = () => {
    if (newRole.name && newRole.description) {
      setRoles([...roles, { id: String(roles.length + 1), ...newRole, employees: 0, permissions: [] }])
      setNewRole({ name: "", description: "" })
      setShowForm(false)
    }
  }

  const handleDelete = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Roles & Designations</h2>
          <p className="text-muted-foreground">Manage employee roles and permissions</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Role
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Role</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Role Name</Label>
              <Input
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                placeholder="e.g., Senior Developer"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={newRole.description}
                onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                placeholder="Role description"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd}>Save Role</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {roles.map((role) => (
          <Card key={role.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{role.name}</CardTitle>
                  <CardDescription>{role.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(role.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Employees</p>
                  <p className="text-2xl font-bold">{role.employees}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge>Active</Badge>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm, idx) => (
                    <Badge key={idx} variant="secondary">
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
