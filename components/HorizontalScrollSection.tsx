"use client";

import React from 'react';

import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import styles from './HorizontalScrollSection.module.css';

interface HorizontalScrollSectionProps {
  properties?: any[];
}

const HorizontalScrollSection: React.FC<HorizontalScrollSectionProps> = ({ properties }) => {
  const router = useRouter();
  const displayProjects = properties && properties.length > 0 ? properties.map(p => ({
    id: p.id,
    title: p.title,
    location: p.location || p.location_address || 'Chennai',
    priceRange: p.price ? `₹${Number(p.price).toLocaleString('en-IN')}/month` : 'Contact for Price',
    status: p.availability || 'Ready to move',
    imageUrl: p.imageUrl || p.image_url || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=600'
  })) : [];

  if (displayProjects.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Recommended For You</h2>
      </div>
      
      <div className={styles.scrollContainer}>
        {displayProjects.map((project, index) => (
          <div 
            key={`${project.id || 'hp'}-${index}`} 
            className={`${styles.card} hover-lift`}
            onClick={() => router.push(`/property/${project.id || 'p1'}`)}
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.imageContainer}>
              <img 
                src={project.imageUrl} 
                alt={project.title} 
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
              <span className={styles.statusBadge}>{project.status}</span>
            </div>
            <div className={styles.content}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.location}>{project.location}</p>
              <div className={styles.priceRow}>
                <span className={styles.price}>{project.priceRange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScrollSection;
