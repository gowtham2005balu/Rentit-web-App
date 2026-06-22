"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, History, ArrowRight, RefreshCw, BarChart2, TrendingUp, Zap } from 'lucide-react';
import styles from './RightSidebarWidgets.module.css';

interface RightSidebarWidgetsProps {
  recentItems?: {
    id?: string;
    title: string;
    location: string;
    price: number;
    image: string;
  }[];
}

const RightSidebarWidgets: React.FC<RightSidebarWidgetsProps> = ({ recentItems }) => {
  // Interactive Home Loan Calculator configuration
  const [loanTerm, setLoanTerm] = useState(20);
  const [loanAmount, setLoanAmount] = useState(5000000);
  const [interestRate, setInterestRate] = useState(8.5);

  const calculateEMI = () => {
    const P = loanAmount;
    const r = (interestRate / 12) / 100;
    const n = loanTerm * 12;
    if (r === 0) return (P / n).toFixed(0);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi).toLocaleString('en-IN');
  };

  // Safe mock items matching the exact mockup design
  const defaultRecentItems: NonNullable<RightSidebarWidgetsProps['recentItems']> = [
    {
      title: "Maple Residency, Porur",
      location: "Porur, Chennai",
      price: 58000,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Maple Residency, Porur",
      location: "Porur, Chennai",
      price: 58000,
      image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Maple Residency, Porur",
      location: "Porur, Chennai",
      price: 58000,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const displayItems = recentItems && recentItems.length > 0 ? recentItems.slice(0, 3) : defaultRecentItems;

  return (
    <aside className={styles.sidebar}>
      
      {/* 1. EARLY ACCESS Premium Widget */}
      <div className={`${styles.widget} ${styles.earlyAccessWidget}`}>
        <span className={styles.earlyAccessTag}>
          <Star size={12} strokeWidth={2.5} className={styles.starIcon} />
          <span>EARLY ACCESS</span>
        </span>

        <h3 className={styles.earlyAccessTitle}>
          Get Early Access to Premium Listings
        </h3>
        
        <p className={styles.earlyAccessDesc}>
          Connect directly with owners. No middlemen, no hidden fees — ever.
        </p>

        <ul className={styles.checkList}>
          <li>
            <CheckCircle2 size={14} strokeWidth={2.5} className={styles.checkIcon} />
            <span>Unlock owner contacts instantly</span>
          </li>
          <li>
            <CheckCircle2 size={14} strokeWidth={2.5} className={styles.checkIcon} />
            <span>500+ off-market listings</span>
          </li>
        </ul>
      </div>

      {/* 2. HDFC Bank Home Loan Widget */}
      <div className={`${styles.widget} ${styles.hdfcWidget}`}>
        <div className={styles.headerRow}>
          <span className={styles.bankName}>HDFC BANK</span>
          <span className={styles.adBadgeBlue}>AD</span>
        </div>

        <div>
          <div className={styles.bigRate}>
            8.5% <span className={styles.rateText}>p.a. onwards</span>
          </div>
          <p className={styles.loanDesc}>
            Home Loan with Instant Approval. 0% Brokerage
          </p>
        </div>
      </div>

      {/* 3. RECENTLY VIEWED Panel */}
      <div className={styles.widgetCard}>
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <History size={16} className={styles.iconDark} />
            <h4 className={styles.cardTitle}>Recently Viewed</h4>
          </div>
          <button className={styles.seeAllLink} onClick={() => alert('Loading recent items...')}>
            See all <ArrowRight size={12} />
          </button>
        </div>

        <div className={styles.recentList}>
          {displayItems.map((item, idx) => (
            <Link key={idx} href={item.id ? `/property/${item.id}` : '#'} className={styles.recentItem} style={{ textDecoration: 'none' }}>
              <img 
                src={item.image} 
                alt={item.title} 
                referrerPolicy="no-referrer"
                className={styles.recentImage} 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=300';
                }}
                ref={(img) => {
                  if (img && img.complete && img.naturalWidth === 0) {
                    img.src = 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=300';
                  }
                }}
              />
              <div className={styles.recentDetails}>
                <h5 className={styles.recentTitle}>{item.title}</h5>
                <span className={styles.recentLocation}>{item.location}</span>
              </div>
              <div className={styles.recentPriceContainer}>
                <span className={styles.recentPrice}>₹{(item.price / 1000).toFixed(0)}k</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 4. Market Snapshot (New Design) */}
      <div className={styles.marketSnapshotCard}>
        <div className={styles.msHeader}>
          <BarChart2 size={16} className={styles.msIcon} />
          <h4 className={styles.msTitle}>Market Snapshot</h4>
        </div>
        <div className={styles.msContent}>
          <div className={styles.msLeft}>
            <div className={styles.msValue}>₹12.4k</div>
            <div className={styles.msLabel}>Avg rent / mo</div>
            <div className={styles.msTrend}>
              <TrendingUp size={12} strokeWidth={3} /> +8.2%
            </div>
          </div>
          <div className={styles.msDivider}></div>
          <div className={styles.msRight}>
            <div className={styles.msValue}>Velachery</div>
            <div className={styles.msLabel}>Fastest growing</div>
            <div className={styles.msHighlight}>
              <Zap size={12} fill="currentColor" /> High demand
            </div>
          </div>
        </div>
      </div>

      {/* 5. SecureHome Insurance Ad */}
      <div className={styles.secureHomeCard}>
        <div className={styles.shHeaderRow}>
          <span className={styles.shTitle}>SECUREHOME INSURANCE</span>
          <span className={styles.shAdBadge}>AD</span>
        </div>
        <p className={styles.shDesc}>
          Protect Your Rental with Renter's Insurance
        </p>
      </div>

      {/* 6. Urban Ladder Sponsored */}
      <div className={styles.urbanLadderCard}>
        <div className={styles.ulHeaderRow}>
          <span className={styles.ulTitle}>Urban Ladder</span>
          <span className={styles.ulSponsoredBadge}>SPONSORED</span>
        </div>
        <p className={styles.ulOffer}>
          30% Off
        </p>
      </div>

    </aside>
  );
};

export default RightSidebarWidgets;
