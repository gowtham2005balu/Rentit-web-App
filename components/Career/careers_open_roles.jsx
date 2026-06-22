"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CareersOpenRoles() {
  const router = useRouter();
  const [selectedJob, setSelectedJob] = useState(null);

  const departments = [
    {
      name: "DESIGN",
      roles: [
        { title: "Senior Product Designer", tag: "Design", location: "Remote / Chennai", type: "Full-time" },
        { title: "UX Researcher", tag: "Design", location: "Remote", type: "Full-time" },
      ],
    },
    {
      name: "ENGINEERING",
      roles: [
        { title: "Senior Frontend Engineer", tag: "Engineering", location: "Remote / Chennai", type: "Full-time" },
        { title: "Backend Engineer — Platform", tag: "Engineering", location: "Remote", type: "Full-time" },
        { title: "AI / ML Engineer", tag: "Engineering", location: "Remote / Bangalore", type: "Full-time" },
        { title: "Data Analyst", tag: "Engineering", location: "Remote", type: "Full-time" },
      ],
    },
    {
      name: "PRODUCT",
      roles: [
        { title: "Product Manager — Discovery", tag: "Product", location: "Chennai", type: "Full-time" },
        { title: "Product Manager — Growth", tag: "Product", location: "Remote / Bangalore", type: "Full-time" },
      ],
    },
    {
      name: "MARKETING",
      roles: [
        { title: "Growth Marketing Manager", tag: "Marketing", location: "Remote / Chennai", type: "Full-time" },
        { title: "Content Strategist", tag: "Marketing", location: "Remote", type: "Part-time" },
      ],
    },
    {
      name: "SALES & CUSTOMER SUCCESS",
      roles: [
        { title: "Sales Executive — Property Owners", tag: "Sales", location: "Chennai / Bangalore", type: "Full-time" },
        { title: "Customer Success Specialist", tag: "Customer Success", location: "Remote", type: "Full-time" },
      ],
    },
  ];

  return (
    <section id="open-roles" className="w-full font-sans relative px-6 md:px-12 lg:px-24 py-12 md:py-20" style={{ background: "#ffffff" }}>
      <div className="flex flex-col items-center text-center mb-14">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-full" style={{ width: "8px", height: "8px", background: "#F59E0B" }} />
          <span className="text-xs font-bold tracking-widest" style={{ color: "#F59E0B", letterSpacing: "0.14em" }}>OPEN ROLES</span>
        </div>
        <h2 className="font-black mb-4" style={{ fontSize: "48px", color: "#1a2e4a", lineHeight: "1.1" }}>Join us in building something important</h2>
        <p style={{ color: "#6b7280", fontSize: "16px", maxWidth: "480px" }}>
          We're a small, high-output team. Every person we add must make us significantly better. Find the role that fits you.
        </p>
      </div>

      <div className="flex flex-col gap-10" style={{ maxWidth: "820px", margin: "0 auto" }}>
        {departments.map((dept, di) => (
          <div key={di}>
            {/* Dept header */}
            <div className="pb-3 mb-0" style={{ borderBottom: "1px solid #e5e7eb" }}>
              <span className="text-xs font-bold tracking-widest" style={{ color: "#9ca3af", letterSpacing: "0.1em" }}>{dept.name}</span>
            </div>
            {/* Roles */}
            {dept.roles.map((role, ri) => (
              <div
                key={ri}
                className="flex items-center py-5 hover:bg-gray-50 transition-colors rounded-lg px-2 -mx-2"
                style={{ borderBottom: "1px solid #f3f4f6" }}
              >
                {/* Title + tag */}
                <div style={{ flex: "0 0 300px" }}>
                  <div className="font-semibold text-sm mb-1.5" style={{ color: "#1a2e4a" }}>{role.title}</div>
                  <span
                    className="text-xs px-2 py-1 rounded font-medium"
                    style={{ background: "#f3f4f6", color: "#6b7280" }}
                  >
                    {role.tag}
                  </span>
                </div>
                {/* Location */}
                <div style={{ flex: "0 0 200px" }}>
                  <span className="text-sm" style={{ color: "#6b7280" }}>{role.location}</span>
                </div>
                {/* Type */}
                <div style={{ flex: "0 0 120px" }}>
                  <span className="text-sm" style={{ color: "#9ca3af" }}>{role.type}</span>
                </div>
                {/* CTA */}
                <div className="flex-1 flex justify-end">
                  <button
                    onClick={() => setSelectedJob(role)}
                    className="text-sm font-bold transition-all hover:text-orange-600 hover:scale-105"
                    style={{ color: "#F59E0B", background: "none", border: "none", cursor: "pointer" }}
                  >
                    Apply now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md transition-opacity">
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[95vh] sm:max-h-[90vh] flex flex-col overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 relative"
            onClick={(e) => e.stopPropagation()}
          >
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 border-b border-orange-200 shrink-0">
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="absolute top-5 right-5 p-2 text-orange-400 hover:text-orange-600 hover:bg-orange-200/50 rounded-full transition-all"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <div className="pr-10">
                  <span className="inline-block px-2.5 py-1 bg-orange-500 text-white text-[10px] font-bold tracking-wider rounded-full mb-2 shadow-sm">
                    {selectedJob.tag}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 mb-1.5">{selectedJob.title}</h3>
                  <div className="flex items-center gap-4 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {selectedJob.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-4 h-4 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {selectedJob.type}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Application submitted successfully!'); setSelectedJob(null); }}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-[13px] font-bold text-slate-700 mb-1.5">Full Name</label>
                      <input type="text" id="name" required className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white outline-none transition-all" placeholder="John Doe" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[13px] font-bold text-slate-700 mb-1.5">Email Address</label>
                      <input type="email" id="email" required className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white outline-none transition-all" placeholder="john@example.com" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="portfolio" className="block text-[13px] font-bold text-slate-700 mb-1.5">Portfolio / LinkedIn URL</label>
                    <input type="url" id="portfolio" className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white outline-none transition-all" placeholder="https://linkedin.com/in/johndoe" />
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-[13px] font-bold text-slate-700 mb-1.5">Resume / CV</label>
                    <div className="mt-1 flex justify-center px-4 py-5 border-2 border-slate-200 border-dashed rounded-xl hover:border-orange-500 hover:bg-orange-50/50 transition-colors cursor-pointer bg-slate-50 group">
                      <div className="space-y-1.5 text-center">
                        <div className="mx-auto w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          <svg className="h-5 w-5 text-orange-500" stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <div className="flex text-[13px] text-slate-600 justify-center">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-orange-600 hover:text-orange-500 focus-within:outline-none">
                            <span>Click to upload</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-[11px] font-medium text-slate-400">PDF, DOCX up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cover-letter" className="block text-[13px] font-bold text-slate-700 mb-1.5">Cover Letter <span className="text-slate-400 font-normal">(Optional)</span></label>
                    <textarea id="cover-letter" rows={3} className="w-full px-3 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-white outline-none transition-all resize-none" placeholder="Tell us why you'd be a great fit..."></textarea>
                  </div>
                </form>
              </div>

              {/* Footer */}
              <div className="p-4 px-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3 shrink-0 rounded-b-2xl">
                <button 
                  type="button" 
                  onClick={() => setSelectedJob(null)}
                  className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  onClick={(e) => { e.preventDefault(); alert('Application submitted successfully!'); setSelectedJob(null); }}
                  className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-all shadow-md hover:shadow-xl hover:shadow-orange-500/20 transform active:scale-95 flex items-center gap-2"
                >
                  Submit Application
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
          </div>
        </div>
      )}
      
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
          border: 3px solid #ffffff;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #94a3b8;
        }
      `}} />
    </section>
  );
}
