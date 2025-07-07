"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut, Shield, Edit, Save, X, Users, Package, Plus, CheckCircle, XCircle } from "lucide-react"

// Define your API base URL - Update this to your actual Django API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://logistics-ia1c.onrender.com/api"

// Order type definition
type Order = {
  url?: string
  tracking_number: string
  status: string
  sender: string
  receiver: string
  origin: string
  destination: string
  estimated_delivery: string
  details?: string
  created_at?: string
  updated_at?: string
}

// Order statuses
const ORDER_STATUSES = [
  { value: "PENDING", label: "Pending", color: "bg-gray-100 text-gray-800" },
  { value: "PROCESSING", label: "Processing", color: "bg-yellow-100 text-yellow-800" },
  { value: "IN_TRANSIT", label: "In Transit", color: "bg-blue-100 text-blue-800" },
  { value: "DELIVERED", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" },
  { value: "EXCEPTION", label: "Exception", color: "bg-orange-100 text-orange-800" },
]

// Get status color function
const getStatusColor = (status: string): string => {
  const statusConfig = ORDER_STATUSES.find((s) => s.value === status)
  return statusConfig?.color || "bg-gray-100 text-gray-800"
}

// Toast interface
interface Toast {
  id: string
  type: "success" | "error"
  title: string
  description: string
}

// Site Header Component
const SiteHeader = () => (
  <header className="bg-white shadow-sm border-b">
    <div className="container mx-auto px-4 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Package className="h-6 w-6 text-blue-600" />
        <span className="text-xl font-bold text-gray-900">Logistics System</span>
      </div>
      <nav className="hidden sm:flex items-center space-x-6">
        <a href="/" className="text-gray-600 hover:text-gray-900">
          Home
        </a>
        <a href="/track" className="text-gray-600 hover:text-gray-900">
          Track Order
        </a>
        <a href="/admin/login" className="text-gray-600 hover:text-gray-900">
          Admin
        </a>
      </nav>
    </div>
  </header>
)

// Site Footer Component
const SiteFooter = () => (
  <footer className="bg-gray-800 text-white py-8">
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Logistics System</h3>
          <p className="text-gray-300">Professional order management and tracking system for your business needs.</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/track" className="hover:text-white">
                Track Order
              </a>
            </li>
            <li>
              <a href="/admin/login" className="hover:text-white">
                Admin Login
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-gray-300">Email: info@skyshipsplash.com</p>
          <p className="text-gray-300">Support available 24/7</p>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2024 Logistics System. All rights reserved.</p>
      </div>
    </div>
  </footer>
)

// Toast Component
const ToastContainer = ({ toasts, removeToast }: { toasts: Toast[]; removeToast: (id: string) => void }) => (
  <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
    {toasts.map((toast) => (
      <div
        key={toast.id}
        className={`transform transition-all duration-300 ease-in-out ${
          toast.type === "success"
            ? "bg-green-50 border border-green-200 text-green-800"
            : "bg-red-50 border border-red-200 text-red-800"
        } rounded-lg shadow-lg p-4 flex items-start space-x-3`}
      >
        <div className="flex-shrink-0">
          {toast.type === "success" ? (
            <CheckCircle className="h-5 w-5 text-green-600" />
          ) : (
            <XCircle className="h-5 w-5 text-red-600" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold">{toast.title}</p>
          <p className="text-sm opacity-90 mt-1">{toast.description}</p>
        </div>
        <button
          onClick={() => removeToast(toast.id)}
          className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    ))}
  </div>
)

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [adminEmail, setAdminEmail] = useState("")
  const [activeTab, setActiveTab] = useState<"add" | "view" | "names">("add")
  const [editingOrder, setEditingOrder] = useState<string | null>(null)
  const [editFormData, setEditFormData] = useState<Partial<Order>>({})
  const [isUpdating, setIsUpdating] = useState(false)
  const [uniqueNames, setUniqueNames] = useState<{ senders: string[]; receivers: string[] }>({
    senders: [],
    receivers: [],
  })
  const [toasts, setToasts] = useState<Toast[]>([])
  const router = useRouter()

  // Toast functions
  const addToast = (type: "success" | "error", title: string, description: string) => {
    const id = Date.now().toString()
    const newToast: Toast = { id, type, title, description }
    setToasts((prev) => [...prev, newToast])

    // Auto remove after 5 seconds
    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Check authentication on component mount
  useEffect(() => {
    const checkAuth = () => {
      const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn")
      const storedAdminEmail = localStorage.getItem("adminEmail")

      if (isAdminLoggedIn === "true" && storedAdminEmail) {
        setIsAuthenticated(true)
        setAdminEmail(storedAdminEmail)
      } else {
        router.push("/admin/login")
      }
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn")
    localStorage.removeItem("adminEmail")
    localStorage.removeItem("adminLoginTime")
    router.push("/admin/login")
  }

  const extractUniqueNames = (orders: Order[]) => {
    const senders = [...new Set(orders.map((order) => order.sender).filter(Boolean))].sort()
    const receivers = [...new Set(orders.map((order) => order.receiver).filter(Boolean))].sort()
    setUniqueNames({ senders, receivers })
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
      extractUniqueNames(data)
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      addToast("error", "Error Loading Orders", "Failed to load orders. Please check your connection and try again.")
      setOrders([])
    } finally {
      setIsLoadingOrders(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders()
    }
  }, [isAuthenticated])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsAdding(true)

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

    if (!newOrderData.tracking_number?.trim() || !newOrderData.status?.trim()) {
      addToast("error", "Validation Error", "Tracking number and status are required.")
      setIsAdding(false)
      return
    }

    const cleanedData = Object.fromEntries(
      Object.entries(newOrderData).map(([key, value]) => [key, value?.trim() || null]),
    )

    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(cleanedData),
      })

      if (response.ok) {
        let createdOrder: Order
        try {
          const responseText = await response.text()
          if (responseText) {
            createdOrder = JSON.parse(responseText)
          } else {
            createdOrder = {
              tracking_number: newOrderData.tracking_number,
              status: newOrderData.status,
              sender: newOrderData.sender || "",
              receiver: newOrderData.receiver || "",
              origin: newOrderData.origin || "",
              destination: newOrderData.destination || "",
              estimated_delivery: newOrderData.estimated_delivery || "",
              details: newOrderData.details || "",
            } as Order
          }
        } catch (jsonError) {
          console.warn("Response was successful but couldn't parse JSON:", jsonError)
          createdOrder = {
            tracking_number: newOrderData.tracking_number,
            status: newOrderData.status,
            sender: newOrderData.sender || "",
            receiver: newOrderData.receiver || "",
            origin: newOrderData.origin || "",
            destination: newOrderData.destination || "",
            estimated_delivery: newOrderData.estimated_delivery || "",
            details: newOrderData.details || "",
          } as Order
        }

        addToast(
          "success",
          "Order Created Successfully!",
          `Order ${createdOrder.tracking_number} has been added to the system.`,
        )
        event.currentTarget.reset()
        fetchOrders()
      } else {
        let errorMessage = "Failed to add order"

        try {
          const errorData = await response.json()
          console.error("API Error Response:", errorData)

          if (response.status === 400) {
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

        addToast("error", "Failed to Create Order", errorMessage)
      }
    } catch (error) {
      console.error("Network error or unexpected issue:", error)
      let errorMessage = "Network error. Please check if your Django API is running and accessible."

      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        errorMessage = "Cannot connect to the server. Please check if your Django API is running."
      } else if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`
      }

      addToast("error", "Network Error", errorMessage)
    } finally {
      setIsAdding(false)
    }
  }

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order.tracking_number)
    setEditFormData({
      tracking_number: order.tracking_number,
      status: order.status,
      sender: order.sender,
      receiver: order.receiver,
      origin: order.origin,
      destination: order.destination,
      estimated_delivery: order.estimated_delivery,
      details: order.details,
    })
  }

  const handleCancelEdit = () => {
    setEditingOrder(null)
    setEditFormData({})
  }

  const handleUpdateOrder = async (trackingNumber: string) => {
    setIsUpdating(true)

    try {
      const orderToUpdate = orders.find((order) => order.tracking_number === trackingNumber)
      if (!orderToUpdate) {
        throw new Error("Order not found")
      }

      const updateUrl = orderToUpdate.url || `${API_BASE_URL}/orders/${trackingNumber}/`

      const response = await fetch(updateUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(editFormData),
      })

      if (response.ok) {
        const updatedOrder = await response.json()
        addToast("success", "Order Updated Successfully!", `Order ${updatedOrder.tracking_number} has been updated.`)
        setEditingOrder(null)
        setEditFormData({})
        fetchOrders()
      } else {
        const errorData = await response.json()
        addToast("error", "Failed to Update Order", errorData.detail || errorData.message || "Failed to update order")
      }
    } catch (error) {
      console.error("Failed to update order:", error)
      addToast("error", "Update Error", "Failed to update order. Please try again.")
    } finally {
      setIsUpdating(false)
    }
  }

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

      {/* Toast Container */}
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Admin Header */}
      <div className="bg-blue-600 text-white py-3 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <Shield className="w-5 h-5" />
            <span className="font-medium">Admin Panel</span>
            <span className="text-blue-200 hidden sm:inline">•</span>
            <span className="text-sm text-blue-200">Logged in as: {adminEmail}</span>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="text-blue-600 border-white bg-white hover:text-blue-700 self-start sm:self-auto"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <main className="flex-1 container mx-auto py-4 sm:py-8 px-4 md:px-6">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 text-center">
          Order Management
        </h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-white rounded-lg p-1 shadow-md w-full max-w-2xl">
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setActiveTab("add")}
                className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  activeTab === "add" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">Add Order</span>
                <span className="sm:hidden">Add</span>
              </button>
              <button
                onClick={() => setActiveTab("view")}
                className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  activeTab === "view" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View All Orders</span>
                <span className="sm:hidden">View</span>
              </button>
              <button
                onClick={() => setActiveTab("names")}
                className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-colors flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm ${
                  activeTab === "names" ? "bg-blue-600 text-white" : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">View All Names</span>
                <span className="sm:hidden">Names</span>
              </button>
            </div>
          </div>
        </div>

        {/* Add Order Tab */}
        {activeTab === "add" && (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold">Add New Order</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="trackingNumber">Tracking Number *</Label>
                      <Input
                        id="trackingNumber"
                        name="trackingNumber"
                        required
                        placeholder="e.g., TRK123456"
                        maxLength={50}
                      />
                    </div>
                    <div className="sm:col-span-2">
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
                    <div className="sm:col-span-2">
                      <Label htmlFor="estimatedDelivery">Estimated Delivery</Label>
                      <Input
                        id="estimatedDelivery"
                        name="estimatedDelivery"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="details">Details</Label>
                      <Textarea
                        id="details"
                        name="details"
                        rows={3}
                        placeholder="Additional order details..."
                        maxLength={500}
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 w-full"
                    disabled={isAdding}
                  >
                    {isAdding ? "Adding..." : "Add Order"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* View All Orders Tab */}
        {activeTab === "view" && (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl font-bold">
                All Orders
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
                  <p className="text-sm">Add your first order using the Add Order tab!</p>
                </div>
              ) : (
                <div className="grid gap-4 max-h-[70vh] overflow-y-auto">
                  {orders.map((order) => (
                    <Card key={order.tracking_number} className="p-4 border hover:shadow-md transition-shadow">
                      {editingOrder === order.tracking_number ? (
                        // Edit Mode
                        <div className="space-y-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                            <h3 className="font-semibold text-lg text-blue-600">Editing: {order.tracking_number}</h3>
                            <div className="flex gap-2 w-full sm:w-auto">
                              <Button
                                size="sm"
                                onClick={() => handleUpdateOrder(order.tracking_number)}
                                disabled={isUpdating}
                                className="bg-green-600 hover:bg-green-700 flex-1 sm:flex-none"
                              >
                                <Save className="w-4 h-4 mr-1" />
                                {isUpdating ? "Saving..." : "Save"}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={handleCancelEdit}
                                disabled={isUpdating}
                                className="flex-1 sm:flex-none bg-transparent"
                              >
                                <X className="w-4 h-4 mr-1" />
                                Cancel
                              </Button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <Label>Status</Label>
                              <select
                                value={editFormData.status || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, status: e.target.value })}
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                              >
                                {ORDER_STATUSES.map((status) => (
                                  <option key={status.value} value={status.value}>
                                    {status.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <Label>Sender</Label>
                              <Input
                                value={editFormData.sender || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, sender: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Receiver</Label>
                              <Input
                                value={editFormData.receiver || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, receiver: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Origin</Label>
                              <Input
                                value={editFormData.origin || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, origin: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Destination</Label>
                              <Input
                                value={editFormData.destination || ""}
                                onChange={(e) => setEditFormData({ ...editFormData, destination: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label>Estimated Delivery</Label>
                              <Input
                                type="date"
                                value={editFormData.estimated_delivery || ""}
                                onChange={(e) =>
                                  setEditFormData({ ...editFormData, estimated_delivery: e.target.value })
                                }
                              />
                            </div>
                          </div>
                          <div>
                            <Label>Details</Label>
                            <Textarea
                              value={editFormData.details || ""}
                              onChange={(e) => setEditFormData({ ...editFormData, details: e.target.value })}
                              rows={3}
                            />
                          </div>
                        </div>
                      ) : (
                        // View Mode
                        <div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-2 gap-2">
                            <h3 className="font-semibold text-lg text-blue-600 break-all">
                              Tracking: {order.tracking_number}
                            </h3>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleEditOrder(order)}
                              className="flex items-center gap-1 w-full sm:w-auto"
                            >
                              <Edit className="w-4 h-4" />
                              Edit
                            </Button>
                          </div>

                          <p className="mb-1">
                            Status:
                            <span
                              className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}
                            >
                              {order.status}
                            </span>
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            {order.sender && order.origin && (
                              <p>
                                <strong>From:</strong> {order.sender} ({order.origin})
                              </p>
                            )}

                            {order.receiver && order.destination && (
                              <p>
                                <strong>To:</strong> {order.receiver} ({order.destination})
                              </p>
                            )}

                            {order.estimated_delivery && (
                              <p>
                                <strong>Est. Delivery:</strong> {order.estimated_delivery}
                              </p>
                            )}
                          </div>

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
                        </div>
                      )}
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* View All Names Tab */}
        {activeTab === "names" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-green-600">
                  All Senders ({uniqueNames.senders.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uniqueNames.senders.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No senders found</p>
                ) : (
                  <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                    <ul className="space-y-2">
                      {uniqueNames.senders.map((sender, index) => (
                        <li key={index} className="p-3 bg-gray-50 rounded border text-sm sm:text-base break-words">
                          {sender}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl font-bold text-blue-600">
                  All Receivers ({uniqueNames.receivers.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {uniqueNames.receivers.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No receivers found</p>
                ) : (
                  <div className="max-h-64 sm:max-h-80 overflow-y-auto">
                    <ul className="space-y-2">
                      {uniqueNames.receivers.map((receiver, index) => (
                        <li key={index} className="p-3 bg-gray-50 rounded border text-sm sm:text-base break-words">
                          {receiver}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
