import React from 'react';
import { Headphones, PhoneCall, Lightbulb, ArrowRight } from 'lucide-react';
import styles from './HelpSupport.module.css';

const supportItems = [
  {
    id: 1,
    icon: <Headphones size={24} />,
    title: 'Talk to an Expert',
    description: 'Get personalized guidance from our trained rental experts — free of charge, available 7 days a week.',
    action: 'Connect now'
  },
  {
    id: 2,
    icon: <PhoneCall size={24} />,
    title: 'Call Support',
    description: 'Reach our support line for urgent issues with listings, payments, or disputes — 9am to 9pm, Mon–Sat.',
    action: '1800-123-RENTIT'
  },
  {
    id: 3,
    icon: <Lightbulb size={24} />,
    title: 'FAQ Center',
    description: 'Find instant answers to common questions about listings, deposits, agreements, and more.',
    action: 'Browse FAQs'
  }
];

export default function HelpSupport() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Help & Support</h2>
          <p className={styles.subtitle}>We're here to guide you at every step of your rental journey</p>
        </div>

        <div className={styles.gridContainer}>
          {supportItems.map(item => (
            <div key={item.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <a href="/help" className={styles.cardLink}>
                {item.action} <ArrowRight size={14} strokeWidth={2.5} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
