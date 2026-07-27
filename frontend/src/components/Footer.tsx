import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="container-app py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-bold text-brand-700">CourierTrack</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-600">
              Reliable shipping and real-time tracking for businesses and individuals worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/track" className="text-gray-600 hover:text-brand-600">Track Shipment</Link></li>
              <li><Link to="/services" className="text-gray-600 hover:text-brand-600">Services</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-brand-600">About Us</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-brand-600">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Legal</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-600 hover:text-brand-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-brand-600">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-brand-600">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <span>1200 Logistics Parkway, Suite 500<br />Chicago, IL 60601</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <a href="tel:+18005551234" className="hover:text-brand-600">1-800-555-1234</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-brand-600" aria-hidden="true" />
                <a href="mailto:support@couriertrack.com" className="hover:text-brand-600">support@couriertrack.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
          &copy; {currentYear} CourierTrack. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
