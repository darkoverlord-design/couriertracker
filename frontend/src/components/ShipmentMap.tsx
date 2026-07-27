import { lazy, Suspense } from 'react'
import { MapPin } from 'lucide-react'

import type { Shipment } from '../types/shipment'

const MapInner = lazy(() => import('./ShipmentMapInner'))

interface ShipmentMapProps {
  shipment: Shipment
}

function parseCoord(value: string | null): number | null {
  if (value === null || value === '') return null
  const num = parseFloat(value)
  return Number.isFinite(num) ? num : null
}

export default function ShipmentMap({ shipment }: ShipmentMapProps) {
  const origin = {
    lat: parseCoord(shipment.origin_lat),
    lng: parseCoord(shipment.origin_lng),
    label: shipment.origin,
  }
  const current = {
    lat: parseCoord(shipment.current_lat),
    lng: parseCoord(shipment.current_lng),
    label: shipment.current_location,
  }
  const destination = {
    lat: parseCoord(shipment.destination_lat),
    lng: parseCoord(shipment.destination_lng),
    label: shipment.destination,
  }

  const hasCoords = [origin, current, destination].every(
    (point) => point.lat !== null && point.lng !== null,
  )

  if (!hasCoords) {
    return (
      <div className="flex h-72 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
        <div className="text-center text-gray-500">
          <MapPin className="mx-auto mb-2 h-8 w-8" />
          <p className="text-sm">Map data unavailable for this shipment.</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-72 items-center justify-center rounded-xl border border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">Loading map...</p>
        </div>
      }
    >
      <MapInner origin={origin} current={current} destination={destination} />
    </Suspense>
  )
}

export interface MapPoint {
  lat: number | null
  lng: number | null
  label: string
}
