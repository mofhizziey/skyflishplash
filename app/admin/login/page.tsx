"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Eye, EyeOff, Lock, Mail } from "lucide-react"
import Link from "next/link"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn")
    if (isAdminLoggedIn === "true") {
      router.push("/admin/orders")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Get admin credentials - check localStorage first (for updated passwords), then fall back to env
    const adminEmail = localStorage.getItem("adminEmail") || "info@skyshipsplash.com"
    const adminPassword = localStorage.getItem("adminPassword") || "Skyshipsplash10#"

    console.log("Login attempt:")
    console.log("Entered email:", email)
    console.log("Expected email:", adminEmail)
    console.log("Entered password:", password)
    console.log("Expected password:", adminPassword)
    console.log("Password from localStorage:", localStorage.getItem("adminPassword"))

    // Simulate a small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === adminEmail && password === adminPassword) {
      console.log("✅ Login successful!")

      // Set admin authentication in localStorage
      localStorage.setItem("isAdminLoggedIn", "true")
      localStorage.setItem("adminEmail", email)
      localStorage.setItem("adminLoginTime", new Date().toISOString())

      // Make sure the current password is stored for future resets
      if (!localStorage.getItem("adminPassword")) {
        localStorage.setItem("adminPassword", adminPassword)
      }

      // Redirect to order management page
      router.push("/order-management")
    } else {
      console.log("❌ Login failed - credentials don't match")
      setError("Invalid email or password. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
            <p className="text-gray-600">Access the order management system</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="info@skyshipsplash.com"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="p-3 rounded-md bg-red-50 border border-red-200">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              )}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link href="/admin/reset-password" className="text-sm text-blue-600 hover:text-blue-800 underline">
                Reset Password
              </Link>
            </div>

            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Default: info@skyshipsplash.com / Skyshipsplash10#
                <br />
                Check console for debug info
              </p>
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
