import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Layout from './components/Layout'
import LoadingSpinner from './components/LoadingSpinner'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import Privacy from './pages/Privacy'
import Services from './pages/Services'
import Terms from './pages/Terms'
import TrackShipment from './pages/TrackShipment'

const TrackingResults = lazy(() => import('./pages/TrackingResults'))

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="track" element={<TrackShipment />} />
          <Route
            path="track/:trackingNumber"
            element={
              <Suspense fallback={
                <div className="container-app flex min-h-[50vh] items-center justify-center py-20">
                  <LoadingSpinner size="lg" />
                </div>
              }>
                <TrackingResults />
              </Suspense>
            }
          />
          <Route path="services" element={<Services />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
