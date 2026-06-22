"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import styles from './ListPropertyBanner.module.css';

export default function ListPropertyBanner() {
  const { isAuthenticated, openAuthModal } = useAuth();
  
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.banner}>
          <div className={styles.leftCol}>
            <h2 className={styles.title}>
              List Your Property on Rentit
            </h2>
            <p className={styles.subtitle}>
              Reach 50,000+ verified tenants actively searching in Chennai.<br />
              Get quality leads fast — completely free to post.
            </p>
          </div>
          <div className={styles.rightCol}>
            {isAuthenticated ? (
              <Link href="/add-property">
                <button className={styles.ctaBtn}>
                  List Your Property Free
                </button>
              </Link>
            ) : (
              <button 
                className={styles.ctaBtn} 
                onClick={(e) => { e.preventDefault(); openAuthModal(); }}
              >
                List Your Property Free
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
