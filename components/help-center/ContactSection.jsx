import { useState } from "react";

const contactOptions = [
  {
    icon: "💬",
    badge: "Online Now",
    badgeDot: "bg-green-500",
    badgeBg: "bg-green-100 text-green-700",
    title: "Live Chat",
    desc: "Get instant answers from our support team. Average response time under 2 minutes during business hours.",
    details: ["Available 8 AM – 11 PM IST", "Avg. reply < 2 minutes", "7 days a week"],
    action: "Start Live Chat →",
    actionVariant: "white-outline", // white outlined on dark card
    row: 0,
    cardBg: "white",
  },
  {
    icon: "📱",
    badge: "Available",
    badgeDot: "bg-green-500",
    badgeBg: "bg-green-100 text-green-700",
    title: "WhatsApp Support",
    desc: "Send us a WhatsApp message and get a response from our team directly to your phone.",
    details: ["Mon – Sat, 9 AM – 9 PM IST", "Avg. reply < 15 minutes"],
    action: "Message on WhatsApp",
    actionVariant: "dark-filled",
    row: 0,
    cardBg: "white",
  },
  {
    icon: "✉️",
    badge: "Higher Volume",
    badgeDot: "bg-red-400",
    badgeBg: "bg-red-100 text-red-600",
    title: "Email Support",
    desc: "Send a detailed message and our team will respond within 24 hours on business days.",
    details: ["Response within 24 hours", "Mon – Fri only"],
    action: "Send Email →",
    actionVariant: "light-outline",
    row: 0,
    cardBg: "white",
  },
  {
    icon: "📞",
    badge: "Lines Open",
    badgeDot: "bg-green-500",
    badgeBg: "bg-green-100 text-green-700",
    title: "Call Support",
    desc: "Speak directly with a Rentit support agent for urgent or complex issues.",
    details: ["9 AM – 7 PM IST, Mon–Sat", "Toll-free number"],
    phoneNumber: "1800-XXX-XXXX",
    actionVariant: "phone",
    row: 1,
    cardBg: "white",
  },
  {
    icon: "🎫",
    badge: "1–2 day response",
    badgeDot: "bg-orange-400",
    badgeBg: "bg-orange-100 text-orange-600",
    title: "Submit a Ticket",
    desc: "For complex issues that require investigation or documentation review.",
    details: ["All days accepted", "Ticketed tracking system"],
    action: "Open a Ticket →",
    actionVariant: "light-outline",
    row: 1,
    cardBg: "white",
  },
  {
    icon: "👥",
    badge: null,
    title: "Community Forum",
    desc: "Browse answers from the Rentit user community. Often the fastest way to find solutions.",
    details: ["4,200+ active members", "Peer-to-peer support"],
    action: "Visit Community →",
    actionVariant: "text-only",
    row: 1,
    cardBg: "blue",
  },
];

function Card({ opt, isActive, onClick }) {
  const dark = isActive || opt.cardBg === "dark";
  const blue = !isActive && opt.cardBg === "blue";

  const cardClass = dark
    ? "bg-slate-800 border-slate-700"
    : blue
    ? "bg-blue-50 border-blue-100"
    : "bg-white border-gray-150 hover:shadow-md hover:border-orange-200";

  // Icon box
  const iconBoxClass = dark ? "bg-slate-700" : "bg-gray-100";

  // Badge
  const badgeBg = dark
    ? "bg-slate-700 text-gray-300"
    : opt.badgeBg || "bg-gray-100 text-gray-500";

  // Text colours
  const titleColor = dark ? "text-white" : "text-gray-900";
  const descColor = dark ? "text-gray-400" : "text-gray-500";
  const detailColor = dark ? "text-gray-400" : "text-gray-500";

  // Button
  let btnClass = "";
  if (isActive) {
    // When any card is active/dark, button is always white outlined
    btnClass = "border border-white/40 text-white hover:bg-white/10";
  } else {
    switch (opt.actionVariant) {
      case "white-outline":
        btnClass = "border border-white/40 text-white hover:bg-white/10";
        break;
      case "dark-filled":
        btnClass = "bg-gray-900 text-white hover:bg-gray-800";
        break;
      case "light-outline":
        btnClass = "border border-gray-200 text-gray-800 hover:bg-gray-50";
        break;
      case "text-only":
        btnClass = "text-gray-800 font-semibold hover:text-orange-500";
        break;
      default:
        btnClass = "border border-gray-200 text-gray-800 hover:bg-gray-50";
    }
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl border p-6 cursor-pointer flex flex-col transition-all duration-200 ${cardClass}`}
    >
      {/* Icon box */}
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl mb-3 ${iconBoxClass}`}>
        {opt.icon}
      </div>

      {/* Badge */}
      {opt.badge && (
        <div className="mb-4">
          <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full ${badgeBg}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dark ? "bg-green-400" : opt.badgeDot}`} />
            {opt.badge}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className={`font-bold text-base mb-2 ${titleColor}`}>{opt.title}</h3>

      {/* Description */}
      <p className={`text-sm leading-relaxed mb-4 ${descColor}`}>{opt.desc}</p>

      {/* Details */}
      <ul className="space-y-1.5 mb-6 flex-1">
        {opt.details.map((d) => (
          <li key={d} className={`text-xs flex items-center gap-2 ${detailColor}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            {d}
          </li>
        ))}
      </ul>

      {/* Phone number as bordered button */}
      {opt.phoneNumber && (
        <button
          onClick={(e) => e.stopPropagation()}
          className={`w-full text-sm font-semibold py-2.5 rounded-xl border transition-colors ${
            dark
              ? "border-slate-600 text-white hover:bg-slate-700"
              : "border-gray-200 text-gray-800 hover:bg-gray-50"
          }`}
        >
          {opt.phoneNumber}
        </button>
      )}

      {/* CTA button */}
      {opt.action && opt.actionVariant !== "text-only" && (
        <button
          onClick={(e) => e.stopPropagation()}
          className={`w-full text-sm font-semibold py-2.5 rounded-xl transition-colors ${btnClass}`}
        >
          {opt.action}
        </button>
      )}

      {/* Text-only link */}
      {opt.action && opt.actionVariant === "text-only" && !isActive && (
        <button
          onClick={(e) => e.stopPropagation()}
          className={`text-sm font-semibold transition-colors text-left ${btnClass}`}
        >
          {opt.action}
        </button>
      )}

      {/* Text-only when active (becomes button) */}
      {opt.action && opt.actionVariant === "text-only" && isActive && (
        <button
          onClick={(e) => e.stopPropagation()}
          className="w-full text-sm font-semibold py-2.5 rounded-xl border border-white/40 text-white hover:bg-white/10 transition-colors"
        >
          {opt.action}
        </button>
      )}
    </div>
  );
}

export default function ContactSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const row0 = contactOptions.filter((o) => o.row === 0);
  const row1 = contactOptions.filter((o) => o.row === 1);

  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-amber-600 text-xs font-semibold uppercase tracking-widest mb-3">
            ✦ Contact Us
          </p>
          <h2 className="text-4xl font-bold text-gray-900 leading-tight mb-3">
            Reach our support<br />team
          </h2>
          <p className="text-gray-500 text-sm">
            Multiple ways to get in touch — choose what works best for you.
          </p>
        </div>

        {/* Row 0 — taller cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          {row0.map((opt, i) => (
            <Card
              key={opt.title}
              opt={opt}
              isActive={activeIndex === i}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>

        {/* Row 1 — shorter cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {row1.map((opt, i) => (
            <Card
              key={opt.title}
              opt={opt}
              isActive={activeIndex === i + 3}
              onClick={() => setActiveIndex(i + 3)}
            />
          ))}
        </div>

        {/* Ticket form + What to expect */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 grid grid-cols-2 gap-10">
          {/* Left: form */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Submit a support ticket</h3>
            <p className="text-sm text-gray-500 mb-6">Describe your issue and we'll get back to you within 24–48 hours.</p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Full Name</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 placeholder-gray-300"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Email Address</label>
                <input
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 placeholder-gray-300"
                  placeholder="you@email.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Issue Category</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 text-gray-500 bg-white">
                  <option>Select a category</option>
                  <option>Listing Issues</option>
                  <option>Payment</option>
                  <option>Account</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-gray-600 block mb-1.5">Priority</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 text-gray-700 bg-white">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-xs font-medium text-gray-600 block mb-1.5">Describe your issue</label>
              <textarea
                rows={5}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-amber-400 placeholder-gray-300 resize-none"
                placeholder="Please provide as much detail as possible..."
              />
            </div>

            <button className="bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl hover:bg-slate-700 transition-colors">
              Submit Ticket →
            </button>
          </div>

          {/* Right: what to expect */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-6">What to expect</h3>
            <div className="space-y-5">
              {[
                { icon: "⚡", color: "bg-yellow-50", title: "Instant Confirmation", desc: "You'll receive an email confirmation with your ticket ID immediately." },
                { icon: "🔍", color: "bg-blue-50", title: "Team Review", desc: "Our support team reviews every ticket within 4 business hours." },
                { icon: "🧩", color: "bg-orange-50", title: "Resolution", desc: "Most tickets are resolved within 24–48 hours. Complex cases may take longer." },
                { icon: "⭐", color: "bg-amber-50", title: "98% Satisfaction", desc: "Our support team maintains a 98% customer satisfaction rating." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className={`${item.color} w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-0.5">{item.title}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
