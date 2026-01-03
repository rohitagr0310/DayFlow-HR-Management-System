"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, X } from "lucide-react"

export function LeaveManagement() {
  const leaveRequests = [
    {
      id: "1",
      employee: "John Doe",
      type: "Paid",
      from: "2025-01-10",
      to: "2025-01-12",
      reason: "Personal work",
      status: "Approved",
    },
    {
      id: "2",
      employee: "Jane Smith",
      type: "Sick",
      from: "2025-01-05",
      to: "2025-01-05",
      reason: "Medical appointment",
      status: "Pending",
    },
    {
      id: "3",
      employee: "Robert Johnson",
      type: "Casual",
      from: "2025-01-03",
      to: "2025-01-04",
      reason: "Family emergency",
      status: "Approved",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Leave Management</h1>
        <p className="text-muted-foreground mt-1">Manage employee leave requests</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="all">All Requests</TabsTrigger>
          <TabsTrigger value="policy">Leave Policy</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Leave Requests</CardTitle>
              <CardDescription>Requests awaiting approval</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests
                    .filter((r) => r.status === "Pending")
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.employee}</TableCell>
                        <TableCell>{request.type}</TableCell>
                        <TableCell>{request.from}</TableCell>
                        <TableCell>{request.to}</TableCell>
                        <TableCell>{request.reason}</TableCell>
                        <TableCell className="space-x-2">
                          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                            <Check className="w-4 h-4" />
                            Approve
                          </Button>
                          <Button variant="outline" size="sm" className="gap-2 text-red-600 bg-transparent">
                            <X className="w-4 h-4" />
                            Reject
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Leave Requests</CardTitle>
              <CardDescription>Complete history of leave requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaveRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.employee}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.from}</TableCell>
                      <TableCell>{request.to}</TableCell>
                      <TableCell>
                        <Badge variant={request.status === "Approved" ? "default" : "secondary"}>
                          {request.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policy">
          <Card>
            <CardHeader>
              <CardTitle>Leave Policy</CardTitle>
              <CardDescription>Configure leave policies for your organization</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Leave policy configuration coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
