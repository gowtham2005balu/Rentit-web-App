import React from 'react';
import { ArrowRight, TrendingUp } from 'lucide-react';
import styles from './MarketInsights.module.css';

const insightsData = [
  {
    id: 1,
    category: 'RENTAL TRENDS',
    title: 'IT Corridor Continues to Drive Rental Demand in OMR',
    description: 'Return-to-office policies and IT sector growth are keeping rental demand strong in Sholinganallur, Perungudi, and OMR. Industry reports indicate rental values in Chennai have increased year-over-year in several micro-markets during 2026.',
    trend: 'Rising',
    trendText: 'demand • May 2026',
    isPositive: true
  },
  {
    id: 2,
    category: 'NEIGHBOURHOOD',
    title: 'Velachery Remains a Top Choice for Professionals',
    description: 'Velachery continues to attract renters due to its connectivity, access to IT hubs, MRTS links, shopping centres, and upcoming Metro Phase 2 developments.',
    trend: 'Top',
    trendText: 'choice • May 2026',
    isPositive: false
  },
  {
    id: 3,
    category: 'MARKET REPORT',
    title: 'Demand for PG & Shared Accommodation Remains High',
    description: 'Women-only accommodation occupancy in Tamil Nadu reached 93% in early 2026, reflecting strong demand from students and working professionals, especially in Chennai.',
    trend: '93%',
    trendText: 'occupancy • Feb 2026',
    isPositive: true
  }
];

export default function MarketInsights() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.headerRow}>
          <div>
            <h2 className={styles.title}>Market Insights</h2>
            <p className={styles.subtitle}>Latest rental trends and neighbourhood analysis for Chennai</p>
          </div>
          <a href="/blog" className={styles.exploreAll}>
            All insights <ArrowRight size={14} />
          </a>
        </div>
        
        <div className={styles.gridContainer}>
          {insightsData.map((item) => (
            <a href="/blog" key={item.id} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
              <div className={styles.card}>
                <div className={styles.category}>{item.category}</div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
                
                <div className={styles.footerWrapper}>
                  <div className={styles.trendRow}>
                    {item.isPositive ? (
                      <>
                        <span className={styles.trendGreen}>
                          <TrendingUp size={14} strokeWidth={3} /> {item.trend}
                        </span>
                        <span>{item.trendText}</span>
                      </>
                    ) : (
                      <span>{item.trend} {item.trendText}</span>
                    )}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
