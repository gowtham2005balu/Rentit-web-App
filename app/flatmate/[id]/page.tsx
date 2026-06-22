import React from 'react';
import Navbar from '../../../components/Navbar';
import styles from '../../property/[id]/page.module.css';
import { ChevronRight, Camera, Image as ImageIcon, Star, Zap, Phone, Calendar, Bookmark, Share2, ArrowRight, Shield, ShoppingBag, Truck, Building2, PlayCircle, Award, MapPin, Clock, CalendarDays, ChevronDown, Users, Maximize2, Compass, BedDouble, Armchair, Car, Bath, Droplets, Dog, Flame, Video, Wind, Briefcase, Store, Dumbbell, Wifi, Utensils, Train, Hospital, GraduationCap, Map, RotateCcw, Layers, Ruler, History, Calculator, DoorOpen, CalendarCheck, ArrowUpDown, Snowflake, Martini, ShoppingCart, ShieldCheck, Waves, Brush, Navigation, Bus, TrainFront, School, MonitorPlay, Landmark, FileText } from 'lucide-react';
import Link from 'next/link';

export default function FlatmateDetailPage({ params }: { params: { id: string } }) {
  // Mock image URLs matching the design structure
  const images = [
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800", // Left Top
    "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=800", // Left Bottom
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600", // Right Top
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600", // Right Middle
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600", // Right Bottom
  ];
  
  const similarApartments = [
    { title: "3BHK Anna Nagar West", location: "Anna Nagar · 1.2km", price: "₹42k/mo", iconClass: styles.blueBox },
    { title: "4BHK Luxury — ECR", location: "ECR · 4.5km", price: "₹95k/mo", iconClass: styles.greenBox },
    { title: "2BHK Studio — Velachery", location: "Velachery · 0.9km", price: "₹28k/mo", iconClass: styles.peachBox }
  ];

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
              <h4 className={styles.cardHeader}>SIMILAR FLATMATES</h4>
              <div className={styles.similarList}>
                {similarApartments.map((apt, i) => (
                  <div key={i} className={styles.similarItem}>
                    <div className={`${styles.similarIconBox} ${apt.iconClass}`}>
                      {i < 2 && <Building2 className={styles.buildingIcon} color="rgba(0,0,0,0.5)" strokeWidth={1.5} />}
                    </div>
                    <div className={styles.similarDetails}>
                      <div className={styles.similarTitle}>{apt.title}</div>
                      <div className={styles.similarLocation}>{apt.location}</div>
                    </div>
                    <div className={styles.similarPrice}>{apt.price}</div>
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
              <Link href="/flatmate">Flatmates</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <Link href="/flatmate">Adyar</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <span className={styles.breadcrumbActive}>3BHK Flatmate</span>
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
              <h1 className={styles.propTitle}>Premium Boys PG in Anna Nagar West</h1>
              <div className={styles.propLocationRow}>
                <MapPin size={18} className={styles.propLocationIcon} />
                <span><span className={styles.propLocationBold}>Anna Nagar West</span> • Chennai</span>
                <span className={styles.metroBadge}>
                  <Train size={14} className={styles.trainIcon} /> 800m from Metro
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

            {/* About Property */}
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>About Property</h2>
              <p className={styles.aboutText}>
                Nested on the 5th floor of Asset Doctors Apartment in the prime locality of Kasturba Nagar, Adyar, this fully furnished 3BHK offers a premium living experience in Chennai's most sought-after residential neighborhood. The apartment features Italian marble flooring throughout, a large modular kitchen with premium appliances, and three spacious bedrooms with attached bathrooms. Large bay windows flood the interiors with natural light and offer uninterrupted views of the skyline of Adyar. The building comes with round-the-clock security, a fully equipped gymnasium, swimming pool, and dedicated covered parking for two vehicles.
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
                      <div className={styles.overviewValue}>Male / Students</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Layers size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Floor Number</div>
                      <div className={styles.overviewValue}>8 / 15</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Ruler size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Built-up Area</div>
                      <div className={styles.overviewValue}>1,581 sq.ft</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><History size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Property Age</div>
                      <div className={styles.overviewValue}>5–10 Years</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Compass size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Facing</div>
                      <div className={styles.overviewValue}>South</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Building2 size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>BHK Type</div>
                      <div className={styles.overviewValue}>3 BHK</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Armchair size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Furnishing</div>
                      <div className={styles.overviewValue}>Semi Furnished</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><b style={{ fontSize: '14px' }}>P</b></div>
                    <div>
                      <div className={styles.overviewLabel}>Parking</div>
                      <div className={styles.overviewValue}>Bike Only</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Calculator size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>No. of Bathrooms</div>
                      <div className={styles.overviewValue}>3</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><DoorOpen size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Balcony</div>
                      <div className={styles.overviewValue}>1 Balcony</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Droplets size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Water Supply</div>
                      <div className={styles.overviewValue}>Corporation</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Dog size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Pet Allowed</div>
                      <div className={styles.overviewValue}>Yes</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><CalendarDays size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Posted On</div>
                      <div className={styles.overviewValue}>22 Apr 2026</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><CalendarCheck size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Available From</div>
                      <div className={styles.overviewValue}>June 2, 2026</div>
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
                <div className={styles.amenityPill}><Flame size={14} className={styles.amenityIcon} /> Gas</div>
                <div className={styles.amenityPill}><Video size={14} className={styles.amenityIcon} /> CCTV</div>
                <div className={styles.amenityPill}><ArrowUpDown size={14} className={styles.amenityIcon} /> Lift</div>
                <div className={styles.amenityPill}><Snowflake size={14} className={styles.amenityIcon} /> AC</div>
                <div className={styles.amenityPill}><Brush size={14} className={styles.amenityIcon} /> House Keeper</div>
                <div className={styles.amenityPill}><Martini size={14} className={styles.amenityIcon} /> Club House</div>
                <div className={styles.amenityPill}><ShoppingCart size={14} className={styles.amenityIcon} /> Shopping Center</div>
                <div className={styles.amenityPill}><Zap size={14} className={styles.amenityIcon} /> Power Backup</div>
                <div className={styles.amenityPill}><Dumbbell size={14} className={styles.amenityIcon} /> Gym</div>
                <div className={styles.amenityPill}><Waves size={14} className={styles.amenityIcon} /> Swimming Pool</div>
                <div className={styles.amenityPill}><ShieldCheck size={14} className={styles.amenityIcon} /> 24/7 Security</div>
                <div className={styles.amenityPill}><Wifi size={14} className={styles.amenityIcon} /> High-speed WiFi</div>
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
                {[
                  { img: '1', price: '1,80,000', title: 'Worli Sea Face Tower', loc: 'Worli, Mumbai' },
                  { img: '2', price: '1,45,000', title: 'Ariana Residency', loc: 'Parel, Mumbai' },
                  { img: '3', price: '2,10,000', title: 'India Bulls Sky Forest', loc: 'Dadar, Mumbai' },
                  { img: '4', price: '95,000', title: 'Bandra Heights', loc: 'Bandra, Mumbai' },
                  { img: '1', price: '1,20,000', title: 'Ocean View Apartments', loc: 'Juhu, Mumbai' },
                  { img: '2', price: '1,65,000', title: 'Green Valley Homes', loc: 'Powai, Mumbai' },
                  { img: '3', price: '2,50,000', title: 'Skyline Penthouse', loc: 'Lower Parel, Mumbai' },
                  { img: '4', price: '85,000', title: 'Sunset Boulevard', loc: 'Andheri West, Mumbai' },
                  { img: '1', price: '1,95,000', title: 'Marina Bay Towers', loc: 'Colaba, Mumbai' },
                  { img: '2', price: '1,30,000', title: 'Palm Grove Estate', loc: 'Khar, Mumbai' }
                ].map((prop, idx) => (
                  <div key={idx} className={styles.simPropCard}>
                    <img src={`/images/sim_prop_${prop.img}.png`} alt={`Property ${idx + 1}`} className={styles.simPropImg} />
                    <div className={styles.simPropBottom}>
                      <div className={styles.simPropPrice}>₹{prop.price}<small>/mo</small></div>
                      <div className={styles.simPropTitle}>{prop.title}</div>
                      <div className={styles.simPropLocation}><MapPin size={12} color="#EF4444" /> {prop.loc}</div>
                      <button className={styles.simPropBtn}>Contact Owner</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
          
          {/* Right Sidebar */}
          <aside className={styles.rightSidebar}>
            
            {/* Main Rent Card */}
            <div className={styles.widgetCard} style={{ padding: '24px' }}>
              <div className={styles.rentLabel}>MONTHLY RENT</div>
              <div className={styles.rentPrice}>
                ₹ 7,000 - ₹ 14,000<span className={styles.rentPeriod}>/month</span>
              </div>
              
              <div className={styles.financialGrid}>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Deposit</span>
                  <span className={styles.finValue}>₹1,20,000</span>
                </div>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Maintenance</span>
                  <span className={styles.finValue}>₹3,000/mo</span>
                </div>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Brokerage</span>
                  <span className={`${styles.finValue} ${styles.finFree}`}>₹0 FREE</span>
                </div>
              </div>
              
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
                {[
                  { title: "Maple Residency, Porur", location: "Porur, Chennai", price: "₹58k/mo", iconClass: styles.blueBox, icon: <Building2 className={styles.buildingIcon} color="rgba(0,0,0,0.5)" strokeWidth={1.5} /> },
                  { title: "Lakeview Villa, ECR", location: "ECR, Chennai", price: "₹1.2L/mo", iconClass: styles.greenBox, icon: '🌿' },
                  { title: "OMR Tech Heights", location: "OMR, Chennai", price: "₹32k/mo", iconClass: styles.peachBox, icon: '🏠' }
                ].map((apt, i) => (
                  <div key={i} className={styles.similarItem}>
                    <div className={`${styles.similarIconBox} ${apt.iconClass}`} style={{ fontSize: '20px' }}>
                      {apt.icon}
                    </div>
                    <div className={styles.similarDetails}>
                      <div className={styles.similarTitle}>{apt.title}</div>
                      <div className={styles.similarLocation}>{apt.location}</div>
                    </div>
                    <div className={styles.similarPrice}>{apt.price}</div>
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
