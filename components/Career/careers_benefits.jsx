export default function CareersBenefits() {
  const benefits = [
    { icon: "💰", title: "Competitive Compensation", desc: "Market-rate salaries benchmarked against top Indian tech companies, plus meaningful equity that reflects your contribution to Rentit's growth." },
    { icon: "🌐", title: "Remote Flexibility", desc: "Work from anywhere in India. We're remote-first with optional office spaces in Chennai and Bangalore. Async-friendly culture with synchronous moments that matter." },
    { icon: "📚", title: "Learning Budget", desc: "₹60,000 per year for courses, books, conferences, and certifications. We invest in your growth because your growth is Rentit's growth." },
    { icon: "📈", title: "Career Growth", desc: "Clear progression frameworks, quarterly reviews, and real ownership of product areas. You'll grow as Rentit grows — and we're growing fast." },
    { icon: "🏥", title: "Health Benefits", desc: "Comprehensive health insurance covering you and your immediate family. Mental health support through our partnered wellness platform, available from day one." },
    { icon: "⭐", title: "Performance Rewards", desc: "Annual performance bonuses tied to individual and company milestones. We celebrate and reward the people who drive outcomes." },
    { icon: "✈️", title: "Team Retreats", desc: "Two company retreats per year — one focused on strategy and one focused on celebration. Real connection built beyond the screen." },
    { icon: "🎯", title: "Mentorship", desc: "Structured mentorship from senior team members and access to an external advisor network spanning product, engineering, and design leaders across India." },
    { icon: "💻", title: "Modern Equipment", desc: "MacBook Pro, high-quality monitor, ergonomic setup, and any peripherals you need to do your best work. Your setup should never be the bottleneck." },
    { icon: "⚖️", title: "Work-Life Balance", desc: "Unlimited paid time off, flexible hours, and a culture that respects evenings and weekends. We're intense about our work, not about being always-on." },
  ];

  return (
    <section className="w-full font-sans" style={{ background: "#f8f9fb", paddingLeft: "120px", paddingRight: "120px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="flex flex-col items-center text-center mb-14">
        <div className="flex items-center gap-1.5 mb-4">
          <div className="rounded-full" style={{ width: "6px", height: "6px", background: "#F59E0B" }} />
          <span className="text-[10px] font-bold tracking-widest" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>BENEFITS & PERKS</span>
        </div>
        <h2 className="font-black mb-4" style={{ fontSize: "52px", color: "#1a2e4a", lineHeight: "1.1" }}>We take care of our people</h2>
        <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "420px" }}>
          Great work requires great support. Here's what we offer every Rentit team member.
        </p>
      </div>

      {/* Benefits table */}
      <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e5e7eb", background: "#ffffff", maxWidth: "860px", margin: "0 auto" }}>
        {/* Table header */}
        <div className="grid px-6 py-4" style={{ gridTemplateColumns: "280px 1fr", background: "#f8f9fb", borderBottom: "1px solid #e5e7eb" }}>
          <span className="text-xs font-bold tracking-widest" style={{ color: "#9ca3af", letterSpacing: "0.1em" }}>BENEFIT</span>
          <span className="text-xs font-bold tracking-widest" style={{ color: "#9ca3af", letterSpacing: "0.1em" }}>WHAT IT MEANS AT RENTIT</span>
        </div>
        {/* Rows */}
        {benefits.map((b, i) => (
          <div
            key={i}
            className="grid px-6 py-5 items-center"
            style={{ gridTemplateColumns: "280px 1fr", borderBottom: i < benefits.length - 1 ? "1px solid #f3f4f6" : "none" }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: "36px", height: "36px", background: "#fffbeb" }}>
                <span style={{ fontSize: "18px" }}>{b.icon}</span>
              </div>
              <span className="font-bold text-sm" style={{ color: "#1a2e4a" }}>{b.title}</span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
