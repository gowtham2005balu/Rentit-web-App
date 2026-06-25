import { useState } from "react";

const tabs = ["Tenants & Guests", "Property Owners", "PG / Hostels", "Agents"];

const directories = [
  {
    icon: "👤",
    title: "Finding Accommodation",
    links: [
      "Searching for properties",
      "Using smart filters",
      "Saving favourites",
      "Comparing listings",
      "AI property discovery",
      "Verified listings explained",
    ],
  },
  {
    icon: "📅",
    title: "Bookings",
    links: [
      "Booking process walkthrough",
      "Checking booking status",
      "Modifying a booking",
      "Cancellations & refunds",
      "Booking confirmation",
      "Visit scheduling",
    ],
  },
  {
    icon: "💳",
    title: "Payments",
    links: [
      "Accepted payment methods",
      "Refund process & timeline",
      "Failed payment troubleshoot",
      "Wallet credits & coupons",
      "Invoices & receipts",
      "Security deposits",
    ],
  },
  {
    icon: "👤",
    title: "Account",
    links: [
      "Updating profile settings",
      "Resetting your password",
      "Identity verification",
      "Notification preferences",
      "Linked accounts & login",
      "Deleting your account",
    ],
  },
  {
    icon: "🛡️",
    title: "Safety & Trust",
    links: [
      "Reporting abuse or scams",
      "Suspicious listing alerts",
      "User protection policies",
      "Community guidelines",
      "Safe payment practices",
    ],
  },
  {
    icon: "🏢",
    title: "Property Listing",
    links: [
      "How to list your property",
      "Adding photos & media",
      "Setting rent & availability",
      "Boosting your listing",
      "Premium plans & pricing",
      "Deleting or pausing a listing",
    ],
  },
];

export default function HelpDirectorySection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <p className="text-orange-500 text-xs font-semibold uppercase tracking-widest mb-2">
          ✦ All Topics
        </p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
          Help center directory
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Browse our full library of support articles and guides.
        </p>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200 mb-10">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                activeTab === i
                  ? "border-orange-400 text-orange-500"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Directory grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {directories.map((dir) => (
            <div key={dir.title}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-base">{dir.icon}</span>
                <h3 className="font-bold text-gray-900 text-sm">{dir.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {dir.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-gray-600 text-sm hover:text-orange-500 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
