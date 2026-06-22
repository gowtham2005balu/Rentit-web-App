"use client";
import RentitNavbar from "../../components/home-new/navbar";

import RentitHero from "../../components/home-new/hero";
import Problem from "../../components/home-new/problem";
import Solution from "../../components/home-new/solution";
import RentitAISection from "../../components/home-new/aisection";
import ProductShowcase from "../../components/home-new/ProductShowcase";
import BuiltForEveryone from "../../components/home-new/BuiltForEveryone";
import PremiumPlans from "../../components/home-new/PremiumPlans";
import WhyRentit from "../../components/home-new/WhyRentit";
import Testimonials from "../../components/home-new/Testimonials";
import FAQ from "../../components/home-new/FAQ";
import FinalCTA from "../../components/home-new/FinalCTA";

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
    </>
  );
}