import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import styles from './PopularLocalities.module.css';

const localities = [
  {
    id: 1,
    name: 'OMR',
    stats: 'Avg ₹18,000/mo • 2.1K listings',
    tags: ['IT Hub', 'Metro'],
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800' // City skyline
  },
  {
    id: 2,
    name: 'Velachery',
    stats: 'Avg ₹15,000/mo • 1.8K listings',
    tags: ['Metro', 'Shopping'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800' // Villa/house
  },
  {
    id: 3,
    name: 'Anna Nagar',
    stats: 'Avg ₹24,000/mo • 940 listings',
    tags: ['Premium', 'Family'],
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800' // Modern house
  },
  {
    id: 4,
    name: 'ECR',
    stats: 'Avg ₹32,000/mo • 520 listings',
    tags: ['Beach', 'Luxury'],
    image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&q=80&w=800' // Beach house interior/exterior
  },
  {
    id: 5,
    name: 'Porur',
    stats: 'Avg ₹14,000/mo • 760 listings',
    tags: ['Affordable', 'IT'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800' // Standard house
  }
];

export default function PopularLocalities() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Popular Localities</h2>
          <p className={styles.subtitle}>Explore Chennai's most sought-after neighbourhoods</p>
        </div>

      </div>
      
      <div className={styles.gridContainer}>
        {localities.map((loc) => (
          <Link key={loc.id} href={`/apartments?locality=${loc.name}`} className={styles.card}>
            <img src={loc.image} alt={loc.name} className={styles.cardImg} />
            <div className={styles.overlay}>
              <h3 className={styles.cardTitle}>{loc.name}</h3>
              <p className={styles.cardStats}>{loc.stats}</p>
              <div className={styles.tagsRow}>
                {loc.tags.map((tag, idx) => (
                  <span key={idx} className={styles.tagPill}>{tag}</span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
