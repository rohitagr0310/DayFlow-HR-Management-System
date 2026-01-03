import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Activity {
  id: string
  type: string
  user: string
  time: string
  date: string
}

interface RecentActivityProps {
  activities: Activity[]
}

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between pb-4 border-b last:border-b-0">
              <div className="flex-1">
                <Badge variant="outline" className="mb-2">
                  {activity.type}
                </Badge>
                <p className="text-sm font-medium text-foreground">{activity.user}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.date} at {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
