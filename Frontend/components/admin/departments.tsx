"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Department {
  id: string
  name: string
  description: string
  headCount: number
  manager: string
}

const mockDepartments: Department[] = [
  { id: "1", name: "Human Resources", description: "HR and Recruitment", headCount: 5, manager: "Alice Johnson" },
  { id: "2", name: "Engineering", description: "Software Development", headCount: 12, manager: "Bob Smith" },
  { id: "3", name: "Marketing", description: "Marketing and Communications", headCount: 4, manager: "Carol White" },
  { id: "4", name: "Finance", description: "Accounting and Finance", headCount: 3, manager: "David Brown" },
  { id: "5", name: "Operations", description: "Business Operations", headCount: 6, manager: "Emma Davis" },
]

export function Departments() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments)
  const [showForm, setShowForm] = useState(false)
  const [newDept, setNewDept] = useState({ name: "", description: "", manager: "" })

  const handleAdd = () => {
    if (newDept.name && newDept.description) {
      setDepartments([...departments, { id: String(departments.length + 1), ...newDept, headCount: 0 }])
      setNewDept({ name: "", description: "", manager: "" })
      setShowForm(false)
    }
  }

  const handleDelete = (id: string) => {
    setDepartments(departments.filter((d) => d.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Departments</h2>
          <p className="text-muted-foreground">Manage organization departments</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Department
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Department</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Department Name</Label>
                <Input
                  value={newDept.name}
                  onChange={(e) => setNewDept({ ...newDept, name: e.target.value })}
                  placeholder="e.g., Engineering"
                />
              </div>
              <div className="space-y-2">
                <Label>Manager</Label>
                <Input
                  value={newDept.manager}
                  onChange={(e) => setNewDept({ ...newDept, manager: e.target.value })}
                  placeholder="Department manager name"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={newDept.description}
                onChange={(e) => setNewDept({ ...newDept, description: e.target.value })}
                placeholder="Department description"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd}>Save Department</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4">
        {departments.map((dept) => (
          <Card key={dept.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{dept.name}</CardTitle>
                  <CardDescription>{dept.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(dept.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Head Count</p>
                  <p className="text-2xl font-bold">{dept.headCount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Manager</p>
                  <p className="font-medium">{dept.manager}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-green-600 dark:text-green-400">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
