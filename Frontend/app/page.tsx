"use client"

import { useState } from "react"
import { AuthProvider, useAuth } from "@/lib/auth-context"
import { LoginPage } from "@/components/login-page"
import { EmployeePortal } from "@/components/portals/employee-portal"
import { AdminPortal } from "@/components/portals/admin-portal"
import { LandingPage } from "@/components/landing-page"

function DashboardRouter() {
  const { user } = useAuth()

  if (!user) {
    return null
  }

  if (user.role === "Admin") {
    return <AdminPortal />
  }

  return <EmployeePortal />
}

export default function Page() {
  const [currentPage, setCurrentPage] = useState<"landing" | "login" | "dashboard">("landing")

  return (
    <AuthProvider>
      {currentPage === "landing" && <LandingPage onGetStarted={() => setCurrentPage("login")} />}
      {currentPage === "login" && <LoginPage onLoginSuccess={() => setCurrentPage("dashboard")} />}
      {currentPage === "dashboard" && <DashboardRouter />}
    </AuthProvider>
  )
}
