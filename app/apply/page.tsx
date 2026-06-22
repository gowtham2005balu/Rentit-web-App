import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export default function ApplyNowPage() {
  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Navbar hideSearchBar={true} />
      
      <main className="py-20 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1.5 bg-orange-100 text-orange-600 font-bold text-sm tracking-widest rounded-full mb-6">
            JOIN HUZZLER
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">
            Apply Now
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Take the next step in your career. Fill out the application form below and our team will get back to you shortly.
          </p>
        </div>

        {/* Application Form Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="p-8 md:p-12">
            <form className="space-y-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">1</span>
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-bold text-slate-700 mb-2">First Name</label>
                    <input type="text" id="firstName" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-bold text-slate-700 mb-2">Last Name</label>
                    <input type="text" id="lastName" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="Doe" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                    <input type="email" id="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="john@example.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" id="phone" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="+1 (555) 000-0000" />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Professional Details */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">2</span>
                  Professional Details
                </h3>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="role" className="block text-sm font-bold text-slate-700 mb-2">Role Applied For</label>
                    <select id="role" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all appearance-none cursor-pointer">
                      <option value="" disabled selected>Select a role...</option>
                      <option value="frontend">Senior Frontend Engineer</option>
                      <option value="backend">Backend Engineer — Platform</option>
                      <option value="product">Product Manager</option>
                      <option value="design">Senior Product Designer</option>
                      <option value="marketing">Growth Marketing Manager</option>
                      <option value="sales">Sales Executive</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="portfolio" className="block text-sm font-bold text-slate-700 mb-2">Portfolio / LinkedIn URL</label>
                    <input type="url" id="portfolio" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all" placeholder="https://linkedin.com/in/johndoe" />
                  </div>

                  <div>
                    <label htmlFor="resume" className="block text-sm font-bold text-slate-700 mb-2">Resume / CV</label>
                    <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-slate-200 border-dashed rounded-2xl hover:border-orange-500 hover:bg-orange-50/50 transition-colors cursor-pointer bg-slate-50 group">
                      <div className="space-y-2 text-center">
                        <div className="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                          <svg className="h-7 w-7 text-orange-500" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </div>
                        <div className="flex text-sm text-slate-600 justify-center mt-4">
                          <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-orange-600 hover:text-orange-500 focus-within:outline-none">
                            <span>Click to upload</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs font-medium text-slate-400">PDF, DOCX up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Additional Information */}
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm">3</span>
                  Additional Information
                </h3>
                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-bold text-slate-700 mb-2">Cover Letter <span className="text-slate-400 font-normal">(Optional)</span></label>
                  <textarea id="coverLetter" rows={5} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all resize-none" placeholder="Tell us why you'd be a great fit for Huzzler..."></textarea>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button type="button" onClick={() => alert('Application submitted!')} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-orange-500/30 transform active:scale-[0.98]">
                  Submit Application
                </button>
                <p className="text-center text-xs text-slate-400 mt-4">
                  By submitting this form, you agree to our Privacy Policy and Terms of Service.
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
