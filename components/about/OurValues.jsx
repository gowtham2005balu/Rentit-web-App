const values = [
  {
    num: "01",
    emoji: "📋",
    title: "Transparency",
    desc: "No hidden fees. No surprises. Full information — pricing, availability, ownership — upfront and honest, always.",
    bg: "#2a3c51",
    dark: true,
  },
  {
    num: "02",
    emoji: "🤝",
    title: "Trust",
    desc: "Every listing is verified. Every owner is accountable. We build trust into every interaction on our platform.",
    bg: "#f5a623",
    dark: false,
  },
  {
    num: "03",
    emoji: "⚡",
    title: "Innovation",
    desc: "We use AI, intelligent search, and modern design to solve real problems that have existed in India's rental market for decades.",
    bg: "#f5f5f7",
    dark: false,
    border: true,
  },
  {
    num: "04",
    emoji: "❤️",
    title: "Customer First",
    desc: "Every feature, every decision, every product improvement starts with one question: does this make life better for our users?",
    bg: "#2ecc71",
    dark: false,
  },
  {
    num: "05",
    emoji: "✨",
    title: "Simplicity",
    desc: "Complexity is the enemy of action. We design every experience to be as simple as telling a friend what you're looking for.",
    bg: "#ffffff",
    dark: false,
    border: true,
  },
  {
    num: "06",
    emoji: "🚀",
    title: "Growth",
    desc: "We grow with our users. Every new feature, every new city, every new capability is driven by how we can serve more people better.",
    bg: "#1e2d40",
    dark: true,
  },
];

export default function OurValues() {
  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-3">+ OUR VALUES</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            The principles<br />that guide us.
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {values.map((v) => (
             <div
               key={v.title}
               className={`relative rounded-2xl p-8 overflow-hidden ${v.border ? "border border-gray-200" : ""}`}
               style={{ backgroundColor: v.bg }}
             >
               <span className={`absolute top-5 right-6 text-6xl font-black select-none leading-none ${v.dark ? "text-white/10" : v.bg === "#f5a623" ? "text-white/20" : v.bg === "#2ecc71" ? "text-white/20" : "text-gray-100"}`}>
                 {v.num}
               </span>
               <div className="text-3xl mb-6">{v.emoji}</div>
               <h3 className={`text-lg font-black mb-3 ${v.dark || v.bg === "#f5a623" || v.bg === "#2ecc71" ? "text-white" : "text-gray-900"}`}>
                 {v.title}
               </h3>
               <p className={`text-sm leading-relaxed ${v.dark ? "text-gray-300" : v.bg === "#f5a623" || v.bg === "#2ecc71" ? "text-white/80" : "text-gray-500"}`}>
                 {v.desc}
               </p>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
