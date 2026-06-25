"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import styles from './page.module.css';
import { Timer, CheckCircle2, Camera, PlaySquare, BarChart2, Star, Crown, Zap, Share2, Link as LinkIcon, Users } from 'lucide-react';

export const plansData: any = {
  'PG': {
    Seller: [
      {
        id: 'basic', name: 'Basic', duration: '30 Days', price: '1,250', basePrice: '1,059.32', gst: '190.68', visibility: 'Medium Visibility',
        includes: ['Free includes 5 property listings', 'Unlimited property listing', 'Showcased 1 property for 1 week in top highlighted'],
        addons: []
      },
      {
        id: 'premium', name: 'Premium', duration: '30 Days', price: '2,250', basePrice: '1,906.78', gst: '343.22', visibility: 'High Visibility',
        includes: ['Unlimited property listing', 'Showcased 2 properties for 2 weeks in top highlighted', 'Feature property on Rentit’s official social'],
        addons: []
      },
      {
        id: 'premium-plus', name: 'Premium+', duration: '60 Days', price: '3,950', basePrice: '3,347.46', gst: '602.54', visibility: 'High Visibility',
        includes: ['Unlimited property listing', 'Showcased for 4 weeks in top highlighted', 'Facebook Ads & Google Ads', 'Feature property on Rentit’s official social', 'Custom photoshoots'],
        addons: []
      }
    ],
    User: [
      {
        id: 'basic', name: 'Basic', duration: '15 Days', price: '799', basePrice: '677.12', gst: '121.88', contacts: '10 Contacts',
        includes: ['Advanced Filters'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      },
      {
        id: 'premium', name: 'Premium', duration: '30 Days', price: '899', basePrice: '761.86', gst: '137.14', contacts: '25 Contacts',
        includes: ['Advanced filter', 'Property Info on Wp', 'Property posted date info'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      }
    ]
  },
  'Apartment / Housing': {
    Seller: [
      {
        id: 'basic', name: 'Basic', duration: '45 Days', price: '1,549', basePrice: '1,312.71', gst: '236.29', visibility: '2x / (Medium)',
        includes: ['Increased listing visibility'],
        addons: [{ name: 'Photoshoot', price: '₹1,500' }]
      },
      {
        id: 'premium', name: 'Premium', duration: '60 Days', price: '3,549', basePrice: '3,007.63', gst: '541.37', visibility: 'High Visibility',
        includes: ['Facebook Ads', 'Listing highlights', 'Verified tag on property'],
        addons: [
          { name: 'Photoshoot', price: '₹750' },
          { name: 'AI Video', price: '₹2,000', subs: ['SM ad campaign', 'Reusable video link', 'Post property in official rentit SM channel'] }
        ]
      },
      {
        id: 'premium-plus', name: 'Premium+', duration: '60 Days', price: '5,349', basePrice: '4,532.20', gst: '816.80', visibility: 'High Visibility',
        includes: ['Facebook Ads & Google Ads', 'Reports & Insights', 'Listing highlight', 'Rank top in search for 24 hrs', 'Verified tag on property'],
        addons: [
          { name: 'Photoshoot', price: '₹750' },
          { name: 'AI Video', price: '₹2,000', subs: ['SM ad campaign', 'Reusable video link', 'Post property in official rentit SM channel'] }
        ]
      }
    ],
    User: [
      {
        id: 'basic', name: 'Basic', duration: '45 Days', price: '1,449', basePrice: '1,228.81', gst: '220.19', contacts: '20 Contacts',
        includes: ['Advanced Filters'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      },
      {
        id: 'premium', name: 'Premium', duration: '60 Days', price: '3,499', basePrice: '2,965.25', gst: '533.75', contacts: '50 Contacts',
        includes: ['Advanced Filters', 'Interior design consultation'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      },
      {
        id: 'premium-plus', name: 'Premium+', duration: '60 Days', price: '4,499', basePrice: '3,813.56', gst: '685.44', contacts: '50 Contacts',
        includes: ['Advanced filter', 'Property Info on Wp', 'Interior Design consultation', 'Property posted date info'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      }
    ]
  },
  'Commercial': {
    Seller: [
      {
        id: 'basic', name: 'Basic', duration: '45 Days', price: '3,299', basePrice: '2,796.61', gst: '502.39', visibility: 'Medium Visibility',
        includes: ['Increased listing visibility'],
        addons: [{ name: 'Photoshoot', price: '₹1,500' }]
      },
      {
        id: 'premium', name: 'Premium', duration: '90 Days', price: '5,299', basePrice: '4,490.68', gst: '808.32', visibility: 'High Visibility',
        includes: ['Facebook Ads', 'Verified tag on property', 'Listing Highlight'],
        addons: [
          { name: 'Photoshoot', price: '₹750' },
          { name: 'AI Video', price: '₹2,000', subs: ['SM ad campaign', 'Reusable video link', 'Opportunity to post property in official rentit SM channel'] }
        ]
      },
      {
        id: 'premium-plus', name: 'Premium+', duration: '90 Days', price: '6,999', basePrice: '5,931.36', gst: '1,067.64', visibility: 'High Visibility',
        includes: ['Facebook Ads & google ads', 'Reports & Insights', 'Listing highlight', 'Rank top in search for 24 hrs', 'Verified tag on property'],
        addons: [
          { name: 'Photoshoot', price: '₹750' },
          { name: 'AI Video', price: '₹2,000', subs: ['SM ad campaign', 'Reusable video link', 'Feature your property on Rentit’s official social channels'] }
        ]
      }
    ],
    User: [
      {
        id: 'basic', name: 'Basic', duration: '90 Days', price: '1,099', basePrice: '931.36', gst: '167.64', contacts: '25 Contacts',
        includes: ['Advanced Filters'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      },
      {
        id: 'premium', name: 'Premium', duration: '45 Days', price: '2,599', basePrice: '2,202.54', gst: '396.46', contacts: '50 Contacts',
        includes: ['Advanced Filters', 'Interior design consultation'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      },
      {
        id: 'premium-plus', name: 'Premium+', duration: '45 Days', price: '4,599', basePrice: '3,897.46', gst: '701.54', contacts: '50 Contacts',
        includes: ['Advanced filter', 'Property Info on Wp', 'Interior Design consultation', 'Property posted date info'],
        addons: [{ name: '2 Contacts', price: '₹75' }]
      }
    ]
  }
};

export default function PremiumPlansPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Apartment / Housing');
  const [role, setRole] = useState<'Seller' | 'User'>('Seller');
  const tabs = ['PG', 'Apartment / Housing', 'Commercial'];
  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const activePlans = plansData[activeTab]?.[role] || [];
  const basicPlan = activePlans.find((p: any) => p.id === 'basic');
  const premiumPlan = activePlans.find((p: any) => p.id === 'premium');
  const premiumPlusPlan = activePlans.find((p: any) => p.id === 'premium-plus');

  return (
    <div className={styles.pageContainer}>
      <Navbar hideSearchBar={true} />
      
      <div className={styles.headerSection}>
        <h1 className={styles.pageTitle}>{role === 'Seller' ? 'Boost Your Property Visibility' : 'Find Your Dream Property Faster'}</h1>
        <p className={styles.pageSubtitle}>
          {role === 'Seller' 
            ? 'Get more enquiries, better visibility, and faster occupancy with Rentit Premium.' 
            : 'Get exclusive owner contacts, advanced filters, and premium support with Rentit Premium.'}
        </p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', background: '#F3F4F6', borderRadius: '12px', padding: '4px' }}>
          <button 
            onClick={() => setRole('Seller')}
            style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', background: role === 'Seller' ? '#111827' : 'transparent', color: role === 'Seller' ? 'white' : '#6B7280', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Seller Plans
          </button>
          <button 
            onClick={() => setRole('User')}
            style={{ padding: '8px 24px', borderRadius: '8px', border: 'none', background: role === 'User' ? '#111827' : 'transparent', color: role === 'User' ? 'white' : '#6B7280', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            User Plans
          </button>
        </div>
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
        {basicPlan && (
        <div className={styles.card}>
          <div className={styles.planNameWrapper}>
            <div className={`${styles.planName} ${styles.planNameBasic}`}>Basic</div>
            <div className={styles.validity}>
              <Timer size={14} /> {basicPlan.duration} Validity
            </div>
            <div className={`${styles.visibilityBadge} ${styles.visibilityMedium}`}>
              {role === 'Seller' ? <><BarChart2 size={12} strokeWidth={3} /> {basicPlan.visibility}</> : <><Users size={12} strokeWidth={3} /> {basicPlan.contacts}</>}
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <span className={styles.rupee}>₹</span>{basicPlan.price}
            </div>
            {basicPlan.basePrice && (
              <div className={styles.taxInfo}>
                (Base: ₹{basicPlan.basePrice} + 18% GST: ₹{basicPlan.gst})
              </div>
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.sectionTitle}>INCLUDES</div>
          <ul className={styles.featureList}>
            {basicPlan.includes.map((feat: string, i: number) => (
              <li key={i} className={styles.featureItem}>
                <CheckCircle2 size={18} color="#10B981" /> {feat}
              </li>
            ))}
          </ul>

          {basicPlan.addons && basicPlan.addons.length > 0 && (
            <>
              <div className={styles.sectionTitle} style={{marginTop: '24px'}}>AVAILABLE ADD-ON</div>
              <div className={styles.addonsBox}>
                {basicPlan.addons.map((addon: any, i: number) => (
                  <div key={i} className={styles.addonItem}>
                    <Camera size={16} color="#F59E0B" />
                    <div>{addon.name} <span className={styles.addonPrice}>{addon.price}</span></div>
                  </div>
                ))}
              </div>
            </>
          )}

          <button 
            className={`${styles.actionBtn} ${styles.btnBasic}`}
            style={{ marginTop: 'auto' }}
            onClick={() => router.push(`/premium/checkout?plan=basic&category=${activeTab}&role=${role}`)}
          >
            Choose Basic
          </button>
        </div>
        )}

        {/* Premium Plan */}
        {premiumPlan && (
        <div className={`${styles.card} ${styles.cardPremium}`}>
          <div className={`${styles.badge} ${styles.badgePremium}`}>
            <Star size={10} fill="white" /> MOST POPULAR
          </div>
          <div className={styles.planNameWrapper}>
            <div className={`${styles.planName} ${styles.planNamePremium}`}>Premium</div>
            <div className={styles.validity}>
              <Timer size={14} /> {premiumPlan.duration} Validity
            </div>
            <div className={`${styles.visibilityBadge} ${styles.visibilityHigh}`}>
              {role === 'Seller' ? <><BarChart2 size={12} strokeWidth={3} /> {premiumPlan.visibility}</> : <><Users size={12} strokeWidth={3} /> {premiumPlan.contacts}</>}
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <span className={styles.rupee}>₹</span>{premiumPlan.price}
            </div>
            {premiumPlan.basePrice && (
              <div className={styles.taxInfo}>
                (Base: ₹{premiumPlan.basePrice} + 18% GST: ₹{premiumPlan.gst})
              </div>
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.sectionTitle}>INCLUDES</div>
          <ul className={styles.featureList}>
            {premiumPlan.includes.map((feat: string, i: number) => (
              <li key={i} className={styles.featureItem}>
                <CheckCircle2 size={18} color="#10B981" /> {feat}
              </li>
            ))}
          </ul>

          {premiumPlan.addons && premiumPlan.addons.length > 0 && (
            <>
              <div className={styles.sectionTitle} style={{marginTop: '24px'}}>AVAILABLE ADD-ONS</div>
              <div className={styles.addonsBox}>
                {premiumPlan.addons.map((addon: any, i: number) => (
                  <div key={i} className={styles.addonItem}>
                    {addon.name.includes('Video') ? <PlaySquare size={16} color="#F59E0B" /> : <Camera size={16} color="#F59E0B" />}
                    <div>
                      <div>{addon.name} <span className={styles.addonPrice}>{addon.price}</span></div>
                      {addon.subs && addon.subs.map((sub: string, j: number) => (
                        <div key={j} className={styles.addonSubtext} style={{marginTop: j===0 ? '8px' : '0'}}>
                          {sub.includes('link') ? <LinkIcon size={10} /> : <Share2 size={10} />} {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <button 
            className={`${styles.actionBtn} ${styles.btnPremium}`}
            style={{ marginTop: 'auto' }}
            onClick={() => router.push(`/premium/checkout?plan=premium&category=${activeTab}&role=${role}`)}
          >
            Choose Premium
          </button>
        </div>
        )}

        {/* Premium+ Plan */}
        {premiumPlusPlan && (
        <div className={`${styles.card} ${styles.cardPremiumPlus}`}>
          <div className={`${styles.badge} ${styles.badgePremiumPlus}`}>
            <Crown size={10} fill="white" /> PREMIUM+
          </div>
          <div className={styles.planNameWrapper}>
            <div className={`${styles.planName} ${styles.planNamePremiumPlus}`}>Premium+</div>
            <div className={styles.validity}>
              <Timer size={14} /> {premiumPlusPlan.duration} Validity
            </div>
            <div className={`${styles.visibilityBadge} ${styles.visibilityHigh}`}>
              {role === 'Seller' ? <><BarChart2 size={12} strokeWidth={3} /> {premiumPlusPlan.visibility}</> : <><Users size={12} strokeWidth={3} /> {premiumPlusPlan.contacts}</>}
            </div>
          </div>

          <div className={styles.priceContainer}>
            <div className={styles.price}>
              <span className={styles.rupee}>₹</span>{premiumPlusPlan.price}
            </div>
            {premiumPlusPlan.basePrice && (
              <div className={styles.taxInfo}>
                (Base: ₹{premiumPlusPlan.basePrice} + 18% GST: ₹{premiumPlusPlan.gst})
              </div>
            )}
          </div>

          <div className={styles.divider}></div>

          <div className={styles.sectionTitle}>EVERYTHING IN PREMIUM, PLUS</div>
          <ul className={styles.featureList}>
            {premiumPlusPlan.includes.map((feat: string, i: number) => (
              <li key={i} className={feat.includes('Rank top') ? `${styles.featureItem} ${styles.featureItemRed}` : styles.featureItem}>
                {feat.includes('Rank top') ? <Zap size={18} color="#EF4444" fill="#EF4444" /> : <CheckCircle2 size={18} color="#10B981" />} {feat}
              </li>
            ))}
          </ul>

          {premiumPlusPlan.addons && premiumPlusPlan.addons.length > 0 && (
            <>
              <div className={styles.sectionTitle} style={{marginTop: '24px'}}>AVAILABLE ADD-ONS</div>
              <div className={styles.addonsBox}>
                {premiumPlusPlan.addons.map((addon: any, i: number) => (
                  <div key={i} className={styles.addonItem}>
                    {addon.name.includes('Video') ? <PlaySquare size={16} color="#F59E0B" /> : <Camera size={16} color="#F59E0B" />}
                    <div>
                      <div>{addon.name} <span className={styles.addonPrice}>{addon.price}</span></div>
                      {addon.subs && addon.subs.map((sub: string, j: number) => (
                        <div key={j} className={styles.addonSubtext} style={{marginTop: j===0 ? '8px' : '0'}}>
                          {sub.includes('link') ? <LinkIcon size={10} /> : <Share2 size={10} />} {sub}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <button 
            className={`${styles.actionBtn} ${styles.btnPremiumPlus}`}
            style={{ marginTop: 'auto' }}
            onClick={() => router.push(`/premium/checkout?plan=premium-plus&category=${activeTab}&role=${role}`)}
          >
            Choose Premium+
          </button>
        </div>
        )}

      </div>

      <div className={styles.bottomBannerWrapper}>
        <div className={styles.bottomBanner}>
          Trusted by <span className={styles.bannerHighlight}>50,000+ property owners</span> across India · Verified listings get <span className={styles.bannerGreen}>5× more enquiries</span>
        </div>
      </div>

    </div>
  );
}
