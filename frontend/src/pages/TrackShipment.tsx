import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

import TrackingForm from '../components/TrackingForm'

export default function TrackShipment() {
  return (
    <div className="container-app py-12 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-2xl"
      >
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-50">
            <Search className="h-8 w-8 text-brand-600" aria-hidden="true" />
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900">Track Your Shipment</h1>
          <p className="mt-3 text-gray-600">
            Enter your 14-digit tracking number below to view the latest status and delivery information.
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
          <TrackingForm size="large" />
        </div>

        <div className="mt-8 rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
          <p className="font-medium text-gray-700">Sample tracking numbers for testing:</p>
          <ul className="mt-2 space-y-1 font-mono text-brand-600">
            <li>1234 5678 9012 34</li>
            <li>9876 5432 1098 76</li>
            <li>5555 6666 7777 88</li>
          </ul>
        </div>
      </motion.div>
    </div>
  )
}
