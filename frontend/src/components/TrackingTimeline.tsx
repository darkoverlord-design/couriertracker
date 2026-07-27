import { motion } from 'framer-motion'
import { CheckCircle2, Circle, MapPin } from 'lucide-react'

import type { TrackingEvent } from '../types/shipment'
import { formatDateTime } from '../utils/validation'

interface TrackingTimelineProps {
  events: TrackingEvent[]
}

export default function TrackingTimeline({ events }: TrackingTimelineProps) {
  if (events.length === 0) {
    return (
      <p className="text-sm text-gray-500">No tracking events available yet.</p>
    )
  }

  return (
    <ol className="relative space-y-0">
      {events.map((event, index) => {
        const isFirst = index === 0
        const isLast = index === events.length - 1

        return (
          <motion.li
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex gap-4 pb-8 last:pb-0"
          >
            {!isLast && (
              <span
                className="absolute left-[11px] top-6 h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
            )}
            <div className="relative z-10 mt-0.5 shrink-0">
              {isFirst ? (
                <CheckCircle2 className="h-6 w-6 text-brand-600" aria-hidden="true" />
              ) : (
                <Circle className="h-6 w-6 text-gray-300" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-sm font-semibold ${isFirst ? 'text-brand-700' : 'text-gray-900'}`}>
                  {event.status_display}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <time className="text-xs text-gray-500" dateTime={event.event_timestamp}>
                  {formatDateTime(event.event_timestamp)}
                </time>
              </div>
              <div className="mt-1 flex items-start gap-1.5 text-sm text-gray-600">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{event.location}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500">{event.description}</p>
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}
