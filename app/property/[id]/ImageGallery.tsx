"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import ImageWithFallback from '../../../components/ImageWithFallback';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  displayImages: string[];
  allImages: string[];
}

export default function ImageGallery({ displayImages, allImages }: ImageGalleryProps) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  return (
    <>
      <div className={styles.galleryGrid}>
        {/* Left Column (2 large images) */}
        <div className={styles.leftColumn}>
          <div className={styles.imageWrapper} onClick={() => openLightbox(0)} style={{ cursor: 'pointer' }}>
            <ImageWithFallback src={displayImages[0]} fallbackSrc="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800" alt="Property View 1" className={styles.galleryImage} />
          </div>
          <div className={styles.imageWrapper} onClick={() => openLightbox(1)} style={{ cursor: 'pointer' }}>
            <ImageWithFallback src={displayImages[1]} fallbackSrc="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800" alt="Property View 2" className={styles.galleryImage} />
            <button className={styles.viewAllBtn} onClick={(e) => { e.stopPropagation(); openLightbox(0); }}>
              <Maximize2 size={14} />
              View all photos
            </button>
          </div>
        </div>
        
        {/* Right Column (3 smaller images) */}
        <div className={styles.rightColumn}>
          <div className={styles.imageWrapper} onClick={() => openLightbox(2)} style={{ cursor: 'pointer' }}>
            <ImageWithFallback src={displayImages[2]} fallbackSrc="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600" alt="Property View 3" className={styles.galleryImage} />
          </div>
          <div className={styles.imageWrapper} onClick={() => openLightbox(3)} style={{ cursor: 'pointer' }}>
            <ImageWithFallback src={displayImages[3]} fallbackSrc="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600" alt="Property View 4" className={styles.galleryImage} />
          </div>
          <div className={styles.imageWrapper} onClick={() => openLightbox(4)} style={{ cursor: 'pointer' }}>
            <ImageWithFallback src={displayImages[4]} fallbackSrc="https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=600" alt="Property View 5" className={styles.galleryImage} />
            <div className={styles.morePhotosOverlay}>
              +{allImages.length > 5 ? allImages.length - 5 : 0} Photos
            </div>
            <div className={styles.photoCountBadge}>
              1 / {allImages.length || 5}
            </div>
          </div>
        </div>
      </div>

      {showLightbox && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 99999,
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', padding: '20px', color: 'white'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>{currentIndex + 1} / {allImages.length}</div>
            <button onClick={closeLightbox} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px' }}>
              <X size={32} />
            </button>
          </div>
          
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
          }}>
            <button onClick={prevImage} style={{
              position: 'absolute', left: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', 
              color: 'white', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
            }}>
              <ChevronLeft size={32} />
            </button>
            
            <img 
              src={allImages[currentIndex]} 
              alt={`Property ${currentIndex + 1}`} 
              style={{ maxHeight: '85vh', maxWidth: '90vw', objectFit: 'contain' }} 
            />
            
            <button onClick={nextImage} style={{
              position: 'absolute', right: '20px', background: 'rgba(255,255,255,0.2)', border: 'none', 
              color: 'white', borderRadius: '50%', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10
            }}>
              <ChevronRight size={32} />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
