"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, MessageSquare, CircleHelp, Plus, ChevronDown, Lightbulb, Headset, ArrowRight, ArrowLeft, BarChart2, Search, Crosshair, MapPin, ShieldCheck, ArrowUpDown, Snowflake, Dumbbell, Car, Waves, Zap, PawPrint, Wifi, Home, Trophy, Cctv, Flame, Droplets, CarFront, ShoppingBag, Check, Camera, Video, X } from 'lucide-react';
import styles from './addProperty.module.css';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AddPropertyPage() {
  return (
    <React.Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <AddPropertyContent />
    </React.Suspense>
  );
}

function AddPropertyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('edit');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState('');
  const [editPropertyId, setEditPropertyId] = useState<string | null>(null);

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

    // Restore draft if exists
    try {
      const draftStr = localStorage.getItem('rentit_property_draft');
      if (draftStr) {
        const draft = JSON.parse(draftStr);
        if (draft.currentStep) setCurrentStep(draft.currentStep);
        if (draft.propertyCategory) setPropertyCategory(draft.propertyCategory);
        if (draft.listingPurpose) setListingPurpose(draft.listingPurpose);
        if (draft.city) setCity(draft.city);
        if (draft.contactName) setContactName(draft.contactName);
        if (draft.apartmentType) setApartmentType(draft.apartmentType);
        if (draft.apartmentName) setApartmentName(draft.apartmentName);
        if (draft.builtUpArea) setBuiltUpArea(draft.builtUpArea);
        if (draft.bhkType) setBhkType(draft.bhkType);
        if (draft.facing) setFacing(draft.facing);
        if (draft.propertyAge) setPropertyAge(draft.propertyAge);
        if (draft.floorNumber) setFloorNumber(draft.floorNumber);
        if (draft.totalFloors) setTotalFloors(draft.totalFloors);
        if (draft.locality) setLocality(draft.locality);
        if (draft.landmark) setLandmark(draft.landmark);
        if (draft.fullAddress) setFullAddress(draft.fullAddress);
        if (draft.monthlyRent) setMonthlyRent(draft.monthlyRent);
        if (draft.securityDeposit) setSecurityDeposit(draft.securityDeposit);
        if (draft.monthlyMaintenance) setMonthlyMaintenance(draft.monthlyMaintenance);
        if (draft.maintenanceAmount) setMaintenanceAmount(draft.maintenanceAmount);
        if (draft.availableFrom) setAvailableFrom(draft.availableFrom);
        if (draft.furnishingType) setFurnishingType(draft.furnishingType);
        if (draft.parkingAvailable) setParkingAvailable(draft.parkingAvailable);
        if (draft.preferredTenants) setPreferredTenants(draft.preferredTenants);
        if (draft.rentNegotiable !== undefined) setRentNegotiable(draft.rentNegotiable);
        if (draft.propertyDescription) setPropertyDescription(draft.propertyDescription);
        if (draft.bathrooms) setBathrooms(draft.bathrooms);
        if (draft.balcony) setBalcony(draft.balcony);
        if (draft.waterSupply) setWaterSupply(draft.waterSupply);
        if (draft.petAllowed !== undefined) setPetAllowed(draft.petAllowed);
        if (draft.gym !== undefined) setGym(draft.gym);
        if (draft.nonVegAllowed !== undefined) setNonVegAllowed(draft.nonVegAllowed);
        if (draft.gatedSecurity !== undefined) setGatedSecurity(draft.gatedSecurity);
        if (draft.whoWillShow) setWhoWillShow(draft.whoWillShow);
        if (draft.directionTips) setDirectionTips(draft.directionTips);
        if (draft.selectedAmenities) setSelectedAmenities(draft.selectedAmenities);
        if (draft.availableDays) setAvailableDays(draft.availableDays);
        if (draft.anytimeVisit !== undefined) setAnytimeVisit(draft.anytimeVisit);
        if (draft.visitFrom) setVisitFrom(draft.visitFrom);
        if (draft.visitUntil) setVisitUntil(draft.visitUntil);
        if (draft.images) setImages(draft.images);
        if (draft.editPropertyId) setEditPropertyId(draft.editPropertyId);
      }
    } catch(e) {
      console.error("Failed to restore draft:", e);
    }
  }, []);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  // Step 7 State
  const [availableDays, setAvailableDays] = useState('Everyday');
  const [anytimeVisit, setAnytimeVisit] = useState(false);
  const [visitFrom, setVisitFrom] = useState('9:00 AM');
  const [visitUntil, setVisitUntil] = useState('5:00 PM');

  // Step 5 State
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const toggleAmenity = (label: string) => {
    setSelectedAmenities(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };
  const [bathrooms, setBathrooms] = useState(2);
  const [balcony, setBalcony] = useState(2);
  const [waterSupply, setWaterSupply] = useState('Corporation');
  const [petAllowed, setPetAllowed] = useState(true);
  const [gym, setGym] = useState(true);
  const [nonVegAllowed, setNonVegAllowed] = useState(true);
  const [gatedSecurity, setGatedSecurity] = useState(true);
  const [whoWillShow, setWhoWillShow] = useState('Need help');
  const [directionTips, setDirectionTips] = useState('');

  // Step 6 State
  const [images, setImages] = useState<string[]>([]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const img = new Image();
            img.onload = () => {
              const canvas = document.createElement('canvas');
              const MAX_WIDTH = 800;
              const scaleSize = MAX_WIDTH / img.width;
              canvas.width = MAX_WIDTH;
              canvas.height = img.height * scaleSize;
              const ctx = canvas.getContext('2d');
              ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
              const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
              setImages(prev => [...prev, dataUrl]);
            };
            img.src = reader.result as string;
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };
  const [video, setVideo] = useState<string | null>(null);
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(URL.createObjectURL(e.target.files[0]));
    }
  };
  const removeVideo = () => setVideo(null);

  // Step 1 State
  const [propertyCategory, setPropertyCategory] = useState('Residential');
  const [listingPurpose, setListingPurpose] = useState('For Rent');
  const [city, setCity] = useState('Chennai');
  const [contactName, setContactName] = useState('Rajesh Kumar');

  // Step 2 State
  const [apartmentType, setApartmentType] = useState('');
  const [apartmentName, setApartmentName] = useState('');
  const [builtUpArea, setBuiltUpArea] = useState('1581');
  const [bhkType, setBhkType] = useState('3 BHK');
  const [facing, setFacing] = useState('South');
  const [propertyAge, setPropertyAge] = useState('5-10 Years');
  const [floorNumber, setFloorNumber] = useState('8');
  const [totalFloors, setTotalFloors] = useState('15');

  // Step 3 State
  const [locality, setLocality] = useState('Kasturibai Nagar, Adyar');
  const [landmark, setLandmark] = useState('600m from Adyar Metro Station');
  const [fullAddress, setFullAddress] = useState('Asset Doctors Apartment, No. 4, Kasturibai Nagar, Adyar, Chennai 600020');

  // Step 4 State
  const [monthlyRent, setMonthlyRent] = useState('40000');
  const [securityDeposit, setSecurityDeposit] = useState('120000');
  const [monthlyMaintenance, setMonthlyMaintenance] = useState('included');
  const [maintenanceAmount, setMaintenanceAmount] = useState('0');
  const [availableFrom, setAvailableFrom] = useState('');
  const [furnishingType, setFurnishingType] = useState('semi');
  const [parkingAvailable, setParkingAvailable] = useState('car');
  const [preferredTenants, setPreferredTenants] = useState<string[]>(['Family']);
  const toggleTenantPref = (label: string) => {
    setPreferredTenants(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };
  const [rentNegotiable, setRentNegotiable] = useState(false);
  const [propertyDescription, setPropertyDescription] = useState("Nestled on the 8th floor of Asset Doctors Apartment in the prime locality of Kasturibai Nagar, Adyar, this fully furnished 3BHK experience in Chennai's most sought-after residential neighbourhood.");

  const steps = [
    { id: 1, name: 'Basic Details', desc: 'Category, type, city' },
    { id: 2, name: 'Property Details', desc: 'BHK, area, floor' },
    { id: 3, name: 'Locality & Map', desc: 'Location pin' },
    { id: 4, name: 'Rent & Pricing', desc: 'Rent, deposit, terms' },
    { id: 5, name: 'Amenities', desc: 'Features & extras' },
    { id: 6, name: 'Photos & Media', desc: 'Images, video' },
    { id: 7, name: 'Availability', desc: 'Visit slots' }
  ];

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        if (!propertyCategory || !listingPurpose || !city || !contactName) {
          alert('Please fill in all required fields (Category, Purpose, City, Name)');
          return false;
        }
        return true;
      case 2:
        if (!apartmentType || !builtUpArea || !bhkType || !propertyAge || !floorNumber || !totalFloors) {
          alert('Please fill in all required property details.');
          return false;
        }
        return true;
      case 3:
        if (!locality) {
          alert('Please specify the locality.');
          return false;
        }
        return true;
      case 4:
        if (!monthlyRent || !securityDeposit || !availableFrom) {
          alert('Please fill in all pricing details and availability date.');
          return false;
        }
        return true;
      case 5:
      case 6:
      case 7:
        return true;
      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const payload = {
        propertyCategory, listingPurpose, city, contactName,
        apartmentType, apartmentName, builtUpArea, bhkType, facing, propertyAge, floorNumber, totalFloors,
        locality, landmark, fullAddress,
        monthlyRent, securityDeposit, monthlyMaintenance, maintenanceAmount, availableFrom, furnishingType, parkingAvailable, preferredTenants, rentNegotiable, propertyDescription,
        bathrooms, balcony, waterSupply, petAllowed, gym, nonVegAllowed, gatedSecurity, whoWillShow, directionTips, selectedAmenities,
        availableDays, anytimeVisit, visitFrom, visitUntil,
        images,
        title: apartmentName || `${bhkType} for ${listingPurpose}`,
        price: monthlyRent,
        type: propertyCategory,
        userId: localStorage.getItem('rentit_userId') || sessionStorage.getItem('rentit_userId')
      };

      let res;
      if (editPropertyId) {
        res = await fetch('/api/properties/edit', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editPropertyId,
            type: propertyCategory || 'Residential',
            updates: payload
          })
        });
      } else {
        res = await fetch('/api/properties/create', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || `HTTP error! status: ${res.status}`);
      }
      if (data.success || data.record) {
        localStorage.removeItem('rentit_property_draft');
        setCurrentStep(8);
      } else {
        console.warn("Failed to submit property:", data);
        alert(data.error || data.message || "Failed to submit property. Please ensure you are logged in.");
      }
    } catch (e: any) {
      console.warn("Error submitting property:", e);
      alert(e.message || "Failed to submit property. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    const userIdStr = localStorage.getItem('rentit_userId') || sessionStorage.getItem('rentit_userId');
    if (!userIdStr) {
      alert("Please login to save drafts.");
      return;
    }
    
    // Use a clean, accurate-looking percentage instead of weird decimals
    const progressMap: Record<number, number> = {
      1: 15,
      2: 30,
      3: 50,
      4: 65,
      5: 80,
      6: 90,
      7: 95
    };
    const progress = progressMap[currentStep] || 15;
    
    // Save draft data locally
    const draftPayload = {
      currentStep, propertyCategory, listingPurpose, city, contactName,
      apartmentType, apartmentName, builtUpArea, bhkType, facing, propertyAge, floorNumber, totalFloors,
      locality, landmark, fullAddress,
      monthlyRent, securityDeposit, monthlyMaintenance, maintenanceAmount, availableFrom, furnishingType, parkingAvailable, preferredTenants, rentNegotiable, propertyDescription,
      bathrooms, balcony, waterSupply, petAllowed, gym, nonVegAllowed, gatedSecurity, whoWillShow, directionTips, selectedAmenities,
      availableDays, anytimeVisit, visitFrom, visitUntil, images
    };
    localStorage.setItem('rentit_property_draft', JSON.stringify(draftPayload));
    
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userIdStr,
          title: 'Draft Saved 📝',
          message: `Your property post is ${progress}% complete. Click "Resume Posting" to finish your listing and make it live on RentIt!`,
          type: 'Listings'
        })
      });
      // Redirect to notifications page instead of showing an annoying browser alert
      router.push('/notifications');
    } catch(e) {
      console.error("Failed to save draft:", e);
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* Simplified Header */}
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
        {/* Sub Header */}
        <div className={styles.subHeader}>
          <div>
            <h1 className={styles.pageTitle}>{editPropertyId ? 'Edit Property' : 'Add New Property'}</h1>
            <p className={styles.pageSubtitle}>{currentStep === 8 ? 'Success' : `Step ${currentStep} of 7 — ${steps[currentStep - 1]?.name}`}</p>
          </div>
          <div className={styles.subHeaderActions}>
            {currentStep > 1 && (
              <button className={styles.backBtn} onClick={() => setCurrentStep(prev => prev - 1)}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button className={styles.saveDraftBtn} onClick={handleSaveDraft}>Save Draft</button>
            {currentStep === 8 ? null : currentStep >= 7 ? (
              <button className={styles.finishPostingBtn} onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Posting...' : 'Finish Posting'}
              </button>
            ) : (
              <button className={styles.continueBtn} onClick={() => {
                if (!validateStep(currentStep)) return;

                if (currentStep === 1) {
                  if (propertyCategory === 'PG / Hostel') {
                    router.push('/add-pg');
                    return;
                  } else if (propertyCategory === 'Commercial') {
                    router.push('/add-commercial');
                    return;
                  }
                }
                setCurrentStep(prev => Math.min(prev + 1, 8));
              }}>
                Continue
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Content Grid */}
        <div className={styles.contentGrid}>
          {/* Left Sidebar - Progress */}
          {currentStep !== 8 && (
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

          {/* Center Form Area */}
          <div className={styles.formCard} style={{ gridColumn: currentStep === 8 ? '1 / -1' : undefined }}>
            {currentStep === 1 && (
              <>
                <h2 className={styles.formTitle}>What are you listing?</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Property Category <span>*</span></label>
                  <div className={styles.toggleGroup}>
                    {['Residential', 'Commercial', 'PG / Hostel'].map((cat) => (
                      <button 
                        key={cat}
                        className={`${styles.toggleBtn} ${propertyCategory === cat ? styles.active : ''}`}
                        onClick={() => {
                          setPropertyCategory(cat);
                          if (cat === 'Commercial') router.push('/add-commercial');
                          if (cat === 'PG / Hostel') router.push('/add-pg');
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Listing Purpose <span>*</span></label>
                  <div className={styles.toggleGroup}>
                    {['For Rent', 'Flatmate'].map((purp) => (
                      <button 
                        key={purp}
                        className={`${styles.toggleBtn} ${listingPurpose === purp ? styles.active : ''}`}
                        onClick={() => {
                          setListingPurpose(purp);
                          if (purp === 'Flatmate') router.push('/add-flatmate');
                        }}
                      >
                        {purp}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>City <span>*</span></label>
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
                    <label className={styles.label}>Owner Contact Name <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Enter full name"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 2 && (
              <>
                <h2 className={styles.formTitle}>Property Configuration</h2>
                
                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Apartment Type <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={apartmentType}
                        onChange={(e) => setApartmentType(e.target.value)}
                      >
                        <option value="">Select apartment type</option>
                        <option value="Apartment">Apartment</option>
                        <option value="Independent House">Independent House</option>
                        <option value="Villa">Villa</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Apartment Name <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        value={apartmentName}
                        onChange={(e) => setApartmentName(e.target.value)}
                        placeholder="e.g. Abas enclave"
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Built-up Area <span>*</span></label>
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
                    <label className={styles.label}>BHK Type <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={bhkType}
                        onChange={(e) => setBhkType(e.target.value)}
                      >
                        <option value="1 BHK">1 BHK</option>
                        <option value="2 BHK">2 BHK</option>
                        <option value="3 BHK">3 BHK</option>
                        <option value="4 BHK">4 BHK</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Facing</label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer' }}
                        value={facing}
                        onChange={(e) => setFacing(e.target.value)}
                      >
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="East">East</option>
                        <option value="West">West</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Property Age <span>*</span></label>
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
                    <label className={styles.label}>Floor Number <span>*</span></label>
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
                    <label className={styles.label}>Total Floors <span>*</span></label>
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
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className={styles.formTitle}>Locality Details</h2>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Locality / Area <span>*</span></label>
                  <div className={styles.searchWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input 
                      type="text" 
                      className={styles.searchInput} 
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                      placeholder="Search locality"
                    />
                    <button className={styles.locationBtn}>
                      <Crosshair size={14} />
                      Use Current Location
                    </button>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Nearby Landmark</label>
                  <div className={styles.inputWrapper}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                      placeholder="e.g. Near Metro Station"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Address (Private — not shown publicly)</label>
                  <div className={styles.inputWrapper}>
                    <input 
                      type="text" 
                      className={styles.input} 
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      placeholder="Enter full address"
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Pin Location on Map</label>
                  <div className={styles.mapContainer}>
                    {/* Map Overlay Search */}
                    <div className={styles.mapOverlaySearch}>
                      <Search size={14} color="#999" />
                      <input 
                        type="text" 
                        placeholder="Search your society or nearest landmark" 
                        className={styles.mapOverlayInput}
                      />
                    </div>
                    {/* Custom Centered Pin UI */}
                    <div className={styles.mapCenterPin}>
                      <div className={styles.pinIconWrapper}>
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))' }}>
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EF4444"/>
                          <circle cx="12" cy="9" r="3.5" fill="white"/>
                        </svg>
                      </div>
                    </div>
                    {/* Live Google Maps Integration (No default pin) */}
                    <iframe 
                      src="https://maps.google.com/maps?ll=13.0827,80.2707&z=14&output=embed" 
                      className={styles.mapIframe}
                      title="Pin Location Map"
                      loading="lazy"
                    ></iframe>
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
                    <div className={styles.currencyInputWrapper}>
                      <span className={styles.currencySymbol}>₹</span>
                      <input type="text" value={monthlyRent} onChange={e => setMonthlyRent(e.target.value)} className={styles.currencyInput} />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Security Deposit <span className={styles.required}>*</span></label>
                    <div className={styles.currencyInputWrapper}>
                      <span className={styles.currencySymbol}>₹</span>
                      <input type="text" value={securityDeposit} onChange={e => setSecurityDeposit(e.target.value)} className={styles.currencyInput} />
                    </div>
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Monthly Maintenance</label>
                    <div className={styles.inputWrapper}>
                      <select className={styles.input} value={monthlyMaintenance} onChange={e => setMonthlyMaintenance(e.target.value)}>
                        <option value="" disabled>Select maintenance</option>
                        <option value="included">Included</option>
                        <option value="extra">Extra</option>
                      </select>
                      <ChevronDown className={styles.selectIcon} size={16} color="#666" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Maintenance Amount <span className={styles.required}>*</span></label>
                    <div className={styles.currencyInputWrapper}>
                      <span className={styles.currencySymbol}>₹</span>
                      <input type="text" value={maintenanceAmount} onChange={e => setMaintenanceAmount(e.target.value)} className={styles.currencyInput} />
                    </div>
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Available From <span className={styles.required}>*</span></label>
                    <input type="date" value={availableFrom} onChange={e => setAvailableFrom(e.target.value)} className={styles.input} />
                  </div>
                  <div className={styles.formGroup}>
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Furnishing Type <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select className={styles.input} value={furnishingType} onChange={e => setFurnishingType(e.target.value)}>
                        <option value="" disabled>Select</option>
                        <option value="furnished">Fully Furnished</option>
                        <option value="semi">Semi Furnished</option>
                        <option value="unfurnished">Unfurnished</option>
                      </select>
                      <ChevronDown className={styles.selectIcon} size={16} color="#666" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Parking Available</label>
                    <div className={styles.inputWrapper}>
                      <select className={styles.input} value={parkingAvailable} onChange={e => setParkingAvailable(e.target.value)}>
                        <option value="" disabled>Select</option>
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="both">Both</option>
                        <option value="none">None</option>
                      </select>
                      <ChevronDown className={styles.selectIcon} size={16} color="#666" />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Tenants</label>
                  <div className={styles.pillsContainer}>
                    {['Family', 'Bachelor Male', 'Bachelor Female', 'Bachelor Family', 'Company Lease'].map((tenant) => (
                      <div 
                        key={tenant}
                        className={`${styles.pill} ${preferredTenants.includes(tenant) ? styles.pillActive : ''}`}
                        onClick={() => toggleTenantPref(tenant)}
                      >
                        {tenant}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.toggleBox}>
                  <div className={styles.toggleText}>
                    <h4>Rent is Negotiable</h4>
                    <p>Allow tenants to negotiate the rent</p>
                  </div>
                  <div className={`${styles.toggleSwitch} ${rentNegotiable ? styles.toggleActive : ''}`} onClick={() => setRentNegotiable(!rentNegotiable)}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Property Description</label>
                  <textarea 
                    className={styles.textareaField} 
                    value={propertyDescription}
                    onChange={e => setPropertyDescription(e.target.value)}
                  ></textarea>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className={styles.inputGrid} style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Bathrooms <span className={styles.required}>*</span></label>
                    <div className={styles.counterGroup}>
                      <button className={styles.counterBtn} onClick={() => setBathrooms(Math.max(1, bathrooms - 1))}>-</button>
                      <div className={styles.counterValue}>{bathrooms}</div>
                      <button className={styles.counterBtn} onClick={() => setBathrooms(bathrooms + 1)}>+</button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Balcony <span className={styles.required}>*</span></label>
                    <div className={styles.counterGroup}>
                      <button className={styles.counterBtn} onClick={() => setBalcony(Math.max(0, balcony - 1))}>-</button>
                      <div className={styles.counterValue}>{balcony}</div>
                      <button className={styles.counterBtn} onClick={() => setBalcony(balcony + 1)}>+</button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Water Supply <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select className={styles.input} value={waterSupply} onChange={e => setWaterSupply(e.target.value)}>
                        <option value="Corporation">Corporation</option>
                        <option value="Borewell">Borewell</option>
                        <option value="Both">Both</option>
                      </select>
                      <ChevronDown className={styles.selectIcon} size={16} color="#666" />
                    </div>
                  </div>
                </div>

                <div className={styles.sectionSubtitle}>
                  Additional Details
                </div>
                
                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Pet Allowed <span className={styles.required}>*</span></label>
                    <div className={styles.yesNoGroup}>
                      <button className={`${styles.yesNoBtn} ${petAllowed ? styles.yesNoBtnActive : ''}`} onClick={() => setPetAllowed(true)}>Yes</button>
                      <button className={`${styles.yesNoBtn} ${!petAllowed ? styles.yesNoBtnActive : ''}`} onClick={() => setPetAllowed(false)}>No</button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Gym <span className={styles.required}>*</span></label>
                    <div className={styles.yesNoGroup}>
                      <button className={`${styles.yesNoBtn} ${gym ? styles.yesNoBtnActive : ''}`} onClick={() => setGym(true)}>Yes</button>
                      <button className={`${styles.yesNoBtn} ${!gym ? styles.yesNoBtnActive : ''}`} onClick={() => setGym(false)}>No</button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Non-Veg Allowed <span className={styles.required}>*</span></label>
                    <div className={styles.yesNoGroup}>
                      <button className={`${styles.yesNoBtn} ${nonVegAllowed ? styles.yesNoBtnActive : ''}`} onClick={() => setNonVegAllowed(true)}>Yes</button>
                      <button className={`${styles.yesNoBtn} ${!nonVegAllowed ? styles.yesNoBtnActive : ''}`} onClick={() => setNonVegAllowed(false)}>No</button>
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Gated Security <span className={styles.required}>*</span></label>
                    <div className={styles.yesNoGroup}>
                      <button className={`${styles.yesNoBtn} ${gatedSecurity ? styles.yesNoBtnActive : ''}`} onClick={() => setGatedSecurity(true)}>Yes</button>
                      <button className={`${styles.yesNoBtn} ${!gatedSecurity ? styles.yesNoBtnActive : ''}`} onClick={() => setGatedSecurity(false)}>No</button>
                    </div>
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Who will show the property? <span className={styles.required}>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select className={styles.input} value={whoWillShow} onChange={e => setWhoWillShow(e.target.value)}>
                        <option value="Need help">Need help</option>
                        <option value="I will show">I will show</option>
                        <option value="Neighbour">Neighbour</option>
                        <option value="Security">Security</option>
                      </select>
                      <ChevronDown className={styles.selectIcon} size={16} color="#666" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} style={{ visibility: 'hidden' }}>Contact</label>
                    <input type="text" className={styles.input} defaultValue="+91 XXXXX XXXXX" disabled style={{ backgroundColor: '#F8FAFC', color: '#94A3B8' }} />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Direction Tips for Visitors (optional)</label>
                  <input type="text" className={styles.input} value={directionTips} onChange={e => setDirectionTips(e.target.value)} placeholder="e.g. Take the left gate after the petrol bunk..." />
                </div>

                <div className={styles.sectionSubtitle}>
                  Society & Building Amenities
                  <small>Select all amenities available in your property/society</small>
                </div>

                <div className={styles.amenityGrid}>
                  {[
                    { label: 'Security', icon: ShieldCheck },
                    { label: 'Lift', icon: ArrowUpDown },
                    { label: 'AC', icon: Snowflake },
                    { label: 'Gym', icon: Dumbbell },
                    { label: 'Parking', icon: Car },
                    { label: 'Swimming Pool', icon: Waves },
                    { label: 'Power Backup', icon: Zap },
                    { label: 'Pet Friendly', icon: PawPrint },
                    { label: 'WiFi', icon: Wifi },
                    { label: 'Club House', icon: Home },
                    { label: 'Playground', icon: Trophy },
                    { label: 'CCTV', icon: Cctv },
                    { label: 'Gas Pipeline', icon: Flame },
                    { label: '24h Water', icon: Droplets },
                    { label: 'Visitor Parking', icon: CarFront },
                    { label: 'Shopping Center', icon: ShoppingBag },
                  ].map((amenity) => {
                    const Icon = amenity.icon;
                    const isActive = selectedAmenities.includes(amenity.label);
                    return (
                      <div 
                        key={amenity.label} 
                        className={`${styles.amenityCard} ${isActive ? styles.amenityCardActive : ''}`}
                        onClick={() => toggleAmenity(amenity.label)}
                      >
                        <Icon size={24} className={styles.amenityIcon} />
                        <span className={styles.amenityLabel}>
                          {amenity.label === 'Visitor Parking' ? <>Visitor<br/>Parking</> : 
                           amenity.label === 'Shopping Center' ? <>Shopping<br/>Center</> : 
                           amenity.label}
                        </span>
                      </div>
                    );
                  })}
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
                      {images.length} / 6 uploaded
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
                        setImages(prev => [...prev, ...urls].slice(0, 6));
                      }
                    }}
                    onClick={() => document.getElementById('property-file-upload')?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <Camera size={48} className={styles.dropIcon} strokeWidth={1} />
                    <div className={styles.dropTitle}>Drag & drop photos here</div>
                    <div className={styles.dropSubtitle}>Or click to browse — PNG, JPG up to 10MB each</div>
                    <label className={styles.browseBtn} style={{ display: 'inline-block', cursor: 'pointer' }} onClick={(e) => e.stopPropagation()}>
                      Browse Files
                      <input id="property-file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  <div className={styles.imagePreviewRow}>
                    {images.map((url, index) => (
                      <div key={index} className={styles.imagePreview} style={{ backgroundImage: `url(${url})` }}>
                        <div className={styles.removeBtnWrapper}>
                          <button className={styles.removeBtnInner} onClick={() => removeImage(index)}><X size={12} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.uploadDivider}>or upload via</div>

                <div className={styles.uploadCard}>
                  <div 
                    className={styles.dropZone}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setVideo(URL.createObjectURL(e.dataTransfer.files[0]));
                      }
                    }}
                    onClick={() => document.getElementById('property-video-upload')?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <Video size={48} className={styles.dropIcon} strokeWidth={1} />
                    <div className={styles.dropTitle}>Drag & drop Videos here</div>
                    <div className={styles.dropSubtitle}>Listings with video get 3x more visits</div>
                    <label className={styles.browseBtn} style={{ display: 'inline-block', cursor: 'pointer', marginTop: '16px' }} onClick={(e) => e.stopPropagation()}>
                      Browse Files
                      <input id="property-video-upload" type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} />
                    </label>
                  </div>

                  {video && (
                    <div className={styles.imagePreviewRow} style={{ marginTop: '16px' }}>
                      <div className={styles.imagePreview} style={{ width: '100px', height: '100px', backgroundColor: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                        <div className={styles.removeBtnWrapper}>
                          <button className={styles.removeBtnInner} onClick={(e) => { e.stopPropagation(); removeVideo(); }}><X size={12} /></button>
                        </div>
                        <Video size={24} />
                        <span style={{ fontSize: '10px', marginTop: '4px' }}>Video</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {currentStep === 7 && (
              <div className={styles.availabilityCard}>
                <h3>Visit Availability</h3>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Available Days</label>
                  <div className={styles.daysGroup}>
                    <div 
                      className={`${styles.dayBtn} ${availableDays === 'Everyday' ? styles.dayBtnActive : ''}`}
                      onClick={() => setAvailableDays('Everyday')}
                    >
                      <span className={styles.dayBtnTitle}>Everyday</span>
                      <span className={styles.dayBtnSubtitle}>All days</span>
                    </div>
                    <div 
                      className={`${styles.dayBtn} ${availableDays === 'Weekday' ? styles.dayBtnActive : ''}`}
                      onClick={() => setAvailableDays('Weekday')}
                    >
                      <span className={styles.dayBtnTitle}>Weekday</span>
                      <span className={styles.dayBtnSubtitle}>Mon - Fri</span>
                    </div>
                    <div 
                      className={`${styles.dayBtn} ${availableDays === 'Weekend' ? styles.dayBtnActive : ''}`}
                      onClick={() => setAvailableDays('Weekend')}
                    >
                      <span className={styles.dayBtnTitle}>Weekend</span>
                      <span className={styles.dayBtnSubtitle}>Sat - Sun</span>
                    </div>
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Visit From</label>
                    <div className={styles.inputWrapper}>
                      <select className={styles.input} value={visitFrom} onChange={e => setVisitFrom(e.target.value)}>
                        <option>8:00 AM</option>
                        <option>9:00 AM</option>
                        <option>10:00 AM</option>
                      </select>
                      <ChevronDown className={styles.selectIcon} size={16} color="#666" />
                    </div>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Visit Until</label>
                    <div className={styles.inputWrapper}>
                      <select className={styles.input} value={visitUntil} onChange={e => setVisitUntil(e.target.value)}>
                        <option>4:00 PM</option>
                        <option>5:00 PM</option>
                        <option>6:00 PM</option>
                      </select>
                      <ChevronDown className={styles.selectIcon} size={16} color="#666" />
                    </div>
                  </div>
                </div>

                <div className={styles.negotiableBox} style={{ marginTop: '24px' }}>
                  <div className={styles.negotiableText}>
                    <div className={styles.negotiableTitle}>Available Anytime (24/7)</div>
                    <div className={styles.negotiableSubtitle}>No time restriction for visits</div>
                  </div>
                  <div 
                    className={`${styles.toggleKnobWrapper} ${anytimeVisit ? styles.toggleActive : ''}`}
                    onClick={() => setAnytimeVisit(!anytimeVisit)}
                  >
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>
              </div>
            )}
            {currentStep === 8 && (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <Check size={64} color="#10B981" style={{ marginBottom: '20px' }} />
                <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1E293B', marginBottom: '10px' }}>Property Posted Successfully!</h2>
                <p style={{ color: '#64748B', marginBottom: '30px' }}>Your property is now live and visible to thousands of potential tenants.</p>
                <button 
                  onClick={() => router.push('/')} 
                  style={{ padding: '12px 24px', backgroundColor: '#F59E0B', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600' }}
                >
                  Go to Homepage
                </button>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          {currentStep !== 8 && (
            <div className={styles.rightSidebar}>
            {currentStep === 2 && (
              <div className={styles.benchmarkCard} style={{ marginBottom: '24px' }}>
                <div className={styles.benchmarkTitle}>
                  <BarChart2 size={16} color="#4F46E5" />
                  Area Benchmark
                </div>
                <div className={styles.benchmarkText}>
                  Avg 3BHK in Adyar: <span className={styles.benchmarkHighlight}>1,350 - 1,800 sq.ft</span>
                </div>
                <div className={styles.benchmarkText}>
                  Your area: <span className={styles.benchmarkSuccess}>1,581 sq.ft ✓</span>
                </div>
                <div className={styles.benchmarkText} style={{ fontSize: '11px', marginTop: '8px' }}>
                  Within the optimal range for this area
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className={styles.schedulingTipsCard} style={{ marginBottom: '24px' }}>
                <h4>Scheduling Tips</h4>
                <ul className={styles.schedulingTipsList}>
                  <li>
                    <Check size={14} />
                    Weekday morning slots (10AM-1PM) get the most visit requests
                  </li>
                  <li>
                    <Check size={14} />
                    Weekend slots double enquiry conversion
                  </li>
                  <li>
                    <Check size={14} />
                    Auto-confirm reduces wait time for tenants
                  </li>
                </ul>
              </div>
            )}

            {(currentStep === 5 || currentStep === 6) && (
              <div className={styles.successCard} style={{ marginBottom: '24px' }}>
                <div className={styles.successHeader}>
                  <Check size={16} />
                  9 amenities selected
                </div>
                <div className={styles.successText}>
                  Listings with 8+ amenities get <strong>2.5x more enquiries</strong> on average. You're doing great!
                </div>
              </div>
            )}

            <div className={styles.tipsCard}>
              <div className={styles.tipsTitle}>
                <Lightbulb size={18} color="#D97706" />
                Tips for better responses
              </div>
              {currentStep === 4 ? (
                <ul className={styles.tipsList}>
                  <li>Complete all sections for max visibility</li>
                  <li>Add 10+ photos to get 4x enquiries</li>
                  <li>Enable WhatsApp for instant replies</li>
                  <li>Zero brokerage listings rank higher</li>
                </ul>
              ) : (
                <ul className={styles.tipsList}>
                  <li>Complete all sections for max visibility</li>
                  <li>Add 10+ photos to get 4x enquiries</li>
                  <li>Enable WhatsApp for instant replies</li>
                  <li>Zero brokerage listings rank higher</li>
                </ul>
              )}
            </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
