import React from 'react';
import { Globe, ArrowRight } from 'lucide-react';
import styles from './JioBanner.module.css';

const JioBanner = () => {
  return (
    <div className={styles.bannerContainer}>
      <div className={styles.iconSection}>
        <Globe size={32} className={styles.globeIcon} strokeWidth={1.5} />
      </div>
      <div className={styles.contentSection}>
        <div className={styles.sponsoredText}>Sponsored · Jio Fiber</div>
        <h3 className={styles.title}>Blazing Fast 1 Gbps Internet for Your New Home</h3>
        <p className={styles.subtitle}>Plans starting ₹399/month · Free router · Same-day installation</p>
        <button className={styles.ctaButton}>
          Get Connection <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};

export default JioBanner;
