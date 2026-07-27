export interface TrackingEvent {
  id: number
  shipment: number
  status: string
  status_display: string
  location: string
  description: string
  event_timestamp: string
}

export interface Shipment {
  id: number
  tracking_number: string
  sender_name: string
  recipient_name: string
  sender_address: string
  recipient_address: string
  origin: string
  destination: string
  current_location: string
  status: string
  status_display: string
  service_type: string
  service_type_display: string
  carrier: string
  package_weight: string
  package_dimensions: string
  estimated_delivery_date: string
  progress_percentage: number
  origin_lat: string | null
  origin_lng: string | null
  current_lat: string | null
  current_lng: string | null
  destination_lat: string | null
  destination_lng: string | null
  created_at: string
  updated_at: string
}

export interface TrackingResponse {
  shipment: Shipment
  tracking_history: TrackingEvent[]
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}
