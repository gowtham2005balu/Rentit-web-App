"use client";
import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import styles from './CommercialHubs.module.css';
import FavoriteButton from './FavoriteButton';
import ContactOwnerButton from './ContactOwnerButton';
import { useRouter } from 'next/navigation';

const commercialHubs = [
  {
    id: 1,
    title: 'Premium Business Residency',
    location: 'Nungambakkam, Chennai',
    price: '₹80,000',
    features: ['1200 sqft', 'Meeting Rooms', 'Parking'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 2,
    title: 'Startup Co-working Lounge',
    location: 'Thoraipakkam, OMR',
    price: '₹15,000',
    features: ['Dedicated Desk', '24/7 Access', 'WiFi'],
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 3,
    title: 'High-Footfall Retail Space',
    location: 'T. Nagar, Chennai',
    price: '₹58,000',
    features: ['780 sqft', 'Ground Floor', 'AC'],
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 4,
    title: 'Modern Tech Park Office',
    location: 'Guindy, Chennai',
    price: '₹1,20,000',
    features: ['2500 sqft', 'Cafeteria', 'Metro Near'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 5,
    title: 'Boutique Studio Workspace',
    location: 'Alwarpet, Chennai',
    price: '₹35,000',
    features: ['500 sqft', 'Creative Space', 'Pantry'],
    image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 6,
    title: 'Corporate HQ Building',
    location: 'Mount Road, Chennai',
    price: '₹3,50,000',
    features: ['8000 sqft', 'Entire Floor', 'VIP Parking'],
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 7,
    title: 'Freelancer Private Cabin',
    location: 'Velachery, Chennai',
    price: '₹12,000',
    features: ['1 Seater', 'Quiet Zone', 'Lounge'],
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 8,
    title: 'Warehouse & Logistics Hub',
    location: 'Madhavaram, Chennai',
    price: '₹95,000',
    features: ['5000 sqft', 'Loading Bay', 'High Ceiling'],
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 9,
    title: 'Main Road Showroom',
    location: 'Anna Nagar, Chennai',
    price: '₹1,50,000',
    features: ['1500 sqft', 'Glass Facade', 'Signage'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 10,
    title: 'Executive Boardroom',
    location: 'Egmore, Chennai',
    price: '₹5,000',
    features: ['Daily Rental', 'Projector', '10 Seater'],
    image: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&q=80&w=600'
  }
];

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
