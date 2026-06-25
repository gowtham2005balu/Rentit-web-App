const categories = [
  {
    icon: "🏠",
    title: "Finding Accommodation",
    desc: "Search, filter, and discover the right property.",
    count: 24,
  },
  {
    icon: "📅",
    title: "Bookings & Reservations",
    desc: "Manage your bookings, status, and modifications.",
    count: 16,
  },
  {
    icon: "💸",
    title: "Payments & Refunds",
    desc: "Methods, refund process, and billing questions.",
    count: 18,
  },
  {
    icon: "👤",
    title: "Account & Profile",
    desc: "Settings, password verification, notifications.",
    count: 12,
  },
  {
    icon: "🏢",
    title: "Property Listings",
    desc: "List, edit, and manage your property on Rentit.",
    count: 20,
  },
  {
    icon: "📊",
    title: "Owner Dashboard",
    desc: "Analytics, enquiries, boosts, and plan management.",
    count: 16,
  },
  {
    icon: "🛡️",
    title: "Safety & Trust",
    desc: "Reporting, scam protection, user safety.",
    count: 10,
  },
  {
    icon: "📋",
    title: "Policies & Terms",
    desc: "Usage policies, privacy, and community guidelines.",
    count: 6,
  },
  {
    icon: "📱",
    title: "Mobile App Help",
    desc: "iOS, Android app support and feature guides.",
    count: 9,
  },
  {
    icon: "🔧",
    title: "Technical Support",
    desc: "Bugs, errors, login issues, and platform help.",
    count: 6,
  },
];

export default function BrowseCategorySection() {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="text-[#D97706] text-xs font-semibold uppercase tracking-widest mb-2">
              ✦ Browse Topics
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Browse by category
            </h2>
            <p className="text-gray-500 text-sm">
              Every help topic organized for easy discovery.
            </p>
          </div>
          <a
            href="#"
            className="text-sm text-gray-700 hover:text-orange-500 font-medium whitespace-nowrap mt-1 transition-colors"
          >
            Browse all topics →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-10">
          {categories.map((cat) => (
            <div
              key={cat.title}
              className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-orange-200 cursor-pointer transition-all group"
            >
              <div className="text-2xl mb-3">{cat.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-orange-500 transition-colors leading-snug">
                {cat.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed mb-3">{cat.desc}</p>
              <span className="text-gray-400 text-xs">{cat.count} articles</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
