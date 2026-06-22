import React from 'react';
import Navbar from '../../../components/Navbar';
import styles from '../../property/[id]/page.module.css';
import { ChevronRight, Camera, Image as ImageIcon, Star, Zap, Phone, Calendar, Bookmark, Share2, ArrowRight, Shield, ShoppingBag, Truck, Building2, PlayCircle, Award, MapPin, Clock, CalendarDays, ChevronDown, Users, Maximize2, Compass, BedDouble, Armchair, Car, Bath, Droplets, Dog, Flame, Video, Wind, Briefcase, Store, Dumbbell, Wifi, Utensils, Train, Hospital, GraduationCap, Map, RotateCcw, Layers, Ruler, History, Calculator, DoorOpen, CalendarCheck, ArrowUpDown, Snowflake, Martini, ShoppingCart, ShieldCheck, Waves, Brush, Navigation, Bus, TrainFront, School, MonitorPlay, Landmark, FileText, Monitor } from 'lucide-react';
import Link from 'next/link';

export default function CommercialDetailPage({ params }: { params: { id: string } }) {
  // Mock image URLs matching the design structure
  const images = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800", // Left Top - Office space
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=800", // Left Bottom - Conference room
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600", // Right Top - Desk area
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600", // Right Middle - Reception
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600", // Right Bottom - Break room
  ];
  
  const similarProperties = [
    { title: "2500 sqft Office — OMR", location: "OMR · 1.2km", price: "₹1.2L/mo", iconClass: styles.blueBox },
    { title: "Furnished Co-working", location: "Guindy · 4.5km", price: "₹95k/mo", iconClass: styles.greenBox },
    { title: "Retail Shop Space", location: "Velachery · 0.9km", price: "₹45k/mo", iconClass: styles.peachBox }
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
                Get Early Access To Premium Commercial Spaces
              </h2>
              <p className={styles.earlyAccessDesc}>
                Unlock 200+ prime office and retail spaces before they hit the market.
              </p>
              <button className={styles.premiumBtn}>
                <Award size={14} /> Go Premium
              </button>
            </div>
            
            {/* Similar Properties */}
            <div className={styles.widgetCard}>
              <h4 className={styles.cardHeader}>SIMILAR COMMERCIAL SPACES</h4>
              <div className={styles.similarList}>
                {similarProperties.map((apt, i) => (
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
            
            {/* Location Insights */}
            <div className={styles.widgetCard}>
              <h4 className={styles.cardHeader}>LOCATION INSIGHTS</h4>
              
              <div className={styles.locationStatsGrid}>
                <div className={styles.statBox}>
                  <span className={styles.statValue}>200m</span>
                  <span className={styles.statLabel}>Metro Dist.</span>
                </div>
                <div className={styles.statRow}>
                  <div className={styles.statBox}>
                    <span className={`${styles.statValue} ${styles.statValueOrange}`}>12+</span>
                    <span className={styles.statLabel}>Cafes</span>
                  </div>
                  <div className={styles.statBox}>
                    <span className={`${styles.statValue} ${styles.statValueDark}`}>High</span>
                    <span className={styles.statLabel}>Footfall</span>
                  </div>
                </div>
              </div>
              
              <div className={styles.insightsList}>
                <div className={styles.insightRow}>
                  <span className={styles.insightLabel}>IT Parks</span>
                  <span className={styles.insightValGreen}>3 Nearby</span>
                </div>
                <div className={styles.insightRow}>
                  <span className={styles.insightLabel}>Accessibility</span>
                  <span className={styles.insightValGreen}>Excellent</span>
                </div>
                <div className={styles.insightRow}>
                  <span className={styles.insightLabel}>Parking Ease</span>
                  <span className={styles.insightValGreen}>Good</span>
                </div>
              </div>
            </div>

            {/* SecureBiz Ad */}
            <div className={styles.secureHomeWidget}>
              <span className={styles.adBadge}>Ad</span>
              <div className={styles.shHeader}>
                <Shield size={18} /> SecureBiz
              </div>
              <div className={styles.shTitle}>Protect your business with commercial insurance</div>
              <div className={styles.shDesc}>From ₹999/month. Covers equipment, liability & fire.</div>
              <button className={styles.shBtn}>
                <Shield size={14} /> Get Quote
              </button>
            </div>

            {/* Office Furniture Ad */}
            <div className={styles.urbanLadderWidget}>
              <span className={styles.adBadge}>Ad</span>
              <div className={styles.ulHeaderRow}>
                <span className={styles.ulBrand}>WorkSpace</span>
                <span className={styles.ulOffer}>Bulk 20% Off</span>
              </div>
              <div className={styles.ulTitle}>Furnish your office with ergonomic chairs & desks</div>
              <button className={styles.ulBtn}>
                <ShoppingBag size={14} /> Shop Now
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
              <Link href="/commercial">Commercial</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <Link href="/commercial">Guindy</Link>
              <ChevronRight size={14} className={styles.breadcrumbIcon} />
              <span className={styles.breadcrumbActive}>Office Space</span>
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
                    +8 Photos
                  </div>
                  <div className={styles.photoCountBadge}>
                    1 / 13
                  </div>
                </div>
              </div>
              
            </div>
            
            {/* Title Section */}
            <div className={styles.titleSection}>
              <h1 className={styles.propTitle}>Premium Fully Furnished Office Space in Guindy</h1>
              <div className={styles.propLocationRow}>
                <MapPin size={18} className={styles.propLocationIcon} />
                <span><span className={styles.propLocationBold}>Olympia Tech Park, Guindy</span> • Chennai South, Chennai</span>
                <span className={styles.metroBadge}>
                  <Train size={14} className={styles.trainIcon} /> 200m from Guindy Metro
                </span>
              </div>
              <div className={styles.propMetaRow}>
                <div className={styles.metaItem}>
                  <Clock size={16} />
                  <span>Posted 1 week ago</span>
                </div>
                <span className={styles.metaDivider}>|</span>
                <div className={styles.metaItem}>
                  <RotateCcw size={16} />
                  <span>Updated yesterday</span>
                </div>
              </div>
            </div>

            {/* About Property */}
            <div className={styles.sectionContainer}>
              <h2 className={styles.sectionTitle} style={{ marginBottom: '16px' }}>About Property</h2>
              <p className={styles.aboutText}>
                Located in the prestigious Olympia Tech Park in Guindy, this premium 4,500 sq.ft fully furnished office space is ready to move in. Designed for modern tech and corporate teams, the workspace features 60 linear workstations, 3 executive cabins, a 12-seater conference room with AV setup, and a spacious cafeteria. The building boasts 100% power backup, centralized HVAC, 24/7 security with access control, and dedicated basement parking for 4 cars and 15 two-wheelers. Ideal for IT/ITES companies looking for a plug-and-play solution in Chennai's prime commercial hub.
              </p>
              <button className={styles.readMoreBtn}>Read more <ChevronDown size={14} /></button>
            </div>

            {/* Overview */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Overview</h2>
                <span className={styles.noticeBadge}>🔔 Immediate Possession</span>
              </div>
              <div className={styles.overviewBox}>
                <div className={styles.overviewGrid}>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Building2 size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Property Type</div>
                      <div className={styles.overviewValue}>Office Space</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Ruler size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Super Built-up Area</div>
                      <div className={styles.overviewValue}>4,500 sq.ft</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Layers size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Floor Number</div>
                      <div className={styles.overviewValue}>4 / 10</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Monitor size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Workstations</div>
                      <div className={styles.overviewValue}>60 Seats</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Briefcase size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Cabins</div>
                      <div className={styles.overviewValue}>3 Executive</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Users size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Conference Room</div>
                      <div className={styles.overviewValue}>1 (12-seater)</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Armchair size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Furnishing</div>
                      <div className={styles.overviewValue}>Plug & Play</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Car size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Parking</div>
                      <div className={styles.overviewValue}>4 Cars, 15 Bikes</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Bath size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Washrooms</div>
                      <div className={styles.overviewValue}>Private (M/F)</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Utensils size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Pantry</div>
                      <div className={styles.overviewValue}>Wet Pantry setup</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Snowflake size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>AC Type</div>
                      <div className={styles.overviewValue}>Centralized</div>
                    </div>
                  </div>
                  <div className={styles.overviewItem}>
                    <div className={styles.overviewIconBox}><Zap size={16} /></div>
                    <div>
                      <div className={styles.overviewLabel}>Power Backup</div>
                      <div className={styles.overviewValue}>100% DG Backup</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Business Amenities</h2>
              </div>
              <div className={styles.amenitiesGrid}>
                <div className={styles.amenityPill}><Snowflake size={14} className={styles.amenityIcon} /> Central AC</div>
                <div className={styles.amenityPill}><Zap size={14} className={styles.amenityIcon} /> 100% Power Backup</div>
                <div className={styles.amenityPill}><Video size={14} className={styles.amenityIcon} /> CCTV Security</div>
                <div className={styles.amenityPill}><ShieldCheck size={14} className={styles.amenityIcon} /> 24/7 Security Guard</div>
                <div className={styles.amenityPill}><ArrowUpDown size={14} className={styles.amenityIcon} /> Service Lifts</div>
                <div className={styles.amenityPill}><Wifi size={14} className={styles.amenityIcon} /> Server Room</div>
                <div className={styles.amenityPill}><Flame size={14} className={styles.amenityIcon} /> Fire Safety & Alarms</div>
                <div className={styles.amenityPill}><Utensils size={14} className={styles.amenityIcon} /> Cafeteria/Food Court</div>
                <div className={styles.amenityPill}><Car size={14} className={styles.amenityIcon} /> Visitor Parking</div>
                <div className={styles.amenityPill}><Building2 size={14} className={styles.amenityIcon} /> Reception Area</div>
              </div>
            </div>

            {/* Nearby */}
            <div className={styles.sectionContainer}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>Nearby Hubs</h2>
              </div>
              <div className={styles.nearbyGrid}>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/metro.png" alt="Metro Station" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Guindy Metro</div>
                    <div className={styles.nearbyType}>Metro Station</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 200 m away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/train.png" alt="Train Station" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Guindy Railway Station</div>
                    <div className={styles.nearbyType}>Railway Station</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 300 m away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/airport.png" alt="Airport" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>Chennai International Airport</div>
                    <div className={styles.nearbyType}>Airport</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 6.5 km away</div>
                  </div>
                </div>
                <div className={styles.nearbyItem}>
                  <div className={styles.nearbyIconBox}>
                    <img src="/icons/restaurant.png" alt="Restaurant" />
                  </div>
                  <div className={styles.nearbyDetails}>
                    <div className={styles.nearbyTitle}>ITC Grand Chola</div>
                    <div className={styles.nearbyType}>5 Star Hotel</div>
                    <div className={styles.nearbyDist}><Navigation size={10} strokeWidth={3} /> 1.2 km away</div>
                  </div>
                </div>
              </div>
              <div className={styles.mapContainer}>
                <iframe 
                  src="https://maps.google.com/maps?q=Guindy,%20Chennai&t=&z=14&ie=UTF8&iwloc=&output=embed" 
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

          </div>
          
          {/* Right Sidebar */}
          <aside className={styles.rightSidebar}>
            
            {/* Main Rent Card */}
            <div className={styles.widgetCard} style={{ padding: '24px' }}>
              <div className={styles.rentLabel}>MONTHLY RENT</div>
              <div className={styles.rentPrice}>
                ₹ 3,15,000<span className={styles.rentPeriod}>/month</span>
              </div>
              <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '-4px', marginBottom: '16px' }}>₹70 per sq.ft</div>
              
              <div className={styles.financialGrid}>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Deposit (6 Months)</span>
                  <span className={styles.finValue}>₹18.9L</span>
                </div>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Maintenance</span>
                  <span className={styles.finValue}>₹10/sq.ft</span>
                </div>
                <div className={styles.finBox}>
                  <span className={styles.finLabel}>Lock-in Period</span>
                  <span className={styles.finValue}>3 Years</span>
                </div>
              </div>
              
              <button className={styles.primaryBtn}>
                <Phone size={16} /> Contact Agent
              </button>
              
              <button className={styles.secondaryBtn}>
                <Calendar size={16} /> Schedule a Site Visit
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
                <div className={styles.ownerAvatar}>PE</div>
                <div className={styles.ownerName}>Prime Estates (Agent)</div>
              </div>
            </div>
            
            {/* Zero Brokerage Card - Hidden for Commercial, replaced with Agent verify */}
            <div className={styles.zeroBrokerage} style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 100%)', borderColor: '#bfdbfe' }}>
              <div className={styles.zbHeader} style={{ color: '#1d4ed8' }}>
                <ShieldCheck size={12} /> VERIFIED AGENT
              </div>
              <p className={styles.zbDesc} style={{ color: '#1e3a8a' }}>
                This commercial property is listed by a RERA registered agent. 100% verified documents.
              </p>
              <button className={styles.zbBtn} style={{ background: '#2563eb' }}>
                <FileText size={12} color="white" /> View RERA Details
              </button>
            </div>
            
          </aside>
          
        </div>
      </main>
    </div>
  );
}
