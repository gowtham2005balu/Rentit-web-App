"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, Bell, MessageSquare, Plus, ChevronDown, Share2, Users2, Camera, MapPin, Trash2 } from 'lucide-react';
import styles from '../dashboard/listings/listings.module.css';
import { useAuth } from '@/context/AuthContext';

export default function SavedPropertiesPage() {
  const { isAuthenticated, userId } = useAuth();
  const [savedListings, setSavedListings] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  const loadProfile = () => {
    if (isAuthenticated && userId) {
      const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${userId}`) || '{}');
      if (localProfile.firstName) setUserName(localProfile.firstName);
      else if (localProfile.name) setUserName(localProfile.name);
      if (localProfile.photo) setUserPhoto(localProfile.photo);
    }
  };

  useEffect(() => {
    loadProfile();
    const storedFavs = JSON.parse(localStorage.getItem('rentit_favorites') || '[]');
    setFavorites(storedFavs);

    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const filtered = data.filter(listing => storedFavs.includes(String(listing.id || listing._id)));
          setSavedListings(filtered);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [isAuthenticated, userId]);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(favId => favId !== id);
    setFavorites(updated);
    localStorage.setItem('rentit_favorites', JSON.stringify(updated));
    setSavedListings(savedListings.filter(listing => String(listing.id || listing._id) !== id));
  };

  return (
    <div className={styles.pageContainer} style={{ minHeight: '100vh', background: '#F8FAFC' }}>
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
            <input type="text" placeholder="Search saved..." className={styles.searchInput} />
          </div>
        </div>

        <nav className={styles.headerNav}>
          <Link href="/dashboard" className={styles.navLink}>Dashboard</Link>
          <Link href="/dashboard/listings" className={styles.navLink}>Listings</Link>
          <Link href="/saved" className={`${styles.navLink} ${styles.navLinkActive}`}>Favorites</Link>
        </nav>

        <div className={styles.headerRight}>
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
        <div className={styles.contentArea} style={{ padding: '24px 32px' }}>
          <div className={styles.contentHeader} style={{ marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '8px' }}>Saved Properties</h1>
              <p style={{ color: '#64748B' }}>You have {savedListings.length} properties in your favorites.</p>
            </div>
          </div>

          <div className={styles.listingsGrid}>
            {isLoading ? (
              <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#64748B' }}>
                Loading your favorites...
              </div>
            ) : savedListings.length > 0 ? (
              savedListings.map((listing, idx) => (
                <div className={styles.listingCard} key={listing._key || `${listing.type || 'prop'}-${listing.id || listing._id || idx}`}>
                  <div className={styles.listingImgWrapper}>
                    <img src={listing.image_url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80"} alt={listing.title} className={styles.listingImg} />
                    <span className={`${styles.ribbonTopRight} ${styles.bgYellow}`}>{listing.propertyType || listing.type || 'For Rent'}</span>
                    <div className={styles.listingActionsTopRight} style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '8px' }}>
                      <button 
                        className={styles.listingActionBtn} 
                        style={{ background: 'white', border: 'none', borderRadius: '50%', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                        onClick={() => removeFavorite(String(listing.id || listing._id))}
                        title="Remove from favorites"
                      >
                        <Trash2 size={14} color="#EF4444" />
                      </button>
                    </div>
                  </div>
                  <div className={styles.listingContent}>
                    <h3 className={styles.listingTitle}>{listing.title || 'Property Listing'}</h3>
                    <p className={styles.listingMeta}><MapPin size={12} /> {listing.location || listing.city}</p>
                    <div className={styles.listingPrice}>₹{listing.price || listing.expectedRent || 0} <span>/month</span></div>
                    
                    <div className={styles.listingActions} style={{ marginTop: '16px' }}>
                      <Link href={`/property/${listing.id || listing._id}`} style={{ width: '100%', textDecoration: 'none' }}>
                        <button className={styles.btnOrange} style={{ width: '100%' }}>View Details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', padding: '4rem 2rem', textAlign: 'center', color: '#64748B', background: 'white', borderRadius: '12px', border: '1px dashed #CBD5E1' }}>
                <Heart size={48} color="#94A3B8" style={{ margin: '0 auto 16px auto', display: 'block' }} />
                <h3 style={{ fontSize: '18px', color: '#1E293B', marginBottom: '8px' }}>No favorites yet</h3>
                <p>Click the heart icon on any property to save it here for later.</p>
                <Link href="/properties">
                  <button className={styles.btnOutline} style={{ marginTop: '24px' }}>Browse Properties</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
