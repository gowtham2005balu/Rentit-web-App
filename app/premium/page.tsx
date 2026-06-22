"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import styles from './page.module.css';
import { Timer, CheckCircle2, Camera, PlaySquare, BarChart2, Star, Crown, Zap, Share2, Link } from 'lucide-react';

export default function PremiumPlansPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Apartment / Housing');

  const tabs = ['PG', 'Apartment / Housing', 'Commercial', 'Flatmate'];

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.pageContainer}>
      <Navbar hideSearchBar={true} />
      
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>Boost Your Property Visibility</h1>
        <p className={styles.pageSubtitle}>
          Get more enquiries, better visibility, and faster occupancy with Rentit Premium. Join 50,000+ property owners.
        </p>
      </div>

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <div 
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.flashBannerWrapper}>
        <div className={styles.flashBanner}>
          <Timer size={18} strokeWidth={2.5} />
          Flash Sale! Save up to 45% extra — Limited time offer
          <span className={styles.flashTimer}>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className={styles.cardsWrapper}>
        
        {/* Basic Plan */}
        <div className={styles.card}>
          <div className={styles.planNameWrapper}>
            <div className={`${styles.planName} ${styles.planNameBasic}`}>Basic</div>
            <div className={styles.validity}>
              <Timer size={14} /> 45 Days Validity
            </div>
            <div className={`${styles.visibilityBadge} ${styles.visibilityMedium}`}>
              <BarChart2 size={12} strokeWidth={3} /> 2x Visibility (Medium)
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <span className={styles.rupee}>₹</span>1,549
            </div>
            <div className={styles.originalPriceWrapper}>
              <span className={styles.strikePrice}>₹2,818</span>
              <span className={styles.discount}>— 45% off</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.sectionTitle}>INCLUDES</div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Increased listing visibility
            </li>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Listing promotion in feed
            </li>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Priority discovery
            </li>
          </ul>

          <div className={styles.sectionTitle} style={{marginTop: '24px'}}>AVAILABLE ADD-ON</div>
          <div className={styles.addonsBox}>
            <div className={styles.addonItem}>
              <Camera size={16} color="#F59E0B" />
              <div>Photoshoot <span className={styles.addonPrice}>₹1,500</span></div>
            </div>
          </div>

          <button 
            className={`${styles.actionBtn} ${styles.btnBasic}`}
            onClick={() => router.push('/premium/checkout?plan=basic')}
          >
            Choose Basic
          </button>
        </div>

        {/* Premium Plan */}
        <div className={`${styles.card} ${styles.cardPremium}`}>
          <div className={`${styles.badge} ${styles.badgePremium}`}>
            <Star size={10} fill="white" /> MOST POPULAR
          </div>
          <div className={styles.planNameWrapper}>
            <div className={`${styles.planName} ${styles.planNamePremium}`}>Premium</div>
            <div className={styles.validity}>
              <Timer size={14} /> 60 Days Validity
            </div>
            <div className={`${styles.visibilityBadge} ${styles.visibilityHigh}`}>
              <BarChart2 size={12} strokeWidth={3} /> High Visibility
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <span className={styles.rupee}>₹</span>3,549
            </div>
            <div className={styles.originalPriceWrapper}>
              <span className={styles.strikePrice}>₹6,453</span>
              <span className={styles.discount}>— 45% off</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.sectionTitle}>INCLUDES</div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Facebook Ads promotion
            </li>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Listing Highlights
            </li>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Verified Tag on Property
            </li>
          </ul>

          <div className={styles.sectionTitle} style={{marginTop: '24px'}}>AVAILABLE ADD-ONS</div>
          <div className={styles.addonsBox}>
            <div className={styles.addonItem}>
              <Camera size={16} color="#F59E0B" />
              <div>Photoshoot <span className={styles.addonPrice}>₹750</span></div>
            </div>
            <div className={styles.addonItem}>
              <PlaySquare size={16} color="#F59E0B" />
              <div>
                <div>AI Video <span className={styles.addonPrice}>₹2,000</span></div>
                <div className={styles.addonSubtext} style={{marginTop: '8px'}}>
                  <Share2 size={10} /> Social Media Ad Campaign
                </div>
                <div className={styles.addonSubtext}>
                  <Link size={10} /> Reusable Video Link
                </div>
                <div className={styles.addonSubtext}>
                  <Share2 size={10} /> Post on Rentit official channels
                </div>
              </div>
            </div>
          </div>

          <button 
            className={`${styles.actionBtn} ${styles.btnPremium}`}
            onClick={() => router.push('/premium/checkout?plan=premium')}
          >
            Choose Premium
          </button>
        </div>

        {/* Premium+ Plan */}
        <div className={`${styles.card} ${styles.cardPremiumPlus}`}>
          <div className={`${styles.badge} ${styles.badgePremiumPlus}`}>
            <Crown size={10} fill="white" /> PREMIUM+
          </div>
          <div className={styles.planNameWrapper}>
            <div className={`${styles.planName} ${styles.planNamePremiumPlus}`}>Premium+</div>
            <div className={styles.validity}>
              <Timer size={14} /> 60 Days Validity
            </div>
            <div className={`${styles.visibilityBadge} ${styles.visibilityHigh}`}>
              <BarChart2 size={12} strokeWidth={3} /> High Visibility
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <span className={styles.rupee}>₹</span>5,349
            </div>
            <div className={styles.originalPriceWrapper}>
              <span className={styles.strikePrice}>₹9,726</span>
              <span className={styles.discount}>— 45% off</span>
            </div>
          </div>

          <div className={styles.divider}></div>

          <div className={styles.sectionTitle}>EVERYTHING IN PREMIUM, PLUS</div>
          <ul className={styles.featureList}>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Facebook Ads & Google Ads
            </li>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Reports & Insights dashboard
            </li>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Listing Highlight badge
            </li>
            <li className={`${styles.featureItem} ${styles.featureItemRed}`}>
              <Zap size={18} color="#EF4444" fill="#EF4444" />
              Rank Top in Search for 24 Hours
            </li>
            <li className={styles.featureItem}>
              <CheckCircle2 size={18} color="#10B981" />
              Verified Tag on Property
            </li>
          </ul>

          <div className={styles.sectionTitle} style={{marginTop: '24px'}}>AVAILABLE ADD-ONS</div>
          <div className={styles.addonsBox}>
            <div className={styles.addonItem}>
              <Camera size={16} color="#F59E0B" />
              <div>Photoshoot <span className={styles.addonPrice}>₹750</span></div>
            </div>
            <div className={styles.addonItem}>
              <PlaySquare size={16} color="#F59E0B" />
              <div>AI Video <span className={styles.addonPrice}>₹2,000</span></div>
            </div>
          </div>

          <button 
            className={`${styles.actionBtn} ${styles.btnPremiumPlus}`}
            onClick={() => router.push('/premium/checkout?plan=premium-plus')}
          >
            Choose Premium+
          </button>
        </div>

      </div>

      <div className={styles.bottomBannerWrapper}>
        <div className={styles.bottomBanner}>
          Trusted by <span className={styles.bannerHighlight}>50,000+ property owners</span> across India · Verified listings get <span className={styles.bannerGreen}>5× more enquiries</span>
        </div>
      </div>

    </div>
  );
}
