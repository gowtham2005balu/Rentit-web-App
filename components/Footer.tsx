import React from 'react';
import { Smartphone, Play } from 'lucide-react';
import styles from './Footer.module.css';

const TwitterIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 22.95H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const productLinks = [
  { name: 'Apartments', href: '/apartments' },
  { name: 'PG / Hostel', href: '/pg' },
  { name: 'Flatmates', href: '/flatmate' },
  { name: 'Commercial', href: '/commercial' }
];

const companyLinks: Array<{ name: string; href: string; isHighlight?: boolean }> = [
  { name: 'Home', href: '/rentit' },
  { name: 'About Rentit', href: '/about' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' }
];

const resourcesLinks = [
  { name: 'Help Center', href: '/help' },
  { name: 'Contact Us', href: '#' }
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
  { name: 'Cookie Policy', href: '/cookie-policy' }
];

export default function Footer() {
  return (
    <footer className={styles.footerWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.topSection}>
          
          {/* Logo & Description */}
          <div className={styles.logoCol}>
            <h2 className={styles.logo} aria-label="RentIt – Chennai Rental Marketplace logo">RENT<span>IT</span></h2>
            <p className={styles.logoDesc}>
              Find spaces. Faster. The AI-powered rental platform connecting tenants directly with property owners across India.
            </p>
            
            <div className={styles.socialRow}>
              <a href="https://x.com/myrent_itapp" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="RentIt on Twitter">
                <TwitterIcon size={16} />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61590289396258" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="RentIt on Facebook">
                <FacebookIcon size={16} />
              </a>
              <a href="https://www.linkedin.com/company/rentit-app/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="RentIt on LinkedIn">
                <LinkedinIcon size={16} />
              </a>
              <a href="https://www.instagram.com/rent_itapp?igsh=YmNrb2R1MzJna255&utm_source=qr" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="RentIt on Instagram">
                <InstagramIcon size={16} />
              </a>
            </div>
            
            <div className={styles.appButtons}>

              <a href="https://play.google.com/store/apps/details?id=com.zuntra.rentit" target="_blank" rel="noopener noreferrer" className={styles.appBtn} aria-label="Download RentIt app on Google Play Store">
                <Play size={16} color="#E5E7EB" fill="#E5E7EB" />
                <div className={styles.appBtnText}>
                  <span className={styles.appBtnSub}>Get it on</span>
                  <span className={styles.appBtnTitle}>Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* PRODUCT */}
          <div className={styles.linkCol}>
            <h3 className={styles.linkColTitle}>PRODUCT</h3>
            {productLinks.map((item, idx) => (
              <a key={idx} href={item.href} className={styles.linkItem}>{item.name}</a>
            ))}
          </div>

          {/* COMPANY */}
          <div className={styles.linkCol}>
            <h3 className={styles.linkColTitle}>COMPANY</h3>
            {companyLinks.map((item, idx) => (
              <a 
                key={idx} 
                href={item.href} 
                className={`${styles.linkItem} ${item.isHighlight ? styles.highlightLink : ''}`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* RESOURCES */}
          <div className={styles.linkCol}>
            <h3 className={styles.linkColTitle}>RESOURCES</h3>
            {resourcesLinks.map((item, idx) => (
              <a key={idx} href={item.href} className={styles.linkItem}>{item.name}</a>
            ))}
          </div>

          {/* LEGAL */}
          <div className={styles.linkCol}>
            <h3 className={styles.linkColTitle}>LEGAL</h3>
            {legalLinks.map((item, idx) => (
              <a key={idx} href={item.href} className={styles.linkItem}>{item.name}</a>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <div className={styles.copyright}>
            © 2026 Rentit Technologies Pvt. Ltd. - Find Spaces. Faster.
          </div>
          <div className={styles.bottomLinks}>
            <a href="/privacy-policy" className={styles.bottomLinkItem}>Privacy</a>
            <a href="/terms-of-service" className={styles.bottomLinkItem}>Terms</a>
            <a href="/cookie-policy" className={styles.bottomLinkItem}>Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
