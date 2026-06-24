"use client";
import React from 'react';
import Link from 'next/link';
import { Heart, Share2, MapPin, Train, Square, Users, Sofa, Eye, User, Camera } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Property } from '../data/mockData';
import ContactOwnerButton from './ContactOwnerButton';
import styles from './PropertyCard.module.css';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { isAuthenticated, openAuthModal } = useAuth();

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
        price: property.price.toString(),
        features: [`${property.bhk} BHK`, property.furnishing, `${property.sqft} sqft`],
        image: property.imageUrl
      });
    }
  };

  return (
    <Link href={`/property/${property.id}`} className={styles.cardLink}>
      <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img 
          src={property.imageUrl} 
          alt={property.title} 
          className={styles.image} 
          onError={(e) => {
            if (!(e.target as HTMLImageElement).src.includes('placehold.co')) {
              (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image';
            }
          }}
          ref={(img) => {
            if (img && img.complete && img.naturalWidth === 0) {
              img.src = 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800';
            }
          }}
        />
        
        <div className={styles.imageActions}>
          <button className={styles.actionIcon} onClick={toggleWishlist} aria-label="Save to favorites">
            <Heart size={16} fill={isWishlisted(property.title) ? "#EF4444" : "none"} color={isWishlisted(property.title) ? "#EF4444" : "currentColor"} />
          </button>
          <button className={styles.actionIcon} onClick={(e) => { e.preventDefault(); alert('Link copied to clipboard!'); }}><Share2 size={16} /></button>
        </div>

        <div className={styles.imageOverlayBottom}>
          <div className={styles.photoCount}>
            <Camera size={14} />
            <span>1/18</span>
          </div>
          <div className={styles.timePosted}>1 day ago</div>
        </div>
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <h3 className={styles.title}>{property.title || 'Untitled Property'}</h3>
          <div className={styles.locationRow}>
            <div className={styles.locationInfo}>
              <MapPin size={14} className={styles.iconMuted} />
              <span>{property.location || 'Chennai'}</span>
            </div>
            {property.metroDistance && (
              <div className={styles.metroPill}>
                <Train size={12} />
                <span>{property.metroDistance}</span>
              </div>
            )}
          </div>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{(property.price || 0).toLocaleString()}</span>
          <span className={styles.period}>/month</span>
        </div>

        <div className={styles.financialBlock}>
          <div className={styles.financialItem}>
            <span className={styles.financialLabel}>DEPOSIT</span>
            <span className={styles.financialValue}>₹{(property.deposit || (property.price || 0) * 3).toLocaleString()}</span>
          </div>
          <div className={styles.financialDivider}></div>
          <div className={styles.financialItem}>
            <span className={styles.financialLabel}>MAINTENANCE</span>
            <span className={styles.financialValue}>₹{property.maintenance || '3,000'}/month</span>
          </div>
        </div>

        <div className={styles.detailsRow}>
          <div className={styles.detailItem}>
            <Square size={14} className={styles.iconMuted} />
            <span>{property.sqft ? `${property.sqft.toLocaleString()} sq.ft` : 'N/A sq.ft'}</span>
          </div>
          <span className={styles.dot}>•</span>
          <div className={styles.detailItem}>
            <Users size={14} className={styles.iconMuted} />
            <span>{property.tenantPref || 'Anyone'}</span>
          </div>
          <span className={styles.dot}>•</span>
          <div className={styles.detailItem}>
            <Sofa size={14} className={styles.iconMuted} />
            <span>{property.furnishing || 'Semi Furnished'}</span>
          </div>
        </div>

        <div className={styles.amenitiesList}>
          {(property.amenities || ['WiFi', 'Attached Bath', 'Fully Furnished', 'Non-smoker', 'Vegetarian']).slice(0, 5).map((amenity: string, idx: number) => (
            <span key={idx} className={styles.amenityPill}>{amenity}</span>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.spacer}></div>
          <div className={styles.actionButtons}>
            <button className={styles.btnSecondary} onClick={(e) => { e.preventDefault(); alert('Viewing Details...'); }}>
              <Eye size={16} />
              View Details
            </button>
            <ContactOwnerButton 
              propertyId={property.id} 
              propertyTitle={property.title}
              className={styles.btnPrimary} 
              variant="icon"
            />
          </div>
        </div>
      </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
