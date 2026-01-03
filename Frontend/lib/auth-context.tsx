"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { mockAdminUser, mockEmployeeUser, mockCurrentUser, type User } from "./mock-data"
import { ThemeProvider } from "./theme-context"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string) => {
    if (email === "admin@dayflow.com" && password) {
      setUser(mockAdminUser)
    } else if (email === "jane.smith@company.com" && password) {
      setUser(mockEmployeeUser)
    } else if (email && password) {
      setUser(mockCurrentUser)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
