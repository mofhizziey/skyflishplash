// Updated Order type to match Django API response format
export type Order = {
  url?: string // Added for HyperlinkedModelSerializer
  tracking_number: string // Changed to snake_case to match Django API
  status: string
  sender: string
  receiver: string
  origin: string
  destination: string
  estimated_delivery: string // Changed to snake_case to match Django API
  details?: string
  created_at?: string // Changed to snake_case to match Django API
  updated_at?: string // Changed to snake_case to match Django API
}

export type OrderStatus = "PENDING" | "PROCESSING" | "IN_TRANSIT" | "DELIVERED" | "CANCELLED" | "EXCEPTION"

export const ORDER_STATUSES: { value: OrderStatus; label: string; color: string }[] = [
  { value: "PENDING", label: "Pending", color: "bg-gray-100 text-gray-800" },
  { value: "PROCESSING", label: "Processing", color: "bg-yellow-100 text-yellow-800" },
  { value: "IN_TRANSIT", label: "In Transit", color: "bg-blue-100 text-blue-800" },
  { value: "DELIVERED", label: "Delivered", color: "bg-green-100 text-green-800" },
  { value: "CANCELLED", label: "Cancelled", color: "bg-red-100 text-red-800" },
  { value: "EXCEPTION", label: "Exception", color: "bg-orange-100 text-orange-800" },
]

export function getStatusColor(status: string): string {
  const statusConfig = ORDER_STATUSES.find((s) => s.value === status)
  return statusConfig?.color || "bg-gray-100 text-gray-800"
}
