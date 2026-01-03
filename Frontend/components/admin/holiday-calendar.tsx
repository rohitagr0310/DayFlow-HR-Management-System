"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface Holiday {
  id: string
  name: string
  date: string
  type: "national" | "regional" | "company"
  description: string
}

const mockHolidays: Holiday[] = [
  { id: "1", name: "New Year", date: "2025-01-01", type: "national", description: "New Year's Day" },
  { id: "2", name: "Republic Day", date: "2025-01-26", type: "national", description: "India Republic Day" },
  { id: "3", name: "Holi", date: "2025-03-14", type: "national", description: "Festival of Colors" },
  { id: "4", name: "Good Friday", date: "2025-04-18", type: "national", description: "Easter Holiday" },
  { id: "5", name: "Independence Day", date: "2025-08-15", type: "national", description: "India Independence Day" },
  { id: "6", name: "Company Founding", date: "2025-05-10", type: "company", description: "Company Foundation Day" },
]

export function HolidayCalendar() {
  const [holidays, setHolidays] = useState<Holiday[]>(mockHolidays)
  const [showForm, setShowForm] = useState(false)
  const [newHoliday, setNewHoliday] = useState({ name: "", date: "", type: "national" as const, description: "" })

  const handleAdd = () => {
    if (newHoliday.name && newHoliday.date) {
      setHolidays([...holidays, { id: String(holidays.length + 1), ...newHoliday }])
      setNewHoliday({ name: "", date: "", type: "national", description: "" })
      setShowForm(false)
    }
  }

  const typeColors = {
    national: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
    regional: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200",
    company: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200",
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Holiday Calendar</h2>
          <p className="text-muted-foreground">Manage company holidays and important dates</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Holiday
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add Holiday</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Holiday Name</Label>
                <Input
                  value={newHoliday.name}
                  onChange={(e) => setNewHoliday({ ...newHoliday, name: e.target.value })}
                  placeholder="e.g., Diwali"
                />
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newHoliday.date}
                  onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <select
                value={newHoliday.type}
                onChange={(e) => setNewHoliday({ ...newHoliday, type: e.target.value as any })}
                className="w-full border border-border rounded px-3 py-2 bg-background"
              >
                <option value="national">National Holiday</option>
                <option value="regional">Regional Holiday</option>
                <option value="company">Company Holiday</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Input
                value={newHoliday.description}
                onChange={(e) => setNewHoliday({ ...newHoliday, description: e.target.value })}
                placeholder="Holiday description"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAdd}>Save Holiday</Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-3">
        {holidays
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          .map((holiday) => (
            <Card key={holiday.id}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{holiday.name}</h3>
                      <Badge className={typeColors[holiday.type]}>{holiday.type}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{holiday.description}</p>
                    <p className="text-sm font-medium mt-2">
                      📅{" "}
                      {new Date(holiday.date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}
