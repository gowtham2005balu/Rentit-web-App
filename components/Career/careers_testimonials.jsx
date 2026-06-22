export default function CareersTestimonials() {
  const testimonials = [
    {
      initials: "PD", bg: "#2d3f57", name: "Priya Deshpande", role: "Senior Product Designer · Joined 2023", location: "Bangalore",
      quote: "\"I joined Rentit as the third product designer. Within 6 months, I was leading the entire mobile experience and shipping features used by hundreds of thousands of people daily. The pace of ownership here is unlike anything I've experienced at a larger company.\"",
    },
    {
      initials: "AK", bg: "#2d3f57", name: "Arjun Krishnaswamy", role: "AI Engineer · Joined 2023", location: "Chennai",
      quote: "\"As an AI engineer, I've worked on problems at scale before — but never on something where the impact is so direct and personal. When I see someone find a room using our natural language search, I genuinely feel proud. Rentit's mission makes the hard technical problems worth solving.\"",
    },
    {
      initials: "SM", bg: "#2d3f57", name: "Sneha Mehrotra", role: "Product Manager · Joined 2022", location: "Remote · Mumbai",
      quote: "\"Coming from a larger company where decisions took weeks, Rentit's speed was initially overwhelming — then addictive. We shipped our entire flatmate discovery feature in three weeks. That's not possible at 90% of companies. The trust the leadership extends to the team is real.\"",
    },
    {
      initials: "RB", bg: "#2d3f57", name: "Rahul Banerjee", role: "Full-Stack Engineer · Joined 2023", location: "Remote · Pune",
      quote: "\"I wasn't sure if Rentit's remote-first culture would work for me. But the team communication, the async documentation culture, and the quarterly retreats have made it one of the most connected remote experiences I've had. I've learned more here in 18 months than in 4 years elsewhere.\"",
    },
  ];

  return (
    <section className="w-full font-sans" style={{ background: "#f8f9fb", paddingLeft: "120px", paddingRight: "120px", paddingTop: "80px", paddingBottom: "80px" }}>
      <div className="flex flex-col items-center text-center mb-14">
        <div className="flex items-center gap-1.5 mb-4">
          <div className="rounded-full" style={{ width: "6px", height: "6px", background: "#F59E0B" }} />
          <span className="text-[10px] font-bold tracking-widest" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>TEAM STORIES</span>
        </div>
        <h2 className="font-black mb-4" style={{ fontSize: "48px", color: "#1a2e4a", lineHeight: "1.1" }}>Heard from the people building Rentit</h2>
        <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "440px" }}>
          Don't take our word for it. Here's what our team members say about working here.
        </p>
      </div>

     <div
  className="flex gap-5 overflow-x-auto pb-4"
  style={{
    scrollBehavior: "smooth",
    scrollbarWidth: "none",
  }}
>

        {testimonials.map((t, i) => (
          <div
            key={i}
            className="flex flex-col px-8 py-7 rounded-2xl bg-white"
            style={{ border: "1px solid #e5e7eb", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",minHeight:300 }}
          >
            {/* Stars */}
            <div className="flex items-center gap-1 mb-5">
              
                <svg width="442" height="27" viewBox="0 0 442 27" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.36364 16.0114L4.06818 19.1136L5.76136 14.0682L1.45455 10.9545H6.72727L8.36364 5.90909L10 10.9545H15.2727L10.9659 14.0682L12.6591 19.1136L8.36364 16.0114ZM27.098 16.0114L22.8026 19.1136L24.4957 14.0682L20.1889 10.9545H25.4616L27.098 5.90909L28.7344 10.9545H34.0071L29.7003 14.0682L31.3935 19.1136L27.098 16.0114ZM45.8324 16.0114L41.5369 19.1136L43.2301 14.0682L38.9233 10.9545H44.196L45.8324 5.90909L47.4688 10.9545H52.7415L48.4347 14.0682L50.1278 19.1136L45.8324 16.0114ZM64.5668 16.0114L60.2713 19.1136L61.9645 14.0682L57.6577 10.9545H62.9304L64.5668 5.90909L66.2031 10.9545H71.4759L67.169 14.0682L68.8622 19.1136L64.5668 16.0114ZM83.3011 16.0114L79.0057 19.1136L80.6989 14.0682L76.392 10.9545H81.6648L83.3011 5.90909L84.9375 10.9545H90.2102L85.9034 14.0682L87.5966 19.1136L83.3011 16.0114Z" fill="#F59E0B"/>
</svg>

            
            </div>
            {/* Quote */}
            <p className="flex-1 leading-relaxed mb-6" style={{ color: "#374151", fontSize: "15px" }}>{t.quote}</p>
            {/* Author */}
            <div className="flex items-center gap-3">
              <div
                className="rounded-md flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                style={{ width: "30px", height: "30px", background: t.bg }}
              >
                {t.initials}
              </div>
              <div>
                <div className="font-bold text-sm" style={{ color: "#1a2e4a" }}>{t.name}</div>
                <div className="text-xs mb-1" style={{ color: "#9ca3af" }}>{t.role}</div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium"
                  style={{ background: "#dcfce7", color: "#16A34A" }}
                >
                  ✓ {t.location}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
