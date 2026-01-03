"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { AdminPortal } from "@/components/portals/admin-portal"
import { EmployeePortal } from "@/components/portals/employee-portal"
import { useAuth } from "@/lib/auth-context"

export default function Dashboard() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.replace("/login")
    }
  }, [router, user])

  if (!user) {
    return null
  }

  if (user.role === "Admin") {
    return <AdminPortal />
  }

  return <EmployeePortal />
}
