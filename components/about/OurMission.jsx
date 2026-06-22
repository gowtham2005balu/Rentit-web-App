export default function OurMission() {
  const pillars = [
    {
      emoji: "🔍",
      title: "Simple Discovery",
      desc: "Find what you need in minutes, not weeks. AI-powered search that understands you.",
    },
    {
      emoji: "📋",
      title: "Full Transparency",
      desc: "No hidden fees. No broker surprises. Every detail upfront. What you see is exactly what you get.",
    },
    {
      emoji: "🌐",
      title: "Universal Access",
      desc: "Premium property discovery for everyone — students, families, working professionals, and businesses alike.",
    },
  ];

  return (
    <section
      className="font-sans py-20 px-6"
      style={{ backgroundColor: "#1e2d40" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-5">
          + OUR MISSION
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-7 max-w-3xl">
          To make finding and managing properties{" "}
          <span className="text-[#F59E0B]">simple, transparent,</span>{" "}
          and accessible for everyone.
        </h2>

        {/* Body */}
        <p className="text-gray-300 text-base leading-relaxed max-w-2xl mb-14">
          Whether you're a student searching for your first PG, a family relocating cities, a professional looking for a furnished apartment, or a business needing commercial space — Rentit is built for you.
        </p>

        {/* 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pillars.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-7"
              style={{ backgroundColor: "#2a3c51" }}
            >
              <div className="text-3xl mb-5">{p.emoji}</div>
              <h3 className="text-white font-bold text-base mb-2">{p.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
