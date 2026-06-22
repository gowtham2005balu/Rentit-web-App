"use client";

export default function WhyRentit() {
  return (
    <section className="bg-gray-50 py-20 px-4 font-sans">
      <style>{`
        .why-card {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: default;
        }
        .why-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 48px -10px rgba(0,0,0,0.18);
        }

        /* Icon wrapper glow on hover */
        .why-card:hover .card-icon-wrap {
          transform: scale(1.1);
        }
        .card-icon-wrap {
          transition: transform 0.25s ease;
        }

        /* CTA arrow nudge */
        .why-card .cta-link {
          transition: gap 0.2s ease, opacity 0.2s ease;
        }
        .why-card:hover .cta-link {
          gap: 8px;
        }
        .why-card .cta-arrow {
          transition: transform 0.2s ease;
        }
        .why-card:hover .cta-arrow {
          transform: translateX(4px);
        }

        /* Watermark number drift */
        .why-card .watermark-num {
          transition: transform 0.35s ease, opacity 0.35s ease;
        }
        .why-card:hover .watermark-num {
          transform: translateY(-6px) scale(1.04);
          opacity: 0.18;
        }

        /* Card 03 light card — subtle border brighten */
        .why-card-light {
          transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease;
        }
        .why-card-light:hover {
          border-color: #d1d5db;
          transform: translateY(-5px);
          box-shadow: 0 20px 48px -10px rgba(0,0,0,0.10);
        }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">● WHY RENTIT</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
            The smarter way to rent.
          </h2>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Card 01 - Verified Listings (slate/dark blue) */}
          <div className="why-card relative rounded-2xl p-8 overflow-hidden" style={{ backgroundColor: "#3d5166" }}>
            <span className="watermark-num absolute top-5 right-6 text-7xl font-black text-white/10 select-none leading-none">01</span>
            <div className="card-icon-wrap w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Verified Listings</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Every property is manually verified by our team. No fake listings, no misleading photos, no outdated availability — just trusted properties.
            </p>
            <a href="#" className="cta-link inline-flex items-center text-white text-sm font-semibold gap-1">
              How we verify
              <svg className="cta-arrow w-4 h-4" viewBox="0 0 17 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-0.000781223 9.31874C0.111719 8.00624 0.536719 6.81249 1.27422 5.73749C2.02422 4.66249 2.97422 3.79999 4.12422 3.14999L2.69922 0.693737C2.63672 0.581237 2.61797 0.468737 2.64297 0.356237C2.68047 0.243737 2.75547 0.156237 2.86797 0.0937374C2.96797 0.0312369 3.08047 0.0124868 3.20547 0.0374871C3.33047 0.0624868 3.42422 0.131237 3.48672 0.243737L4.93047 2.75624C5.93047 2.33124 6.96797 2.11874 8.04297 2.11874C9.13047 2.11874 10.1742 2.33124 11.1742 2.75624L12.5992 0.243737C12.6617 0.131237 12.7555 0.0624868 12.8805 0.0374871C13.0055 0.0124868 13.118 0.0312369 13.218 0.0937374C13.3305 0.156237 13.3992 0.243737 13.4242 0.356237C13.4617 0.468737 13.4492 0.581237 13.3867 0.693737L11.9617 3.14999C13.1117 3.79999 14.0555 4.66249 14.793 5.73749C15.543 6.81249 15.9742 8.00624 16.0867 9.31874H-0.000781223ZM4.44297 8.32499C4.69297 8.32499 4.90547 8.23749 5.08047 8.06249C5.25547 7.88749 5.34297 7.67499 5.34297 7.42499C5.34297 7.17499 5.25547 6.96249 5.08047 6.78749C4.90547 6.61249 4.69297 6.52499 4.44297 6.52499C4.19297 6.52499 3.98047 6.61249 3.80547 6.78749C3.63047 6.96249 3.54297 7.17499 3.54297 7.42499C3.54297 7.67499 3.63047 7.88749 3.80547 8.06249C3.98047 8.23749 4.19297 8.32499 4.44297 8.32499ZM11.643 8.32499C11.893 8.32499 12.1055 8.23749 12.2805 8.06249C12.4555 7.88749 12.543 7.67499 12.543 7.42499C12.543 7.17499 12.4555 6.96249 12.2805 6.78749C12.1055 6.61249 11.893 6.52499 11.643 6.52499C11.393 6.52499 11.1805 6.61249 11.0055 6.78749C10.8305 6.96249 10.743 7.17499 10.743 7.42499C10.743 7.67499 10.8305 7.88749 11.0055 8.06249C11.1805 8.23749 11.393 8.32499 11.643 8.32499Z" fill="white" fillOpacity="0.7"/>
              </svg>
            </a>
          </div>

          {/* Card 02 - AI Discovery (orange/amber) */}
          <div className="why-card relative rounded-2xl p-8 overflow-hidden" style={{ background: "linear-gradient(135deg, #c87315 0%, #e09020 100%)" }}>
            <span className="watermark-num absolute top-5 right-6 text-7xl font-black text-white/10 select-none leading-none">02</span>
            <div className="card-icon-wrap w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-6">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="52" height="52" rx="14" fill="white" fillOpacity="0.15"/>
                <path d="M32.0938 19.9062L30.225 19.0396C30.0986 18.9854 30.0083 18.9132 29.9542 18.8229C29.9 18.7146 29.8729 18.6062 29.8729 18.4979C29.8729 18.3896 29.9 18.2903 29.9542 18.2C30.0083 18.0917 30.0986 18.0104 30.225 17.9562L32.0938 17.0896L32.9604 15.2208C33.0146 15.1125 33.0868 15.0312 33.1771 14.9771C33.2854 14.9049 33.3938 14.8687 33.5021 14.8687C33.6104 14.8687 33.7097 14.9049 33.8 14.9771C33.9083 15.0312 33.9896 15.1125 34.0438 15.2208L34.9104 17.0896L36.7792 17.9562C36.8875 18.0104 36.9688 18.0917 37.0229 18.2C37.0951 18.2903 37.1313 18.3896 37.1313 18.4979C37.1313 18.6062 37.0951 18.7146 37.0229 18.8229C36.9688 18.9132 36.8875 18.9854 36.7792 19.0396L34.9104 19.9062L34.0438 21.775C33.9896 21.8833 33.9083 21.9646 33.8 22.0187C33.7097 22.0729 33.6104 22.1 33.5021 22.1C33.3938 22.1 33.2854 22.0729 33.1771 22.0187C33.0868 21.9646 33.0146 21.8833 32.9604 21.775L32.0938 19.9062ZM19.9333 28.7625L15.6813 26.8125C15.5007 26.7403 15.3653 26.6319 15.275 26.4875C15.1847 26.325 15.1396 26.1625 15.1396 26C15.1396 25.8375 15.1847 25.684 15.275 25.5396C15.3653 25.3771 15.5007 25.2597 15.6813 25.1875L19.9333 23.2375L21.8833 18.9854C21.9736 18.8049 22.091 18.6694 22.2354 18.5792C22.3799 18.4889 22.5333 18.4437 22.6958 18.4437C22.8583 18.4437 23.0118 18.4889 23.1563 18.5792C23.3188 18.6694 23.4451 18.8049 23.5354 18.9854L25.4854 23.2375L29.7375 25.1875C29.9181 25.2597 30.0444 25.3771 30.1167 25.5396C30.2069 25.684 30.2521 25.8375 30.2521 26C30.2521 26.1625 30.2069 26.325 30.1167 26.4875C30.0444 26.6319 29.9181 26.7403 29.7375 26.8125L25.4854 28.7625L23.5354 33.0146C23.4451 33.1951 23.3188 33.3306 23.1563 33.4208C23.0118 33.5111 22.8583 33.5562 22.6958 33.5562C22.5333 33.5562 22.3799 33.5111 22.2354 33.4208C22.091 33.3306 21.9736 33.1951 21.8833 33.0146L19.9333 28.7625ZM22.6958 29.4396L23.8063 27.0833L26.1625 26L23.8063 24.9167L22.6958 22.5604L21.6125 24.9167L19.2563 26L21.6125 27.0833L22.6958 29.4396ZM32.2292 35.0187L30.3333 34.1792C30.225 34.1069 30.1347 34.0257 30.0625 33.9354C30.0083 33.8271 29.9813 33.7278 29.9813 33.6375C29.9813 33.5292 30.0083 33.4299 30.0625 33.3396C30.1347 33.2312 30.225 33.141 30.3333 33.0687L32.2292 32.2292L33.0688 30.3604C33.141 30.234 33.2222 30.1437 33.3125 30.0896C33.4208 30.0174 33.5201 29.9812 33.6104 29.9812C33.7188 29.9812 33.8181 30.0174 33.9083 30.0896C34.0167 30.1437 34.1069 30.234 34.1792 30.3604L35.0188 32.2292L36.8875 33.0687C37.0139 33.141 37.1042 33.2312 37.1583 33.3396C37.2306 33.4299 37.2667 33.5292 37.2667 33.6375C37.2667 33.7278 37.2306 33.8271 37.1583 33.9354C37.1042 34.0257 37.0139 34.1069 36.8875 34.1792L35.0188 35.0187L34.1792 36.8875C34.1069 37.0139 34.0167 37.1132 33.9083 37.1854C33.8181 37.2396 33.7188 37.2667 33.6104 37.2667C33.5201 37.2667 33.4208 37.2396 33.3125 37.1854C33.2222 37.1132 33.141 37.0139 33.0688 36.8875L32.2292 35.0187Z" fill="white"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">AI Discovery</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Describe your ideal property in plain language. Our AI parses your query, extracts filters, and surfaces the best matching properties instantly.
            </p>
            <a href="#" className="cta-link inline-flex items-center text-white text-sm font-semibold gap-1">
              Try AI Search
              <svg className="cta-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Card 03 - Premium Exposure (white/light) */}
          <div className="why-card why-card-light relative rounded-2xl p-8 overflow-hidden bg-white border border-gray-100">
            <span className="watermark-num absolute top-5 right-6 text-7xl font-black text-gray-100 select-none leading-none">03</span>
            <div className="card-icon-wrap w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center mb-6">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="52" height="52" rx="14" fill="#2F4253" fillOpacity="0.08"/>
                <path d="M20.7188 24.9437C20.9535 24.4743 21.1972 24.0229 21.45 23.5896C21.7028 23.1382 21.9826 22.6868 22.2896 22.2354L20.8271 21.9375L18.6875 24.0771L20.7188 24.9437ZM33.8813 17.6312C32.5632 17.7035 31.209 18.0917 29.8188 18.7958C28.4285 19.4819 27.1556 20.4028 26 21.5583C25.2597 22.2986 24.6007 23.0931 24.0229 23.9417C23.4451 24.7903 22.9847 25.6208 22.6417 26.4333L25.7292 29.4937C26.5417 29.1507 27.3722 28.6903 28.2208 28.1125C29.0694 27.5347 29.8549 26.8757 30.5771 26.1354C31.7507 24.9799 32.6806 23.7069 33.3667 22.3167C34.0708 20.9264 34.45 19.5812 34.5042 18.2812C34.5222 18.191 34.5132 18.1097 34.4771 18.0375C34.441 17.9472 34.3958 17.875 34.3417 17.8208C34.2875 17.7486 34.2153 17.7035 34.125 17.6854C34.0528 17.6493 33.9715 17.6312 33.8813 17.6312ZM28.0583 24.0771C27.6611 23.6618 27.4625 23.1653 27.4625 22.5875C27.4625 22.0097 27.6611 21.5222 28.0583 21.125C28.4736 20.7097 28.9701 20.5021 29.5479 20.5021C30.1438 20.5021 30.6403 20.7097 31.0375 21.125C31.4528 21.5222 31.6604 22.0097 31.6604 22.5875C31.6604 23.1653 31.4528 23.6618 31.0375 24.0771C30.6403 24.4743 30.1438 24.6729 29.5479 24.6729C28.9701 24.6729 28.4736 24.4743 28.0583 24.0771ZM27.2188 31.4167L28.0854 33.475L30.1979 31.3354L29.9 29.8458C29.4667 30.1528 29.0243 30.4326 28.5729 30.6854C28.1396 30.9382 27.6882 31.1819 27.2188 31.4167ZM36.8875 16.575C37.0139 18.7056 36.6708 20.7278 35.8583 22.6417C35.0458 24.5556 33.791 26.3611 32.0938 28.0583C32.0938 28.0764 32.0847 28.0944 32.0667 28.1125C32.0486 28.1125 32.0396 28.1215 32.0396 28.1396L32.5813 30.8479C32.6715 31.2451 32.6535 31.6424 32.5271 32.0396C32.4007 32.4187 32.1931 32.7528 31.9042 33.0417L28.5458 36.4271C28.2389 36.716 27.8688 36.8243 27.4354 36.7521C27.0201 36.6799 26.7313 36.4451 26.5688 36.0479L24.8625 32.0396L20.1229 27.3L16.1146 25.5938C15.6993 25.4312 15.4556 25.1424 15.3833 24.7271C15.3111 24.2937 15.4194 23.9236 15.7083 23.6167L19.1208 20.2312C19.3917 19.9424 19.7167 19.7437 20.0958 19.6354C20.4931 19.509 20.8903 19.491 21.2875 19.5812L24.0229 20.1229C24.041 20.1229 24.05 20.1139 24.05 20.0958C24.0681 20.0778 24.0771 20.0687 24.0771 20.0687C25.7924 18.3535 27.6069 17.0986 29.5208 16.3042C31.4347 15.5097 33.4569 15.1667 35.5875 15.275C35.75 15.2931 35.9035 15.3382 36.0479 15.4104C36.2104 15.4646 36.3458 15.5549 36.4542 15.6812C36.5806 15.8076 36.6799 15.9521 36.7521 16.1146C36.8243 16.259 36.8694 16.4125 36.8875 16.575ZM16.9813 30.3333C17.6493 29.6472 18.4618 29.3042 19.4188 29.3042C20.3757 29.2861 21.1972 29.6201 21.8833 30.3062C22.5514 30.9743 22.8764 31.7958 22.8583 32.7708C22.8583 33.7278 22.5243 34.5403 21.8563 35.2083C20.9535 36.1111 19.8701 36.6528 18.6063 36.8333C17.3604 37.0139 16.1146 37.1764 14.8688 37.3208C15.0132 36.075 15.1667 34.8292 15.3292 33.5833C15.5097 32.3194 16.0604 31.2361 16.9813 30.3333ZM18.6875 32.0125C18.3986 32.3194 18.2 32.6806 18.0917 33.0958C17.9833 33.5111 17.8931 33.9264 17.8208 34.3417C18.2361 34.2875 18.6514 34.2062 19.0667 34.0979C19.4819 33.9896 19.8431 33.7819 20.15 33.475C20.3486 33.2764 20.4569 33.0326 20.475 32.7437C20.4931 32.4549 20.3938 32.2021 20.1771 31.9854C19.9785 31.7868 19.7347 31.6965 19.4458 31.7146C19.1569 31.7146 18.9042 31.8139 18.6875 32.0125Z" fill="#2F4253"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Exposure</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Premium listings get featured placement, verified badges, and social media promotion — helping owners find tenants 5x faster than traditional portals.
            </p>
            <a href="#" className="cta-link inline-flex items-center text-gray-800 text-sm font-semibold gap-1">
              View Plans
              <svg className="cta-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Card 04 - Owner–Tenant Connection (dark green) */}
          <div className="why-card relative rounded-2xl p-8 overflow-hidden" style={{ backgroundColor: "#1e5c45" }}>
            <span className="watermark-num absolute top-5 right-6 text-7xl font-black text-white/10 select-none leading-none">04</span>
            <div className="card-icon-wrap w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center mb-6">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="52" height="52" rx="14" fill="white" fillOpacity="0.15"/>
                <path d="M20.5833 31.6333C19.0306 31.6333 17.7035 31.0826 16.6021 29.9812C15.5007 28.8799 14.95 27.5528 14.95 26C14.95 24.4472 15.5007 23.1201 16.6021 22.0187C17.7035 20.9174 19.0306 20.3667 20.5833 20.3667H23.6438C23.9868 20.3667 24.2667 20.484 24.4833 20.7187C24.7181 20.9535 24.8354 21.2424 24.8354 21.5854C24.8354 21.9104 24.7181 22.1903 24.4833 22.425C24.2667 22.6597 23.9868 22.7771 23.6438 22.7771H20.5833C19.6806 22.7771 18.9132 23.0931 18.2813 23.725C17.6674 24.3389 17.3604 25.0972 17.3604 26C17.3604 26.9028 17.6674 27.6701 18.2813 28.3021C18.9132 28.916 19.6806 29.2229 20.5833 29.2229H23.6438C23.9868 29.2229 24.2667 29.3403 24.4833 29.575C24.7181 29.8097 24.8354 30.0986 24.8354 30.4417C24.8354 30.7667 24.7181 31.0465 24.4833 31.2812C24.2667 31.516 23.9868 31.6333 23.6438 31.6333H20.5833ZM22.6417 27.1104C22.3347 27.1104 22.0729 27.0021 21.8563 26.7854C21.6396 26.5687 21.5313 26.3069 21.5313 26C21.5313 25.6931 21.6396 25.4312 21.8563 25.2146C22.0729 24.9979 22.3347 24.8896 22.6417 24.8896H29.3583C29.6653 24.8896 29.9271 24.9979 30.1438 25.2146C30.3604 25.4312 30.4688 25.6931 30.4688 26C30.4688 26.3069 30.3604 26.5687 30.1438 26.7854C29.9271 27.0021 29.6653 27.1104 29.3583 27.1104H22.6417ZM28.3563 31.6333C28.0132 31.6333 27.7243 31.516 27.4896 31.2812C27.2729 31.0465 27.1646 30.7667 27.1646 30.4417C27.1646 30.0986 27.2729 29.8097 27.4896 29.575C27.7243 29.3403 28.0132 29.2229 28.3563 29.2229H31.4167C32.3194 29.2229 33.0778 28.916 33.6917 28.3021C34.3236 27.6701 34.6396 26.9028 34.6396 26C34.6396 25.0972 34.3236 24.3389 33.6917 23.725C33.0778 23.0931 32.3194 22.7771 31.4167 22.7771H28.3563C28.0132 22.7771 27.7243 22.6597 27.4896 22.425C27.2729 22.1903 27.1646 21.9104 27.1646 21.5854C27.1646 21.2424 27.2729 20.9535 27.4896 20.7187C27.7243 20.484 28.0132 20.3667 28.3563 20.3667H31.4167C32.9694 20.3667 34.2965 20.9174 35.3979 22.0187C36.4993 23.1201 37.05 24.4472 37.05 26C37.05 27.5528 36.4993 28.8799 35.3979 29.9812C34.2965 31.0826 32.9694 31.6333 31.4167 31.6333H28.3563Z" fill="white"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Owner–Tenant Connection</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              Direct messaging, visit scheduling, and real-time availability — Rentit builds genuine connections between owners and tenants without any middlemen.
            </p>
            <a href="#" className="cta-link inline-flex items-center text-white text-sm font-semibold gap-1">
              How it works
              <svg className="cta-arrow w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}