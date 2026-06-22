const timeline = [
  {
    year: "2023",
    dotColor: "bg-teal-400",
    title: "Rentit Founded",
    desc: "Launched with verified listings in Chennai. First 500 users found homes without brokerage.",
    active: true,
  },
  {
    year: "2024",
    dotColor: "bg-teal-400",
    title: "AI Search + Direct Messaging",
    desc: "Launched AI property discovery and real-time owner messaging. Crossed 2,500 verified owners.",
    active: true,
  },
  {
    year: "2025",
    dotColor: "bg-[#F59E0B]",
    title: "Premium Plans + New Cities",
    desc: "Launched Premium owner tools across 50+ cities. Building India's most complete rental data layer.",
    active: true,
  },
  {
    year: "2026+",
    dotColor: "bg-gray-300",
    title: "National Scale",
    desc: "Expanding to every major city in India. The default platform for finding any rental property, anywhere.",
    active: false,
  },
];

export default function OurVision() {
  return (
    <section className="bg-white py-20 px-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="text-[#F59E0B] text-xs font-bold tracking-widest uppercase mb-4">+ OUR VISION</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-7">
              To become the most trusted property discovery platform in{" "}
              <span className="text-[#F59E0B]">India.</span>
            </h2>
            <div className="flex flex-col gap-5 text-gray-500 text-base leading-relaxed mb-10">
              <p>
                We're building more than a listing platform. We're building the infrastructure of trust that India's rental market has always needed.
              </p>
              <p>
                A future where every Indian can find their perfect home — efficiently, confidently, and without the stress that defines the search today.
              </p>
            </div>
            <button className="inline-flex items-center gap-2 bg-gray-900 text-white font-bold text-sm px-6 py-3 rounded-full hover:bg-gray-700 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              Join the journey
            </button>
          </div>

          {/* Right — timeline */}
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
               <div key={item.year} className={`flex gap-5 ${i < timeline.length - 1 ? "pb-8" : ""}`}>
                 {/* Dot + line */}
                 <div className="flex flex-col items-center">
                   <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 ${item.dotColor}`}></div>
                 
                 </div>
                 {/* Content */}
                 <div className={`pb-1 ${i < timeline.length - 1 ? "border-b border-gray-100 w-full" : "w-full"}`}>
                   <p className={`text-xs font-bold tracking-widest mb-1 ${item.active ? "text-[#F59E0B]" : "text-gray-400"}`}>
                     {item.year}
                   </p>
                   <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                   <p className="text-sm text-gray-500 leading-relaxed pb-5">{item.desc}</p>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>
    </section>
  );
}
