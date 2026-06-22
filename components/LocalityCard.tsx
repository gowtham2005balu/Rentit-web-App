import React from 'react';
import styles from './LocalityCard.module.css';

interface LocalityProps {
  locality: {
    id: string;
    name: string;
    avgPrice: string;
    imageUrl: string;
  };
}

import Link from 'next/link';

const LocalityCard: React.FC<LocalityProps> = ({ locality }) => {
  return (
    <Link 
      href={`/apartments?locality=${encodeURIComponent(locality.name.toLowerCase())}`}
      className={styles.card}
      style={{ backgroundImage: `url(${locality.imageUrl})`, textDecoration: 'none' }}
    >
      <div className={styles.overlay}>
        <h3 className={styles.name}>{locality.name}</h3>
        <p className={styles.price}>{locality.avgPrice}</p>
      </div>
    </Link>
  );
};

export default LocalityCard;
