import { motion } from 'framer-motion'
import { Clock, Globe, Plane, Truck, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'

const services = [
  {
    icon: Truck,
    name: 'Standard Shipping',
    description: 'Reliable ground delivery for everyday shipments. Delivery in 3–5 business days.',
    price: 'From $8.99',
    features: ['Door-to-door delivery', 'Basic tracking', 'Up to 70 lbs'],
  },
  {
    icon: Zap,
    name: 'Express Shipping',
    description: 'Accelerated delivery for time-sensitive packages. Delivery in 1–2 business days.',
    price: 'From $19.99',
    features: ['Priority handling', 'Real-time tracking', 'Insurance included'],
    featured: true,
  },
  {
    icon: Clock,
    name: 'Overnight Delivery',
    description: 'Next-business-day delivery guaranteed for urgent shipments.',
    price: 'From $34.99',
    features: ['Next-day guarantee', 'Signature confirmation', 'Premium support'],
  },
  {
    icon: Globe,
    name: 'International Shipping',
    description: 'Global delivery to over 220 countries and territories worldwide.',
    price: 'From $29.99',
    features: ['Customs clearance', 'Duty calculation', 'Global tracking'],
  },
  {
    icon: Plane,
    name: 'Freight Services',
    description: 'Heavy and bulk shipment solutions for commercial clients.',
    price: 'Custom pricing',
    features: ['Pallet shipping', 'Liftgate service', 'Dedicated account manager'],
  },
]

export default function Services() {
  return (
    <div className="container-app py-12 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Services</h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          Flexible shipping options designed to meet every delivery need, from standard parcels to international freight.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            className={`relative rounded-2xl border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${
              service.featured ? 'border-brand-300 ring-2 ring-brand-100' : 'border-gray-200'
            }`}
          >
            {service.featured && (
              <span className="absolute -top-3 left-6 rounded-full bg-brand-600 px-3 py-0.5 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand-50">
              <service.icon className="h-6 w-6 text-brand-600" />
            </div>
            <h2 className="mt-4 text-xl font-semibold text-gray-900">{service.name}</h2>
            <p className="mt-2 text-sm text-gray-600">{service.description}</p>
            <p className="mt-4 text-lg font-bold text-brand-600">{service.price}</p>
            <ul className="mt-4 space-y-2">
              {service.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 rounded-2xl bg-brand-600 px-8 py-12 text-center text-white">
        <h2 className="text-2xl font-bold">Ready to ship?</h2>
        <p className="mt-3 text-brand-100">Contact our team to get started with a shipping solution tailored to your needs.</p>
        <Link
          to="/contact"
          className="mt-6 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-brand-600 transition-colors hover:bg-brand-50"
        >
          Get in Touch
        </Link>
      </div>
    </div>
  )
}
