import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { cleanTrackingNumber, formatTrackingNumber, validateTrackingNumber } from '../utils/validation'

interface TrackingFormProps {
  initialValue?: string
  size?: 'default' | 'large'
  className?: string
}

export default function TrackingForm({ initialValue = '', size = 'default', className = '' }: TrackingFormProps) {
  const [value, setValue] = useState(formatTrackingNumber(initialValue))
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const handleChange = (input: string) => {
    const cleaned = cleanTrackingNumber(input)
    setValue(formatTrackingNumber(cleaned))
    if (error) {
      setError(validateTrackingNumber(cleaned))
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const cleaned = cleanTrackingNumber(value)
    const validationError = validateTrackingNumber(cleaned)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsSubmitting(true)
    navigate(`/track/${cleaned}`)
  }

  const isLarge = size === 'large'

  return (
    <form onSubmit={handleSubmit} className={`w-full ${className}`} noValidate>
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <label htmlFor="tracking-number" className="sr-only">
            Tracking Number
          </label>
          <input
            id="tracking-number"
            type="text"
            inputMode="numeric"
            autoComplete="off"
            placeholder="Enter 14-digit tracking number"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'tracking-error' : undefined}
            className={`w-full rounded-lg border bg-white font-mono tracking-wider text-gray-900 shadow-sm transition-colors placeholder:font-sans placeholder:tracking-normal placeholder:text-gray-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 ${
              error ? 'border-red-400' : 'border-gray-300'
            } ${isLarge ? 'px-5 py-4 text-lg' : 'px-4 py-3 text-base'}`}
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 font-semibold text-white shadow-md transition-colors hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70 ${
            isLarge ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Searching...
            </>
          ) : (
            <>
              <Search className="h-5 w-5" aria-hidden="true" />
              Track Shipment
            </>
          )}
        </motion.button>
      </div>
      {error && (
        <p id="tracking-error" className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
