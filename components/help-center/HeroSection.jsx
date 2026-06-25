export default function HeroSection() {
  return (
    <section className="bg-gray-900 text-white py-20 px-6 text-center relative overflow-hidden">
      {/* Background subtle shape */}
      <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-gray-700 opacity-20 translate-x-32 -translate-y-20 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-72 h-72 rounded-full bg-gray-700 opacity-10 -translate-x-24 translate-y-20 pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 text-xs bg-gray-700 text-[#FCD34D] px-3 py-1.5 rounded-full mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FCD34D] inline-block" />
          Rentit Help Center
        </span>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-3">
          How can we
        </h1>
        <h1 className="text-4xl md:text-5xl font-bold text-[#FCD34D] leading-tight mb-5">
          help you today?
        </h1>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">
          Find answers, guides, and support resources for everything Rentit — search or browse by topic below.
        </p>

        {/* Search bar */}
        <div className="relative flex items-center max-w-lg mx-auto mb-6">
          <span className="absolute left-4 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search guides, FAQs, and support articles..."
            className="w-full bg-white text-white placeholder-gray-500 text-sm pl-10 pr-14 py-3.5 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400"
          />
          <button className="absolute right-2 bg-orange-400 hover:bg-orange-500 text-white p-2 rounded-lg transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
            </svg>
          </button>
        </div>

        {/* Popular tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="text-gray-500 text-xs">Popular</span>
          {["How to book a property", "Refund process", "Verification", "Cancel reservation", "Contact owner"].map((tag) => (
            <button
              key={tag}
              className="bg-gray-800 text-gray-300 text-xs px-3 py-1.5 rounded-full border border-gray-700 hover:border-gray-500 hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
