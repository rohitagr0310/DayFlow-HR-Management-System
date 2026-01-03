"use client"

import type React from "react"
import { createContext, useCallback, useContext, useEffect, useState } from "react"
import { type User } from "./mock-data"
import { ThemeProvider } from "./theme-context"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  // Function to fetch user profile with token
  const fetchUserProfile = useCallback(async (token: string) => {
    try {
      const response = await fetch(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const userData = await response.json()
        const mappedUser: User = {
          id: String(userData.id),
          firstName: userData.first_name,
          lastName: userData.last_name,
          email: userData.email,
          role: userData.role,
          // Backend doesn't return avatar yet, so we can leave it undefined or use a placeholder if needed
          avatar: undefined,
        }
        setUser(mappedUser)
      } else {
        // If token is invalid, clear it
        localStorage.removeItem("token")
        setUser(null)
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error)
      localStorage.removeItem("token")
      setUser(null)
    }
  }, [])

  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      fetchUserProfile(token)
    }
  }, [fetchUserProfile])

  const login = useCallback(async (email: string, password: string) => {
    const formData = new URLSearchParams()
    formData.append("username", email)
    formData.append("password", password)

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.detail || "Login failed")
    }

    const data = await response.json()
    const token = data.access_token
    localStorage.setItem("token", token)
    
    await fetchUserProfile(token)
  }, [fetchUserProfile])

  const logout = useCallback(() => {
    localStorage.removeItem("token")
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
