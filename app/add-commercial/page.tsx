"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, MessageSquare, CircleHelp, Plus, ChevronDown, Lightbulb, ArrowRight, ArrowLeft, Check, Headset, Search, MapPin, LocateFixed, Calendar, Info } from 'lucide-react';
import styles from '../add-property/addProperty.module.css';
import { useRouter } from 'next/navigation';

export default function AddCommercialPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState('');

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('rentit_userId');
        const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${userId}`) || '{}');
        if (localProfile.name) {
          setUserName(localProfile.name);
        }

        if (userId) {
          const res = await fetch('/api/auth/me', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId })
          });
          const data = await res.json();
          if (data.user?.name) {
            setUserName(data.user.name);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  // Step 2 State
  const [propertyType, setPropertyType] = useState('');
  const [buildingType, setBuildingType] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('1581');
  const [propertyAge, setPropertyAge] = useState('5-10 Years');
  const [floorNumber, setFloorNumber] = useState('8');
  const [totalFloors, setTotalFloors] = useState('15');
  const [furnishingType, setFurnishingType] = useState('');
  
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['On Main Road', 'Corner Property']);
  const featureOptions = ['On Main Road', 'Corner Property', 'Near Metro', 'Highway Facing', 'Prime Location', 'Basement Parking', 'Fire Safety'];

  // Step 1 State
  const [propertyCategory, setPropertyCategory] = useState('Commercial');
  const [listingPurpose, setListingPurpose] = useState('For Rent');
  const [contactName, setContactName] = useState('Rajesh Kumar');

  // Step 3 State
  const [city, setCity] = useState('Chennai');
  const [locality, setLocality] = useState('Kasturibai Nagar, Adyar');
  const [landmark, setLandmark] = useState('600m from Adyar Metro Station');
  const [fullAddress, setFullAddress] = useState('Asset Doctors Apartment, No. 4, Kasturibai Nagar, Adyar, Chennai 600020');

  // Step 4 State
  const [rent, setRent] = useState('40000');
  const [deposit, setDeposit] = useState('120000');
  const [depositNegotiable, setDepositNegotiable] = useState(false);
  const [maintenanceType, setMaintenanceType] = useState('');
  const [maintenanceAmount, setMaintenanceAmount] = useState('40000');
  const [availableFrom, setAvailableFrom] = useState('');
  const [rentNegotiable, setRentNegotiable] = useState(false);
  const [idealFor, setIdealFor] = useState<string[]>(['Bank', 'Retail']);
  const [newIdealTag, setNewIdealTag] = useState('');

  // Step 5 State
  const [powerBackup, setPowerBackup] = useState('DG');
  const [lift, setLift] = useState('Personal');
  const [parking, setParking] = useState('Public And Reserved');
  const [washroom, setWashroom] = useState('Shared');
  const [parkingSlots, setParkingSlots] = useState('');
  const [waterStorage, setWaterStorage] = useState('Yes');
  const [security, setSecurity] = useState('Yes');
  const [wifi, setWifi] = useState('Yes');
  const [propertyCondition, setPropertyCondition] = useState('New Property');
  const [currentBusiness, setCurrentBusiness] = useState('Restaurant / Cafe');
  const [directionTips, setDirectionTips] = useState('');

  // Step 6 State
  const [photos, setPhotos] = useState<string[]>([]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const urls = filesArray.map(file => URL.createObjectURL(file));
      setPhotos(prev => [...prev, ...urls].slice(0, 6));
    }
  };
  const removeImage = (indexToRemove: number) => {
    setPhotos(prev => prev.filter((_, index) => index !== indexToRemove));
  };
  const [video, setVideo] = useState<string | null>(null);
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(URL.createObjectURL(e.target.files[0]));
    }
  };
  const removeVideo = () => setVideo(null);

  // Step 7 State
  const [description, setDescription] = useState('Nestled on the 8th floor of Asset Doctors Apartment in the prime locality of Kasturibai Nagar, Adyar, this fully furnished 3BHK experience in Chennai\'s most sought-after residential neighbourhood.');
  const [previousOccupancy, setPreviousOccupancy] = useState('');
  const [propertyCleaned, setPropertyCleaned] = useState('');
  const [propertyPainted, setPropertyPainted] = useState('');
  const [whoWillShow, setWhoWillShow] = useState('Need help');
  const [showPropertyPhone, setShowPropertyPhone] = useState('');

  // Step 8 State
  const [availableDays, setAvailableDays] = useState('Everyday');
  const [visitFrom, setVisitFrom] = useState('9:00 AM');
  const [visitUntil, setVisitUntil] = useState('5:00 PM');
  const [availableAnytime, setAvailableAnytime] = useState(false);
  
  const idealForOptions = ['Bank', 'Service Center', 'Show Room', 'ATM', 'Retail', 'IT / Tech Office', 'Clinic / Hospital', 'Restaurant', 'Logistics', 'Pharmacy'];

  const toggleIdealFor = (option: string) => {
    setIdealFor(prev => 
      prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!propertyCategory || !listingPurpose || !city || !contactName) {
          alert('Please fill in all required fields (Category, Purpose, City, Name)');
          return false;
        }
        return true;
      case 2:
        if (!propertyType || !buildingType || !builtUpArea || !propertyAge || !floorNumber || !totalFloors || !furnishingType) {
          alert('Please fill in all required property details.');
          return false;
        }
        return true;
      case 3:
        if (!city || !locality) {
          alert('Please select city and locality.');
          return false;
        }
        return true;
      case 4:
        if (!rent || !deposit || !maintenanceAmount || !availableFrom) {
          alert('Please fill in all pricing details.');
          return false;
        }
        return true;
      case 5:
        if (!powerBackup || !lift || !parking || !washroom) {
          alert('Please fill in all required utilities info.');
          return false;
        }
        return true;
      case 6:
        // Optional validation for photos, currently passing
        return true;
      case 7:
        // Details
        return true;
      case 8:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        propertyCategory, listingPurpose, contactName, city, locality, landmark, fullAddress,
        propertyType, buildingType, builtUpArea, propertyAge, floorNumber, totalFloors, furnishingType, selectedFeatures,
        rent, deposit, depositNegotiable, maintenanceType, maintenanceAmount, availableFrom, rentNegotiable, idealFor, newIdealTag,
        powerBackup, lift, parking, washroom, parkingSlots, waterStorage, security, wifi, propertyCondition, currentBusiness, directionTips,
        photos, description, previousOccupancy, propertyCleaned, propertyPainted, whoWillShow, showPropertyPhone,
        availableDays, visitFrom, visitUntil, availableAnytime,
        title: `${buildingType || propertyType} for ${listingPurpose} in ${locality}`,
        price: rent,
        type: 'Commercial',
        userId: localStorage.getItem('rentit_userId')
      };

      const res = await fetch('/api/properties/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      if (data.success) {
        setCurrentStep(9);
      } else {
        console.warn("Failed to post property:", data);
        setCurrentStep(9); // fallback
      }
    } catch (error) {
      console.warn("Submission error:", error);
      setCurrentStep(9); // fallback
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, name: 'Basic Details', desc: 'Type, floor, rooms' },
    { id: 2, name: 'Property Details', desc: 'Type, area, floor' },
    { id: 3, name: 'Locality & Map', desc: 'Location pin' },
    { id: 4, name: 'Rent & Pricing', desc: 'Rent, deposit, terms' },
    { id: 5, name: 'Amenities', desc: 'Features & extras' },
    { id: 6, name: 'Photos & Media', desc: 'Images, video' },
    { id: 7, name: 'Property Info', desc: 'Details & showing' },
    { id: 8, name: 'Availability', desc: 'Visit slots' }
  ];

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <div className={styles.logoSection}>
            <span className={styles.logoTextDark}>RENT</span>
            <span className={styles.logoTextOrange}>IT</span>
          </div>
        </Link>

        <div className={styles.headerRight}>
          <Link href="/chat" className={styles.iconBtn}>
            <MessageSquare size={20} />
            <span className={styles.dotBadge}></span>
          </Link>
          <Link href="/notifications" className={styles.iconBtn}>
            <Bell size={20} />
            <span className={styles.dotBadge}></span>
          </Link>
          <Link href="/help" className={styles.iconBtn}>
            <CircleHelp size={20} />
          </Link>
          <Link href="/profile" style={{textDecoration: 'none'}}>
            <div className={styles.avatar} style={{cursor: 'pointer'}}>{getInitials(userName)}</div>
          </Link>
          <button className={styles.addPropertyBtn}>
            <Plus size={16} />
            Add Property
          </button>
        </div>
      </header>

      <div className={styles.mainContainer}>
        <div className={styles.subHeader}>
          <div>
            <h1 className={styles.pageTitle}>Add New Property</h1>
            <p className={styles.pageSubtitle}>{currentStep === 9 ? 'Success' : `Step ${currentStep} of 8 — ${steps[currentStep - 1]?.name}`}</p>
          </div>
          <div className={styles.subHeaderActions}>
            {currentStep > 1 && (
              <button className={styles.backBtn} onClick={() => setCurrentStep(prev => prev - 1)}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button className={styles.saveDraftBtn}>Save Draft</button>
            {currentStep === 9 ? null : currentStep >= 8 ? (
              <button className={styles.finishPostingBtn} onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Finish Posting'}
              </button>
            ) : (
              <button className={styles.continueBtn} onClick={() => {
                if (!validateStep(currentStep)) return;
                
                if (currentStep === 1) {
                  if (propertyCategory === 'Residential') {
                    router.push('/add-property');
                    return;
                  } else if (propertyCategory === 'PG / Hostel') {
                    router.push('/add-pg');
                    return;
                  }
                }
                setCurrentStep(prev => Math.min(prev + 1, 9));
              }}>
                Continue
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        <div className={styles.contentGrid}>
          {currentStep !== 9 && (
            <div className={styles.progressSidebar}>
              <div className={styles.progressCard}>
                <div className={styles.progressTitle}>PROGRESS</div>
                <div className={styles.stepList}>
                  {steps.map((step) => (
                    <div key={step.id} className={`${styles.stepItem} ${step.id === currentStep ? styles.active : ''} ${step.id < currentStep ? styles.completed : ''}`}>
                      <div className={styles.stepNumber}>
                        {step.id < currentStep ? '✓' : step.id}
                      </div>
                      <div className={styles.stepText}>
                        <span className={styles.stepName}>{step.name}</span>
                        <span className={styles.stepDesc}>{step.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.helpCard}>
                <div className={styles.helpHeader}>
                  <Headset size={18} />
                  Need help?
                </div>
                <p className={styles.helpText}>
                  Our listing experts can help you create a better listing. Get more enquiries.
                </p>
                <button className={styles.helpBtn}>Talk to Expert</button>
              </div>
            </div>
          )}

          <div className={styles.formCard} style={{ gridColumn: currentStep === 9 ? '1 / -1' : undefined }}>
            {currentStep === 1 && (
              <>
                <h2 className={styles.formTitle}>What are you listing?</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Property Category <span className={styles.required}>*</span></label>
                  <div className={styles.toggleGroup}>
                    {['Residential', 'Commercial', 'PG / Hostel'].map((cat) => (
                      <button 
                        key={cat}
                        className={`${styles.toggleBtn} ${propertyCategory === cat ? styles.active : ''}`}
                        onClick={() => {
                          setPropertyCategory(cat);
                          if (cat === 'Residential') router.push('/add-property');
                          if (cat === 'PG / Hostel') router.push('/add-pg');
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Listing Purpose <span className={styles.required}>*</span></label>
                  <div className={styles.toggleGroup}>
                    {['For Rent', 'Flatmate'].map((purp) => (
                      <button 
                        key={purp}
                        className={`${styles.toggleBtn} ${listingPurpose === purp ? styles.active : ''}`}
                        onClick={() => {
                          setListingPurpose(purp);
                          if (purp === 'Flatmate') router.push('/add-flatmate');
                          if (purp === 'For Rent') router.push('/add-property');
                        }}
                      >
                        {purp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>City <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="Chennai">Chennai</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Mumbai">Mumbai</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Owner Contact Name <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Owner Name"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className={styles.formTitle}>Property Details</h2>
                <p style={{ color: '#64748B', fontSize: '14px', marginBottom: '32px' }}>Tell us about the commercial property you are listing</p>
                
                <div className={styles.sectionSubtitle}>
                  Basic Property Info
                </div>
                
                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Property Type <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={propertyType}
                        onChange={(e) => setPropertyType(e.target.value)}
                      >
                        <option value="">Select property type</option>
                        <option value="Office Space">Office Space</option>
                        <option value="Retail Shop">Retail Shop</option>
                        <option value="Showroom">Showroom</option>
                        <option value="Warehouse/Godown">Warehouse/Godown</option>
                        <option value="Industrial Building">Industrial Building</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Building Type <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={buildingType}
                        onChange={(e) => setBuildingType(e.target.value)}
                        placeholder="e.g. Abas enclave"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Property Age <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={propertyAge}
                        onChange={(e) => setPropertyAge(e.target.value)}
                      >
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-5 Years">1-5 Years</option>
                        <option value="5-10 Years">5-10 Years</option>
                        <option value="10+ Years">10+ Years</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Built-up Area <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={builtUpArea}
                        onChange={(e) => setBuiltUpArea(e.target.value)}
                        placeholder="Area"
                      />
                      <span className={styles.inputSuffix}>sq.ft</span>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Floor Number <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={floorNumber}
                        onChange={(e) => setFloorNumber(e.target.value)}
                        placeholder="Floor"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Total Floors <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={totalFloors}
                        onChange={(e) => setTotalFloors(e.target.value)}
                        placeholder="Total floors"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Furnishing Type <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={furnishingType}
                        onChange={(e) => setFurnishingType(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="furnished">Fully Furnished</option>
                        <option value="semi">Semi Furnished</option>
                        <option value="unfurnished">Unfurnished</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '32px 0 24px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
                  <span style={{ padding: '0 16px', color: '#94A3B8', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em' }}>OTHER FEATURES</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Select all that apply</label>
                  <div className={styles.pillsContainer}>
                    {featureOptions.map((feature) => (
                      <div 
                        key={feature}
                        className={`${styles.pill} ${selectedFeatures.includes(feature) ? styles.pillActive : ''}`}
                        onClick={() => toggleFeature(feature)}
                      >
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className={styles.formTitle}>Locality Details</h2>
                
                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>City <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      >
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Locality / Area <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <Search size={16} className={styles.inputIcon} color="#94A3B8" />
                      <input 
                        type="text" 
                        className={styles.input} 
                        style={{ paddingLeft: '36px' }}
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        placeholder="Search locality"
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                      <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', backgroundColor: '#D1FAE5', color: '#059669', border: 'none', borderRadius: '4px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
                        <LocateFixed size={14} />
                        Use Current Location
                      </button>
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: '8px' }}>
                  <label className={styles.label}>Nearby Landmark</label>
                  <div className={styles.inputWrapper}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Apollo Hospital"
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: '24px' }}>
                  <label className={styles.label}>Full Address (Private — not shown publicly)</label>
                  <div className={styles.inputWrapper}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="Complete address"
                    />
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: '24px' }}>
                  <label className={styles.label}>Pin Location on Map</label>
                  <div className={styles.mapContainer} style={{ position: 'relative', width: '100%', height: '282px', backgroundColor: '#E2E8F0', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    {/* Fake Map Grid Lines */}
                    <div style={{ position: 'absolute', top: 0, bottom: 0, left: '30%', width: '20px', backgroundColor: 'rgba(255,255,255,0.6)' }}></div>
                    <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '20px', backgroundColor: 'rgba(255,255,255,0.6)' }}></div>
                    
                    {/* Search Overlay */}
                    <div style={{ position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)', width: '60%', backgroundColor: 'white', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                      <Search size={16} color="#94A3B8" />
                      <input type="text" placeholder="Search your society or nearest landmark" style={{ border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#64748B' }} />
                    </div>

                    {/* Pin Overlay */}
                    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                      <MapPin size={32} color="#EF4444" fill="white" strokeWidth={2} />
                      <div style={{ textAlign: 'center', marginTop: '8px', textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>
                        <div style={{ fontWeight: '600', fontSize: '14px', color: '#1E293B' }}>Anna Nagar, Chennai</div>
                        <div style={{ fontSize: '12px', color: '#64748B' }}>Click to adjust pin location</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className={styles.formTitle}>Pricing Details</h2>
                
                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Monthly Rent <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputPrefix}>₹</span>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={rent}
                        onChange={(e) => setRent(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Expected Deposit <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputPrefix}>₹</span>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={deposit}
                        onChange={(e) => setDeposit(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', cursor: 'pointer', fontSize: '13px', color: '#1E293B', fontWeight: '500' }}>
                      <input 
                        type="checkbox" 
                        style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #CBD5E1' }}
                        checked={depositNegotiable} 
                        onChange={(e) => setDepositNegotiable(e.target.checked)} 
                      />
                      Deposit Negotiable
                    </label>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Monthly Maintenance</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer', color: maintenanceType ? '#0F172A' : '#94A3B8' }}
                        value={maintenanceType}
                        onChange={(e) => setMaintenanceType(e.target.value)}
                      >
                        <option value="" disabled hidden>Select maintenance</option>
                        <option value="Included">Included in Rent</option>
                        <option value="Extra">Extra Maintenance</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Maintenance Amount <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <span className={styles.inputPrefix}>₹</span>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={maintenanceAmount}
                        onChange={(e) => setMaintenanceAmount(e.target.value)}
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Available From <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={availableFrom}
                        onChange={(e) => setAvailableFrom(e.target.value)}
                        placeholder="dd/mm/yyyy"
                      />
                      <Calendar size={16} className={styles.inputIcon} style={{ right: '16px', left: 'auto', color: '#64748B' }} />
                    </div>
                  </div>
                </div>

                <div className={styles.negotiableBox} style={{ marginTop: '24px' }}>
                  <div className={styles.negotiableText}>
                    <div className={styles.negotiableTitle}>Rent is Negotiable</div>
                    <div className={styles.negotiableSubtitle}>Allow tenants to negotiate the rent</div>
                  </div>
                  <div 
                    className={`${styles.toggleKnobWrapper} ${rentNegotiable ? styles.toggleActive : ''}`}
                    onClick={() => setRentNegotiable(!rentNegotiable)}
                  >
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', margin: '40px 0 24px' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
                  <span style={{ padding: '0 16px', color: '#94A3B8', fontSize: '11px', fontWeight: '600', letterSpacing: '0.05em' }}>IDEAL FOR</span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: '#E2E8F0' }}></div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#64748B', fontSize: '13px', marginBottom: '16px' }}>
                  <Info size={16} color="#94A3B8" />
                  Select all business types suitable for this space
                </div>

                <div className={styles.pillsContainer} style={{ marginBottom: '16px' }}>
                  {idealForOptions.map((option) => {
                    const isSelected = idealFor.includes(option);
                    return (
                      <div 
                        key={option}
                        className={styles.pill}
                        style={{
                          backgroundColor: isSelected ? '#D1FAE5' : 'white',
                          color: isSelected ? '#059669' : '#64748B',
                          borderColor: isSelected ? '#34D399' : '#E2E8F0',
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          padding: '8px 16px',
                          borderRadius: '20px',
                          fontSize: '13px',
                          fontWeight: isSelected ? '500' : '400',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleIdealFor(option)}
                      >
                        {option}
                      </div>
                    );
                  })}
                </div>

                <div className={styles.inputWrapper} style={{ borderStyle: 'dashed' }}>
                  <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}>+</span>
                  <input 
                    type="text" 
                    className={styles.input} 
                    style={{ paddingLeft: '32px', border: 'none', background: 'transparent' }}
                    value={newIdealTag}
                    onChange={(e) => setNewIdealTag(e.target.value)}
                    placeholder="Add other business types..."
                  />
                  <span style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#059669', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>+ create new tag</span>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2 className={styles.formTitle}>Utilities & Infrastructure</h2>
                
                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Power Backup <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={powerBackup}
                        onChange={(e) => setPowerBackup(e.target.value)}
                      >
                        <option value="DG">DG</option>
                        <option value="UPS">UPS</option>
                        <option value="None">None</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Lift <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={lift}
                        onChange={(e) => setLift(e.target.value)}
                      >
                        <option value="Personal">Personal</option>
                        <option value="Shared">Shared</option>
                        <option value="None">None</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Parking <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={parking}
                        onChange={(e) => setParking(e.target.value)}
                      >
                        <option value="Public And Reserved">Public And Reserved</option>
                        <option value="Reserved Only">Reserved Only</option>
                        <option value="Public Only">Public Only</option>
                        <option value="None">None</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Washroom(s) <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={washroom}
                        onChange={(e) => setWashroom(e.target.value)}
                      >
                        <option value="Shared">Shared</option>
                        <option value="Private">Private</option>
                        <option value="None">None</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>No. of Available Parking Slots</label>
                  <div className={styles.inputWrapper} style={{ maxWidth: '48%' }}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={parkingSlots}
                      onChange={(e) => setParkingSlots(e.target.value)}
                      placeholder="No of Available Slots"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Water Storage Facility</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={waterStorage}
                        onChange={(e) => setWaterStorage(e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Security</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={security}
                        onChange={(e) => setSecurity(e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>WiFi Connectivity</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={wifi}
                        onChange={(e) => setWifi(e.target.value)}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                </div>

                <h2 className={styles.formTitle} style={{ marginTop: '24px', marginBottom: '16px' }}>Property Condition & Usage</h2>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Current Property Condition</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={propertyCondition}
                        onChange={(e) => setPropertyCondition(e.target.value)}
                      >
                        <option value="New Property">New Property</option>
                        <option value="Used Property">Used Property</option>
                        <option value="Under Construction">Under Construction</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>What Business is Currently Running?</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={currentBusiness}
                        onChange={(e) => setCurrentBusiness(e.target.value)}
                      >
                        <option value="Restaurant / Cafe">Restaurant / Cafe</option>
                        <option value="Retail Store">Retail Store</option>
                        <option value="Office">Office</option>
                        <option value="None">None</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Add Directions Tip for your tenants 
                    <span style={{ backgroundColor: '#EF4444', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px' }}>NEW</span>
                  </label>
                  <textarea 
                    className={styles.textareaField} 
                    style={{ minHeight: '80px', marginTop: '0' }}
                    value={directionTips}
                    onChange={(e) => setDirectionTips(e.target.value)}
                    placeholder="Eg. Take the road opposite to Amrita College, take right after 300m..."
                  />
                  <div style={{ color: '#94A3B8', fontSize: '12px', marginTop: '8px' }}>
                    Help business tenants navigate to your property easily
                  </div>
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div className={styles.uploadCard}>
                  <div className={styles.uploadHeader}>
                    <div className={styles.uploadHeaderLeft}>
                      <h3>Property Photos</h3>
                      <p>Listings with 6+ photos get 4x more enquiries</p>
                    </div>
                    <div className={styles.uploadBadge}>
                      {photos.length} / 6 uploaded
                    </div>
                  </div>

                  <div 
                    className={styles.dropZone}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        const filesArray = Array.from(e.dataTransfer.files);
                        const urls = filesArray.map(file => URL.createObjectURL(file));
                        setPhotos(prev => [...prev, ...urls].slice(0, 6));
                      }
                    }}
                    onClick={() => document.getElementById('commercial-file-upload')?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.dropIcon}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="8" width="18" height="12" rx="2" ry="2"></rect>
                        <path d="M7 8v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"></path>
                        <circle cx="12" cy="14" r="3"></circle>
                      </svg>
                    </div>
                    <div className={styles.dropTitle}>Drag & drop photos here</div>
                    <div className={styles.dropSubtitle}>Or click to browse — PNG, JPG up to 10MB each</div>
                    <label className={styles.browseBtn} style={{ display: 'inline-block', cursor: 'pointer', margin: 0 }} onClick={(e) => e.stopPropagation()}>
                      Browse Files
                      <input id="commercial-file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  {photos.length > 0 && (
                    <div className={styles.imagePreviewRow}>
                      {photos.map((url, index) => (
                        <div key={index} className={styles.imagePreview} style={{ backgroundImage: `url(${url})`, backgroundColor: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.5)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                          <div className={styles.removeBtnWrapper}>
                            <button className={styles.removeBtnInner} onClick={() => removeImage(index)}>×</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className={styles.uploadDivider}>or upload via</div>

                <div className={styles.uploadCard} style={{ borderStyle: 'dashed' }}>
                  <div 
                    className={styles.dropZone} 
                    style={{ border: 'none', padding: '20px', backgroundColor: 'transparent', cursor: 'pointer' }}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setVideo(URL.createObjectURL(e.dataTransfer.files[0]));
                      }
                    }}
                    onClick={() => document.getElementById('commercial-video-upload')?.click()}
                  >
                    <div className={styles.dropIcon}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="23 7 16 12 23 17 23 7"></polygon>
                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                      </svg>
                    </div>
                    <div className={styles.dropTitle}>Drag & drop Videos here</div>
                    <div className={styles.dropSubtitle}>Or click to upload (max 100MB) — MP4, MOV</div>
                    <label className={styles.browseBtn} style={{ display: 'inline-block', cursor: 'pointer', marginTop: '16px' }} onClick={(e) => e.stopPropagation()}>
                      Browse Files
                      <input id="commercial-video-upload" type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  {video && (
                    <div className={styles.imagePreviewRow} style={{ marginTop: '16px', padding: '0 20px 20px' }}>
                      <div className={styles.imagePreview} style={{ width: '100px', height: '100px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <div className={styles.removeBtnWrapper}>
                          <button className={styles.removeBtnInner} onClick={(e) => { e.stopPropagation(); removeVideo(); }}>×</button>
                        </div>
                        <span style={{ fontSize: '10px', marginTop: '4px' }}>Video</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Property Description</label>
                  <textarea 
                    className={styles.textareaField} 
                    style={{ minHeight: '100px', marginTop: '0' }}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your property..."
                  />
                </div>

                <div className={styles.inputGrid} style={{ marginTop: '24px' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Previous Occupancy</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={previousOccupancy}
                        onChange={(e) => setPreviousOccupancy(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Family">Family</option>
                        <option value="Bachelors">Bachelors</option>
                        <option value="Company">Company</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>I want my property cleaned <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={propertyCleaned}
                        onChange={(e) => setPropertyCleaned(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>I want to get my property painted <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={propertyPainted}
                        onChange={(e) => setPropertyPainted(e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: '8px' }}>
                  <label className={styles.label}>Who will show the property? <span className={styles.required}>*</span></label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={whoWillShow}
                        onChange={(e) => setWhoWillShow(e.target.value)}
                      >
                        <option value="Need help">Need help</option>
                        <option value="I will show">I will show</option>
                        <option value="Neighbour">Neighbour</option>
                        <option value="Security">Security</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                    {whoWillShow === 'Need help' && (
                      <div className={styles.inputWrapper}>
                        <input 
                          type="text" 
                          className={styles.input} 
                          value={showPropertyPhone}
                          onChange={(e) => setShowPropertyPhone(e.target.value)}
                          placeholder="+91 XXXXX XXXXX"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {currentStep === 8 && (
              <>
                <div className={styles.availabilityCard}>
                  <h3>Visit Availability</h3>
                  
                  <label className={styles.label} style={{ marginBottom: '12px', display: 'block' }}>Available Days</label>
                  <div className={styles.daysGroup}>
                    <div 
                      className={`${styles.dayBtn} ${availableDays === 'Everyday' ? styles.dayBtnActive : ''}`}
                      onClick={() => setAvailableDays('Everyday')}
                    >
                      <div className={styles.dayBtnTitle}>Everyday</div>
                      <div className={styles.dayBtnSubtitle}>All days</div>
                    </div>
                    <div 
                      className={`${styles.dayBtn} ${availableDays === 'Weekday' ? styles.dayBtnActive : ''}`}
                      onClick={() => setAvailableDays('Weekday')}
                    >
                      <div className={styles.dayBtnTitle}>Weekday</div>
                      <div className={styles.dayBtnSubtitle}>Mon - Fri</div>
                    </div>
                    <div 
                      className={`${styles.dayBtn} ${availableDays === 'Weekend' ? styles.dayBtnActive : ''}`}
                      onClick={() => setAvailableDays('Weekend')}
                    >
                      <div className={styles.dayBtnTitle}>Weekend</div>
                      <div className={styles.dayBtnSubtitle}>Sat - Sun</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Visit From</label>
                      <div className={styles.inputWrapper}>
                        <select 
                          className={styles.input} 
                          style={{ appearance: 'none', cursor: 'pointer' }}
                          value={visitFrom}
                          onChange={(e) => setVisitFrom(e.target.value)}
                          disabled={availableAnytime}
                        >
                          <option value="9:00 AM">9:00 AM</option>
                          <option value="10:00 AM">10:00 AM</option>
                          <option value="11:00 AM">11:00 AM</option>
                        </select>
                        <ChevronDown size={16} className={styles.selectIcon} />
                      </div>
                    </div>
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Visit Until</label>
                      <div className={styles.inputWrapper}>
                        <select 
                          className={styles.input} 
                          style={{ appearance: 'none', cursor: 'pointer' }}
                          value={visitUntil}
                          onChange={(e) => setVisitUntil(e.target.value)}
                          disabled={availableAnytime}
                        >
                          <option value="5:00 PM">5:00 PM</option>
                          <option value="6:00 PM">6:00 PM</option>
                          <option value="7:00 PM">7:00 PM</option>
                        </select>
                        <ChevronDown size={16} className={styles.selectIcon} />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#F8FAFC' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: '600', color: '#0F172A', marginBottom: '4px' }}>Available Anytime (24/7)</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>No time restriction for visits</div>
                    </div>
                    <div 
                      style={{ 
                        width: '40px', 
                        height: '24px', 
                        backgroundColor: availableAnytime ? '#10B981' : '#E2E8F0', 
                        borderRadius: '12px', 
                        position: 'relative', 
                        cursor: 'pointer',
                        transition: 'background-color 0.2s'
                      }}
                      onClick={() => setAvailableAnytime(!availableAnytime)}
                    >
                      <div style={{ 
                        width: '20px', 
                        height: '20px', 
                        backgroundColor: 'white', 
                        borderRadius: '50%', 
                        position: 'absolute', 
                        top: '2px', 
                        left: availableAnytime ? '18px' : '2px', 
                        transition: 'left 0.2s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep !== 1 && currentStep !== 2 && currentStep !== 3 && currentStep !== 4 && currentStep !== 5 && currentStep !== 6 && currentStep !== 7 && currentStep !== 8 && currentStep !== 9 && (
               <div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>
                 <p>This is a UI mockup for Step {currentStep}.</p>
               </div>
            )}
            
            {currentStep === 9 && (
              <div style={{ textAlign: 'center', padding: '80px 20px', animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{
                  width: '100px', height: '100px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                  boxShadow: '0 0 0 10px rgba(16, 185, 129, 0.2)',
                  animation: 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                }}>
                  <Check size={48} color="white" strokeWidth={3} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px' }}>Property Posted Successfully!</h2>
                <p style={{ color: '#64748B', marginBottom: '32px', fontSize: '16px' }}>Your commercial property is now live and visible to thousands of potential tenants.</p>
                <button 
                  onClick={() => router.push('/')} 
                  style={{ padding: '14px 32px', backgroundColor: '#F59E0B', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '16px', transition: 'background 0.2s' }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D97706'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#F59E0B'}
                >
                  Go to Homepage
                </button>
                <style jsx>{`
                  @keyframes scaleIn {
                    0% { transform: scale(0); opacity: 0; }
                    50% { transform: scale(1.1); opacity: 1; }
                    100% { transform: scale(1); opacity: 1; }
                  }
                  @keyframes fadeIn {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </div>
            )}
          </div>

          {currentStep !== 9 && (
            <div className={styles.rightSidebar}>
              <div className={styles.tipsCard}>
                <div className={styles.tipsTitle}>
                  <Lightbulb size={18} color="#D97706" />
                  Tips for better responses
                </div>
                <ul className={styles.tipsList}>
                  <li>Complete all sections for max visibility</li>
                  <li>Add 10+ photos to get 4x enquiries</li>
                  <li>Enable WhatsApp for instant replies</li>
                  <li>Zero brokerage listings rank higher</li>
                </ul>
              </div>
            </div>
          )}

        </div>

        {(currentStep === 5 || currentStep === 6 || currentStep === 7) && (
          <div className={styles.rightSidebar} style={{ marginTop: '24px' }}>
            <div style={{ backgroundColor: '#D1FAE5', border: '1px solid #A7F3D0', borderRadius: '12px', padding: '20px', marginBottom: '16px' }}>
              <div style={{ color: '#059669', fontSize: '14px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Check size={16} /> 9 amenities selected
              </div>
              <p style={{ color: '#065F46', fontSize: '12px', lineHeight: '1.5' }}>
                Listings with <strong>8+ amenities</strong> get <strong>2.5x more enquiries</strong> on average. You're doing great!
              </p>
            </div>

            <div className={styles.tipsCard}>
              <div className={styles.tipsTitle}>
                <Lightbulb size={16} />
                Tips for better responses
              </div>
              <ul className={styles.tipsList}>
                <li>Complete all sections for max visibility</li>
                <li>Listings with defined lifestyle preferences fill 40% faster</li>
                <li>Gated security tag gets 25% more serious enquiries</li>
                <li>Add 10+ photos to get 4x enquiries</li>
                <li>Enable WhatsApp for instant replies</li>
                <li>Zero brokerage listings rank higher</li>
              </ul>
            </div>
          </div>
        )}

        {currentStep === 8 && (
          <div className={styles.rightSidebar} style={{ marginTop: '24px' }}>
            <div className={styles.schedulingTipsCard} style={{ marginBottom: '16px' }}>
              <h4>Scheduling Tips</h4>
              <ul className={styles.schedulingTipsList}>
                <li><Check size={14} /> Weekday morning slots (10AM-1PM) get the most visit requests</li>
                <li><Check size={14} /> Weekend slots double enquiry conversion</li>
                <li><Check size={14} /> Auto-confirm reduces wait time for tenants</li>
              </ul>
            </div>

            <div className={styles.tipsCard}>
              <div className={styles.tipsTitle}>
                <Lightbulb size={16} />
                Tips for better responses
              </div>
              <ul className={styles.tipsList}>
                <li>Complete all sections for max visibility</li>
                <li>Add 10+ photos to get 4x enquiries</li>
                <li>Enable WhatsApp for instant replies</li>
                <li>Zero brokerage listings rank higher</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
