"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, Heart, Bell, MessageSquare, Plus, ChevronDown, Zap, Users, IndianRupee, MapPin, Users2, Camera, Info, Home as HomeIcon, Building2, Share2, Trash2 } from 'lucide-react';
import styles from './listings.module.css';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import EditPropertyModal from '../components/EditPropertyModal';

export default function DashboardListingsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [onlyActive, setOnlyActive] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>('none');
  const { isAuthenticated, userId } = useAuth();
  const router = useRouter();
  const [userListings, setUserListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [editingProperty, setEditingProperty] = useState<any | null>(null);
  const [activatedListings, setActivatedListings] = useState<string[]>([]);

  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  const loadProfile = () => {
    if (isAuthenticated && userId) {
      const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${userId}`) || '{}');
      if (localProfile.firstName) setUserName(localProfile.firstName);
      else if (localProfile.name) setUserName(localProfile.name);
      if (localProfile.photo) setUserPhoto(localProfile.photo);

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
    setUserListings(prev => prev.map(p => {
      if ((p.id || p._id) === (updatedProperty.id || updatedProperty._id)) {
        return { ...p, ...updatedProperty };
      }
      return p;
    }));
    setEditingProperty(null);
  };

  const handleRequestActivation = (id: string) => {
    setActivatedListings(prev => [...prev, id]);
  };

  const handleEditListing = (listing: any, targetStep: number = 1) => {
    const id = listing.id || listing._id || listing._key;
    const draftPayload = {
      editPropertyId: id,
      currentStep: targetStep,
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

  const tabs = ['All', 'Commercial-Rent', 'PG/Hostel', 'Flatmates'];

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          // Fetch the real live user properties
          setUserListings(data);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [userId]);

  let filteredListings = userListings.filter(listing => {
    if (activeTab === 'All') return true;
    if (activeTab === 'PG/Hostel') return listing.propertyType === 'PG' || listing.type === 'PG / Hostel';
    if (activeTab === 'Flatmates') return listing.propertyType === 'Flatmate' || listing.type === 'Flatmate';
    if (activeTab === 'Commercial-Rent' || activeTab === 'Commercial-Sale') return listing.propertyType === 'Commercial';
    return listing.type?.includes(activeTab) || listing.propertyType?.includes(activeTab);
  });

  if (sortOrder === 'price_asc') {
    filteredListings.sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
  } else if (sortOrder === 'price_desc') {
    filteredListings.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
  }

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
            <input type="text" placeholder="Search listings..." className={styles.searchInput} />
          </div>
        </div>

        <nav className={styles.headerNav}>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link href="/dashboard/listings" className={`${styles.navLink} ${styles.navLinkActive}`}>Listings</Link>
          <Link href="/chat" className={styles.navLink}>
            Enquiries
          </Link>
          <Link href="/premium" className={styles.navLink}>Packages</Link>
        </nav>

        <div className={styles.headerRight}>
          <Link href="/saved" style={{ textDecoration: 'none' }}>
            <button className={styles.iconBtn}><Heart size={20} /></button>
          </Link>
          <button className={styles.iconBtn}>
            <Bell size={20} />
            <span className={styles.dotBadge}></span>
          </button>
          <Link href="/chat" style={{ textDecoration: 'none' }}>
            <button className={styles.iconBtn}><MessageSquare size={20} /></button>
          </Link>
          <Link href="/add-property" style={{ textDecoration: 'none' }}>
            <button className={styles.addPropertyBtn}>
              <Plus size={16} />
              Add Property
            </button>
          </Link>
          <div className={styles.avatar} style={userPhoto ? { backgroundImage: `url(${userPhoto})`, backgroundSize: 'cover', color: 'transparent' } : {}}>
            {!userPhoto && (userName ? userName.charAt(0).toUpperCase() : (userId?.toString().charAt(0).toUpperCase() || 'U'))}
          </div>
          <ChevronDown size={16} color="#64748B" />
        </div>
      </header>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {/* Left Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarCard}>
            <h2 className={styles.sidebarTitle}>Sell or Rent your Property For Free</h2>
            
            <div className={styles.featureList}>
              <div className={styles.featureItem}>
                <div className={`${styles.featureIconWrapper} ${styles.iconGreen}`}>
                  <IndianRupee size={16} />
                </div>
                <div className={styles.featureText}>Zero Brokerage — Always</div>
              </div>
              <div className={styles.featureItem}>
                <div className={`${styles.featureIconWrapper} ${styles.iconOrange}`}>
                  <Zap size={16} />
                </div>
                <div className={styles.featureText}>Get tenants 5x faster</div>
              </div>
              <div className={styles.featureItem}>
                <div className={`${styles.featureIconWrapper} ${styles.iconGrey}`}>
                  <Users size={16} />
                </div>
                <div className={styles.featureText}>10 lac tenant/buyer connections</div>
              </div>
            </div>

            <div className={styles.testimonialBox}>
              <h3 className={styles.testimonialTitle}>30 Lac+</h3>
              <p className={styles.testimonialSubtitle}>Home Owners Trust Rentit</p>
              <p className={styles.testimonialText}>
                "The service I got from Rentit was incredibly helpful. I found a great tenant in just 8 days for my property. Highly recommend!"
              </p>
              <p className={styles.testimonialAuthor}>Anil Kant | Chennai</p>
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className={styles.contentArea}>
          <div className={styles.contentHeader}>
            <div className={styles.postedInfo}>
              You have already posted <strong>{userListings.length} properties</strong> on Rentit
            </div>
            <label className={styles.toggleActive}>
              <div 
                className={styles.toggleSwitch} 
                style={{ backgroundColor: onlyActive ? '#10B981' : '#E2E8F0' }}
                onClick={() => setOnlyActive(!onlyActive)}
              >
                <div style={{ transform: onlyActive ? 'translateX(16px)' : 'translateX(0)', transition: '0.2s', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }} />
              </div>
              Only Active
            </label>
          </div>

          <div className={styles.filtersRow} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {tabs.map(tab => (
                <button 
                  key={tab} 
                  className={`${styles.filterPill} ${activeTab === tab ? styles.filterPillActive : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '20px', border: '1px solid #E2E8F0', fontSize: '13px', color: '#64748B', outline: 'none', cursor: 'pointer', background: 'white' }}
              >
                <option value="none">Sort by: Default</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className={styles.listingsGrid}>
            {isLoading ? (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                Loading your properties...
              </div>
            ) : filteredListings.length > 0 ? (
              filteredListings.map((listing, idx) => {
                const listingIdStr = String(listing.id || listing._id || idx);
                const createdAtDate = listing.created_at || listing.createdAt;
                let isOlderThan2Months = false;
                if (createdAtDate) {
                  const createdDate = new Date(createdAtDate);
                  const twoMonthsAgo = new Date();
                  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
                  isOlderThan2Months = createdDate < twoMonthsAgo;
                }
                const isInactive = isOlderThan2Months && !activatedListings.includes(listingIdStr);

                return (
                <div className={styles.listingCard} key={listing._key || `${listing.type || 'prop'}-${listingIdStr}`}>
                  <div className={styles.listingImgWrapper}>
                    {isInactive ? (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#E2E8F0', position: 'absolute', top: 0, left: 0 }}>
                        <Building2 size={40} color="#94A3B8" />
                      </div>
                    ) : (
                      <img src={listing.image_url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"} alt={listing.title} className={styles.listingImg} />
                    )}
                    
                    {isInactive ? (
                      <span className={styles.ribbonTopLeft} style={{ background: '#EFF6FF', color: '#2563EB', fontSize: '11px', padding: '4px 12px', borderRadius: '16px', fontWeight: 600, top: '12px', left: '12px', position: 'absolute' }}>Rented via Others on May 28</span>
                    ) : (
                      <span className={`${styles.ribbonTopLeft} ${styles.badgeYellow}`}>Active</span>
                    )}

                    {isInactive ? (
                      <span style={{ background: '#2563EB', color: 'white', fontSize: '11px', padding: '4px 20px', fontWeight: 600, top: '0', right: '0', position: 'absolute', borderBottomLeftRadius: '16px' }}>
                        For Rent
                      </span>
                    ) : (
                      <>
                        <span className={`${styles.ribbonTopRight} ${styles.bgYellow}`}>{listing.propertyType || listing.type || 'For Rent'}</span>
                        <div className={styles.listingActionsTopRight} style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                          <button 
                            className={styles.listingActionBtn} 
                            style={{ background: 'white', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                            onClick={() => toggleFavorite(listingIdStr)}
                          >
                            <Heart size={14} fill={favorites.includes(listingIdStr) ? "#EF4444" : "none"} color={favorites.includes(listingIdStr) ? "#EF4444" : "#475569"} />
                          </button>
                          <button className={styles.listingActionBtn} style={{ background: 'white', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <Share2 size={14} color="#475569" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <div className={styles.listingContent}>
                    <h3 className={styles.listingTitle}>{listing.title || 'Property Listing'}</h3>
                    <p className={styles.listingMeta}><MapPin size={12} /> {listing.location || listing.city}</p>
                    <div className={styles.listingPrice}>₹{listing.price || listing.expectedRent || 0} <span style={isInactive ? {fontSize: '12px', color: '#64748B'} : {}}>/month {isInactive && '(incomplete)'}</span></div>
                    <div className={styles.contactedInfo} style={{ color: '#94A3B8' }}>
                      <Users2 size={14} /> None Contacted
                    </div>
                    <div className={styles.listingActions}>
                      {isInactive ? (
                        <>
                          <button className={styles.btnOutline} style={{ flex: 1, borderRadius: '8px' }} onClick={() => handleEditListing(listing, 1)}>Edit</button>
                          <button 
                            style={{ background: '#10B981', border: 'none', color: 'white', borderRadius: '8px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '6px' }} 
                            onClick={() => handleRequestActivation(listingIdStr)}
                          >
                            Request<br/>Activation
                          </button>
                          <Link href="/premium" style={{ flex: 1, display: 'flex' }}><button style={{ background: '#F59E0B', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 600, fontSize: '12px', width: '100%', cursor: 'pointer' }}>Go Premium</button></Link>
                        </>
                      ) : (
                        <>
                          <button className={styles.btnOutline} onClick={() => handleEditListing(listing, 6)}><Camera size={14}/> Upload Media</button>
                          <button className={styles.btnOutline} onClick={() => handleEditListing(listing, 1)}>Edit</button>
                          <Link href="/premium"><button className={styles.btnOrange}>Go Premium</button></Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                );
              })
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748B', background: '#F8FAFC', borderRadius: '12px' }}>
                No listings found. Add your first property!
              </div>
            )}
          </div>

          <div className={styles.bottomAlert}>
            <Info size={16} color="#3B82F6" />
            <span>Increase your property visibility by upgrading to a premium package. <Link href="/premium" style={{ color: '#3B82F6', fontWeight: 500 }}>Upgrade Now</Link></span>
          </div>
        </div>
      </div>

      {editingProperty && (
        <EditPropertyModal 
          property={editingProperty} 
          onClose={() => setEditingProperty(null)}
          onSave={handleSaveProperty}
        />
      )}
    </div>
  );
}
