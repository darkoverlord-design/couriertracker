import { useEffect } from 'react'
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import type { MapPoint } from './ShipmentMap'

interface ShipmentMapInnerProps {
  origin: MapPoint
  current: MapPoint
  destination: MapPoint
}

const originIcon = L.divIcon({
  className: '',
  html: '<div style="background:#2563eb;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

const currentIcon = L.divIcon({
  className: '',
  html: '<div style="background:#f59e0b;width:16px;height:16px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
})

const destinationIcon = L.divIcon({
  className: '',
  html: '<div style="background:#16a34a;width:14px;height:14px;border-radius:50%;border:3px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
})

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap()

  useEffect(() => {
    if (points.length > 0) {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40] })
    }
  }, [map, points])

  return null
}

export default function ShipmentMapInner({ origin, current, destination }: ShipmentMapInnerProps) {
  const points: [number, number][] = []
  const markers: { point: MapPoint; icon: L.DivIcon; color: string }[] = []

  if (origin.lat !== null && origin.lng !== null) {
    points.push([origin.lat, origin.lng])
    markers.push({ point: origin, icon: originIcon, color: 'Origin' })
  }
  if (current.lat !== null && current.lng !== null) {
    points.push([current.lat, current.lng])
    markers.push({ point: current, icon: currentIcon, color: 'Current Location' })
  }
  if (destination.lat !== null && destination.lng !== null) {
    points.push([destination.lat, destination.lng])
    markers.push({ point: destination, icon: destinationIcon, color: 'Destination' })
  }

  const center = points[0] ?? [39.8283, -98.5795]

  return (
    <div className="h-72 overflow-hidden rounded-xl border border-gray-200 sm:h-96">
      <MapContainer center={center} zoom={5} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitBounds points={points} />
        {points.length >= 2 && (
          <Polyline
            positions={points}
            pathOptions={{ color: '#2563eb', weight: 3, dashArray: '8 8', opacity: 0.7 }}
          />
        )}
        {markers.map(({ point, icon, color }) => (
          <Marker key={color} position={[point.lat!, point.lng!]} icon={icon}>
            <Popup>
              <strong>{color}</strong>
              <br />
              {point.label}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
