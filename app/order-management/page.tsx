"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Order } from "@/lib/orders"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { LogOut, Shield } from "lucide-react"
import { ORDER_STATUSES, getStatusColor } from "@/lib/orders"

// Define your API base URL - Update this to your actual Django API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://logistics-ia1c.onrender.com/api"

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const router = useRouter()

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn")
      const storedAdminEmail = localStorage.getItem("adminEmail")

      if (isAdminLoggedIn === "true" && storedAdminEmail) {
        setIsAuthenticated(true)
        setAdminEmail(storedAdminEmail)
      } else {
        // Redirect to login if not authenticated
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("adminLoginTime")

    // Redirect to login page
    router.push("/admin/login")
  }

  const fetchOrders = async () => {
    setIsLoadingOrders(true)
    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Order[] = await response.json()
      setOrders(data)
      // Only clear error messages, not success messages
      if (formMessage?.type === "error") {
        setFormMessage(null)
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      setFormMessage({ type: "error", text: "Failed to load orders. Using offline mode." })
      // Set empty array as fallback
      setOrders([])
    } finally {
      setIsLoadingOrders(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated]) // Fetch orders only when authenticated

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsAdding(true)
    setFormMessage(null)

    const formData = new FormData(event.currentTarget)
    const newOrderData = {
      tracking_number: formData.get("trackingNumber") as string,
      status: formData.get("status") as string,
      sender: formData.get("sender") as string,
      receiver: formData.get("receiver") as string,
      origin: formData.get("origin") as string,
      destination: formData.get("destination") as string,
      estimated_delivery: formData.get("estimatedDelivery") as string,
      details: formData.get("details") as string,
    }

    // Basic validation
    if (!newOrderData.tracking_number?.trim() || !newOrderData.status?.trim()) {
      setFormMessage({ type: "error", text: "Tracking number and status are required." })
      setIsAdding(false)
      return
    }

    // Clean up empty string values
    const cleanedData = Object.fromEntries(
      Object.entries(newOrderData).map(([key, value]) => [key, value?.trim() || null]),
    )

    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Add Authorization header if your API requires authentication
          // 'Authorization': `Token YOUR_AUTH_TOKEN` or `Bearer YOUR_JWT_TOKEN`
        },
        body: JSON.stringify(cleanedData),
      })

      if (response.ok) {
        let createdOrder: Order
        try {
          createdOrder = await response.json()
        } catch (jsonError) {
          console.warn("Response was successful but couldn't parse JSON:", jsonError)
          // If we can't parse the response, create a fallback object
          createdOrder = {
            tracking_number: newOrderData.tracking_number,
            status: newOrderData.status,
            sender: newOrderData.sender,
            receiver: newOrderData.receiver,
            origin: newOrderData.origin,
            destination: newOrderData.destination,
            estimated_delivery: newOrderData.estimated_delivery,
            details: newOrderData.details,
          } as Order
        }

        setFormMessage({
          type: "success",
          text: `Order ${createdOrder.tracking_number} added successfully!`,
        })
        event.currentTarget.reset() // Clear form

        // Refresh the list of orders after a short delay to show success message
        setTimeout(() => {
          fetchOrders()
        }, 1000)
      } else {
        // Handle different HTTP status codes
        let errorMessage = "Failed to add order"

        try {
          const errorData = await response.json()
          console.error("API Error Response:", errorData)

          if (response.status === 400) {
            // Bad request - validation errors
            if (errorData.tracking_number) {
              errorMessage = `Tracking number error: ${Array.isArray(errorData.tracking_number) ? errorData.tracking_number.join(", ") : errorData.tracking_number}`
            } else if (errorData.non_field_errors) {
              errorMessage = Array.isArray(errorData.non_field_errors)
                ? errorData.non_field_errors.join(", ")
                : errorData.non_field_errors
            } else {
              errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData)
            }
          } else if (response.status === 401) {
            errorMessage = "Authentication required. Please login."
          } else if (response.status === 403) {
            errorMessage = "Permission denied. You don't have access to create orders."
          } else if (response.status === 409) {
            errorMessage = "Order with this tracking number already exists."
          } else if (response.status === 500) {
            errorMessage = "Server error. Please try again later."
          } else {
            errorMessage = errorData.detail || errorData.message || `Server returned ${response.status}`
          }
        } catch (parseError) {
          console.error("Could not parse error response:", parseError)
          errorMessage = `Server error (${response.status}). Please try again.`
        }

        setFormMessage({
          type: "error",
          text: errorMessage,
        })
      }
    } catch (error) {
      console.error("Network error or unexpected issue:", error)
      let errorMessage = "Network error. Please check if your Django API is running and accessible."

      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to the server. Please check if your Django API is running."
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`
      }

      setFormMessage({
        type: "error",
        text: errorMessage,
      })
    } finally {
      setIsAdding(false)
    }
  }

  // Auto-clear success messages after 5 seconds
  useEffect(() => {
    if (formMessage?.type === "success") {
      const timer = setTimeout(() => {
        setFormMessage(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [formMessage])

  // Show loading or redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SiteHeader />

      {/* Admin Header */}
      <div className="bg-blue-600 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Admin Panel</span>
            <span className="text-blue-200">•</span>
            <span className="text-sm text-blue-200">Logged in as: {adminEmail}</span>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-blue-600 border-white hover:bg-white hover:text-blue-700 bg-transparent"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-8 px-4 md:px-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Order Management</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Order Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Add New Order</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div>
                  <Label htmlFor="trackingNumber">Tracking Number *</Label>
                  <Input
                    id="trackingNumber"
                    name="trackingNumber"
                    required
                    placeholder="e.g., TRK123456"
                    maxLength={50}
                  />
                </div>
                <div>
                  <Label htmlFor="status">Status *</Label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Status</option>
                    {ORDER_STATUSES.map((status) => (
                      <option key={status.value} value={status.value}>
                        {status.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="sender">Sender</Label>
                  <Input id="sender" name="sender" placeholder="e.g., Acme Corp" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="receiver">Receiver</Label>
                  <Input id="receiver" name="receiver" placeholder="e.g., John Doe" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" name="origin" placeholder="e.g., New York, USA" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" name="destination" placeholder="e.g., Los Angeles, USA" maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                  <Input
                    id="estimatedDelivery"
                    name="estimatedDelivery"
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <Label htmlFor="details">Details</Label>
                  <Textarea
                    id="details"
                    name="details"
                    rows={3}
                    placeholder="Additional order details..."
                    maxLength={500}
                  />
                </div>
                {formMessage && (
                  <div
                    className={`p-3 rounded-md ${
                      formMessage.type === "success"
                        ? "bg-green-50 border border-green-200"
                        : "bg-red-50 border border-red-200"
                    }`}
                  >
                    <p
                      className={`text-sm font-medium ${
                        formMessage.type === "success" ? "text-green-800" : "text-red-800"
                      }`}
                    >
                      {formMessage.text}
                    </p>
                  </div>
                )}
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400"
                  disabled={isAdding}
                >
                  {isAdding ? "Adding..." : "Add Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Orders List */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Existing Orders
                {!isLoadingOrders && orders.length > 0 && (
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({orders.length} order{orders.length !== 1 ? "s" : ""})
                  </span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <span className="ml-2">Loading orders...</span>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No orders found.</p>
                  <p className="text-sm">
                    {formMessage?.type === "error" && formMessage.text.includes("Failed to load")
                      ? "Check your API connection."
                      : "Add your first order using the form!"}
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {orders.map((order) => (
                    <Card
                      key={order.id || order.tracking_number}
                      className="p-4 border hover:shadow-md transition-shadow"
                    >
                      <h3 className="font-semibold text-lg text-blue-600">Tracking: {order.tracking_number}</h3>
                      <p className="mb-1">
                        Status:
                        <span
                          className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                        >
                          {order.status}
                        </span>
                      </p>
                      {order.sender && order.origin && (
                        <p className="text-sm">
                          <strong>From:</strong> {order.sender} ({order.origin})
                        </p>
                      )}
                      {order.receiver && order.destination && (
                        <p className="text-sm">
                          <strong>To:</strong> {order.receiver} ({order.destination})
                        </p>
                      )}
                      {order.estimated_delivery && (
                        <p className="text-sm">
                          <strong>Est. Delivery:</strong> {order.estimated_delivery}
                        </p>
                      )}
                      {order.details && (
                        <p className="text-sm text-gray-600 mt-2">
                          <strong>Details:</strong> {order.details}
                        </p>
                      )}
                      {order.created_at && (
                        <p className="text-xs text-gray-500 mt-2">
                          Created: {new Date(order.created_at).toLocaleString()}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
