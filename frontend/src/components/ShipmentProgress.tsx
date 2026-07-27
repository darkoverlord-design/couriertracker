import { motion } from 'framer-motion'

interface ShipmentProgressProps {
  percentage: number
  status: string
}

export default function ShipmentProgress({ percentage, status }: ShipmentProgressProps) {
  const clamped = Math.min(100, Math.max(0, percentage))

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Shipment Progress</span>
        <span className="text-sm font-semibold text-brand-600">{clamped}%</span>
      </div>
      <div
        className="h-3 w-full overflow-hidden rounded-full bg-gray-200"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Shipment progress: ${clamped}%`}
      >
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-600"
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
      <p className="mt-2 text-sm text-gray-600">{status}</p>
    </div>
  )
}
