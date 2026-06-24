import React from 'react';
import Script from 'next/script';
import RentitNavbar from '../../components/home-new/navbar';

import CareersHero from "../../components/Career/careers_hero";
import CareersMission from "../../components/Career/careers_mission";
import CareersWhy from "../../components/Career/careers_why";
import CareersLife from "../../components/Career/careers_life";
import CareersThink from "../../components/Career/careers_think";
import CareersValues from "../../components/Career/careers_values";
import CareersBenefits from "../../components/Career/careers_benefits";
import CareersBuild from "../../components/Career/careers_build";
import CareersOpenRoles from "../../components/Career/careers_open_roles";
import CareersTestimonials from "../../components/Career/careers_testimonials";
import JoinUs from "../../components/Career/joinus";

export const metadata = {
  title: "Careers at RentIt – Join Our Team in Chennai",
  description: "Join the RentIt team and help transform the rental market in Chennai. Explore open roles in engineering, design, sales and operations at our Chennai office.",
  alternates: { canonical: "https://rentit.in/careers" },
};

export default function Careers() {
  return (
    <div className="bg-white min-h-screen">
      <RentitNavbar />
      <main>
        <CareersHero />
        <CareersMission />
        <CareersWhy />
        <CareersLife />
        <CareersThink />
        <CareersValues />
        <CareersBenefits />
        <CareersBuild />
        <CareersOpenRoles />
        <CareersTestimonials />
        <JoinUs />
      </main>
    </div>
  );
}
