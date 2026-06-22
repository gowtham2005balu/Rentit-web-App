"use client";

import React, { useState } from 'react';
import { Calendar, Bookmark, Share2, X, Mail, MessageCircle, Globe, Link as LinkIcon } from 'lucide-react';
import styles from './page.module.css';

interface SidebarActionsProps {
  property: {
    id: string;
    title: string;
    location: string;
    price: number | string;
    image: string;
    features: string[];
  };
}

export default function SidebarActions({ property }: SidebarActionsProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  
  const handleSchedule = () => {
    // Redirect to visits page or open a modal
    // For now, redirecting to the visits page
    window.location.href = '/visits';
  };

  const handleSave = () => {
    // Add to wishlist/favorites
    try {
      const stored = localStorage.getItem('rentit_favorites');
      let favs = stored ? JSON.parse(stored) : [];
      if (!favs.some((f: any) => f.id === property.id)) {
        favs.push(property);
        localStorage.setItem('rentit_favorites', JSON.stringify(favs));
        alert('Property saved to your favorites!');
      } else {
        alert('Property is already in your favorites.');
      }
    } catch(e) {
      console.error('Error saving property', e);
    }
  };

  const handleShare = () => {
    setShowShareModal(true);
  };
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    } catch (err) {
      alert('Failed to copy link.');
    }
  };

  const getShareLink = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this property: ${property.title}`);
    
    switch(platform) {
      case 'whatsapp': return `https://api.whatsapp.com/send?text=${text} ${url}`;
      case 'facebook': return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case 'gmail': return `https://mail.google.com/mail/?view=cm&fs=1&su=${text}&body=${url}`;
      default: return '#';
    }
  };

  return (
    <>
      <button className={styles.secondaryBtn} onClick={handleSchedule}>
        <Calendar size={16} /> Schedule a Visit
      </button>
      
      <div className={styles.actionRow}>
        <button className={styles.actionBtn} onClick={handleSave}>
          <Bookmark size={14} /> Save
        </button>
        <button className={styles.actionBtn} onClick={handleShare}>
          <Share2 size={14} /> Share
        </button>
      </div>

      {showShareModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowShareModal(false)}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px', padding: '24px', width: '320px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 600 }}>Share Property</h3>
              <button onClick={() => setShowShareModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                <X size={20} color="#64748b" />
              </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <a href={getShareLink('whatsapp')} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '16px', borderRadius: '8px', backgroundColor: '#f8fafc', textDecoration: 'none', color: '#334155'
              }}>
                <MessageCircle size={24} color="#25D366" />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>WhatsApp</span>
              </a>
              
              <a href={getShareLink('facebook')} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '16px', borderRadius: '8px', backgroundColor: '#f8fafc', textDecoration: 'none', color: '#334155'
              }}>
                <Globe size={24} color="#1877F2" />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>Facebook</span>
              </a>
              
              <a href={getShareLink('gmail')} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '16px', borderRadius: '8px', backgroundColor: '#f8fafc', textDecoration: 'none', color: '#334155'
              }}>
                <Mail size={24} color="#EA4335" />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>Gmail</span>
              </a>
              
              <button onClick={copyToClipboard} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                padding: '16px', borderRadius: '8px', backgroundColor: '#f8fafc', border: 'none', cursor: 'pointer', color: '#334155'
              }}>
                <LinkIcon size={24} color="#475569" />
                <span style={{ fontSize: '14px', fontWeight: 500 }}>Copy Link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
