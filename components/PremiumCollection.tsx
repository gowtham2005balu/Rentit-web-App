import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './PremiumCollection.module.css';

const premiumProperties = {
  main: {
    id: 1,
    image: '/elite_premium_apartment.png',
    title: 'Premium Penthouse Suite',
    specs: 'Boat Club Road • 4600 sqft • Private Pool',
    price: '1,20,000'
  },
  secondary1: {
    id: 2,
    image: '/luxury_bedroom.png',
    title: 'Panoramic Residency',
    specs: 'Adyar, Chennai • 2800 sqft',
    price: '75,000'
  },
  secondary2: {
    id: 3,
    image: '/modern_kitchen.png',
    title: 'Urban Lifestyle Apt',
    specs: 'ECR, Chennai • 2100 sqft',
    price: '58,000'
  }
};

const PremiumCard = ({ property, isMain }: { property: any, isMain: boolean }) => (
  <Link href={`/property/${property.id}`} className={`${styles.card} ${isMain ? styles.leftCard : styles.rightCard}`}>
    <img src={property.image} alt={property.title} className={styles.cardImg} />
    <div className={styles.overlay}>
      <h3 className={styles.cardTitle}>{property.title}</h3>
      <p className={styles.cardSpecs}>{property.specs}</p>
      <div className={styles.priceContainer}>
        <span className={styles.cardPrice}>₹{property.price}</span>
        <span className={styles.pricePeriod}> /month</span>
      </div>
    </div>
  </Link>
);

export default function PremiumCollection({ initialProperties = [] }: { initialProperties?: any[] }) {
  const displayProps = React.useMemo(() => {
    if (!initialProperties || initialProperties.length === 0) {
      return null;
    }
    
    const mapProp = (prop: any, defaultImage: string) => {
      if (!prop) return null;
      return {
        id: prop._id || prop.id,
        image: prop.image || prop.image_url || (prop.images && prop.images[0]) || defaultImage,
        title: prop.title || prop.propertyName || prop.name || 'Premium Property',
        specs: `${prop.location_address || prop.city || 'Premium Location'} • ${prop.type || prop.propertyType || 'Property'}`,
        price: (prop.price || prop.rent || '0').toLocaleString('en-IN')
      };
    };

    return {
      main: initialProperties[0] ? mapProp(initialProperties[0], premiumProperties.main.image) : null,
      secondary1: initialProperties[1] ? mapProp(initialProperties[1], premiumProperties.secondary1.image) : null,
      secondary2: initialProperties[2] ? mapProp(initialProperties[2], premiumProperties.secondary2.image) : null
    };
  }, [initialProperties]);

  if (!displayProps) {
    return null;
  }

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Premium Living Collection
          </h2>
          <p className={styles.subtitle}>Curated luxury properties with premium amenities and concierge services</p>
        </div>
        <Link href="/premium" className={styles.exploreAll}>
          Explore all <ArrowRight size={14} />
        </Link>
      </div>
      
      <div className={styles.gridContainer}>
        {displayProps.main && (
          <div className={styles.leftCol}>
            <PremiumCard property={displayProps.main} isMain={true} />
          </div>
        )}
        
        <div className={styles.rightCol}>
          {displayProps.secondary1 && <PremiumCard property={displayProps.secondary1} isMain={false} />}
          {displayProps.secondary2 && <PremiumCard property={displayProps.secondary2} isMain={false} />}
        </div>
      </div>
    </section>
  );
}
