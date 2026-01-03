"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth-context"
import { ArrowRight, Lock, Mail, Sparkles } from "lucide-react"
import { useState } from "react"

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
    { email: "admin@dayflow.com", password: "password", role: "Admin", description: "Full system access" },
    { email: "jane.smith@company.com", password: "password", role: "Employee", description: "Employee portal" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          {/* Logo and Welcome */}
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-6">
              <Image src="/day-flow.png" alt="Dayflow logo" width={180} height={54} className="h-14 w-auto" priority />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your Dayflow account</p>
          </div>

          {/* Login Form */}
          <Card className="border-border shadow-lg">
            <CardContent className="pt-6">
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <button
                      type="button"
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                      disabled={isLoading}
                    >
                      Forgot Password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 h-11"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Don&apos;t have an account? </span>
            <Link href="/signup" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>

          {/* Demo Accounts */}
          <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                    Quick Access Demo
                  </CardTitle>
                  <CardDescription className="text-xs text-blue-700 dark:text-blue-300">
                    Try one of these demo accounts
                  </CardDescription>
                </div>
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
                  disabled={isLoading}
                  className="w-full text-left p-3 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-blue-950/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:border-blue-300 dark:hover:border-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-semibold text-sm text-blue-900 dark:text-blue-100">{account.role}</div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">{account.email}</div>
                      <div className="text-xs text-muted-foreground">{account.description}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      
    </div>
  )
}
