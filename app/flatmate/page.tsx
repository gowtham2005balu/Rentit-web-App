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
import styles from '../page.module.css';
import { ChevronRight, ChevronDown, Train, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { fetchAllProperties } from '@/lib/backend';

export const metadata: Metadata = {
  title: "Find Flatmates in Chennai – RentIt Flatmate Finder",
  description: "Find compatible flatmates in Chennai to share rent and space. RentIt's Flatmate Finder connects working professionals and students looking for shared apartments.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://rentit.in/flatmates" },
  openGraph: {
    title: "Find Flatmates in Chennai – RentIt",
    description: "Connect with verified flatmates in Chennai. Share rent, share space. Free to post your profile.",
    url: "https://rentit.in/flatmates",
    type: "website",
  }
};

export default async function FlatmatesList({ searchParams }: { searchParams: Promise<{ 
  propertyType?: string;
  roomType?: string;
  availability?: string;
  tenantPref?: string;
  furnishing?: string;
  parking?: string;
  rentMax?: string;
  locality?: string;
}> }) {
  const params = await searchParams;
  const propTypes = params.propertyType?.split(',').map(s => s.toLowerCase()) || [];
  const roomTypes = params.roomType?.split(',').map(s => s.toLowerCase()) || [];
  const availabilities = params.availability?.split(',').map(s => s.toLowerCase()) || [];
  const tenants = params.tenantPref?.split(',').map(s => s.toLowerCase()) || [];
  const furnishings = params.furnishing?.split(',').map(s => s.toLowerCase()) || [];
  const parkings = params.parking?.split(',').map(s => s.toLowerCase()) || [];
  const rentMax = params.rentMax ? parseInt(params.rentMax) : 100000;
  const locality = params.locality || '';

  let liveProperties: any[] = [];
  try {
    const allRows = await fetchAllProperties();
    if (allRows.length > 0) {
      // Filter for flatmate type properties
      liveProperties = allRows.filter((row: any) => 
        (row.type || '').toLowerCase().includes('flatmate') ||
        (row.propertyType || '').toLowerCase().includes('flatmate')
      ).map((row: any, index: number) => {
        const details = typeof row.details === 'string' ? JSON.parse(row.details) : (row.details || {});
        return {
          id: String(row._id || row.id),
          type: row.type || 'Flatmate',
          title: row.title || details.title || 'Flatmate Needed',
          location: row.location_address || details.location_address || 'Chennai',
          price: Number(row.price) || details.price || 0,
          deposit: Number(row.deposit) || details.securityDeposit || (Number(row.price) * 3) || 0,
          bhk: row.bhk || details.bhkType || 1,
          baths: row.baths || row.bathrooms || details.bathrooms || 1,
          sqft: row.sqft || details.builtUpArea || 500,
          furnishing: row.furnishing || details.furnishingType || 'Semi Furnished',
          availability: row.available_from ? 'Immediately' : 'Ready to move',
          imageUrl: (Array.isArray(row.images) && row.images[0]) || row.image_url || details.images?.[0] || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
          images: Array.isArray(row.images) ? row.images : (details.images || ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800']),
          isPromoted: index % 3 === 0,
          agentName: row.agent_name || details.contactName || 'Owner',
          subtitle: `${row.bhk || 1} BHK • Flatmate`,
          timeAgo: 'Recently',
          amenities: row.amenities || details.selectedAmenities || ['WiFi', 'AC', 'Parking'],
          metroDistance: index % 2 === 0 ? 'METRO 0.5KM' : undefined,
          tenantPref: row.tenant_pref || details.preferredTenants?.join(', ') || 'Anyone',
        };
      });
    }
  } catch (error: any) {
    console.log("Backend API fetch skipped or failed:", error.message || error);
  }

  const applyFilters = (p: any, isOwnerListed = false) => {
    const matchesPropType = propTypes.length ? propTypes.some(t => p.title.toLowerCase().includes(t) || (isOwnerListed && p.subtitle?.toLowerCase().includes(t))) : true;
    const matchesRoomType = roomTypes.length ? roomTypes.some(t => {
      if (p.bhk) return `${p.bhk} bhk` === t || (t === '4+ bhk' && p.bhk >= 4);
      if (p.subtitle) return p.subtitle.toLowerCase().includes(t);
      return false;
    }) : true;
    const matchesAvailability = availabilities.length ? availabilities.some(a => p.availability?.toLowerCase().includes(a) || (a === 'immediately' && p.isNew)) : true;
    const matchesTenant = tenants.length ? tenants.some(t => p.tenantPref?.toLowerCase().includes(t)) : true;
    const matchesFurnishing = furnishings.length ? furnishings.some(f => p.furnishing?.toLowerCase().includes(f) || p.amenities?.some((am: string) => am.toLowerCase().includes(f))) : true;
    const matchesParking = parkings.length ? parkings.some(pk => p.amenities?.some((am: string) => am.toLowerCase().includes('parking'))) : true;
    const matchesRent = rentMax >= 100000 ? true : (p.price <= rentMax);

    return matchesPropType && matchesRoomType && matchesAvailability && matchesTenant && matchesFurnishing && matchesParking && matchesRent;
  };

  const filteredProperties = liveProperties.filter(p => applyFilters(p, false));
  const filteredOwnerListed = liveProperties.filter(p => applyFilters(p, true));
  const filteredMetroListed = liveProperties.filter(p => applyFilters(p, true));
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
                <Link href="/flatmate">Chennai</Link>
                <ChevronRight size={14} className={styles.breadcrumbIcon} />
                <Link href="/flatmate">Flatmates</Link>
                <ChevronRight size={14} className={styles.breadcrumbIcon} />
                <span className={styles.breadcrumbActive}>{locality ? locality.charAt(0).toUpperCase() + locality.slice(1) : 'Chennai'}</span>
              </div>
              
              <div className={styles.titleRow}>
                <h1 className={styles.pageTitle}>{filteredProperties.length.toLocaleString()} Flatmates in Chennai</h1>
                <div className={styles.sortDropdown}>
                  <span className={styles.sortLabel}>Sort by:</span>
                  <button className={styles.sortBtn}>
                    Relevance
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>
              
              <div className={styles.subtitle}>Showing {filteredProperties.length > 0 ? '1' : '0'}–{Math.min(24, filteredProperties.length)} of {filteredProperties.length.toLocaleString()} results</div>
              
              <div className={styles.alertBox}>
                <strong>87 new listings added today</strong> in {locality ? locality.charAt(0).toUpperCase() + locality.slice(1) : 'Chennai'}. <span className={styles.alertLight}>Prices rising 12% this month — act fast.</span>
              </div>
            </div>

            <div className={styles.promotedSection}>
              {[...filteredProperties].sort(() => Math.random() - 0.5).filter(p => p.isPromoted).map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            
            <HorizontalScrollSection properties={filteredProperties} />
            
            <div className={styles.standardSection}>
              <JioBanner />
              
              {filteredProperties.length > 0 && (
                <div style={{ marginTop: '16px' }}>
                  <h2 className={styles.sectionTitle}>Sponsored Listing</h2>
                  <SponsoredListingCard property={filteredProperties[0]} />
                </div>
              )}
              
              {filteredOwnerListed.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Owner Listed Today</h2>
                    <a href="/flatmate" style={{ color: '#D97706', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View all &rarr;</a>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {filteredOwnerListed.map(property => (
                      <GridPropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                </div>
              )}
              
              <PremiumBanner />
              <PackersBanner />
              
              {filteredMetroListed.length > 0 && (
                <div style={{ marginTop: '32px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Train size={18} color="#2563EB" />
                      <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Near Metro Station</h2>
                      <span style={{ backgroundColor: '#EFF6FF', color: '#2563EB', padding: '4px 10px', borderRadius: '16px', fontSize: '10px', fontWeight: 600 }}>≤ 1km</span>
                    </div>
                    <a href="/flatmate" style={{ color: '#D97706', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>View all &rarr;</a>
                  </div>
                  <div className={styles.scrollContainer}>
                    {filteredMetroListed.map(property => (
                      <div key={property.id} style={{ minWidth: '280px', maxWidth: '300px', flexShrink: 0 }}>
                        <GridPropertyCard property={property} />
                      </div>
                    ))}
                  </div>
                </div>
              )}


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
          <RightSidebarWidgets recentItems={liveProperties.slice(0, 3).map(p => ({
            id: String(p.id),
            title: p.title,
            location: p.location,
            price: Number(p.price),
            image: p.imageUrl || p.image || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=300'
          }))} />
        </div>
      </main>
    </div>
  );
}
