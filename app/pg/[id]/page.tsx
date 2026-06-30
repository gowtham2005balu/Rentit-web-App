import React from 'react';
import Navbar from '../../../components/Navbar';
import styles from '../../property/[id]/page.module.css';
import { ChevronRight, Camera, Image as ImageIcon, Star, Zap, Phone, Calendar, Bookmark, Share2, ArrowRight, Shield, ShoppingBag, Truck, Building2, PlayCircle, Award, MapPin, Clock, CalendarDays, ChevronDown, Users, Maximize2, Compass, BedDouble, Armchair, Car, Bath, Droplets, Dog, Flame, Video, Wind, Briefcase, Store, Dumbbell, Wifi, Utensils, Train, Hospital, GraduationCap, Map, RotateCcw, Layers, Ruler, History, Calculator, DoorOpen, CalendarCheck, ArrowUpDown, Snowflake, Martini, ShoppingCart, ShieldCheck, Waves, Brush, Navigation, Bus, TrainFront, School, MonitorPlay, Landmark, FileText, Shirt, Tv, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { fetchPropertyById, fetchAllProperties } from '@/lib/backend';

export default async function PgDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const id = resolvedParams.id;

  let rawProp: any = null;
  let allProperties: any[] = [];

  // Try fetching from backend API
  rawProp = await fetchPropertyById(id);

  const allRows = await fetchAllProperties();
  allProperties = allRows.filter((r: any) =>
    (r.type || '').toLowerCase().includes('pg') || (r.propertyType || '').toLowerCase().includes('pg')
  );
  if (!rawProp && allRows.length > 0) {
    rawProp = allRows.find((p: any) => (p._id || p.id)?.toString() === id);
  }

  const details = rawProp && typeof rawProp.details === 'string' ? JSON.parse(rawProp.details) : (rawProp?.details || {});

  const p = {
    title: rawProp?.propertyName || rawProp?.title || details.pgName || details.title || 'Premium Co-living PG',
    location: rawProp?.location_address || details.fullAddress || details.locality || rawProp?.location || 'Chennai',
    price: rawProp?.rent || rawProp?.price || details.expectedRent || 12000,
    deposit: rawProp?.deposit || details.expectedDeposit || (rawProp?.price ? Number(rawProp.price) * 3 : 36000),
    description: rawProp?.propertyDescription || rawProp?.description || details.description || "Nested on the 5th floor of Asset Doctors Apartment in the prime locality of Kasturba Nagar, Adyar, this fully furnished 3BHK offers a premium living experience in Chennai's most sought-after residential neighborhood.",
    tenantPref: details.availableFor || rawProp?.tenantPref || 'Male / Female',
    sqft: rawProp?.sqft || details.builtUpArea || '1500 sq.ft',
    age: rawProp?.property_age || details.propertyAge || '1-5 Years',
    facing: rawProp?.facing || details.facing || 'East',
    bhk: rawProp?.bhk || details.bhkType || '3 BHK',
    furnishing: rawProp?.furnishing || details.furnishingType || 'Fully Furnished',
    parking: rawProp?.parking || details.parking || 'Car & Bike',
    baths: rawProp?.baths || details.bathrooms || 2,
    balcony: rawProp?.balcony || details.balconies || '1 Balcony',
    waterSupply: rawProp?.water_supply || details.waterSupply || 'Corporation',
    foodIncluded: details.foodIncluded !== undefined ? (details.foodIncluded ? 'Yes' : 'No') : 'Yes',
    postedOn: rawProp?.created_at ? new Date(rawProp.created_at).toLocaleDateString('en-GB') : '22 Apr 2026',
    availableFrom: details.availableFrom || 'Immediately',
    amenities: rawProp?.amenities || details.amenities || ['Gas', 'CCTV', 'Lift', 'AC', 'House Keeper', 'Power Backup', 'Gym', 'Swimming Pool', '24/7 Security', 'High-speed WiFi']
  };

  const images = (() => {
    let urls: string[] = [];
    if (Array.isArray(rawProp?.images) && rawProp.images.length > 0) urls = rawProp.images;
    else if (details?.images && Array.isArray(details.images) && details.images.length > 0) urls = details.images;
    else if (rawProp?.image_url) urls = [rawProp.image_url];

    const fallbacks = [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800'
    ];

    const finalUrls = [...urls];
    for (let i = finalUrls.length; i < 5; i++) {
      finalUrls.push(fallbacks[i % 5]);
    }
    return finalUrls;
  })();

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
              <button className={styles.premiumBtn}>
                <Award size={14} /> Go Premium
              </button>
            </div>

            {/* Similar Apartments */}
            <div className={styles.widgetCard}>
              <h4 className={styles.cardHeader}>SIMILAR PGS</h4>
              <div className={styles.similarList}>
                {allProperties.slice(0, 3).map((apt, i) => (
                  <div key={i} className={styles.similarItem}>
                    <div className={`${styles.similarIconBox} ${i === 0 ? styles.blueBox : i === 1 ? styles.greenBox : styles.peachBox}`}>
                      {i < 2 && <Building2 className={styles.buildingIcon} color="rgba(0,0,0,0.5)" strokeWidth={1.5} />}
                    </div>
                    <div className={styles.similarDetails}>
                      <div className={styles.similarTitle}>{apt.title || 'Premium Property'}</div>
                      <div className={styles.similarLocation}>{apt.location_address || apt.location || 'Chennai'}</div>
                    </div>
                    <div className={styles.similarPrice}>₹{Number(apt.price).toLocaleString('en-IN')}/mo</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Prime Widget */}
            <div className={styles.primeWidget}>
              <div className={styles.primeHeader}>
                <span className={styles.primeLogo}>PRIME</span>
                <span className={styles.sponsoredBadge}>Sponsored</span>
              </div>
              <div style={{ fontSize: '10px', color: '#9CA3AF', marginBottom: '8px', letterSpacing: '0.5px', textTransform: 'uppercase', fontWeight: 600 }}>AMAZON PRIME VIDEO</div>
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
              <Link href="/pg">PGs</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <Link href="/pg">Adyar</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <span className={styles.breadcrumbActive}>{p.title}</span>
            </div>

            {/* Photo Gallery Grid */}
            <div className={styles.galleryGrid}>

              {/* Left Column (2 large images) */}
              <div className={styles.leftColumn}>
                <div className={styles.imageWrapper}>
                  <img src={images[0]} alt="Property View 1" className={styles.galleryImage} />
                </div>
                <div className={styles.imageWrapper}>
                  <img src={images[1]} alt="Property View 2" className={styles.galleryImage} />
                  <button className={styles.viewAllBtn}>
                    <Maximize2 size={14} />
                    View all photos
                  </button>
                </div>
              </div>

              {/* Right Column (3 smaller images) */}
              <div className={styles.rightColumn}>
                <div className={styles.imageWrapper}>
                  <img src={images[2]} alt="Property View 3" className={styles.galleryImage} />
                </div>
                <div className={styles.imageWrapper}>
                  <img src={images[3]} alt="Property View 4" className={styles.galleryImage} />
                </div>
                <div className={styles.imageWrapper}>
                  <img src={images[4]} alt="Property View 5" className={styles.galleryImage} />
                  <div className={styles.morePhotosOverlay}>
                    +13 Photos
                  </div>
                  <div className={styles.photoCountBadge}>
                    1 / 18
                  </div>
                </div>
              </div>

            </div>

            {/* Title Section */}
            <div className={styles.titleSection}>
              <h1 className={styles.propTitle}>{p.title}</h1>
              <div className={styles.propLocationRow}>
                <MapPin size={18} className={styles.propLocationIcon} />
                <span><span className={styles.propLocationBold}>{p.location}</span></span>
                <span className={styles.metroBadge}>
                  <Train size={14} className={styles.trainIcon} /> 600m from Adyar Metro
                </span>
              </div>
              <div className={styles.propMetaRow}>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>Posted 2 days ago</span>
                </div>
                <span className={styles.metaDivider}>|</span>
                <div className={styles.metaItem}>
                  <RotateCcw size={16} />
                  <span>Updated today</span>
                </div>
              </div>
            </div>

            {/* Room sharing cards row */}
            <div className={styles.sectionContainer} style={{ padding: '24px', borderRadius: '16px', border: '1px solid #e5e7eb', marginTop: '0px', marginBottom: '24px', backgroundColor: 'white' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                {details.selectedRooms && details.selectedRooms.length > 0 ? (
                  details.selectedRooms.map((roomType: string, idx: number) => {
                    let rentVal = Number(p.price);
                    if (roomType.includes('Single')) rentVal = Math.round(rentVal * 1.5);
                    else if (roomType.includes('Triple')) rentVal = Math.round(rentVal * 0.85);
                    else if (roomType.includes('Four')) rentVal = Math.round(rentVal * 0.7);

                    const depVal = rentVal * 2;

                    return (
                      <div key={idx} style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                        <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>{roomType}</div>
                        <div style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', marginBottom: '6px' }}>
                          ₹{rentVal.toLocaleString('en-IN')}<span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B' }}>/month</span>
                        </div>
                        <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Deposit ₹{depVal.toLocaleString('en-IN')}</div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>TRIPLE SHARING ROOM</div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', marginBottom: '6px' }}>
                        ₹7,000<span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B' }}>/month</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Deposit ₹14,000</div>
                    </div>
                    <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>TWO SHARING ROOM</div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', marginBottom: '6px' }}>
                        ₹8,000<span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B' }}>/month</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Deposit ₹16,000</div>
                    </div>
                    <div style={{ padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                      <div style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>SINGLE ROOM</div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#1E293B', marginBottom: '6px' }}>
                        ₹12,000<span style={{ fontSize: '13px', fontWeight: '400', color: '#64748B' }}>/month</span>
                      </div>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Deposit ₹24,000</div>
                    </div>
                  </>
                )}
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
                      <div className={styles.overviewLabel}>Floor Number</div>
                      <div className={styles.overviewValue}>{details.floor || '8 / 15'}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Ruler size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Built-up Area</div>
                      <div className={styles.overviewValue}>{p.sqft}</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><History size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Property Age</div>
                      <div className={styles.overviewValue}>{p.age}</div>
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
                      <div className={styles.overviewLabel}>Room Type</div>
                      <div className={styles.overviewValue}>{p.bhk}</div>
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
                      <div className={styles.overviewLabel}>Food Included</div>
                      <div className={styles.overviewValue}>{p.foodIncluded}</div>
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

            {/* Room Configurations */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Room Configurations</h2>
              </div>
              <div className={styles.roomConfigList}>
                {details.selectedRooms && details.selectedRooms.length > 0 ? (
                  details.selectedRooms.map((roomType: string, idx: number) => {
                    let rentVal = Number(p.price);
                    if (roomType.includes('Single')) rentVal = Math.round(rentVal * 1.5);
                    else if (roomType.includes('Triple')) rentVal = Math.round(rentVal * 0.85);
                    else if (roomType.includes('Four')) rentVal = Math.round(rentVal * 0.7);

                    const depVal = rentVal * 2;

                    return (
                      <div key={idx} className={styles.roomConfigCard}>
                        <div className={styles.rcHeader}>
                          <div className={styles.rcTitle}>{roomType}</div>
                        </div>
                        <div className={styles.rcPriceRow}>
                          <div className={styles.rcPrice}>₹{rentVal.toLocaleString('en-IN')}<span className={styles.rcPerMonth}>/month</span></div>
                          <div className={styles.rcDeposit}>Deposit ₹{depVal.toLocaleString('en-IN')}</div>
                        </div>
                        <div className={styles.rcAmenities}>
                          <div className={styles.rcAmenity}>
                            <Shirt size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                            <span className={styles.rcAmenityLabel}>Cupboard</span>
                          </div>
                          <div className={styles.rcAmenity}>
                            <Snowflake size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                            <span className={styles.rcAmenityLabel}>AC</span>
                          </div>
                          <div className={styles.rcAmenity}>
                            <Bath size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                            <span className={styles.rcAmenityLabel}>Att. Bath</span>
                          </div>
                          <div className={styles.rcAmenity}>
                            <Tv size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                            <span className={styles.rcAmenityLabel}>TV</span>
                          </div>
                          <div className={styles.rcAmenity}>
                            <Wifi size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                            <span className={styles.rcAmenityLabel}>WiFi</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <>
                    {/* Fallback to original hardcoded ones if no selected rooms found in payload */}
                    <div className={styles.roomConfigCard}>
                      <div className={styles.rcHeader}>
                        <div className={styles.rcTitle}>Three Sharing Room</div>
                      </div>
                      <div className={styles.rcPriceRow}>
                        <div className={styles.rcPrice}>₹7,000<span className={styles.rcPerMonth}>/month</span></div>
                        <div className={styles.rcDeposit}>Deposit ₹14,000</div>
                      </div>
                      <div className={styles.rcAmenities}>
                        <div className={styles.rcAmenity}>
                          <Shirt size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>Cupboard</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Snowflake size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>AC</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Bath size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>Att. Bath</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Tv size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>TV</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Wifi size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>WiFi</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.roomConfigCard}>
                      <div className={styles.rcHeader}>
                        <div className={styles.rcTitle}>Two Sharing Room</div>
                      </div>
                      <div className={styles.rcPriceRow}>
                        <div className={styles.rcPrice}>₹8,000<span className={styles.rcPerMonth}>/month</span></div>
                        <div className={styles.rcDeposit}>Deposit ₹16,000</div>
                      </div>
                      <div className={styles.rcAmenities}>
                        <div className={styles.rcAmenity}>
                          <Shirt size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>Cupboard</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Snowflake size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>AC</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Bath size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>Att. Bath</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Tv size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>TV</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Wifi size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>WiFi</span>
                        </div>
                      </div>
                    </div>

                    <div className={styles.roomConfigCard}>
                      <div className={styles.rcHeader}>
                        <div className={styles.rcTitle}>Single Room</div>
                      </div>
                      <div className={styles.rcPriceRow}>
                        <div className={styles.rcPrice}>₹12,000<span className={styles.rcPerMonth}>/month</span></div>
                        <div className={styles.rcDeposit}>Deposit ₹24,000</div>
                      </div>
                      <div className={styles.rcAmenities}>
                        <div className={styles.rcAmenity}>
                          <Shirt size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>Cupboard</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Snowflake size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>AC</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Bath size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>Att. Bath</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Tv size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>TV</span>
                        </div>
                        <div className={styles.rcAmenity}>
                          <Wifi size={20} strokeWidth={1.5} className={styles.rcAmenityIcon} />
                          <span className={styles.rcAmenityLabel}>WiFi</span>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            {/* Amenities */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Amenities</h2>
              </div>
              <div className={styles.amenitiesGrid}>
                {p.amenities.map((am: string, i: number) => (
                  <div key={i} className={styles.amenityPill}><CheckCircle2 size={14} className={styles.amenityIcon} /> {am}</div>
                ))}
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
                {allProperties.slice(0, 10).map((prop, idx) => (
                  <div key={idx} className={styles.simPropCard}>
                    <img src={prop.image_url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600'} alt={prop.title} className={styles.simPropImg} />
                    <div className={styles.simPropBottom}>
                      <div className={styles.simPropPrice}>₹{Number(prop.price).toLocaleString('en-IN')}<small>/mo</small></div>
                      <div className={styles.simPropTitle}>{prop.title || 'Premium Property'}</div>
                      <div className={styles.simPropLocation}><MapPin size={12} color="#EF4444" /> {prop.location_address || prop.location || 'Chennai'}</div>
                      <button className={styles.simPropBtn}>Contact Owner</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar */}
          <aside className={styles.rightSidebar}>

            {/* Main Rent Card - Starting From */}
            <div className={styles.widgetCard} style={{ padding: '24px', marginBottom: '16px' }}>
              <div className={styles.rentLabel}>STARTING FROM</div>
              <div className={styles.rentPrice}>
                ₹ {Number(p.price).toLocaleString('en-IN')}<span className={styles.rentPeriod}>/month</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                  <span style={{ color: '#64748B', fontWeight: '500' }}>Security Deposit</span>
                  <span style={{ fontWeight: '700', color: '#1E293B' }}>₹{Number(p.deposit).toLocaleString('en-IN')}</span>
                </div>

                {details.selectedRooms && details.selectedRooms.length > 0 ? (
                  details.selectedRooms.map((roomType: string, idx: number) => {
                    let rentVal = Number(p.price);
                    if (roomType.includes('Single')) rentVal = Math.round(rentVal * 1.5);
                    else if (roomType.includes('Triple')) rentVal = Math.round(rentVal * 0.85);
                    else if (roomType.includes('Four')) rentVal = Math.round(rentVal * 0.7);

                    return (
                      <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: idx < details.selectedRooms.length - 1 ? '1px solid #F1F5F9' : 'none', paddingBottom: '8px' }}>
                        <span style={{ color: '#64748B', fontWeight: '500' }}>{roomType}</span>
                        <span style={{ fontWeight: '700', color: '#1E293B' }}>₹{rentVal.toLocaleString('en-IN')}/mo</span>
                      </div>
                    );
                  })
                ) : (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B', fontWeight: '500' }}>Single Room</span>
                      <span style={{ fontWeight: '700', color: '#1E293B' }}>₹12,000/mo</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', borderBottom: '1px solid #F1F5F9', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B', fontWeight: '500' }}>Double Sharing</span>
                      <span style={{ fontWeight: '700', color: '#1E293B' }}>₹8,000/mo</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', paddingBottom: '8px' }}>
                      <span style={{ color: '#64748B', fontWeight: '500' }}>Triple Sharing</span>
                      <span style={{ fontWeight: '700', color: '#1E293B' }}>₹7,000/mo</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Main Rent Card - Contact Actions */}
            <div className={styles.widgetCard} style={{ padding: '16px' }}>
              <button className={styles.primaryBtn}>
                <Phone size={16} /> Contact Owner
              </button>

              <button className={styles.secondaryBtn}>
                <Calendar size={16} /> Schedule a Visit
              </button>

              <div className={styles.actionRow}>
                <button className={styles.actionBtn}>
                  <Bookmark size={14} /> Save
                </button>
                <button className={styles.actionBtn}>
                  <Share2 size={14} /> Share
                </button>
              </div>

              <div className={styles.ownerProfile}>
                <div className={styles.ownerAvatar}>SM</div>
                <div className={styles.ownerName}>Sunitha Menon</div>
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
                  <div key={i} className={styles.similarItem}>
                    <div className={`${styles.similarIconBox} ${i === 0 ? styles.blueBox : i === 1 ? styles.greenBox : styles.peachBox}`} style={{ fontSize: '20px' }}>
                      <Building2 className={styles.buildingIcon} color="rgba(0,0,0,0.5)" strokeWidth={1.5} />
                    </div>
                    <div className={styles.similarDetails}>
                      <div className={styles.similarTitle}>{apt.title || 'Premium Property'}</div>
                      <div className={styles.similarLocation}>{apt.location_address || apt.location || 'Chennai'}</div>
                    </div>
                    <div className={styles.similarPrice}>₹{Number(apt.price).toLocaleString('en-IN')}/mo</div>
                  </div>
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
