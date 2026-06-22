"use client";


const CheckIcon = ({ muted }) => (
  <svg
    className={`w-4 h-4 flex-shrink-0 ${muted ? "text-gray-300" : "text-green-500"}`}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
      clipRule="evenodd"
    />
  </svg>
);

const plans = [
  {
    name: "Basic",
    tag: null,
    visibility: "30 Days Visibility",
    visibilityBadge: "2× Visibility",
    visibilityBadgeColor: "bg-gray-100 text-gray-600",
    price: "₹1,549",
    originalPrice: "₹2,319",
    period: "/mo",
    cta: "Choose Basic",
    ctaStyle: "bg-white border-2 border-gray-200 text-gray-800 hover:border-gray-400",
    features: [
      { text: "Increased listing visibility", active: true },
      { text: "Increase in feed", active: true },
      { text: "Premium discovery", active: true },
      { text: "Facebook Ads", active: false },
      { text: "Analytics dashboard", active: false },
    ],
    addons: null,
  },
  {
    name: "Premium",
    tag: "★ MOST POPULAR",
    tagColor: "bg-gray-900 text-white",
    visibility: "60 Days Visibility",
    visibilityBadge: "High Visibility",
    visibilityBadgeColor: "bg-green-100 text-green-700",
    price: "₹3,549",
    originalPrice: "₹5,799",
    period: "/mo",
    cta: "Choose Premium",
    ctaStyle: "bg-gray-900 text-white hover:bg-gray-700",
    features: [
      { text: "Facebook Ads promotion", active: true },
      { text: "Listing Highlights", active: true },
      { text: "Verified Tag on Property", active: true },
      { text: "Priority placement", active: true },
      { text: "Google Ads", active: true },
    ],
    addons: [
      { label: "Photoshoot", price: "₹750" },
      { label: "AI Video", price: "₹2,000" },
    ],
  },
  {
    name: "Premium+",
    tag: "✦ PREMIUM",
    tagColor: "bg-amber-500 text-white",
    visibility: "90 Days Visibility",
    visibilityBadge: "High Visibility",
    visibilityBadgeColor: "bg-amber-100 text-amber-700",
    price: "₹5,349",
    originalPrice: "₹8,499",
    period: "/mo",
    cta: "Choose Premium+",
    ctaStyle: "bg-amber-500 text-white hover:bg-amber-600",
    features: [
      { text: "Facebook Ads & Google Ads", active: true },
      { text: "Reports & Insights dashboard", active: true },
      { text: "Listing Highlight badge", active: true },
      { text: "Rank Top for 24 Hours", active: true },
      { text: "Verified Tag on Property", active: true },
    ],
    addons: null,
  },
];

function PlanCard({ plan }: { plan: any }) {
  return (
    <div
      className="rounded-3xl p-7 flex flex-col relative overflow-hidden bg-white border-2 border-gray-200 shadow-[0_1px_4px_rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out hover:border-orange-500 hover:shadow-[0_0_0_4px_rgba(249,115,22,0.12),_0_16px_40px_rgba(249,115,22,0.10)] hover:scale-[1.04] hover:-translate-y-1"
    >
      {/* Tag */}
      {plan.tag && (
        <div className={`absolute top-5 right-5 text-[10px] font-bold px-2.5 py-1 rounded-full ${plan.tagColor}`}>
          {plan.tag}
        </div>
      )}

      {/* Plan name & visibility */}
      <div className="mb-5">
        <h3 className="text-xl font-black text-gray-900">{plan.name}</h3>
        <p className="text-xs mt-0.5 text-gray-400">{plan.visibility}</p>
        <span className={`inline-block mt-2 text-xs font-semibold px-2.5 py-1 rounded-full ${plan.visibilityBadgeColor}`}>
          ✓ {plan.visibilityBadge}
        </span>
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black text-gray-900">{plan.price}</span>
          <span className="text-sm text-gray-400">{plan.period}</span>
        </div>
        <p className="text-xs mt-1 line-through text-gray-400">
          {plan.originalPrice} · 45% off
        </p>
      </div>

      {/* Features */}
      <ul className="flex flex-col gap-2.5 mb-6 flex-1">
        {plan.features.map((f) => (
          <li key={f.text} className="flex items-center gap-2.5">
            <CheckIcon muted={!f.active} />
            <span className={`text-sm ${!f.active ? "text-gray-300 line-through" : "text-gray-700"}`}>
              {f.text}
            </span>
          </li>
        ))}
      </ul>

      {/* Addons */}
      {plan.addons && (
        <div className="mb-5 p-3 rounded-xl text-xs bg-gray-50 border border-gray-100">
          <p className="font-semibold mb-1.5 text-gray-500">AVAILABLE ADD-ONS</p>
          <div className="flex flex-wrap gap-2">
            {plan.addons.map((a) => (
              <span
                key={a.label}
                className="px-2.5 py-1 rounded-lg font-medium bg-white border border-gray-200 text-gray-700"
              >
                {a.label} <span className="font-bold">{a.price}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <button className={`w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 ${plan.ctaStyle}`}>
        {plan.cta}
      </button>
    </div>
  );
}

export default function PremiumPlans() {
  return (
    <section className="bg-white py-24 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-6">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">✦ Premium Plans</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
            Boost your property visibility.
          </h2>
          <p className="text-gray-500 mt-3 text-base max-w-xl mx-auto">
            Get more enquiries, faster occupancy, and verified status with Rentit Premium.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-full px-5 py-2.5 text-sm font-semibold text-amber-800 shadow-sm">
            <span>⚡ Flash Sale! Save up to 45% extra — Limited time offer</span>
            <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">GO24</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} />
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            Trusted by <span className="font-bold text-gray-800">50,000+ property owners</span> across India · Verified listings get{" "}
            <span className="font-bold text-gray-800">3× more enquiries</span>
          </p>
          <button className="mt-3 text-sm font-semibold text-gray-700 underline underline-offset-2 hover:text-orange-500 transition-colors">
            View All Plans & Compare →
          </button>
        </div>
      </div>
    </section>
  );
}