"use client";

import { useState } from "react";

const faqs = [
  {
    question: "How does Rentit work?",
    answer:
      "Rentit is a zero-brokerage property platform. Tenants can search for verified properties, chat directly with owners, and schedule visits — all without any middlemen. Property owners can list their properties for free and optionally boost visibility with Premium plans.",
  },
  {
    question: "Are listings on Rentit verified?",
    answer:
      'Yes. Every listing on Rentit goes through a verification process by our team. We confirm the property details, photos, and availability before the listing goes live. Verified listings show a green "Verified" badge.',
  },
  {
    question: "Can I contact property owners directly?",
    answer:
      "Absolutely. Rentit is built for direct owner–tenant communication. Once you find a property you like, you can message the owner directly through our in-app chat with zero brokerage fees.",
  },
  {
    question: "What is Rentit Premium?",
    answer:
      "Rentit Premium is a paid visibility booster for property owners. Premium plans include Featured Listing placement, Verified Badge, Facebook & Google Ads promotion, and analytics dashboards — helping you rent out faster and with more credibility.",
  },
  {
    question: "How does AI property discovery work?",
    answer:
      'You simply describe what you\'re looking for in plain language — like "furnished 2BHK near metro under ₹20,000 in Velachery" — and Rentit AI automatically extracts the relevant filters and ranks the best matching properties for you instantly.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="bg-gray-50 py-20 px-4 font-sans">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-orange-500 text-xs font-bold tracking-widest uppercase">● FAQ</span>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-3 leading-tight">
            Questions? We've got<br />answers.
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-5 text-left"
                onClick={() => toggle(i)}
              >
                <span className="text-sm font-bold text-gray-900 pr-4">{faq.question}</span>
                <span className={`flex-shrink-0 w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center transition-transform duration-200 ${openIndex === i ? "rotate-180" : ""}`}>
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>

              {openIndex === i && (
                <div className="px-6 pb-5">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* View all FAQs */}
        <div className="flex justify-center mt-10">
          <button className="inline-flex items-center gap-1.5 border border-gray-300 rounded-full px-5 py-2.5 text-sm font-semibold text-gray-700 hover:border-gray-500 transition-colors bg-white">
            View all FAQs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
