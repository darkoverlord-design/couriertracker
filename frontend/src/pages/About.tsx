import { motion } from 'framer-motion'
import { Award, Heart, Target, Users } from 'lucide-react'

const values = [
  { icon: Target, title: 'Reliability', description: 'We deliver on our promises with industry-leading on-time performance.' },
  { icon: Heart, title: 'Customer First', description: 'Every decision we make starts with how it benefits our customers.' },
  { icon: Award, title: 'Excellence', description: 'We continuously improve our services to exceed expectations.' },
  { icon: Users, title: 'Integrity', description: 'Transparent operations and honest communication at every step.' },
]

const stats = [
  { value: '2M+', label: 'Packages Delivered' },
  { value: '50+', label: 'Distribution Centers' },
  { value: '99.2%', label: 'On-Time Rate' },
  { value: '15+', label: 'Years of Service' },
]

export default function About() {
  return (
    <div className="container-app py-12 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">About CourierTrack</h1>
        <p className="mt-6 text-lg leading-relaxed text-gray-600">
          Founded in 2010, CourierTrack has grown from a regional delivery service into a nationwide logistics
          leader trusted by businesses and individuals alike. Our mission is to make shipping simple, transparent,
          and reliable for everyone.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"
          >
            <p className="text-3xl font-bold text-brand-600">{stat.value}</p>
            <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20">
        <h2 className="text-center text-2xl font-bold text-gray-900">Our Values</h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                <value.icon className="h-6 w-6 text-brand-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{value.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
