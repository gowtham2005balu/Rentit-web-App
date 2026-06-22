"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';
import { Globe, AlertTriangle, X, CheckCircle } from 'lucide-react';

export default function SettingsPage() {
  const router = useRouter();
  const { logout } = useAuth();

  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(false);
  const [marketingNotif, setMarketingNotif] = useState(false);
  
  const [showContact, setShowContact] = useState(true);
  const [profileAnalytics, setProfileAnalytics] = useState(false);
  const [language, setLanguage] = useState('English');
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('rentit_user_settings');
      if (stored) {
        const settings = JSON.parse(stored);
        if (settings.emailNotif !== undefined) setEmailNotif(settings.emailNotif);
        if (settings.smsNotif !== undefined) setSmsNotif(settings.smsNotif);
        if (settings.pushNotif !== undefined) setPushNotif(settings.pushNotif);
        if (settings.marketingNotif !== undefined) setMarketingNotif(settings.marketingNotif);
        if (settings.showContact !== undefined) setShowContact(settings.showContact);
        if (settings.profileAnalytics !== undefined) setProfileAnalytics(settings.profileAnalytics);
        if (settings.language !== undefined) setLanguage(settings.language);
      }
    } catch(e) {
      console.error('Error loading settings', e);
    }
  }, []);

  // Save to local storage when state changes
  useEffect(() => {
    try {
      const settings = {
        emailNotif, smsNotif, pushNotif, marketingNotif,
        showContact, profileAnalytics, language
      };
      localStorage.setItem('rentit_user_settings', JSON.stringify(settings));
    } catch(e) {
      console.error('Error saving settings', e);
    }
  }, [emailNotif, smsNotif, pushNotif, marketingNotif, showContact, profileAnalytics, language]);

  const handleDeleteAccount = () => {
    setShowDeleteModal(true);
  };

  const confirmDeleteAccount = () => {
    // Simulate account deletion
    localStorage.removeItem('rentit_user');
    localStorage.removeItem('rentit_user_settings');
    
    setShowDeleteModal(false);
    setShowSuccessModal(true);
    
    setTimeout(() => {
      logout();
      router.push('/');
    }, 2000);
  };

  return (
    <>
      <Navbar hideSearchBar={true} />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          
          <div className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Settings</h1>
            <p className={styles.pageSubtitle}>Manage your account preferences and security</p>
          </div>

          <div className={styles.gridContainer}>
            {/* LEFT COLUMN */}
            <div className={styles.leftColumn}>
              
              {/* Notification Preferences */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Notification Preferences</h2>
                
                <div className={styles.settingItem}>
                  <div className={styles.settingText}>
                    <h3 className={styles.settingName}>Email Notifications</h3>
                    <p className={styles.settingDesc}>Receive enquiries and updates via email</p>
                  </div>
                  <div className={`${styles.toggle} ${emailNotif ? styles.toggleOn : ''}`} onClick={() => setEmailNotif(!emailNotif)}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.settingItem}>
                  <div className={styles.settingText}>
                    <h3 className={styles.settingName}>SMS Notifications</h3>
                    <p className={styles.settingDesc}>Get SMS alerts for new enquiries</p>
                  </div>
                  <div className={`${styles.toggle} ${smsNotif ? styles.toggleOn : ''}`} onClick={() => setSmsNotif(!smsNotif)}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.settingItem}>
                  <div className={styles.settingText}>
                    <h3 className={styles.settingName}>Push Notifications</h3>
                    <p className={styles.settingDesc}>Browser push notifications for live alerts</p>
                  </div>
                  <div className={`${styles.toggle} ${pushNotif ? styles.toggleOn : ''}`} onClick={() => setPushNotif(!pushNotif)}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.settingItem}>
                  <div className={styles.settingText}>
                    <h3 className={styles.settingName}>Marketing Emails</h3>
                    <p className={styles.settingDesc}>Tips, product updates and offers from RentIt</p>
                  </div>
                  <div className={`${styles.toggle} ${marketingNotif ? styles.toggleOn : ''}`} onClick={() => setMarketingNotif(!marketingNotif)}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>
              </div>

              {/* Privacy Settings */}
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>Privacy Settings</h2>
                
                <div className={styles.settingItem}>
                  <div className={styles.settingText}>
                    <h3 className={styles.settingName}>Show Contact Number</h3>
                    <p className={styles.settingDesc}>Display mobile number on listings</p>
                  </div>
                  <div className={`${styles.toggle} ${showContact ? styles.toggleOn : ''}`} onClick={() => setShowContact(!showContact)}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.settingItem}>
                  <div className={styles.settingText}>
                    <h3 className={styles.settingName}>Profile Analytics</h3>
                    <p className={styles.settingDesc}>Share usage data to improve recommendations</p>
                  </div>
                  <div className={`${styles.toggle} ${profileAnalytics ? styles.toggleOn : ''}`} onClick={() => setProfileAnalytics(!profileAnalytics)}>
                    <div className={styles.toggleKnob}></div>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN */}
            <div className={styles.rightColumn}>
              
              {/* Language & Preferences */}
              <div className={styles.card}>
                <div className={styles.cardHeaderWithIcon}>
                  <Globe size={18} className={styles.cardIcon} color="#3B82F6" />
                  <h2 className={styles.cardTitle} style={{ margin: 0 }}>Language & Preferences</h2>
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Language</label>
                  <select 
                    className={styles.selectInput} 
                    value={language} 
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="English">English</option>
                    <option value="Hindi">Hindi</option>
                  </select>
                </div>
              </div>

              {/* Danger Zone */}
              <div className={`${styles.card} ${styles.dangerCard}`}>
                <div className={styles.cardHeaderWithIcon}>
                  <AlertTriangle size={18} className={styles.dangerIcon} color="#EF4444" />
                  <h2 className={styles.dangerTitle}>Danger Zone</h2>
                </div>
                
                <p className={styles.dangerText}>
                  Once you delete your account, all your listings, enquiries and data will be permanently removed. This action cannot be undone.
                </p>
                
                <button className={styles.deleteBtn} onClick={handleDeleteAccount}>
                  Delete My Account
                </button>
              </div>

            </div>
          </div>
          
        </div>
      </div>

      {showDeleteModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }} onClick={() => setShowDeleteModal(false)}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px', padding: '24px', width: '380px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ background: '#FEE2E2', padding: '12px', borderRadius: '50%' }}>
                <AlertTriangle size={32} color="#EF4444" />
              </div>
            </div>
            
            <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 600, color: '#1E293B' }}>Delete Account?</h3>
            <p style={{ margin: '0 0 24px 0', color: '#64748B', fontSize: '15px', lineHeight: '1.5' }}>
              Are you sure you want to permanently delete your account? All your listings, enquiries, and data will be removed. <b>This action cannot be undone.</b>
            </p>
            
            <div style={{ display: 'flex', gap: '12px' }}>
              <button 
                onClick={() => setShowDeleteModal(false)}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #E2E8F0', background: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDeleteAccount}
                style={{ flex: 1, padding: '12px', borderRadius: '8px', border: 'none', background: '#EF4444', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: '#fff', borderRadius: '12px', padding: '32px', width: '340px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)', textAlign: 'center'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
              <div style={{ background: '#DCFCE7', padding: '12px', borderRadius: '50%' }}>
                <CheckCircle size={36} color="#22C55E" />
              </div>
            </div>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: 600, color: '#1E293B' }}>Account Deleted</h3>
            <p style={{ margin: 0, color: '#64748B', fontSize: '15px' }}>
              Your account has been successfully deleted. Redirecting...
            </p>
          </div>
        </div>
      )}
    </>
  );
}
