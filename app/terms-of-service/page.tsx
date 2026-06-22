"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Info, AlertTriangle, ShieldCheck, Mail, ArrowRight, Shield, Lock, Calendar, RefreshCw, Clock, Ban, Scale } from 'lucide-react';
import styles from './page.module.css';
import Footer from '@/components/Footer';

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('about-rentit');

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
              <li><Link href="#about-rentit" onClick={(e) => handleScroll(e, 'about-rentit')} className={`${styles.navLink} ${activeSection === 'about-rentit' ? styles.navLinkActive : ''}`}>About Rentit</Link></li>
              <li><Link href="#eligibility" onClick={(e) => handleScroll(e, 'eligibility')} className={`${styles.navLink} ${activeSection === 'eligibility' ? styles.navLinkActive : ''}`}>Eligibility</Link></li>
              <li><Link href="#user-conduct" onClick={(e) => handleScroll(e, 'user-conduct')} className={`${styles.navLink} ${activeSection === 'user-conduct' ? styles.navLinkActive : ''}`}>User Conduct</Link></li>
              <li><Link href="#listings-content" onClick={(e) => handleScroll(e, 'listings-content')} className={`${styles.navLink} ${activeSection === 'listings-content' ? styles.navLinkActive : ''}`}>Listings & Content</Link></li>
              <li><Link href="#payments" onClick={(e) => handleScroll(e, 'payments')} className={`${styles.navLink} ${activeSection === 'payments' ? styles.navLinkActive : ''}`}>Payments & Transactions</Link></li>
              <li><Link href="#disclaimers" onClick={(e) => handleScroll(e, 'disclaimers')} className={`${styles.navLink} ${activeSection === 'disclaimers' ? styles.navLinkActive : ''}`}>Disclaimers & Liability</Link></li>
              <li><Link href="#intellectual-property" onClick={(e) => handleScroll(e, 'intellectual-property')} className={`${styles.navLink} ${activeSection === 'intellectual-property' ? styles.navLinkActive : ''}`}>Intellectual Property</Link></li>
              <li><Link href="#termination" onClick={(e) => handleScroll(e, 'termination')} className={`${styles.navLink} ${activeSection === 'termination' ? styles.navLinkActive : ''}`}>Termination</Link></li>
              <li><Link href="#governing-law" onClick={(e) => handleScroll(e, 'governing-law')} className={`${styles.navLink} ${activeSection === 'governing-law' ? styles.navLinkActive : ''}`}>Governing Law</Link></li>
              <li><Link href="#contact" onClick={(e) => handleScroll(e, 'contact')} className={`${styles.navLink} ${activeSection === 'contact' ? styles.navLinkActive : ''}`}>Contact Us</Link></li>
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
              Terms of
              <span>Service</span>
            </h1>

            <p className={styles.subtitle}>
              By accessing or using the Rentit platform (website or mobile application), you agree to be bound by these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <div className={styles.versionRow}>
              <div className={styles.versionItem}>
                <Calendar size={14} /> Effective: 1 June 2025
              </div>
              <div className={styles.versionItem}>
                <Clock size={14} /> 8 min read
              </div>
            </div>

            <section id="about-rentit">
              <h2 className={styles.sectionTitle}>1. About Rentit</h2>
              <p className={styles.paragraph}>
                Rentit is an online listing platform that connects individuals looking to rent residential properties (apartments, studios, PGs, and shared rooms) with landlords and property owners. Rentit is not a party to any rental transaction and does not act as a landlord, agent, or property manager.
              </p>
            </section>

            <section id="eligibility">
              <h2 className={styles.sectionTitle}>2. Eligibility</h2>
              <ul className={styles.bulletList}>
                <li>You must be at least 18 years of age to create an account.</li>
                <li>You must provide accurate and truthful information during registration.</li>
                <li>You are responsible for maintaining the security of your account credentials.</li>
              </ul>
            </section>

            <section id="user-conduct">
              <h2 className={styles.sectionTitle}>3. User Conduct</h2>
              <p className={styles.paragraph}>
                By using Rentit, you agree NOT to:
              </p>
              <ul className={styles.bulletList}>
                <li>Post false, misleading, or duplicate listings.</li>
                <li>Use the platform for any unlawful purpose.</li>
                <li>Harass, threaten, or intimidate other users.</li>
                <li>Attempt to hack, scrape, or reverse-engineer the platform.</li>
                <li>Collect other users' personal data without their consent.</li>
                <li>Post content that is discriminatory, obscene, or defamatory.</li>
              </ul>
            </section>

            <section id="listings-content">
              <h2 className={styles.sectionTitle}>4. Listings & Content</h2>
              <ul className={styles.bulletList}>
                <li>Landlords are solely responsible for the accuracy of their listings.</li>
                <li>Rentit reserves the right to remove any listing that violates our guidelines without notice.</li>
                <li>By posting a listing, you grant Rentit a non-exclusive, royalty-free licence to display it on the platform.</li>
                <li>Rentit does not guarantee the availability, accuracy, or safety of any listing.</li>
              </ul>
            </section>

            <section id="payments">
              <h2 className={styles.sectionTitle}>5. Payments & Transactions</h2>
              <p className={styles.paragraph}>
                Rentit does not facilitate, process, or guarantee any rental payments, security deposits, or financial transactions. Any agreements, payments, or disputes between renters and landlords are entirely between those parties. Rentit shall not be held liable for any financial loss arising from transactions conducted outside our platform.
              </p>
            </section>

            <section id="disclaimers">
              <h2 className={styles.sectionTitle}>6. Disclaimers & Limitation of Liability</h2>
              <p className={styles.paragraph}>
                The Rentit platform is provided on an 'as is' and 'as available' basis. We make no warranties, express or implied, regarding the platform's reliability, accuracy, or fitness for a particular purpose. To the fullest extent permitted by law, Rentit shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.
              </p>
            </section>

            <section id="intellectual-property">
              <h2 className={styles.sectionTitle}>7. Intellectual Property</h2>
              <p className={styles.paragraph}>
                All content on the Rentit platform — including logos, design, text, and software — is owned by Rentit Technologies Pvt. Ltd. and protected by applicable intellectual property laws. You may not reproduce or distribute any content without our prior written consent.
              </p>
            </section>

            <section id="termination">
              <h2 className={styles.sectionTitle}>8. Termination</h2>
              <p className={styles.paragraph}>
                Rentit reserves the right to suspend or terminate your account at any time for violations of these Terms or for any conduct we consider harmful to our community. You may also delete your account at any time through the app settings.
              </p>
            </section>

            <section id="governing-law">
              <h2 className={styles.sectionTitle}>9. Governing Law</h2>
              <p className={styles.paragraph}>
                These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Bengaluru, Karnataka.
              </p>
            </section>

            <section id="contact">
              <h2 className={styles.sectionTitle}>10. Contact Us</h2>
              <p className={styles.paragraph}>
                For questions about these Terms, please write to us at <strong>legal@rentit.in</strong>.
              </p>
            </section>

          </main>

          {/* RIGHT SIDEBAR */}
          <aside className={styles.rightSidebar}>
            
            <div className={`${styles.card} ${styles.cardDark}`}>
              <h3 className={styles.cardTitle}>
                <Scale size={18} className={styles.cardTitleIcon} /> Legal Queries
              </h3>
              <p className={styles.cardText}>
                For legal and compliance questions, contact our legal team.
              </p>
              <Link href="mailto:legal@rentit.in" className={styles.cardLink}>
                <Mail size={14} /> legal@rentit.in
              </Link>
            </div>

            <div className={`${styles.card} ${styles.cardWhite}`}>
              <h3 className={styles.cardTitle}>
                <Shield size={18} className={styles.cardTitleIcon} /> Related Docs
              </h3>
              <ul className={styles.relatedList}>
                <li>
                  <Link href="/privacy-policy">Privacy Policy <ArrowRight size={14} /></Link>
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
