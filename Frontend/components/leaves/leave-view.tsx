"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { LeaveRequest } from "@/lib/mock-data"

interface LeaveViewProps {
  leaveRequests: LeaveRequest[]
  leaveBalance: {
    sick: { total: number; used: number; remaining: number }
    casual: { total: number; used: number; remaining: number }
    paid: { total: number; used: number; remaining: number }
  }
  onApplyLeave: (leave: Omit<LeaveRequest, "id" | "appliedOn" | "status">) => void
}

export function LeaveView({ leaveRequests, leaveBalance, onApplyLeave }: LeaveViewProps) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    leaveType: "Casual" as const,
    startDate: "",
    endDate: "",
    reason: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onApplyLeave({
      employeeId: "EMP001",
      leaveType: formData.leaveType,
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
    })
    setShowForm(false)
    setFormData({ leaveType: "Casual", startDate: "", endDate: "", reason: "" })
  }

  return (
    <div className="space-y-6">
      {/* Leave Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { name: "Sick Leave", data: leaveBalance.sick },
          { name: "Casual Leave", data: leaveBalance.casual },
          { name: "Paid Leave", data: leaveBalance.paid },
        ].map((item) => (
          <Card key={item.name}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">{item.name}</p>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Total</span>
                    <span className="font-semibold">{item.data.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Used</span>
                    <span className="font-semibold">{item.data.used}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: `${(item.data.used / item.data.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">{item.data.remaining} days remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Apply Leave Form or Button */}
      {!showForm && (
        <Button onClick={() => setShowForm(true)} className="w-full md:w-auto">
          + Request Leave
        </Button>
      )}

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Request Leave</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Leave Type</label>
                <select
                  value={formData.leaveType}
                  onChange={(e) => setFormData({ ...formData, leaveType: e.target.value as any })}
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option>Casual</option>
                  <option>Sick</option>
                  <option>Paid</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Reason</label>
                <textarea
                  value={formData.reason}
                  onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  placeholder="Reason for leave..."
                  className="w-full mt-1 px-3 py-2 border border-input rounded-md bg-background"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Leave Requests History */}
      <Card>
        <CardHeader>
          <CardTitle>Leave Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaveRequests.map((request) => (
              <div key={request.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{request.leaveType} Leave</p>
                      <Badge
                        variant={
                          request.status === "Approved"
                            ? "default"
                            : request.status === "Rejected"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {request.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {request.startDate} to {request.endDate}
                    </p>
                    <p className="text-sm mt-1">{request.reason}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Applied on {request.appliedOn}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
