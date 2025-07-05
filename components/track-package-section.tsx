"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search } from "lucide-react"
import type { Order } from "@/lib/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define your API base URL - Update this to your actual Django API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

export function TrackPackageSection() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleTrack = async () => {
    if (!trackingNumber.trim()) {
      setMessage("Please enter a tracking number.....")
      setOrder(null)
      return
    }

    setIsLoading(true)
    setMessage("")
    setOrder(null)

    try {
      // Fetch order by tracking number from your Django API
      const response = await fetch(
        `${API_BASE_URL}/orders/?tracking_number=${encodeURIComponent(trackingNumber.trim())}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: Order[] = await response.json() // DRF list endpoint returns an array

      if (data.length > 0) {
        // Assuming tracking_number is unique, take the first result
        setOrder(data[0])
        setMessage("Order details found!")
      } else {
        setOrder(null)
        setMessage("Order not found. Please check the tracking number.")
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error)
      setMessage("Unable to connect to tracking service. Please check if the API is running or try again later.")
      setOrder(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section
      className="relative min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center text-white bg-cover bg-center py-12"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
      }}
    >
      <div className="absolute inset-0 bg-gray-900/70" />
      <div className="relative z-10 text-center px-4 w-full max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Track Package</h1>
        <p className="text-lg md:text-xl mb-8">Home / Track Package</p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <Input
            type="text"
            placeholder="Enter Tracking Number"
            value={trackingNumber}
            onChange={(e) => setTrackingNumber(e.target.value)}
            className="flex-1 py-6 px-4 text-lg bg-white text-gray-800 border-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleTrack()
              }
            }}
          />
          <Button
            onClick={handleTrack}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              "Searching..."
            ) : (
              <>
                <Search className="mr-2 h-5 w-5" />
                TRACK RESULT
              </>
            )}
          </Button>
        </div>
        <p className="text-sm text-gray-300 mt-4">Ex: TRK123456 (Try this if your Django API has sample data!)</p>

        {message && <p className="mt-6 text-lg font-semibold">{message}</p>}

        {order && (
          <Card className="mt-8 w-full text-left bg-white text-gray-800 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Order Details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-2">
              <p>
                <span className="font-semibold">Tracking Number:</span> {order.tracking_number}
              </p>
              <p>
                <span className="font-semibold">Status:</span>
                <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {order.status}
                </span>
              </p>
              <p>
                <span className="font-semibold">Sender:</span> {order.sender}
              </p>
              <p>
                <span className="font-semibold">Receiver:</span> {order.receiver}
              </p>
              <p>
                <span className="font-semibold">Origin:</span> {order.origin}
              </p>
              <p>
                <span className="font-semibold">Destination:</span> {order.destination}
              </p>
              <p>
                <span className="font-semibold">Estimated Delivery:</span> {order.estimated_delivery}
              </p>
              {order.details && (
                <p>
                  <span className="font-semibold">Details:</span> {order.details}
                </p>
              )}
              {order.created_at && (
                <p>
                  <span className="font-semibold">Created At:</span> {new Date(order.created_at).toLocaleString()}
                </p>
              )}
              {order.updated_at && (
                <p>
                  <span className="font-semibold">Last Updated:</span> {new Date(order.updated_at).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
