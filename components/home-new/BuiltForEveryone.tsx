"use client";

export default function BenefitsForTenants() {
  const features = [
    {
      iconBg: "bg-green-100",
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Direct Owner Contact",
      desc: "Connect directly with property owners. No brokers, no unnecessary fees, no wasted time.",
    },
    {
      iconBg: "bg-orange-100",
      icon: (
        <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      ),
      title: "Saved Properties",
      desc: "Shortlist your favourite properties and compare them side-by-side before making a decision.",
    },
    {
      iconBg: "bg-blue-100",
      icon: (
        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Visit Scheduling",
      desc: "Book property visits in seconds. Choose a time slot, get instant confirmation from owners.",
    },
    {
      iconBg: "bg-purple-100",
      icon: (
        <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: "Property Alerts",
      desc: "Get notified instantly when new properties matching your criteria become available.",
    },
    {
      iconBg: "bg-gray-100",
      icon: (
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      title: "AI Recommendations",
      desc: "Rentit learns your preferences and surfaces the most relevant properties personalized for you.",
    },
    {
      iconBg: "bg-green-100",
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Verified Listings Only",
      desc: "Every listing on Rentit is verified. No fake photos, no ghost listings, no scams.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">● BUILT FOR EVERYONE</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
            For tenants. For owners. For<br />businesses.
          </h2>
        </div>

        {/* Static tab — For Tenants only */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white border border-gray-200 rounded-full p-1 shadow-sm">
            <span className="text-sm font-semibold px-5 py-2 rounded-full bg-gray-900 text-white shadow">
              For Tenants
            </span>
          </div>
        </div>

        {/* 2×3 Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white border border-gray-100 rounded-2xl p-7 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className={`w-11 h-11 rounded-2xl ${f.iconBg} flex items-center justify-center mb-5`}>
                {f.icon}
              </div>
              <h4 className="text-base font-bold text-gray-900 mb-2">{f.title}</h4>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}