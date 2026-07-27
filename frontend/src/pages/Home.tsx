import { motion } from 'framer-motion'
import { ArrowRight, Clock, Globe, Shield, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'

import TrackingForm from '../components/TrackingForm'

const features = [
  {
    icon: Truck,
    title: 'Real-Time Tracking',
    description: 'Monitor your package at every stage of its journey with live status updates.',
  },
  {
    icon: Shield,
    title: 'Secure Delivery',
    description: 'Your shipments are handled with care and protected throughout transit.',
  },
  {
    icon: Clock,
    title: 'On-Time Performance',
    description: 'Industry-leading delivery times with accurate estimated arrival dates.',
  },
  {
    icon: Globe,
    title: 'Nationwide Coverage',
    description: 'Comprehensive logistics network spanning every major city and region.',
  },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggIGQ9Ik0zNiAzNGg0djRoLTR6bTAtMjBoNHY0aC00em0tMjAgMjBoNHY0aC00em0wLTIwaDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />
        <div className="container-app relative py-20 sm:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-3xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Track Your Shipment with Confidence
            </h1>
            <p className="mt-6 text-lg text-brand-100 sm:text-xl">
              Enter your 14-digit tracking number to receive the latest shipment updates.
            </p>
            <div className="mt-10 rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
              <TrackingForm size="large" />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-app py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose CourierTrack?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Trusted by thousands of businesses for reliable, transparent shipping solutions.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50">
                <feature.icon className="h-6 w-6 text-brand-600" aria-hidden="true" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-brand-50 py-16">
        <div className="container-app text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Need Shipping Solutions?</h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-600">
            Explore our range of delivery services designed for every shipping need.
          </p>
          <Link
            to="/services"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-700"
          >
            View Services
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  )
}
