export default function CareersWhy() {
  const cards = [
    {
      num: "01",
      img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80",
      title: "Build Products That Matter",
      desc: "Every line of code, every design decision, every data model you build directly helps someone find their next home. Your work has immediate, visible impact on real lives.",
    },
    {
      num: "02",
      img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80",
      title: "Work With Talented People",
      desc: "We hire for craft and character. You'll work with engineers, designers, and operators who care deeply about the quality of their work and hold each other to high standards.",
    },
    {
      num: "03",
      img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&q=80",
      title: "Solve Real Problems",
      desc: "Fake listings. Broker middlemen. Outdated photos. No owner responses. We exist to fix every single one of these pain points. The problems are hard, the solutions are meaningful.",
    },
    {
      num: "04",
      img: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&q=80",
      title: "Shape The Future Of Renting",
      desc: "AI, verified data, direct connections — we're building infrastructure that will define how accommodation discovery works for the next decade across India and beyond.",
    },
    {
      num: "05",
      img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=80",
      title: "Grow Faster Than You Thought Possible",
      desc: "Early-stage means wearing multiple hats, owning outcomes, and compressing 3 years of learning into 12 months. If you want to accelerate, Rentit is the place to do it.",
    },
    {
      num: "06",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&q=80",
      title: "Make A Meaningful Impact",
      desc: "Accommodation is not a luxury — it's a necessity. When Rentit works, a student finds a safe place to live near their college. A family relocates with confidence. That's worth building for.",
    },
  ];

  return (
    <section className="w-full font-sans" style={{ background: "#ffffff", paddingLeft: "120px", paddingRight: "120px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="flex flex-col items-center text-center mb-14">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-full" style={{ width: "8px", height: "8px", background: "#F59E0B" }} />
          <span className="text-xs font-bold tracking-widest" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>WHY RENTIT</span>
        </div>
        <h2 className="font-black mb-4" style={{ fontSize: "52px", color: "#1a2e4a", lineHeight: "1.1" }}>Six reasons to build here</h2>
        <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "560px" }}>
          This isn't just a job. It's an opportunity to solve one of the most fundamental human needs — a place to live.
        </p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", border: "1px solid #e5e7eb", borderRadius: "16px", overflow: "hidden" }}>
        {cards.map((card, i) => {
          const col = i % 3;
          const row = Math.floor(i / 3);
          const borderRight = col < 2 ? "1px solid #e5e7eb" : "none";
          const borderBottom = row < 1 ? "1px solid #e5e7eb" : "none";
          return (
            <div key={i} className="flex flex-col p-6 bg-white" style={{ borderRight, borderBottom, position: "relative" }}>
              {/* Number watermark */}
              <div className="absolute top-4 right-5 font-black" style={{ fontSize: "48px", color: "#f3f4f6", lineHeight: "1" }}>0{i+1}</div>
              {/* Image */}
              <div className="rounded-xl overflow-hidden mb-5" style={{ height: "160px" }}>
                <img src={card.img} alt={card.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="font-bold mb-2" style={{ fontSize: "15px", color: "#1a2e4a" }}>{card.title}</div>
              <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>{card.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
