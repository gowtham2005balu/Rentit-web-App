export default function CareersThink() {
  const principles = [
    { icon: "🎯", title: "Start with the user problem", desc: "Every decision begins with a real user need, not internal convenience." },
    { icon: "⚡", title: "Move fast, iterate faster", desc: "Ship early, gather feedback, and improve. Perfect is the enemy of shipped." },
    { icon: "🔍", title: "Obsess over quality", desc: "The details matter. Small things add up to exceptional experiences." },
    { icon: "🤝", title: "Own it, don't delegate it", desc: "Full ownership means caring about outcomes, not just outputs." },
  ];

  return (
    <section className="w-full font-sans" style={{ background: "#ffffff", paddingLeft: "120px", paddingRight: "120px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="flex gap-20 items-start">
        {/* Left */}
        <div style={{ flex: "0 0 500px" }}>
          <div className="flex items-center gap-2 mb-5">
            <div className="rounded-full" style={{ width: "8px", height: "8px", background: "#F59E0B" }} />
            <span className="text-xs font-bold tracking-widest" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>OUR PHILOSOPHY</span>
          </div>
          <h2 className="font-black mb-8" style={{ fontSize: "46px", color: "#1a2e4a", lineHeight: "1.05" }}>
            How we build <span style={{ color: "#F59E0B" }}>great products.</span>
          </h2>
          <div className="rounded-2xl overflow-hidden" style={{ height: "320px" }}>
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=80"
              alt="Team collaborating"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>

        {/* Right */}
        <div className="flex-1 pt-2">
          <p className="mb-5 leading-relaxed font-semibold" style={{ color: "#1a2e4a", fontSize: "18px" }}>
            At Rentit, we operate based on a set of core beliefs that keep us focused on what actually matters — building something exceptional for our users.
          </p>
          <p className="mb-5 leading-relaxed" style={{ color: "#6b7280", fontSize: "15px" }}>
            We believe that great products come from teams that deeply understand the problem they're solving. We spend as much time talking to renters, landlords, and property managers as we do writing code or designing screens.
          </p>
          <p className="mb-5 leading-relaxed" style={{ color: "#6b7280", fontSize: "15px" }}>
            We prefer small, focused teams that move fast and own outcomes end-to-end. We don't have endless meetings or approval chains. We trust our people to make good decisions, and we give them the context to do so.
          </p>
          <p className="mb-8 leading-relaxed" style={{ color: "#6b7280", fontSize: "15px" }}>
            Quality is non-negotiable for us. A verified listing that turns out to be fake is a broken promise. An AI match that wastes someone's time is a failure. We hold ourselves accountable to the real-world impact of everything we ship.
          </p>

          <div className="flex flex-col">
            {principles.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 py-5"
                style={{ borderTop: "1px solid #f3f4f6" }}
              >
                <div className="flex items-center justify-center rounded-xl flex-shrink-0" style={{ width: "40px", height: "40px", background: "#fffbeb" }}>
                  <span style={{ fontSize: "18px" }}>{p.icon}</span>
                </div>
                <div>
                  <div className="font-bold text-sm mb-1" style={{ color: "#1a2e4a" }}>{p.title}</div>
                  <div className="text-sm" style={{ color: "#9ca3af" }}>{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
