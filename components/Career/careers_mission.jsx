export default function CareersMission() {
  return (
    <section
      className="w-full flex items-center font-sans"
      style={{ background: "#0f1b2d", minHeight: "520px", paddingLeft: "120px", paddingRight: "120px", paddingTop: "100px", paddingBottom: "100px" }}
    >
      {/* Left */}
      <div style={{ flex: "0 0 46%", paddingRight: "80px",marginTop: "-200px" }}>
        <h2 className="font-black text-white" style={{ fontSize: "62px", lineHeight: "1.05", letterSpacing: "-1.5px", }}>
          Helping millions find a place to{" "}
          <span style={{ color: "#F59E0B" }}>call home.</span>
        </h2>
      </div>

      {/* Right */}
      <div style={{ flex: "1" }}>
        <p className="mb-5 leading-relaxed" style={{ color: "#8fa3bf", fontSize: "16px" }}>
          The rental market is broken. We believe finding a home should be simple, trusted, and human — not filled with fake listings, broker chaos, and endless friction.
        </p>
        <p className="mb-5 leading-relaxed" style={{ color: "#8fa3bf", fontSize: "16px" }}>
          Rentit was built from a real frustration: talented people spending weeks — sometimes months — finding a verified room to live in. Students relocating to cities, professionals starting new jobs, families moving across states. Every single one of them deserved better.
        </p>
        <p className="mb-5 leading-relaxed" style={{ color: "#8fa3bf", fontSize: "16px" }}>
          So we built an AI-powered platform that understands what you need in plain language, surfaces verified properties instantly, and connects you directly with owners. No brokers. No fake listings. No wasted time.
        </p>
        <p className="mb-7 leading-relaxed" style={{ color: "#8fa3bf", fontSize: "16px" }}>
          Today, Rentit operates in 50+ cities across India, with over 10,000 verified listings and a team that's deeply committed to making the renting experience exceptional. We're just getting started — and we're looking for people who want to build alongside us.
        </p>
        <a href="#open-roles" className="font-semibold text-sm transition-colors hover:text-orange-400" style={{ color: "#F59E0B", borderBottom: "1.5px solid #F59E0B", paddingBottom: "2px", textDecoration: "none" }}>
          See open roles →
        </a>
      </div>
    </section>
  );
}
