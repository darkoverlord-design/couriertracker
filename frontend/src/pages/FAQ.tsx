import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'How do I track my shipment?',
    answer: 'Enter your 14-digit tracking number on our homepage or Track Shipment page. You will see real-time status updates, delivery estimates, and a complete tracking history.',
  },
  {
    question: 'Where can I find my tracking number?',
    answer: 'Your tracking number is provided in your shipping confirmation email and on your receipt. It is a 14-digit numeric code unique to your shipment.',
  },
  {
    question: 'How long does standard shipping take?',
    answer: 'Standard shipping typically delivers within 3–5 business days. Express and overnight options are available for faster delivery.',
  },
  {
    question: 'What if my package is delayed?',
    answer: 'If your shipment is delayed beyond the estimated delivery date, please contact our support team at 1-800-555-1234 or support@couriertrack.com for assistance.',
  },
  {
    question: 'Can I change the delivery address?',
    answer: 'Address changes may be possible before the package is out for delivery. Contact customer support as soon as possible with your tracking number.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes, we ship to over 220 countries and territories. International delivery times vary by destination and service level selected.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
        aria-expanded={open}
      >
        <span className="pr-4 font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className="overflow-hidden"
      >
        <p className="pb-5 text-sm leading-relaxed text-gray-600">{answer}</p>
      </motion.div>
    </div>
  )
}

export default function FAQ() {
  return (
    <div className="container-app py-12 sm:py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-3xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-4 text-gray-600">Find answers to common questions about tracking and shipping with CourierTrack.</p>
        </div>
        <div className="mt-12 rounded-2xl border border-gray-200 bg-white px-6 shadow-sm sm:px-8">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
