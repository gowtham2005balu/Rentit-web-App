import React from 'react';
import { ArrowRight } from 'lucide-react';
import styles from './PackersBanner.module.css';

const PackersBanner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconSection}>
        🚚
      </div>
      <div className={styles.contentSection}>
        <div className={styles.sponsoredLabel}>Sponsored • PackersXpress</div>
        <h3 className={styles.title}>Moving to Velachery? Get Instant Quotes from Verified Packers</h3>
        <p className={styles.subtitle}>Compare 80+ movers • Guaranteed lowest price • 4.8★ rated</p>
        <button className={styles.quoteBtn}>
          Get Quote <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PackersBanner;
