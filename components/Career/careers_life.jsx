export default function CareersLife() {
  const photos = [
    { label: "Weekly product discussions", img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&q=80", small: true },
    { label: "Quarterly team offsite", img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80", small: true },
    { label: "Remote-first team setup", img: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&q=80", small: true },
    { label: "Friday learning sessions", img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=80", small: true },
  ];

  return (
    <section className="w-full font-sans" style={{ background: "#0f1b2d", paddingLeft: "120px", paddingRight: "120px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="flex flex-col items-center text-center mb-14">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-full" style={{ width: "8px", height: "8px", background: "#F59E0B" }} />
          <span className="text-xs font-bold tracking-widest" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>LIFE AT RENTIT</span>
        </div>
        <h2 className="font-black text-white mb-4" style={{ fontSize: "52px", lineHeight: "1.1" }}>Where work feels like craft</h2>
        <p style={{ color: "#6b839e", fontSize: "16px", maxWidth: "480px" }}>
          We build together, learn constantly, and celebrate the small wins as much as the big milestones.
        </p>
      </div>

      {/* Photo grid */}
      <div className="flex gap-3" style={{ height: "500px" }}>
        {/* Large left photo */}
        <div className="relative rounded-2xl overflow-hidden flex-shrink-0" style={{ width: "480px" }}>
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80"
            alt="Team design reviews"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
            <span className="text-white text-sm font-medium">Team design reviews, Chennai office</span>
          </div>
        </div>

        {/* Right 2x2 grid */}
        <div className="grid flex-1" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "12px" }}>
          {photos.map((p, i) => (
            <div key={i} className="relative rounded-2xl overflow-hidden">
              <img src={p.img} alt={p.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div className="absolute bottom-0 left-0 right-0 px-3 py-2" style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.6))" }}>
                <span className="text-white text-xs font-medium">{p.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
