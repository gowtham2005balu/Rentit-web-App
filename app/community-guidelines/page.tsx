"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, AlertTriangle, ShieldCheck, Mail, ArrowRight, Shield, 
  Lock, Calendar, Clock, HelpCircle, Heart, User, CheckCircle2, 
  MessageSquare, Home, UserCheck, ShieldAlert, XCircle, CheckCircle 
} from 'lucide-react';
import styles from './page.module.css';
import Footer from '@/components/Footer';

export default function CommunityGuidelines() {
  const [activeSection, setActiveSection] = useState('respectful-behavior');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    const targets = document.querySelectorAll('section[id], p[id]');
    targets.forEach((target) => {
      observer.observe(target);
    });

    return () => observer.disconnect();
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', `#${id}`);
      setActiveSection(id);
    }
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          
          {/* LEFT SIDEBAR */}
          <nav className={styles.leftSidebar}>
            <ul className={styles.navList}>
              <li><Link href="#respectful-behavior" onClick={(e) => handleScroll(e, 'respectful-behavior')} className={`${styles.navLink} ${activeSection === 'respectful-behavior' ? styles.navLinkActive : ''}`}>Respectful Behavior</Link></li>
              <li><Link href="#honest-listings" onClick={(e) => handleScroll(e, 'honest-listings')} className={`${styles.navLink} ${activeSection === 'honest-listings' ? styles.navLinkActive : ''}`}>Honest Listings</Link></li>
              <li><Link href="#communication-rules" onClick={(e) => handleScroll(e, 'communication-rules')} className={`${styles.navLink} ${activeSection === 'communication-rules' ? styles.navLinkActive : ''}`}>Communication Rules</Link></li>
              <li><Link href="#host-responsibilities" onClick={(e) => handleScroll(e, 'host-responsibilities')} className={`${styles.navLink} ${activeSection === 'host-responsibilities' ? styles.navLinkActive : ''}`}>Host Responsibilities</Link></li>
              <li><Link href="#guest-responsibilities" onClick={(e) => handleScroll(e, 'guest-responsibilities')} className={`${styles.navLink} ${activeSection === 'guest-responsibilities' ? styles.navLinkActive : ''}`}>Guest Responsibilities</Link></li>
              <li><Link href="#fraud-prevention" onClick={(e) => handleScroll(e, 'fraud-prevention')} className={`${styles.navLink} ${activeSection === 'fraud-prevention' ? styles.navLinkActive : ''}`}>Fraud Prevention</Link></li>
              <li><Link href="#platform-integrity" onClick={(e) => handleScroll(e, 'platform-integrity')} className={`${styles.navLink} ${activeSection === 'platform-integrity' ? styles.navLinkActive : ''}`}>Platform Integrity</Link></li>
              <li><Link href="#violations" onClick={(e) => handleScroll(e, 'violations')} className={`${styles.navLink} ${activeSection === 'violations' ? styles.navLinkActive : ''}`}>Violations & Enforcement</Link></li>
            </ul>

            <div className={styles.sidebarMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Updated:</span>
                <span className={styles.metaValue}>1 June 2025</span>
              </div>
            </div>
          </nav>

          {/* MAIN CONTENT */}
          <main className={styles.mainContent}>
            
            <div className={styles.legalPill}>
              <Users size={12} className={styles.lockIcon} /> COMMUNITY
            </div>

            <h1 className={styles.title}>
              Community
              <span>Guidelines</span>
            </h1>

            <p className={styles.subtitle}>
              Rentit is built on trust. These guidelines help ensure every interaction on our platform is respectful, honest, and safe for everyone.
            </p>

            <div className={styles.versionRow}>
              <div className={styles.versionItem}>
                <Calendar size={14} /> Updated: 1 June 2025
              </div>
              <div className={styles.versionItem}>
                <Clock size={14} /> 8 min read
              </div>
            </div>

            <div className={styles.calloutGreen}>
              <Heart size={20} className={styles.calloutIcon} />
              <p className={styles.calloutText}>
                We believe in creating a community where property owners and seekers treat each other with dignity and respect. These guidelines are not just rules — they are the foundation of everything we build.
              </p>
            </div>

            <section id="respectful-behavior" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <User size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Respectful Behavior</h2>
              </div>
              <p className={styles.paragraph}>
                Every user — whether a property seeker or owner — deserves to be treated with respect. Discrimination of any form is not tolerated on Rentit.
              </p>

              <div className={styles.rulesGrid}>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Communicate politely and professionally at all times</span>
                </div>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Respond to enquiries within a reasonable timeframe</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Discriminate based on religion, caste, gender, or nationality</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Use abusive, threatening, or offensive language</span>
                </div>
              </div>
            </section>

            <section id="honest-listings" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <ShieldCheck size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Honest Listings</h2>
              </div>
              <p className={styles.paragraph}>
                Property listings must accurately represent the property. Misleading content damages trust and will result in listing removal.
              </p>

              <div className={styles.rulesGrid}>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Use accurate, recent photos of the actual property</span>
                </div>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>List all inclusive costs and mandatory charges upfront</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Provide false information about amenities, size, or location</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Withhold information about significant property defects</span>
                </div>
              </div>
            </section>

            <section id="communication-rules" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <MessageSquare size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Communication Rules</h2>
              </div>
              <p className={styles.paragraph}>
                Clear and honest communication prevents misunderstandings and builds a safer community.
              </p>

              <div className={styles.rulesGrid}>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Use Rentit's built-in messaging for initial communication</span>
                </div>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Be transparent about your requirements and expectations</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Share sensitive personal information prematurely</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Harass or spam other users with repetitive messages</span>
                </div>
              </div>
            </section>

            <section id="host-responsibilities" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <Home size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Host Responsibilities</h2>
              </div>
              <p className={styles.paragraph}>
                Hosts are expected to provide a safe, clean, and reliable living environment for their tenants.
              </p>

              <div className={styles.rulesGrid}>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Ensure the property is well-maintained and habitable</span>
                </div>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Respect the tenant's privacy and provide notice before visits</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Cancel confirmed bookings without a valid reason</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Demand payments outside of the agreed procedures</span>
                </div>
              </div>
            </section>

            <section id="guest-responsibilities" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <UserCheck size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Guest Responsibilities</h2>
              </div>
              <p className={styles.paragraph}>
                Guests must treat the property and neighbors with respect, treating the space as their own.
              </p>

              <div className={styles.rulesGrid}>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Follow the agreed-upon house rules and lease terms</span>
                </div>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Report any damages or maintenance issues promptly</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Sublet the property without explicit permission</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Engage in illegal activities or cause disturbances</span>
                </div>
              </div>
            </section>

            <section id="fraud-prevention" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <ShieldAlert size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Fraud Prevention</h2>
              </div>
              <p className={styles.paragraph}>
                We actively monitor the platform for suspicious activities to protect our users.
              </p>

              <div className={styles.rulesGrid}>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Verify listings and users whenever possible</span>
                </div>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Report suspicious behavior to our support team</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Request wire transfers or cryptocurrency payments</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Create fake accounts or listings</span>
                </div>
              </div>
            </section>

            <section id="platform-integrity" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <Shield size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Platform Integrity</h2>
              </div>
              <p className={styles.paragraph}>
                Do not attempt to manipulate or bypass Rentit's systems and policies.
              </p>

              <div className={styles.rulesGrid}>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Provide accurate identification when requested</span>
                </div>
                <div className={styles.ruleCardGreen}>
                  <CheckCircle size={16} className={styles.ruleIconGreen} />
                  <span>Respect intellectual property rights</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Scrape data or use bots on the platform</span>
                </div>
                <div className={styles.ruleCardRed}>
                  <XCircle size={16} className={styles.ruleIconRed} />
                  <span>Attempt to bypass the platform's payment systems</span>
                </div>
              </div>
            </section>

            <section id="violations" className={styles.guidelineSection}>
              <div className={styles.sectionHeader}>
                <div className={styles.iconContainer}>
                  <AlertTriangle size={20} />
                </div>
                <h2 className={styles.sectionTitle}>Violations & Enforcement</h2>
              </div>
              <p className={styles.paragraph}>
                We take our Community Guidelines seriously. Violations may result in:
              </p>
              
              <ul className={styles.bulletList}>
                <li><span className={styles.bulletItem}>Warnings and educational messages</span></li>
                <li><span className={styles.bulletItem}>Temporary suspension of your account</span></li>
                <li><span className={styles.bulletItem}>Removal of listings or content</span></li>
                <li><span className={styles.bulletItem}>Permanent ban from the platform</span></li>
                <li><span className={styles.bulletItem}>Reporting to law enforcement authorities in severe cases</span></li>
              </ul>
              <p className={styles.paragraph} style={{marginTop: '16px'}}>
                If you believe another user is violating these guidelines, please report them using the in-app reporting tools or by contacting support.
              </p>
            </section>

          </main>
        </div>
      </div>
    </>
  );
}
