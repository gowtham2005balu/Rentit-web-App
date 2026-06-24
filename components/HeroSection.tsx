"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Apartment");
  const [locality, setLocality] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [commercialTypes, setCommercialTypes] = useState<string[]>([]);
  const [showCommercialDropdown, setShowCommercialDropdown] = useState(false);

  const COMMERCIAL_OPTIONS = [
    "Office Space", "Co-Working", "Shop", "Showroom", 
    "Industrial Building", "Industrial Shed", "Godown/Warehouse", "Other business"
  ];

  const LOCATIONS = [
    "Adyar", "Anna Nagar", "Alandur", "ECR", "Egmore", "Guindy", "Kelambakkam", 
    "Koyambedu", "Manapakkam", "Mogappair", "Mount Road", "Nanganallur", "Navalur", 
    "OMR", "Padur", "Porur", "Saidapet", "Sholinganallur", "T Nagar", "Vadapalani", "Velachery"
  ];

  const filteredLocations = LOCATIONS.filter(loc => 
    loc.toLowerCase().includes(locality.toLowerCase())
  );

  const tabs = [
    { label: "Apartment", path: "/apartments" },
    { label: "PG / Co-living", path: "/pg" },
    { label: "Flatmates", path: "/flatmate" },
    { label: "Commercial", path: "/commercial" }
  ];

  const handleTabChange = (label: string) => {
    setActiveTab(label);
    setPropertyType("All Types");
    setCommercialTypes([]);
    setShowCommercialDropdown(false);
  };

  const toggleCommercialType = (type: string) => {
    setCommercialTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleSearch = () => {
    const selectedTab = tabs.find(t => t.label === activeTab);
    const basePath = selectedTab ? selectedTab.path : "/apartments";
    
    const params = new URLSearchParams();
    if (locality.trim()) {
      params.append('locality', locality.trim());
    }
    
    if (activeTab === "Commercial") {
      if (commercialTypes.length > 0) {
        params.append('propertyType', commercialTypes.join(','));
      }
    } else if (activeTab === "PG / Co-living" || activeTab === "Flatmates") {
      if (propertyType !== "All Types") {
        params.append('roomType', propertyType);
      }
    } else {
      if (propertyType !== "All Types") {
        params.append('type', propertyType);
      }
    }
    
    const queryString = params.toString() ? `?${params.toString()}` : '';
    router.push(`${basePath}${queryString}`);
  };

  return (
    <section className={styles.heroWrapper} role="img" aria-label="Rental listings banner showing apartments and PGs available in Chennai">
      <div className={styles.heroOverlay} />
      
      <div className={styles.heroContent}>
        <h1 className={styles.title}>
          Find Your <span className={styles.highlight}>Perfect</span> Home
        </h1>
        <p className={styles.subtitle}>
          12,000+ verified listings — zero brokerage, AI-matched recommendations for apartments, PGs, flatmates & commercial spaces.
        </p>
        
        <div className={styles.searchContainer}>
          <div className={styles.tabs}>
            {tabs.map((tab) => (
              <button 
                key={tab.label}
                className={`${styles.tab} ${activeTab === tab.label ? styles.activeTab : ''}`}
                onClick={() => handleTabChange(tab.label)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className={styles.searchRow}>
            <div className={`${styles.inputGroup} ${styles.inputGroupLarge}`} style={{ position: 'relative' }}>
              <span className={styles.inputLabel}>LOCALITY / AREA</span>
              <input 
                type="text" 
                className={styles.inputField} 
                placeholder="OMR, Velachery, Anna Nagar..." 
                value={locality}
                onChange={(e) => {
                  setLocality(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {showSuggestions && locality.trim() && filteredLocations.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {filteredLocations.map(loc => (
                    <li 
                      key={loc} 
                      className={styles.suggestionItem}
                      onClick={() => {
                        setLocality(loc);
                        setShowSuggestions(false);
                      }}
                    >
                      {loc}, Chennai
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className={`${styles.inputGroup} ${styles.inputGroupSmall}`} style={{ position: 'relative' }}>
              <span className={styles.inputLabel}>
                {activeTab === "PG / Co-living" || activeTab === "Flatmates" ? "ROOM TYPE" : "PROPERTY TYPE"}
              </span>
              
              {activeTab === "Apartment" && (
                <select 
                  className={styles.selectField}
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="All Types">All Types</option>
                  <option value="1BHK">1 BHK</option>
                  <option value="2BHK">2 BHK</option>
                  <option value="3BHK">3 BHK</option>
                  <option value="4BHK">4+ BHK</option>
                  <option value="Studio">Studio</option>
                </select>
              )}

              {activeTab === "PG / Co-living" && (
                <select 
                  className={styles.selectField}
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="All Types">All Types</option>
                  <option value="Single Room">Single Room</option>
                  <option value="Double Sharing">Double Sharing</option>
                  <option value="Triple Sharing">Triple Sharing</option>
                  <option value="Four Sharing">Four Sharing</option>
                </select>
              )}

              {activeTab === "Flatmates" && (
                <select 
                  className={styles.selectField}
                  value={propertyType}
                  onChange={(e) => setPropertyType(e.target.value)}
                >
                  <option value="All Types">All Types</option>
                  <option value="Single Room">Single Room</option>
                  <option value="Shared Room">Shared Room</option>
                </select>
              )}

              {activeTab === "Commercial" && (
                <>
                  <div 
                    className={styles.selectField} 
                    onClick={() => setShowCommercialDropdown(!showCommercialDropdown)}
                    style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'flex', alignItems: 'center' }}
                  >
                    {commercialTypes.length > 0 ? commercialTypes.join(', ') : 'All Types'}
                  </div>
                  {showCommercialDropdown && (
                    <>
                      <div className={styles.dropdownOverlay} onClick={() => setShowCommercialDropdown(false)} />
                      <div className={styles.commercialDropdown}>
                        {COMMERCIAL_OPTIONS.map(opt => (
                          <label key={opt} className={styles.checkboxLabel}>
                            <input 
                              type="checkbox" 
                              checked={commercialTypes.includes(opt)}
                              onChange={() => toggleCommercialType(opt)}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
            
            <button className={styles.searchBtn} onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}
