"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import ContactOwnerButton from './ContactOwnerButton';
import styles from './GridPropertyCard.module.css';

interface GridPropertyProps {
  property: {
    id: string;
    imageUrl: string;
    isNew?: boolean;
    metroDistance?: string;
    timeAgo?: string;
    photoCount?: number;
    matchScore?: string;
    subtitle?: string;
    title: string;
    location: string;
    sqft?: string | number;
    tenantPref?: string;
    amenities?: string[];
    price: string | number;
  };
}

const GridPropertyCard: React.FC<GridPropertyProps> = ({ property }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { isAuthenticated, openAuthModal } = useAuth();
  const router = useRouter();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    if (isWishlisted(property.title)) {
      removeFromWishlist(property.title);
    } else {
      addToWishlist({
        id: property.id,
        title: property.title,
        location: property.location,
        price: String(property.price),
        features: property.amenities || [],
        image: property.imageUrl
      });
    }
  };

  const formattedPrice = typeof property.price === 'number' || !isNaN(Number(property.price)) 
    ? `₹${Number(property.price).toLocaleString('en-IN')}` 
    : property.price;

  const propType = (property as any).type?.toLowerCase();
  const routePath = propType === 'pg' ? `/pg/${property.id}` : 
                    propType === 'commercial' ? `/commercial/${property.id}` : 
                    propType === 'flatmate' ? `/flatmate/${property.id}` : 
                    `/property/${property.id}`;

  return (
    <div className={styles.card} onClick={() => router.push(routePath)} style={{ cursor: 'pointer' }}>
      <div className={styles.imageContainer}>
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className={styles.image} 
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800';
          }}
          ref={(img) => {
            if (img && img.complete && img.naturalWidth === 0) {
              img.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800';
            }
          }}
        />
        
        {property.isNew && (
          <div className={styles.badgeNew}>NEW</div>
        )}
        
        {property.metroDistance && (
          <div className={styles.badgeMetro}>{property.metroDistance}</div>
        )}
        
        <div className={styles.heartIcon} role="button" aria-label="Toggle Wishlist" title="Toggle Wishlist" onClick={toggleWishlist} style={{ cursor: 'pointer' }}>
          <Heart size={14} fill={isWishlisted(property.title) ? "#EF4444" : "none"} color={isWishlisted(property.title) ? "#EF4444" : "currentColor"} />
        </div>
        
        <div className={styles.timeBadge}>{property.timeAgo}</div>
        
        {property.photoCount && (
          <div className={styles.photoCount}>{property.photoCount}</div>
        )}
        
        {property.matchScore && (
          <div className={styles.matchBadge}>
            <Sparkles size={10} /> {property.matchScore}
          </div>
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.subtitle}>{property.subtitle}</div>
        <h3 className={styles.title}>{property.title}</h3>
        
        <div className={styles.location}>
          <MapPin size={12} /> {property.location}
        </div>
        
        {(property.sqft || property.tenantPref) && (
          <div className={styles.meta}>
            {property.sqft && <span>{property.sqft}</span>}
            {property.sqft && property.tenantPref && <span className={styles.dot}>•</span>}
            {property.tenantPref && <span>{property.tenantPref}</span>}
          </div>
        )}
        
        <div className={styles.amenities}>
          {(property.amenities || []).map((amenity, index) => (
            <span key={index} className={styles.amenityBadge}>{amenity}</span>
          ))}
        </div>
        
        <div className={styles.footer}>
          <div className={styles.priceContainer}>
            <span className={styles.price}>{formattedPrice}</span>
            <span className={styles.priceLabel}>/mo</span>
          </div>
          <div className={styles.actions}>
            <button className={styles.detailsBtn} onClick={(e) => { e.stopPropagation(); router.push(`/property/${property.id}`); }}>Details</button>
            <ContactOwnerButton 
              propertyId={property.id} 
              propertyTitle={property.title}
              className={styles.contactBtn} 
              variant="outline"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridPropertyCard;
