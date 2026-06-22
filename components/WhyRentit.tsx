import React from 'react';
import { ShieldCheck, Ban, PhoneCall, CalendarCheck } from 'lucide-react';
import styles from './WhyRentit.module.css';

const features = [
  {
    id: 1,
    icon: <ShieldCheck size={22} />,
    title: '100% Verified',
    description: 'Every listing is manually verified by our ground team — no fake listings, guaranteed.'
  },
  {
    id: 2,
    icon: <Ban size={22} />,
    title: 'No Brokerage',
    description: 'Connect directly with property owners. Save one month\'s rent on every move.'
  },
  {
    id: 3,
    icon: <PhoneCall size={22} />,
    title: 'Direct Owner Contact',
    description: 'No middlemen. Talk to property owners directly via call, chat, or video tour.'
  },
  {
    id: 4,
    icon: <CalendarCheck size={22} />,
    title: 'Easy Booking',
    description: 'Book a visit, sign agreements and pay rent — all from your phone in under 10 minutes.'
  }
];

export default function WhyRentit() {
  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.innerContainer}>
        <div className={styles.header}>
          <h2 className={styles.title}>Why Rentit?</h2>
          <p className={styles.subtitle}>Built for Chennai's renters — designed for trust and simplicity</p>
        </div>

        <div className={styles.gridContainer}>
          {features.map(feature => (
            <div key={feature.id} className={styles.card}>
              {/* I am standardizing the order to Icon -> Title -> Description for consistency */}
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDesc}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
