"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock } from "lucide-react"
import type { AttendanceLog } from "@/lib/mock-data"

interface AttendanceViewProps {
  logs: AttendanceLog[]
  onClockIn: () => void
  onClockOut: () => void
}

export function AttendanceView({ logs, onClockIn, onClockOut }: AttendanceViewProps) {
  const [time, setTime] = useState(new Date())

  // Update clock every second
  useState(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  })

  const todayLogs = logs.filter((log) => log.date === new Date().toISOString().split("T")[0])
  const isClockedIn = todayLogs.some((log) => log.checkInTime && !log.checkOutTime)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Digital Clock */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-blue-600 font-mono">{time.toLocaleTimeString()}</div>
              <p className="text-muted-foreground mt-2">{time.toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Clock In/Out Buttons */}
        <div className="md:col-span-2 space-y-3">
          <div className="flex gap-3">
            <Button
              onClick={onClockIn}
              disabled={isClockedIn}
              className="flex-1 bg-green-600 hover:bg-green-700"
              size="lg"
            >
              <Clock className="w-5 h-5 mr-2" />
              Clock In
            </Button>
            <Button
              onClick={onClockOut}
              disabled={!isClockedIn}
              className="flex-1 bg-orange-600 hover:bg-orange-700"
              size="lg"
            >
              <Clock className="w-5 h-5 mr-2" />
              Clock Out
            </Button>
          </div>
          <p className="text-sm text-muted-foreground text-center">
            Status: <span className="font-semibold">{isClockedIn ? "Clocked In" : "Not Clocked In"}</span>
          </p>
        </div>
      </div>

      {/* Attendance History */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Check In</th>
                  <th className="text-left py-3 px-4 font-semibold">Check Out</th>
                  <th className="text-left py-3 px-4 font-semibold">Hours</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{log.date}</td>
                    <td className="py-3 px-4">{log.checkInTime || "-"}</td>
                    <td className="py-3 px-4">{log.checkOutTime || "-"}</td>
                    <td className="py-3 px-4">{log.totalHours?.toFixed(2) || "-"}</td>
                    <td className="py-3 px-4">
                      <Badge
                        variant={
                          log.status === "Present" ? "default" : log.status === "Absent" ? "destructive" : "secondary"
                        }
                      >
                        {log.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
