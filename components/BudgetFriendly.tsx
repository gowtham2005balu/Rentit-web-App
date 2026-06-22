"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import styles from './BudgetFriendly.module.css';

const budgetPicks = [
  {
    id: 1,
    title: 'Compact 1BHK Flat',
    location: 'Tambaram',
    price: '₹8,500',
    image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 2,
    title: 'Studio Apartment',
    location: 'Koyambedu',
    price: '₹9,000',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 3,
    title: 'Shared PG Room',
    location: 'Guindy',
    price: '₹5,500',
    image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 4,
    title: 'Compact 2BHK House',
    location: 'Chromepet',
    price: '₹12,000',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=400'
  }
];

export default function BudgetFriendly({ initialProperties = [] }: { initialProperties?: any[] }) {
  const displayPicks = React.useMemo(() => {
    if (!initialProperties || initialProperties.length === 0) {
      return [];
    }
    
    return initialProperties.map((prop: any, index: number) => ({
      id: prop._id || prop.id,
      _key: prop._key || `budget-${prop.id}-${index}`,
      title: prop.title || prop.propertyName || prop.name || 'Budget Property',
      location: prop.location_address || prop.city || 'Location',
      price: `₹${(prop.price || prop.rent || '0').toLocaleString('en-IN')}`,
      image: prop.image || prop.image_url || (prop.images && prop.images[0]) || budgetPicks[index % budgetPicks.length]?.image || 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=400'
    }));
  }, [initialProperties]);

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Budget Friendly Picks</h2>
          <p className={styles.subtitle}>Smart affordable choices — student stays, shared rooms & compact apartments</p>
        </div>
        <Link href="/apartments?sort=price_asc" className={styles.exploreAll}>
          See all <ArrowRight size={14} />
        </Link>
      </div>
      
      <div className={styles.gridContainer}>
        {displayPicks.map((item) => (
          <Link key={item._key} href={`/property/${item.id}`} className={styles.card}>
            <div className={styles.imgWrapper}>
              <img 
                src={item.image} 
                alt={item.title} 
                className={styles.cardImg} 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = 'https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=400';
                }}
              />
            </div>
            <div className={styles.contentWrapper}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <div className={styles.locationRow}>
                <MapPin size={12} className={styles.pinIcon} fill="#EF4444" color="#EF4444" />
                <span>{item.location}</span>
              </div>
              <div className={styles.priceBlock}>
                <span className={styles.price}>{item.price}</span>
                <span className={styles.month}>/month</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
