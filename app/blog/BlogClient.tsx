"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import RentitNavbar from '../../components/home-new/navbar';

// ─── DATA TYPES ─────────────────────────────────────────────────────────────

interface TopicFilter {
  label: string;
  count: number;
}

interface FeaturedCollection {
  icon: string;
  label: string;
}

interface Article {
  tag: string;
  tagColor: string;
  imgUrl: string;
  bgLabel?: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  author: string;
  role?: string;
  initials: string;
  avatarColor: string;
  big?: boolean;
}

interface QuickRead {
  tag: string;
  tagColor: string;
  imgUrl: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
}

interface AlsoReadItem {
  label: string;
  color: string;
}

interface TrendingChip {
  icon: string;
  label: string;
}

interface TocItem {
  section: string;
  items: string[];
}

// ─── DATA ───────────────────────────────────────────────────────────────────

const TOPIC_FILTERS: TopicFilter[] = [
  { label: "All Stories", count: 248 },
  { label: "Renting Tips", count: 64 },
  { label: "City Guides", count: 42 },
  { label: "Student Living", count: 38 },
  { label: "Property Owners", count: 31 },
  { label: "Safety & Trust", count: 28 },
  { label: "Platform Updates", count: 19 },
  { label: "Interior Ideas", count: 15 },
  { label: "Community Stories", count: 11 },
];

const TRENDING: string[] = [
  "Security Deposit Guide: What Tenants Must Know",
  "Bangalore vs Hyderabad: Remote Worker's Rental Guide",
  "How to List Your Property on Rentit in Under 10 Minutes",
  "Student PG vs Flat: The Real Cost Comparison",
  "Red Flags When Viewing a Rental Property",
];

const FEATURED_COLLECTIONS: FeaturedCollection[] = [
  { icon: "🏙️", label: "Metro City Series" },
  { icon: "🎓", label: "Fresher's Rental Guide" },
  { icon: "🔑", label: "First-Time Renters" },
  { icon: "🏠", label: "Property Hosting 101" },
  { icon: "💛", label: "Budget Living" },
];

// Unsplash image URLs for cards
const CARD_IMAGES: Record<string, string> = {
  mumbai: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=600&q=80",
  student: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&q=80",
  safety: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
  interior: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
  owner: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  update: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&q=80",
  quick1: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=300&q=80",
  quick2: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=300&q=80",
  quick3: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=300&q=80",
  might1: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=400&q=80",
  might2: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80",
  might3: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80",
  might4: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=400&q=80",
  chennai: "/images/chennai_marina.png",
  adyar: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
};

const TOP_STORIES: Article[] = [
  {
    tag: "RENTING TIPS", tagColor: "bg-blue-500",
    imgUrl: CARD_IMAGES.mumbai,
    bgLabel: "Mumbai Rental\nMarket 2026",
    date: "June 1, 2026", readTime: "8 min read",
    title: "Everything You Need to Know About Renting in Mumbai in 2026",
    excerpt: "With rental prices shifting across micro-markets, we break down exactly what to expect — from Bandra to Navi Mumbai — with real data from 50,000+ listings.",
    author: "Riya Kapoor", role: "Senior Housing Editor", initials: "RK", avatarColor: "bg-gray-600", big: true,
  },
  {
    tag: "STUDENT LIVING", tagColor: "bg-green-600",
    imgUrl: CARD_IMAGES.student,
    bgLabel: "Student Living",
    date: "May 28, 2026", readTime: "6 min read",
    title: "The Complete PG vs Apartment Guide for College Students",
    excerpt: "Hostel life isn't for everyone. Here's a detailed breakdown to help you choose wisely before the semester starts. With rental prices shifting across micro-markets, we break down exactly what to expect — from Bandra to Navi Mumbai — with real data from 50,000+ listings. Background check tips every renter needs to know before committing...",
    author: "Aarav Singh", role: "Community Writer", initials: "AS", avatarColor: "bg-amber-500", big: false,
  },
];

const LATEST_ARTICLES: Article[] = [
  { tag: "SAFETY", tagColor: "bg-purple-500", imgUrl: CARD_IMAGES.safety, bgLabel: "Safety Guide", date: "May 30", readTime: "5 min", title: "How to Verify a Landlord Before You Sign", excerpt: "Background check tips every renter needs to know before committing...", author: "Meera Rao", initials: "MR", avatarColor: "bg-teal-500" },
  { tag: "INTERIOR", tagColor: "bg-gray-600", imgUrl: CARD_IMAGES.interior, bgLabel: "Interior Ideas", date: "May 27", readTime: "4 min", title: "Small Space, Big Impact: Rental-Friendly Decor Ideas", excerpt: "Transform even the most compact rental without damaging your deposit...", author: "Priya Kumar", initials: "PK", avatarColor: "bg-purple-500" },
  { tag: "OWNERS", tagColor: "bg-red-500", imgUrl: CARD_IMAGES.owner, bgLabel: "Property Owner", date: "May 25", readTime: "7 min", title: "Maximize Your Rental Income: A Property Owner's Playbook", excerpt: "From pricing strategy to tenant screening — a complete guide for...", author: "Vikram Nair", initials: "VN", avatarColor: "bg-slate-600" },
  { tag: "UPDATE", tagColor: "bg-green-600", imgUrl: CARD_IMAGES.update, bgLabel: "Platform Update", date: "May 22", readTime: "3 min", title: "Introducing Rentit AI Match: Find Your Home in Minutes", excerpt: "Our new intelligent matching feature learns what you love and...", author: "Rentit Team", initials: "RT", avatarColor: "bg-amber-500" },
];

const QUICK_READS: QuickRead[] = [
  { tag: "RENTING TIPS", tagColor: "bg-amber-500", imgUrl: CARD_IMAGES.quick1, title: "10 Questions to Ask at Every Property Viewing", author: "Ananya Mehta", date: "May 20, 2026", readTime: "3 min read" },
  { tag: "CITY GUIDE", tagColor: "bg-slate-700", imgUrl: CARD_IMAGES.quick2, title: "Bengaluru Neighbourhood Report: Where to Live Based on Your Work", author: "Riya Kapoor", date: "May 18, 2026", readTime: "9 min read" },
  { tag: "SAFETY", tagColor: "bg-green-600", imgUrl: CARD_IMAGES.quick3, title: "Understanding Your Rental Agreement: 7 Clauses That Matter Most", author: "Legal Team", date: "May 15, 2026", readTime: "6 min read" },
];

const MIGHT_LIKE: Article[] = [
  { tag: "RENTING TIPS", tagColor: "bg-amber-500", imgUrl: CARD_IMAGES.might1, bgLabel: "Renting Tips", date: "May 30", readTime: "8 min", title: "Security Deposits: Legal Limits and Your Full Rights", excerpt: "Everything you need to know about deposit law in India.", author: "Riya Kapoor", initials: "RK", avatarColor: "bg-pink-500" },
  { tag: "SAFETY", tagColor: "bg-red-500", imgUrl: CARD_IMAGES.might2, bgLabel: "Safety", date: "May 22", readTime: "5 min", title: "How to Verify a Landlord Before You Sign", excerpt: "Background checks, Aadhaar verif and more protection tips.", author: "Meera Rao", initials: "MR", avatarColor: "bg-green-500" },
  { tag: "INTERIOR", tagColor: "bg-blue-500", imgUrl: CARD_IMAGES.might3, bgLabel: "Interior", date: "May 20", readTime: "4 min", title: "Small Space Transformations That Won't Affect Your", excerpt: "Rental-friendly decor upgrades to sized flat or PG room.", author: "Priya Kumar", initials: "PK", avatarColor: "bg-orange-400" },
  { tag: "COMMUNITY", tagColor: "bg-green-600", imgUrl: CARD_IMAGES.might4, bgLabel: "Community", date: "May 15", readTime: "7 min", title: "12 Renters Share Their Best and Worst Housing Decisions", excerpt: "Real stories, real lessons from Rentit community of renters across India.", author: "Aarav Singh", initials: "AS", avatarColor: "bg-yellow-400" },
];

const ALSO_READ: AlsoReadItem[] = [
  { label: "Security Deposit Guide 2026", color: "bg-orange-500" },
  { label: "How to Negotiate Your Rent", color: "bg-green-600" },
  { label: "Bangalore Rental Report 2026", color: "bg-blue-500" },
  { label: "Renting Safely: 2026 Checklist", color: "bg-purple-500" },
  { label: "First-Time Renters Handbook", color: "bg-slate-700" },
  { label: "OMR Rental Pricing Guide", color: "bg-red-500" },
  { label: "Chennai Neighborhoods 2026", color: "bg-teal-600" },
];

const TRENDING_CHIPS: TrendingChip[] = [
  { icon: "🔥", label: "Security deposit guide" },
  { icon: "📋", label: "Chennai rentals 2026" },
  { icon: "📌", label: "Student PG tips" },
  { icon: "📄", label: "Rental agreement clauses" },
  { icon: "🏠", label: "Budget apartments" },
  { icon: "🔑", label: "How to list property" },
];

const TOC: TocItem[] = [
  {
    section: "The South Zone",
    items: ["Adyar — Academic Heart", "OMR — IT Corridor", "T. Nagar — Family Hub", "Velachery & Pallikaranai"],
  },
  { section: "Budget Areas to Consider", items: [] },
  { section: "What to Watch in 2026", items: [] },
  { section: "Final Verdict by Profile", items: [] },
];

// ─── FILTER HELPER ──────────────────────────────────────────────────────────

function matchesFilter(articleTag: string, activeFilter: string): boolean {
  if (activeFilter === "All Stories") return true;
  const mapping: Record<string, string> = {
    "Renting Tips": "RENTING TIPS",
    "City Guides": "CITY GUIDE",
    "Student Living": "STUDENT LIVING",
    "Property Owners": "OWNERS",
    "Safety & Trust": "SAFETY",
    "Platform Updates": "UPDATE",
    "Interior Ideas": "INTERIOR",
    "Community Stories": "COMMUNITY"
  };
  const targetTag = mapping[activeFilter] || activeFilter;
  return articleTag.toUpperCase() === targetTag.toUpperCase();
}

// ─── SMALL COMPONENTS ────────────────────────────────────────────────────────

function Tag({ label, color }: { label: string; color: string }) {
  return (
    <span className={`${color} text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full`}>
      {label}
    </span>
  );
}

function Avatar({ initials, color, size = "sm" }: { initials: string; color: string; size?: "sm" | "lg" }) {
  const s = size === "lg" ? "w-9 h-9 text-sm" : "w-7 h-7 text-xs";
  return (
    <span className={`${color} text-white font-bold ${s} rounded-full flex items-center justify-center shrink-0`}>
      {initials}
    </span>
  );
}

// ─── GLOBAL NAVBAR ────────────────────────────────────────────────────────────

function Navbar({ setArticlePage }: { setArticlePage: (val: boolean) => void }) {
  return (
    <header className="border-b border-gray-200 px-8 py-3 flex items-center justify-between sticky top-0 bg-white z-50">
      <div className="flex items-center gap-6">
        <button
          onClick={() => {
            setArticlePage(false);
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center text-xl font-extrabold tracking-tight animate-pulse"
        >
          <span className="text-amber-500">RENT</span>
          <span className="text-slate-800">IT</span>
        </button>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-slate-800 transition">
            Home
          </Link>
          <Link href="/about" className="hover:text-slate-800 transition">
            About Us
          </Link>
          <Link href="/careers" className="hover:text-slate-800 transition">
            Careers
          </Link>
          <Link href="/help" className="hover:text-slate-800 transition">
            Help Center
          </Link>
          <button
            onClick={() => {
              setArticlePage(false);
              if (typeof window !== "undefined") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="hover:text-slate-800 transition font-semibold text-slate-800 border-b-2 border-amber-500 pb-0.5"
          >
            Blog
          </button>
        </nav>
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/add-property"
          className="flex items-center gap-1.5 bg-slate-800 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-slate-700 transition"
        >
          <span className="text-amber-400 text-base leading-none">+</span> Post Your Property
        </Link>
        <Link
          href="/"
          className="border border-slate-300 text-slate-700 px-4 py-2 rounded-full text-xs font-semibold hover:bg-gray-50 transition"
        >
          Find a Home
        </Link>
      </div>
    </header>
  );
}

// ─── PILL FILTER BAR ──────────────────────────────────────────────────────────

function PillFilterBar({ active, setActive }: { active: string; setActive: (val: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2 py-3 px-8 border-b border-gray-100 bg-white sticky top-[63px] z-40">
      {TOPIC_FILTERS.map((t) => (
        <button
          key={t.label}
          onClick={() => setActive(t.label)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
            active === t.label
              ? "bg-slate-800 text-white border-slate-800"
              : "bg-white text-gray-700 border-gray-300 hover:border-gray-500"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── ARTICLE CARD ─────────────────────────────────────────────────────────────

function ArticleCard({ article, size = "normal" }: { article: Article; size?: "normal" | "large" }) {
  const imgH = size === "large" ? "h-52" : "h-40";
  return (
    <div className="flex flex-col bg-white">
      <div className={`rounded-xl flex items-center justify-center ${imgH} mb-3 relative overflow-hidden`}>
        <img
          src={article.imgUrl}
          alt={article.title}
          className="w-full h-full object-cover absolute inset-0"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            if (target.parentElement) {
              target.parentElement.style.background = "#e2e8f0";
            }
          }}
        />
        <div className="absolute top-3 left-3">
          <Tag label={article.tag} color={article.tagColor} />
        </div>
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1.5">
        <span>{article.date}</span><span>•</span><span>{article.readTime}</span>
      </div>
      <h3 className={`font-bold text-slate-800 leading-snug mb-2 ${size === "large" ? "text-lg" : "text-sm"}`}>
        {article.title}
      </h3>
      <p className="text-gray-500 text-xs leading-relaxed line-clamp-3 mb-3 flex-1">{article.excerpt}</p>
      <div className="flex items-center gap-2 mt-auto pt-1">
        <Avatar initials={article.initials} color={article.avatarColor} />
        <div>
          <p className="text-xs font-semibold text-slate-700">{article.author}</p>
          {article.role && <p className="text-[10px] text-gray-400">{article.role}</p>}
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ──────────────────────────────────────────────────────────────────

function Sidebar({ active, setActive }: { active: string; setActive: (val: string) => void }) {
  return (
    <aside className="w-48 shrink-0 sticky top-[101px] self-start h-fit pr-2">
      <div className="mb-7">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3 uppercase">Browse by Topic</p>
        <ul className="space-y-0.5">
          {TOPIC_FILTERS.map((t) => (
            <li key={t.label}>
              <button
                onClick={() => setActive(t.label)}
                className={`w-full flex justify-between items-center px-2.5 py-1.5 rounded text-sm transition-colors ${
                  active === t.label ? "bg-slate-800 text-white font-semibold" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span>{t.label}</span>
                <span className={`text-xs ${active === t.label ? "text-gray-300" : "text-gray-400"}`}>{t.count}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-7">
        <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3 uppercase">Trending This Week</p>
        <ol className="space-y-3">
          {TRENDING.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="text-xs font-bold text-gray-300 w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-xs text-gray-600 leading-snug hover:text-slate-800 cursor-pointer">{item}</p>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3 uppercase">Featured Collections</p>
        <ul className="space-y-2.5">
          {FEATURED_COLLECTIONS.map((c) => (
            <li key={c.label} className="flex items-center gap-2 text-xs text-gray-600 hover:text-slate-800 cursor-pointer">
              <span>{c.icon}</span><span>{c.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

// ─── SEARCH HERO ──────────────────────────────────────────────────────────────

function SearchHero() {
  const [query, setQuery] = useState("renting in chennai");
  return (
    <div className="bg-gray-50 py-14 px-8 text-center">
      <p className="text-xs font-bold tracking-widest text-amber-500 mb-3 uppercase">Search All Resources</p>
      <h1 className="text-5xl font-extrabold text-slate-800 mb-3 leading-tight" style={{ fontFamily: "Georgia, serif" }}>
        What are you looking for?
      </h1>
      <p className="text-gray-500 text-base mb-8">Search across 248 articles, guides, city reports, and platform updates</p>
      <div className="max-w-2xl mx-auto flex rounded-xl border border-gray-300 bg-white overflow-hidden shadow-sm">
        <span className="pl-4 flex items-center text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 px-3 py-3.5 text-base outline-none text-gray-700"
        />
        <button className="bg-slate-800 text-white px-6 text-sm font-semibold hover:bg-slate-700 transition-colors rounded-r-xl">
          Search
        </button>
      </div>
      <div className="flex flex-wrap justify-center gap-2 mt-5">
        <span className="text-sm text-gray-500">Trending:</span>
        {TRENDING_CHIPS.map((c) => (
          <button key={c.label} className="flex items-center gap-1 px-3 py-1 rounded-full border border-gray-200 bg-white text-sm text-gray-600 hover:border-gray-400 transition">
            <span>{c.icon}</span> {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── FEATURED HERO (Chennai) ──────────────────────────────────────────────────

function FeaturedHero({ onReadGuide }: { onReadGuide: () => void }) {
  return (
    <div className="flex min-h-[320px] w-full" style={{ overflow: "hidden" }}>
      {/* Left text */}
      <div className="bg-slate-700 w-1/2 p-10 flex flex-col justify-between relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-slate-600 rounded-full translate-x-12 -translate-y-10 opacity-50" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <span className="bg-amber-500 text-white text-[10px] font-bold tracking-wider px-2.5 py-1 rounded">CITY GUIDE</span>
            <span className="text-gray-400 text-sm">June 3, 2026</span>
          </div>
          <h2 className="text-white text-3xl font-extrabold leading-tight mb-4" style={{ fontFamily: "Georgia, serif" }}>
            Chennai's Best <em className="not-italic text-amber-400 italic">Neighbourhoods</em> for Renters in 2026
          </h2>
          <p className="text-gray-300 text-sm max-w-sm leading-relaxed">
            From the bustling streets of T. Nagar to the tech corridors of OMR — a complete insider guide to finding your perfect home in India's coastal metro.
          </p>
        </div>
        <div className="flex items-center gap-4 mt-8 relative z-10">
          <button
            onClick={onReadGuide}
            className="bg-amber-500 hover:bg-amber-400 text-white font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors animate-bounce"
          >
            Read the Guide →
          </button>
          <span className="text-gray-400 text-sm">12 min read</span>
        </div>
      </div>
      {/* Right image — real photo */}
      <div className="w-1/2 relative overflow-hidden">
        <img
          src={CARD_IMAGES.chennai}
          alt="Marina Beach, Chennai"
          className="w-full h-full object-cover absolute inset-0"
        />
        <div className="absolute inset-0 bg-amber-900/20" />
        <div className="absolute bottom-4 right-4 bg-white/90 text-slate-800 text-xs px-3 py-1.5 rounded-full flex items-center gap-1 shadow z-10">
          📍 Marina Beach, Chennai
        </div>
      </div>
    </div>
  );
}

// ─── BLOG PAGE ────────────────────────────────────────────────────────────────

function BlogPage({
  active,
  setActive,
  onReadGuide,
}: {
  active: string;
  setActive: (val: string) => void;
  onReadGuide: () => void;
}) {
  const alsoReadRef = useRef<HTMLDivElement>(null);

  // Filter content dynamically based on active filter tab
  const filteredTop = TOP_STORIES.filter((s) => matchesFilter(s.tag, active));
  const filteredLatest = LATEST_ARTICLES.filter((a) => matchesFilter(a.tag, active));
  const filteredQuick = QUICK_READS.filter((q) => matchesFilter(q.tag, active));
  const filteredMight = MIGHT_LIKE.filter((m) => matchesFilter(m.tag, active));

  const hasAnyArticles =
    filteredTop.length > 0 ||
    filteredLatest.length > 0 ||
    filteredQuick.length > 0 ||
    filteredMight.length > 0;

  return (
    <div className="flex gap-0 w-full px-8 py-8">
      <Sidebar active={active} setActive={setActive} />

      <main className="flex-1 min-w-0 pl-8">
        {!hasAnyArticles ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-400 text-4xl mb-3">🔍</p>
            <h3 className="text-lg font-bold text-slate-800 mb-1">No stories found</h3>
            <p className="text-gray-500 text-sm">We couldn't find any articles under the "{active}" category.</p>
            <button
              onClick={() => setActive("All Stories")}
              className="mt-4 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold rounded-lg transition"
            >
              Browse All Stories
            </button>
          </div>
        ) : (
          <>
            {/* Top Stories */}
            {filteredTop.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-extrabold text-slate-800">Top Stories</h2>
                  <a href="#" className="text-amber-500 text-sm font-medium hover:underline">
                    View all →
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredTop.map((article, idx) => (
                    <ArticleCard key={idx} article={article} size={idx === 0 ? "large" : "normal"} />
                  ))}
                </div>
              </section>
            )}

            {/* Latest Articles */}
            {filteredLatest.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-extrabold text-slate-800">Latest Articles</h2>
                  <a href="#" className="text-amber-500 text-sm font-medium hover:underline">
                    View all →
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredLatest.map((a, i) => (
                    <ArticleCard key={i} article={a} />
                  ))}
                </div>
              </section>
            )}

            {/* Quick Reads */}
            {filteredQuick.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-xl font-extrabold text-slate-800">Quick Reads</h2>
                  <a href="#" className="text-amber-500 text-sm font-medium hover:underline">
                    View all →
                  </a>
                </div>
                <div className="space-y-4">
                  {filteredQuick.map((a, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-20 h-14 rounded-lg shrink-0 overflow-hidden relative">
                        <img src={a.imgUrl} alt={a.title} className="w-full h-full object-cover absolute inset-0" />
                      </div>
                      <div>
                        <div className="mb-1.5">
                          <Tag label={a.tag} color={a.tagColor} />
                        </div>
                        <p className="text-sm font-semibold text-slate-800 leading-snug">{a.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {a.author} · {a.date} · {a.readTime}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* You Might Also Like */}
            {filteredMight.length > 0 && (
              <section className="mb-10">
                <div className="flex items-center justify-between mb-1">
                  <h2 className="text-xl font-extrabold text-slate-800">You Might Also Like</h2>
                  <a href="#" className="text-amber-500 text-sm font-medium hover:underline">
                    Browse all articles →
                  </a>
                </div>
                <p className="text-xs text-gray-400 mb-5">Selected based on what you've been reading</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredMight.map((a, i) => (
                    <ArticleCard key={i} article={a} />
                  ))}
                </div>
              </section>
            )}

            {/* Also Read — horizontally scrollable */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-400 tracking-widest uppercase shrink-0">
                  Also Read
                </span>
                <div
                  ref={alsoReadRef}
                  className="flex items-center gap-3 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                  {ALSO_READ.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 shrink-0 cursor-pointer group">
                      <div className={`${a.color} w-6 h-6 rounded shrink-0`} />
                      <span className="text-xs text-gray-600 group-hover:text-slate-800 transition whitespace-nowrap">
                        {a.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

// ─── ARTICLE PAGE ─────────────────────────────────────────────────────────────

function ArticlePage({ onBack }: { onBack: () => void }) {
  const [activeSection, setActiveSection] = useState("The South Zone");
  const [email, setEmail] = useState("");

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="max-w-5xl mx-auto px-8 pt-5 pb-2 flex items-center gap-2 text-xs text-gray-400">
        <button onClick={onBack} className="hover:text-amber-500 transition">
          City Guides
        </button>
        <span>›</span>
        <span className="text-gray-500">Chennai Neighbourhood Guide</span>
      </div>

      {/* Article Header */}
      <div className="max-w-5xl mx-auto px-8 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <Tag label="CITY GUIDE" color="bg-amber-500" />
          <span className="text-xs text-gray-400">Published June 3, 2026</span>
        </div>
        <h1
          className="text-4xl font-extrabold text-slate-800 leading-tight mb-4 max-w-2xl"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Chennai's Best Neighbourhoods for Renters in 2026
        </h1>
        <p className="text-gray-500 text-base max-w-xl leading-relaxed mb-5">
          A deep dive into the city's rental micro-markets — from student-friendly Adyar to the IT corridors of OMR —
          to help you find where you truly belong.
        </p>

        {/* Sticky Author Bar */}
        <div className="sticky top-16 z-50 bg-white py-4 mb-6 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Avatar initials="RK" color="bg-gray-600" size="lg" />
              <div>
                <p className="text-sm font-bold text-slate-800">Riya Kapoor</p>
                <p className="text-xs text-gray-400">Senior Housing Editor, Rentit</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <span>⏱ 12 min read</span>
              <span>📅 June 3, 2026</span>
              <span>👁 8,491 reads</span>
              <div className="flex items-center gap-1">
                <span>Share</span>
                <button className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs">
                  ‹
                </button>
                <button className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center text-gray-500 hover:bg-gray-200 text-xs">
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero image — real photo */}
      <div className="max-w-5xl mx-auto px-8 mb-8">
        <div className="h-72 rounded-xl relative overflow-hidden">
          <img src={CARD_IMAGES.chennai} alt="Chennai Cityscape" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          <div className="absolute bottom-3 left-4 text-xs text-white/70">Chennai's coastline at dusk · Unsplash</div>
        </div>
      </div>

      {/* Content layout */}
      <div className="max-w-5xl mx-auto px-8 pb-8 flex gap-8">
        {/* ── LEFT SHARE COLUMN ── */}
        <div className="hidden md:flex flex-col items-center gap-3 pt-1 w-10 shrink-0">
          <span
            className="text-[9px] font-bold tracking-widest text-gray-400 uppercase rotate-[-90deg] mb-4 whitespace-nowrap origin-center"
            style={{ marginTop: "32px", marginBottom: "20px" }}
          >
            SHARE
          </span>
          {/* LinkedIn */}
          <button
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-600 hover:bg-blue-50 transition group"
            title="Share on LinkedIn"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </button>
          {/* X / Twitter */}
          <button
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-slate-800 hover:bg-slate-50 transition group"
            title="Share on X"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-slate-800" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>
          {/* Facebook */}
          <button
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-blue-500 hover:bg-blue-50 transition group"
            title="Share on Facebook"
          >
            <svg className="w-4 h-4 text-gray-400 group-hover:text-blue-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </button>
          {/* Copy link */}
          <button
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-amber-500 hover:bg-amber-50 transition group"
            title="Copy link"
          >
            <svg
              className="w-4 h-4 text-gray-400 group-hover:text-amber-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
            </svg>
          </button>
          {/* Divider */}
          <div className="w-px h-16 bg-gray-200 mt-2" />
          {/* Reading progress dots */}
          {["S", "A", "O", "T"].map((_, i) => (
            <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-amber-500" : "bg-gray-200"}`} />
          ))}
        </div>

        {/* Main article content */}
        <article className="flex-1 min-w-0">
          {/* Key Takeaways */}
          <div className="border border-amber-200 bg-amber-50 rounded-xl p-5 mb-8">
            <p className="text-[10px] font-bold tracking-widest text-amber-600 mb-3 uppercase">Key Takeaways</p>
            <ul className="space-y-2">
              {[
                "OMR and Perungudi offer the best value for IT professionals, with average rents between ₹18,000–₹30,000/month.",
                "Adyar and Velachery remain top picks for students and young professionals due to metro connectivity.",
                "T. Nagar's retail accessibility makes it ideal for families despite higher price points.",
                "Rental prices across Chennai rose 11% YoY with demand highest in South and Central zones.",
              ].map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-700">
                  <span className="text-amber-500 mt-0.5 shrink-0">•</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Intro */}
          <p className="text-gray-700 text-base leading-relaxed mb-6">
            Chennai is one of India's most underrated rental markets. Unlike Delhi or Bangalore, the city offers a rare
            combination of affordability, cultural richness, and infrastructure quality — but only if you know exactly where to
            look. In this guide, we've analysed over 85,000 active listings on Rentit to bring you the most accurate
            neighbourhood-by-neighbourhood breakdown available.
          </p>

          {/* Section heading */}
          <h2 className="text-xl font-extrabold text-slate-800 mb-3">
            The South Zone: Where Affordability Meets Connectivity
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            The areas stretching from Adyar to OMR represent Chennai's most dynamic rental corridor. Technology parks have
            fundamentally transformed the fabric of this region over the past decade, driving demand for both premium and mid-range
            housing in equal measure.
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { value: "₹22K", label: "Avg. monthly rent in South Chennai" },
              { value: "11%", label: "Rental price increase YoY" },
              { value: "48H", label: "Average listing fills in South Zone" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-extrabold text-amber-500">{s.value}</p>
                <p className="text-[10px] text-gray-400 mt-1 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Sub-section: Adyar */}
          <h3 className="text-lg font-extrabold text-slate-800 mb-2">Adyar — The Academic Heart</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            Adyar's proximity to IIT Madras, Anna University, and several reputable schools makes it perennially popular among
            academics, researchers, and families with school-going children. The neighbourhood strikes a careful balance between
            urban convenience and tree-lined calm.
          </p>

          {/* Quote block */}
          <div className="bg-slate-800 rounded-xl p-6 mb-5 relative">
            <span className="text-amber-400 text-5xl font-serif absolute top-2 left-5 leading-none">"</span>
            <p className="text-white text-base italic leading-relaxed mt-5">
              Living in Adyar meant I could walk to the university, cycle to the beach, and still be at a decent restaurant by
              evening. No other neighbourhood gives you that trinity.
            </p>
            <p className="text-gray-400 text-xs mt-3">— Kavitha Ramamoorthy, PhD Student, IIT Madras</p>
          </div>

          {/* Pro tip */}
          <div className="border-l-4 border-amber-400 bg-amber-50 rounded-r-lg p-4 mb-6">
            <p className="text-xs font-bold text-amber-700 mb-1">🏠 Pro Tip for Adyar Renters</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Target side streets off 2nd Main Road and 6th Cross Street for better-priced flats with less negotiation pressure.
              Avoid main arterial roads if noise is a concern — traffic peaks around 8–10am daily.
            </p>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Rental prices in Adyar typically range from ₹18,000 for a 1BHK to ₹45,000 for a 3BHK in a semi-furnished condition.
            Older independent houses often represent better value than apartments in new buildings, particularly if you're
            comfortable with aging fixtures.
          </p>

          {/* Adyar real image */}
          <div className="rounded-xl h-48 overflow-hidden mb-2 relative">
            <img src={CARD_IMAGES.adyar} alt="Adyar neighbourhood" className="w-full h-full object-cover absolute inset-0" />
          </div>
          <p className="text-xs text-gray-400 mb-8 text-center">
            A street intersection in Adyar · Rentit has 1,400+ listings in this micro-cluster
          </p>

          {/* OMR */}
          <h3 className="text-lg font-extrabold text-slate-800 mb-2">OMR — The IT Corridor</h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            Old Mahabalipuram Road, commonly called OMR, stretches for over 45km and houses some of India's largest tech parks.
            For IT professionals, this is ground zero — but choosing the right stretch of OMR is absolutely critical to your quality
            of life.
          </p>

          {/* Author card */}
          <div className="border border-gray-200 rounded-xl p-5 mb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <Avatar initials="RK" color="bg-gray-600" size="lg" />
                <div>
                  <p className="text-sm font-bold text-slate-800">Riya Kapoor</p>
                  <p className="text-xs text-amber-500">rentit.in/authors/riya</p>
                </div>
              </div>
              <button className="border border-gray-300 text-slate-700 text-xs px-4 py-1.5 rounded-lg hover:bg-gray-50 transition">
                Follow Author
              </button>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed mt-4">
              Riya has been writing about India's rental markets for 7 years. She has personally lived in Chennai, Bangalore, and
              Hyderabad, and brings deeply researched, first-hand insight to every piece she writes. Her work is trusted by over
              300,000 monthly readers on Rentit.
            </p>
          </div>
        </article>

        {/* Right TOC — sticky */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-24">
            <p className="text-[10px] font-bold tracking-widest text-gray-400 mb-3 uppercase">Table of Contents</p>
            <ul className="space-y-1">
              {TOC.map((item) => (
                <li key={item.section}>
                  <button
                    onClick={() => setActiveSection(item.section)}
                    className={`text-xs text-left w-full py-1 transition-colors ${
                      activeSection === item.section ? "text-amber-500 font-semibold" : "text-gray-500 hover:text-slate-800"
                    }`}
                  >
                    {item.section}
                  </button>
                  {item.items.map((sub) => (
                    <p
                      key={sub}
                      className="text-[11px] text-gray-400 pl-3 py-0.5 hover:text-slate-700 cursor-pointer leading-tight"
                    >
                      {sub}
                    </p>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      {/* Newsletter CTA */}
      <div className="max-w-5xl mx-auto px-8 pb-10">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] font-bold tracking-widest text-amber-600 mb-1 uppercase">Get Weekly</p>
            <h3 className="text-lg font-extrabold text-slate-800 mb-1">Rental Insights</h3>
            <p className="text-xs text-gray-500 max-w-xs leading-relaxed">
              Market updates, verified listings, and expert tips delivered to your inbox every Thursday.
            </p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 md:w-52 outline-none focus:border-amber-400"
            />
            <button className="bg-amber-500 hover:bg-amber-400 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-5xl mx-auto px-8 pb-8">
        <button onClick={onBack} className="flex items-center gap-2 text-sm text-gray-500 hover:text-slate-800 transition">
          ← Back to City Guides
        </button>
      </div>
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

export default function BlogClient() {
  const [active, setActive] = useState("All Stories");
  const [articlePage, setArticlePage] = useState(false);

  const handleReadGuide = () => {
    setArticlePage(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    setArticlePage(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans pb-10">
      <RentitNavbar />
      {articlePage ? (
        <ArticlePage onBack={handleBack} />
      ) : (
        <>
          <PillFilterBar active={active} setActive={setActive} />
          <SearchHero />
          <FeaturedHero onReadGuide={handleReadGuide} />
          <div className="border-t border-gray-200" />
          <BlogPage active={active} setActive={setActive} onReadGuide={handleReadGuide} />
        </>
      )}
    </div>
  );
}
