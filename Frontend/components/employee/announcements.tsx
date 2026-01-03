"use client"

import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Announcement {
  id: string
  title: string
  content: string
  author: string
  authorRole: string
  date: string
  category: string
  likes: number
  comments: number
}

const mockAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Annual Company Picnic - Registration Open",
    content:
      "Join us for our annual company picnic on April 5th! Registration is now open. We have activities planned for everyone. Please register through the portal.",
    author: "Alice Johnson",
    authorRole: "HR Manager",
    date: "2025-01-03",
    category: "Event",
    likes: 24,
    comments: 8,
  },
  {
    id: "2",
    title: "New Office Policy on Remote Work",
    content:
      "Effective from February 1st, we are introducing a flexible hybrid work policy. Employees can work from home up to 3 days a week. Details are available in the policy document.",
    author: "Management",
    authorRole: "Administration",
    date: "2025-01-02",
    category: "Policy",
    likes: 16,
    comments: 5,
  },
  {
    id: "3",
    title: "Congratulations to Our Q4 Winners",
    content:
      "We are proud to announce the winners of our Q4 performance award. Their dedication and hard work have been instrumental in our success. Please join us in congratulating them!",
    author: "CEO",
    authorRole: "Executive",
    date: "2024-12-29",
    category: "Recognition",
    likes: 45,
    comments: 12,
  },
]

export function Announcements() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Company Announcements</h2>
        <p className="text-muted-foreground">Stay updated with company news and announcements</p>
      </div>

      <div className="space-y-4">
        {mockAnnouncements.map((announcement) => (
          <Card key={announcement.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback>{announcement.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-lg">{announcement.title}</CardTitle>
                      <Badge variant="outline">{announcement.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {announcement.author} • {announcement.authorRole} •{" "}
                      {new Date(announcement.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm leading-relaxed">{announcement.content}</p>
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="ghost" size="sm" className="gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs">{announcement.likes}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs">{announcement.comments}</span>
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
