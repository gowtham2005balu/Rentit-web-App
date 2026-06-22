import React from 'react';
import Link from 'next/link';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
import styles from './RentitPremiumBanner.module.css';

export default function RentitPremiumBanner() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.banner}>
          <div className={styles.leftSide}>
            <div className={styles.badge}>
              RENTIT PREMIUM
            </div>
            
            <h2 className={styles.title}>
              Unlock Premium Listings<br />
              <span className={styles.highlight}>& Exclusive Access</span>
            </h2>
            
            <ul className={styles.featuresList}>
              <li className={styles.featureItem}>
                <Check size={16} className={styles.checkIcon} strokeWidth={3} />
                Early access to new listings before public release
              </li>
              <li className={styles.featureItem}>
                <Check size={16} className={styles.checkIcon} strokeWidth={3} />
                Direct owner contact — skip agents entirely
              </li>
              <li className={styles.featureItem}>
                <Check size={16} className={styles.checkIcon} strokeWidth={3} />
                AI-personalized recommendations tailored to you
              </li>
              <li className={styles.featureItem}>
                <Check size={16} className={styles.checkIcon} strokeWidth={3} />
                Priority support with dedicated relationship manager
              </li>
            </ul>
            
            <Link href="/premium">
              <button className={styles.ctaBtn}>
                <Sparkles size={16} /> Explore Premium Now <ArrowRight size={16} />
              </button>
            </Link>
          </div>
          
          <div className={styles.glassCard}>
            <p className={styles.cardTopText}>Starting from just</p>
            <h3 className={styles.price}>₹499</h3>
            <p className={styles.cardSubText}>/month · Cancel anytime</p>
            
            <div className={styles.divider}></div>
            
            <ul className={styles.glassFeaturesList}>
              <li className={styles.glassFeatureItem}>
                <Check size={14} className={styles.glassCheckIcon} strokeWidth={3} />
                Priority listing alerts
              </li>
              <li className={styles.glassFeatureItem}>
                <Check size={14} className={styles.glassCheckIcon} strokeWidth={3} />
                Unlimited owner contacts
              </li>
              <li className={styles.glassFeatureItem}>
                <Check size={14} className={styles.glassCheckIcon} strokeWidth={3} />
                AI match score reveal
              </li>
              <li className={styles.glassFeatureItem}>
                <Check size={14} className={styles.glassCheckIcon} strokeWidth={3} />
                Verified landlord badge
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
