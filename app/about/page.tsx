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
  title: 'About RentIt - Our Mission, Vision & Values',
  description: 'Learn more about RentIt, our mission, vision, and the future of property discovery.',
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
