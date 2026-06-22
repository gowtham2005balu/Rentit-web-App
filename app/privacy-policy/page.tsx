"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Info, AlertTriangle, ShieldCheck, Mail, Download, ArrowRight, Shield, Lock, Calendar, RefreshCw, Clock, HelpCircle, Cookie } from 'lucide-react';
import styles from './page.module.css';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('info-collect');

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
            <li><Link href="#info-collect" onClick={(e) => handleScroll(e, 'info-collect')} className={`${styles.navLink} ${activeSection === 'info-collect' ? styles.navLinkActive : ''}`}>Information We Collect</Link></li>
            <li><Link href="#how-we-use" onClick={(e) => handleScroll(e, 'how-we-use')} className={`${styles.navLink} ${activeSection === 'how-we-use' ? styles.navLinkActive : ''}`}>How We Use</Link></li>
            <li><Link href="#sharing-info" onClick={(e) => handleScroll(e, 'sharing-info')} className={`${styles.navLink} ${activeSection === 'sharing-info' ? styles.navLinkActive : ''}`}>Sharing Info</Link></li>
            <li><Link href="#data-retention" onClick={(e) => handleScroll(e, 'data-retention')} className={`${styles.navLink} ${activeSection === 'data-retention' ? styles.navLinkActive : ''}`}>Data Retention</Link></li>
            <li><Link href="#your-rights" onClick={(e) => handleScroll(e, 'your-rights')} className={`${styles.navLink} ${activeSection === 'your-rights' ? styles.navLinkActive : ''}`}>Your Rights</Link></li>
            <li><Link href="#cookies" onClick={(e) => handleScroll(e, 'cookies')} className={`${styles.navLink} ${activeSection === 'cookies' ? styles.navLinkActive : ''}`}>Cookies</Link></li>
            <li><Link href="#childrens-privacy" onClick={(e) => handleScroll(e, 'childrens-privacy')} className={`${styles.navLink} ${activeSection === 'childrens-privacy' ? styles.navLinkActive : ''}`}>Children's Privacy</Link></li>
            <li><Link href="#contact" onClick={(e) => handleScroll(e, 'contact')} className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}>Contact</Link></li>
          </ul>

          <div className={styles.sidebarMeta}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Effective Date</span>
              <span className={styles.metaValue}>1 June 2025</span>
            </div>
          </div>

        </nav>

        {/* MAIN CONTENT */}
        <main className={styles.mainContent}>
          
          <div className={styles.legalPill}>
            <Lock size={12} className={styles.lockIcon} /> LEGAL
          </div>

          <h1 className={styles.title}>
            Privacy
            <span>Policy</span>
          </h1>

          <p className={styles.subtitle}>
            Rentit Technologies Pvt. Ltd. ('Rentit', 'we', 'us', or 'our') is committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and share your data when you use the Rentit website or mobile application.
          </p>

          <div className={styles.versionRow}>
            <div className={styles.versionItem}>
              <Calendar size={14} /> Effective: 1 June 2025
            </div>
            <div className={styles.versionItem}>
              <Clock size={14} /> 5 min read
            </div>
          </div>

          <section id="info-collect">
            <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
            <h3 className={styles.subheading}>1.1 Information You Provide</h3>
            <ul className={styles.bulletList}>
              <li>Name, email address, and mobile number during registration.</li>
              <li>Profile photo and preferences.</li>
              <li>Listing details and photos if you are a landlord.</li>
              <li>Messages exchanged through our in-app communication system.</li>
            </ul>

            <h3 className={styles.subheading}>1.2 Information Collected Automatically</h3>
            <ul className={styles.bulletList}>
              <li>Device information (model, OS, browser type).</li>
              <li>IP address and approximate location.</li>
              <li>Pages visited, search queries, and time spent on the platform.</li>
              <li>Cookies and similar tracking technologies.</li>
            </ul>
          </section>

          <section id="how-we-use">
            <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>
            <ul className={styles.bulletList}>
              <li>To create and manage your Rentit account.</li>
              <li>To display and recommend relevant listings.</li>
              <li>To facilitate communication between renters and landlords.</li>
              <li>To verify listings and prevent fraud.</li>
              <li>To send service notifications, updates, and promotional offers (with your consent).</li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section id="sharing-info">
            <h2 className={styles.sectionTitle}>3. Sharing Your Information</h2>
            <p className={styles.paragraph}>
              We do not sell your personal data. We may share your information with:
            </p>
            <ul className={styles.bulletList}>
              <li><strong>Service Providers:</strong> Cloud hosting, analytics, and customer support vendors who process data on our behalf.</li>
              <li><strong>Legal Authorities:</strong> When required by law, court order, or government request.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets.</li>
            </ul>
          </section>

          <section id="data-retention">
            <h2 className={styles.sectionTitle}>4. Data Retention</h2>
            <p className={styles.paragraph}>
              We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and associated data at any time by contacting privacy@rentit.in.
            </p>
          </section>

          <section id="your-rights">
            <h2 className={styles.sectionTitle}>5. Your Rights</h2>
            <ul className={styles.bulletList}>
              <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
              <li><strong>Correction:</strong> Ask us to correct inaccurate data.</li>
              <li><strong>Deletion:</strong> Request that your data be erased.</li>
              <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications at any time.</li>
            </ul>
          </section>

          <section id="cookies">
            <h2 className={styles.sectionTitle}>6. Cookies</h2>
            <p className={styles.paragraph}>
              Rentit uses cookies to improve your experience, remember preferences, and analyse platform usage. You can manage cookie preferences in your browser settings. Disabling cookies may affect certain features.
            </p>
          </section>

          <section id="childrens-privacy">
            <h2 className={styles.sectionTitle}>7. Children's Privacy</h2>
            <p className={styles.paragraph}>
              Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If you believe a minor has provided us with their data, please contact privacy@rentit.in.
            </p>
          </section>

          <section id="contact">
            <h2 className={styles.sectionTitle}>8. Contact for Privacy Concerns</h2>
            <p className={styles.paragraph}>
              For any questions or requests related to this policy, please contact our Data Protection Officer at <strong>privacy@rentit.in</strong>.
            </p>
          </section>

        </main>

        {/* RIGHT SIDEBAR */}
        <aside className={styles.rightSidebar}>
          
          <div className={`${styles.card} ${styles.cardDark}`}>
            <h3 className={styles.cardTitle}>
              <HelpCircle size={18} className={styles.cardTitleIcon} /> Questions?
            </h3>
            <p className={styles.cardText}>
              Contact our privacy team for any questions about your data rights.
            </p>
            <Link href="mailto:privacy@rentit.in" className={styles.cardLink}>
              <Mail size={14} /> privacy@rentit.in
            </Link>
          </div>

          <div className={`${styles.card} ${styles.cardWhite}`}>
            <h3 className={styles.cardTitle}>
              <Download size={18} className={styles.cardTitleIcon} /> Download My Data
            </h3>
            <p className={styles.cardText}>
              Export all your personal data in a portable format.
            </p>
            <Link href="#" className={styles.cardLink}>
              Request export <ArrowRight size={14} />
            </Link>
          </div>

          <div className={`${styles.card} ${styles.cardWhite}`}>
            <h3 className={styles.cardTitle}>
              <Shield size={18} className={styles.cardTitleIcon} /> Related Policies
            </h3>
            <ul className={styles.relatedList}>
              <li>
                <Link href="/terms-of-service">Terms of Service <ArrowRight size={14} /></Link>
              </li>
              <li>
                <Link href="/cookie-policy">Cookie Policy <ArrowRight size={14} /></Link>
              </li>
              <li>
                <Link href="#">Community Guidelines <ArrowRight size={14} /></Link>
              </li>
            </ul>
          </div>

        </aside>

      </div>
    </div>
    </>
  );
}
