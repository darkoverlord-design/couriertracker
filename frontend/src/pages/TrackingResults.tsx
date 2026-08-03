import { motion } from 'framer-motion'
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  MapPin,
  Package,
  Scale,
  Truck,
  User,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import LoadingSpinner from '../components/LoadingSpinner'
import ShipmentMap from '../components/ShipmentMap'
import ShipmentProgress from '../components/ShipmentProgress'
import TrackingForm from '../components/TrackingForm'
import TrackingTimeline from '../components/TrackingTimeline'
import { getErrorMessage, isNotFoundError, trackShipment } from '../services/api'
import type { TrackingResponse } from '../types/shipment'
import { cleanTrackingNumber, formatDate, formatTrackingNumber } from '../utils/validation'

function DetailItem({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
      <div>
        <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</dt>
        <dd className="mt-0.5 text-sm font-medium text-gray-900">{value}</dd>
      </div>
    </div>
  )
}

export default function TrackingResults() {
  const { trackingNumber = '' } = useParams()
  const [data, setData] = useState<TrackingResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function fetchTracking(number: string) {
      setLoading(true)
      setError(null)
      setNotFound(false)
      setData(null)

      try {
        const result = await trackShipment(number)
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) {
          if (isNotFoundError(err)) {
            setNotFound(true)
          } else {
            setError(getErrorMessage(err))
          }
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    if (trackingNumber) {
      const cleaned = cleanTrackingNumber(trackingNumber)
      if (cleaned.length === 14) {
        fetchTracking(cleaned)
      } else {
        setError('Tracking number must be exactly 14 digits.')
        setLoading(false)
      }
    }

    return () => { cancelled = true }
  }, [trackingNumber])

  if (loading) {
    return (
      <div className="container-app flex min-h-[50vh] items-center justify-center py-20">
        <LoadingSpinner size="lg" label="Searching for your shipment..." />
      </div>
    )
  }

  if (notFound) {
    return (
      <div className="container-app py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-lg text-center"
        >
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
            <AlertCircle className="h-10 w-10 text-red-500" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-gray-900">Tracking Number Not Found</h1>
          <p className="mt-3 text-gray-600">
            We couldn't find a shipment matching{' '}
            <span className="font-mono font-semibold">{formatTrackingNumber(trackingNumber)}</span>.
            Please verify the number and try again.
          </p>
          <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <TrackingForm />
          </div>
          <Link
            to="/track"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to tracking
          </Link>
        </motion.div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="container-app py-12 sm:py-16">
        <div className="mx-auto max-w-lg text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-2 text-gray-600">{error}</p>
          <Link to="/track" className="mt-6 inline-block text-brand-600 hover:text-brand-700">
            Try again
          </Link>
        </div>
      </div>
    )
  }

  const shipment = data?.shipment
  const trackingHistory = data?.tracking_history

  if (!shipment) {
    return (
      <div className="container-app py-12 sm:py-16">
        <div className="mx-auto max-w-lg text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
          <h1 className="mt-4 text-xl font-bold text-gray-900">Something went wrong</h1>
          <p className="mt-2 text-gray-600">The tracking response was incomplete. Please try again.</p>
          <Link to="/track" className="mt-6 inline-block text-brand-600 hover:text-brand-700">
            Try again
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container-app py-8 sm:py-12">
      <Link
        to="/track"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" />
        Track another shipment
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Tracking Number</p>
              <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-gray-900">
                {formatTrackingNumber(shipment.tracking_number)}
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-700">
              {shipment.status_display}
            </span>
          </div>

          <div className="mt-8">
            <ShipmentProgress percentage={shipment.progress_percentage} status={shipment.status_display} />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Shipment Route</h2>
              <div className="mt-6">
                <ShipmentMap shipment={shipment} />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase text-gray-500">Origin</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{shipment.origin}</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-4">
                  <p className="text-xs font-medium uppercase text-brand-600">Current Location</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{shipment.current_location}</p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase text-gray-500">Destination</p>
                  <p className="mt-1 text-sm font-medium text-gray-900">{shipment.destination}</p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <h2 className="text-lg font-semibold text-gray-900">Tracking History</h2>
              <div className="mt-6">
                <TrackingTimeline events={trackingHistory ?? []} />
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Shipment Details</h2>
              <dl className="mt-6 space-y-5">
                <DetailItem icon={Calendar} label="Estimated Delivery" value={formatDate(shipment.estimated_delivery_date)} />
                <DetailItem icon={Truck} label="Carrier" value={shipment.carrier} />
                <DetailItem icon={Package} label="Service Type" value={shipment.service_type_display} />
                <DetailItem icon={User} label="Sender" value={shipment.sender_name} />
                <DetailItem icon={User} label="Recipient" value={shipment.recipient_name} />
                <DetailItem icon={Scale} label="Weight" value={`${shipment.package_weight} lbs`} />
                <DetailItem icon={Package} label="Dimensions" value={shipment.package_dimensions} />
                <DetailItem icon={MapPin} label="Current Location" value={shipment.current_location} />
              </dl>
            </section>
          </aside>
        </div>
      </motion.div>
    </div>
  )
}
