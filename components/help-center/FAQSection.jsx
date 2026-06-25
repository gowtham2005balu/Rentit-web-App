import { useState } from "react";

const faqs = [
  {
    q: "How do I book a property on Rentit?",
    a: "To book a property on Rentit, search for accommodations in your preferred city, apply filters like price, type, and amenities, then click on a listing to view full details. Hit 'Book Now' or 'Contact Owner' to proceed. You'll be guided through a simple booking flow — no brokers or middlemen involved.",
  },
  { q: "How can I contact a property owner directly?", a: "" },
  { q: "Can I cancel a booking and what is the policy?", a: "" },
  { q: "When will I receive my refund after cancellation?", a: "" },
  { q: "How does Rentit property verification work?", a: "" },
  { q: "How do I update my profile and account information?", a: "" },
  { q: "What payment methods are supported on Rentit?", a: "" },
  { q: "How do I report a suspicious or fake listing?", a: "" },
];

const filterTopics = [
  { label: "All Questions", count: 34 },
  { label: "Accommodation", count: 9 },
  { label: "Bookings", count: 9 },
  { label: "Payments", count: 4 },
  { label: "Account", count: 9 },
  { label: "Listing", count: 2 },
  { label: "Safety", count: 3 },
];

export default function FAQSection() {
  const [open, setOpen] = useState(0);
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto text-center mb-10">
        <p className="text-[#D97706] text-xs font-semibold uppercase tracking-widest mb-3">
          ✦ FAQ
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-3">
          Frequently asked<br />questions
        </h2>
        <p className="text-gray-500 text-sm">
          Can't find what you need?{" "}
          <a href="#" className="font-semibold text-gray-800 underline">
            Contact our support team.
          </a>
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex gap-8">
        {/* Filter sidebar */}
        <div className="hidden md:block w-48 shrink-0">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">
            Filter by topic
          </p>
          <ul className="space-y-1">
            {filterTopics.map((f, i) => (
              <li key={f.label}>
                <button
                  onClick={() => setActiveFilter(i)}
                  className={`w-full flex justify-between items-center text-sm px-3 py-2 rounded-lg transition-colors ${
                    activeFilter === i
                      ? "bg-orange-50 text-orange-600 font-semibold"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <span>{f.label}</span>
                  <span className="text-gray-400 text-xs">{f.count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* FAQ accordion */}
        <div className="flex-1">
          {/* Search */}
          <div className="relative mb-6">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              className="w-full border border-gray-200 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-orange-400"
            />
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpen(open === i ? -1 : i)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <span>{faq.q}</span>
                  <span
                    className={`ml-4 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs transition-colors ${
                      open === i ? "bg-gray-900" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {open === i ? "−" : "+"}
                  </span>
                </button>
                {open === i && faq.a && (
                  <div className="px-5 pb-4 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
