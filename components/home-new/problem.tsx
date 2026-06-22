"use client";

import { useState } from "react";

export default function Problem() {
  const [hoveredProblem, setHoveredProblem] = useState(null);
  const [hoveredListing, setHoveredListing] = useState(null);

  const problems = [
    {
      title: "Fake & Outdated Listings",
      desc: "Properties no longer available, posted months ago with misleading photos",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="10" fill="#FFF5F5"/>
          <path d="M11.1 24.3C10.9625 24.3 10.8438 24.2687 10.7438 24.2062C10.6438 24.1437 10.5625 24.0625 10.5 23.9625C10.4375 23.8625 10.4063 23.75 10.4063 23.625C10.4188 23.5 10.4563 23.3812 10.5188 23.2687L17.4188 11.7562C17.4813 11.6437 17.5625 11.5625 17.6625 11.5125C17.775 11.4625 17.8875 11.4375 18 11.4375C18.1125 11.4375 18.2188 11.4625 18.3188 11.5125C18.4313 11.5625 18.5188 11.6437 18.5813 11.7562L25.4813 23.2687C25.5438 23.3812 25.575 23.5 25.575 23.625C25.5875 23.75 25.5625 23.8625 25.5 23.9625C25.4375 24.0625 25.3563 24.1437 25.2563 24.2062C25.1563 24.2687 25.0375 24.3 24.9 24.3H11.1ZM12.2813 22.95H23.7188L18 13.425L12.2813 22.95ZM18 22.05C18.1875 22.05 18.3438 21.9875 18.4688 21.8625C18.6063 21.725 18.675 21.5625 18.675 21.375C18.675 21.1875 18.6063 21.0312 18.4688 20.9062C18.3438 20.7687 18.1875 20.7 18 20.7C17.8125 20.7 17.65 20.7687 17.5125 20.9062C17.3875 21.0312 17.325 21.1875 17.325 21.375C17.325 21.5625 17.3875 21.725 17.5125 21.8625C17.65 21.9875 17.8125 22.05 18 22.05ZM18 19.8C18.1875 19.8 18.3438 19.7375 18.4688 19.6125C18.6063 19.475 18.675 19.3125 18.675 19.125V16.875C18.675 16.6875 18.6063 16.5312 18.4688 16.4062C18.3438 16.2687 18.1875 16.2 18 16.2C17.8125 16.2 17.65 16.2687 17.5125 16.4062C17.3875 16.5312 17.325 16.6875 17.325 16.875V19.125C17.325 19.3125 17.3875 19.475 17.5125 19.6125C17.65 19.7375 17.8125 19.8 18 19.8Z" fill="#EF4444"/>
        </svg>
      ),
    },
    {
      title: "Endless Broker Calls",
      desc: "Middlemen who add zero value but demand 1–2 months brokerage fee",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="10" fill="#FFF5F5"/>
          <path d="M22.9313 24.825L19.5938 21.5062C18.6313 22.2937 17.5625 22.9312 16.3875 23.4187C15.225 23.8937 13.9813 24.1812 12.6563 24.2812C12.4813 24.2937 12.2688 24.2312 12.0188 24.0937C11.7813 23.9562 11.6625 23.7187 11.6625 23.3812V20.8312C11.6625 20.6187 11.725 20.4312 11.85 20.2687C11.975 20.0937 12.1438 19.9875 12.3563 19.95L14.3625 19.5187C14.5 19.4937 14.6438 19.5 14.7938 19.5375C14.9438 19.5625 15.0813 19.6375 15.2063 19.7625L17.0625 21.5625C17.3125 21.425 17.5813 21.2625 17.8688 21.075C18.1688 20.8875 18.425 20.7062 18.6375 20.5312L11.1563 13.05C11.0188 12.9125 10.95 12.7562 10.95 12.5812C10.95 12.4062 11.0188 12.25 11.1563 12.1125C11.2938 11.975 11.45 11.9062 11.625 11.9062C11.8125 11.9062 11.975 11.975 12.1125 12.1125L23.8875 23.8875C24.025 24.025 24.0938 24.1812 24.0938 24.3562C24.0938 24.5312 24.025 24.6875 23.8875 24.825C23.75 24.9625 23.5875 25.0312 23.4 25.0312C23.225 25.0312 23.0688 24.9625 22.9313 24.825ZM15.7313 22.2L14.4188 20.8875L13.0125 21.1875V22.875C13.4875 22.8125 13.95 22.7312 14.4 22.6312C14.85 22.5187 15.2938 22.375 15.7313 22.2ZM21.5063 19.5937L20.5313 18.6187C20.7063 18.3937 20.8875 18.1437 21.075 17.8687C21.2625 17.5812 21.425 17.3125 21.5625 17.0625L19.7438 15.225C19.6313 15.1125 19.5563 14.9812 19.5188 14.8312C19.4813 14.6687 19.475 14.5187 19.5 14.3812L19.95 12.3937C20 12.1812 20.1 12.0125 20.25 11.8875C20.4125 11.7625 20.6 11.7 20.8125 11.7H23.3625C23.625 11.7 23.8438 11.8 24.0188 12C24.2063 12.1875 24.2875 12.4125 24.2625 12.675C24.1625 13.9875 23.875 15.2312 23.4 16.4062C22.925 17.5687 22.2938 18.6312 21.5063 19.5937ZM22.1813 15.75C22.3563 15.3125 22.5 14.8687 22.6125 14.4187C22.725 13.9687 22.8125 13.5125 22.875 13.05H21.1875L20.8688 14.4375L22.1813 15.75Z" fill="#EF4444"/>
        </svg>
      ),
    },
    {
      title: "No Owner Response",
      desc: "Inquiring about 10 properties and hearing back from 1, days later",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="10" fill="#FFF5F5"/>
          <path d="M14.175 19.8H19.125C19.3125 19.8 19.4688 19.7375 19.5938 19.6125C19.7313 19.475 19.8 19.3125 19.8 19.125C19.8 18.9375 19.7313 18.7812 19.5938 18.6562C19.4688 18.5187 19.3125 18.45 19.125 18.45H14.175C13.9875 18.45 13.825 18.5187 13.6875 18.6562C13.5625 18.7812 13.5 18.9375 13.5 19.125C13.5 19.3125 13.5625 19.475 13.6875 19.6125C13.825 19.7375 13.9875 19.8 14.175 19.8ZM14.175 17.325H21.825C22.0125 17.325 22.1688 17.2625 22.2938 17.1375C22.4313 17 22.5 16.8375 22.5 16.65C22.5 16.4625 22.4313 16.3062 22.2938 16.1812C22.1688 16.0437 22.0125 15.975 21.825 15.975H14.175C13.9875 15.975 13.825 16.0437 13.6875 16.1812C13.5625 16.3062 13.5 16.4625 13.5 16.65C13.5 16.8375 13.5625 17 13.6875 17.1375C13.825 17.2625 13.9875 17.325 14.175 17.325ZM13.5 22.5L11.9438 24.0562C11.7313 24.2687 11.4875 24.3187 11.2125 24.2062C10.9375 24.0812 10.8 23.8687 10.8 23.5687V12.15C10.8 11.7875 10.9313 11.475 11.1938 11.2125C11.4563 10.9375 11.775 10.8 12.15 10.8H18.675C18.8625 10.8 19.0188 10.8687 19.1438 11.0062C19.2813 11.1312 19.35 11.2875 19.35 11.475C19.35 11.6625 19.2813 11.825 19.1438 11.9625C19.0188 12.0875 18.8625 12.15 18.675 12.15H12.15V21.9375L12.9375 21.15H23.85V15.525C23.85 15.3375 23.9125 15.1812 24.0375 15.0562C24.175 14.9187 24.3375 14.85 24.525 14.85C24.7125 14.85 24.8688 14.9187 24.9938 15.0562C25.1313 15.1812 25.2 15.3375 25.2 15.525V21.15C25.2 21.525 25.0625 21.8437 24.7875 22.1062C24.525 22.3687 24.2125 22.5 23.85 22.5H13.5ZM22.95 13.725C22.325 13.725 21.7938 13.5062 21.3563 13.0687C20.9188 12.6312 20.7 12.1 20.7 11.475C20.7 10.85 20.9188 10.3187 21.3563 9.88125C21.7938 9.44375 22.325 9.225 22.95 9.225C23.575 9.225 24.1063 9.44375 24.5438 9.88125C24.9813 10.3187 25.2 10.85 25.2 11.475C25.2 12.1 24.9813 12.6312 24.5438 13.0687C24.1063 13.5062 23.575 13.725 22.95 13.725ZM12.15 12.15V21.15V12.15Z" fill="#EF4444"/>
        </svg>
      ),
    },
    {
      title: "Time-Consuming Search",
      desc: "Spending weeks scrolling through irrelevant listings with poor filters",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="10" fill="#FFF5F5"/>
          <path d="M14.3813 21.225L15.1688 22.0125C15.2438 22.0875 15.3313 22.125 15.4313 22.125C15.5438 22.125 15.6375 22.0875 15.7125 22.0125C15.7875 21.9375 15.825 21.8437 15.825 21.7312C15.825 21.6187 15.7875 21.525 15.7125 21.45L14.925 20.6812L15.7125 19.8937C15.7875 19.8187 15.825 19.7312 15.825 19.6312C15.825 19.5187 15.7875 19.425 15.7125 19.35C15.6375 19.275 15.5438 19.2375 15.4313 19.2375C15.3313 19.2375 15.2438 19.275 15.1688 19.35L14.3813 20.1375L13.5938 19.35C13.5188 19.275 13.4313 19.2375 13.3313 19.2375C13.2313 19.2375 13.1438 19.275 13.0688 19.35C12.9938 19.425 12.9563 19.5187 12.9563 19.6312C12.9563 19.7312 12.9938 19.8187 13.0688 19.8937L13.8375 20.6812L13.05 21.4687C12.975 21.5437 12.9375 21.6312 12.9375 21.7312C12.9375 21.8312 12.975 21.9187 13.05 21.9937C13.125 22.0687 13.2188 22.1062 13.3313 22.1062C13.4438 22.1062 13.5375 22.0687 13.6125 21.9937L14.3813 21.225ZM14.4 24.3C13.4 24.3 12.55 23.95 11.85 23.25C11.15 22.55 10.8 21.7 10.8 20.7C10.8 19.7 11.15 18.85 11.85 18.15C12.55 17.45 13.4 17.1 14.4 17.1C15.4 17.1 16.25 17.45 16.95 18.15C17.65 18.85 18 19.7 18 20.7C18 21.7 17.65 22.55 16.95 23.25C16.25 23.95 15.4 24.3 14.4 24.3ZM19.6313 18.7875C19.4938 18.65 19.35 18.5125 19.2 18.375C19.0625 18.225 18.925 18.0812 18.7875 17.9437C19.225 17.6562 19.575 17.2875 19.8375 16.8375C20.1125 16.375 20.25 15.8625 20.25 15.3C20.25 14.425 19.9438 13.6812 19.3313 13.0687C18.7188 12.4562 17.975 12.15 17.1 12.15C16.225 12.15 15.4813 12.4562 14.8688 13.0687C14.2563 13.6812 13.95 14.425 13.95 15.3C13.95 15.3875 13.9563 15.4687 13.9688 15.5437C13.9813 15.6187 13.9938 15.6937 14.0063 15.7687C13.7688 15.7937 13.5375 15.8312 13.3125 15.8812C13.1 15.9312 12.8875 15.9937 12.675 16.0687C12.65 15.9437 12.6313 15.8187 12.6188 15.6937C12.6063 15.5687 12.6 15.4375 12.6 15.3C12.6 14.05 13.0375 12.9875 13.9125 12.1125C14.7875 11.2375 15.85 10.8 17.1 10.8C18.35 10.8 19.4125 11.2375 20.2875 12.1125C21.1625 12.9875 21.6 14.05 21.6 15.3C21.6 15.8 21.5188 16.275 21.3563 16.725C21.2063 17.175 20.9938 17.5875 20.7188 17.9625L24.7313 21.975C24.8688 22.1125 24.9375 22.2687 24.9375 22.4437C24.9375 22.6187 24.8688 22.775 24.7313 22.9125C24.5938 23.05 24.4313 23.1187 24.2438 23.1187C24.0688 23.1187 23.9125 23.05 23.775 22.9125L19.6313 18.7875Z" fill="#EF4444"/>
        </svg>
      ),
    },
    {
      title: "Poor Filtering Options",
      desc: "Can't filter by metro distance, pet-friendly, or actual availability",
      icon: (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="10" fill="#FFF5F5"/>
          <path d="M19.6688 17.775L18.7125 16.8L21.0563 13.95H15.8625L14.5125 12.6H22.95C23.1375 12.6 23.2688 12.6875 23.3438 12.8625C23.4313 13.025 23.4188 13.1812 23.3063 13.3312L19.6688 17.775ZM18.9 20.8125V22.95C18.9 23.075 18.8563 23.1812 18.7688 23.2687C18.6813 23.3562 18.575 23.4 18.45 23.4H17.55C17.425 23.4 17.3188 23.3562 17.2313 23.2687C17.1438 23.1812 17.1 23.075 17.1 22.95V19.0125L11.1563 13.0687C11.0188 12.9312 10.95 12.775 10.95 12.6C10.95 12.4125 11.0188 12.25 11.1563 12.1125C11.2938 11.975 11.45 11.9062 11.625 11.9062C11.8125 11.9062 11.975 11.975 12.1125 12.1125L23.8875 23.8875C24.025 24.025 24.0938 24.1812 24.0938 24.3562C24.0938 24.5312 24.025 24.6875 23.8875 24.825C23.75 24.9625 23.5875 25.0312 23.4 25.0312C23.225 25.0312 23.0688 24.9625 22.9313 24.825L18.9 20.8125Z" fill="#EF4444"/>
        </svg>
      ),
    },
  ];

  const listings = [
    { initial: "F", bg: "#ef4444", name: "3BHK Apartment OMR", sub: "Last updated: 4 months ago", tag: "Fake Listing", tagBg: "#fde8e8", tagColor: "#ef4444" },
    { initial: "B", bg: "#f5a623", name: "2BHK Velachery via Broker", sub: "Broker fee: 2 months rent", tag: "Brokerage ₹28K", tagBg: "#ede9fe", tagColor: "#7c3aed" },
    { initial: "X", bg: "#9ca3af", name: "1BHK Anna Nagar", sub: "Contacted 3 days ago", tag: "No Response", tagBg: "#fff7ed", tagColor: "#ea580c" },
    { initial: "O", bg: "#d1d5db", name: "Studio Adyar", sub: "Photos outdated, different unit shown", tag: "Misleading", tagBg: "#f3f4f6", tagColor: "#6b7280" },
  ];

  return (
    <section className="w-full py-16 px-16" style={{ background: "#f8f9fb" }}>
      <div className="flex gap-20 mb-24">
        {/* Left */}
        <div className="flex flex-col max-w-sm pt-2">
          <div className="flex items-center gap-2 mb-5">
            <div className="rounded-full" style={{ width: "8px", height: "8px", background: "#f5a623" }} />
            <span className="text-xs font-bold tracking-widest" style={{ color: "#f5a623", letterSpacing: "0.12em" }}>
              THE PROBLEM
            </span>
          </div>
          <h2 className="font-black mb-5" style={{ fontSize: "56px", color: "#1a2e4a", lineHeight: "1.1" }}>
            Searching for rentals is{" "}
            <span style={{ color: "#ef4444" }}>broken.</span>
          </h2>
          <p className="mb-8 leading-relaxed" style={{ color: "#6b7280", fontSize: "16px" }}>
            The traditional rental process is filled with friction — from fake listings to unresponsive owners. Rentit was built to fix every single pain point.
          </p>
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white w-fit"
            style={{
              background: "#1a2e4a",
              fontSize: "15px",
              transition: "background 0.2s ease, transform 0.15s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "#2d3f57";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "#1a2e4a";
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            See how Rentit fixes this →
          </button>
        </div>

        {/* Right — Problem Cards */}
        <div className="flex flex-col gap-3 ml-auto" style={{ width: "650px" }}>
          {problems.map((p, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-5 py-4 rounded-xl bg-white"
              onMouseEnter={() => setHoveredProblem(i)}
              onMouseLeave={() => setHoveredProblem(null)}
              style={{
                border: hoveredProblem === i ? "1px solid #fca5a5" : "1px solid #f0f0f0",
                boxShadow: hoveredProblem === i
                  ? "0 6px 20px rgba(239,68,68,0.10)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
                transform: hoveredProblem === i ? "translateY(-2px)" : "translateY(0)",
                transition: "box-shadow 0.2s ease, border-color 0.2s ease, transform 0.18s ease",
              }}
            >
              <div
                className="flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                style={{ width: "36px", height: "36px", background: "#fff5f5" }}
              >
                {p.icon}
              </div>
              <div>
                <div className="font-bold text-sm mb-0.5" style={{ color: "#1a2e4a" }}>{p.title}</div>
                <div className="text-sm" style={{ color: "#9ca3af" }}>{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Old Way Card */}
      <div
        className="mx-auto rounded-2xl bg-white overflow-hidden"
        style={{
          maxWidth: "660px",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)",
          borderTop: "4px solid",
          borderImage: "linear-gradient(to right, #f5a623, #ef4444) 1",
        }}
      >
        <div className="px-6 pt-5 pb-2">
          <span className="text-xs font-bold tracking-widest" style={{ color: "#9ca3af", letterSpacing: "0.12em" }}>
            THE OLD WAY
          </span>
        </div>
        <div className="px-6 pb-5 flex flex-col gap-0">
          {listings.map((item, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-3 px-2 rounded-lg -mx-2"
              onMouseEnter={() => setHoveredListing(i)}
              onMouseLeave={() => setHoveredListing(null)}
              style={{
                borderBottom: i < listings.length - 1 ? "1px solid #f3f4f6" : "none",
                background: hoveredListing === i ? "#fef9f0" : "transparent",
                transition: "background 0.15s ease",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="rounded-full flex items-center justify-center font-bold text-white text-sm flex-shrink-0"
                  style={{ width: "36px", height: "36px", background: item.bg }}
                >
                  {item.initial}
                </div>
                <div>
                  <div className="font-semibold text-sm" style={{ color: "#1a2e4a" }}>{item.name}</div>
                  <div className="text-xs" style={{ color: "#9ca3af" }}>{item.sub}</div>
                </div>
              </div>
              <span
                className="text-xs font-semibold px-3 py-1 rounded-full"
                style={{ background: item.tagBg, color: item.tagColor }}
              >
                {item.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}