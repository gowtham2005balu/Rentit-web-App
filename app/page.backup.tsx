import type { Metadata } from 'next';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import RecommendedSection from '../components/RecommendedSection';
import PremiumCollection from '../components/PremiumCollection';
import PopularLocalities from '../components/PopularLocalities';
import BudgetFriendly from '../components/BudgetFriendly';
import CommercialHubs from '../components/CommercialHubs';
import MarketInsights from '../components/MarketInsights';
import WishlistSaved from '../components/WishlistSaved';
import RentitPremiumBanner from '../components/RentitPremiumBanner';
import WhyRentit from '../components/WhyRentit';
import HelpSupport from '../components/HelpSupport';
import ListPropertyBanner from '../components/ListPropertyBanner';
import Footer from '../components/Footer';
import { fetchAllProperties } from '../lib/backend';
import styles from './page.module.css';

async function getProperties() {
  try {
    const rows = await fetchAllProperties();

    if (!Array.isArray(rows) || rows.length === 0) {
      return [];
    }

    return rows.map((row: any) => {
      let img = row.image || row.image_url || (row.images && row.images[0]);
      if (row.title === 'High-Footfall Retail Space') {
        img = '/elite_premium_apartment.png';
      }
      
      return {
        ...row,
        image: img,
        image_url: img,
        created_at: row.created_at || row.createdAt ? new Date(row.created_at || row.createdAt).toISOString() : null,
        updated_at: row.updated_at || row.updatedAt ? new Date(row.updated_at || row.updatedAt).toISOString() : null,
      };
    });
  } catch (error) {
    console.error('Failed to fetch properties:', error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "RentIt – Find Apartments, PGs & Flatmates in Chennai",
  description: "RentIt is Chennai's trusted rental marketplace. Browse verified apartments, PG hostels, flatmates, and commercial spaces. 10,000+ verified tenants. Free to post.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rentit.in/" },
  openGraph: {
    title: "RentIt – Find Apartments, PGs & Flatmates in Chennai",
    description: "Chennai's trusted rental marketplace. Verified listings across OMR, Velachery, Anna Nagar, Adyar & more.",
    url: "https://rentit.in/",
    type: "website",
  }
};

export const dynamic = 'force-dynamic';

export default async function Home() {
  const properties = await getProperties();
  const topCommercialProps = properties
    .filter((p: any) => 
      p.type === 'Commercial' || p.propertyType === 'Commercial' || p.propertyType === 'Office' || p.propertyType === 'Shop'
    )
    .sort((a: any, b: any) => {
      const priceA = parseFloat(String(a.price || a.rent || 0).replace(/,/g, ''));
      const priceB = parseFloat(String(b.price || b.rent || 0).replace(/,/g, ''));
      return priceB - priceA;
    })
    .slice(0, 7);

  const topPremiumProps = [...properties]
    .sort((a: any, b: any) => {
      const priceA = parseFloat(String(a.price || a.rent || 0).replace(/,/g, ''));
      const priceB = parseFloat(String(b.price || b.rent || 0).replace(/,/g, ''));
      return priceB - priceA;
    })
    .slice(0, 3);

  const budgetProps = [...properties]
    .filter((p: any) => {
      const price = parseFloat(String(p.price || p.rent || 0).replace(/,/g, ''));
      return price > 0;
    })
    .sort((a: any, b: any) => {
      const priceA = parseFloat(String(a.price || a.rent || 0).replace(/,/g, ''));
      const priceB = parseFloat(String(b.price || b.rent || 0).replace(/,/g, ''));
      return priceA - priceB;
    })
    .slice(0, 4);

  return (
    <div className={styles.page}>
      <Navbar hideSearchBar={true} />
      <HeroSection />
      <RecommendedSection initialProperties={properties} />
      <PremiumCollection initialProperties={topPremiumProps} />
      <PopularLocalities />
      <BudgetFriendly initialProperties={budgetProps} />
      <CommercialHubs initialProperties={topCommercialProps} />
      <MarketInsights />
      <WishlistSaved />
      <RentitPremiumBanner />
      <WhyRentit />
      <HelpSupport />
      <ListPropertyBanner />
    </div>
  );
}
