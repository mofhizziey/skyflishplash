"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Eye, EyeOff, Lock, Shield, AlertTriangle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function AdminPasswordResetPage() {
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const router = useRouter()

  const getCurrentCredentials = () => {
    // Check localStorage first, then fall back to env variables
    const storedEmail = localStorage.getItem("adminEmail") || "info@skyshipsplash.com"
    const storedPassword = localStorage.getItem("adminPassword") || "Skyshipsplash10#"

    console.log("Current stored credentials:", { email: storedEmail, password: storedPassword })

    return { email: storedEmail, password: storedPassword }
  }

  const validatePassword = (password: string) => {
    const minLength = 8
    const hasUpperCase = /[A-Z]/.test(password)
    const hasLowerCase = /[a-z]/.test(password)
    const hasNumbers = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) {
      return "Password must be at least 8 characters long"
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter"
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter"
    }
    if (!hasNumbers) {
      return "Password must contain at least one number"
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    const currentCredentials = getCurrentCredentials()

    console.log("Attempting password reset...")
    console.log("Current password entered:", currentPassword)
    console.log("Expected current password:", currentCredentials.password)

    // Verify current password
    if (currentPassword !== currentCredentials.password) {
      setError("Current password is incorrect")
      setIsLoading(false)
      return
    }

    // Validate new password
    const passwordError = validatePassword(newPassword)
    if (passwordError) {
      setError(passwordError)
      setIsLoading(false)
      return
    }

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      setIsLoading(false)
      return
    }

    // Check if new password is different from current
    if (currentPassword === newPassword) {
      setError("New password must be different from current password")
      setIsLoading(false)
      return
    }

    try {
      console.log("Updating password to:", newPassword)

      // Update localStorage FIRST
      localStorage.setItem("adminPassword", newPassword)
      console.log("✅ localStorage updated")

      // Update .env file via API
      const response = await fetch("/api/update-env", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPassword }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log("✅ .env file updated successfully")
        setSuccess("Password updated successfully! Both localStorage and .env file have been updated.")

        // Clear form
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")

        // Redirect to login after 3 seconds
        setTimeout(() => {
          // Clear login session but keep the new password
          localStorage.removeItem("isAdminLoggedIn")
          localStorage.removeItem("adminLoginTime")
          // Keep adminEmail and adminPassword for next login
          console.log("Redirecting to login page...")
          router.push("/admin/login")
        }, 3000)
      } else {
        console.error("❌ Failed to update .env file:", data.error)
        setError(data.error || "Failed to update .env file")
      }
    } catch (error) {
      console.error("❌ Error during password reset:", error)
      setError("An error occurred while updating the password. Please try again.")
    }

    setIsLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SiteHeader />
      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold">Reset Admin Password</CardTitle>
            <p className="text-gray-600">Update your admin account password</p>
          </CardHeader>
          <CardContent>
            <Alert className="mb-6 border-amber-200 bg-amber-50">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <AlertDescription className="text-amber-800">
                This will update your current password with the new password.
                <br />
            
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="currentPassword">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    {success}
                    <br />
                    <span className="text-sm">Redirecting to login page in 3 seconds...</span>
                  </AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isLoading || success !== ""}
              >
                {isLoading ? "Updating Password & .env File..." : "Update Password & .env File"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="outline"
                onClick={() => router.push("/admin/login")}
                className="text-sm bg-transparent"
                disabled={isLoading}
              >
                Back to Login
              </Button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500">This will permanently update your .env file on the server.</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
