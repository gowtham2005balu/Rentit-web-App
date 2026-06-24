import React from 'react';
import RentitNavbar from '../../components/home-new/navbar';
import AboutHero from '../../components/about/AboutHero';
import TheProblem from '../../components/about/TheProblem';
import OurSolution from '../../components/about/OurSolution';
import WhatMakesUsDifferent from '../../components/about/WhatMakesUsDifferent';
import OurStory from '../../components/about/OurStory';
import OurMission from '../../components/about/OurMission';
import OurVision from '../../components/about/OurVision';
import OurValues from '../../components/about/OurValues';
import TheFuture from '../../components/about/TheFuture';
import JoinTheJourney from '../../components/about/JoinTheJourney';

import Script from 'next/script';

export const metadata = {
  title: "About RentIt – Chennai's Trusted Rental Marketplace",
  description: "Learn about RentIt, Chennai's leading rental platform connecting tenants and owners since 2022. Our mission is to make renting simple, safe and transparent.",
  alternates: { canonical: "https://rentit.in/about" },
};

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen">
      <RentitNavbar />
      <main>
        <AboutHero />
        <TheProblem />
        <OurSolution />
        <WhatMakesUsDifferent />
        <OurStory />
        <OurMission />
        <OurVision />
        <OurValues />
        <TheFuture />
        <JoinTheJourney />
      </main>
    </div>
  );
}
