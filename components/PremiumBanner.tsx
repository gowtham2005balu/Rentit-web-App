import React from 'react';
import Link from 'next/link';
import { Star, Zap } from 'lucide-react';
import styles from './PremiumBanner.module.css';

const PremiumBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.topLabel}>
          <Star size={12} /> EARLY ACCESS • RENTIT PREMIUM
        </div>
        <h2 className={styles.title}>Get Owner Contacts Before<br />They Go Public</h2>
        <p className={styles.subtitle}>Access 500+ off-market listings + direct owner numbers before they're listed publicly.</p>
      </div>
      <Link href="/premium" style={{ textDecoration: 'none' }}>
        <button className={styles.premiumBtn}>
          <Zap size={16} /> Go Premium
        </button>
      </Link>
    </div>
  );
};

export default PremiumBanner;
