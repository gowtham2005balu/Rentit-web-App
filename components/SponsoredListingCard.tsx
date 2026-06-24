"use client";
import React from 'react';
import { 
  Award, MapPin, Train, Ruler, Sofa, 
  Snowflake, Wifi, Dumbbell, CarFront, ShieldCheck, 
  Eye, Info 
} from 'lucide-react';
import Link from 'next/link';
import ContactOwnerButton from './ContactOwnerButton';
import styles from './SponsoredListingCard.module.css';

interface SponsoredListingCardProps {
  property?: any;
}

const SponsoredListingCard: React.FC<SponsoredListingCardProps> = ({ property }) => {
  if (!property) return null;

  const displayProp = {
    imageUrl: property.imageUrl || property.image_url || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800',
    timeAgo: '2d ago',
    title: property.title || 'Premium 2BHK — Fully Furnished',
    location: property.location || property.location_address || 'Adyar, Chennai',
    metroDistance: property.metroDistance || '500m Metro',
    price: property.price ? Number(property.price).toLocaleString('en-IN') : '22,000',
    deposit: property.deposit ? Number(property.deposit).toLocaleString('en-IN') : '1,35,000',
    maintenance: property.maintenance ? `${Number(property.maintenance).toLocaleString('en-IN')}/month` : '3,000/month',
    sqft: property.sqft ? `${property.sqft} sq.ft` : '1,100 sq.ft',
    bhk: property.bhk ? `${property.bhk} BHK` : '2 BHK',
    furnishing: property.furnishing || 'Fully Furnished',
    amenities: property.amenities && property.amenities.length > 0 ? property.amenities.slice(0, 5) : ['AC', 'WiFi', 'Gym', 'Parking', 'Security']
  };

  return (
    <Link href={`/property/${property?.id || 'p1'}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
      <div className={styles.card}>
        {/* Left side: Image */}
        <div className={styles.imageContainer}>
          <img 
            src={displayProp.imageUrl} 
            alt="Premium Property" 
            className={styles.image} 
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800';
            }}
            ref={(img) => {
              if (img && img.complete && img.naturalWidth === 0) {
                img.src = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800';
              }
            }}
          />
          <div className={styles.premiumBadge}>
            <Award size={14} className={styles.premiumIcon} /> Premium
          </div>
          <div className={styles.timeBadge}>
            {displayProp.timeAgo}
          </div>
        </div>

        {/* Right side: Content */}
        <div className={styles.contentContainer}>
          {/* Absolute top-right elements */}
          <div className={styles.sponsoredAdBadge}>
            SPONSORED · AD
          </div>
          
          <div className={styles.headerRow}>
            <h3 className={styles.title}>{displayProp.title}</h3>
            <div className={styles.whySeeingThis}>
              <Info size={12} /> Why am I seeing this?
            </div>
          </div>

          <div className={styles.locationRow}>
            <span className={styles.locationText}>
              <MapPin size={14} /> {displayProp.location} ·
            </span>
            <span className={styles.metroBadge}>
              <Train size={12} /> {displayProp.metroDistance}
            </span>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>₹{displayProp.price}</span>
            <span className={styles.priceLabel}>/month</span>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoCol}>
              <div className={styles.infoLabel}>DEPOSIT</div>
              <div className={styles.infoVal}>₹{displayProp.deposit}</div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.infoCol}>
              <div className={styles.infoLabel}>MAINTENANCE</div>
              <div className={styles.infoVal}>₹{displayProp.maintenance}</div>
            </div>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}><Ruler size={14} /> {displayProp.sqft}</span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaItem}>{displayProp.bhk}</span>
            <span className={styles.metaDot}>•</span>
            <span className={styles.metaItem}><Sofa size={14} /> {displayProp.furnishing}</span>
          </div>

          <div className={styles.amenitiesList}>
            {displayProp.amenities.map((amenity: string, idx: number) => {
              let Icon = ShieldCheck;
              const amLower = amenity.toLowerCase();
              if (amLower.includes('ac') || amLower.includes('air')) Icon = Snowflake;
              else if (amLower.includes('wifi') || amLower.includes('internet')) Icon = Wifi;
              else if (amLower.includes('gym') || amLower.includes('fitness')) Icon = Dumbbell;
              else if (amLower.includes('park') || amLower.includes('car')) Icon = CarFront;
              
              return (
                <span key={idx} className={styles.amenityBadge}>
                  <Icon size={14} className={styles.amenityIcon} /> {amenity}
                </span>
              );
            })}
          </div>

          <div className={styles.actionsRow}>
            <button className={styles.viewBtn} onClick={(e) => { e.preventDefault(); e.stopPropagation(); alert('Viewing Details...'); }}>
              <Eye size={16} /> View Details
            </button>
            <ContactOwnerButton 
              propertyId={property?.id || 'sponsored-1'} 
              propertyTitle={displayProp.title}
              className={styles.contactBtn} 
              variant="icon"
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SponsoredListingCard;
