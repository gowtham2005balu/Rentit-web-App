const features = [
  {
    emoji: "🤖",
    title: "AI Property Matching",
    desc: "Natural language search that understands context and delivers instant, ranked property matches.",
    badge: "LIVE NOW",
    badgeStyle: "bg-teal-500/20 text-teal-400",
    dark: true,
  },
  {
    emoji: "🎯",
    title: "Smart Recommendations",
    desc: "Personalized property suggestions based on your search history, preferences, and behavior.",
    badge: "COMING SOON",
    badgeStyle: "text-[#F59E0B]",
    dark: false,
  },
  {
    emoji: "📊",
    title: "Owner Growth Tools",
    desc: "Advanced analytics, performance insights, and AI-driven recommendations for property owners.",
    badge: "Q3 2025",
    badgeStyle: "text-[#F59E0B]",
    dark: false,
  },
  {
    emoji: "📢",
    title: "Premium Promotion",
    desc: "Automated social media promotion, AI-generated video tours, and targeted advertising for listings.",
    badge: "LIVE NOW",
    badgeStyle: "bg-teal-500/20 text-teal-400",
    dark: false,
  },
  {
    emoji: "🗺️",
    title: "New Cities Expansion",
    desc: "Taking Rentit to every major city across India — Mumbai, Bangalore, Hyderabad, Delhi, and beyond.",
    badge: "2025–2026",
    badgeStyle: "bg-gray-100 text-gray-500",
    dark: false,
  },
];

export default function TheFuture() {
  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-3">+ THE FUTURE</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-5">
            We're just<br />getting started.
          </h2>
          <p className="text-gray-400 text-base max-w-xl mx-auto">
            Rentit is building the infrastructure that India's rental market has never had. Here's what's coming.
          </p>
        </div>

        {/* 5-col horizontal cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {features.map((f) => (
             <div
               key={f.title}
               className={`rounded-2xl p-6 flex flex-col ${f.dark ? "" : "border border-gray-100"}`}
               style={f.dark ? { backgroundColor: "#1e2d40" } : { backgroundColor: "#fff" }}
             >
               <div className="text-3xl mb-5">{f.emoji}</div>
               <h3 className={`text-sm font-bold mb-2 ${f.dark ? "text-white" : "text-gray-900"}`}>{f.title}</h3>
               <p className={`text-xs leading-relaxed mb-5 flex-1 ${f.dark ? "text-gray-300" : "text-gray-500"}`}>{f.desc}</p>
               <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full w-fit ${f.badgeStyle}`}>
                 {f.badge}
               </span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
