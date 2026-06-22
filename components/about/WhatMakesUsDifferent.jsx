const oldWay = [
  "Unverified, outdated listings",
  "Broker-gated owner access",
  "Keyword-only search",
  "Hidden brokerage fees",
  "No visit scheduling",
  "Outdated desktop experience",
];

const rentitWay = [
  "100% verified, real-time listings",
  "Direct owner access, zero brokerage",
  "AI natural language search",
  "Zero brokerage, always free",
  "In-app visit scheduling",
  "Modern, mobile-first experience",
];

export default function WhatMakesUsDifferent() {
  return (
    <section className="bg-gray-50 py-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-orange-500 text-xs font-bold tracking-widest uppercase mb-3">+ WHAT MAKES US DIFFERENT</p>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
            Not another<br />listing platform.
          </h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
          {/* Left — Old Way */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
            <div className="px-7 py-5 border-b border-gray-100">
              <p className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-1">TRADITIONAL PLATFORMS</p>
              <p className="text-lg font-black text-gray-800">The Old Way</p>
            </div>
            <div className="divide-y divide-gray-100">
              {oldWay.map((item) => (
                <div key={item} className="flex items-center gap-3 px-7 py-4">
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-400 line-through">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* VS badge */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex w-10 h-10 rounded-full bg-gray-200 items-center justify-center text-xs font-black text-gray-500 shadow">
            vs
          </div>

          {/* Right — Rentit Way */}
          <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#1e2d40" }}>
            <div className="px-7 py-5 border-b border-white/10">
              <p className="text-[10px] font-bold tracking-widest text-orange-400 uppercase mb-1">RENTIT PLATFORM</p>
              <p className="text-lg font-black text-white">The Rentit Way</p>
            </div>
            <div className="divide-y divide-white/10">
              {rentitWay.map((item) => (
                <div key={item} className="flex items-center gap-3 px-7 py-4">
                  <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center flex-shrink-0">
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="22" height="22" rx="11" fill="#D1FAE5"/>
<path d="M9.76771 12.5031L13.8167 8.45417C13.916 8.35486 14.0288 8.30521 14.1552 8.30521C14.2906 8.30521 14.408 8.35486 14.5073 8.45417C14.6066 8.55347 14.6563 8.67083 14.6563 8.80625C14.6563 8.93264 14.6066 9.04549 14.5073 9.14479L10.1198 13.5458C10.0205 13.6451 9.90313 13.6948 9.76771 13.6948C9.64132 13.6948 9.52847 13.6451 9.42917 13.5458L7.49271 11.6094C7.3934 11.5101 7.34375 11.3972 7.34375 11.2708C7.34375 11.1354 7.3934 11.0181 7.49271 10.9187C7.59201 10.8194 7.70486 10.7698 7.83125 10.7698C7.96667 10.7698 8.08403 10.8194 8.18333 10.9187L9.76771 12.5031Z" fill="#10B981"/>
</svg>

                  </div>
                  <span className="text-sm text-gray-100">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
