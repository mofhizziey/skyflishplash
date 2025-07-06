"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Search, Package, Truck, MapPin, Clock, CheckCircle, Circle, AlertCircle } from "lucide-react"
import type { Order } from "@/lib/orders"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define your API base URL - Update this to your actual Django API URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://logistics-ia1c.onrender.com/api"

interface TrackingStage {
  id: string
  title: string
  description: string
  icon: React.ComponentType<any>
  completed: boolean
  current: boolean
  timestamp?: string
}

export function TrackPackageSection() {
  const [trackingNumber, setTrackingNumber] = useState("")
  const [order, setOrder] = useState<Order | null>(null)
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const calculateProgress = (createdAt: string, estimatedDelivery: string, currentStatus: string): number => {
    const created = new Date(createdAt).getTime()
    const delivery = new Date(estimatedDelivery).getTime()
    const now = new Date().getTime()

    // If delivered, return 100%
    if (currentStatus.toLowerCase().includes("delivered")) return 100

    // Calculate progress based on time elapsed
    const totalTime = delivery - created
    const elapsedTime = now - created
    const progress = Math.min(Math.max((elapsedTime / totalTime) * 100, 0), 95) // Cap at 95% unless delivered

    return Math.round(progress)
  }

  const getTrackingStages = (order: Order): TrackingStage[] => {
    const progress = calculateProgress(order.created_at || "", order.estimated_delivery, order.status)
    const currentStatus = order.status.toLowerCase()

    return [
      {
        id: "placed",
        title: "Order Placed",
        description: "Your shipment has been created and is being prepared",
        icon: Package,
        completed: true,
        current: false,
        timestamp: order.created_at ? new Date(order.created_at).toLocaleString() : undefined,
      },
      {
        id: "processing",
        title: "Processing",
        description: "Package is being prepared for shipment",
        icon: Circle,
        completed: progress > 20,
        current: progress <= 20 && !currentStatus.includes("delivered"),
        timestamp: progress > 20 ? "Completed" : undefined,
      },
      {
        id: "transit",
        title: "In Transit",
        description: "Package is on its way to destination",
        icon: Truck,
        completed: progress > 50,
        current: progress > 20 && progress <= 80 && !currentStatus.includes("delivered"),
        timestamp: progress > 50 ? "In Progress" : undefined,
      },
      {
        id: "delivery",
        title: "Out for Delivery",
        description: "Package is out for final delivery",
        icon: MapPin,
        completed: progress > 80,
        current: progress > 80 && !currentStatus.includes("delivered"),
        timestamp: progress > 80 ? "Today" : undefined,
      },
      {
        id: "delivered",
        title: "Delivered",
        description: "Package has been successfully delivered",
        icon: CheckCircle,
        completed: currentStatus.includes("delivered"),
        current: currentStatus.includes("delivered"),
        timestamp: currentStatus.includes("delivered") ? order.estimated_delivery : undefined,
      },
    ]
  }

  const getStatusColor = (status: string): string => {
    const statusLower = status.toLowerCase()
    if (statusLower.includes("delivered")) return "bg-green-500"
    if (statusLower.includes("transit") || statusLower.includes("shipping")) return "bg-blue-500"
    if (statusLower.includes("processing") || statusLower.includes("preparing")) return "bg-yellow-500"
    if (statusLower.includes("delayed") || statusLower.includes("exception")) return "bg-red-500"
    return "bg-gray-500"
  }

  const getDaysRemaining = (estimatedDelivery: string): string => {
    const delivery = new Date(estimatedDelivery)
    const now = new Date()
    const diffTime = delivery.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays < 0) return "Overdue"
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    return `${diffDays} days`
  }

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
        if (response.status === 404) {
          setMessage("Order not found. Please check the tracking number.")
        } else {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return
      }

      const data: Order[] = await response.json() // DRF list endpoint returns an array
      console.log("Data: ", data)

      // Filter the data to ensure we get the exact match for the tracking number
      const filteredOrders = data.filter(
        (order) => order.tracking_number && order.tracking_number.toLowerCase() === trackingNumber.trim().toLowerCase(),
      )

      if (filteredOrders.length > 0) {
        // Take the first exact match
        setOrder(filteredOrders[0])
        setMessage("Order details found!")
      } else if (data.length > 0) {
        // If we have data but no exact match, show partial match warning
        const partialMatch = data.find(
          (order) =>
            order.tracking_number && order.tracking_number.toLowerCase().includes(trackingNumber.trim().toLowerCase()),
        )

        if (partialMatch) {
          setOrder(partialMatch)
          setMessage("Partial match found. Please verify the tracking number.")
        } else {
          setOrder(null)
          setMessage("Order not found. Please check the tracking number.")
        }
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
      <div className="relative z-10 text-center px-4 w-full max-w-4xl">
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
          <div className="mt-8 w-full text-left space-y-6">
            {/* Main Tracking Card */}
            <Card className="bg-white text-gray-800 shadow-2xl border-0 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl font-bold mb-2">Tracking Details</CardTitle>
                    <p className="text-blue-100 text-lg font-mono">{order.tracking_number}</p>
                  </div>
                  <div className="text-right">
                    <div
                      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)} text-white`}
                    >
                      <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                      {order.status}
                    </div>
                    <p className="text-blue-100 text-sm mt-2">
                      Estimated delivery: {getDaysRemaining(order.estimated_delivery)}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0">
                {/* Progress Timeline */}
                <div className="p-6 bg-gray-50">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-600">Delivery Progress</span>
                      <span className="text-sm font-medium text-gray-600">
                        {calculateProgress(order.created_at || "", order.estimated_delivery, order.status)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${calculateProgress(order.created_at || "", order.estimated_delivery, order.status)}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Tracking Stages */}
                  <div className="space-y-4">
                    {getTrackingStages(order).map((stage, index) => {
                      const IconComponent = stage.icon
                      return (
                        <div key={stage.id} className="flex items-start gap-4">
                          <div className="flex flex-col items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                stage.completed
                                  ? "bg-green-500 text-white"
                                  : stage.current
                                    ? "bg-blue-500 text-white animate-pulse"
                                    : "bg-gray-200 text-gray-400"
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            {index < getTrackingStages(order).length - 1 && (
                              <div
                                className={`w-0.5 h-12 mt-2 transition-all duration-300 ${
                                  stage.completed ? "bg-green-500" : "bg-gray-200"
                                }`}
                              ></div>
                            )}
                          </div>
                          <div className="flex-1 pb-8">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`font-semibold transition-colors duration-300 ${
                                  stage.completed || stage.current ? "text-gray-800" : "text-gray-400"
                                }`}
                              >
                                {stage.title}
                              </h4>
                              {stage.timestamp && <span className="text-sm text-gray-500">{stage.timestamp}</span>}
                            </div>
                            <p
                              className={`text-sm mt-1 transition-colors duration-300 ${
                                stage.completed || stage.current ? "text-gray-600" : "text-gray-400"
                              }`}
                            >
                              {stage.description}
                            </p>
                            {stage.current && (
                              <div className="mt-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  <Clock className="w-3 h-3 mr-1" />
                                  Current Status
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Shipment Details */}
                <div className="p-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Shipment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">From</p>
                          <p className="font-medium text-gray-800">{order.sender}</p>
                          <p className="text-sm text-gray-600">{order.origin}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">To</p>
                          <p className="font-medium text-gray-800">{order.receiver}</p>
                          <p className="text-sm text-gray-600">{order.destination}</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Estimated Delivery</p>
                          <p className="font-medium text-gray-800">
                            {new Date(order.estimated_delivery).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-gray-600">{getDaysRemaining(order.estimated_delivery)}</p>
                        </div>
                      </div>
                      {order.details && (
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />
                          <div>
                            <p className="text-sm text-gray-500">Additional Details</p>
                            <p className="text-sm text-gray-600">{order.details}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Timestamps */}
                <div className="p-6 bg-gray-50 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {order.created_at && (
                      <div>
                        <span className="text-gray-500">Order Created:</span>
                        <span className="ml-2 font-medium text-gray-800">
                          {new Date(order.created_at).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {order.updated_at && (
                      <div>
                        <span className="text-gray-500">Last Updated:</span>
                        <span className="ml-2 font-medium text-gray-800">
                          {new Date(order.updated_at).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => window.print()}
                variant="outline"
                className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3"
              >
                Print Details
              </Button>
              <Button onClick={() => setOrder(null)} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3">
                Track Another Package
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
