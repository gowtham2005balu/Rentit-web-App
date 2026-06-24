"use client";

import React from 'react';
import Link from 'next/link';
import ContactOwnerButton from './ContactOwnerButton';
import styles from './RecommendedSection.module.css';
import { Heart, MapPin, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

const mockRecommendations = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    title: 'Palm Infused 2BHK Apartment',
    location: 'OMR, Perungudi',
    price: '22,000',
    features: ['2 BHK', '960 sqft', 'Furnished']
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    title: 'Elite Premium Apartment',
    location: 'Anna Nagar, Chennai',
    price: '38,000',
    features: ['3 BHK', '1450 sqft', 'Semi-Furnished']
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=600',
    title: 'Studio Near IT Corridor',
    location: 'Sholinganallur, OMR',
    price: '12,900',
    features: ['Studio', '480 sqft', 'Fully Furnished']
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    title: 'Spacious Family Apartment',
    location: 'Velachery, Chennai',
    price: '18,000',
    features: ['3 BHK', '1200 sqft', 'Unfurnished']
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    title: 'Minimalist 1BHK Flat',
    location: 'Guindy, Chennai',
    price: '15,000',
    features: ['1 BHK', '600 sqft', 'Semi-Furnished']
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    title: 'Luxury Villa with Pool',
    location: 'ECR, Chennai',
    price: '85,000',
    features: ['4 BHK', '3200 sqft', 'Fully Furnished']
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&q=80&w=600',
    title: 'Cozy Studio Appt',
    location: 'Thiruvanmiyur, Chennai',
    price: '16,500',
    features: ['Studio', '500 sqft', 'Furnished']
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=600',
    title: 'Premium 3BHK Penthouse',
    location: 'Adyar, Chennai',
    price: '65,000',
    features: ['3 BHK', '2100 sqft', 'Fully Furnished']
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=600',
    title: 'Budget 2BHK Near Station',
    location: 'Tambaram, Chennai',
    price: '14,000',
    features: ['2 BHK', '850 sqft', 'Unfurnished']
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=600',
    title: 'Sea View Apartment',
    location: 'Besant Nagar, Chennai',
    price: '45,000',
    features: ['3 BHK', '1600 sqft', 'Semi-Furnished']
  }
];

const RecommendedCard = ({ property }: { property: any }) => {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { isAuthenticated, openAuthModal } = useAuth();
  const router = useRouter();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    if (isWishlisted(property.title)) {
      removeFromWishlist(property.title);
    } else {
      addToWishlist({
        id: property.id,
        title: property.title,
        location: property.location,
        price: property.price.toString(),
        features: property.features,
        image: property.image
      });
    }
  };

  return (
    <div className={styles.card} onClick={() => router.push(`/property/${property.id}`)} style={{ cursor: 'pointer' }}>
      <div className={styles.imageWrapper}>
        <img 
          src={property.image} 
          alt={property.title} 
          className={styles.cardImg} 
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image';
          }}
        />
        <button
          className={styles.favBtn}
          onClick={toggleWishlist}
          aria-label="Save to favorites"
        >
          <Heart size={16} fill={isWishlisted(property.title) ? "#EF4444" : "none"} color={isWishlisted(property.title) ? "#EF4444" : "currentColor"} />
        </button>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{property.title}</h3>

        <div className={styles.locationRow}>
          <MapPin size={12} className={styles.mapPin} style={{ flexShrink: 0 }} />
          <span className={styles.locationText}>{property.location}</span>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.priceValue}>
            ₹{!isNaN(Number(String(property.price).replace(/,/g, ''))) 
                ? Number(String(property.price).replace(/,/g, '')).toLocaleString('en-IN') 
                : property.price}
          </span>
          <span className={styles.pricePeriod}>/month</span>
        </div>

        <div className={styles.featuresList}>
          {property.features.map((feature: string, idx: number) => (
            <span key={idx} className={styles.featurePill}>{feature}</span>
          ))}
          {property.date && (
            <span className={styles.featurePill} style={{ backgroundColor: '#f0fdf4', color: '#166534' }}>
              Listed: {property.date.substring(0, 10)}
            </span>
          )}
        </div>

        <div className={styles.actionsRow}>
          <ContactOwnerButton 
            propertyId={property.id} 
            propertyTitle={property.title}
            className={styles.btnOutline} 
            variant="outline"
          />
          <button className={styles.btnSolid} onClick={(e) => { e.preventDefault(); e.stopPropagation(); router.push(`/visits?schedule=${property.id || property._id || property._key}`); }}>Schedule Visit</button>
        </div>
      </div>
    </div>
  );
};

export default function RecommendedSection({ initialProperties = [] }: { initialProperties?: any[] }) {
  const [activeTab, setActiveTab] = React.useState('All');
  const [liveProperties, setLiveProperties] = React.useState<any[]>([]);

  // Client-side fetch with retry — loads real data after Render backend wakes up
  React.useEffect(() => {
    let cancelled = false;
    let retryCount = 0;
    const maxRetries = 2;

    async function fetchLiveData() {
      try {
        const res = await fetch('/api/properties');
        if (!res.ok) throw new Error(`Status ${res.status}`);
        const data = await res.json();
        const rows = Array.isArray(data) ? data : (data.properties || data.data || []);
        if (!cancelled && Array.isArray(rows) && rows.length > 0) {
          setLiveProperties(rows.map((prop: any) => ({
            _key: prop._key,
            type: prop.type,
            id: prop._id || prop.id,
            title: prop.title || prop.propertyName || prop.name || 'Untitled Property',
            location: prop.location_address || prop.city || prop.location || 'Unknown Location',
            price: prop.price || prop.rent || '0',
            features: prop.features || (prop.type || prop.propertyType ? [prop.bhk ? `${prop.bhk}` : '', prop.type || prop.propertyType].filter(Boolean) : ['Property']),
            image: prop.image || prop.image_url || (prop.images && prop.images[0]) || 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image',
            date: prop.created_at || prop.createdAt || new Date().toISOString()
          })));
        }
      } catch {
        // Retry after 5 seconds (Render backend may still be waking up)
        if (!cancelled && retryCount < maxRetries) {
          retryCount++;
          setTimeout(fetchLiveData, 5000);
        }
      }
    }
    fetchLiveData();
    return () => { cancelled = true; };
  }, []);

  // Format database properties to match the required UI structure
  const formattedProperties = React.useMemo(() => {
    if (!initialProperties || initialProperties.length === 0) {
      return []; // Return empty array to ONLY show real data from Neon DB
    }
    return initialProperties.map((prop: any) => ({
      _key: prop._key,
      type: prop.type,
      id: prop._id || prop.id,
      title: prop.title || prop.propertyName || prop.name || 'Untitled Property',
      location: prop.location_address || prop.city || prop.location || 'Unknown Location',
      price: prop.price || prop.rent || '0',
      features: prop.features || (prop.type || prop.propertyType ? [prop.bhk ? `${prop.bhk}` : '', prop.type || prop.propertyType].filter(Boolean) : ['Property']),
      image: prop.image || prop.image_url || (prop.images && prop.images[0]) || 'https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Image',
      date: prop.created_at || new Date().toISOString()
    }));
  }, [initialProperties]);

  // Use live data if available, otherwise fall back to server-provided data
  const displayProperties = liveProperties.length > 0 ? liveProperties : formattedProperties;

  const filteredRecommendations = React.useMemo(() => {
    if (activeTab === 'Trending Near You') {
      return displayProperties.filter((_: any, i: number) => i % 2 === 0);
    }
    if (activeTab === 'Recently Viewed') {
      return displayProperties.filter((_: any, i: number) => i % 2 !== 0);
    }
    return displayProperties;
  }, [activeTab, displayProperties]);

  return (
    <section className={styles.sectionWrapper}>
      <div className={styles.headerRow}>
        <div>
          <h2 className={styles.title}>Recommended For You</h2>
          <p className={styles.subtitle}>Personalized picks based on your searches and browsing history</p>
        </div>
      </div>

      <div className={styles.tabsContainer}>
        <button
          className={`${styles.tabBtn} ${activeTab === 'All' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('All')}
        >
          All
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'Trending Near You' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('Trending Near You')}
        >
          Trending Near You
        </button>
        <button
          className={`${styles.tabBtn} ${activeTab === 'Recently Viewed' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('Recently Viewed')}
        >
          Recently Viewed
        </button>
      </div>

      <div className={styles.gridContainer}>
        {filteredRecommendations.map((property, idx) => (
          <RecommendedCard key={property._key || (property.type ? `${property.type}-${property.id}` : `rec-${property.id}-${idx}`)} property={property} />
        ))}
      </div>
    </section>
  );
}
