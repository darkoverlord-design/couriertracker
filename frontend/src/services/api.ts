import axios from 'axios'

import type { ContactFormData, TrackingResponse } from '../types/shipment'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
})

export async function trackShipment(trackingNumber: string): Promise<TrackingResponse> {
  const { data } = await api.get<TrackingResponse>(`/track/${trackingNumber}/`)
  return data
}

export async function submitContactForm(formData: ContactFormData): Promise<{ detail: string }> {
  const { data } = await api.post<{ detail: string }>('/contact/', formData)
  return data
}

export function isNotFoundError(error: unknown): boolean {
  return axios.isAxiosError(error) && error.response?.status === 404
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404) {
      return 'Tracking Number Not Found'
    }
    if (error.response?.data?.detail) {
      return String(error.response.data.detail)
    }
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please try again.'
    }
    if (!error.response) {
      return 'Unable to connect to the server. Please try again later.'
    }
  }
  return 'An unexpected error occurred. Please try again.'
}
