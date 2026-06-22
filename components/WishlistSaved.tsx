"use client";
import React from 'react';
import { ArrowRight, MapPin, Heart } from 'lucide-react';
import styles from './WishlistSaved.module.css';
import { useWishlist } from '../context/WishlistContext';
import { useRouter } from 'next/navigation';
import ContactOwnerButton from './ContactOwnerButton';

export default function WishlistSaved() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const router = useRouter();

  if (wishlistItems.length === 0) {
    return null; // Or render a friendly empty state
  }

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.title}>Wishlist (Saved)</h2>
          </div>
          <a href="/visits?tab=shortlist" className={styles.exploreAll}>
            View all <ArrowRight size={14} />
          </a>
        </div>
        
        <div className={styles.gridContainer}>
          {wishlistItems.slice(0, 3).map((item, idx) => (
            <div key={item.title + idx} className={styles.card}>
              <div className={styles.imageBlock}>
                <img 
                  src={item.image?.includes('unsplash') && item.title === 'High-Footfall Retail Space' ? '/elite_premium_apartment.png' : item.image} 
                  alt={item.title} 
                  className={styles.cardImg} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = '/elite_premium_apartment.png';
                  }}
                />
                <button 
                  className={styles.heartBtn} 
                  aria-label="Remove from favorites"
                  onClick={(e) => {
                    e.preventDefault();
                    removeFromWishlist(item.title);
                  }}
                >
                  <Heart size={16} fill="#EF4444" color="#EF4444" />
                </button>
              </div>
              
              <div className={styles.contentBlock}>
                <div>
                  <h3 className={styles.cardTitle}>{item.title}</h3>
                  <div className={styles.locationRow}>
                    <MapPin size={12} className={styles.pinIcon} fill="#EF4444" color="#EF4444" />
                    <span>{item.location}</span>
                  </div>
                  
                  <div className={styles.priceBlock}>
                    <span className={styles.price}>
                      {String(item.price) === 'NaN' ? 'Contact for Price' : (
                        typeof item.price === 'number' || (!isNaN(Number(item.price)) && item.price !== null && item.price !== '')
                          ? `₹${Number(item.price).toLocaleString('en-IN')}`
                          : String(item.price)
                      )}
                    </span>
                    <span className={styles.month}>/month</span>
                  </div>
                  
                  <div className={styles.featuresRow}>
                    {item.features?.map((feat, idx) => (
                      <span key={idx} className={styles.featurePill}>{feat}</span>
                    ))}
                  </div>
                </div>
                
                <div className={styles.buttonsRow}>
                  <ContactOwnerButton 
                    propertyId={item.id || `wishlist-${item.title}`} 
                    propertyTitle={item.title}
                    className={styles.contactBtn} 
                    variant="outline"
                  />
                  <button className={styles.scheduleBtn} onClick={() => router.push(`/visits?schedule=${item.id || item._id || item._key}`)}>Schedule visit</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
