"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import { Home, MapPin, Calendar, Clock, X, ArrowRight, Heart, Check, AlertTriangle, Info, Ban } from 'lucide-react';
import styles from './page.module.css';
import { useWishlist } from '../../context/WishlistContext';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const MOCK_VISITS = [
  {
    id: 1,
    title: '2 BHK Apartment',
    location: 'Sholinganallur, Chennai',
    date: 'Sat, 11 Apr 2026',
    time: '10:00 AM',
    image: '/elite_premium_apartment.png'
  },
  {
    id: 2,
    title: '2 BHK Apartment',
    location: 'Sholinganallur, Chennai',
    date: 'Sat, 11 Apr 2026',
    time: '10:00 AM',
    image: '/luxury_bedroom.png'
  },
  {
    id: 3,
    title: '1 BHK Furnished Flat',
    location: 'Anna Nagar, Chennai',
    date: 'Sun, 12 Apr 2026',
    time: '11:30 AM',
    image: '/modern_kitchen.png'
  }
];

const MOCK_SHORTLIST = [
  {
    id: 1,
    title: 'Elite Premium Apartment',
    location: 'Anna Nagar, Chennai',
    price: '₹38,000',
    tags: ['3 BHK', '1450 sqft', 'Semi-Furnished'],
    image: '/elite_premium_apartment.png'
  },
  {
    id: 2,
    title: 'Luxury Skyline Suite',
    location: 'Sholinganallur, Chennai',
    price: '₹45,000',
    tags: ['4 BHK', '2100 sqft', 'Fully-Furnished'],
    image: '/luxury_bedroom.png'
  },
  {
    id: 3,
    title: 'Modern Metro Villa',
    location: 'Adyar, Chennai',
    price: '₹55,000',
    tags: ['4 BHK', '2500 sqft', 'Fully-Furnished'],
    image: '/modern_kitchen.png'
  }
];

const generateUpcomingDates = () => {
  const dates = [];
  for (let i = 1; i <= 5; i++) {
    const d = new Date();
    d.setDate(d.getDate() + i);
    dates.push({
      id: i,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNum: d.getDate().toString(),
      month: d.toLocaleDateString('en-US', { month: 'short' }),
      year: d.getFullYear()
    });
  }
  return dates;
};

const MOCK_DATES = generateUpcomingDates();

const MOCK_TIMES = [
  '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'
];

const CANCEL_REASONS = [
  'Found a better property',
  'Change of plans',
  'Owner not responding',
  'Price not suitable',
  'Schedule conflict',
  'Other'
];

export default function VisitsPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('Visits');
  const [visits, setVisits] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState<any>(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStep, setModalStep] = useState<'reschedule' | 'success'>('reschedule');
  const [selectedDate, setSelectedDate] = useState(4); // ID 4 = Fri 10 Apr
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelStep, setCancelStep] = useState<'reason' | 'confirm' | 'success'>('reason');
  const [cancelReason, setCancelReason] = useState('Found a better property');

  useEffect(() => {
    if (window.location.search.includes('tab=shortlist')) {
      setActiveTab('Shortlisted');
    }
    
    const searchParams = new URLSearchParams(window.location.search);
    const scheduleId = searchParams.get('schedule');
    
    // Fetch real properties for visits
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          let realVisits = data.slice(0, 4).map((p: any, idx: number) => {
             let img = '/elite_premium_apartment.png';
             if (p.image_url) img = p.image_url;
             else if (p.images) {
               try {
                 const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
                 if (Array.isArray(imgs) && imgs.length > 0) img = imgs[0];
               } catch(e) {}
             }
             return {
               id: String(p.id || p._id || p._key || `visit-${idx}`),
               title: p.title || 'Premium Property',
               location: p.location_address || p.location || 'Chennai',
               date: p.date || '--',
               time: p.time || '--',
               image: img
             };
          });

          if (scheduleId) {
            const specificProperty = data.find((p: any) => String(p.id || p._id || p._key) === scheduleId);
            if (specificProperty) {
              const tomorrow = MOCK_DATES[0];
              let imageUrl = '/elite_premium_apartment.png';
              if (specificProperty.image_url) imageUrl = specificProperty.image_url;
              else if (specificProperty.images) {
                try {
                  const imgs = typeof specificProperty.images === 'string' ? JSON.parse(specificProperty.images) : specificProperty.images;
                  if (Array.isArray(imgs) && imgs.length > 0) imageUrl = imgs[0];
                } catch(e) {}
              }
              const newVisit = {
                 id: scheduleId,
                 title: specificProperty.title || 'Premium Property',
                 location: specificProperty.location_address || specificProperty.location || 'Chennai',
                 date: specificProperty.date || '--',
                 time: specificProperty.time || '--',
                 image: imageUrl
              };
              realVisits = [newVisit, ...realVisits.filter(v => v.id !== scheduleId)];
            }
          }

          setVisits(realVisits);
        }
      })
      .catch(err => console.error("Error fetching visits:", err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar hideSearchBar={true} />
      
      <div className={styles.mainContainer}>
        <h1 className={styles.pageTitle}>My Activity</h1>
        
        {/* Tabs */}
        <div className={styles.tabsContainer}>
          <div 
            className={`${styles.tab} ${activeTab === 'Shortlisted' ? styles.active : ''}`}
            onClick={() => setActiveTab('Shortlisted')}
          >
            <span>Shortlisted</span>
            <span className={styles.badge}>{wishlistItems.length}</span>
          </div>
          <div 
            className={`${styles.tab} ${activeTab === 'Visits' ? styles.active : ''}`}
            onClick={() => setActiveTab('Visits')}
          >
            <span>Visits</span>
            <span className={styles.badge}>4</span>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'Shortlisted' && (
          <div className={styles.cardsGrid}>
            {wishlistItems.length === 0 ? (
              <div style={{ padding: '40px 0', textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>Your shortlist is empty</h3>
                <p style={{ color: '#64748B' }}>Start exploring properties and heart them to save here.</p>
              </div>
            ) : (
              wishlistItems.map((property, idx) => (
                <div key={property.title + idx} className={styles.shortlistCard}>
                  <div className={styles.shortlistImageWrapper}>
                    <img src={property.image} alt={property.title} className={styles.shortlistImage} />
                    <button 
                      className={styles.heartBtn}
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromWishlist(property.title);
                      }}
                    >
                      <Heart size={16} fill="#EF4444" color="#EF4444" />
                    </button>
                  </div>
                  <div className={styles.shortlistContent}>
                    <div className={styles.shortlistTitle}>{property.title}</div>
                    <div className={styles.shortlistLocation}>{property.location}</div>
                    
                    <div className={styles.shortlistPrice}>
                      {property.price} <small>/month</small>
                    </div>
                    
                    <div className={styles.shortlistTags}>
                      {property.features?.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className={styles.tag}>{tag}</span>
                      ))}
                    </div>
                    
                    <div className={styles.shortlistActions}>
                      <button 
                        className={`${styles.btn} ${styles.btnViewDetailsDark}`}
                        onClick={() => router.push(`/property/${property.id || (property as any)._id || property.title}`)}
                      >
                        View Details
                      </button>
                      <button 
                        className={`${styles.btn} ${styles.btnRemove}`}
                        onClick={(e) => {
                          e.preventDefault();
                          removeFromWishlist(property.title);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'Visits' && (
          <div className={styles.cardsGrid}>
            {isLoading ? (
              <div style={{ padding: '40px 0', textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>Loading your visits...</h3>
              </div>
            ) : visits.length === 0 ? (
              <div style={{ padding: '40px 0', textAlign: 'center', width: '100%', gridColumn: '1 / -1' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#1E293B', marginBottom: '8px' }}>No visits scheduled</h3>
                <p style={{ color: '#64748B' }}>You have not scheduled any property visits yet.</p>
              </div>
            ) : visits.map((visit) => (
              <div key={visit.id} className={styles.card}>
                <div className={styles.cardImagePlaceholder}>
                  <img src={visit.image} alt={visit.title} style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px'}} />
                </div>
                
                <div className={styles.cardTitle}>{visit.title}</div>
                <div className={styles.cardLocation}>
                  <MapPin size={14} />
                  {visit.location}
                </div>
                
                <div className={styles.cardScheduleInfo}>
                  <div className={styles.scheduleItem}>
                    <Calendar size={14} />
                    {visit.date}
                  </div>
                  <div className={styles.scheduleItem}>
                    <Clock size={14} />
                    {visit.time}
                  </div>
                </div>
                
                <div className={styles.cardActions}>
                  <button 
                    className={`${styles.btn} ${styles.btnViewDetails}`}
                    onClick={() => router.push(`/property/${visit.id}`)}
                  >
                    View Details
                  </button>
                  <button 
                    className={`${styles.btn} ${styles.btnReschedule}`}
                    onClick={() => {
                      setSelectedVisit(visit);
                      if (visit.time) setSelectedTime(visit.time);
                      const matchedDate = MOCK_DATES.find(d => visit.date && visit.date.includes(d.dayNum) && visit.date.includes(d.month));
                      if (matchedDate) setSelectedDate(matchedDate.id);
                      else setSelectedDate(MOCK_DATES[0].id);
                      setIsModalOpen(true);
                    }}
                  >
                    Reschedule
                  </button>
                  <button 
                    className={`${styles.btn} ${styles.btnCancel}`}
                    onClick={() => {
                      setSelectedVisit(visit);
                      setIsCancelModalOpen(true);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reschedule Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={() => {
          setIsModalOpen(false);
          setTimeout(() => setModalStep('reschedule'), 300); // reset step after closing
        }}>
          <div className={`${styles.modalContent} ${modalStep === 'success' ? styles.modalContentSuccess : ''}`} onClick={(e) => e.stopPropagation()}>
            
            {modalStep === 'reschedule' && (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitleWrapper}>
                    <div className={styles.modalTitle}>Reschedule Visit</div>
                    <div className={styles.modalSubtitle}>{selectedVisit?.title}</div>
                  </div>
                  <button className={styles.modalCloseBtn} onClick={() => setIsModalOpen(false)}>
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div className={styles.sectionTitle}>SELECT NEW DATE</div>
                <div className={styles.dateScroller}>
                  {MOCK_DATES.map((d) => (
                    <div 
                      key={d.id} 
                      className={`${styles.dateItem} ${selectedDate === d.id ? styles.active : ''}`}
                      onClick={() => setSelectedDate(d.id)}
                    >
                      <div className={styles.dateDayName}>{d.dayName}</div>
                      <div className={styles.dateDayNum}>{d.dayNum}</div>
                      <div className={styles.dateMonth}>{d.month}</div>
                    </div>
                  ))}
                </div>

                <div className={styles.sectionTitle}>SELECT NEW TIME</div>
                <div className={styles.timeGrid}>
                  {MOCK_TIMES.map((time) => (
                    <div 
                      key={time} 
                      className={`${styles.timeItem} ${selectedTime === time ? styles.active : ''}`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </div>
                  ))}
                </div>

                <div className={styles.timeInfoText}>
                  <Clock size={14} />
                  {MOCK_DATES.find(d => d.id === selectedDate)?.dayName}, {MOCK_DATES.find(d => d.id === selectedDate)?.dayNum} {MOCK_DATES.find(d => d.id === selectedDate)?.month} {MOCK_DATES.find(d => d.id === selectedDate)?.year} · {selectedTime}
                </div>

                <button 
                  className={styles.btnConfirm}
                  onClick={async () => {
                    setModalStep('success');
                    if (userId && selectedVisit) {
                      const newDate = `${MOCK_DATES.find(d => d.id === selectedDate)?.dayName}, ${MOCK_DATES.find(d => d.id === selectedDate)?.dayNum} ${MOCK_DATES.find(d => d.id === selectedDate)?.month} ${MOCK_DATES.find(d => d.id === selectedDate)?.year}`;
                      await fetch('/api/notifications', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          userId,
                          title: 'Visit Rescheduled',
                          message: `Your visit for ${selectedVisit.title} has been rescheduled to ${newDate} at ${selectedTime}.`,
                          type: 'Premium'
                        })
                      });
                    }
                  }}
                >
                  Confirm Reschedule <ArrowRight size={16} />
                </button>
              </>
            )}

            {modalStep === 'success' && (
              <div className={styles.successContainer}>
                <div className={styles.successIconCircle}>
                  <Check size={32} strokeWidth={3} />
                </div>
                <div className={styles.successTextWrapper}>
                  <div className={styles.successTitle}>Visit Rescheduled!</div>
                  <div className={styles.successSubtitle}>
                    Your visit for <strong>{selectedVisit?.title}</strong> has been rescheduled to <strong>{MOCK_DATES.find(d => d.id === selectedDate)?.dayName}, {MOCK_DATES.find(d => d.id === selectedDate)?.dayNum} {MOCK_DATES.find(d => d.id === selectedDate)?.month} {MOCK_DATES.find(d => d.id === selectedDate)?.year}</strong> at <strong>{selectedTime}</strong> and confirmed.
                  </div>
                </div>
                <button 
                  className={styles.btnDone}
                  onClick={() => {
                    setIsModalOpen(false);
                    if (selectedVisit) {
                      setVisits(prev => prev.map(v => v.id === selectedVisit.id ? { ...v, time: selectedTime, date: `${MOCK_DATES.find(d => d.id === selectedDate)?.dayName}, ${MOCK_DATES.find(d => d.id === selectedDate)?.dayNum} ${MOCK_DATES.find(d => d.id === selectedDate)?.month} ${MOCK_DATES.find(d => d.id === selectedDate)?.year}` } : v));
                    }
                    setTimeout(() => setModalStep('reschedule'), 300);
                  }}
                >
                  Done
                </button>
              </div>
            )}
            
          </div>
        </div>
      )}

      {/* Cancel Visit Modal */}
      {isCancelModalOpen && (
        <div className={styles.modalOverlay} onClick={() => {
          setIsCancelModalOpen(false);
          setTimeout(() => setCancelStep('reason'), 300);
        }}>
          <div className={`${styles.modalContent} ${cancelStep === 'confirm' ? styles.modalContentConfirm : ''}`} onClick={(e) => e.stopPropagation()}>
            
            {cancelStep === 'reason' && (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitleWrapper}>
                    <div className={styles.modalTitle}>Cancel Visit</div>
                    <div className={styles.modalSubtitle}>{selectedVisit?.title}</div>
                  </div>
                  <button className={styles.modalCloseBtn} onClick={() => setIsCancelModalOpen(false)}>
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div className={styles.cancelReasonText}>
                  Please let us know why you're cancelling. This helps owners improve.
                </div>

                <div className={styles.radioList}>
                  {CANCEL_REASONS.map((reason) => (
                    <div 
                      key={reason}
                      className={`${styles.radioOption} ${cancelReason === reason ? styles.radioOptionSelected : ''}`}
                      onClick={() => setCancelReason(reason)}
                    >
                      <div className={`${styles.radioCircle} ${cancelReason === reason ? styles.radioCircleSelected : ''}`}>
                        {cancelReason === reason && <div className={styles.radioInnerCircle}></div>}
                      </div>
                      <div className={styles.radioLabel}>{reason}</div>
                    </div>
                  ))}
                </div>

                <button 
                  className={styles.btnDone}
                  onClick={() => setCancelStep('confirm')}
                >
                  Continue <ArrowRight size={16} />
                </button>
              </>
            )}

            {cancelStep === 'confirm' && (
              <>
                <div className={styles.modalHeader}>
                  <div className={styles.modalTitleWrapper}>
                    <div className={styles.modalTitleRed} style={{fontSize: '20px', fontWeight: '700', color: '#EF4444'}}>Confirm Cancellation</div>
                    <div className={styles.modalSubtitle}>{selectedVisit?.title}</div>
                  </div>
                  <button className={styles.modalCloseBtn} onClick={() => setIsCancelModalOpen(false)}>
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <div className={styles.cancelImageWrapper}>
                  <img src={selectedVisit?.image || "/modern_kitchen.png"} alt="Property" className={styles.cancelImage} />
                  <div className={styles.cancelledStamp}>CANCELLING</div>
                </div>

                <div className={styles.cardTitle} style={{marginTop: '16px', marginBottom: '8px', fontSize: '16px', color: '#111827', fontWeight: '700'}}>
                  {selectedVisit?.title}
                </div>
                <div className={styles.cardScheduleInfo} style={{marginBottom: '0'}}>
                  <div className={styles.scheduleItem}>
                    <Calendar size={14} /> {selectedVisit?.date}
                  </div>
                  <div className={styles.scheduleItem}>
                    <Clock size={14} /> {selectedVisit?.time}
                  </div>
                </div>

                <div className={styles.warningAlertLight}>
                  <AlertTriangle size={16} style={{flexShrink: 0}} />
                  <div>Reason: <strong>{cancelReason}</strong></div>
                </div>

                <div className={styles.warningAlertHeavy}>
                  <Info size={16} style={{flexShrink: 0}} />
                  The owner will be notified. You can reschedule anytime from the Visits tab.
                </div>

                <div className={styles.actionButtonGroup}>
                  <button 
                    className={styles.btnKeepVisit}
                    onClick={() => {
                      setIsCancelModalOpen(false);
                      setTimeout(() => setCancelStep('reason'), 300);
                    }}
                  >
                    Keep Visit
                  </button>
                  <button 
                    className={styles.btnYesCancel}
                    onClick={() => setCancelStep('success')}
                  >
                    <Ban size={16} /> Yes, Cancel
                  </button>
                </div>
              </>
            )}

            {cancelStep === 'success' && (
              <div className={styles.successContainer}>
                <div className={styles.successIconCircleCancel}>
                  <Check size={32} strokeWidth={3} />
                </div>
                <div className={styles.successTextWrapper}>
                  <div className={styles.successTitle}>Visit Cancelled</div>
                  <div className={styles.successSubtitle}>
                    Your visit for <strong>{selectedVisit?.title}</strong> has been successfully cancelled. The owner will be notified.
                  </div>
                </div>
                <button 
                  className={styles.btnDone}
                  onClick={() => {
                    if (selectedVisit) {
                      // Apply removal animation/state logic
                      setVisits(prev => prev.filter(v => v.id !== selectedVisit.id));
                    }
                    setIsCancelModalOpen(false);
                    setTimeout(() => setCancelStep('reason'), 300);
                  }}
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
