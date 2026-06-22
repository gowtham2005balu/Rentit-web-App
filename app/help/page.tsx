"use client";

import React, { useState } from 'react';
import RentitNavbar from '@/components/home-new/navbar';

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I upgrade my listing to Premium?",
      answer: "Go to your listing, click 'Go Premium', choose a plan and complete payment. Your listing will be highlighted within minutes with a verified badge and priority placement in search results."
    },
    {
      question: "How do Premium Plans work?",
      answer: "Premium plans give your listings more visibility by featuring them at the top of search results and highlighting them with a premium badge."
    },
    {
      question: "How can I edit my property listing?",
      answer: "You can edit your property listing by going to My Listings in your dashboard, selecting the property you want to edit, and clicking the Edit button."
    },
    {
      question: "How can I contact interested tenants?",
      answer: "When a tenant shows interest, you will receive an enquiry in your Notifications or Chat section where you can reply directly."
    },
    {
      question: "Why is my listing showing as incomplete?",
      answer: "Your listing might be missing essential details like photos, complete address, or contact information. Please review and update it."
    },
    {
      question: "How do I get a refund for a payment?",
      answer: "To request a refund, please contact our support team within 7 days of the payment with your invoice number and reason for the refund."
    }
  ];

  const categories = [
    { title: "Listing", count: "24 articles", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
    { title: "Premium Plans", count: "12 articles", icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" },
    { title: "Payments", count: "9 articles", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
    { title: "Enquiries", count: "15 articles", icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
    { title: "Account", count: "11 articles", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
    { title: "Technical", count: "7 articles", icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }
  ];

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <RentitNavbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 z-0"></div>
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-orange-500 rounded-full blur-[100px] opacity-20 z-0"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-orange-400 rounded-full blur-[100px] opacity-20 z-0"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-white/10 text-orange-400 font-bold text-sm tracking-widest rounded-full mb-6 border border-white/20">
            SUPPORT CENTER
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            How can we help you today?
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
            Search our knowledge base or browse categories below to find exactly what you're looking for.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8 group">
            <div className="absolute inset-0 bg-orange-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            <div className="relative flex items-center bg-white p-2 rounded-2xl shadow-xl">
              <svg className="w-6 h-6 text-slate-400 ml-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-2 py-3 bg-transparent border-none outline-none text-slate-900 text-lg placeholder-slate-400" 
                placeholder="Search for answers, guides, FAQs..." 
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md">
                Search
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {["How to list a property?", "Premium plans explained", "Edit my listing", "Payment issues"].map((tag, idx) => (
              <span key={idx} className="text-sm text-slate-300 hover:text-white cursor-pointer px-4 py-2 rounded-full border border-slate-700 hover:border-orange-500 hover:bg-white/5 transition-all">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-16">
        
        {/* Browse by Category */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-slate-900">Browse by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-100 transition-all">
                  <svg className="w-7 h-7 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-orange-500 transition-colors">{cat.title}</h3>
                <p className="text-slate-500 text-sm font-medium">{cat.count}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Section: FAQs & Contact */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* FAQs */}
          <div className="lg:col-span-8">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Popular FAQs</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`bg-white border transition-all rounded-2xl overflow-hidden ${openFaq === index ? 'border-orange-200 shadow-md ring-4 ring-orange-50' : 'border-slate-200 hover:border-slate-300 shadow-sm'}`}
                >
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                  >
                    <h3 className={`text-lg font-bold pr-8 ${openFaq === index ? 'text-orange-600' : 'text-slate-800'}`}>
                      {faq.question}
                    </h3>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${openFaq === index ? 'bg-orange-100 text-orange-600 rotate-180' : 'bg-slate-100 text-slate-400'}`}>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {openFaq === index ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        )}
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-48 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact & Guides */}
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-3xl font-black text-slate-900 mb-8">Get in Touch</h2>
            
            {/* Phone Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-xl text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-1">Call Support</h3>
              <p className="text-2xl font-black text-orange-400 mb-2">1800-XXX-XXXX</p>
              <p className="text-slate-400 text-sm mb-6">Mon-Sat, 9 AM - 9 PM</p>
              <button className="w-full py-3 bg-white text-slate-900 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-colors">
                Call Now
              </button>
            </div>

            {/* Email Card */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
              <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1">Email Support</h3>
              <p className="text-lg font-bold text-slate-700 mb-2">support@huzzler.in</p>
              <p className="text-slate-500 text-sm mb-6">Response within 24 hours</p>
              <button className="w-full py-3 bg-orange-50 text-orange-600 font-bold rounded-xl hover:bg-orange-500 hover:text-white transition-colors">
                Email Us
              </button>
            </div>

            {/* Quick Guides */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm mt-8">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Quick Guides</h3>
              <div className="space-y-4">
                {["Getting Started Guide", "How to Boost Listings", "Premium Plan Comparison"].map((guide, idx) => (
                  <div key={idx} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-700 group-hover:text-orange-500 transition-colors">{guide}</span>
                    <svg className="w-5 h-5 text-slate-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </section>

      </main>
    </div>
  );
}
