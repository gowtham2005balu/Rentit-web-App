const storyCards = [
  {
    color: "bg-red-50",
    iconColor: "text-red-500",
    title: "Fake listings everywhere",
    desc: "Properties posted months ago, photos mismatched, units already rented. Every platform was flooded with outdated noise.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
      </svg>
    ),
  },
  {
    color: "bg-yellow-50",
    iconColor: "text-yellow-500",
    title: "Endless calls, zero response",
    desc: "Contact 20 properties, hear back from 3. The rest? Silence. Or worse — a broker demanding 2 months brokerage.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    color: "bg-gray-100",
    iconColor: "text-gray-500",
    title: "Good properties are hidden",
    desc: "The best apartments and PGs never surfaced in search. Discovery was broken. Filters were useless. Relevant wasn't reachable.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    color: "bg-green-50",
    iconColor: "text-green-500",
    title: "We decided to fix it",
    desc: "Rentit was built to solve every single one of these problems. Verified listings, AI discovery, direct owner access — a completely new rental experience.",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function OurStory() {
  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Left */}
          <div>
            <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-4">+ OUR STORY</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Why Rentit<br />started.
            </h2>
            <div className="flex flex-col gap-5 text-gray-500 text-base leading-relaxed mb-10">
              <p>
                It started with a frustrating apartment hunt. The process was broken — fake listings, unreachable owners, broker-first gatekeeping, and weeks of wasted time.
              </p>
              <p>
                We believed there had to be a better way. A way that puts the tenant and owner directly in touch — without the noise, without the friction, and without the fees.
              </p>
              <p>
                So we built Rentit. A platform where every listing is verified, every owner is reachable, and AI helps you find the right property in minutes — not weeks.
              </p>
            </div>

            {/* Quote card */}
            <div className="rounded-2xl p-7" style={{ backgroundColor: "#1e2d40" }}>
              <div className="mb-4">
  <svg
    width="19"
    height="18"
    viewBox="0 0 19 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M7.67223 0.000353813V17.6424H0.00177555V0.000353813H7.67223ZM18.7518 0.000353813V17.6424H11.0813V0.000353813H18.7518Z"
      fill="#F59E0B"
    />
  </svg>
</div>
              <p className="text-white font-bold text-base leading-relaxed mb-4">
                We don't just connect people to properties. We give them back the time, energy, and money they deserve.
              </p>
              <p className="text-gray-400 text-sm">— Rentit Founding Team</p>
            </div>
          </div>

          {/* Right — 4 story cards stacked */}
          <div className="flex flex-col gap-4">
            {storyCards.map((card) => (
              <div key={card.title} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center flex-shrink-0 ${card.iconColor}`}>
                  {card.icon}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{card.title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
