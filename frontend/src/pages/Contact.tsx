import { motion } from 'framer-motion'
import { CheckCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { getErrorMessage, submitContactForm } from '../services/api'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      await submitContactForm(form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(getErrorMessage(err))
    }
  }

  return (
    <div className="container-app py-12 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Contact Us</h1>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Have a question or need assistance? Our support team is here to help.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <MapPin className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Headquarters</h3>
                <p className="mt-1 text-sm text-gray-600">
                  1200 Logistics Parkway, Suite 500<br />Chicago, IL 60601
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <Phone className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
                <p className="mt-1 text-sm text-gray-600">1-800-555-1234 (Mon–Fri, 8am–8pm CT)</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <Mail className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Email</h3>
                <p className="mt-1 text-sm text-gray-600">support@couriertrack.com</p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            {status === 'success' && (
              <div className="mb-6 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-sm text-green-700">
                <CheckCircle className="h-5 w-5 shrink-0" />
                Thank you for contacting us. We will respond shortly.
              </div>
            )}
            {status === 'error' && (
              <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700" role="alert">
                {errorMsg}
              </div>
            )}

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2.5 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700 disabled:opacity-70"
            >
              {status === 'loading' ? 'Sending...' : (
                <>
                  <Send className="h-5 w-5" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
