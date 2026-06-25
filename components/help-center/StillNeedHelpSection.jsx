export default function StillNeedHelpSection() {
  return (
    <section className="bg-gray-900 py-20 px-6 text-center relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gray-700 opacity-20 -translate-x-32 pointer-events-none" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gray-700 opacity-20 translate-x-32 pointer-events-none" />

      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
          Still need{" "}
          <span className="text-orange-400">help?</span>
        </h2>
        <p className="text-gray-400 text-sm mb-8 max-w-md mx-auto">
          Our dedicated support team is available 7 days a week to assist you with any question — big or small.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold px-6 py-3 rounded-full transition-colors">
            Contact Support →
          </button>
          <button className="border border-gray-500 text-gray-300 hover:text-white text-sm font-semibold px-6 py-3 rounded-full hover:border-gray-300 transition-colors">
            Start Live Chat
          </button>
        </div>
      </div>
    </section>
  );
}
