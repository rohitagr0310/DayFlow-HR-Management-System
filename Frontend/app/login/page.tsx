"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginPage } from "@/components/login-page"
import { useAuth } from "@/lib/auth-context"

export default function Login() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      return
    }

    const navigationEntries = typeof performance !== "undefined" ? performance.getEntriesByType("navigation") : []
    const navigationType = navigationEntries[0]?.type

    if (navigationType === "back_forward") {
      return
    }

    router.replace("/dashboard")
  }, [router, user])

  return <LoginPage onLoginSuccess={() => router.push("/dashboard")} />
}
