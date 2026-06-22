"use client";

import React, { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import styles from './page.module.css';
import { 
  ArrowLeft, 
  Info, 
  Crown, 
  Timer, 
  CheckCircle2, 
  Zap, 
  Camera, 
  PlaySquare, 
  Plus, 
  Minus,
  Check,
  MapPin, 
  ChevronDown, 
  ShieldCheck, 
  Lock 
} from 'lucide-react';

function CheckoutInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planParam = searchParams.get('plan') || 'premium-plus';
  const [isProcessing, setIsProcessing] = useState(false);
  
  // File upload ref for Photoshoot
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoshootClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleAddAddon('photoshoot', 'Photoshoot', 750);
    }
  };
  
  // Modal state
  const [selectedAddon, setSelectedAddon] = useState<string | null>(null);
  
  // Cart state
  const [addedAddons, setAddedAddons] = useState<{ id: string, name: string, price: number }[]>([]);

  const planDetails = {
    'basic': {
      title: 'Basic',
      price: 1549,
      validity: '45 Days Validity',
      badge: null,
      bestValue: false,
      features: [
        'Increased listing visibility',
        'Listing promotion in feed',
        'Priority discovery'
      ]
    },
    'premium': {
      title: 'Premium',
      price: 3549,
      validity: '60 Days Validity',
      badge: 'MOST POPULAR',
      bestValue: false,
      features: [
        'Facebook Ads promotion',
        'Listing Highlights',
        'Verified Tag on Property'
      ]
    },
    'premium-plus': {
      title: 'Premium+',
      price: 5349,
      validity: '60 Days Validity',
      badge: 'PREMIUM+',
      bestValue: true,
      features: [
        'Facebook Ads & Google Ads',
        'Reports & Insights dashboard',
        'Listing Highlight badge',
        'Rank Top in Search for 24 Hours',
        'Verified Tag on Property'
      ]
    }
  };

  const currentPlan = planDetails[planParam as keyof typeof planDetails] || planDetails['premium-plus'];

  // Base plan price
  const basePrice = currentPlan.price;
  
  // Calculate totals
  const addonTotal = addedAddons.reduce((sum, item) => sum + item.price, 0);
  const subtotal = basePrice + addonTotal;
  const gst = Math.round(subtotal * 0.18);
  const totalAmount = subtotal + gst;

  const handleAddAddon = (id: string, name: string, price: number) => {
    setAddedAddons([...addedAddons, { id, name, price }]);
    setSelectedAddon(null);
  };

  const handleRemoveAddon = (id: string) => {
    setAddedAddons(addedAddons.filter(a => a.id !== id));
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const userId = localStorage.getItem('rentit_userId') || '1';
      
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title: 'Payment Successful',
          message: `${currentPlan.title} Plan payment of ₹${totalAmount.toLocaleString('en-IN')} was processed successfully. Invoice #INV-` + Math.floor(Math.random() * 10000),
          type: 'Premium'
        })
      });
      
      // Simulate payment delay
      setTimeout(() => {
        router.push('/notifications');
      }, 1500);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };


  return (
    <div className={styles.pageContainer}>
      <Navbar hideSearchBar={true} />
      
      <div className={styles.mainContent}>
        
        <button className={styles.backBtn} onClick={() => router.back()}>
          <ArrowLeft size={16} /> Back to Plans
        </button>

        <h1 className={styles.pageTitle}>Order Review</h1>
        <p className={styles.pageSubtitle}>Review your selected plan and optional add-ons before payment.</p>

        <div className={styles.warningBanner}>
          <Info size={20} />
          <span>You have no active listing currently! <span className={styles.uploadLink}>Upload Listing Now &rarr;</span></span>
        </div>

        <div className={styles.twoColumnLayout}>
          
          {/* LEFT COLUMN */}
          <div className={styles.leftColumn}>
            
            <div className={styles.planCard}>
              <div className={styles.planHeader}>
                <div>
                  {currentPlan.badge && (
                    <div className={styles.badge}>
                      <Crown size={12} fill="white" /> {currentPlan.badge}
                    </div>
                  )}
                  <div className={styles.planTitle}>Apartment — {currentPlan.title}</div>
                  <div className={styles.planValidity}>
                    <Timer size={14} /> {currentPlan.validity}
                  </div>
                </div>
                <div className={styles.planPriceBox}>
                  <div className={styles.planPrice}>₹{currentPlan.price.toLocaleString('en-IN')}</div>
                  {currentPlan.bestValue && <div className={styles.bestValue}>Best Value</div>}
                </div>
              </div>

              <div className={styles.divider}></div>

              <ul className={styles.featureList}>
                {currentPlan.features.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <CheckCircle2 size={16} color="#10B981" /> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.addonsSectionHeader}>
              <div className={styles.addonsTitle}>Boost Your Response</div>
              <div className={styles.addonsSubtitle}>Optional Add-ons</div>
            </div>

            <div className={styles.addonCard}>
              <div className={styles.iconBoxYellow}>
                <Camera size={20} />
              </div>
              <div className={styles.addonInfo}>
                <div className={styles.addonName}>Photoshoot</div>
                <div className={styles.addonDesc}>Professional property photography by our expert team.</div>
              </div>
              <div className={styles.addonAction}>
                <div className={styles.addonPrice}>₹750</div>
                {addedAddons.find(a => a.id === 'photoshoot') ? (
                  <button className={styles.plusBtn} onClick={() => handleRemoveAddon('photoshoot')} style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                    <Minus size={18} strokeWidth={3} />
                  </button>
                ) : (
                  <>
                    <button className={styles.plusBtn} onClick={handlePhotoshootClick}>
                      <Plus size={18} strokeWidth={3} />
                    </button>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      accept="image/*" 
                      multiple 
                      onChange={handleFileChange} 
                    />
                  </>
                )}
              </div>
            </div>

            <div className={styles.addonCard}>
              <div className={styles.iconBoxBlue}>
                <PlaySquare size={20} />
              </div>
              <div className={styles.addonInfo}>
                <div className={styles.addonName}>AI Video</div>
                <ul className={styles.addonBulletList}>
                  <li>Social media ad campaign</li>
                  <li>Reusable video link for sharing</li>
                  <li>Opportunity to post on Rentit's official social media channels</li>
                </ul>
              </div>
              <div className={styles.addonAction}>
                <div className={styles.addonPrice}>₹2,000</div>
                {addedAddons.find(a => a.id === 'video') ? (
                  <button className={styles.plusBtn} onClick={() => handleRemoveAddon('video')} style={{ borderColor: '#EF4444', color: '#EF4444' }}>
                    <Minus size={18} strokeWidth={3} />
                  </button>
                ) : (
                  <button className={styles.plusBtn} onClick={() => setSelectedAddon('video')}>
                    <Plus size={18} strokeWidth={3} />
                  </button>
                )}
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.rightColumn}>
            <div className={styles.billingCard}>
              <div className={styles.billingTitle}>Billing Summary</div>
              
              <div className={styles.citySelect}>
                <div className={styles.citySelectInner}>
                  <MapPin size={16} color="#9CA3AF" /> Billing City
                </div>
                <div className={styles.citySelectInner}>
                  Chennai <ChevronDown size={16} color="#9CA3AF" />
                </div>
              </div>

              <div className={styles.lineItem}>
                <span>{currentPlan.title} Plan</span>
                <span className={styles.linePrice}>₹{basePrice.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.lineItem}>
                <span>Add-ons</span>
                <span className={styles.linePrice}>₹{addonTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className={styles.lineItem}>
                <span>GST 18%</span>
                <span className={styles.linePrice}>₹{gst.toLocaleString('en-IN')}</span>
              </div>

              <div className={styles.totalDivider}></div>

              <div className={styles.totalLine}>
                <span>Total Amount</span>
                <span className={styles.totalPrice}>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>

              <div className={styles.secureText}>
                <ShieldCheck size={14} /> Secure payment · SSL encrypted · 100% safe
              </div>

              <button className={styles.payBtn} onClick={handlePayment} disabled={isProcessing}>
                <Lock size={16} /> {isProcessing ? 'Processing...' : `Confirm & Pay ₹${totalAmount.toLocaleString('en-IN')}`}
              </button>

              <div className={styles.disclaimerText}>
                By confirming, you agree to Rentit's Terms of Service and<br/>Privacy Policy
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Modals */}
      {selectedAddon === 'video' && (
        <div className={styles.modalOverlay} onClick={() => setSelectedAddon(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>Configure AI Video</h2>
            <p className={styles.modalSubtitle}>Provide details so we can generate the best video for your property.</p>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Property Highlights (Max 3)</label>
              <textarea 
                className={styles.formTextarea} 
                placeholder="E.g., 1. Sea facing view 2. Fully furnished 3. Near IT Park"
              ></textarea>
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Reference Video Link (Optional)</label>
              <input type="url" className={styles.formInput} placeholder="https://youtube.com/..." />
            </div>
            
            <div className={styles.modalActions}>
              <button className={styles.cancelBtn} onClick={() => setSelectedAddon(null)}>Cancel</button>
              <button className={styles.saveBtn} onClick={() => handleAddAddon('video', 'AI Video', 2000)}>
                Save & Add to Order (₹2,000)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutInner />
    </Suspense>
  );
}
