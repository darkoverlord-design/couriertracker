const TRACKING_REGEX = /^\d{14}$/

export function validateTrackingNumber(value: string): string | null {
  const cleaned = value.replace(/\s/g, '')
  if (!cleaned) {
    return 'Please enter a tracking number.'
  }
  if (!/^\d+$/.test(cleaned)) {
    return 'Tracking number must contain numbers only.'
  }
  if (cleaned.length < 14) {
    return `Tracking number must be 14 digits (${cleaned.length}/14).`
  }
  if (cleaned.length > 14) {
    return 'Tracking number must be exactly 14 digits.'
  }
  if (!TRACKING_REGEX.test(cleaned)) {
    return 'Invalid tracking number format.'
  }
  return null
}

export function formatTrackingNumber(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 14)
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ').trim()
}

export function cleanTrackingNumber(value: string): string {
  return value.replace(/\D/g, '').slice(0, 14)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function formatDateTime(dateStr: string): string {
  return new Date(dateStr).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}
