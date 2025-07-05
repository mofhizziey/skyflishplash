"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import type { Order } from "@/lib/orders"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

// Define your API base URL - Update this to your actual Django API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export default function OrderManagementPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoadingOrders, setIsLoadingOrders] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [formMessage, setFormMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const fetchOrders = async () => {
    setIsLoadingOrders(true)
    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Add CORS headers if needed
          Accept: "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Order[] = await response.json()
      setOrders(data)
      setFormMessage(null) // Clear any previous error messages
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
    fetchOrders()
  }, []) // Fetch orders on initial component mount

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
    if (!newOrderData.tracking_number || !newOrderData.status) {
      setFormMessage({ type: "error", text: "Tracking number and status are required." })
      setIsAdding(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          // Add Authorization header if your API requires authentication
          // 'Authorization': `Token YOUR_AUTH_TOKEN` or `Bearer YOUR_JWT_TOKEN`
        },
        body: JSON.stringify(newOrderData),
      })

      if (response.ok) {
        const createdOrder: Order = await response.json()
        setFormMessage({
          type: "success",
          text: `Order ${createdOrder.tracking_number} added successfully!`,
        })
        event.currentTarget.reset() // Clear form
        fetchOrders() // Refresh the list of orders
      } else {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        console.error("Failed to add order:", errorData)
        setFormMessage({
          type: "error",
          text: `Failed to add order: ${errorData.error || JSON.stringify(errorData)}`,
        })
      }
    } catch (error) {
      console.error("Network error or unexpected issue:", error)
      setFormMessage({
        type: "error",
        text: "Network error. Please check if your Django API is running and accessible.",
      })
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <SiteHeader />
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
                  <Label htmlFor="trackingNumber">Tracking Number</Label>
                  <Input id="trackingNumber" name="trackingNumber" required placeholder="e.g., TRK123456" />
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <select
                    id="status"
                    name="status"
                    required
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Select Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="IN_TRANSIT">In Transit</option>
                    <option value="DELIVERED">Delivered</option>
                    <option value="CANCELLED">Cancelled</option>
                    <option value="EXCEPTION">Exception</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="sender">Sender</Label>
                  <Input id="sender" name="sender" placeholder="e.g., Acme Corp" />
                </div>
                <div>
                  <Label htmlFor="receiver">Receiver</Label>
                  <Input id="receiver" name="receiver" placeholder="e.g., John Doe" />
                </div>
                <div>
                  <Label htmlFor="origin">Origin</Label>
                  <Input id="origin" name="origin" placeholder="e.g., New York, USA" />
                </div>
                <div>
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" name="destination" placeholder="e.g., Los Angeles, USA" />
                </div>
                <div>
                  <Label htmlFor="estimatedDelivery">Estimated Delivery (YYYY-MM-DD)</Label>
                  <Input id="estimatedDelivery" name="estimatedDelivery" type="date" />
                </div>
                <div>
                  <Label htmlFor="details">Details</Label>
                  <Textarea id="details" name="details" rows={3} placeholder="Additional order details..." />
                </div>
                {formMessage && (
                  <p className={formMessage.type === "success" ? "text-green-500 text-sm" : "text-red-500 text-sm"}>
                    {formMessage.text}
                  </p>
                )}
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white" disabled={isAdding}>
                  {isAdding ? "Adding..." : "Add Order"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Existing Orders List */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Existing Orders</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingOrders ? (
                <p>Loading orders...</p>
              ) : orders.length === 0 ? (
                <p>
                  No orders found.{" "}
                  {formMessage?.type === "error" ? "Check your API connection." : "Add your first order!"}
                </p>
              ) : (
                <div className="grid gap-4 max-h-96 overflow-y-auto">
                  {orders.map((order) => (
                    <Card key={order.tracking_number} className="p-4 border">
                      <h3 className="font-semibold text-lg">Tracking: {order.tracking_number}</h3>
                      <p>
                        Status: <span className="font-medium">{order.status}</span>
                      </p>
                      <p>
                        From: {order.sender} ({order.origin})
                      </p>
                      <p>
                        To: {order.receiver} ({order.destination})
                      </p>
                      <p>Est. Delivery: {order.estimated_delivery}</p>
                      {order.details && <p className="text-sm text-gray-600">Details: {order.details}</p>}
                      {order.created_at && (
                        <p className="text-xs text-gray-500">
                          Created: {new Date(order.created_at).toLocaleDateString()}
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
