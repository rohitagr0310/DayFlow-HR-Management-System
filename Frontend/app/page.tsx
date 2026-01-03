"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LandingPage } from "@/components/landing-page"
import { useAuth } from "@/lib/auth-context"

export default function HomePage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      router.replace("/dashboard")
    }
  }, [router, user])

  return <LandingPage onGetStarted={() => router.push("/login")} />
}
