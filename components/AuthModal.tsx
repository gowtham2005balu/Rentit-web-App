"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, CheckCircle2, TrendingUp, Search, ArrowRight, ChevronDown, Loader2, Phone, RefreshCcw, MessageCircle, ShieldCheck, Check, Users, Building2, Bed, Briefcase } from 'lucide-react';
import styles from './AuthModal.module.css';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAuth();

  const [step, setStep] = useState<'MOBILE' | 'OTP' | 'PROFILE' | 'WELCOME'>('MOBILE');
  const [userProfile, setUserProfile] = useState<{name?: string, city?: string, createdAt?: string}>({});
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState<'Apartment' | 'Flatmates' | 'PG' | 'Commercial'>('Apartment');
  const [tempUserId, setTempUserId] = useState('');
  const [timer, setTimer] = useState(30);
  const [isOtpExpired, setIsOtpExpired] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Auto-focus OTP fields and handle timer
  useEffect(() => {
    if (step === 'OTP' && otpRefs[0].current) {
      otpRefs[0].current.focus();
    }
  }, [step]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'OTP' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && step === 'OTP') {
      setIsOtpExpired(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sendOtpRequest = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to send OTP');
      }

      setStep('OTP');
      setTimer(30);
      setIsOtpExpired(false);
      setOtp(['', '', '', '', '', '']);
      if (otpRefs[0].current) {
        otpRefs[0].current.focus();
      }

      if (data.otp) {
        console.log(`[Development] OTP for ${mobile} is: ${data.otp}`);
      }
    } catch (err: any) {
      setError(err.message || 'Server error. Is the backend running?');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMobileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    await sendOtpRequest();
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple chars

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5 && otpRefs[index + 1].current) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0 && otpRefs[index - 1].current) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isOtpExpired) {
      setError('OTP has expired. Please request a new one.');
      return;
    }

    const otpString = otp.join('');
    if (otpString.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile, otp: otpString }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to verify OTP');
      }

      setTempUserId(data.userId || mobile);
      setIsSuccess(true);
      setTimeout(async () => {
        setIsSuccess(false);
        // If data.isNewUser is returned, we would check it here. For now, we transition to PROFILE 
        // to show the new UI flow as requested. If they already have a name, we can skip it.
        if (data.isNewUser !== false) {
          setStep('PROFILE');
        } else {
          try {
            const meRes = await fetch('/api/auth/me', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId: data.userId })
            });
            if (meRes.ok) {
              const meData = await meRes.json();
              setUserProfile(meData.user || {});
            } else {
              // Fallback to local storage if DB is not connected
              const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${data.userId || mobile}`) || '{}');
              setUserProfile(localProfile);
            }
          } catch (e) {
            // Fallback to local storage if DB is not connected
            const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${data.userId || mobile}`) || '{}');
            setUserProfile(localProfile);
          }
          login(data.userId || mobile);
          setStep('WELCOME');
        }
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'Server error. Is the backend running?');
      setOtp(['', '', '', '', '', '']);
      if (otpRefs[0].current) otpRefs[0].current.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !city) {
      setError('Please provide your name and city');
      return;
    }

    setIsLoading(true);
    setError('');
    try {
      // Save to localStorage immediately so UI always works
      const profileData = { name, email, city, createdAt: new Date().toISOString() };
      localStorage.setItem(`rentit_user_profile_${tempUserId}`, JSON.stringify(profileData));
      setUserProfile(profileData);

      // Save to database (Render backend → Neon DB fallback)
      try {
        const res = await fetch('/api/auth/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: tempUserId, name, email, city }),
        });
        const data = await res.json();
        console.log('[Profile Save]', data.message || 'Saved');
      } catch (apiErr) {
        console.warn('[Profile Save] API call failed, data saved to localStorage');
      }

      login(tempUserId);
      setStep('WELCOME');
      
      // Reset state for next time
      setOtp(['', '', '', '', '', '']);
      setMobile('');
      setName('');
      setEmail('');
      setCity('');

    } catch (err: any) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'WELCOME') {
    const initials = userProfile.name ? userProfile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'U';
    const dateStr = userProfile.createdAt ? new Date(userProfile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'recently';
    
    return (
      <div className={styles.modalOverlay} onClick={(e) => { if (e.target === e.currentTarget) { onClose(); setStep('MOBILE'); } }}>
        <div className={styles.welcomeModalContent}>
          <div className={styles.welcomeCheckCircle}>
            <Check size={40} strokeWidth={3} />
          </div>
          
          <div className={styles.welcomeProfileBadge}>
            <div className={styles.welcomeAvatar}>{initials}</div>
            <div className={styles.welcomeUserInfo}>
              <div className={styles.welcomeUserName}>
                Welcome Back, {userProfile.name ? userProfile.name.split(' ')[0] : 'User'}! 👋
              </div>
              <div className={styles.welcomeUserSubtitle}>
                Member since {dateStr} · {userProfile.city || 'Chennai'}
              </div>
            </div>
          </div>
          
          <div className={styles.welcomeMessage}>
            You're all set! Let's find your next perfect property. We've got <span className={styles.welcomeBoldText}>127 new listings</span> since your last visit.
          </div>
          
          <div className={styles.welcomeGrid}>
            <div className={styles.welcomeGridCard}>
              <div className={`${styles.welcomeGridIcon} ${styles.iconApt}`}>🏢</div>
              <div className={styles.welcomeGridText}>
                <div className={styles.welcomeGridTitle}>Browse Apartments</div>
                <div className={styles.welcomeGridSubtitle}>2,340 available</div>
              </div>
              <ChevronDown className={styles.welcomeGridArrow} style={{ transform: 'rotate(-90deg)' }} size={16} />
            </div>
            
            <div className={styles.welcomeGridCard}>
              <div className={`${styles.welcomeGridIcon} ${styles.iconPg}`}>🛏️</div>
              <div className={styles.welcomeGridText}>
                <div className={styles.welcomeGridTitle}>Browse PGs</div>
                <div className={styles.welcomeGridSubtitle}>680 in Chennai</div>
              </div>
              <ChevronDown className={styles.welcomeGridArrow} style={{ transform: 'rotate(-90deg)' }} size={16} />
            </div>

            <div className={styles.welcomeGridCard}>
              <div className={`${styles.welcomeGridIcon} ${styles.iconComm}`}>💼</div>
              <div className={styles.welcomeGridText}>
                <div className={styles.welcomeGridTitle}>Commercial Properties</div>
                <div className={styles.welcomeGridSubtitle}>283 available</div>
              </div>
              <ChevronDown className={styles.welcomeGridArrow} style={{ transform: 'rotate(-90deg)' }} size={16} />
            </div>

            <div className={styles.welcomeGridCard}>
              <div className={`${styles.welcomeGridIcon} ${styles.iconFlat}`}>👥</div>
              <div className={styles.welcomeGridText}>
                <div className={styles.welcomeGridTitle}>Find Flatmates</div>
                <div className={styles.welcomeGridSubtitle}>156 listings</div>
              </div>
              <ChevronDown className={styles.welcomeGridArrow} style={{ transform: 'rotate(-90deg)' }} size={16} />
            </div>
          </div>
          
          <button className={styles.lookOutBtn} onClick={() => { onClose(); setStep('MOBILE'); }}>
            Look out properties
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.modalOverlay} onClick={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}>
      <div className={styles.modalContent}>

        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.logoSection}>
            <span className={styles.logoTextWhite}>RENT</span>
            <span className={styles.logoTextOrange}>IT</span>
          </div>

          <div className={styles.leftMainContent}>
            {step === 'PROFILE' ? (
              <>
                <h1 className={styles.mainTitle}>
                  Tell Us<br />
                  a Little About<br />
                  <span className={styles.orangeText}>Yourself</span>
                </h1>
                <p className={styles.subtitle}>
                  Help us personalize your property search and find the perfect matches for you.
                </p>

                <div className={styles.featuresList}>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>Personalized recommendations</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>AI-matched properties for you</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>Saved searches & alerts</span>
                  </div>
                </div>
              </>
            ) : step === 'MOBILE' ? (
              <>
                <h1 className={styles.mainTitle}>
                  Find Your<br />
                  <span className={styles.orangeText}>Perfect Home</span><br />
                  in Minutes
                </h1>
                <p className={styles.subtitle}>
                  Verified properties, zero brokerage, and direct owner contact — all in one place.
                </p>

                <div className={styles.featuresList}>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>100% Verified Listings</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>Instant Owner Contact</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>AI-Powered Property Search</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>Schedule Visits Easily</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className={styles.mainTitle}>
                  One Step<br />
                  Away from<br />
                  <span className={styles.orangeText}>Your Home</span>
                </h1>
                <p className={styles.subtitle}>
                  Verify your number to access thousands of verified properties across India.
                </p>

                <div className={styles.featuresList}>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>Verified Listings Only</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>Direct Owner Contact</span>
                  </div>
                  <div className={styles.featureItem}>
                    <CheckCircle2 size={20} className={styles.checkIcon} />
                    <span>Zero Brokerage</span>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statBox}>
              <span className={styles.statValue}>50K+</span>
              <span className={styles.statLabel}>Happy Users</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>10K+</span>
              <span className={styles.statLabel}>Active Listings</span>
            </div>
            <div className={styles.statBox}>
              <span className={styles.statValue}>₹0</span>
              <span className={styles.statLabel}>Brokerage</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.rightPanel}>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={20} strokeWidth={2} />
          </button>

          <div className={styles.rightHeader}>
            <h2 className={styles.rightTitle}>
              {step === 'PROFILE'
                ? 'Complete Your Profile'
                : step === 'MOBILE'
                  ? 'Continue with Mobile Number'
                  : 'Verify Mobile Number'}
            </h2>
            <p className={styles.rightSubtitle}>
              {step === 'PROFILE'
                ? 'Help us personalise your experience — takes only 30 seconds.'
                : step === 'MOBILE'
                  ? 'Enter your phone number to sign in or create your account.'
                  : 'Enter the 6-digit OTP sent to your number.'}
            </p>
          </div>

          {step === 'PROFILE' ? (
            <form onSubmit={handleProfileSubmit}>
              <div className={styles.inputRow}>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Full Name <span className={styles.sectionLabelRequired}></span></label>
                  <input type="text" className={styles.textInput} placeholder="Arjun Sharma" value={name} onChange={(e) => setName(e.target.value)} disabled={isLoading} />
                </div>
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email Address <span className={styles.optionalText}>(Optional)</span></label>
                  <input type="email" className={styles.textInput} placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isLoading} />
                </div>
              </div>

              <div className={styles.inputGroup} style={{ marginBottom: '20px' }}>
                <label className={styles.inputLabel}>City <span className={styles.sectionLabelRequired}></span></label>
                <input type="text" className={styles.textInput} placeholder="Chennai" value={city} onChange={(e) => setCity(e.target.value)} disabled={isLoading} />
              </div>

              {error && <div className={styles.errorText}>{error}</div>}

              <button type="submit" className={styles.orangeContinueBtn} disabled={isLoading || !name || !city}>
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Start Exploring Rentit'}
              </button>

              <div className={styles.subButtonText}>
                You can always update your preferences later
              </div>
            </form>
          ) : step === 'MOBILE' ? (
            <form onSubmit={handleMobileSubmit}>

              <div className={`${styles.sectionLabel} ${styles.sectionLabelRequired}`}>Mobile Number</div>
              <div className={styles.mobileInputGroup}>
                <div className={styles.countryCode}>
                  <span className={styles.flag}>🇮🇳</span>
                  <span>+91</span>
                  <ChevronDown size={14} color="#9ca3af" style={{ marginLeft: '4px' }} />
                </div>
                <input
                  type="tel"
                  placeholder="Enter mobile number"
                  className={styles.mobileInput}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  autoFocus
                />
              </div>

              {error && <div className={styles.errorText}>{error}</div>}

              <button type="submit" className={styles.continueBtn} disabled={isLoading || mobile.length < 10}>
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : (
                  <>
                    <ArrowRight size={18} />
                    Continue
                  </>
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>

              <div className={styles.numberConfirmBlock}>
                <div className={styles.numberConfirmLeft}>
                  <CheckCircle2 size={18} className={styles.successIcon} />
                  <span>+91 {mobile || '98765 43210'}</span>
                </div>
                <button
                  type="button"
                  className={styles.changeNumberBtn}
                  onClick={() => { setStep('MOBILE'); setOtp(['', '', '', '', '', '']); setError(''); }}
                >
                  Change Number
                </button>
              </div>



              <div className={styles.sectionLabel}>
                {isSuccess ? (
                  <>OTP VERIFIED <Check size={14} style={{ display: 'inline', marginLeft: 4 }} /></>
                ) : (
                  <>
                    Enter OTP <span style={{ color: '#9ca3af', fontWeight: 500 }}>(6-digit code)</span>
                  </>
                )}
              </div>

              {isSuccess && (
                <div className={styles.successBanner}>
                  <ShieldCheck size={18} />
                  Mobile number verified successfully! Redirecting...
                </div>
              )}

              <div className={styles.otpContainer}>
                {isSuccess ? (
                  Array(6).fill(0).map((_, idx) => (
                    <div key={idx} className={styles.successBox}>
                      <Check size={24} strokeWidth={3} />
                    </div>
                  ))
                ) : (
                  otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={otpRefs[idx]}
                      type="text"
                      inputMode="numeric"
                      className={styles.otpInput}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value.replace(/\D/g, ''))}
                      onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                      disabled={isLoading || isSuccess}
                    />
                  ))
                )}
              </div>

              {error && <div className={styles.errorText}>{error}</div>}

              {!isSuccess && (
                <>
                  <button type="submit" className={styles.continueBtn} disabled={isLoading || otp.join('').length < 6}>
                    {isLoading ? <Loader2 size={18} className="animate-spin" /> : 'Verify & Continue'}
                  </button>

                  <div className={styles.resendRow}>
                    <span>Resend OTP in</span>
                    <span className={styles.resendTimer}>00:{timer < 10 ? `0${timer}` : timer}</span>
                  </div>

                  <div className={styles.actionButtonsRow}>
                    <button 
                      type="button" 
                      className={styles.actionBtn}
                      onClick={sendOtpRequest}
                      disabled={!isOtpExpired && timer > 0}
                      style={{ opacity: (!isOtpExpired && timer > 0) ? 0.5 : 1, cursor: (!isOtpExpired && timer > 0) ? 'not-allowed' : 'pointer' }}
                    >
                      <RefreshCcw size={16} />
                      Resend OTP
                    </button>
                  </div>
                </>
              )}

            </form>
          )}

          {step === 'MOBILE' && (
            <>
              <div className={styles.divider}></div>

              <div className={styles.trendingSection}>
                <div className={styles.trendingHeader}>
                  <TrendingUp size={14} className={styles.trendingIcon} />
                  TRENDING SEARCHES
                </div>
                <div className={styles.trendingTags}>
                  <span className={styles.trendingTag}>
                    <Search size={12} className={styles.tagSearchIcon} />
                    2 BHK in Velachery
                  </span>
                  <span className={styles.trendingTag}>
                    <Search size={12} className={styles.tagSearchIcon} />
                    Girls PG in T Nagar
                  </span>
                  <span className={styles.trendingTag}>
                    <Search size={12} className={styles.tagSearchIcon} />
                    Office Space in OMR
                  </span>
                  <span className={styles.trendingTag}>
                    <Search size={12} className={styles.tagSearchIcon} />
                    Flatmate near Anna Nagar
                  </span>
                </div>
              </div>
            </>
          )}

          <div className={styles.footer}>
            By continuing, you agree to our <a href="/terms-of-service" className={styles.footerLink}>Terms of Service</a> and <a href="/privacy-policy" className={styles.footerLink}>Privacy Policy</a>. Your data is secured and never shared.
          </div>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
