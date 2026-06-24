"use client";
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import styles from './CommercialHubs.module.css';
import FavoriteButton from './FavoriteButton';
import ContactOwnerButton from './ContactOwnerButton';
import { useRouter } from 'next/navigation';



export default function CommercialHubs({ initialProperties = [] }: { initialProperties?: any[] }) {
  const router = useRouter();
  const displayHubs = React.useMemo(() => {
    if (!initialProperties || initialProperties.length === 0) {
      return [];
    }
    
    return initialProperties.map((prop: any) => ({
      id: prop._id || prop.id,
      title: prop.title || prop.propertyName || prop.name || 'Untitled Property',
      location: prop.location_address || prop.city || prop.location || 'Unknown Location',
      price: `₹${prop.price || prop.rent || '0'}`,
      features: prop.features || (prop.type || prop.propertyType ? [prop.bhk ? `${prop.bhk}` : '', prop.type || prop.propertyType].filter(Boolean) : ['Commercial Space']),
      image: prop.image || prop.image_url || (prop.images && prop.images[0]) || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
      date: prop.created_at || new Date().toISOString()
    }));
  }, [initialProperties]);

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Commercial Hubs</h2>
          <p className={styles.subtitle}>Premium office spaces, co-working zones & retail properties</p>
        </div>
        <div className={styles.exploreAll} onClick={() => router.push("/apartments")} style={{ cursor: 'pointer' }}>
          All commercial <ArrowRight size={14} />
        </div>
      </div>
      
      <div className={styles.carouselContainer}>
        {displayHubs.map((item, index) => (
          <div key={`${item.id}-${index}`} className={styles.card} onClick={() => router.push(`/property/${item.id}`)} style={{ cursor: 'pointer' }}>
            <div className={styles.imageBlock}>
              <img 
                src={item.image} 
                alt={item.title} 
                className={styles.cardImg} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600';
                }}
              />
              <FavoriteButton 
                item={item} 
                className={styles.heartBtn} 
              />
            </div>
            
            <div className={styles.contentBlock}>
              <div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <div className={styles.locationRow}>
                  <MapPin size={12} className={styles.pinIcon} fill="#EF4444" color="#EF4444" />
                  <span>{item.location}</span>
                </div>
                
                <div className={styles.priceBlock}>
                  <span className={styles.price}>{item.price}</span>
                  <span className={styles.month}>/month</span>
                </div>
                
                <div className={styles.featuresRow}>
                  {item.features.map((feat: string, idx: number) => (
                    <span key={idx} className={styles.featurePill}>{feat}</span>
                  ))}
                  {item.date && (
                    <span className={styles.featurePill} style={{ backgroundColor: '#eff6ff', color: '#1e40af' }}>
                      Listed: {item.date.substring(0, 10)}
                    </span>
                  )}
                </div>
              </div>
              
              <div className={styles.buttonsRow}>
                <ContactOwnerButton 
                  propertyId={item.id || `commercial-${index}`} 
                  propertyTitle={item.title}
                  className={styles.contactBtn} 
                  variant="outline"
                />
                <div className={styles.scheduleBtn} role="button" onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/visits?schedule=${item.id}`); }}>Schedule visit</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
