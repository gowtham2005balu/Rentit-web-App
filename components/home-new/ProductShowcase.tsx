"use client";


import { useState } from "react";

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="flex-shrink-0 mt-0.5"
  >
    <path
      d="M7.11667 8.36667L6.36667 7.63333C6.21111 7.47778 6.02778 7.4 5.81667 7.4C5.61667 7.4 5.43333 7.47778 5.26667 7.63333C5.11111 7.78889 5.03333 7.97222 5.03333 8.18333C5.03333 8.39444 5.11667 8.58333 5.28333 8.75L6.55 10.0167C6.71667 10.1833 6.90556 10.2667 7.11667 10.2667C7.33889 10.2667 7.53333 10.1833 7.7 10.0167L10.6667 7.03333C10.8333 6.87778 10.9167 6.69444 10.9167 6.48333C10.9167 6.27222 10.8333 6.08889 10.6667 5.93333C10.5111 5.77778 10.3278 5.7 10.1167 5.7C9.91667 5.7 9.73889 5.77778 9.58333 5.93333L7.11667 8.36667ZM8 14.7167C7.06667 14.7167 6.19444 14.5444 5.38333 14.2C4.57222 13.8444 3.86111 13.3611 3.25 12.75C2.63889 12.1389 2.15556 11.4278 1.8 10.6167C1.45556 9.80556 1.28333 8.93333 1.28333 8C1.28333 7.05556 1.45556 6.18333 1.8 5.38333C2.15556 4.57222 2.63889 3.86111 3.25 3.25C3.86111 2.63889 4.57222 2.16111 5.38333 1.81667C6.19444 1.46111 7.06667 1.28333 8 1.28333C8.94444 1.28333 9.81667 1.46111 10.6167 1.81667C11.4278 2.16111 12.1389 2.63889 12.75 3.25C13.3611 3.86111 13.8389 4.57222 14.1833 5.38333C14.5389 6.18333 14.7167 7.05556 14.7167 8C14.7167 8.93333 14.5389 9.80556 14.1833 10.6167C13.8389 11.4278 13.3611 12.1389 12.75 12.75C12.1389 13.3611 11.4278 13.8444 10.6167 14.2C9.81667 14.5444 8.94444 14.7167 8 14.7167ZM8 13.0833C9.42222 13.0833 10.6222 12.5944 11.6 11.6167C12.5889 10.6278 13.0833 9.42222 13.0833 8C13.0833 6.57778 12.5889 5.37778 11.6 4.4C10.6222 3.41111 9.42222 2.91667 8 2.91667C6.57778 2.91667 5.37222 3.41111 4.38333 4.4C3.40556 5.37778 2.91667 6.57778 2.91667 8C2.91667 9.42222 3.40556 10.6278 4.38333 11.6167C5.37222 12.5944 6.57778 13.0833 8 13.0833Z"
      fill="#10B981"
    />
  </svg>
);
const LocationIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9.6125C6.99167 8.72083 7.7375 7.9 8.2375 7.15C8.74583 6.4 9 5.72917 9 5.1375C9 4.2625 8.7125 3.5375 8.1375 2.9625C7.57083 2.3875 6.85833 2.1 6 2.1C5.14167 2.1 4.425 2.3875 3.85 2.9625C3.28333 3.5375 3 4.2625 3 5.1375C3 5.72917 3.25 6.4 3.75 7.15C4.25833 7.9 5.00833 8.72083 6 9.6125ZM6 10.5125C5.89167 10.5125 5.7875 10.4958 5.6875 10.4625C5.59583 10.4208 5.50417 10.3625 5.4125 10.2875C5.07917 9.99583 4.71667 9.65417 4.325 9.2625C3.94167 8.87083 3.58333 8.45 3.25 8C2.91667 7.55 2.64167 7.08333 2.425 6.6C2.20833 6.10833 2.1 5.62083 2.1 5.1375C2.1 4.02083 2.47083 3.0875 3.2125 2.3375C3.95417 1.57917 4.88333 1.2 6 1.2C7.10833 1.2 8.03333 1.57917 8.775 2.3375C9.525 3.0875 9.9 4.02083 9.9 5.1375C9.9 5.62083 9.7875 6.10833 9.5625 6.6C9.34583 7.09167 9.07083 7.5625 8.7375 8.0125C8.4125 8.4625 8.05417 8.88333 7.6625 9.275C7.27917 9.65833 6.92083 9.99583 6.5875 10.2875C6.49583 10.3625 6.4 10.4208 6.3 10.4625C6.20833 10.4958 6.10833 10.5125 6 10.5125ZM6 6C6.25 6 6.4625 5.9125 6.6375 5.7375C6.8125 5.5625 6.9 5.35 6.9 5.1C6.9 4.85 6.8125 4.6375 6.6375 4.4625C6.4625 4.2875 6.25 4.2 6 4.2C5.75 4.2 5.5375 4.2875 5.3625 4.4625C5.1875 4.6375 5.1 4.85 5.1 5.1C5.1 5.35 5.1875 5.5625 5.3625 5.7375C5.5375 5.9125 5.75 6 6 6Z"
      fill="#D97706"
    />
  </svg>
);
const ArrowIcon = () => (
  <svg className="w-4 h-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
  </svg>
);

// Mock UI: Property Listings Card
const ListingsUI = () => (
 <div
  className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
  style={{
    width: "480px",
    minHeight: "555px",
  }}
>
    {/* Browser bar */}
     <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-2">
      <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
    <div className="ml-3 w-[420px] bg-white rounded-md px-3 py-1 border border-gray-200">
  <p className="text-xs text-gray-400 text-left">
    rentit.in/search
  </p>
</div>
    </div>
    {/* Filter tabs */}
    <div className="px-5 py-4 flex items-center gap-3">
      {["All", "2BHK", "Near Metro", "Under ₹22k", "Verified"].map((tab, i) => (
        <span key={tab} className={`text-xs px-3 py-1 rounded-full whitespace-nowrap font-medium ${i === 0 ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600"}`}>{tab}</span>
      ))}
    </div>
    {/* Listing cards */}
    <div
      className="flex flex-col"
      style={{
        padding: "20px 20px 30px 20px",
        gap: "10px",
      }}
    >
      {/* Card 1 */}
      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <div
          className="h-[110px] relative flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/sim_prop_1.png')",
          }}
        >
        </div>
        <div className="p-3">
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
  <LocationIcon />
  <span>Adyar, Chennai · 1,850 sqft · Owner Direct</span>
</div>
          
          <p className="text-green-600 font-bold text-[14px] mt-1">₹40,000 <span className="text-xs font-normal text-gray-400">/month</span></p>
          <div className="flex flex-wrap gap-2 mt-1.5">
            <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">✓ Verified</span>
            <span className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">Semi Furnished</span>
            <span className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">Parking</span>
          </div>
        </div>
      </div>
      {/* Card 2 */}
      <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
        <div
          className="h-[110px] relative flex items-center justify-center bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/sim_prop_2.png')",
          }}
        >
        </div>
        <div className="p-3">
          <p className="text-[13px] font-bold text-gray-900">2BHK Flatmate — Anna Nagar West</p>
          <div className="flex items-center gap-1 text-[11px] text-gray-400 mt-0.5">
  <LocationIcon />
  <span>Anna Nagar, Chennai · 1,100 sqft </span>
</div>
          <p className="text-green-600 font-bold text-[14px] mt-1">₹9,500 <span className="text-xs font-normal text-gray-400">/month</span></p>
          <div className="flex gap-2 mt-1.5">
           <span className="text-xs whitespace-nowrap bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">✓ Verified</span>
            <span className="text-xs whitespace-nowrap bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">
  Zero Brokerage
</span>
            
          </div>
        </div>
      </div> 
    </div>
  </div>
);

// Mock UI: Chat Window
const ChatUI = () => (
  <div
    className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
    style={{
      width: "560px",
      height: "530px",
    }}
  >
    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
      <div className="ml-3 flex-1 bg-white rounded-md px-3 py-1 border border-gray-200">
  <p className="text-xs text-gray-400">
    rentit.in/messages
  </p>
</div>
    </div>
    {/* Chat header */}
    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
      <div className="w-8 h-8 rounded-full bg-[#2F4253] flex items-center justify-center text-white text-xs font-bold">RK</div>
      <div>
        <p className="text-sm font-semibold text-gray-900">Rajesh Kumar <span className="ml-1 text-xs bg-green-100 text-green-500 px-1.5 py-0.5 rounded-full">Owner</span></p>
        <p className="text-xs text-green-500 font-medium">
● Online
</p>
      </div>
    </div>
    <div className="px-4 py-2 border-b border-gray-100 bg-[#F1F5F9]">
  <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3.85 10.85H5.25V7.875C5.25 7.72917 5.29861 7.60764 5.39583 7.51042C5.50278 7.40347 5.62917 7.35 5.775 7.35H8.225C8.37083 7.35 8.49236 7.40347 8.58958 7.51042C8.69653 7.60764 8.75 7.72917 8.75 7.875V10.85H10.15V5.775L7 3.4125L3.85 5.775V10.85ZM2.8 10.675V5.775C2.8 5.60972 2.83403 5.45417 2.90208 5.30833C2.97986 5.1625 3.08681 5.03611 3.22292 4.92917L6.37292 2.56667C6.56736 2.43055 6.77639 2.3625 7 2.3625C7.22361 2.3625 7.43264 2.43055 7.62708 2.56667L10.7771 4.92917C10.9132 5.03611 11.0153 5.1625 11.0833 5.30833C11.1611 5.45417 11.2 5.60972 11.2 5.775V10.675C11.2 11.0153 11.0785 11.3069 10.8354 11.55C10.6021 11.7833 10.3153 11.9 9.975 11.9H8.225C8.07917 11.9 7.95278 11.8514 7.84583 11.7542C7.74861 11.6472 7.7 11.5208 7.7 11.375V8.4H6.3V11.375C6.3 11.5208 6.24653 11.6472 6.13958 11.7542C6.04236 11.8514 5.92083 11.9 5.775 11.9H4.025C3.68472 11.9 3.39306 11.7833 3.15 11.55C2.91667 11.3069 2.8 11.0153 2.8 10.675Z" fill="#94A3B8"/>
</svg>2 BHK Apartment, Sholinganallur
  </p>
  <p className="ml-[20px] text-xs text-gray-400">
         ₹14,000 • 2 months deposit
  </p>
</div>
    {/* Messages */}
    <div className="px-4 py-3 flex flex-col gap-2.5 bg-white min-h-[320px]">
      <div className="self-end">
        <div className="bg-[#2F4253] text-white text-xs rounded-xl rounded-tr-sm px-3 py-2 max-w-[320px]">
          Hi Rajesh, I saw your 2BHK listing. Is it still available?
        </div>
        <p className="text-right text-gray-400 text-[10px] mt-0.5">10:12 AM</p>
      </div>
      <div className="self-start">
        <div className="bg-[#F1F5F9] border border-gray-200 text-gray-800 text-xs rounded-xl rounded-tl-sm px-3 py-2 max-w-[320px]">
          Yes, it's available! Fully furnished with modular kitchen and 24/7 water supply.
        </div>
        <p className="text-gray-400 text-[10px] mt-0.5">10:15 AM</p>
      </div>
      <div className="self-end">
        <div className="bg-[#2F4253] text-white text-xs rounded-xl rounded-tr-sm px-3 py-2 max-w-[320px]">
          Great! What floor is it on? And is there a lift?
        </div>
        <p className="text-right text-gray-400 text-[10px] mt-0.5">10:16 AM</p>
      </div>
      <div className="self-start">
        <div className="bg-[#F1F5F9] border border-gray-200 text-gray-800 text-xs rounded-xl rounded-tl-sm px-3 py-2 max-w-[320px]">
          3rd floor. Yes, there's a lift. Building has security and CCTV as well.
        </div>
        <p className="text-gray-400 text-[10px] mt-0.5">10:18 AM</p>
      </div>
    </div>
    <div className="px-4 py-3 border-t border-gray-200 flex gap-3 flex-wrap">
  {["When can I visit?", "Is negotiation possible?", "Any brokerage?"].map(q => (
    <button
      key={q}
      className="
        h-8
        px-4
        text-[11px]
        font-medium
        bg-[#F8FAFC]
        border
        border-[#E2E8F0]
        text-[#64748B]
        rounded-full
        whitespace-nowrap
      "
    >
      {q}
    </button>
  ))}
</div>
  </div>
);

// Mock UI: Owner Dashboard
const DashboardUI = () => (
  <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden w-[526px]">
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-1.5">
      <span className="w-3 h-3 rounded-full bg-red-400 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-yellow-400 inline-block"></span>
      <span className="w-3 h-3 rounded-full bg-green-400 inline-block"></span>
     <div className="ml-3 flex-1 text-xs text-gray-400 bg-white rounded-md px-3 py-1 border border-gray-200">
  rentit.in/search
</div>
    </div>
    <div className="p-4">
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[
          { label: "Active Listings", value: "8", sub: "+2 this week", color: "text-gray-900" },
          { label: "New Enquiries", value: "24", sub: "+18%", color: "text-blue-600" },
          { label: "Profile Views", value: "156", sub: "+42%", color: "text-gray-900" },
          { label: "Response Rate", value: "92%", sub: "Excellent", color: "text-green-600" },
        ].map(stat => (
          <div key={stat.label} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
            <p className="text-[10px] text-gray-400 font-medium">{stat.label}</p>
            <p className={`text-2xl font-bold mt-0.5 ${stat.color}`}>{stat.value}</p>
            <p className="text-[10px] text-green-500 font-medium">{stat.sub}</p>
          </div>
        ))}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-700 mb-2">Recent Enquiries</p>
        <div className="flex flex-col gap-2">
          {[
            { name: "Priya Sharma", detail: "2BHK · Anna Nagar (View 3)", time: "7m ago", color: "bg-[#EF4444]" },
            { name: "Rahul Kumar", detail: "3BHK · Adyar (View 5)", time: "30m ago", color: "bg-[#2563EB]" },
          ].map(e => (
            <div key={e.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full ${e.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                  {e.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800">{e.name}</p>
                  <p className="text-[10px] text-gray-400">{e.detail}</p>
                </div>
              </div>
              <span className="text-[10px] text-gray-400">{e.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default function ProductShowcase() {
  return (
    <section className="bg-[#F8F9FB] py-32">
  <div className="max-w-[1440px] mx-auto px-20">
        {/* Header */}
        <div className="text-center mb-36">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">✦ Product</span>
          <h2
  className="
  text-[72px]
  leading-[78px]
  font-black
  text-[#0F172A]
"
>
            Built for the way people<br />actually find homes.
          </h2>
        </div>

        {/* Section 1: Search smarter */}
        <div className="grid grid-cols-2 gap-28 items-center">
          <div className="flex-1 order-2 lg:order-1">
         <div
  className="
    inline-flex
    items-center
    gap-2
    px-4
    h-8
    rounded-full
    bg-[#EEF2F7]
  "
>  
  

 
  

  <span>
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.06042 9.30417L7.72917 8.61875C7.95278 8.56042 8.14236 8.45347 8.29792 8.29792C8.45347 8.14236 8.56042 7.95278 8.61875 7.72917L9.30417 5.06042C9.33333 4.95347 9.30417 4.86111 9.21667 4.78333C9.13889 4.69583 9.04653 4.66667 8.93958 4.69583L6.27083 5.38125C6.04722 5.43958 5.85764 5.54653 5.70208 5.70208C5.54653 5.85764 5.43958 6.04722 5.38125 6.27083L4.69583 8.93958C4.66667 9.04653 4.69097 9.14375 4.76875 9.23125C4.85625 9.30903 4.95347 9.33333 5.06042 9.30417ZM7 7.62708C6.825 7.63681 6.67431 7.57847 6.54792 7.45208C6.43125 7.32569 6.37292 7.175 6.37292 7C6.37292 6.825 6.43125 6.67917 6.54792 6.5625C6.67431 6.43611 6.825 6.37292 7 6.37292C7.175 6.37292 7.32083 6.43611 7.4375 6.5625C7.56389 6.67917 7.62708 6.825 7.62708 7C7.62708 7.175 7.56389 7.32569 7.4375 7.45208C7.32083 7.56875 7.175 7.62708 7 7.62708ZM7 12.7167C6.2125 12.7167 5.46875 12.5708 4.76875 12.2792C4.07847 11.9778 3.47083 11.5694 2.94583 11.0542C2.43056 10.5292 2.02222 9.92153 1.72083 9.23125C1.42917 8.53125 1.28333 7.7875 1.28333 7C1.28333 6.20278 1.42917 5.45903 1.72083 4.76875C2.02222 4.07847 2.43056 3.47569 2.94583 2.96042C3.47083 2.43542 4.07847 2.02708 4.76875 1.73542C5.46875 1.43403 6.2125 1.28333 7 1.28333C7.79722 1.28333 8.54097 1.43403 9.23125 1.73542C9.92153 2.02708 10.5243 2.43542 11.0396 2.96042C11.5646 3.47569 11.9729 4.08333 12.2646 4.78333C12.566 5.47361 12.7167 6.2125 12.7167 7C12.7167 7.7875 12.566 8.53125 12.2646 9.23125C11.9729 9.92153 11.5646 10.5292 11.0396 11.0542C10.5243 11.5694 9.91667 11.9778 9.21667 12.2792C8.52639 12.5708 7.7875 12.7167 7 12.7167ZM7 11.5062C8.25417 11.5062 9.31875 11.0687 10.1938 10.1937C11.0688 9.31875 11.5063 8.25417 11.5063 7C11.5063 5.74583 11.0688 4.68125 10.1938 3.80625C9.31875 2.93125 8.25417 2.49375 7 2.49375C5.74583 2.49375 4.68125 2.93125 3.80625 3.80625C2.93125 4.68125 2.49375 5.74583 2.49375 7C2.49375 8.25417 2.93125 9.31875 3.80625 10.1937C4.68125 11.0687 5.74583 11.5062 7 11.5062Z" fill="#2F4253"/>
</svg>

  </span>

  <span className="text-xs font-semibold text-gray-800 uppercase tracking-widest">
    Discover Properties
  </span>
</div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 leading-tight">
              Search smarter,<br />not harder.
            </h3>
            <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-md">
              Intelligent filters, real-time availability, and AI-ranked results mean you find the right property in minutes — not weeks.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {[
                "40+ smart filters including metro distance & lifestyle",
                "AI-ranked results based on your preferences",
                "Real-time availability — no outdated listings",
                "High-quality photos from every verified listing",
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <button className="mt-7 inline-flex items-center bg-gray-900 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-gray-700 transition-colors">
              See all listings <ArrowIcon />
            </button>
          </div>
          <div className="flex-1 flex justify-center order-1 lg:order-2">
            <ListingsUI />
          </div>
        </div>

        {/* Section 2: Talk directly */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-28">
          <div className="flex-1 flex justify-center">
            <ChatUI />
          </div>
          <div className="flex-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-4 h-4 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-[9px]">💬</span>
              Chat With Owners
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 leading-tight">
              Talk directly.Move faster.
            </h3>
            <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-md">
              No brokers in the middle. Chat with property owners directly, ask questions, negotiate, and schedule visits — all in one place.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {[
                "Direct owner messaging — no intermediaries",
                "Smart quick-reply suggestions",
                "Schedule visits directly from chat",
                "Property details always visible in conversation",
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <button className="
  mt-7
  inline-flex
  items-center
  gap-2
  bg-[#243447]
  text-white
  text-sm
  font-semibold
  px-6
  h-12
  rounded-xl
">
              See messaging <ArrowIcon />
            </button>
          </div>
        </div>

        {/* Section 3: Own properties */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 order-2 lg:order-1">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-4 h-4 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center text-[9px]"><svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.7763 2.34775V0.58317C5.7763 0.417892 5.83464 0.281781 5.9513 0.174837C6.06797 0.05817 6.20894 -0.000163317 6.37422 -0.000163317H9.61172C9.78672 -0.000163317 9.92769 0.05817 10.0346 0.174837C10.1513 0.281781 10.2096 0.417892 10.2096 0.58317V2.34775C10.2096 2.52275 10.1513 2.66859 10.0346 2.78525C9.92769 2.90192 9.79158 2.96025 9.6263 2.96025H6.37422C6.19922 2.96025 6.05339 2.90192 5.93672 2.78525C5.82977 2.66859 5.7763 2.52275 5.7763 2.34775ZM0.00130215 5.30817V0.58317C0.00130215 0.417892 0.0596355 0.281781 0.176302 0.174837C0.292969 0.05817 0.433941 -0.000163317 0.599219 -0.000163317H3.83672C4.002 -0.000163317 4.14297 0.05817 4.25964 0.174837C4.3763 0.281781 4.43464 0.417892 4.43464 0.58317V5.30817C4.43464 5.46373 4.3763 5.59984 4.25964 5.7165C4.14297 5.83317 4.002 5.8915 3.83672 5.8915H0.599219C0.433941 5.8915 0.292969 5.83317 0.176302 5.7165C0.0596355 5.59984 0.00130215 5.46373 0.00130215 5.30817ZM5.7763 9.59567V4.91442C5.7763 4.73942 5.83464 4.59359 5.9513 4.47692C6.06797 4.36025 6.20894 4.30192 6.37422 4.30192H9.61172C9.78672 4.30192 9.92769 4.36025 10.0346 4.47692C10.1513 4.59359 10.2096 4.73942 10.2096 4.91442V9.59567C10.2096 9.77067 10.1513 9.9165 10.0346 10.0332C9.92769 10.1498 9.79158 10.2082 9.6263 10.2082H6.37422C6.19922 10.2082 6.05339 10.1498 5.93672 10.0332C5.82977 9.9165 5.7763 9.77067 5.7763 9.59567ZM0.00130215 9.59567V7.8165C0.00130215 7.65123 0.0596355 7.51511 0.176302 7.40817C0.292969 7.2915 0.433941 7.23317 0.599219 7.23317H3.83672C4.002 7.23317 4.14297 7.2915 4.25964 7.40817C4.3763 7.51511 4.43464 7.65123 4.43464 7.8165V9.59567C4.43464 9.77067 4.3763 9.9165 4.25964 10.0332C4.14297 10.1498 4.002 10.2082 3.83672 10.2082H0.599219C0.433941 10.2082 0.292969 10.1498 0.176302 10.0332C0.0596355 9.9165 0.00130215 9.77067 0.00130215 9.59567ZM1.21172 4.68109H3.22422V1.21025H1.21172V4.68109ZM6.98672 8.99775H8.99922V5.51234H6.98672V8.99775ZM6.98672 1.76442H8.99922V1.21025H6.98672V1.76442ZM1.21172 8.99775H3.22422V8.44359H1.21172V8.99775Z" fill="#D97706"/>
</svg>
</span>
              Manage Listings
            </span>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mt-3 leading-tight">
              Own properties?<br />List in minutes.
            </h3>
            <p className="text-gray-500 mt-4 text-base leading-relaxed max-w-md">
              A powerful owner dashboard to manage all your properties, track enquiries, respond to tenants, and boost visibility — without any brokerage.
            </p>
            <ul className="mt-5 flex flex-col gap-2.5">
              {[
                "Post unlimited listings for free",
                "Real-time enquiry notifications",
                "Analytics — visits, responses, conversion",
                "Premium plans for faster occupancy",
              ].map(item => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
                  <CheckIcon />
                  {item}
                </li>
              ))}
            </ul>
            <button className="
   mt-7

    inline-flex

    items-center

    justify-center

    gap-2

    bg-[#F97316]

    text-white

    text-sm

    font-semibold

    px-6

    h-12

    rounded-xl

  "
>  <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.82708 9.17292V11.2625C7.82708 11.4514 7.89201 11.6108 8.02188 11.7406C8.15174 11.8705 8.31111 11.9354 8.5 11.9354C8.68889 11.9354 8.84826 11.8705 8.97813 11.7406C9.10799 11.6108 9.17292 11.4514 9.17292 11.2625V9.17292H11.2625C11.4514 9.17292 11.6108 9.10799 11.7406 8.97812C11.8705 8.84826 11.9354 8.68889 11.9354 8.5C11.9354 8.31111 11.8705 8.15174 11.7406 8.02187C11.6108 7.89201 11.4514 7.82708 11.2625 7.82708H9.17292V5.7375C9.17292 5.54861 9.10799 5.38924 8.97813 5.25937C8.84826 5.12951 8.68889 5.06458 8.5 5.06458C8.31111 5.06458 8.15174 5.12951 8.02188 5.25937C7.89201 5.38924 7.82708 5.54861 7.82708 5.7375V7.82708H5.7375C5.54861 7.82708 5.38924 7.89201 5.25938 8.02187C5.12951 8.15174 5.06458 8.31111 5.06458 8.5C5.06458 8.68889 5.12951 8.84826 5.25938 8.97812C5.38924 9.10799 5.54861 9.17292 5.7375 9.17292H7.82708ZM8.5 15.4417C7.54375 15.4417 6.64063 15.2646 5.79063 14.9104C4.95243 14.5444 4.21458 14.0486 3.57708 13.4229C2.95139 12.7854 2.45556 12.0476 2.08958 11.2094C1.73542 10.3594 1.55833 9.45625 1.55833 8.5C1.55833 7.53194 1.73542 6.62882 2.08958 5.79062C2.45556 4.95243 2.95139 4.22049 3.57708 3.59479C4.21458 2.95729 4.95243 2.46146 5.79063 2.10729C6.64063 1.74132 7.54375 1.55833 8.5 1.55833C9.46806 1.55833 10.3712 1.74132 11.2094 2.10729C12.0476 2.46146 12.7795 2.95729 13.4052 3.59479C14.0427 4.22049 14.5385 4.95833 14.8927 5.80833C15.2587 6.64653 15.4417 7.54375 15.4417 8.5C15.4417 9.45625 15.2587 10.3594 14.8927 11.2094C14.5385 12.0476 14.0427 12.7854 13.4052 13.4229C12.7795 14.0486 12.0417 14.5444 11.1917 14.9104C10.3535 15.2646 9.45625 15.4417 8.5 15.4417ZM8.5 13.9719C10.0229 13.9719 11.3156 13.4406 12.3781 12.3781C13.4406 11.3156 13.9719 10.0229 13.9719 8.5C13.9719 6.97708 13.4406 5.68437 12.3781 4.62187C11.3156 3.55937 10.0229 3.02812 8.5 3.02812C6.97708 3.02812 5.68438 3.55937 4.62188 4.62187C3.55938 5.68437 3.02813 6.97708 3.02813 8.5C3.02813 10.0229 3.55938 11.3156 4.62188 12.3781C5.68438 13.4406 6.97708 13.9719 8.5 13.9719Z" fill="white"/>
</svg>
  Post Your Property Free
</button>
             
       
          </div>
          <div className="flex-1 flex justify-center order-1 lg:order-2">
            <DashboardUI />
          </div>
        </div>
      </div>
    </section>
  );
}
