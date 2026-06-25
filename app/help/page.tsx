"use client";

import React from 'react';
import RentitNavbar from '@/components/home-new/navbar';
import HeroSection from '@/components/help-center/HeroSection';
import QuickAccessSection from '@/components/help-center/QuickAccessSection';
import PopularArticlesSection from '@/components/help-center/PopularArticlesSection';
import BrowseCategorySection from '@/components/help-center/BrowseCategorySection';
import FAQSection from '@/components/help-center/FAQSection';
import SupportTicketSection from '@/components/help-center/SupportTicketSection';
import ContactSection from '@/components/help-center/ContactSection';
import FeedbackSection from '@/components/help-center/FeedbackSection';
import HelpDirectorySection from '@/components/help-center/HelpDirectorySection';
import StillNeedHelpSection from '@/components/help-center/StillNeedHelpSection';

export default function HelpPage() {
  return (
    <div className="min-h-screen font-sans bg-white">
      <RentitNavbar />
      <HeroSection />
      <QuickAccessSection />
      <PopularArticlesSection />
      <BrowseCategorySection />
      <FAQSection />
      <SupportTicketSection />
      <ContactSection />
      <FeedbackSection />
      <HelpDirectorySection />
      <StillNeedHelpSection />
    </div>
  );
}
