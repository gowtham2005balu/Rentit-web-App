"use client";

import React, { useState } from 'react';
import styles from './page.module.css';
import ImageWithFallback from '../../../components/ImageWithFallback';
import { Maximize2, X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  displayImages: string[];
  allImages: string[];
}

export default function ImageGallery({ displayImages, allImages }: ImageGalleryProps) {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const validImages = allImages.filter(img => img !== "EMPTY" && img !== undefined);

  const openLightbox = (index: number) => {
    if (displayImages[index] === "EMPTY" || !displayImages[index]) return;
    const url = displayImages[index];
    const realIndex = validImages.indexOf(url);
    if (realIndex !== -1) {
      setCurrentIndex(realIndex);
      setShowLightbox(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const renderBox = (index: number, showOverlay: boolean = false) => {
    const isPlaceholder = displayImages[index] === "EMPTY" || !displayImages[index];
    
    if (isPlaceholder) {
      return (
        <div className={styles.imageWrapper} style={{ backgroundColor: '#E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ImageIcon color="#9CA3AF" size={48} />
        </div>
      );
    }

    return (
      <div className={styles.imageWrapper} onClick={() => openLightbox(index)} style={{ cursor: 'pointer' }}>
        <ImageWithFallback 
          src={displayImages[index]} 
          fallbackSrc="https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image" 
          alt={`Property View ${index + 1}`} 
          className={styles.galleryImage} 
        />
        {index === 1 && validImages.length > 0 && (
          <button className={styles.viewAllBtn} onClick={(e) => { e.stopPropagation(); openLightbox(0); }}>
            <Maximize2 size={14} />
            View all photos
          </button>
        )}
        {showOverlay && validImages.length > 5 && (
          <>
            <div className={styles.morePhotosOverlay}>
              +{validImages.length - 5} Photos
            </div>
            <div className={styles.photoCountBadge}>
              1 / {validImages.length}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <div className={styles.galleryGrid}>
        {/* Left Column (2 large images) */}
        <div className={styles.leftColumn}>
          {renderBox(0)}
          {renderBox(1)}
        </div>
        
        {/* Right Column (3 smaller images) */}
        <div className={styles.rightColumn}>
          {renderBox(2)}
          {renderBox(3)}
          {renderBox(4, true)}
        </div>
      </div>

      {showLightbox && validImages.length > 0 && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.95)', zIndex: 99999,
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', padding: '20px', color: 'white'
          }}>
            <div style={{ fontSize: '18px', fontWeight: 600 }}>{currentIndex + 1} / {validImages.length}</div>
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
              src={validImages[currentIndex]} 
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
