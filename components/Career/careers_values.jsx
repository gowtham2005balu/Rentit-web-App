export default function CareersValues() {
  const values = [
    { num: "01.", title: "Customers First", desc: "Everything we build starts and ends with the people who use Rentit. Their trust is our most valuable asset — and the hardest to rebuild once broken." },
    { num: "02.", title: "Build With Purpose", desc: "We don't build features for the sake of shipping. Every product decision should improve someone's ability to find a verified, affordable, suitable home." },
    { num: "03.", title: "Move Fast, Learn Faster", desc: "Speed matters in a competitive market. But intelligent speed — paired with rapid learning — is what compounds into durable advantage over time." },
    { num: "04.", title: "Ownership Matters", desc: "We act like owners, not employees. That means caring about the health of the company, the quality of your output, and the experience of your teammates." },
    { num: "05.", title: "Simplicity Wins", desc: "The best solutions are usually the simplest. Complexity is easy to add; simplicity requires discipline. We choose the latter, always." },
    { num: "06.", title: "Transparency Always", desc: "We share context openly — good news and bad. Transparency enables trust, and trust enables speed. We default to more information, not less." },
    { num: "07.", title: "Think Long-Term", desc: "We're building a platform meant to last a decade. Short-term shortcuts that create long-term debt — technical or cultural — are not acceptable here." },
    { num: "08.", title: "Continuous Learning", desc: "Markets change. Technology evolves. Users have new needs. We stay curious, invest in our people's growth, and celebrate those who embrace learning as a practice." },
    { num: "09.", title: "Raise The Bar", desc: "Every hire makes the team smarter. Every shipped feature makes the product better. We hold ourselves to high standards — and we help others reach them too." },
  ];

  return (
    <section className="w-full font-sans" style={{ background: "#0f1b2d", paddingLeft: "120px", paddingRight: "120px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-full" style={{ width: "8px", height: "8px", background: "#F59E0B" }} />
          <span className="text-xs font-bold tracking-widest" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>OUR VALUES</span>
        </div>
        <h2 className="font-black text-white mb-4" style={{ fontSize: "52px", lineHeight: "1.1" }}>How we operate every day</h2>
        <p style={{ color: "#6b839e", fontSize: "16px", maxWidth: "520px" }}>
          These aren't posters on a wall. They're the principles that guide our daily decisions and hiring choices.
        </p>
      </div>

      <div className="flex flex-col">
        {values.map((v, i) => (
          <div
            key={i}
            className="flex items-start gap-0 py-8"
            style={{ borderBottom: i < values.length - 1 ? "1px solid #1e2d45" : "none" }}
          >
            {/* Number */}
            <div style={{ minWidth: "80px" }}>
              <span className="font-bold text-sm" style={{ color: "#F59E0B" }}>{v.num}</span>
            </div>
            {/* Title */}
            <div style={{ flex: "0 0 300px" }}>
              <span className="font-bold text-white" style={{ fontSize: "16px" }}>{v.title}</span>
            </div>
            {/* Desc */}
            <div style={{ flex: 1 }}>
              <p className="text-sm leading-relaxed" style={{ color: "#6b839e" }}>{v.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
