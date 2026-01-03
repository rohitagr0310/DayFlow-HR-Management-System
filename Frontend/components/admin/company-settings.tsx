"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { CompanySettings as InitialCompanySettings } from "@/lib/mock-data"
import { Save, Upload } from "lucide-react"

interface CompanySettingsProps {
  settings: InitialCompanySettings
  onSave: (settings: InitialCompanySettings) => void
}

export function CompanySettings({ settings: initialSettings, onSave }: CompanySettingsProps) {
  const [settings, setSettings] = useState(initialSettings)
  const [isSaved, setIsSaved] = useState(false)

  const handleChange = (field: keyof InitialCompanySettings, value: any) => {
    setSettings((prev) => ({ ...prev, [field]: value }))
    setIsSaved(false)
  }

  const handleSave = () => {
    onSave(settings)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Company Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your organization's master data</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="other">Other Details</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Basic company details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Company Name</label>
                <Input value={settings.name} onChange={(e) => handleChange("name", e.target.value)} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Industry</label>
                <Input
                  value={settings.industry}
                  onChange={(e) => handleChange("industry", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Founded Year</label>
                <Input
                  type="number"
                  value={settings.foundedYear}
                  onChange={(e) => handleChange("foundedYear", Number.parseInt(e.target.value))}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Website</label>
                <Input
                  value={settings.website}
                  onChange={(e) => handleChange("website", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Tax ID</label>
                <Input
                  value={settings.taxId}
                  onChange={(e) => handleChange("taxId", e.target.value)}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding Settings */}
        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Manage your company logo and visual identity</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Company Logo</label>
                <div className="mt-2 flex flex-col gap-4">
                  <div className="w-32 h-32 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-muted">
                    <img
                      src={settings.logo || "/placeholder.svg"}
                      alt="Company Logo"
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2 bg-transparent">
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </Button>
                    <p className="text-sm text-muted-foreground">PNG, JPG (Max 5MB)</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Logo URL</label>
                    <Input
                      value={settings.logo}
                      onChange={(e) => handleChange("logo", e.target.value)}
                      className="mt-1"
                      placeholder="https://..."
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Company contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input
                  value={settings.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Address</label>
                <Input
                  value={settings.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">City</label>
                  <Input
                    value={settings.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">State/Province</label>
                  <Input
                    value={settings.state}
                    onChange={(e) => handleChange("state", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Zip/Postal Code</label>
                  <Input
                    value={settings.zipCode}
                    onChange={(e) => handleChange("zipCode", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Country</label>
                  <Input
                    value={settings.country}
                    onChange={(e) => handleChange("country", e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Other Settings */}
        <TabsContent value="other">
          <Card>
            <CardHeader>
              <CardTitle>Additional Details</CardTitle>
              <CardDescription>Other company information</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">More settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave} className="gap-2" size="lg">
        <Save className="w-4 h-4" />
        {isSaved ? "Saved!" : "Save Changes"}
      </Button>
    </div>
  )
}
