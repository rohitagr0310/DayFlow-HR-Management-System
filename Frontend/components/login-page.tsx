"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { AlertCircle } from "lucide-react"

interface LoginPageProps {
  onLoginSuccess: () => void
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
  const [email, setEmail] = useState("admin@dayflow.com")
  const [password, setPassword] = useState("password")
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await login(email, password)
      onLoginSuccess()
    } finally {
      setIsLoading(false)
    }
  }

  const demoAccounts = [
    { email: "admin@dayflow.com", password: "password", role: "Admin" },
    { email: "jane.smith@company.com", password: "password", role: "Employee" },
  ]

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-4">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-blue-600">Dayflow</CardTitle>
            <CardDescription>Human Resource Management System</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Password</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Login"}
              </Button>
              <button type="button" className="w-full text-sm text-blue-600 hover:underline" disabled={isLoading}>
                Forgot Password?
              </button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              <CardTitle className="text-sm text-blue-900 ml-2">Demo Accounts</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {demoAccounts.map((account) => (
              <button
                key={account.email}
                onClick={() => {
                  setEmail(account.email)
                  setPassword(account.password)
                }}
                className="w-full text-left text-xs p-2 rounded hover:bg-blue-100 transition-colors"
              >
                <div className="font-medium text-blue-900">{account.role}</div>
                <div className="text-blue-700">{account.email}</div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
