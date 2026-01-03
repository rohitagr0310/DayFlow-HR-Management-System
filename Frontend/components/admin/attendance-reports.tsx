"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function AttendanceReports() {
  const attendanceData = [
    { name: "John Doe", date: "2025-01-03", checkIn: "09:00 AM", checkOut: "06:30 PM", hours: 9.5, status: "Present" },
    {
      name: "Jane Smith",
      date: "2025-01-03",
      checkIn: "08:45 AM",
      checkOut: "06:00 PM",
      hours: 9.25,
      status: "Present",
    },
    { name: "Robert Johnson", date: "2025-01-03", checkIn: "-", checkOut: "-", hours: 0, status: "OnLeave" },
    {
      name: "Sarah Williams",
      date: "2025-01-03",
      checkIn: "09:15 AM",
      checkOut: "05:45 PM",
      hours: 8.5,
      status: "Present",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Attendance Reports</h1>
        <p className="text-muted-foreground mt-1">View and analyze attendance records</p>
      </div>

      <Tabs defaultValue="daily" className="space-y-4">
        <TabsList>
          <TabsTrigger value="daily">Daily Report</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>January 3, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Check-In</TableHead>
                    <TableHead>Check-Out</TableHead>
                    <TableHead>Hours</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attendanceData.map((record, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{record.name}</TableCell>
                      <TableCell>{record.checkIn}</TableCell>
                      <TableCell>{record.checkOut}</TableCell>
                      <TableCell>{record.hours}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.status === "Present"
                              ? "default"
                              : record.status === "OnLeave"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {record.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Attendance</CardTitle>
              <CardDescription>January 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Monthly attendance summary coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
              <CardDescription>Overall statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Summary statistics coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
