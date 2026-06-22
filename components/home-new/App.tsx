"use client";

import RentitNavbar from "./navbar";
// import Footer from "./Footer";

import RentitHero from "./hero";
import Problem from "./problem";
import Solution from "./solution";
import RentitAISection from "./aisection";
import ProductShowcase from "./ProductShowcase";
import BuiltForEveryone from "./BuiltForEveryone";
import PremiumPlans from "./PremiumPlans";
import WhyRentit from "./WhyRentit";
import Testimonials from "./Testimonials";
import FAQ from "./FAQ";
import FinalCTA from "./FinalCTA";

export default function App() {
  return (
    <>
      <RentitNavbar />

      <RentitHero />
      <Problem />
      <Solution />
      <RentitAISection />
      <ProductShowcase />
      <BuiltForEveryone />
      <PremiumPlans />
      <WhyRentit />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      {/* <Footer /> */}
    </>
  );
}