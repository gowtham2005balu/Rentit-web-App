import React from 'react';
import Navbar from '../../../components/Navbar';
import styles from './page.module.css';
import { ChevronRight, Camera, Image as ImageIcon, Star, Zap, Phone, Calendar, Bookmark, Share2, ArrowRight, Shield, ShoppingBag, Truck, Building2, PlayCircle, Award, MapPin, Clock, CalendarDays, ChevronDown, Users, Maximize2, Compass, BedDouble, Armchair, Car, Bath, Droplets, Dog, Flame, Video, Wind, Briefcase, Store, Dumbbell, Wifi, Utensils, Train, Hospital, GraduationCap, Map, RotateCcw, Layers, Ruler, History, Calculator, DoorOpen, CalendarCheck, ArrowUpDown, Snowflake, Martini, ShoppingCart, ShieldCheck, Waves, Brush, Navigation, Bus, TrainFront, School, MonitorPlay, Landmark, FileText } from 'lucide-react';
import Link from 'next/link';
import ImageWithFallback from '../../../components/ImageWithFallback';
import ContactOwnerButton from '../../../components/ContactOwnerButton';
import SidebarActions from './SidebarActions';
import ImageGallery from './ImageGallery';
import { fetchBackend, fetchAllProperties, fetchPropertyById } from '../../../lib/backend';

export const dynamic = 'force-dynamic';

export default async function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let rawProp: any = null;
  let allProperties: any[] = [];

  // Try fetching single property from backend API
  rawProp = await fetchPropertyById(id);

  // Fetch all properties for sidebar/similar sections
  allProperties = await fetchAllProperties();



  if (!rawProp) {
    return (
      <div className={styles.page}>
        <Navbar />
        <main className={styles.mainWrapper} style={{ padding: '100px', textAlign: 'center' }}>
          <h2>Property not found</h2>
        </main>
      </div>
    );
  }

  const details = typeof rawProp.details === 'string' ? JSON.parse(rawProp.details) : (rawProp.details || {});

  const p = {
    title: rawProp.title || details.title || details.apartmentName || details.propertyCategory || 'Premium Property',
    location: rawProp.location_address || details.location_address || details.fullAddress || details.locality || rawProp.location || details.city || 'Chennai',
    price: rawProp.price || details.price || details.monthlyRent || 40000,
    deposit: rawProp.deposit || details.securityDeposit || (rawProp.price ? Number(rawProp.price) * 5 : (details.monthlyRent ? Number(details.monthlyRent) * 5 : 120000)),
    maintenance: rawProp.maintenance || details.maintenanceAmount || 3000,
    sqft: rawProp.sqft || details.builtUpArea || 1500,
    bhk: rawProp.bhk || details.bhkType || (rawProp.title && rawProp.title.match(/(\d+)\s*BHK/i) ? parseInt(rawProp.title.match(/(\d+)\s*BHK/i)![1]) : 3),
    furnishing: rawProp.furnishing || details.furnishingType || 'Semi Furnished',
    tenantPref: rawProp.tenant_pref || rawProp.tenantPref || (details.preferredTenants ? details.preferredTenants.join(', ') : 'Family'),
    amenities: rawProp.amenities || details.selectedAmenities || ['AC', 'WiFi', 'Gym', 'Parking', 'Security'],
    description: rawProp.description || details.propertyDescription || 'A beautiful and spacious property located in a prime neighborhood with excellent connectivity and premium amenities.',
    images: (() => {
      let urls = [];
      if (Array.isArray(rawProp.images) && rawProp.images.length > 0) urls = rawProp.images;
      else if (details.images && Array.isArray(details.images) && details.images.length > 0) urls = details.images;
      else if (rawProp.image_url) urls = [rawProp.image_url];
      else if (rawProp.imageUrl) urls = [rawProp.imageUrl];
      
      if (urls.length === 0) return [];
      
      return urls.map(url => {
        if (typeof url !== 'string' || url.trim() === '' || url === 'null' || url === 'undefined') return "EMPTY";
        return url;
      });
    })(),
    agentName: rawProp.agent_name || rawProp.agentName || details.contactName || 'Owner',
    availability: rawProp.availability || details.availableFrom || 'Immediately',
    propertyType: rawProp.type || rawProp.propertyType || details.apartmentType || 'Apartment',
    propertyAge: rawProp.property_age || details.propertyAge || '1-5 Years',
    facing: rawProp.facing || details.facing || 'East',
    parking: rawProp.parking || details.parkingAvailable || 'Car & Bike',
    balcony: rawProp.balcony || (details.balcony ? `${details.balcony} Balcony` : '1 Balcony'),
    waterSupply: rawProp.water_supply || details.waterSupply || 'Corporation & Borewell',
    petAllowed: rawProp.pet_allowed !== undefined ? (rawProp.pet_allowed ? 'Yes' : 'No') : (details.petAllowed !== undefined ? (details.petAllowed ? 'Yes' : 'No') : 'Yes'),
    postedOn: rawProp.created_at ? new Date(rawProp.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recently',
    availableFrom: rawProp.available_from ? new Date(rawProp.available_from).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Immediately',
    baths: rawProp.baths || rawProp.bathrooms || details.bathrooms || 2
  };

  // Always maintain the 5-box layout for the UI design, but use 'EMPTY' for missing images
  const displayImages = [
    p.images[0] || "EMPTY",
    p.images[1] || "EMPTY",
    p.images[2] || "EMPTY",
    p.images[3] || "EMPTY",
    p.images[4] || "EMPTY",
  ];

  const similarApartments = [
    { title: "3BHK Anna Nagar West", location: "Anna Nagar · 1.2km", price: "₹42k/mo", iconClass: styles.blueBox },
    { title: "4BHK Luxury — ECR", location: "ECR · 4.5km", price: "₹95k/mo", iconClass: styles.greenBox },
    { title: "2BHK Studio — Velachery", location: "Velachery · 0.9km", price: "₹28k/mo", iconClass: styles.peachBox }
  ];

  let categoryName = "Apartments";
  let categoryLink = "/apartments";
  
  const typeLower = (p.propertyType || '').toLowerCase();
  const rawTypeLower = (rawProp.type || '').toLowerCase();

  if (typeLower.includes('commercial') || typeLower.includes('shop') || typeLower.includes('office') || rawTypeLower.includes('commercial')) {
    categoryName = "Commercial";
    categoryLink = "/commercial-properties";
  } else if (typeLower.includes('pg') || typeLower.includes('hostel') || rawTypeLower.includes('pg')) {
    categoryName = "PG & Hostels";
    categoryLink = "/pg-hostels";
  } else if (typeLower.includes('flatmate') || rawTypeLower.includes('flatmate')) {
    categoryName = "Flatmates";
    categoryLink = "/flatmate-finder";
  } else if (typeLower.includes('villa') || rawTypeLower.includes('villa')) {
    categoryName = "Villas";
    categoryLink = "/villas-and-bungalows";
  }

  const localLocation = p.location.split(',')[0];
  const city = p.location.toLowerCase().includes('chennai') ? 'Chennai' : 'Chennai';

  const targetCategory = rawProp.category || (typeLower.includes('commercial') || typeLower.includes('shop') || typeLower.includes('office') ? 'commercial' : typeLower.includes('pg') || typeLower.includes('hostel') ? 'pg' : typeLower.includes('flatmate') ? 'flatmate' : 'apartment');
  const similarPropsFiltered = allProperties.filter(apt => apt.id !== rawProp.id && apt.category === targetCategory);
  const displaySimilar = similarPropsFiltered.length > 2 ? similarPropsFiltered.slice(0, 3) : allProperties.filter(apt => apt.id !== rawProp.id).slice(0, 3);
  
  const similarText = targetCategory === 'commercial' ? 'SIMILAR COMMERCIAL' : 
                      targetCategory === 'pg' ? 'SIMILAR PGs' : 
                      targetCategory === 'flatmate' ? 'SIMILAR FLATMATES' : 'SIMILAR APARTMENTS';

  return (
    <div className={styles.page}>
      <Navbar />
      
      <main className={styles.mainWrapper}>
        <div className={styles.layout}>
          
          {/* Left Sidebar */}
          <aside className={styles.leftSidebar}>
            
            {/* Early Access Widget */}
            <div className={styles.earlyAccessWidget}>
              <span className={styles.earlyAccessTag}>
                <Star size={12} fill="currentColor" /> EARLY ACCESS
              </span>
              <h2 className={styles.earlyAccessTitle}>
                Get Early Access To Premium Listings
              </h2>
              <p className={styles.earlyAccessDesc}>
                Unlock 500+ off-market properties before they're publicly listed.
              </p>
              <Link href="/premium" style={{ textDecoration: 'none' }}>
                <button className={styles.premiumBtn}>
                  <Award size={14} /> Go Premium
                </button>
              </Link>
            </div>
            
            {/* Similar Apartments */}
            <div className={styles.widgetCard}>
              <h4 className={styles.cardHeader}>{similarText}</h4>
              <div className={styles.similarList}>
                {displaySimilar.map((apt, i) => (
                  <Link href={`/property/${apt.id}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.similarItem}>
                      <div className={`${styles.similarIconBox} ${i === 0 ? styles.blueBox : i === 1 ? styles.greenBox : styles.peachBox}`}>
                        {i < 2 && <Building2 className={styles.buildingIcon} color="rgba(0,0,0,0.5)" strokeWidth={1.5} />}
                      </div>
                      <div className={styles.similarDetails}>
                        <div className={styles.similarTitle}>{apt.title || 'Premium Property'}</div>
                      </div>
                      <div className={styles.similarPrice}>₹{(apt.price || 0).toLocaleString('en-IN')}/mo</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Prime Widget */}
            <div className={styles.primeWidget}>
              <div className={styles.primeHeader}>
                <span className={styles.primeLogo}>PRIME</span>
                <span className={styles.sponsoredBadge}>Sponsored</span>
              </div>
              <div style={{fontSize: '10px', color: '#9CA3AF', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600}}>AMAZON PRIME VIDEO</div>
              <h3 className={styles.primeTitle}>
                Start streaming 10,000+ movies this weekend
              </h3>
              <p className={styles.primeDesc}>
                30-day free trial. Cancel anytime. No commitment.
              </p>
              <button className={styles.primeBtn}>
                <PlayCircle size={16} fill="white" color="#EF4444" /> Try Free
              </button>
            </div>

            {/* Location Insights */}
            <div className={styles.widgetCard}>
              <h4 className={styles.cardHeader}>LOCATION INSIGHTS</h4>
              
              <div className={styles.locationStatsGrid}>
                <div className={styles.statBox}>
                  <span className={styles.statValue}>420m</span>
                  <span className={styles.statLabel}>Metro Dist.</span>
                </div>
                <div className={styles.statRow}>
                  <div className={styles.statBox}>
                    <span className={`${styles.statValue} ${styles.statValueOrange}`}>8+</span>
                    <span className={styles.statLabel}>Schools</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={`${styles.statValue} ${styles.statValueDark}`}>22 min</span>
                    <span className={styles.statLabel}>Commute</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.insightsList}>
                <div className={styles.insightRow}>
                  <span className={styles.insightLabel}>Traffic Score</span>
                  <span className={styles.insightValGreen}>Low</span>
                </div>
                <div className={styles.insightRow}>
                  <span className={styles.insightLabel}>Popularity</span>
                  <span className={styles.insightValGreen}>Very High</span>
                </div>
                <div className={styles.insightRow}>
                  <span className={styles.insightLabel}>Eateries</span>
                  <span className={styles.insightValGreen}>40+</span>
                </div>
              </div>
            </div>

            {/* SecureHome Ad */}
            <div className={styles.secureHomeWidget}>
              <span className={styles.adBadge}>Ad</span>
              <div className={styles.shHeader}>
                <Shield size={18} /> SecureHome
              </div>
              <div className={styles.shTitle}>Protect your rental with renter's insurance</div>
              <div className={styles.shDesc}>From ₹299/month. Covers theft, fire & natural disasters.</div>
              <button className={styles.shBtn}>
                <Shield size={14} /> Get Quote
              </button>
            </div>

            {/* Urban Ladder Ad */}
            <div className={styles.urbanLadderWidget}>
              <span className={styles.adBadge}>Ad</span>
              <div className={styles.ulHeaderRow}>
                <span className={styles.ulBrand}>Urban Ladder</span>
                <span className={styles.ulOffer}>30% Off</span>
              </div>
              <div className={styles.ulTitle}>Furnish your new home with premium furniture</div>
              <button className={styles.ulBtn}>
                <ShoppingBag size={14} /> Shop Now
              </button>
            </div>

            {/* PackersXpress Ad */}
            <div className={styles.packersWidget}>
              <span className={styles.adBadge}>Sponsored</span>
              <div className={styles.pxHeader}>
                <div className={styles.pxIconBox}>
                  <Truck size={18} />
                </div>
                <span className={styles.pxBrand}>PackersXpress</span>
              </div>
              <div className={styles.pxTitle}>Moving to Adyar? Get instant quotes from verified packers</div>
              <div className={styles.pxDesc}>Compare 50+ movers. Guaranteed lowest price.</div>
              <button className={styles.ulBtn}>
                <Truck size={14} /> Get Quote
              </button>
            </div>
            
          </aside>
          
          {/* Main Content */}
          <div className={styles.mainContent}>
            
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href="/">Home</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <Link href="/">Chennai</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <Link href={categoryLink}>{categoryName}</Link>
              {localLocation && localLocation !== 'Chennai' && (
                <>
                  <ChevronRight size={14} className={styles.breadcrumbIcon} />
                  <Link href={categoryLink}>{localLocation}</Link>
                </>
              )}
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <span className={styles.breadcrumbActive}>{p.title}</span>
            </div>
            
            {/* Photo Gallery Grid with Lightbox */}
            <ImageGallery displayImages={displayImages} allImages={p.images.length >= 5 ? p.images : displayImages} />
            
            {/* Title Section */}
            <div className={styles.titleSection}>
              <h1 className={styles.propTitle}>{p.title}</h1>
              <div className={styles.propLocationRow}>
                <MapPin size={18} className={styles.propLocationIcon} />
                <span><span className={styles.propLocationBold}>{p.location}</span></span>
                <span className={styles.metroBadge}>
                  <Train size={14} className={styles.trainIcon} /> 600m from Metro
                </span>
              </div>
              <div className={styles.propMetaRow}>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>Posted {p.availability}</span>
                </div>
                <span className={styles.metaDivider}>|</span>
                <div className={styles.metaItem}>
                  <RotateCcw size={16} />
                  <span>Updated today</span>
                </div>
              </div>
            </div>

            {/* About Property */}
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>About Property</h2>
              <p className={styles.aboutText}>
                {p.description}
              </p>
              <button className={styles.readMoreBtn}>Read more <ChevronDown size={14} /></button>
            </div>

            {/* Overview */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <span className={styles.noticeBadge}>🔔 Notice Period: 15 Days</span>
              </div>
              <div className={styles.overviewBox}>
                <div className={styles.overviewGrid}>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Users size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Preferred Tenant</div>
                      <div className={styles.overviewValue}>{p.tenantPref}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Layers size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Property Type</div>
                      <div className={styles.overviewValue}>{p.propertyType}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Ruler size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Built-up Area</div>
                      <div className={styles.overviewValue}>{p.sqft} sq.ft</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><History size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Property Age</div>
                      <div className={styles.overviewValue}>{p.propertyAge}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Compass size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Facing</div>
                      <div className={styles.overviewValue}>{p.facing}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Building2 size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>BHK Type</div>
                      <div className={styles.overviewValue}>{p.bhk} BHK</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Armchair size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Furnishing</div>
                      <div className={styles.overviewValue}>{p.furnishing}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><b style={{ fontSize: '14px' }}>P</b></div>
                    <div>
                      <div className={styles.overviewLabel}>Parking</div>
                      <div className={styles.overviewValue}>{p.parking}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Calculator size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>No. of Bathrooms</div>
                      <div className={styles.overviewValue}>{p.baths}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><DoorOpen size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Balcony</div>
                      <div className={styles.overviewValue}>{p.balcony}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Droplets size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Water Supply</div>
                      <div className={styles.overviewValue}>{p.waterSupply}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Dog size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Pet Allowed</div>
                      <div className={styles.overviewValue}>{p.petAllowed}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><CalendarDays size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Posted On</div>
                      <div className={styles.overviewValue}>{p.postedOn}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><CalendarCheck size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Available From</div>
                      <div className={styles.overviewValue}>{p.availableFrom}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Amenities</h2>
              </div>
              <div className={styles.amenitiesGrid}>
                {p.amenities.map((amenity: string, idx: number) => {
                  let Icon = ShieldCheck;
                  const amLower = amenity.toLowerCase();
                  if (amLower.includes('ac') || amLower.includes('air')) Icon = Snowflake;
                  else if (amLower.includes('wifi') || amLower.includes('internet')) Icon = Wifi;
                  else if (amLower.includes('gym') || amLower.includes('fitness')) Icon = Dumbbell;
                  else if (amLower.includes('park') || amLower.includes('car')) Icon = Car;
                  else if (amLower.includes('pool')) Icon = Waves;
                  else if (amLower.includes('sec')) Icon = ShieldCheck;
                  
                  return (
                    <div key={idx} className={styles.amenityPill}>
                      <Icon size={14} className={styles.amenityIcon} /> {amenity}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Nearby */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Nearby</h2>
              </div>
              <div className={styles.nearbyGrid}>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/restaurant.png" alt="Restaurant" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Gowtam Restaurant</div>
                    <div className={styles.nearbyType}>Restaurant</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 1.1 km away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/bus.png" alt="Bus Stop" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Zoo Stand</div>
                    <div className={styles.nearbyType}>Bus Stop</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 1.1 km away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/metro.png" alt="Metro Station" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Adyar Metro Station</div>
                    <div className={styles.nearbyType}>Metro Station</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 600 m away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/mall.png" alt="Shopping Center" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Spencer's Mall</div>
                    <div className={styles.nearbyType}>Shopping Center</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 800 m away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/hospital.png" alt="Hospital" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Apollo Hospital</div>
                    <div className={styles.nearbyType}>Hospital</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 1.4 km away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/school.png" alt="School" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>DAV Public School</div>
                    <div className={styles.nearbyType}>School</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 900 m away</div>
                  </div>
                </div>
              </div>
              <div className={styles.mapContainer}>
                <iframe 
                  src="https://maps.google.com/maps?q=Adyar,%20Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, borderRadius: '14px' }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            </div>

            {/* Similar Properties */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Similar Properties</h2>
                <Link href="/" className={styles.seeAllLink}>See all <ChevronRight size={14} /></Link>
              </div>
              
              <div className={styles.simPropRow}>
                {(similarPropsFiltered.length > 5 ? similarPropsFiltered.slice(0, 10) : allProperties.filter(apt => apt.id !== rawProp.id).slice(0, 10)).map((prop, idx) => {
                  let imgUrl = "https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image";
                  if (Array.isArray(prop.images) && prop.images.length > 0) imgUrl = prop.images[0];
                  else if (prop.image_url) imgUrl = prop.image_url;
                  else if (prop.imageUrl) imgUrl = prop.imageUrl;

                  return (
                    <Link href={`/property/${prop.id}`} key={idx} style={{ textDecoration: 'none' }}>
                      <div className={styles.simPropCard}>
                        <ImageWithFallback 
                          src={imgUrl} 
                          fallbackSrc="https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image"
                          alt={prop.title || `Property ${idx + 1}`} 
                          className={styles.simPropImg} 
                        />
                        <div className={styles.simPropBottom}>
                          <div className={styles.simPropPrice}>₹{(prop.price || 0).toLocaleString('en-IN')}<small>/mo</small></div>
                          <div className={styles.simPropTitle}>{prop.title || 'Premium Property'}</div>
                          <div className={styles.simPropLocation}><MapPin size={12} color="#EF4444" /> {prop.location_address || prop.location || 'Chennai'}</div>
                          <ContactOwnerButton 
                            propertyId={prop.id} 
                            propertyTitle={prop.title}
                            className={styles.simPropBtn} 
                            variant="outline"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

          </div>
          
          {/* Right Sidebar */}
          <aside className={styles.rightSidebar}>
            
            {/* Main Rent Card */}
            <div className={styles.widgetCard} style={{ padding: '24px' }}>
              <div className={styles.rentLabel}>MONTHLY RENT</div>
              <div className={styles.rentPrice}>
                ₹ {Number(p.price).toLocaleString('en-IN')}<span className={styles.rentPeriod}>/month</span>
              </div>
              
              <div className={styles.financialGrid}>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Deposit</span>
                  <span className={styles.finValue}>₹{Number(p.deposit).toLocaleString('en-IN')}</span>
                </div>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Maintenance</span>
                  <span className={styles.finValue}>₹{Number(p.maintenance).toLocaleString('en-IN')}/mo</span>
                </div>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Brokerage</span>
                  <span className={`${styles.finValue} ${styles.finFree}`}>₹0 FREE</span>
                </div>
              </div>
              
              <ContactOwnerButton 
                propertyId={id} 
                propertyTitle={p.title}
                ownerId={rawProp.user_id || rawProp.userId || p.agentName}
                className={styles.primaryBtn} 
                variant="primary"
              />
              
              <SidebarActions property={{
                id: id,
                title: p.title,
                location: p.location,
                price: p.price,
                image: (p.images && p.images[0] && p.images[0] !== 'EMPTY') ? p.images[0] : 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image',
                features: [`${p.bhk} BHK`, `${p.sqft} sqft`]
              }} />
              
              <div className={styles.ownerProfile}>
                <div className={styles.ownerAvatar}>{p.agentName.substring(0, 2).toUpperCase()}</div>
                <div className={styles.ownerName}>{p.agentName}</div>
              </div>
            </div>
            
            {/* Zero Brokerage Card */}
            <div className={styles.zeroBrokerage}>
              <div className={styles.zbHeader}>
                <Star size={12} fill="currentColor" /> ZERO BROKERAGE
              </div>
              <p className={styles.zbDesc}>
                Connect directly with owner. No middlemen, no hidden fees — ever.
              </p>
              <button className={styles.zbBtn}>
                <Star size={12} fill="currentColor" /> Explore Premium <ArrowRight size={12} />
              </button>
            </div>
            
            {/* Recently Viewed */}
            <div className={styles.widgetCard}>
              <h4 className={styles.cardHeader}>RECENTLY VIEWED</h4>
              <div className={styles.similarList}>
                {allProperties.slice(0, 3).map((apt, i) => (
                  <Link href={`/property/${apt.id}`} key={i} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <div className={styles.similarItem}>
                      <div className={`${styles.similarIconBox} ${i === 0 ? styles.blueBox : i === 1 ? styles.greenBox : styles.peachBox}`} style={{ fontSize: '20px' }}>
                        <Building2 className={styles.buildingIcon} color="rgba(0,0,0,0.5)" strokeWidth={1.5} />
                      </div>
                      <div className={styles.similarDetails}>
                        <div className={styles.similarTitle}>{apt.title || 'Premium Property'}</div>
                      </div>
                      <div className={styles.similarPrice}>₹{(apt.price || 0).toLocaleString('en-IN')}/mo</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Hotstar Premium Ad */}
            <div className={styles.hotstarWidget}>
              <span className={styles.adBadgeSquare}>Ad</span>
              <div className={styles.hsHeader}>HOTSTAR PREMIUM</div>
              <div className={styles.hsTitle}>Watch IPL 2026 LIVE</div>
              <div className={styles.hsDesc}>Unlimited streaming. All devices. HD quality.</div>
              <button className={styles.hsBtn}>
                <MonitorPlay size={14} /> Subscribe Now
              </button>
            </div>

            {/* HomePay EMI Ad */}
            <div className={styles.homePayWidget}>
              <span className={styles.adBadgeSquareWhite}>Sponsored</span>
              <div className={styles.hpHeaderRow}>
                <span className={styles.hpBrand}>HomePay EMI</span>
                <span className={styles.hpOffer}>0% interest</span>
              </div>
              <div className={styles.hpTitle}>Pay your rent deposit in easy EMIs</div>
              <button className={styles.hpBtn}>
                <Landmark size={14} /> Apply Now
              </button>
            </div>
            
          </aside>
          
        </div>
      </main>
    </div>
  );
}
