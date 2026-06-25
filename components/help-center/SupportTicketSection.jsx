export default function SupportTicketSection() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row gap-10">
          {/* Form */}
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Submit a support ticket</h2>
            <p className="text-sm text-gray-500 mb-6">
              Describe your issue and we'll get back to you within 24–48 hours.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Full Name</label>
                <input
                  type="text"
                  placeholder="Your full name"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  placeholder="you@email.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Issue Category</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-500 focus:outline-none focus:border-orange-400 bg-white">
                  <option>Select a category</option>
                  <option>Booking</option>
                  <option>Payment</option>
                  <option>Account</option>
                  <option>Safety</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Priority</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 focus:outline-none focus:border-orange-400 bg-white">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-semibold text-gray-700 mb-1.5">Describe your issue</label>
              <textarea
                rows={5}
                placeholder="Please provide as much detail as possible..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400 placeholder-gray-400 resize-none"
              />
            </div>

            <button className="bg-gray-900 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
              Submit Ticket →
            </button>
          </div>

          {/* What to expect */}
          <div className="md:w-64 shrink-0">
            <h3 className="text-sm font-bold text-gray-900 mb-6">What to expect</h3>
            <div className="space-y-5">
              {[
                { icon: "⚡", title: "Instant Confirmation", desc: "You'll receive an email confirmation with your ticket ID immediately." },
                { icon: "🔍", title: "Team Review", desc: "Our support team reviews every ticket within 4 business hours." },
                { icon: "✅", title: "Resolution", desc: "Most tickets are resolved within 24–48 hours. Complex cases may take longer." },
                { icon: "⭐", title: "98% Satisfaction", desc: "Our support team maintains a 98% customer satisfaction rating." },
              ].map((item) => (
                <div key={item.title} className="flex gap-3">
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
