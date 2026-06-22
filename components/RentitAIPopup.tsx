import React from 'react';
import { X, Sparkles, Home, Bed, Briefcase, Lock, CheckCircle, Mic, Send, Award } from 'lucide-react';
import styles from './RentitAIPopup.module.css';

interface RentitAIPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const RentitAIPopup: React.FC<RentitAIPopupProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupContainer}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div className={styles.titleWrapper}>
            <Sparkles size={18} className={styles.titleIcon} strokeWidth={2.5} />
            <h3 className={styles.title}>Rentit AI Assistant</h3>
          </div>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>
        <p className={styles.subtitle}>Find properties by simply describing what you need.</p>
        <div className={styles.statusWrapper}>
          <div className={styles.statusDot}></div>
          <span>AI is ready &middot; Powered by Rentit Intelligence</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className={styles.chatArea}>
        {/* Welcome Message */}
        <div className={styles.messageRow}>
          <div className={styles.avatar}>
            <Sparkles size={16} strokeWidth={2.5} />
          </div>
          <div className={styles.messageBubble}>
            Hi! I'm your Rentit AI Assistant 👋<br/>
            Tell me what kind of property you're looking for and I'll find the best matches for you instantly.
          </div>
        </div>

        {/* Examples Section */}
        <div className={styles.examplesSection}>
          <h4 className={styles.examplesTitle}>Try these examples</h4>
          <button className={styles.chip}>
            <Home size={14} className={styles.chipIcon} />
            Need a 2 BHK under ₹20k
          </button>
          <button className={styles.chip}>
            <Bed size={14} className={styles.chipIcon} />
            Girls PG with food in Chennai
          </button>
          <button className={styles.chip}>
            <Briefcase size={14} className={styles.chipIcon} />
            Office space near metro
          </button>
          <button className={styles.chip}>
            <Home size={14} className={styles.chipIcon} />
            Commercial with parking
          </button>
        </div>

        {/* Second Message */}
        <div className={styles.messageRow}>
          <div className={styles.avatar}>
            <Sparkles size={16} strokeWidth={2.5} />
          </div>
          <div className={styles.messageBubble}>
            I can understand natural language. Just type what you're looking for and I'll extract filters automatically!
          </div>
        </div>

        {/* Premium Card */}
        <div className={styles.premiumCard}>
          <div className={styles.premiumHeader}>
            <Award size={16} />
            Premium Filters Detected
          </div>
          <div className={styles.premiumBody}>
            <p className={styles.premiumText}>
              Some of your requirements use <span className={styles.bold}>Premium Filters</span>. Unlock advanced matching to see all relevant properties.
            </p>
            <div className={styles.filtersGrid}>
              <span className={`${styles.filterBadge} ${styles.filterBadgeLocked}`}>
                <Lock size={12} className={styles.badgeIcon} /> Reserved Parking
              </span>
              <span className={`${styles.filterBadge} ${styles.filterBadgeLocked}`}>
                <Lock size={12} className={styles.badgeIcon} /> Business Park
              </span>
              <span className={`${styles.filterBadge} ${styles.filterBadgeLocked}`}>
                <Lock size={12} className={styles.badgeIcon} /> Premium Amenities
              </span>
              <span className={`${styles.filterBadge} ${styles.filterBadgeUnlocked}`}>
                <CheckCircle size={12} /> OMR Location
              </span>
              <span className={`${styles.filterBadge} ${styles.filterBadgeUnlocked}`}>
                <CheckCircle size={12} /> Furnished
              </span>
              <span className={`${styles.filterBadge} ${styles.filterBadgeUnlocked}`}>
                <CheckCircle size={12} /> Office Space
              </span>
            </div>
            <button className={styles.premiumBtn}>View Premium Plans</button>
          </div>
        </div>

        {/* Analyzing Loader */}
        <div className={styles.analyzingWrapper}>
          <div className={styles.dots}>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
            <div className={styles.dot}></div>
          </div>
          <span className={styles.analyzingText}>AI is analyzing your requirements...</span>
        </div>
      </div>

      {/* Footer / Input */}
      <div className={styles.footer}>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            className={styles.input} 
            placeholder="Describe your ideal property..." 
          />
          <button className={styles.micBtn} aria-label="Voice input">
            <Mic size={18} />
          </button>
          <button className={styles.sendBtn} aria-label="Send message">
            <Send size={14} />
          </button>
        </div>
        <div className={styles.footerBrand}>
          Rentit AI &middot; Powered by property intelligence
        </div>
      </div>
    </div>
  );
};

export default RentitAIPopup;
