export default function JoinTheJourney() {
  return (
    <section
      className="font-sans py-24 px-6 text-center"
      style={{ backgroundColor: "#1e2d40" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Eyebrow pill */}
        <div className="inline-flex items-center gap-2 border border-#F59E0B4D bg-orange-400/10 text-[#F59E0B] text-xs font-bold px-4 py-1.5 rounded-full mb-8 tracking-widest uppercase">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.9875 5.4875C4.10417 5.25417 4.22917 5.02917 4.3625 4.8125C4.50417 4.5875 4.65 4.36667 4.8 4.15L4.1125 4.0625L3.0125 5.1625L3.9875 5.4875ZM9.675 2.1125C9.01667 2.12917 8.4 2.3 7.825 2.625C7.25 2.95 6.72917 3.35 6.2625 3.825C5.94583 4.14167 5.6625 4.47917 5.4125 4.8375C5.1625 5.19583 4.9375 5.575 4.7375 5.975L6.0125 7.25C6.4125 7.05 6.79167 6.825 7.15 6.575C7.50833 6.325 7.84583 6.04167 8.1625 5.725C8.6375 5.25 9.04167 4.7125 9.375 4.1125C9.71667 3.5125 9.8875 2.9125 9.8875 2.3125C9.8875 2.2875 9.87917 2.2625 9.8625 2.2375C9.85417 2.2125 9.84167 2.19167 9.825 2.175C9.80833 2.15 9.7875 2.13333 9.7625 2.125C9.7375 2.11667 9.70833 2.1125 9.675 2.1125ZM6.8625 5.1375C6.6875 4.9625 6.6 4.75 6.6 4.5C6.6 4.25 6.6875 4.0375 6.8625 3.8625C7.0375 3.6875 7.25 3.6 7.5 3.6C7.75 3.6 7.9625 3.6875 8.1375 3.8625C8.3125 4.0375 8.4 4.25 8.4 4.5C8.4 4.75 8.3125 4.9625 8.1375 5.1375C7.9625 5.3125 7.75 5.4 7.5 5.4C7.25 5.4 7.0375 5.3125 6.8625 5.1375ZM6.5125 8.0125L6.8375 8.9875L7.9375 7.8875L7.85 7.2C7.63333 7.35 7.4125 7.49583 7.1875 7.6375C6.97083 7.77083 6.74583 7.89583 6.5125 8.0125ZM10.7625 1.7125C10.8708 2.57917 10.7375 3.40417 10.3625 4.1875C9.99583 4.97083 9.5 5.675 8.875 6.3C8.83333 6.34167 8.79583 6.37917 8.7625 6.4125C8.7375 6.4375 8.70833 6.47083 8.675 6.5125L8.825 7.775C8.84167 7.91667 8.825 8.05417 8.775 8.1875C8.73333 8.32083 8.6625 8.43333 8.5625 8.525L6.9 10.1875C6.78333 10.2958 6.65 10.3375 6.5 10.3125C6.35833 10.2792 6.26667 10.1917 6.225 10.05L5.5875 8.1125L3.9 6.4125L1.95 5.75C1.80833 5.70833 1.725 5.61667 1.7 5.475C1.675 5.325 1.71667 5.19583 1.825 5.0875L3.475 3.425C3.575 3.325 3.6875 3.25417 3.8125 3.2125C3.94583 3.1625 4.08333 3.14583 4.225 3.1625L5.4875 3.325C5.52917 3.28333 5.56667 3.24583 5.6 3.2125C5.64167 3.17917 5.68333 3.14167 5.725 3.1C6.35 2.48333 7.05 1.9875 7.825 1.6125C8.6 1.2375 9.41667 1.10833 10.275 1.225C10.3417 1.23333 10.4 1.25417 10.45 1.2875C10.5083 1.32083 10.5583 1.35833 10.6 1.4C10.6417 1.44167 10.675 1.4875 10.7 1.5375C10.7333 1.5875 10.7542 1.64583 10.7625 1.7125ZM2.225 7.8625C2.48333 7.59583 2.79583 7.47083 3.1625 7.4875C3.52917 7.49583 3.84583 7.63333 4.1125 7.9C4.37083 8.15833 4.50417 8.46667 4.5125 8.825C4.52917 9.18333 4.40833 9.4875 4.15 9.7375C3.775 10.1292 3.32083 10.3833 2.7875 10.5C2.2625 10.6083 1.73333 10.7083 1.2 10.8C1.29167 10.275 1.39167 9.75 1.5 9.225C1.60833 8.69167 1.85 8.2375 2.225 7.8625ZM2.7875 8.575C2.64583 8.71667 2.55 8.88333 2.5 9.075C2.45 9.26667 2.4 9.45833 2.35 9.65C2.54167 9.6 2.72917 9.55 2.9125 9.5C3.09583 9.45 3.25833 9.35417 3.4 9.2125C3.50833 9.12083 3.56667 9.00833 3.575 8.875C3.59167 8.73333 3.55417 8.61667 3.4625 8.525C3.37083 8.43333 3.25833 8.39583 3.125 8.4125C2.99167 8.42083 2.87917 8.475 2.7875 8.575Z" fill="#F59E0B"/>
</svg>

          GET STARTED TODAY
        </div>

        <h2 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6">
          Building the future of<br />property discovery.
        </h2>
        <p className="text-gray-300 text-base leading-relaxed max-w-xl mx-auto mb-10">
          Join thousands of tenants and property owners who've already discovered a smarter, faster, broker-free way to rent.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button className="inline-flex items-center gap-2 bg-[#F59E0B] hover:bg-orange-600 text-white font-bold text-base px-7 py-3.5 rounded-full transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Explore Rentit
          </button>
          <button className="inline-flex items-center gap-2 border border-white/25 hover:border-white/50 text-white font-bold text-base px-7 py-3.5 rounded-full transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            View Careers
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
          {["Zero brokerage, always", "10,000+ verified listings", "AI-powered discovery", "Direct owner contact"].map((b) => (
             <span key={b} className="flex items-center gap-1.5">
               <svg className="w-4 h-4 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
               {b}
             </span>
           ))}
        </div>
      </div>
    </section>
  );
}
