"use client"

import { useState } from "react"
import { Edit2, Save, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface EmployeeProfile {
  firstName: string
  lastName: string
  email: string
  phone: string
  department: string
  designation: string
  joinDate: string
  address: string
  city: string
  state: string
  zipCode: string
  emergencyContact: string
  emergencyPhone: string
}

const mockProfile: EmployeeProfile = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane.smith@company.com",
  phone: "+91 98765 43210",
  department: "Engineering",
  designation: "Senior Software Engineer",
  joinDate: "2021-03-15",
  address: "123 Main Street",
  city: "Bangalore",
  state: "Karnataka",
  zipCode: "560001",
  emergencyContact: "John Smith",
  emergencyPhone: "+91 87654 32109",
}

export function EmployeeProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState(mockProfile)

  const handleChange = (field: keyof EmployeeProfile, value: string) => {
    setProfile({ ...profile, [field]: value })
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Profile</h2>
          <p className="text-muted-foreground">View and manage your profile information</p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)} className="gap-2">
          {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
          {isEditing ? "Cancel" : "Edit Profile"}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">
                {profile.firstName} {profile.lastName}
              </h3>
              <p className="text-sm text-muted-foreground">{profile.designation}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              {isEditing ? (
                <Input value={profile.firstName} onChange={(e) => handleChange("firstName", e.target.value)} />
              ) : (
                <p className="p-2 text-sm">{profile.firstName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              {isEditing ? (
                <Input value={profile.lastName} onChange={(e) => handleChange("lastName", e.target.value)} />
              ) : (
                <p className="p-2 text-sm">{profile.lastName}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              {isEditing ? (
                <Input value={profile.email} onChange={(e) => handleChange("email", e.target.value)} />
              ) : (
                <p className="p-2 text-sm">{profile.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              {isEditing ? (
                <Input value={profile.phone} onChange={(e) => handleChange("phone", e.target.value)} />
              ) : (
                <p className="p-2 text-sm">{profile.phone}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Professional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Department</Label>
              <p className="p-2 text-sm bg-muted rounded">{profile.department}</p>
            </div>
            <div className="space-y-2">
              <Label>Designation</Label>
              <p className="p-2 text-sm bg-muted rounded">{profile.designation}</p>
            </div>
            <div className="space-y-2">
              <Label>Join Date</Label>
              <p className="p-2 text-sm bg-muted rounded">{new Date(profile.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Address Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Address</Label>
            {isEditing ? (
              <Input value={profile.address} onChange={(e) => handleChange("address", e.target.value)} />
            ) : (
              <p className="p-2 text-sm">{profile.address}</p>
            )}
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label>City</Label>
              {isEditing ? (
                <Input value={profile.city} onChange={(e) => handleChange("city", e.target.value)} />
              ) : (
                <p className="p-2 text-sm">{profile.city}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              {isEditing ? (
                <Input value={profile.state} onChange={(e) => handleChange("state", e.target.value)} />
              ) : (
                <p className="p-2 text-sm">{profile.state}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Zip Code</Label>
              {isEditing ? (
                <Input value={profile.zipCode} onChange={(e) => handleChange("zipCode", e.target.value)} />
              ) : (
                <p className="p-2 text-sm">{profile.zipCode}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Emergency Contact</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Contact Name</Label>
              {isEditing ? (
                <Input
                  value={profile.emergencyContact}
                  onChange={(e) => handleChange("emergencyContact", e.target.value)}
                />
              ) : (
                <p className="p-2 text-sm">{profile.emergencyContact}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              {isEditing ? (
                <Input
                  value={profile.emergencyPhone}
                  onChange={(e) => handleChange("emergencyPhone", e.target.value)}
                />
              ) : (
                <p className="p-2 text-sm">{profile.emergencyPhone}</p>
              )}
            </div>
          </div>
          {isEditing && (
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
