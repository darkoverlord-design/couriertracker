export default function Privacy() {
  return (
    <div className="container-app py-12 sm:py-16">
      <article className="prose prose-gray mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-gray-500">Last updated: July 27, 2026</p>

        <section className="mt-8 space-y-6 text-gray-600">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">1. Information We Collect</h2>
            <p className="mt-2 leading-relaxed">
              We collect information you provide directly, including tracking numbers, contact form submissions,
              and account information for administrative users. We also collect usage data such as IP addresses
              and browser type to improve our services.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
            <p className="mt-2 leading-relaxed">
              Your information is used to provide shipment tracking services, respond to inquiries, improve
              our platform, and comply with legal obligations. We do not sell your personal information to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">3. Data Security</h2>
            <p className="mt-2 leading-relaxed">
              We implement industry-standard security measures including encryption, secure database connections,
              and access controls to protect your data.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">4. Your Rights</h2>
            <p className="mt-2 leading-relaxed">
              You may request access to, correction of, or deletion of your personal data by contacting us at
              privacy@couriertrack.com.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">5. Contact</h2>
            <p className="mt-2 leading-relaxed">
              For privacy-related inquiries, please email privacy@couriertrack.com or write to us at
              1200 Logistics Parkway, Suite 500, Chicago, IL 60601.
            </p>
          </div>
        </section>
      </article>
    </div>
  )
}
