"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, MessageSquare, CircleHelp, Plus, ChevronDown, Lightbulb, Headset, ArrowRight, ArrowLeft, BarChart2, DollarSign, Shirt, Monitor, BedSingle, Flame, Snowflake, Bath, Search, Crosshair, MapPin, Calendar, Clock, Users, Star, Utensils, ArrowUpDown, Refrigerator, Wifi, Zap, Cctv, Dumbbell, WashingMachine, X, Camera, Video, Image, Award, Check } from 'lucide-react';
import styles from '../add-property/addProperty.module.css';
import { useRouter } from 'next/navigation';

export default function AddPGPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState('');

  // Fetch real user name
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = localStorage.getItem('rentit_userId');
        const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${userId}`) || '{}');
        if (localProfile.name) {
          setUserName(localProfile.name);
          return;
        }
      } catch (e) {
        console.error("Error reading local profile", e);
      }
    };
    fetchProfile();
  }, []);

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Step 1 State
  const [propertyCategory, setPropertyCategory] = useState('PG / Hostel');
  const [listingPurpose, setListingPurpose] = useState('For Rent');
  const [city, setCity] = useState('Chennai');
  const [contactName, setContactName] = useState('Rajesh Kumar');

  // Step 2 State
  const [selectedRooms, setSelectedRooms] = useState<string[]>(['Double Sharing', 'Triple Sharing', 'Four Sharing']);
  const [expectedRent, setExpectedRent] = useState('40000');
  const [expectedDeposit, setExpectedDeposit] = useState('40000');
  const [roomAmenities, setRoomAmenities] = useState<string[]>(['Bedding']);

  // Step 3 State
  const [locality, setLocality] = useState('Kasturibai Nagar, Adyar');
  const [landmark, setLandmark] = useState('600m from Adyar Metro Station');
  const [fullAddress, setFullAddress] = useState('Asset Doctors Apartment, No. 4, Kasturibai Nagar, Adyar, Chennai 600020');

  // Step 4 State
  const [availableFor, setAvailableFor] = useState('Male');
  const [preferredGuests, setPreferredGuests] = useState('Student');
  const [availableFrom, setAvailableFrom] = useState('');
  const [foodIncluded, setFoodIncluded] = useState(true);
  const [meals, setMeals] = useState<string[]>(['Breakfast', 'Lunch', 'Dinner']);
  const [pgRules, setPgRules] = useState<string[]>(['No Smoking']);
  const [gateClosingTime, setGateClosingTime] = useState('1:30 PM');
  const [pgName, setPgName] = useState('');
  const [description, setDescription] = useState('');

  // Step 5 State
  const [laundryService, setLaundryService] = useState('Yes');
  const [roomCleaning, setRoomCleaning] = useState('Yes');
  const [wardenFacility, setWardenFacility] = useState('Yes');
  const [showDirectionTip, setShowDirectionTip] = useState(true);
  const [directions, setDirections] = useState('');
  const [amenities, setAmenities] = useState<string[]>(['Mess', 'Lift', 'WiFi', 'Power Backup', 'Gym']);
  const [parking, setParking] = useState('Bike');
  
  // Step 6 State
  const [images, setImages] = useState<string[]>([]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) {
            const img = new window.Image();
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
  const removeVideo = () => {
    setVideo(null);
  };

  // Step 7 State
  const [visitAvailability, setVisitAvailability] = useState('Everyday');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [availableAnytime, setAvailableAnytime] = useState(false);

  const toggleAmenity = (amenity: string) => {
    setAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const toggleMeal = (meal: string) => {
    setMeals(prev => 
      prev.includes(meal) ? prev.filter(m => m !== meal) : [...prev, meal]
    );
  };

  const toggleRule = (rule: string) => {
    setPgRules(prev => 
      prev.includes(rule) ? prev.filter(r => r !== rule) : [...prev, rule]
    );
  };

  const toggleRoom = (roomType: string) => {
    setSelectedRooms(prev => 
      prev.includes(roomType) ? prev.filter(r => r !== roomType) : [...prev, roomType]
    );
  };

  const toggleRoomAmenity = (amenity: string) => {
    setRoomAmenities(prev => 
      prev.includes(amenity) ? prev.filter(a => a !== amenity) : [...prev, amenity]
    );
  };

  const pgSteps = [
    { id: 1, name: 'Basic Details', desc: 'Category, type, city' },
    { id: 2, name: 'Room Details', desc: 'Room types, pricing' },
    { id: 3, name: 'Locality & Map', desc: 'Location pin' },
    { id: 4, name: 'PG Details', desc: 'Rules, preferences' },
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
        if (selectedRooms.length === 0 || !expectedRent || !expectedDeposit) {
          alert('Please fill in room details and pricing.');
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
        if (!availableFor || !preferredGuests || !availableFrom) {
          alert('Please fill in all required PG details.');
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
        selectedRooms, expectedRent, expectedDeposit, roomAmenities,
        locality, landmark, fullAddress,
        availableFor, preferredGuests, availableFrom, foodIncluded, meals, pgRules, gateClosingTime, pgName, description,
        laundryService, roomCleaning, wardenFacility, directions, amenities, parking,
        visitAvailability, startTime, endTime, availableAnytime,
        title: pgName || `PG in ${locality}`,
        price: expectedRent,
        type: 'PG / Hostel',
        userId: localStorage.getItem('rentit_userId') || sessionStorage.getItem('rentit_userId')
      };

      const res = await fetch('/api/properties/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || `HTTP error! status: ${res.status}`);
      if (data.success) {
        setCurrentStep(8);
      } else {
        console.warn("Submission issue:", data);
        alert(data.error || data.message || "Failed to submit property. Please ensure you are logged in.");
      }
    } catch (error: any) {
      console.warn("Submission error:", error);
      alert(error.message || "Failed to submit property. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const amenityIcons: Record<string, React.ReactNode> = {
    'Cupboard': <Shirt size={16} />,
    'TV': <Monitor size={16} />,
    'Bedding': <BedSingle size={16} />,
    'Geyser': <Flame size={16} />,
    'AC': <Snowflake size={16} />,
    'Attached Bathroom': <Bath size={16} />
  };

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
            <p className={styles.pageSubtitle}>{currentStep === 8 ? 'Success' : `Step ${currentStep} of 8 — ${pgSteps[currentStep - 1]?.name}`}</p>
          </div>
          <div className={styles.subHeaderActions}>
            {currentStep > 1 && (
              <button className={styles.backBtn} onClick={() => setCurrentStep(prev => prev - 1)}>
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            <button className={styles.saveDraftBtn}>Save Draft</button>
            {currentStep === 8 ? null : currentStep >= 7 ? (
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

        <div className={styles.contentGrid}>
          {currentStep !== 8 && (
            <div className={styles.progressSidebar}>
              <div className={styles.progressCard}>
                <div className={styles.progressTitle}>PROGRESS</div>
                <div className={styles.stepList}>
                  {pgSteps.map((step) => (
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
                          if (cat === 'Residential') router.push('/add-property');
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
                        onClick={() => setListingPurpose(purp)}
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
                <h2 className={styles.formTitle} style={{ marginBottom: '8px' }}>Provide details about your place to find a tenant soon</h2>
                <p className={styles.pageSubtitle} style={{ marginBottom: '16px' }}>Select the type of rooms available in your PG. You can select multiple room types.</p>
                
                <div className={styles.roomCardsGrid}>
                  <div className={`${styles.roomTypeCard} ${selectedRooms.includes('Single Sharing') ? styles.roomTypeCardActive : ''}`} onClick={() => toggleRoom('Single Sharing')}>
                    {selectedRooms.includes('Single Sharing') && <div className={styles.roomTypeCheck}>✓</div>}
                    <div className={styles.roomTypeIcon}>
                      <div className={styles.bedRect}></div>
                    </div>
                    <div className={styles.roomTypeTitle}>Single Sharing</div>
                    <div className={styles.roomTypeDesc}>1 person per room</div>
                  </div>
                  
                  <div className={`${styles.roomTypeCard} ${selectedRooms.includes('Double Sharing') ? styles.roomTypeCardActive : ''}`} onClick={() => toggleRoom('Double Sharing')}>
                    {selectedRooms.includes('Double Sharing') && <div className={styles.roomTypeCheck}>✓</div>}
                    <div className={styles.roomTypeIcon}>
                      <div className={styles.bedRect}></div>
                      <div className={styles.bedRect}></div>
                    </div>
                    <div className={styles.roomTypeTitle}>Double Sharing</div>
                    <div className={styles.roomTypeDesc}>2 persons per room</div>
                  </div>
                  
                  <div className={`${styles.roomTypeCard} ${selectedRooms.includes('Triple Sharing') ? styles.roomTypeCardActive : ''}`} onClick={() => toggleRoom('Triple Sharing')}>
                    {selectedRooms.includes('Triple Sharing') && <div className={styles.roomTypeCheck}>✓</div>}
                    <div className={styles.roomTypeIcon}>
                      <div className={styles.bedRect}></div>
                      <div className={styles.bedRect}></div>
                      <div className={styles.bedRect}></div>
                    </div>
                    <div className={styles.roomTypeTitle}>Triple Sharing</div>
                    <div className={styles.roomTypeDesc}>3 persons per room</div>
                  </div>
                  
                  <div className={`${styles.roomTypeCard} ${selectedRooms.includes('Four Sharing') ? styles.roomTypeCardActive : ''}`} onClick={() => toggleRoom('Four Sharing')}>
                    {selectedRooms.includes('Four Sharing') && <div className={styles.roomTypeCheck}>✓</div>}
                    <div className={styles.roomTypeIcon} style={{ width: '40px', flexWrap: 'wrap', gap: '4px', height: 'auto', marginBottom: '8px' }}>
                      <div className={styles.bedRect} style={{ height: '16px' }}></div>
                      <div className={styles.bedRect} style={{ height: '16px' }}></div>
                      <div className={styles.bedRect} style={{ height: '16px' }}></div>
                      <div className={styles.bedRect} style={{ height: '16px' }}></div>
                    </div>
                    <div className={styles.roomTypeTitle}>Four Sharing</div>
                    <div className={styles.roomTypeDesc}>4 persons per room</div>
                  </div>
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '32px 0' }}></div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Expected Rent <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontWeight: '500' }}>₹</span>
                      <input 
                        type="text" 
                        className={styles.input} 
                        style={{ paddingLeft: '32px' }}
                        value={expectedRent}
                        onChange={(e) => setExpectedRent(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Expected Deposit <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <span style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#64748B', fontWeight: '500' }}>₹</span>
                      <input 
                        type="text" 
                        className={styles.input} 
                        style={{ paddingLeft: '32px' }}
                        value={expectedDeposit}
                        onChange={(e) => setExpectedDeposit(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup} style={{ marginTop: '24px' }}>
                  <label className={styles.label}>Room Amenities</label>
                  <div className={styles.toggleGroup} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'transparent', padding: '0' }}>
                    {Object.keys(amenityIcons).map((amenity) => (
                      <button 
                        key={amenity}
                        className={`${styles.toggleBtn} ${roomAmenities.includes(amenity) ? styles.active : ''}`}
                        style={{ 
                          justifyContent: 'flex-start', 
                          padding: '12px 16px',
                          border: roomAmenities.includes(amenity) ? '2px solid var(--secondary)' : '1px solid var(--border-color)',
                          background: roomAmenities.includes(amenity) ? '#F8FAFC' : 'white',
                          color: '#0F172A',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px'
                        }}
                        onClick={() => toggleRoomAmenity(amenity)}
                      >
                        <span style={{ color: '#64748B', display: 'flex' }}>{amenityIcons[amenity]}</span>
                        <span style={{ fontWeight: '500', fontSize: '14px' }}>{amenity}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <h2 className={styles.formTitle}>Locality Details</h2>
                
                <div className={styles.formGroup}>
                  <label className={styles.label}>Locality / Area <span>*</span></label>
                  <div className={styles.inputWrapper}>
                    <Search size={16} className={styles.searchIcon} />
                    <input 
                      type="text" 
                      className={styles.input} 
                      style={{ paddingLeft: '40px', paddingRight: '170px' }}
                      value={locality}
                      onChange={(e) => setLocality(e.target.value)}
                    />
                    <button className={styles.useLocationBtn}>
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
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Pin Location on Map</label>
                  <div className={styles.mapContainer} style={{ padding: 0 }}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      frameBorder="0" 
                      style={{ border: 0, position: 'absolute', top: 0, left: 0, zIndex: 1 }}
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(locality || 'Anna Nagar, Chennai')}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                      allowFullScreen
                      title="Location Map"
                    ></iframe>

                    <div className={styles.mapSearchWrapper} style={{ zIndex: 10 }}>
                      <Search size={16} className={styles.mapSearchIcon} />
                      <input 
                        type="text" 
                        placeholder="Search your society or nearest landmark" 
                        className={styles.mapSearchInput}
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <h2 className={styles.formTitle}>Provide details about your place</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Place is available for <span>*</span></label>
                  <div className={styles.toggleGroup}>
                    {['Male', 'Female', 'Anyone'].map((opt) => (
                      <button 
                        key={opt}
                        className={`${styles.toggleBtn} ${availableFor === opt ? styles.active : ''}`}
                        onClick={() => setAvailableFor(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Preferred Guests <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <select 
                        className={styles.input} 
                        style={{ appearance: 'none', cursor: 'pointer', color: preferredGuests ? '#0F172A' : '#94A3B8' }}
                        value={preferredGuests}
                        onChange={(e) => setPreferredGuests(e.target.value)}
                      >
                        <option value="" disabled>Select</option>
                        <option value="Student">Student</option>
                        <option value="Working Professional">Working Professional</option>
                        <option value="Both">Both</option>
                      </select>
                      <ChevronDown size={16} className={styles.selectIcon} />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>Available From <span>*</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="date" 
                        className={styles.input} 
                        value={availableFrom}
                        onChange={(e) => setAvailableFrom(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Food Included <span>*</span></label>
                  <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '14px', color: '#0F172A' }}>
                      <input 
                        type="radio" 
                        name="food" 
                        checked={foodIncluded}
                        onChange={() => setFoodIncluded(true)}
                        style={{ accentColor: '#1E293B', width: '16px', height: '16px' }}
                      />
                      Yes
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500', fontSize: '14px', color: '#0F172A' }}>
                      <input 
                        type="radio" 
                        name="food" 
                        checked={!foodIncluded}
                        onChange={() => setFoodIncluded(false)}
                        style={{ accentColor: '#1E293B', width: '16px', height: '16px' }}
                      />
                      No
                    </label>
                  </div>
                  
                  {foodIncluded && (
                    <div style={{ display: 'flex', gap: '24px' }}>
                      {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
                        <label key={meal} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                          <input 
                            type="checkbox"
                            checked={meals.includes(meal)}
                            onChange={() => toggleMeal(meal)}
                            style={{ accentColor: '#1E293B', width: '16px', height: '16px', borderRadius: '4px' }}
                          />
                          {meal}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '32px 0' }}></div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>PG / Hostel Rules</label>
                  <div className={styles.toggleGroup} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'transparent', padding: '0' }}>
                    {['No Smoking', 'No Guardians Stay', "No Girl's Entry", 'No Drinking', 'No Non-Veg', 'No Loud Music'].map((rule) => (
                      <label 
                        key={rule}
                        style={{ 
                          padding: '12px',
                          border: pgRules.includes(rule) ? '2px solid var(--secondary)' : '1px solid var(--border-color)',
                          background: pgRules.includes(rule) ? '#F8FAFC' : 'white',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          color: '#475569',
                          textAlign: 'center'
                        }}
                      >
                        <input 
                          type="checkbox"
                          checked={pgRules.includes(rule)}
                          onChange={() => toggleRule(rule)}
                          style={{ accentColor: '#1E293B', width: '14px', height: '14px', borderRadius: '3px', margin: 0 }}
                        />
                        {rule}
                      </label>
                    ))}
                  </div>
                </div>

                <div className={styles.inputGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Gate Closing Time</label>
                    <div className={styles.inputWrapper}>
                      <Clock size={16} className={styles.searchIcon} />
                      <input 
                        type="text" 
                        className={styles.input} 
                        style={{ paddingLeft: '40px' }}
                        value={gateClosingTime}
                        onChange={(e) => setGateClosingTime(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.label}>PG / Hostel Name <span style={{ color: '#94A3B8', fontWeight: '400', marginLeft: '4px' }}>(optional)</span></label>
                    <div className={styles.inputWrapper}>
                      <input 
                        type="text" 
                        className={styles.input} 
                        placeholder="e.g. Comfort Stay PG"
                        value={pgName}
                        onChange={(e) => setPgName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Description <span style={{ color: '#94A3B8', fontWeight: '400', marginLeft: '4px' }}>(optional)</span></label>
                  <textarea 
                    className={styles.input} 
                    style={{ minHeight: '100px', resize: 'vertical', paddingTop: '12px' }}
                    placeholder="Describe your PG — amenities, location highlights, house rules, nearby landmarks, etc. A good description gets 3× more enquiries."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <h2 className={styles.formTitle}>Provide additional details about your place</h2>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Available Services</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
                    <div>
                      <label style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Laundry</label>
                      <div className={styles.toggleGroup} style={{ padding: 0 }}>
                        {['Yes', 'No'].map((opt) => (
                          <button 
                            key={`laundry-${opt}`}
                            className={`${styles.toggleBtn} ${laundryService === opt ? styles.active : ''}`}
                            onClick={() => setLaundryService(opt)}
                            style={{ flex: 1, textAlign: 'center' }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Room Cleaning</label>
                      <div className={styles.toggleGroup} style={{ padding: 0 }}>
                        {['Yes', 'No'].map((opt) => (
                          <button 
                            key={`cleaning-${opt}`}
                            className={`${styles.toggleBtn} ${roomCleaning === opt ? styles.active : ''}`}
                            onClick={() => setRoomCleaning(opt)}
                            style={{ flex: 1, textAlign: 'center' }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontSize: '13px', color: '#475569', display: 'block', marginBottom: '8px', fontWeight: '500' }}>Warden Facility</label>
                      <div className={styles.toggleGroup} style={{ padding: 0 }}>
                        {['Yes', 'No'].map((opt) => (
                          <button 
                            key={`warden-${opt}`}
                            className={`${styles.toggleBtn} ${wardenFacility === opt ? styles.active : ''}`}
                            onClick={() => setWardenFacility(opt)}
                            style={{ flex: 1, textAlign: 'center' }}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '32px 0' }}></div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Add Directions Tip</label>
                  {showDirectionTip && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F9FF', padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #BAE6FD' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#0369A1' }}>
                        <MapPin size={16} />
                        <span><strong>Don't want calls asking location?</strong> Add directions to reach using landmarks</span>
                      </div>
                      <button onClick={() => setShowDirectionTip(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0284C7', padding: 0, display: 'flex' }}>
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  <textarea 
                    className={styles.input} 
                    style={{ minHeight: '80px', resize: 'vertical', paddingTop: '12px' }}
                    placeholder="Eg. Take the road opposite to Amrita College, take right after 300m, yellow building on left.."
                    value={directions}
                    onChange={(e) => setDirections(e.target.value)}
                  />
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '32px 0' }}></div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Available Amenities</label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {[
                      { id: 'Common TV', icon: Monitor },
                      { id: 'Mess', icon: Utensils },
                      { id: 'Lift', icon: ArrowUpDown },
                      { id: 'Refrigerator', icon: Refrigerator },
                      { id: 'WiFi', icon: Wifi },
                      { id: 'Cooking Allowed', icon: Flame },
                      { id: 'Power Backup', icon: Zap },
                      { id: 'CCTV', icon: Cctv },
                      { id: 'Gym', icon: Dumbbell },
                      { id: 'Laundry', icon: WashingMachine }
                    ].map(({ id, icon: Icon }) => (
                      <button
                        key={id}
                        onClick={() => toggleAmenity(id)}
                        style={{
                          width: '80px',
                          height: '72px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          border: amenities.includes(id) ? '2px solid #0EA5E9' : '1px solid #CBD5E1',
                          borderRadius: '8px',
                          backgroundColor: amenities.includes(id) ? '#F0F9FF' : 'white',
                          cursor: 'pointer',
                          color: amenities.includes(id) ? '#0284C7' : '#64748B',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <Icon size={20} strokeWidth={amenities.includes(id) ? 2.5 : 1.5} />
                        <span style={{ fontSize: '11px', fontWeight: amenities.includes(id) ? '600' : '500', textAlign: 'center', lineHeight: '1.2' }}>
                          {id}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '32px 0' }}></div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Parking Available</label>
                  <div className={styles.inputWrapper} style={{ width: '50%' }}>
                    <select 
                      className={styles.input} 
                      style={{ appearance: 'none', cursor: 'pointer' }}
                      value={parking}
                      onChange={(e) => setParking(e.target.value)}
                    >
                      <option value="None">None</option>
                      <option value="Bike">Bike</option>
                      <option value="Car">Car</option>
                      <option value="Both">Both</option>
                    </select>
                    <ChevronDown size={16} className={styles.selectIcon} />
                  </div>
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div>
                    <h2 className={styles.formTitle} style={{ marginBottom: '4px' }}>Property Photos</h2>
                    <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Listings with 6+ photos get 4× more enquiries</p>
                  </div>
                  <div style={{ background: '#D1FAE5', color: '#059669', padding: '4px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: '600' }}>
                    {images.length} / 6 uploaded
                  </div>
                </div>

                <div className={styles.uploadCard}>
                  <div 
                    className={styles.dropZone}
                    onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                        const newImages = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/')).map(f => URL.createObjectURL(f));
                        setImages(prev => [...prev, ...newImages].slice(0, 6));
                      }
                    }}
                    onClick={() => document.getElementById('pg-file-upload')?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <Camera size={48} className={styles.dropIcon} strokeWidth={1} />
                    <div className={styles.dropTitle}>Drag & drop photos here</div>
                    <div className={styles.dropSubtitle}>Or click to browse — PNG, JPG up to 10MB each</div>
                    <label className={styles.browseBtn} style={{ display: 'inline-block', cursor: 'pointer' }} onClick={(e) => e.stopPropagation()}>
                      Browse Files
                      <input id="pg-file-upload" type="file" multiple accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
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
                    onClick={() => document.getElementById('pg-video-upload')?.click()}
                    style={{ cursor: 'pointer' }}
                  >
                    <Video size={48} className={styles.dropIcon} strokeWidth={1} />
                    <div className={styles.dropTitle}>Drag & drop videos here</div>
                    <div className={styles.dropSubtitle}>Or click to upload (max 100MB) — MP4, MOV</div>
                    <label className={styles.browseBtn} style={{ display: 'inline-block', cursor: 'pointer', marginTop: '16px' }} onClick={(e) => e.stopPropagation()}>
                      Browse Files
                      <input id="pg-video-upload" type="file" accept="video/*" onChange={handleVideoUpload} style={{ display: 'none' }} />
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
              <>
                <h2 className={styles.formTitle} style={{ marginBottom: '24px' }}>Visit Availability</h2>

                <div style={{ marginBottom: '32px' }}>
                  <label className={styles.label}>Availability for Visits</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '12px' }}>
                    <button 
                      className={`${styles.roomTypeBtn} ${visitAvailability === 'Everyday' ? styles.roomTypeBtnActive : ''}`}
                      onClick={() => setVisitAvailability('Everyday')}
                      style={{ padding: '16px', height: 'auto', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Everyday</div>
                      <div style={{ fontSize: '12px', color: visitAvailability === 'Everyday' ? '#1E293B' : '#64748B' }}>Mon–Sun</div>
                    </button>
                    <button 
                      className={`${styles.roomTypeBtn} ${visitAvailability === 'Weekday' ? styles.roomTypeBtnActive : ''}`}
                      onClick={() => setVisitAvailability('Weekday')}
                      style={{ padding: '16px', height: 'auto', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Weekday</div>
                      <div style={{ fontSize: '12px', color: visitAvailability === 'Weekday' ? '#1E293B' : '#64748B' }}>Mon–Fri</div>
                    </button>
                    <button 
                      className={`${styles.roomTypeBtn} ${visitAvailability === 'Weekend' ? styles.roomTypeBtnActive : ''}`}
                      onClick={() => setVisitAvailability('Weekend')}
                      style={{ padding: '16px', height: 'auto', flexDirection: 'column', alignItems: 'center' }}
                    >
                      <div style={{ fontWeight: '600', marginBottom: '4px' }}>Weekend</div>
                      <div style={{ fontSize: '12px', color: visitAvailability === 'Weekend' ? '#1E293B' : '#64748B' }}>Sat, Sun</div>
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: '32px' }}>
                  <label className={styles.label} style={{ marginBottom: '16px' }}>Select Time Schedule</label>
                  
                  <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '8px', display: 'block' }}>Start Time</label>
                      <div className={styles.inputWrapper}>
                        <Clock size={16} className={styles.inputIcon} />
                        <input 
                          type="text" 
                          className={styles.input} 
                          placeholder="e.g. 9:00 AM"
                          style={{ paddingLeft: '40px' }}
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          disabled={availableAnytime}
                        />
                      </div>
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '12px', fontWeight: '600', color: '#475569', marginBottom: '8px', display: 'block' }}>End Time</label>
                      <div className={styles.inputWrapper}>
                        <Clock size={16} className={styles.inputIcon} />
                        <input 
                          type="text" 
                          className={styles.input} 
                          placeholder="e.g. 7:00 PM"
                          style={{ paddingLeft: '40px' }}
                          value={endTime}
                          onChange={(e) => setEndTime(e.target.value)}
                          disabled={availableAnytime}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '14px', color: '#1E293B', marginBottom: '4px' }}>Available Anytime (24/7)</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>No time restriction for visits</div>
                    </div>
                    <div 
                      style={{ 
                        width: '40px', height: '24px', borderRadius: '12px', 
                        backgroundColor: availableAnytime ? '#10B981' : '#E2E8F0',
                        position: 'relative', cursor: 'pointer', transition: '0.3s'
                      }}
                      onClick={() => setAvailableAnytime(!availableAnytime)}
                    >
                      <div style={{ 
                        width: '18px', height: '18px', borderRadius: '9px', backgroundColor: '#FFF',
                        position: 'absolute', top: '3px', left: availableAnytime ? '19px' : '3px', transition: '0.3s',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                      }}></div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 8 && (
              <div style={{ textAlign: 'center', padding: '80px 20px', animation: 'fadeIn 0.5s ease-out' }}>
                <div style={{
                  width: '100px', height: '100px', borderRadius: '50%', background: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
                  boxShadow: '0 0 0 10px rgba(16, 185, 129, 0.2)',
                  animation: 'scaleIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards'
                }}>
                  <Check size={48} color="white" strokeWidth={3} />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1E293B', marginBottom: '12px' }}>PG Property Posted Successfully!</h2>
                <p style={{ color: '#64748B', marginBottom: '32px', fontSize: '16px' }}>Your PG is now live and visible to thousands of potential tenants.</p>
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

          {currentStep !== 8 && (
            <div className={styles.rightSidebar}>
            {currentStep === 1 && (
              <>
                <div className={styles.tipsCard}>
                  <div className={styles.tipsHeader}>
                    <Lightbulb size={18} />
                    Tips for better responses
                  </div>
                  <ul className={styles.tipsList}>
                    <li>Complete all sections for maximum listing visibility</li>
                    <li>Add 10+ photos to get 4× more enquiries</li>
                    <li>Enable WhatsApp for instant replies from tenants</li>
                    <li>Zero brokerage listings rank higher in search results</li>
                    <li>Verified listings get 87% fewer disputes</li>
                  </ul>
                </div>

                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle}>
                    <BarChart2 size={16} color="#F59E0B" />
                    PG Demand in Chennai
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <p className={styles.benchmarkText}>Active PG searches</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>2,340</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981', display: 'flex', alignItems: 'center' }}>
                        <ArrowRight size={12} style={{ transform: 'rotate(-45deg)', marginRight: '2px' }} />
                        +12%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Avg time to get tenant</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>11 days</div>
                    
                    <p className={styles.benchmarkText}>Most searched area</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>OMR · Velachery</div>
                  </div>
                </div>
              </>
            )}
            
            {currentStep === 2 && (
              <>
                <div className={styles.tipsCard}>
                  <div className={styles.tipsHeader}>
                    <Lightbulb size={18} />
                    Get Tenants Faster
                  </div>
                  <ul className={styles.tipsList}>
                    <li>Listings with all room types get 3× more enquiries</li>
                    <li>Adding pricing for each room type helps filter quality tenants</li>
                    <li>Single rooms have the highest demand in Chennai (OMR, Velachery)</li>
                  </ul>
                </div>

                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle} style={{ color: '#334155' }}>
                    <DollarSign size={16} color="#F59E0B" />
                    Rent Benchmark
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <p className={styles.benchmarkText}>Avg single room rent</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>₹12,000/mo</div>
                    
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Your pricing</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#10B981' }}>₹23,232 ✓ In range</span>
                    </div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Deposit standard (2 mo)</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>₹24,000</div>
                  </div>
                </div>
                
                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle} style={{ color: '#334155' }}>
                    <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', color: '#F59E0B' }}>
                      <div style={{ width: '6px', height: '12px', border: '1px solid currentColor', borderRadius: '2px' }}></div>
                      <div style={{ width: '14px', height: '8px', border: '1px solid currentColor', borderRadius: '2px' }}></div>
                    </div>
                    Room Demand Insights
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <p className={styles.benchmarkText}>Single room demand</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Very High</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981', display: 'flex', alignItems: 'center' }}>
                        <ArrowRight size={12} style={{ transform: 'rotate(-45deg)', marginRight: '2px' }} />
                        +22%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Double sharing demand</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                      <span style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>High</span>
                      <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981', display: 'flex', alignItems: 'center' }}>
                        <ArrowRight size={12} style={{ transform: 'rotate(-45deg)', marginRight: '2px' }} />
                        +15%
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Avg days to fill</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>8–14 days</div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <>
                <div className={styles.tipsCard} style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }}>
                  <div className={styles.tipsHeader} style={{ color: '#92400E' }}>
                    <Lightbulb size={18} />
                    Location Tips
                  </div>
                  <ul className={styles.tipsList} style={{ color: '#92400E' }}>
                    <li>Accurate location helps tenants find your PG easily</li>
                    <li>Mention nearby landmarks — colleges, metro, hospitals</li>
                    <li>Properties near metro stations get 45% more enquiries</li>
                  </ul>
                </div>

                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle} style={{ color: '#334155' }}>
                    <MapPin size={16} color="#F59E0B" />
                    Area Insights
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <p className={styles.benchmarkText}>PG searches near OMR</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>680 this week</div>
                    
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Avg commute to IT parks</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>14 minutes</div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Metro connectivity</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#10B981' }}>Excellent</div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 4 && (
              <>
                <div className={styles.tipsCard} style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }}>
                  <div className={styles.tipsHeader} style={{ color: '#92400E' }}>
                    <Lightbulb size={18} />
                    Tenant Preference Tips
                  </div>
                  <ul className={styles.tipsList} style={{ color: '#92400E' }}>
                    <li>Clear rules set expectations and reduce disputes by 60%</li>
                    <li>Student PGs with meals included fill 50% faster</li>
                    <li>Clear gate timings attract serious, responsible tenants</li>
                    <li>A good description increases your ranking in search</li>
                  </ul>
                </div>

                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle} style={{ color: '#334155' }}>
                    <Users size={16} color="#F59E0B" />
                    Tenant Demand Insights
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <p className={styles.benchmarkText}>Most searched category</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Male PG — Student</div>
                    
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Working professional demand</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#10B981', marginBottom: '16px' }}>Very High (+28%)</div>

                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Food included listings</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>2.4× more clicks</div>
                  </div>
                </div>
              </>
            )}

            {currentStep === 5 && (
              <>
                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle} style={{ color: '#334155' }}>
                    <Star size={16} color="#F59E0B" fill="#F59E0B" />
                    Amenity Score
                  </div>
                  
                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '32px', fontWeight: '700', color: '#F59E0B' }}>72%</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>Amenity completeness</div>
                    
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5' }}>
                      Listings with 8+ amenities get <strong>3x more</strong> enquiries
                    </p>
                  </div>
                </div>

                <div className={styles.tipsCard} style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }}>
                  <div className={styles.tipsHeader} style={{ color: '#92400E' }}>
                    <Lightbulb size={18} />
                    Amenity Tips
                  </div>
                  <ul className={styles.tipsList} style={{ color: '#92400E' }}>
                    <li>WiFi is the #1 amenity searched by tenants in Chennai</li>
                    <li>Power backup listings get 30% more preference</li>
                    <li>Gym access is highly valued by working professionals</li>
                  </ul>
                </div>
              </>
            )}

            {currentStep === 6 && (
              <>
                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle} style={{ color: '#334155' }}>
                    <Image size={16} color="#F59E0B" />
                    Photo Quality Score
                  </div>
                  
                  <div style={{ marginTop: '24px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: '700', color: '#94A3B8' }}>0%</div>
                    
                    <div style={{ fontSize: '13px', color: '#64748B', marginTop: '16px', marginBottom: '8px' }}>No photos uploaded yet</div>
                    <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.5' }}>
                      Upload 10+ photos to get 5× more responses from tenants
                    </p>
                  </div>
                </div>

                <div className={styles.tipsCard} style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }}>
                  <div className={styles.tipsHeader} style={{ color: '#92400E' }}>
                    <Lightbulb size={18} />
                    Photo Tips
                  </div>
                  <ul className={styles.tipsList} style={{ color: '#92400E' }}>
                    <li>Photograph rooms in daylight — bright photos get 3× more clicks</li>
                    <li>Include: bedroom, bathroom, common area, building exterior</li>
                    <li>Use landscape orientation for best results</li>
                    <li>Minimum 10 photos recommended for maximum visibility</li>
                  </ul>
                </div>

                <div className={styles.benchmarkCard} style={{ backgroundColor: '#1E293B', borderColor: '#1E293B', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: '-10px', right: '-10px', width: '60px', height: '60px', borderRadius: '30px', backgroundColor: 'rgba(255,255,255,0.05)' }}></div>
                  
                  <div style={{ display: 'inline-block', backgroundColor: '#F59E0B', color: '#FFF', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', marginBottom: '12px' }}>
                    <Award size={10} style={{ display: 'inline-block', marginRight: '4px', marginBottom: '-1px' }} />
                    PREMIUM
                  </div>
                  
                  <h4 style={{ color: '#FFF', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Professional Photography</h4>
                  <p style={{ color: '#94A3B8', fontSize: '12px', lineHeight: '1.5', marginBottom: '16px' }}>
                    Our photographers will visit and shoot your PG professionally. Premium listings get 8× more enquiries.
                  </p>
                  
                  <button style={{ width: '100%', backgroundColor: '#F59E0B', color: '#FFF', fontSize: '13px', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Camera size={14} style={{ marginRight: '6px' }} />
                    Book Photography
                  </button>
                </div>
              </>
            )}

            {currentStep === 7 && (
              <>
                <div className={styles.tipsCard} style={{ backgroundColor: '#FEF3C7', borderColor: '#FDE68A' }}>
                  <div className={styles.tipsHeader} style={{ color: '#92400E' }}>
                    <Lightbulb size={18} />
                    Availability Tips
                  </div>
                  <ul className={styles.tipsList} style={{ color: '#92400E' }}>
                    <li>Owners who offer weekend visits get 60% more tenant conversions</li>
                    <li>Flexible time slots reduce negotiation delays significantly</li>
                    <li>Respond to visit requests within 2 hours for best results</li>
                  </ul>
                </div>

                <div className={styles.benchmarkCard}>
                  <div className={styles.benchmarkTitle} style={{ color: '#334155' }}>
                    Visit Demand Insights
                  </div>
                  
                  <div style={{ marginTop: '16px' }}>
                    <p className={styles.benchmarkText}>Peak visit times</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>Sat & Sun, 10AM–6PM</div>
                    
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>
                    
                    <p className={styles.benchmarkText}>Avg visit to booking</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', marginBottom: '16px' }}>2.4 days</div>
                    
                    <div style={{ width: '100%', height: '1px', backgroundColor: '#E2E8F0', margin: '16px 0' }}></div>

                    <p className={styles.benchmarkText}>Virtual tour option</p>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#10B981' }}>Available on Premium</div>
                  </div>
                </div>
              </>
            )}
          </div>
          )}
        </div>
      </div>
    </div>
  );
}
