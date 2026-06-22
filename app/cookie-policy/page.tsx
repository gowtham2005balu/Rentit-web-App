"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Info, AlertTriangle, ShieldCheck, Mail, ArrowRight, Settings, Clock, RefreshCw, Cookie, Save } from 'lucide-react';
import styles from './page.module.css';
import Footer from '@/components/Footer';

export default function CookiePolicy() {
  const [activeSection, setActiveSection] = useState('what-are-cookies');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['what-are-cookies', 'preference-center', 'manage-preferences'];
      
      let current = '';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Left Sidebar */}
          <aside className={styles.leftSidebar}>
            <div className={styles.sidebarTitle}>On This Page</div>
            <nav>
              <ul className={styles.navList}>
                <li>
                  <a 
                    href="#what-are-cookies" 
                    className={activeSection === 'what-are-cookies' ? styles.navLinkActive : styles.navLink}
                    onClick={(e) => scrollToSection(e, 'what-are-cookies')}
                  >
                    What Are Cookies
                  </a>
                </li>
                <li>
                  <a 
                    href="#preference-center" 
                    className={activeSection === 'preference-center' ? styles.navLinkActive : styles.navLink}
                    onClick={(e) => scrollToSection(e, 'preference-center')}
                  >
                    Cookie Preference Center
                  </a>
                </li>
                <li>
                  <a 
                    href="#manage-preferences" 
                    className={activeSection === 'manage-preferences' ? styles.navLinkActive : styles.navLink}
                    onClick={(e) => scrollToSection(e, 'manage-preferences')}
                  >
                    Manage Preferences
                  </a>
                </li>
              </ul>
              
              <div className={styles.sidebarMeta}>
                <div className={styles.metaItem}>
                  <span className={styles.metaLabel}>Updated:</span>
                  <span className={styles.metaValue}>1 June 2025</span>
                </div>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className={styles.mainContent}>
            <div className={styles.legalPill}>
              <ShieldCheck size={14} className={styles.lockIcon} /> LEGAL
            </div>
            
            <h1 className={styles.title}>
              Cookie
              <span>Policy</span>
            </h1>

            <p className={styles.subtitle}>
              We use cookies to improve your experience on Rentit. This page explains what cookies we use and how you can control them.
            </p>

            <div className={styles.versionRow}>
              <div className={styles.versionItem}>
                <RefreshCw size={14} /> Updated: 1 June 2025
              </div>
              <div className={styles.versionItem}>
                <Clock size={14} /> 6 min read
              </div>
            </div>

            <div className={`${styles.callout} ${styles.calloutDark}`}>
              <Cookie size={24} className={styles.calloutDarkIcon} />
              <div className={styles.calloutDarkContent}>
                <h3 className={styles.calloutDarkTitle}>Cookie Preferences</h3>
                <p className={styles.calloutDarkText}>
                  We use cookies to improve your experience. Manage your preferences below.
                </p>
              </div>
              <div className={styles.calloutDarkActions}>
                <button className={styles.btnOutline}>Reject All</button>
                <button className={styles.btnOutline}>Customize</button>
                <button className={styles.btnSolid}>Accept All</button>
              </div>
            </div>

            <section id="what-are-cookies">
              <h2 className={styles.sectionTitle}>What Are Cookies?</h2>
              <p className={styles.paragraph}>
                Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently, provide functionality, and give website operators information about how the site is being used.
              </p>
            </section>

            <section id="preference-center">
              <h2 className={styles.sectionTitle}>Cookie Preference Center</h2>
              <p className={styles.paragraph}>
                Manage your cookie preferences below. Essential cookies cannot be disabled as they are required for the platform to function correctly.
              </p>

              {/* Essential Cookies */}
              <div className={styles.preferenceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleWrap}>
                    <h3 className={styles.cardTitle}>Essential Cookies</h3>
                    <span className={styles.badgeRequired}>REQUIRED</span>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" checked readOnly disabled />
                    <span className={`${styles.slider} ${styles.sliderDisabled}`}></span>
                  </label>
                </div>
                <p className={styles.cardDesc}>
                  Necessary for core platform functionality including authentication, security, and session management. These cannot be disabled.
                </p>
                <div className={styles.tableWrapper}>
                  <table className={styles.policyTable}>
                    <thead>
                      <tr>
                        <th className={styles.nameCol}>NAME</th>
                        <th className={styles.purposeCol}>PURPOSE</th>
                        <th className={styles.durationCol}>DURATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.nameCol}>rentit_session</td>
                        <td>Maintains user authentication state</td>
                        <td>Session</td>
                      </tr>
                      <tr>
                        <td className={styles.nameCol}>rentit_csrf</td>
                        <td>Prevents cross-site request forgery</td>
                        <td>Session</td>
                      </tr>
                      <tr>
                        <td className={styles.nameCol}>rentit_lang</td>
                        <td>Stores your language preference</td>
                        <td>1 year</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className={styles.preferenceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleWrap}>
                    <h3 className={styles.cardTitle}>Analytics Cookies</h3>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p className={styles.cardDesc}>
                  Help us understand how visitors interact with Rentit by collecting anonymized data. Used to improve platform performance and user experience.
                </p>
                <div className={styles.tableWrapper}>
                  <table className={styles.policyTable}>
                    <thead>
                      <tr>
                        <th className={styles.nameCol}>PROVIDER</th>
                        <th className={styles.purposeCol}>PURPOSE</th>
                        <th className={styles.durationCol}>DURATION</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className={styles.nameCol}>Google Analytics</td>
                        <td>Page views, sessions, user journeys</td>
                        <td>13 months</td>
                      </tr>
                      <tr>
                        <td className={styles.nameCol}>Hotjar</td>
                        <td>Heatmaps and session recordings</td>
                        <td>12 months</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className={styles.preferenceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleWrap}>
                    <h3 className={styles.cardTitle}>Marketing Cookies</h3>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p className={styles.cardDesc}>
                  Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns across the web.
                </p>
              </div>

              {/* Third-party Cookies */}
              <div className={styles.preferenceCard}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardTitleWrap}>
                    <h3 className={styles.cardTitle}>Third-party Cookies</h3>
                  </div>
                  <label className={styles.toggle}>
                    <input type="checkbox" defaultChecked />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <p className={styles.cardDesc}>
                  Set by our trusted partners for social media integration, support chat, and enhanced functionality features.
                </p>
              </div>

              <div className={styles.actionsRow}>
                <button className={styles.btnDark}>
                  <Save size={16} /> Save Preferences
                </button>
                <button className={styles.btnLightOutline}>
                  Reject All Optional
                </button>
              </div>
            </section>

            <section id="manage-preferences">
              <h2 className={styles.sectionTitle}>Manage Preferences</h2>
              <p className={styles.paragraph}>
                You can change your cookie preferences at any time by clicking the cookie settings button in the bottom-right corner of any Rentit page. You may also manage cookies through your browser settings.
              </p>

              <div className={`${styles.callout} ${styles.calloutBlue}`}>
                <Info size={20} className={styles.calloutIcon} />
                <p className={styles.calloutText}>
                  Disabling certain cookies may affect the functionality of the Rentit platform, including property search, saved searches, and personalized recommendations.
                </p>
              </div>
            </section>

          </main>

          {/* Right Sidebar */}
          <aside className={styles.rightSidebar}>
            <div className={`${styles.card} ${styles.cardDark}`}>
              <h3 className={styles.cardTitle}>
                <Settings size={18} className={styles.cardTitleIcon} /> Cookie Settings
              </h3>
              <p className={styles.cardText}>
                You can update your cookie preferences at any time.
              </p>
              <a href="#preference-center" className={styles.cardLink}>
                <RefreshCw size={14} /> Open Preferences
              </a>
            </div>

            <div className={`${styles.card} ${styles.cardWhite}`}>
              <h3 className={styles.cardTitle}>
                <Info size={18} className={styles.cardTitleIcon} /> Cookie Questions
              </h3>
              <p className={styles.cardText}>
                For questions about our use of cookies, contact our privacy team.
              </p>
              <a href="mailto:privacy@rentit.in" className={styles.cardLink}>
                privacy@rentit.in <ArrowRight size={14} />
              </a>
            </div>
          </aside>

        </div>
      </div>
    </>
  );
}
