"use client"

import { useAuth } from "@/lib/auth-context"
import { type Employee } from "@/lib/mock-data"
import { useCallback, useEffect, useState } from "react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  const fetchEmployees = useCallback(async () => {
    if (!user) return

    setLoading(true)
    setError(null)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch employees")
      }

      const data = await response.json()
      
      // Map backend user to frontend Employee
      const mappedEmployees: Employee[] = data.map((u: any) => ({
        id: String(u.id),
        firstName: u.first_name,
        lastName: u.last_name,
        email: u.email,
        phone: u.private_info?.phone || "",
        department: "Engineering", // Defaulting as backend doesn't have dept yet
        designation: u.role,
        dateOfJoining: u.joining_date,
        salary: 0, // Backend salary model exists but not in User response yet
        status: u.is_active ? "Active" : "Inactive",
        avatar: u.profile_picture_url,
      }))

      setEmployees(mappedEmployees)
    } catch (err) {
      console.error(err)
      setError("Failed to load employees")
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  return { employees, loading, error, refreshEmployees: fetchEmployees, setEmployees }
}
