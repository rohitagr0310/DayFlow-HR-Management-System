"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SalaryStructure {
  id: string
  role: string
  baseSalary: number
  hra: number
  dearness: number
  conveyance: number
  other: number
  pf: number
  insurance: number
  tax: number
}

const mockSalaryStructures: SalaryStructure[] = [
  {
    id: "1",
    role: "Manager",
    baseSalary: 60000,
    hra: 12000,
    dearness: 3000,
    conveyance: 1500,
    other: 2000,
    pf: 7200,
    insurance: 2000,
    tax: 8000,
  },
  {
    id: "2",
    role: "Senior Engineer",
    baseSalary: 80000,
    hra: 16000,
    dearness: 4000,
    conveyance: 2000,
    other: 2500,
    pf: 9600,
    insurance: 2500,
    tax: 10000,
  },
  {
    id: "3",
    role: "Engineer",
    baseSalary: 50000,
    hra: 10000,
    dearness: 2500,
    conveyance: 1500,
    other: 1500,
    pf: 6000,
    insurance: 1500,
    tax: 6000,
  },
]

export function SalaryStructure() {
  const [structures, setStructures] = useState<SalaryStructure[]>(mockSalaryStructures)
  const [showForm, setShowForm] = useState(false)

  const calculateGross = (s: SalaryStructure) => s.baseSalary + s.hra + s.dearness + s.conveyance + s.other
  const calculateDeductions = (s: SalaryStructure) => s.pf + s.insurance + s.tax
  const calculateNet = (s: SalaryStructure) => calculateGross(s) - calculateDeductions(s)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Salary Structure</h2>
          <p className="text-muted-foreground">Manage salary components for roles</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Structure
        </Button>
      </div>

      <div className="grid gap-4">
        {structures.map((salary) => {
          const gross = calculateGross(salary)
          const deductions = calculateDeductions(salary)
          const net = calculateNet(salary)
          return (
            <Card key={salary.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{salary.role}</CardTitle>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4 text-sm mb-4">
                  <div className="bg-green-50 dark:bg-green-950 p-3 rounded">
                    <p className="text-muted-foreground">Gross Salary</p>
                    <p className="text-xl font-bold text-green-600 dark:text-green-400">₹{gross.toLocaleString()}</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950 p-3 rounded">
                    <p className="text-muted-foreground">Deductions</p>
                    <p className="text-xl font-bold text-red-600 dark:text-red-400">₹{deductions.toLocaleString()}</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-3 rounded">
                    <p className="text-muted-foreground">Net Salary</p>
                    <p className="text-xl font-bold text-blue-600 dark:text-blue-400">₹{net.toLocaleString()}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground">Components</p>
                    <p className="text-xs">Base: ₹{salary.baseSalary.toLocaleString()}</p>
                    <p className="text-xs">HRA: ₹{salary.hra.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
