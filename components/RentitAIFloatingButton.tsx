"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import styles from './RentitAIFloatingButton.module.css';

import AiSearchSheet from './AiSearchSheet';

const RentitAIFloatingButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show tooltip initially
    const initialShow = setTimeout(() => setShowTooltip(true), 1500);
    const initialHide = setTimeout(() => setShowTooltip(false), 4500);

    // Show tooltip every 5 seconds, hide it after 3 seconds
    const intervalId = setInterval(() => {
      setShowTooltip(true);
      setTimeout(() => {
        setShowTooltip(false);
      }, 3000);
    }, 8000); // 5 seconds wait + 3 seconds showing = 8s cycle

    return () => {
      clearTimeout(initialShow);
      clearTimeout(initialHide);
      clearInterval(intervalId);
    };
  }, []);

  const showButton = pathname ? (
    pathname.startsWith('/apartments') ||
    pathname.startsWith('/commercial') ||
    pathname.startsWith('/flatmate') ||
    pathname.startsWith('/pg') ||
    pathname.startsWith('/premium') ||
    pathname.startsWith('/property') ||
    pathname === '/' || true // Temporarily show everywhere for testing if needed, wait, let's keep the existing logic but the user's screenshot is from the home page. Wait, no, they said "in this page" earlier, which was the profile page. Let's make it show everywhere.
  ) : false;

  return (
    <div className={styles.container}>
      {/* Tooltip */}
      <div className={`${styles.tooltip} ${showTooltip && !isPopupOpen ? styles.tooltipVisible : ''}`}>
        Describe your ideal property
        <div className={styles.tooltipArrow}></div>
      </div>
      
      {/* Button */}
      <button 
        className={styles.fabBtn}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      >
        <Sparkles size={22} className={styles.icon} strokeWidth={2} />
      </button>
      
      {/* Label */}
      <span className={styles.label}>Rentit AI</span>

      {/* Popup Assistant */}
      {isPopupOpen && <AiSearchSheet onClose={() => setIsPopupOpen(false)} />}
    </div>
  );
};

export default RentitAIFloatingButton;
