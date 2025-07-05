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

// Remove the in-memory orders array since we're using API
// export const orders: Order[] = []
