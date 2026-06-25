const articles = [
  {
    category: "Getting Started",
    categoryColor: "bg-[#F59E0B33] text-[#FCD34D]",
    title: "Complete guide to booking your first property on Rentit",
    time: "3 min read",
    views: "12.4k",
    featured: true,
  },
  {
    category: "Verification",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "How Rentit property verification works",
    time: "5 min read",
    views: "8.1k",
    featured: false,
  },
  {
    category: "Payments",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "Understanding booking fees and what you pay",
    time: "4 min read",
    views: "5.3k",
    featured: false,
  },
  {
    category: "Refunds",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "How refunds are processed and timelines",
    time: "3 min read",
    views: "6.3k",
    featured: false,
  },
  {
    category: "Communication",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "How to contact a property owner on Rentit",
    time: "2 min read",
    views: "4.0k",
    featured: false,
  },
  {
    category: "Account",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "Managing and updating your Rentit profile",
    time: "2 min read",
    views: "3.5k",
    featured: false,
  },
  {
    category: "Safety",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "Reporting suspicious or fraudulent listings",
    time: "4 min read",
    views: "5.4k",
    featured: false,
  },
  {
    category: "Owners",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "How to list your property free on Rentit",
    time: "6 min read",
    views: "1.2k",
    featured: false,
  },
  {
    category: "Analytics",
    categoryColor: "bg-[#F59E0B33] text-[#D97706]",
    title: "Understanding your listing performance metrics",
    time: "4 min read",
    views: "2.0k",
    featured: false,
  },
];

export default function PopularArticlesSection() {
  const featured = articles[0];
  const rest = articles.slice(1);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[#D97706] text-xs font-semibold uppercase tracking-widest mb-2">
              ✦ Top Reads
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
              Popular articles
            </h2>
            <p className="text-gray-500 text-sm">Most viewed support articles by Rentit users.</p>
          </div>
          <a href="#" className="text-sm text-gray-700 hover:text-orange-500 font-medium whitespace-nowrap mt-1 transition-colors">
            View all articles →
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
          {/* Featured article */}
          <div className="bg-[#2F4253] text-white rounded-xl p-6 flex flex-col justify-between min-h-48 row-span-1">
            <div>
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-4 bg-[#F59E0B33] text-white`}>
                ✦ {featured.category}
              </span>
              <h3 className="font-bold text-base leading-snug mb-4">{featured.title}</h3>
            </div>
            <div className="flex items-center gap-4 text-gray-400 text-xs">
              <span>⏱ {featured.time}</span>
              <span>👁 {featured.views} views</span>
              <span className="ml-auto">→</span>
            </div>
          </div>

          {/* Rest in 2-col grid */}
          {rest.map((article) => (
            <div
              key={article.title}
              className="border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-orange-200 cursor-pointer transition-all group"
            >
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-3 ${article.categoryColor}`}>
                {article.category}
              </span>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-4 group-hover:text-orange-500 transition-colors">
                {article.title}
              </h3>
              <div className="flex items-center gap-4 text-gray-400 text-xs">
                <span>⏱ {article.time}</span>
                <span>👁 {article.views}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
