"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  Bell, 
  MessageSquare, 
  CircleHelp, 
  Plus, 
  Building2, 
  Mail, 
  Eye, 
  MessageCircle, 
  Phone, 
  Rocket, 
  Heart, 
  Share2, 
  Pencil, 
  ArrowRight,
  Home,
  Settings2,
  MapPin,
  ChevronDown,
  Calendar,
  Award,
  Settings,
  LogOut,
  Search
} from 'lucide-react';
import styles from './dashboard.module.css';
import EditPropertyModal from './components/EditPropertyModal';

export default function DashboardPage() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, userId, logout } = useAuth();

  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [activeListings, setActiveListings] = useState<any[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [recentEnquiries, setRecentEnquiries] = useState<any[]>([]);
  const [stats, setStats] = useState({
    activeListings: 0,
    newEnquiries: 0,
    totalViews: 0,
    activeChats: 0
  });
  const [performance, setPerformance] = useState({
    profileViews: 1240,
    responseRate: '92%',
    avgResponseTime: '1.4 hrs'
  });
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);

  const loadProfile = () => {
    if (isAuthenticated && userId) {
      const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${userId}`) || '{}');
      if (localProfile.name) setUserName(localProfile.name);
      if (localProfile.photo) setUserPhoto(localProfile.photo);
      if (localProfile.email) setUserEmail(localProfile.email);
      
      fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          if (data.user.name) setUserName(data.user.name);
          if (data.user.photo) setUserPhoto(data.user.photo);
          if (data.user.email) setUserEmail(data.user.email);
        }
      })
      .catch(() => {});
    }
  };

  useEffect(() => {
    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    const storedFavs = JSON.parse(localStorage.getItem('rentit_favorites') || '[]');
    setFavorites(storedFavs);
    return () => window.removeEventListener('profileUpdated', loadProfile);
  }, [isAuthenticated, userId]);

  const toggleFavorite = (id: string) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter(favId => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('rentit_favorites', JSON.stringify(updated));
  };

  const handleSaveProperty = (updatedProperty: any) => {
    setActiveListings(prev => prev.map(p => {
      if ((p.id || p._id) === (updatedProperty.id || updatedProperty._id)) {
        return updatedProperty;
      }
      return p;
    }));
    setEditingProperty(null);
  };

  const handleEditListing = (listing: any) => {
    const id = listing.id || listing._id || listing._key;
    const draftPayload = {
      editPropertyId: id,
      currentStep: 1,
      propertyCategory: listing.propertyCategory || listing.type || 'Residential',
      listingPurpose: listing.listingPurpose || 'For Rent',
      city: listing.city || listing.location || 'Chennai',
      contactName: userName || 'Owner',
      apartmentType: listing.apartmentType || '',
      apartmentName: listing.apartmentName || listing.title || '',
      builtUpArea: listing.builtUpArea || listing.sqft || '',
      bhkType: listing.bhkType || listing.bhk || '2 BHK',
      monthlyRent: listing.monthlyRent || listing.price || '',
      locality: listing.locality || listing.location || '',
      propertyAge: listing.propertyAge || '1-5 Years',
      floorNumber: listing.floorNumber || '1',
      totalFloors: listing.totalFloors || '4',
      furnishingType: listing.furnishingType || 'semi',
      parkingAvailable: listing.parkingAvailable || 'car'
    };
    
    localStorage.setItem('rentit_property_draft', JSON.stringify(draftPayload));
    router.push(`/add-property?edit=${id}`);
  };

  useEffect(() => {
    // Fetch real property data
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Temporarily simulating user listings using DB items
          setActiveListings(data.slice(0, 3));
        }
      })
      .catch(err => console.error("Error fetching properties:", err))
      .finally(() => setIsLoadingListings(false));

    // Fetch real dashboard stats
    if (userId) {
      fetch(`/api/dashboard/stats?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.stats) {
            setStats(data.stats);
          }
          if (data.success && data.performance) {
            setPerformance(data.performance);
          }
        })
        .catch(console.error)
        .finally(() => setIsLoadingStats(false));
    }

    // Fetch real enquiries
    if (userId) {
      fetch(`/api/messages?userId=${userId}`)
        .then(res => res.json())
        .then(data => {
          if (data.success && data.chats) {
            setRecentEnquiries(data.chats.slice(0, 3));
          }
        })
        .catch(console.error);
    }
  }, [userId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.pageContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className={styles.logoSection}>
              <span className={styles.logoTextDark}>RENT</span>
              <span className={styles.logoTextOrange}>IT</span>
            </div>
          </Link>
          <div className={styles.searchBar}>
            <Search size={16} color="#94A3B8" />
            <input type="text" placeholder="Search properties, tenants..." className={styles.searchInput} />
          </div>
        </div>

        <nav className={styles.headerNav}>
          <Link href="/dashboard" className={`${styles.navLink} ${styles.navLinkActive}`}>Dashboard</Link>
          <Link href="/dashboard/listings" className={styles.navLink}>Listings</Link>
          <Link href="/chat" className={styles.navLink}>
            <span className={styles.navLinkTextWrapper}>
              Enquiries
            </span>
          </Link>
          <Link href="/premium" className={styles.navLink}>Packages</Link>
          <Link href="/contact" className={styles.navLink}>Support</Link>
        </nav>

        <div className={styles.headerRight}>
          <button className={styles.iconBtn}>
            <MessageSquare size={20} />
            <span className={styles.dotBadge}>5</span>
          </button>
          <button className={styles.iconBtn}>
            <Bell size={20} />
            <span className={styles.dotBadge}>2</span>
          </button>

          <div className={styles.profileSection} ref={profileDropdownRef}>
            <div className={styles.userAvatarWrapper} onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <div className={styles.avatar} style={userPhoto ? { backgroundImage: `url(${userPhoto})`, backgroundSize: 'cover', color: 'transparent' } : {}}>
                {!userPhoto && (userName ? userName.charAt(0).toUpperCase() : (userId?.toString().charAt(0).toUpperCase() || 'U'))}
              </div>
            </div>

            {isProfileOpen && (
              <div className={styles.profileDropdown}>
                <div className={styles.profileHeader}>
                  <div className={styles.profileName}>{userName || `User #${userId || ''}`}</div>
                  <div className={styles.profileEmail}>{userEmail || 'Verified User'}</div>
                </div>
                
                <div className={styles.dropdownDivider}></div>
                
                <div className={styles.dropdownMenu}>
                  <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Home size={18} />
                    <span>My Listings</span>
                  </Link>
                  <Link href="/chat" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <MessageSquare size={18} />
                    <span>My Chat</span>
                  </Link>
                  <Link href="/visits?tab=shortlist" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Heart size={18} />
                    <span>Your Shortlist</span>
                  </Link>
                  <Link href="/visits" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Calendar size={18} />
                    <span>Visits Scheduled</span>
                  </Link>
                  <Link href="/premium" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Award size={18} />
                    <span>Premium</span>
                  </Link>
                  
                  <div className={styles.dropdownDivider}></div>
                  
                  <Link href="/settings" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                    <Settings size={18} />
                    <span>Settings</span>
                  </Link>
                  <button className={styles.dropdownItem} onClick={() => { logout(); setIsProfileOpen(false); }} style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', color: 'inherit' }}>
                    <LogOut size={18} />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link href="/add-property" style={{ textDecoration: 'none' }}>
            <button className={styles.addPropertyBtn}>
              <Plus size={16} />
              Add Property
            </button>
          </Link>
        </div>
      </header>

      <div className={styles.mainContainer}>
        <div className={styles.welcomeHeader}>
          <h1 className={styles.welcomeTitle}>Welcome back{userName ? `, ${userName.split(' ')[0]}!` : '!'}</h1>
          <p className={styles.welcomeSubtitle}>
            Manage your properties and grow your rental business. You have <strong>24 new enquiries</strong> today.
          </p>
        </div>

        <div className={styles.topGrid}>
          <div className={styles.topMainColumn}>
            {/* Premium Banner */}
            <div className={styles.premiumBanner}>
              <div className={styles.premiumBadge}>
                <Rocket size={14} />
                Rentit Premium
              </div>
              <h2 className={styles.premiumTitle}>Unlock Premium Visibility for Your Listings</h2>
              <p className={styles.premiumDesc}>
                Get 5x more tenant enquiries, verified badge, and priority placement in search results. Join 50,000+ owners on Rentit Premium.
              </p>
              <div className={styles.premiumActions}>
                <Link href="/premium" style={{ textDecoration: 'none' }}>
                  <button className={styles.goPremiumBtn}>
                    <Rocket size={16} />
                    Go Premium
                  </button>
                </Link>
                <Link href="/premium" style={{ textDecoration: 'none' }}>
                  <button className={styles.explorePlansBtn}>Explore Plans</button>
                </Link>
              </div>
            </div>

            {/* Stats Row */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={`${styles.statIconWrapper} ${styles.statIconBg1}`}>
                  <Building2 size={20} />
                </div>
                <div className={`${styles.statTrend} ${styles.trendUp}`}>↗ +2</div>
                <h3 className={styles.statValue}>{isLoadingStats ? '-' : stats.activeListings}</h3>
                <p className={styles.statTitle}>Active Listings</p>
                <p className={styles.statSubtitle}>2 expiring in 7 days</p>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIconWrapper} ${styles.statIconBg2}`}>
                  <Mail size={20} />
                </div>
                <div className={`${styles.statTrend} ${styles.trendUp}`}>↗ +18%</div>
                <h3 className={styles.statValue}>{isLoadingStats ? '-' : stats.newEnquiries}</h3>
                <p className={styles.statTitle}>New Enquiries</p>
                <p className={styles.statSubtitle}>vs 14 last week</p>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIconWrapper} ${styles.statIconBg3}`}>
                  <Eye size={20} />
                </div>
                <div className={`${styles.statTrend} ${styles.trendUp}`}>↗ +42%</div>
                <h3 className={styles.statValue}>{isLoadingStats ? '-' : stats.totalViews}</h3>
                <p className={styles.statTitle}>Total Views This Week</p>
                <p className={styles.statSubtitle}>Across all properties</p>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statIconWrapper} ${styles.statIconBg4}`}>
                  <MessageCircle size={20} />
                </div>
                <div className={`${styles.statTrend} ${styles.trendDown}`}>↘ -3</div>
                <h3 className={styles.statValue}>{isLoadingStats ? '-' : stats.activeChats}</h3>
                <p className={styles.statTitle}>Active Chats</p>
                <p className={styles.statSubtitle}>12 awaiting reply</p>
              </div>
            </div>
          </div>

          <div className={styles.topSideColumn}>
            {/* Need Assistance Card */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>
                <HeadsetWrapper />
                Need Assistance?
              </h3>
              <p className={styles.sideCardText}>
                Our property listing experts are here to help you get tenants faster and manage your properties better.
              </p>
              <Link href="/contact" style={{ textDecoration: 'none' }}>
                <button className={styles.callSupportBtn}>
                  <Phone size={14} />
                  Call Support
                </button>
              </Link>
            </div>

            {/* Performance Card */}
            <div className={styles.sideCard}>
              <h3 className={styles.sideCardTitle}>
                <LineChartWrapper />
                This Month's Performance
              </h3>
              <div className={styles.perfList}>
                <div className={styles.perfItem}>
                  <span className={styles.perfLabel}>Profile Views</span>
                  <span className={styles.perfValue}>{isLoadingStats ? '-' : performance.profileViews.toLocaleString()}</span>
                </div>
                <div className={styles.perfItem}>
                  <span className={styles.perfLabel}>Response Rate</span>
                  <span className={`${styles.perfValue} ${styles.perfValueGreen}`}>{isLoadingStats ? '-' : performance.responseRate}</span>
                </div>
                <div className={styles.perfItem}>
                  <span className={styles.perfLabel}>Avg Response Time</span>
                  <span className={styles.perfValue}>{isLoadingStats ? '-' : performance.avgResponseTime}</span>
                </div>
              </div>
            </div>

            {/* Upgrade Card */}
            <div className={styles.upgradeCard}>
              <span className={styles.upgradeBadge}>PREMIUM</span>
              <h3 className={styles.upgradeTitle}>Upgrade for More Reach</h3>
              <p className={styles.upgradeText}>
                Premium owners get 5x more enquiries, priority listing, and verified badge.
              </p>
              <Link href="/premium" style={{ textDecoration: 'none' }}>
                <button className={styles.viewPackagesBtn}>
                  <Rocket size={14} />
                  View Packages
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Active Listings Section */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Active Listings <span style={{ color: '#64748B', fontSize: '14px', fontWeight: 500, marginLeft: '8px' }}>{activeListings.length}</span></h2>
          <Link href="/dashboard/listings" className={styles.viewAllLink}>
            View All
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.listingsGrid}>
          {isLoadingListings ? (
            <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748B' }}>
              Loading your properties...
            </div>
          ) : activeListings.length > 0 ? (
            activeListings.map((listing, idx) => (
              <div className={styles.listingCard} key={listing._key || `${listing.type || 'prop'}-${listing.id || listing._id || idx}`}>
                {/* ... listing image wrapper ... */}
                <div className={styles.listingContent}>
                  <h3 className={styles.listingTitle}>{listing.title || 'Property'}</h3>
                  <p className={styles.listingLocation}><MapPin size={12} /> {listing.location || listing.city}</p>
                  <div className={styles.listingPrice}>₹{listing.price || listing.expectedRent || 0}<span>/mo</span></div>
                  <div className={styles.listingTags}>
                    {listing.propertyType && <span className={styles.listingTag}>{listing.propertyType}</span>}
                    {listing.bhkType && <span className={styles.listingTag}>{listing.bhkType}</span>}
                  </div>
                  <div className={styles.listingButtons}>
                    <button className={styles.listingEditBtn} onClick={() => handleEditListing(listing)}><Pencil size={14} /> Edit</button>
                    <Link href="/premium" className={styles.listingBoostBtn} style={{ textDecoration: 'none' }}><Rocket size={14} /> Boost</Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748B', background: '#F8FAFC', borderRadius: '12px' }}>
              No active listings found.
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomGrid}>
          {/* Recent Enquiries */}
          <div>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Enquiries</h2>
              <Link href="/chat" className={styles.viewAllLink}>
                View All
                <ArrowRight size={14} />
              </Link>
            </div>
            
            <div className={styles.enquiriesList}>
              {recentEnquiries.length > 0 ? (
                recentEnquiries.map((enquiry, index) => (
                  <Link 
                    href={`/chat?conversationId=${enquiry.id}`} 
                    className={styles.enquiryCard} 
                    key={enquiry.id || index}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className={styles.enquiryLeft}>
                      <div className={`${styles.enquiryAvatar} ${styles[`avatar${['Green', 'Blue', 'Purple'][index % 3]}`] || styles.avatarGreen}`}>{enquiry.initials || 'U'}</div>
                      <div>
                        <h4 className={styles.enquiryName}>{enquiry.name}</h4>
                        <p className={styles.enquiryInterest}>Interested in: {enquiry.sub} — ₹{(enquiry.property?.price || 0).toLocaleString('en-IN')}/mo</p>
                      </div>
                    </div>
                    <div className={styles.enquiryRight}>
                      <span className={styles.enquiryTime}>{enquiry.time || 'Recently'}</span>
                      <button className={styles.enquiryAction}><MessageSquare size={14} /></button>
                    </div>
                  </Link>
                ))
              ) : (
                <div style={{ padding: '1.5rem', textAlign: 'center', color: '#64748B' }}>
                  No recent enquiries.
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Quick Actions</h2>
            </div>
            
            <div className={styles.quickActionsGrid}>
              <Link href="/add-property" style={{ textDecoration: 'none' }}>
                <div className={styles.quickActionCard}>
                  <div className={styles.qaIconWrapper} style={{ backgroundColor: '#F1F5F9', color: '#475569' }}>
                    <Home size={20} />
                  </div>
                  <h4 className={styles.qaTitle}>Add New</h4>
                  <p className={styles.qaSubtitle}>Post a new listing</p>
                </div>
              </Link>
              
              <Link href="/premium" style={{ textDecoration: 'none' }}>
                <div className={styles.quickActionCard}>
                  <div className={styles.qaIconWrapper} style={{ backgroundColor: '#FEF3C7', color: '#F59E0B' }}>
                    <Rocket size={20} />
                  </div>
                  <h4 className={styles.qaTitle}>Boost Listing</h4>
                  <p className={styles.qaSubtitle}>Get 5x more views</p>
                </div>
              </Link>

              <Link href="/chat" style={{ textDecoration: 'none' }}>
                <div className={styles.quickActionCard}>
                  <div className={styles.qaIconWrapper} style={{ backgroundColor: '#DCFCE7', color: '#10B981' }}>
                    <MessageSquare size={20} />
                  </div>
                  <h4 className={styles.qaTitle}>View Messages</h4>
                  <p className={styles.qaSubtitle}>5 unread chats</p>
                </div>
              </Link>

              <Link href="/dashboard/listings" style={{ textDecoration: 'none' }}>
                <div className={styles.quickActionCard}>
                  <div className={styles.qaIconWrapper} style={{ backgroundColor: '#EFF6FF', color: '#3B82F6' }}>
                    <Settings2 size={20} />
                  </div>
                  <h4 className={styles.qaTitle}>Manage Listings</h4>
                  <p className={styles.qaSubtitle}>Edit all properties</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// Simple wrapper components for icons we didn't import
function HeadsetWrapper() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>
  );
}

function LineChartWrapper() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
  );
}
