import type { Metadata } from 'next';
import Navbar from '../../components/Navbar';
import FiltersSidebar from '../../components/FiltersSidebar';
import PropertyCard from '../../components/PropertyCard';
import HorizontalScrollSection from '../../components/HorizontalScrollSection';
import RightSidebarWidgets from '../../components/RightSidebarWidgets';
import JioBanner from '../../components/JioBanner';
import SponsoredListingCard from '../../components/SponsoredListingCard';
import GridPropertyCard from '../../components/GridPropertyCard';
import PremiumBanner from '../../components/PremiumBanner';
import PackersBanner from '../../components/PackersBanner';
import LocalityCard from '../../components/LocalityCard';
import { properties as mockProperties, ownerListedProperties, metroListedProperties, trendingLocalities } from '../../data/mockData';
import styles from '../page.module.css';
import { ChevronRight, ChevronDown, Train, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { fetchAllProperties } from '@/lib/backend';

export const metadata: Metadata = {
  title: "Apartments for Rent in Chennai – RentIt",
  description: "Find verified apartments for rent in Chennai. Filter by locality, budget, and BHK size. Explore flats in OMR, Velachery, Anna Nagar, Adyar and more on RentIt.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rentit.in/apartments" },
  openGraph: {
    title: "Apartments for Rent in Chennai – RentIt",
    description: "Browse 1BHK, 2BHK & 3BHK apartments for rent across Chennai's top localities.",
    url: "https://rentit.in/apartments",
    type: "website",
  }
};

export default async function ApartmentsList({ searchParams }: { searchParams: Promise<{ 
  locality?: string; 
  type?: string;
  propertyType?: string;
  roomType?: string;
  availability?: string;
  tenantPref?: string;
  furnishing?: string;
  parking?: string;
  rentMax?: string;
  sort?: string;
}> }) {
  const params = await searchParams;
  const locality = params.locality?.toLowerCase() || '';
  const type = params.type || 'All Types';

  const typeFormatted = type !== 'All Types' ? (type.includes('BHK') ? type.replace('BHK', ' BHK') : type) : '';

  const propTypes = params.propertyType?.split(',').map(s => s.toLowerCase()) || [];
  const roomTypes = params.roomType?.split(',').map(s => s.toLowerCase()) || [];
  const availabilities = params.availability?.split(',').map(s => s.toLowerCase()) || [];
  const tenants = params.tenantPref?.split(',').map(s => s.toLowerCase()) || [];
  const furnishings = params.furnishing?.split(',').map(s => s.toLowerCase()) || [];
  const parkings = params.parking?.split(',').map(s => s.toLowerCase()) || [];
  const rentMax = params.rentMax ? parseInt(params.rentMax) : 100000;
  const sortParam = params.sort || '';

  const applyFilters = (p: any, isOwnerListed = false) => {
    const pLocation = (p.location || '').toLowerCase();
    const pTitle = (p.title || '').toLowerCase();
    const pSubtitle = (p.subtitle || '').toLowerCase();

    const matchesLocality = locality ? pLocation.includes(locality) || pTitle.includes(locality) : true;
    
    // Original category type matching (from top header)
    let matchesType = type !== 'All Types' ? pTitle.includes(typeFormatted.toLowerCase()) || p.bhk?.toString() === type[0] : true;
    if (isOwnerListed && type !== 'All Types') {
      matchesType = pTitle.includes(typeFormatted.toLowerCase()) || pSubtitle.includes(typeFormatted.toLowerCase());
    }

    // New Sidebar Filters
    const matchesPropType = propTypes.length ? propTypes.some((t: string) => pTitle.includes(t) || (isOwnerListed && pSubtitle.includes(t))) : true;
    
    const matchesRoomType = roomTypes.length ? roomTypes.some((t: string) => {
      if (p.bhk) return `${p.bhk} bhk` === t || (t === '4+ bhk' && p.bhk >= 4);
      if (pSubtitle) return pSubtitle.includes(t);
      return false;
    }) : true;

    const pAvailability = (p.availability || '').toLowerCase();
    const matchesAvailability = availabilities.length ? availabilities.some((a: string) => pAvailability.includes(a) || (a === 'immediately' && p.isNew)) : true;
    
    const pTenantPref = (p.tenantPref || '').toLowerCase();
    const matchesTenant = tenants.length ? tenants.some((t: string) => pTenantPref.includes(t)) : true;
    
    const pFurnishing = (p.furnishing || '').toLowerCase();
    const pAmenities = p.amenities || [];
    const matchesFurnishing = furnishings.length ? furnishings.some((f: string) => pFurnishing.includes(f) || pAmenities.some((am: string) => am.toLowerCase().includes(f))) : true;
    
    const matchesParking = parkings.length ? parkings.some((pk: string) => pAmenities.some((am: string) => am.toLowerCase().includes('parking'))) : true;
    const matchesRent = rentMax >= 100000 ? true : (p.price <= rentMax);

    return matchesLocality && matchesType && matchesPropType && matchesRoomType && matchesAvailability && matchesTenant && matchesFurnishing && matchesParking && matchesRent;
  };

  let dbProperties: any[] = [];
  try {
    dbProperties = await fetchAllProperties();
  } catch (error: any) {
    console.log("Backend API fetch skipped or failed:", error.message || error);
  }

  const realProperties = dbProperties.map(p => ({
    id: (p._id || p.id || Math.random()).toString(),
    title: p.title || 'Untitled Property',
    location: p.location_address || p.location || 'Chennai',
    price: p.price ? Number(p.price) : 0,
    deposit: p.deposit ? Number(p.deposit) : (p.price ? Number(p.price) * 5 : 50000),
    bhk: p.bhk || (p.title && p.title.match(/(\d+)\s*BHK/i) ? parseInt(p.title.match(/(\d+)\s*BHK/i)[1]) : 2),
    baths: p.baths || 2,
    sqft: p.sqft || 1000,
    furnishing: p.furnishing || 'Semi Furnished',
    availability: p.availability || 'Immediate',
    imageUrl: (() => {
      let url = p.image_url || p.imageUrl;
      if (!url && Array.isArray(p.images) && p.images.length > 0) url = p.images[0];
      if (typeof url !== 'string' || url.trim() === '' || url === 'null' || url === 'undefined') {
        return 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800';
      }
      return url;
    })(),
    isPromoted: true,
    agentName: p.agent_name || p.agentName || 'Owner',
    isNewProject: p.is_new_project || p.isNewProject || false,
    subtitle: p.subtitle || `${p.furnishing || 'Semi Furnished'} • ${p.bhk || 2} BHK`,
    timeAgo: '1d ago',
    amenities: p.amenities || [],
    tenantPref: p.tenant_pref || p.tenantPref || 'Anyone'
  }));

  const propertiesToUse = realProperties.length > 0 ? realProperties : mockProperties;

  let filteredAll = propertiesToUse.filter(p => applyFilters(p, false));
  
  if (sortParam === 'price_asc') {
    filteredAll.sort((a, b) => a.price - b.price);
  } else if (sortParam === 'price_desc') {
    filteredAll.sort((a, b) => b.price - a.price);
  }
  
  const filteredProperties = filteredAll.filter((_, i) => i % 3 === 0);
  const filteredOwnerListed = filteredAll.filter((_, i) => i % 3 === 1);
  const filteredMetroListed = filteredAll.filter((_, i) => i % 3 === 2);
  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.mainWrapper}>
        <div className={styles.layout}>
          {/* Left Sidebar */}
          <FiltersSidebar />
          
          {/* Main Content Area */}
          <div className={styles.mainContent}>
            
            <div className={styles.pageHeader}>
              <div className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <ChevronRight size={14} className={styles.breadcrumbIcon} />
                <Link href="/apartments">Chennai</Link>
                <ChevronRight size={14} className={styles.breadcrumbIcon} />
                <Link href="/apartments">Apartments</Link>
                <ChevronRight size={14} className={styles.breadcrumbIcon} />
                <span className={styles.breadcrumbActive}>{locality ? locality.charAt(0).toUpperCase() + locality.slice(1) : 'Chennai'}</span>
              </div>
              
              <div className={styles.titleRow}>
                <h1 className={styles.pageTitle}>{filteredProperties.length + filteredOwnerListed.length + filteredMetroListed.length} Apartments found{locality ? ` near ${params.locality}` : ''}</h1>
                <div className={styles.sortDropdown}>
                  <span className={styles.sortLabel}>Sort by:</span>
                  <button className={styles.sortBtn}>
                    {sortParam === 'price_asc' ? 'Price: Low to High' : sortParam === 'price_desc' ? 'Price: High to Low' : 'Relevance'}
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
              
              <div className={styles.subtitle}>Showing {filteredAll.length > 0 ? '1' : '0'}–{Math.min(24, filteredAll.length)} of {filteredAll.length.toLocaleString()} results</div>
              
              <div className={styles.alertBox}>
                <strong>87 new listings added today</strong> in {locality ? locality.charAt(0).toUpperCase() + locality.slice(1) : 'Chennai'}. <span className={styles.alertLight}>Prices rising 12% this month — act fast.</span>
              </div>
            </div>

            <div className={styles.promotedSection}>
              {filteredProperties.filter(p => p.isPromoted).map((property, idx) => (
                <PropertyCard key={`${property.id}-${idx}`} property={property} />
              ))}
            </div>
            
            <HorizontalScrollSection properties={propertiesToUse.slice(0, 8)} />
            
            <div className={styles.standardSection}>
              <JioBanner />
              
              <div style={{ marginTop: '16px' }}>
                <h2 className={styles.sectionTitle}>Sponsored Listing</h2>
                <SponsoredListingCard property={filteredAll.length > 0 ? filteredAll[0] : undefined} />
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Owner Listed Today</h2>
                  <a href="/apartments" style={{ color: '#D97706', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View all &rarr;</a>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {filteredOwnerListed.map((property, idx) => (
                    <GridPropertyCard key={`${property.id}-${idx}`} property={property} />
                  ))}
                </div>
              </div>
              
              <PremiumBanner />
              <PackersBanner />
              
              <div style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Train size={18} color="#2563EB" />
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Near Metro Station</h2>
                    <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '16px', fontSize: '10px', fontWeight: 600 }}>≤ 1km</span>
                  </div>
                  <a href="/apartments" style={{ color: '#D97706', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View all &rarr;</a>
                </div>
                <div className={styles.scrollContainer}>
                  {filteredMetroListed.map((property, idx) => (
                    <div key={`${property.id}-${idx}`} style={{ minWidth: '280px', maxWidth: '300px', flexShrink: 0 }}>
                      <GridPropertyCard property={property} />
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Trending Localities</h2>
                  <a href="/apartments" style={{ color: '#D97706', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>Explore &rarr;</a>
                </div>
                <div className={styles.scrollContainer}>
                  {trendingLocalities.map(locality => (
                    <LocalityCard key={locality.id} locality={locality} />
                  ))}
                </div>
              </div>

              <div className={styles.pagination}>
                <button className={styles.pageBtn}><ChevronLeft size={14} style={{ marginRight: '4px' }}/> Prev</button>
                <button className={`${styles.pageBtn} ${styles.pageBtnActive}`}>1</button>
                <button className={styles.pageBtn}>2</button>
                <button className={styles.pageBtn}>3</button>
                <button className={styles.pageBtn}>4</button>
                <button className={styles.pageBtn}>5</button>
                <span className={styles.pageEllipsis}>...</span>
                <button className={styles.pageBtn}>98</button>
                <button className={styles.pageBtn}>Next <ChevronRight size={14} style={{ marginLeft: '4px' }}/></button>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar */}
          <RightSidebarWidgets recentItems={realProperties.slice(0, 3).map(p => ({
            id: p.id,
            title: p.title,
            location: p.location,
            price: p.price,
            image: p.imageUrl
          }))} />
        </div>
      </main>
    </div>
  );
}
