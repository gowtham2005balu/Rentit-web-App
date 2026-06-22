"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { filterOptions } from '../data/mockData';
import styles from './FiltersSidebar.module.css';
import { ChevronUp, ChevronDown, RotateCcw } from 'lucide-react';

const FiltersSidebarContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Local state for filters
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [roomTypes, setRoomTypes] = useState<string[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [tenantPref, setTenantPref] = useState<string[]>([]);
  const [furnishing, setFurnishing] = useState<string[]>([]);
  const [parking, setParking] = useState<string[]>([]);
  const [rentMax, setRentMax] = useState<number>(100000);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    rent: true,
    propertyType: true,
    roomType: true,
    availability: true,
    tenantPref: true,
    furnishing: true,
    parking: true
  });

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Initialize state from URL params on mount
  useEffect(() => {
    setPropertyTypes(searchParams.get('propertyType')?.split(',').filter(Boolean) || []);
    setRoomTypes(searchParams.get('roomType')?.split(',').filter(Boolean) || []);
    setAvailability(searchParams.get('availability')?.split(',').filter(Boolean) || []);
    setTenantPref(searchParams.get('tenantPref')?.split(',').filter(Boolean) || []);
    setFurnishing(searchParams.get('furnishing')?.split(',').filter(Boolean) || []);
    setParking(searchParams.get('parking')?.split(',').filter(Boolean) || []);
    
    const urlRentMax = searchParams.get('rentMax');
    if (urlRentMax) setRentMax(parseInt(urlRentMax));
  }, [searchParams]);

  const toggleFilter = (setState: React.Dispatch<React.SetStateAction<string[]>>, value: string) => {
    setState(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value]);
  };

  const isSelected = (state: string[], value: string) => state.includes(value);

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (propertyTypes.length) params.set('propertyType', propertyTypes.join(','));
    else params.delete('propertyType');
    
    if (roomTypes.length) params.set('roomType', roomTypes.join(','));
    else params.delete('roomType');
    
    if (availability.length) params.set('availability', availability.join(','));
    else params.delete('availability');
    
    if (tenantPref.length) params.set('tenantPref', tenantPref.join(','));
    else params.delete('tenantPref');
    
    if (furnishing.length) params.set('furnishing', furnishing.join(','));
    else params.delete('furnishing');
    
    if (parking.length) params.set('parking', parking.join(','));
    else params.delete('parking');
    
    if (rentMax < 100000) params.set('rentMax', rentMax.toString());
    else params.delete('rentMax');

    router.push(`?${params.toString()}`);
  };

  const resetFilters = () => {
    setPropertyTypes([]);
    setRoomTypes([]);
    setAvailability([]);
    setTenantPref([]);
    setFurnishing([]);
    setParking([]);
    setRentMax(100000);
    
    // Keep locality and type, clear others
    const params = new URLSearchParams(searchParams.toString());
    params.delete('propertyType');
    params.delete('roomType');
    params.delete('availability');
    params.delete('tenantPref');
    params.delete('furnishing');
    params.delete('parking');
    params.delete('rentMax');
    
    router.push(`?${params.toString()}`);
  };
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.title}>Filters</h2>
        <button className={styles.resetBtn} onClick={resetFilters}>
          <RotateCcw size={16} strokeWidth={2.5} />
        </button>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('rent')}>
          <h3 className={styles.sectionTitle}>Rent Range (Max)</h3>
          {openSections.rent ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
        </div>
        {openSections.rent && (
          <div className={styles.rangeSelector}>
            <input 
              type="range" 
              min="5000" 
              max="100000" 
              step="1000"
              value={rentMax}
              onChange={(e) => setRentMax(parseInt(e.target.value))}
              className={styles.nativeRange}
            />
            <div className={styles.rangeLabels}>
              <span>₹ 5,000</span>
              <span>₹ {rentMax >= 100000 ? '1,00,000+' : rentMax.toLocaleString('en-IN')}</span>
            </div>
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('propertyType')}>
          <h3 className={styles.sectionTitle}>Property Type</h3>
          {openSections.propertyType ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
        </div>
        {openSections.propertyType && (
          <div className={styles.pillGroup}>
            {['Gated Community Vila', 'Apartment', 'Independent House/Villa', 'Gated Societies'].map(type => (
              <button 
                key={type}
                className={`${styles.pillBtn} ${isSelected(propertyTypes, type) ? styles.pillBtnActive : ''}`}
                onClick={() => toggleFilter(setPropertyTypes, type)}
              >
                {type}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('roomType')}>
          <h3 className={styles.sectionTitle}>Room Type (Sharing)</h3>
          {openSections.roomType ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
        </div>
        {openSections.roomType && (
          <div className={styles.pillGroup}>
          {['1 RK', '1 BK', '2 BHK', '3 BHK', '4 BHK', '4+ BHK'].map(type => (
            <button 
              key={type}
              className={`${styles.pillBtn} ${isSelected(roomTypes, type) ? styles.pillBtnActive : ''}`}
              onClick={() => toggleFilter(setRoomTypes, type)}
            >
              {type}
            </button>
          ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('availability')}>
          <h3 className={styles.sectionTitle}>Availability</h3>
          {openSections.availability ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
        </div>
        {openSections.availability && (
          <div className={styles.pillGroup}>
          {['Immediately', 'Within 15 days', 'Within 30 days', 'After 30 days'].map(av => (
            <button 
              key={av}
              className={`${styles.pillBtn} ${isSelected(availability, av) ? styles.pillBtnActive : ''}`}
              onClick={() => toggleFilter(setAvailability, av)}
            >
              {av}
            </button>
          ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('tenantPref')}>
          <h3 className={styles.sectionTitle}>Preferred Tenant</h3>
          {openSections.tenantPref ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
        </div>
        {openSections.tenantPref && (
          <div className={styles.pillGroup}>
          {['Family', 'Bachelor Male', 'Bachelor Family', 'Company'].map(tenant => (
            <button 
              key={tenant}
              className={`${styles.pillBtn} ${isSelected(tenantPref, tenant) ? styles.pillBtnActive : ''}`}
              onClick={() => toggleFilter(setTenantPref, tenant)}
            >
              {tenant}
            </button>
          ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('furnishing')}>
          <h3 className={styles.sectionTitle}>Furnishing</h3>
          {openSections.furnishing ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
        </div>
        {openSections.furnishing && (
          <div className={styles.pillGroup}>
          {['Fully Furnished', 'Semi Furnished', 'Unfurnished'].map(furn => (
            <button 
              key={furn}
              className={`${styles.pillBtn} ${isSelected(furnishing, furn) ? styles.pillBtnActive : ''}`}
              onClick={() => toggleFilter(setFurnishing, furn)}
            >
              {furn}
            </button>
          ))}
          </div>
        )}
      </div>

      <div className={styles.filterSection}>
        <div className={styles.sectionHeader} onClick={() => toggleSection('parking')}>
          <h3 className={styles.sectionTitle}>Parking</h3>
          {openSections.parking ? <ChevronUp size={16} className={styles.chevron} /> : <ChevronDown size={16} className={styles.chevron} />}
        </div>
        {openSections.parking && (
          <div className={styles.pillGroup}>
            {['2 Wheeler', '4 Wheeler'].map(park => (
              <button 
                key={park}
                className={`${styles.pillBtn} ${isSelected(parking, park) ? styles.pillBtnActive : ''}`}
                onClick={() => toggleFilter(setParking, park)}
              >
                {park}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className={styles.bottomAction}>
        <button className={styles.applyBtn} onClick={applyFilters}>APPLY FILTERS</button>
      </div>
    </aside>
  );
};

const FiltersSidebar = () => {
  return (
    <Suspense fallback={<div className={styles.sidebar}>Loading filters...</div>}>
      <FiltersSidebarContent />
    </Suspense>
  );
};

export default FiltersSidebar;
