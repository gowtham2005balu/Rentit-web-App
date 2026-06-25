const quickLinks = [
  {
    icon: "🔍",
    title: "Find My Booking",
    desc: "Locate your active or past bookings and reservation details.",
    color: "bg-blue-50",
  },
  {
    icon: "💳",
    title: "Payment Issues",
    desc: "Resolve failed payments, transaction errors, or missing charges.",
    color: "bg-yellow-50",
  },
  {
    icon: "✅",
    title: "Account Verification",
    desc: "Complete your identity or property verification quickly.",
    color: "bg-green-50",
  },
  {
    icon: "🚫",
    title: "Cancel Reservation",
    desc: "Understand cancellation policies and initiate a cancellation.",
    color: "bg-red-50",
  },
  {
    icon: "💬",
    title: "Contact Property Owner",
    desc: "Reach out to the owner directly through Rentit messaging.",
    color: "bg-teal-50",
  },
  {
    icon: "🚩",
    title: "Report a Listing",
    desc: "Flag suspicious, fake, or misleading property listings.",
    color: "bg-orange-50",
  },
  {
    icon: "💰",
    title: "Refund Requests",
    desc: "Submit a refund request and track its processing status.",
    color: "bg-purple-50",
  },
  {
    icon: "🛡️",
    title: "Safety Support",
    desc: "Report safety concerns, scams, or emergency situations.",
    color: "bg-amber-50",
  },
];

export default function QuickAccessSection() {
  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#D97706] text-xs font-semibold uppercase tracking-widest mb-2">
          ✦ Quick Access
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          What do you need help with?
        </h2>
        <p className="text-gray-500 text-sm mb-10">
          Jump straight to the most common support topics.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickLinks.map((item) => (
            <div
              key={item.title}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-orange-200 cursor-pointer transition-all group"
            >
              <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center text-lg mb-4`}>
                {item.icon}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-orange-500 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
