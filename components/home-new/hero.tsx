"use client";
import Link from 'next/link';

export default function RentitHero() {
  return (
    <div
      className="min-h-screen w-full flex flex-col"
      style={{ background: "linear-gradient(135deg, #0f1b2d 0%, #162035 50%, #1a2640 100%)" }}
    >
      {/* Navbar placeholder space */}
      <div style={{ paddingLeft: "120px", paddingRight: "120px" }}>
        {/* Hero Section */}
        <div className="flex items-center justify-between mt-6">
          {/* Left Content */}
          <div className="flex flex-col max-w-xl pt-6">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 w-fit"
              style={{ background: "#1e2d45", border: "1px solid #2e3f5a" }}
            >


              <span className="text-sm font-semibold" style={{ color: "#f5a623" }}>
                AI-Powered Property Discovery
              </span>
            </div>

            {/* Headline */}
            <h1
              className="font-black mb-6"
              style={{
                fontSize: "72px",
                lineHeight: "1",
                letterSpacing: "-2px",
              }}
            >
              <span className="text-white">Finding a place</span>
              <br />
              <span className="text-white">shouldn't feel</span>
              <br />
              <span className="text-white">like a </span>
              <span style={{ color: "#f5a623" }}>full-time</span>
              <br />
              <span style={{ color: "#f5a623" }}>job.</span>
            </h1>

            {/* Description */}
            <p className="mb-10 leading-relaxed" style={{ color: "#8fa3bf", fontSize: "16px", maxWidth: "460px" }}>
             Rentit helps students, professionals, families, and
businesses discover verified rentals, PGs, and commercial
spaces faster — using intelligent search and AI-powered
property matching.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/about">
                <button
                  className="flex items-center gap-2 px-7 py-4 rounded-full font-bold text-white"
                  style={{ background: "#f5a623", fontSize: "16px" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.98125 7.96875C6.14375 7.65625 6.31875 7.35 6.50625 7.05C6.69375 6.75 6.89375 6.45 7.10625 6.15L6.13125 6.01875L4.63125 7.5375L5.98125 7.96875ZM14.55 3.075C13.5625 3.125 12.65 3.39375 11.8125 3.88125C10.9875 4.35625 10.2375 4.9375 9.5625 5.625C9.0875 6.1 8.66875 6.6 8.30625 7.125C7.94375 7.6375 7.6 8.20625 7.275 8.83125L9.15 10.7062C9.775 10.3812 10.3438 10.0375 10.8563 9.675C11.3813 9.3125 11.8813 8.9 12.3563 8.4375C13.0438 7.7375 13.6375 6.95625 14.1375 6.09375C14.6375 5.21875 14.9 4.33125 14.925 3.43125C14.925 3.39375 14.9125 3.35 14.8875 3.3C14.875 3.25 14.85 3.2125 14.8125 3.1875C14.7875 3.1375 14.75 3.10625 14.7 3.09375C14.65 3.08125 14.6 3.075 14.55 3.075ZM10.4438 7.55625C10.1938 7.29375 10.0688 6.98125 10.0688 6.61875C10.0688 6.25625 10.1938 5.94375 10.4438 5.68125C10.7063 5.41875 11.0188 5.2875 11.3813 5.2875C11.7438 5.2875 12.05 5.41875 12.3 5.68125C12.5625 5.94375 12.6938 6.25625 12.6938 6.61875C12.6938 6.98125 12.5625 7.29375 12.3 7.55625C12.05 7.80625 11.7438 7.93125 11.3813 7.93125C11.0188 7.93125 10.7063 7.80625 10.4438 7.55625ZM10.0313 12.0187L10.4625 13.3687L11.9625 11.8687L11.85 10.8937C11.55 11.0937 11.25 11.2937 10.95 11.4937C10.65 11.6812 10.3438 11.8562 10.0313 12.0187ZM16.4813 2.34375C16.6313 3.71875 16.425 5.00625 15.8625 6.20625C15.3 7.39375 14.5563 8.45 13.6313 9.375C13.5563 9.45 13.4938 9.5125 13.4438 9.5625C13.3938 9.6125 13.3375 9.675 13.275 9.75L13.5 11.6625C13.5375 11.9 13.5125 12.1375 13.425 12.375C13.35 12.6125 13.225 12.8125 13.05 12.975L10.5938 15.4125C10.3938 15.6 10.1688 15.6687 9.91875 15.6187C9.66875 15.5687 9.5 15.425 9.4125 15.1875L8.41875 12.1875L5.83125 9.58125L2.8125 8.55C2.575 8.4625 2.43125 8.29375 2.38125 8.04375C2.34375 7.79375 2.41875 7.575 2.60625 7.3875L5.04375 4.93125C5.21875 4.75625 5.41875 4.63125 5.64375 4.55625C5.86875 4.46875 6.1 4.44375 6.3375 4.48125L8.25 4.725C8.325 4.6625 8.39375 4.6 8.45625 4.5375C8.51875 4.475 8.58125 4.4125 8.64375 4.35C9.58125 3.425 10.6375 2.68125 11.8125 2.11875C13 1.54375 14.275 1.3375 15.6375 1.5C15.75 1.5125 15.85 1.55 15.9375 1.6125C16.0375 1.6625 16.125 1.725 16.2 1.8C16.275 1.875 16.3375 1.95625 16.3875 2.04375C16.4375 2.11875 16.4688 2.21875 16.4813 2.34375ZM3.15 11.8125C3.575 11.3875 4.075 11.1875 4.65 11.2125C5.2375 11.225 5.74375 11.4437 6.16875 11.8687C6.59375 12.2937 6.8125 12.7937 6.825 13.3687C6.85 13.9312 6.65 14.4125 6.225 14.8125C5.6375 15.4375 4.91875 15.8437 4.06875 16.0312C3.23125 16.2062 2.39375 16.3562 1.55625 16.4812C1.68125 15.6437 1.83125 14.8062 2.00625 13.9687C2.18125 13.1312 2.5625 12.4125 3.15 11.8125ZM4.14375 13.0312C3.95625 13.2312 3.825 13.4625 3.75 13.725C3.675 13.9875 3.6 14.25 3.525 14.5125C3.7875 14.4375 4.04375 14.3625 4.29375 14.2875C4.54375 14.2125 4.76875 14.0812 4.96875 13.8937C5.11875 13.7687 5.2 13.6125 5.2125 13.425C5.2375 13.2375 5.1875 13.0812 5.0625 12.9562C4.9375 12.8312 4.78125 12.7812 4.59375 12.8062C4.41875 12.8187 4.26875 12.8937 4.14375 13.0312Z" fill="white" />
                  </svg>
  
                  Explore Rentit
                </button>
              </Link>
              <Link href="https://play.google.com/store/apps/details?id=com.zuntra.rentit" target="_blank" rel="noopener noreferrer">
                <button
                  className="flex items-center gap-2 px-7 py-4 rounded-full font-bold"
                  style={{ border: "1.5px solid #3a4f6a", color: "#ffffff", fontSize: "16px", background: "transparent" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.4 17.1C5.025 17.1 4.70625 16.9687 4.44375 16.7062C4.18125 16.4437 4.05 16.125 4.05 15.75V2.25C4.05 1.8375 4.16875 1.5125 4.40625 1.275C4.65625 1.025 4.9875 0.899999 5.4 0.899999H12.6C12.975 0.899999 13.2938 1.03125 13.5563 1.29375C13.8188 1.55625 13.95 1.875 13.95 2.25V4.95C14.2 4.95 14.4125 5.0375 14.5875 5.2125C14.7625 5.3875 14.85 5.6 14.85 5.85V7.65C14.85 7.9 14.7625 8.1125 14.5875 8.2875C14.4125 8.4625 14.2 8.55 13.95 8.55V15.75C13.95 16.125 13.8188 16.4437 13.5563 16.7062C13.2938 16.9687 12.975 17.1 12.6 17.1H5.4ZM5.4 15.75H12.6V2.25H5.4V15.75ZM5.4 15.75V2.25V15.75ZM7.425 14.85H10.575C10.7625 14.85 10.9188 14.7875 11.0438 14.6625C11.1813 14.525 11.25 14.3625 11.25 14.175C11.25 13.9875 11.1813 13.8312 11.0438 13.7062C10.9188 13.5687 10.7625 13.5 10.575 13.5H7.425C7.2375 13.5 7.075 13.5687 6.9375 13.7062C6.8125 13.8312 6.75 13.9875 6.75 14.175C6.75 14.3625 6.8125 14.525 6.9375 14.6625C7.075 14.7875 7.2375 14.85 7.425 14.85Z" fill="white" />
                  </svg>
  
                  Download App
                </button>
              </Link>
            </div>
          </div>

          {/* Right — UI Cards */}
<div
  className="relative flex-shrink-0 -ml-20"
  style={{
    width: "620px",
    height: "520px",
    transform: "scale(0.85)",
    transformOrigin: "top left",
  }}
>
          

            {/* Property Listing Card (top right) */}
            <div
              className="absolute rounded-2xl overflow-hidden"
              style={{
                  top: "170px",
                  left: "220px",
                  width: "310px",
                  zIndex: 3,
                  background: "#ffffff",
                  boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                }}
            >
              {/* Property image area */}
             <div
  className="m-3 rounded-xl flex items-center justify-center"
  style={{
    height: "120px",
    background: "linear-gradient(180deg, #1e3a5f 0%, #2d5a8e 100%)",
    borderBottom: "1px solid #f1f5f9",
  }}
>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
  <rect x="8" y="14" width="24" height="20" rx="2" fill="white" fillOpacity="0.3" />
  <rect x="13" y="8" width="14" height="10" rx="1" fill="white" fillOpacity="0.5" />
  <rect x="16" y="24" width="4" height="6" rx="1" fill="white" fillOpacity="0.8" />
  <rect x="22" y="24" width="4" height="6" rx="1" fill="white" fillOpacity="0.8" />
  <rect x="14" y="17" width="4" height="4" rx="1" fill="white" fillOpacity="0.8" />
  <rect x="22" y="17" width="4" height="4" rx="1" fill="white" fillOpacity="0.8" />
</svg>

              </div>

              {/* Property details */}
              <div className="px-4 py-2">
                <div className="text-xs font-medium mb-0.5" style={{ color: "#888" }}>
                  ₹2,000/month
                </div>
                <div className="font-bold text-sm mb-0.5" style={{ color: "#111", fontSize: "13px" }}>
                  1HK Premium Apartment
                </div>
                <div className="text-xs mb-3" style={{ color: "#888" }}>
                  Adyar, Chennai
                </div>
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{ background: "#e8f5e9", color: "#2e7d32" }}
                  >
                    Verified
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#f0f0f0", color: "#555" }}
                  >
                    Fully Furnished
                  </span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ background: "#f0f0f0", color: "#555" }}
                  >
                    Near Metro
                  </span>
                </div>
                <div className="flex items-center gap-2">
  <button
    className="flex-1 py-2 rounded-lg font-semibold text-sm text-white"
    style={{ background: "#1a2e4a" }}
  >
    Contact Owner
  </button>

  <button
    className="flex items-center justify-center rounded-lg"
    
  >
    <svg width="38" height="32" viewBox="0 0 38 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="path-1-inside-1_4900_447" fill="white">
<path d="M0 8C0 3.58172 3.58172 0 8 0H30C34.4183 0 38 3.58172 38 8V24C38 28.4183 34.4183 32 30 32H8C3.58172 32 0 28.4183 0 24V8Z"/>
</mask>
<path d="M0 8C0 3.58172 3.58172 0 8 0H30C34.4183 0 38 3.58172 38 8V24C38 28.4183 34.4183 32 30 32H8C3.58172 32 0 28.4183 0 24V8Z" fill="#F8FAFC"/>
<path d="M8 0V1H30V0V-1H8V0ZM38 8H37V24H38H39V8H38ZM30 32V31H8V32V33H30V32ZM0 24H1V8H0H-1V24H0ZM8 32V31C4.13401 31 1 27.866 1 24H0H-1C-1 28.9706 3.02944 33 8 33V32ZM38 24H37C37 27.866 33.866 31 30 31V32V33C34.9706 33 39 28.9706 39 24H38ZM30 0V1C33.866 1 37 4.13401 37 8H38H39C39 3.02944 34.9706 -1 30 -1V0ZM8 0V-1C3.02944 -1 -1 3.02944 -1 8H0H1C1 4.13401 4.13401 1 8 1V0Z" fill="#E2E8F0" mask="url(#path-1-inside-1_4900_447)"/>
<path d="M19 21.1667C18.8556 21.1667 18.7111 21.1444 18.5667 21.1C18.4333 21.0444 18.3056 20.9611 18.1833 20.85L17.2 19.95C15.9889 18.8722 14.9167 17.8222 13.9833 16.8C13.0611 15.7667 12.6 14.6444 12.6 13.4333C12.6 12.4556 12.9333 11.6389 13.6 10.9833C14.2667 10.3278 15.0944 10 16.0833 10C16.65 10 17.1833 10.1222 17.6833 10.3667C18.1944 10.6 18.6333 10.9389 19 11.3833C19.3889 10.9389 19.8278 10.6 20.3167 10.3667C20.8167 10.1222 21.35 10 21.9167 10C22.9056 10 23.7333 10.3278 24.4 10.9833C25.0667 11.6389 25.4 12.4556 25.4 13.4333C25.4 14.6444 24.9333 15.7667 24 16.8C23.0778 17.8222 22.0111 18.8722 20.8 19.95L19.8167 20.85C19.6944 20.9611 19.5611 21.0444 19.4167 21.1C19.2833 21.1444 19.1444 21.1667 19 21.1667ZM18.4333 12.6333C18.1667 12.1778 17.8333 11.8278 17.4333 11.5833C17.0333 11.3278 16.5833 11.2 16.0833 11.2C15.4278 11.2 14.8833 11.4111 14.45 11.8333C14.0167 12.2556 13.8 12.7889 13.8 13.4333C13.8 14 14 14.5944 14.4 15.2167C14.8 15.8389 15.2778 16.45 15.8333 17.05C16.3889 17.6389 16.9611 18.1889 17.55 18.7C18.1389 19.2111 18.6222 19.6333 19 19.9667C19.3778 19.6333 19.8611 19.2111 20.45 18.7C21.0389 18.1889 21.6111 17.6389 22.1667 17.05C22.7222 16.45 23.2 15.8389 23.6 15.2167C24 14.5944 24.2 14 24.2 13.4333C24.2 12.7889 23.9833 12.2556 23.55 11.8333C23.1167 11.4111 22.5722 11.2 21.9167 11.2C21.4167 11.2 20.9611 11.3278 20.55 11.5833C20.15 11.8278 19.8167 12.1778 19.55 12.6333C19.4944 12.7444 19.4167 12.8278 19.3167 12.8833C19.2167 12.9278 19.1111 12.95 19 12.95C18.8889 12.95 18.7778 12.9278 18.6667 12.8833C18.5667 12.8278 18.4889 12.7444 18.4333 12.6333Z" fill="#94A3B8"/>
</svg>

  </button>
</div>
              </div>
              
            </div>

            {/* Stats Card (bottom right of property card) */}
            <div
              className="absolute rounded-2xl px-5 py-4"
              style={{
                top:"430px",
                left: "495px",
                width: "190px",
                zIndex: 4,
                borderRadius:"20px",
                padding:"12px",
                background: "#ffffff",
                boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
                }}
            >
              <div className="text-xs font-semibold mb-1" style={{ color: "#888", letterSpacing: "0.05em" }}>
                THIS WEEK
              </div>
              <div className="font-black mb-0" style={{ fontSize: "28px", color: "#000000", lineHeight: "1" }}>
                156
              </div>
              <div className="text-xs mb-2" style={{ color: "#666" }}>
                Total Views
              </div>
              <div className="w-full rounded-full mb-1" style={{ height: "5px", background: "#e0e0e0" }}>
                <div className="rounded-full" style={{ height: "7px", width: "72%", background: "#22c55e" }} />
              </div>
              <div className="text-xs font-semibold" style={{ color: "#22c55e" }}>
                ↑ 42% vs last week
              </div>
            </div>

            {/* Owner Chat Card (middle left) */}
            <div
              className="absolute rounded-2xl px-4 py-4"
              style={{
                top: "20px",
                left: "40px",
                width: "270px",
                zIndex: 3,
                background: "#ffffff",
                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
              }}
            >
              <div className="text-xs font-bold mb-3" style={{ color: "#888", letterSpacing: "0.08em" }}>
                OWNER CHAT
              </div>
              {/* Message from RK */}
              <div className="flex items-start gap-2 mb-3">
                <div
                  className="rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold text-white"
                  style={{ width: "28px", height: "28px", background: "#4a6cf7", fontSize: "10px" }}
                >
                  RK
                </div>
                <div
                  className="text-xs px-3 py-2 rounded-xl"
                  style={{ background: "#f5f5f5", color: "#333", flex: 1 }}
                >
                  Is the flat still available?
                </div>
              </div>
              {/* Reply */}
              <div className="mb-3">
                <div
                  className="text-xs px-3 py-2 rounded-xl"
                  style={{ background: "#1a2e4a", color: "#ffffff" }}
                >
                  Yes! Fully furnished, ready to move in.
                </div>
              </div>
              {/* Input */}
              <div
                className="flex items-center justify-between px-3 py-2 rounded-xl"
                style={{ background: "#f5f5f5" }}
              >
                <span className="text-xs" style={{ color: "#aaa" }}>
                  Type a message...
                </span>
                <div
                  className="rounded-lg flex items-center justify-center"
                  style={{ width: "26px", height: "26px", background: "#1a2e4a" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M1 5H9M9 5L6 2M9 5L6 8" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
              </div>
            </div>

         
          </div>
        </div>

      </div>
    </div>
  );
}
