"use client"

import { useState } from "react"
import { Upload, Download, Trash2, File, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Document {
  id: string
  name: string
  type: string
  uploadDate: string
  size: string
  category: "contract" | "payroll" | "certificate" | "other"
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "Employment_Agreement_2021.pdf",
    type: "PDF",
    uploadDate: "2021-03-15",
    size: "2.4 MB",
    category: "contract",
  },
  {
    id: "2",
    name: "Salary_Slip_January_2025.pdf",
    type: "PDF",
    uploadDate: "2025-01-01",
    size: "845 KB",
    category: "payroll",
  },
  {
    id: "3",
    name: "Salary_Slip_December_2024.pdf",
    type: "PDF",
    uploadDate: "2024-12-01",
    size: "823 KB",
    category: "payroll",
  },
  {
    id: "4",
    name: "Professional_Certification.pdf",
    type: "PDF",
    uploadDate: "2023-06-20",
    size: "1.2 MB",
    category: "certificate",
  },
  {
    id: "5",
    name: "Tax_Declaration_2024.pdf",
    type: "PDF",
    uploadDate: "2024-01-15",
    size: "956 KB",
    category: "other",
  },
]

const categoryColors = {
  contract: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200",
  payroll: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200",
  certificate: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200",
  other: "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-200",
}

export function Documents() {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments)

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">My Documents</h2>
          <p className="text-muted-foreground">Access your employment and payroll documents</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Document Library</CardTitle>
          <CardDescription>All your documents in one place</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <File className="w-10 h-10 text-muted-foreground" />
                  <div className="flex-1">
                    <h3 className="font-medium">{doc.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge className={categoryColors[doc.category]}>{doc.category}</Badge>
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(doc.uploadDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{doc.size}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(doc.id)}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
