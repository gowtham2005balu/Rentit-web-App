"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { ChevronDown, Check, X as XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function EditProfile() {
  const router = useRouter();
  const { userId } = useAuth();
  const [activeTab, setActiveTab] = useState('Subscription Management');
  const [userProfile, setUserProfile] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    city: '',
    photo: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [realTransactions, setRealTransactions] = useState<any[]>([]);
  const [loadingTx, setLoadingTx] = useState(false);

  const fetchProfile = async (idToFetch: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: idToFetch })
      });
      const data = await res.json();

      if (res.ok && data.user) {
        setUserProfile(data.user);
        setFormData({
          name: data.user.name || '',
          email: data.user.email || '',
          mobile: data.user.mobile || idToFetch,
          city: data.user.city || '',
          photo: data.user.photo || ''
        });
      } else {
        // New user or not found, just set userProfile to empty object to stop 'Loading...' state
        setUserProfile({ name: 'New User' });
      }
    } catch (error) {
      console.error("Failed to load user profile", error);
      setUserProfile({ name: 'New User' });
    }
  };

  useEffect(() => {
    const defaultUserId = userId || localStorage.getItem('rentit_userId');
    if (defaultUserId) {
      fetchProfile(defaultUserId);
    }
  }, [userId]);

  // Effect to lookup user when mobile number reaches 10 digits
  useEffect(() => {
    if (formData.mobile && formData.mobile.length === 10) {
      // Don't refetch if it's the exact same user we already loaded
      if (userProfile && userProfile.mobile === formData.mobile) return;
      fetchProfile(formData.mobile);
    }
  }, [formData.mobile]);

  useEffect(() => {
    if (activeTab === 'Your Payment') {
      const activeUserId = userId || localStorage.getItem('rentit_userId');
      if (activeUserId) {
        setLoadingTx(true);
        fetch(`/api/notifications?userId=${activeUserId}`)
          .then(res => res.json())
          .then(data => {
            if (data.notifications) {
              const txs = data.notifications
                .filter((n: any) => n.type === 'Premium' && n.title === 'Payment Successful')
                .map((n: any) => {
                  // Message format: "Premium+ Plan payment of ₹6,311 was processed successfully. Invoice #INV-1234"
                  const match = n.message.match(/(.*?) Plan payment of (₹[\d,]+) was processed successfully\. Invoice (#INV-\d+)/);
                  if (match) {
                    return {
                      id: match[3],
                      name: match[1] + ' Plan',
                      desc: 'Subscription',
                      date: new Date(n.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                      amount: match[2],
                      status: 'Paid',
                      action: 'Invoice'
                    };
                  }
                  return null;
                })
                .filter(Boolean);
              setRealTransactions(txs);
            }
          })
          .catch(err => console.error(err))
          .finally(() => setLoadingTx(false));
      }
    }
  }, [activeTab, userId]);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage('');
    try {
      // Use the authenticated user ID
      const userIdToSave = userId || localStorage.getItem('rentit_userId');

      if (!userIdToSave) {
        setSaveMessage('Please log in to save changes.');
        setIsSaving(false);
        return;
      }

      const res = await fetch('/api/profile/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userIdToSave, ...formData })
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        throw new Error(`Server returned non-JSON: ${res.status} ${res.statusText}`);
      }

      if (data.success) {
        setSaveMessage('Profile saved successfully!');
        setUserProfile(data.user);

        // Update local storage so other components (like Navbar) can instantly reflect changes
        const localCache = JSON.parse(localStorage.getItem(`rentit_user_profile_${userIdToSave}`) || '{}');
        localCache.name = formData.name;
        localCache.photo = formData.photo;
        localStorage.setItem(`rentit_user_profile_${userIdToSave}`, JSON.stringify(localCache));

        // Notify Navbar of profile change
        window.dispatchEvent(new Event('profileUpdated'));
      } else {
        setSaveMessage(data.details || data.error || 'Failed to update profile');
      }
    } catch (e: any) {
      console.error(e);
      setSaveMessage(`Error: ${e.message}`);
    } finally {
      setIsSaving(false);
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.substring(0, 2).toUpperCase();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image must be smaller than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setFormData({ ...formData, photo: '' });
  };

  const transactions = realTransactions;

  return (
    <>
      <Navbar hideSearchBar={true} />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>

          {/* SIDEBAR */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Manage your account</h2>
            <ul className={styles.navList}>
              <li
                className={`${styles.navItem} ${activeTab === 'Basic Profile' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('Basic Profile')}
              >
                Basic Profile
              </li>
              <li
                className={`${styles.navItem} ${activeTab === 'Your Payment' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('Your Payment')}
              >
                Your Payment
              </li>
              <li
                className={`${styles.navItem} ${activeTab === 'Subscription Management' ? styles.navItemActive : ''}`}
                onClick={() => setActiveTab('Subscription Management')}
              >
                Subscription Management
              </li>
            </ul>
          </aside>

          {/* MAIN CONTENT */}
          <main className={styles.mainContent}>
            {activeTab === 'Basic Profile' && (
              <>
                <div className={styles.pageHeader}>
                  <h1 className={styles.pageTitle}>Edit Profile</h1>
                  <p className={styles.pageSubtitle}>Update your personal and business information</p>
                </div>

                <div className={styles.contentGrid}>

                  {/* AVATAR CARD */}
                  <div className={styles.avatarCard}>
                    <div className={styles.avatarCircle}>
                      {formData.photo ? (
                        <img src={formData.photo} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                      ) : (
                        getInitials(formData.name || userProfile?.name || 'New User')
                      )}
                    </div>
                    <h3 className={styles.avatarName}>{formData.name || userProfile?.name || 'New User'}</h3>
                    <p className={styles.avatarRole}>Owner · Premium+</p>

                    <input type="file" id="photoUpload" accept="image/jpeg, image/png, image/gif" style={{ display: 'none' }} onChange={handlePhotoUpload} />
                    <button className={styles.changePhotoBtn} onClick={() => document.getElementById('photoUpload')?.click()}>Change Photo</button>
                    <button className={styles.removePhotoBtn} onClick={handleRemovePhoto}>Remove Photo</button>

                    <p className={styles.avatarHelpText}>
                      JPG, PNG or GIF. Max 5MB. Minimum 200x200px.
                    </p>
                  </div>

                  {/* FORM CARD */}
                  <div className={styles.formCard}>
                    <div className={styles.formContainer}>
                      <h3 className={styles.formTitle}>Personal Details</h3>

                      <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Full Name <span className={styles.required}>*</span></label>
                          <input type="text" className={styles.formInput} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Email Address <span className={styles.required}>*</span></label>
                          <input type="email" className={styles.formInput} value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Mobile Number <span className={styles.required}>*</span></label>
                          <div className={styles.phoneInputWrapper}>
                            <div className={styles.phonePrefix}>
                              <span>🇮🇳</span> +91
                            </div>
                            <input type="text" className={styles.phoneInput} value={formData.mobile} onChange={(e) => setFormData({ ...formData, mobile: e.target.value })} />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>City <span className={styles.required}>*</span></label>
                          <input type="text" className={styles.formInput} value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} />
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className={styles.actions}>
                      {saveMessage && <span className={styles.saveMessage} style={{ marginRight: '15px', color: saveMessage.includes('success') ? '#28a745' : '#dc3545', fontSize: '14px', fontWeight: '500' }}>{saveMessage}</span>}
                      <button className={styles.saveBtn} onClick={handleSave} disabled={isSaving}>
                        {isSaving ? 'Saving...' : 'Save Changes'}
                      </button>
                      <button className={styles.cancelBtn}>Cancel</button>
                    </div>
                  </div>

                </div>
              </>
            )}

            {activeTab === 'Your Payment' && (
              <>
                <div className={styles.pageHeader}>
                  <h1 className={styles.pageTitle}>Your Payment</h1>
                  <p className={styles.pageSubtitle}>All your transactions and invoices in one place</p>
                </div>

                <div className={styles.paymentContainer}>

                  {/* Plan Cards */}
                  <div className={styles.planCardsGrid}>
                    <div className={styles.activePlanCard}>
                      <h3 className={styles.activePlanTitle}>Premium+ Plan</h3>
                      <p className={styles.activePlanSubtitle}>Current Active Plan</p>
                    </div>
                    <div className={styles.renewalCard}>
                      <h3 className={styles.renewalTitle}>26 Sep 2026</h3>
                      <p className={styles.renewalSubtitle}>Next Renewal Date</p>
                    </div>
                  </div>

                  {/* Transaction History */}
                  <div className={styles.transactionCard}>
                    <div className={styles.transactionHeader}>
                      <h2 className={styles.transactionTitle}>Transaction History</h2>
                      <div className={styles.filterDropdown}>
                        <span>All Time</span>
                        <ChevronDown size={16} />
                      </div>
                    </div>

                    <div className={styles.tableContainer}>
                      <table className={styles.transactionTable}>
                        <thead>
                          <tr>
                            <th>INVOICE ID</th>
                            <th>PLAN NAME</th>
                            <th>DATE</th>
                            <th>AMOUNT</th>
                            <th>STATUS</th>
                            <th className={styles.actionsColumn}>ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loadingTx ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>Loading...</td></tr>
                          ) : transactions.length === 0 ? (
                            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>No transactions found.</td></tr>
                          ) : (
                            transactions.map((tx, idx) => (
                              <tr key={idx}>
                                <td className={styles.invoiceId}>{tx.id}</td>
                                <td>
                                  <div className={styles.planName}>{tx.name}</div>
                                  <div className={styles.planDesc}>{tx.desc}</div>
                                </td>
                                <td className={styles.dateCol}>{tx.date}</td>
                                <td className={styles.amountCol}>{tx.amount}</td>
                                <td>
                                  <span className={`${styles.statusBadge} ${tx.status === 'Paid' ? styles.statusPaid :
                                      tx.status === 'Refunded' ? styles.statusRefunded :
                                        styles.statusFailed
                                    }`}>
                                    {tx.status === 'Paid' && '✓ Paid'}
                                    {tx.status === 'Refunded' && '✕ Refunded'}
                                    {tx.status === 'Failed' && '⚠ Failed'}
                                  </span>
                                </td>
                                <td className={styles.actionsColumn}>
                                  <button className={`${styles.txActionBtn} ${tx.action === 'Retry' ? styles.txActionRetry : ''}`}>
                                    {tx.action}
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>

                    <div className={styles.paginationSection}>
                      <span className={styles.showingText}>Showing {transactions.length} of {transactions.length} transactions</span>
                      <div className={styles.paginationControls}>
                        <button className={styles.pageBtn}>&larr; Prev</button>
                        <button className={`${styles.pageNumber} ${styles.pageNumberActive}`}>1</button>
                        <button className={styles.pageNumber}>2</button>
                        <button className={styles.pageNumber}>3</button>
                        <button className={styles.pageBtn}>Next &rarr;</button>
                      </div>
                    </div>
                  </div>

                </div>
              </>
            )}

            {activeTab === 'Subscription Management' && (
              <>
                <div className={styles.pageHeader}>
                  <h1 className={styles.pageTitle}>Subscription Management</h1>
                  <p className={styles.pageSubtitle}>Manage your Rentit Premium plan and billing</p>
                </div>

                <div className={styles.subscriptionContainer}>

                  {/* Active Plan Banner */}
                  <div className={styles.activePlanBanner}>
                    <div className={styles.bannerInfo}>
                      <div className={styles.bannerLabel}>CURRENT PLAN</div>
                      <div className={styles.bannerTitleRow}>
                        <h2 className={styles.bannerTitle}>Premium+ Plan</h2>
                        <span className={styles.bannerActiveBadge}><span className={styles.dot}></span> Active</span>
                      </div>
                      <p className={styles.bannerExpiry}>Expires 26 September 2026 · Auto-renewal is ON</p>
                    </div>
                    <div className={styles.bannerActions}>
                      <button className={styles.upgradeBtn} onClick={() => router.push('/premium/checkout?plan=premium-plus')}>Upgrade Plan</button>
                      <button className={styles.renewBtn} onClick={() => router.push('/premium/checkout?plan=premium-plus')}>Renew Plan</button>
                      <button className={styles.cancelAutoBtn}>Cancel Auto-renewal</button>
                    </div>
                  </div>

                  {/* Compare Plans Section */}
                  <div className={styles.compareSection}>
                    <h3 className={styles.compareTitle}>Compare Plans</h3>
                    <p className={styles.compareSubtitle}>Choose the right plan to grow your rental business faster</p>

                    <div className={styles.pricingGrid}>

                      {/* Free Plan */}
                      <div className={styles.pricingCard}>
                        <div className={styles.planLabel}>BASIC</div>
                        <h4 className={styles.planName}>Free Plan</h4>
                        <div className={styles.planPrice}>
                          <span className={styles.priceAmount}>₹0</span>
                          <span className={styles.pricePeriod}>/ month</span>
                        </div>

                        <ul className={styles.featureList}>
                          <li><Check size={16} className={styles.checkIcon} /> Post up to 3 properties</li>
                          <li><Check size={16} className={styles.checkIcon} /> Basic listing visibility</li>
                          <li><Check size={16} className={styles.checkIcon} /> Tenant enquiries</li>
                          <li className={styles.disabledFeature}><XIcon size={16} className={styles.crossIcon} /> Listing highlight</li>
                          <li className={styles.disabledFeature}><XIcon size={16} className={styles.crossIcon} /> Facebook / Google Ads</li>
                          <li className={styles.disabledFeature}><XIcon size={16} className={styles.crossIcon} /> Verified badge</li>
                          <li className={styles.disabledFeature}><XIcon size={16} className={styles.crossIcon} /> Priority support</li>
                        </ul>
                        <button className={styles.planActionOutline} onClick={() => router.push('/premium/checkout?plan=basic')}>Current (Downgrade)</button>
                      </div>

                      {/* Premium Plan */}
                      <div className={styles.pricingCard}>
                        <div className={styles.planLabelBlue}>MOST POPULAR</div>
                        <h4 className={styles.planName}>Premium Plan</h4>
                        <div className={styles.planPrice}>
                          <span className={styles.priceAmount}>₹2,499</span>
                          <span className={styles.pricePeriod}>/ month</span>
                        </div>
                        <div className={styles.planSavings}>₹6,999 / 3 months (save 7%)</div>

                        <ul className={styles.featureList}>
                          <li><Check size={16} className={styles.checkIcon} /> Post unlimited properties</li>
                          <li><Check size={16} className={styles.checkIcon} /> Priority listing placement</li>
                          <li><Check size={16} className={styles.checkIcon} /> Verified badge</li>
                          <li><Check size={16} className={styles.checkIcon} /> Listing highlight</li>
                          <li><Check size={16} className={styles.checkIcon} /> Facebook Ads</li>
                          <li className={styles.disabledFeature}><XIcon size={16} className={styles.crossIcon} /> Google Ads</li>
                          <li className={styles.disabledFeature}><XIcon size={16} className={styles.crossIcon} /> Priority support</li>
                        </ul>
                        <button className={styles.planActionDark} onClick={() => router.push('/premium/checkout?plan=premium')}>Downgrade to Premium</button>
                      </div>

                      {/* Premium+ Plan */}
                      <div className={`${styles.pricingCard} ${styles.pricingCardActive}`}>
                        <div className={styles.activePlanHeader}>
                          <div className={styles.planLabelOrange}>YOUR CURRENT PLAN</div>
                          <span className={styles.activeTag}>Active</span>
                        </div>
                        <h4 className={styles.planName}>Premium+ Plan</h4>
                        <div className={styles.planPrice}>
                          <span className={styles.priceAmount}>₹4,999</span>
                          <span className={styles.pricePeriod}>/ 3 months</span>
                        </div>
                        <div className={styles.planSavings}>₹12,999 / year (save 14%)</div>

                        <ul className={styles.featureList}>
                          <li><Check size={16} className={styles.checkIcon} /> Post unlimited properties</li>
                          <li><Check size={16} className={styles.checkIcon} /> Priority listing placement</li>
                          <li><Check size={16} className={styles.checkIcon} /> Verified badge</li>
                          <li><Check size={16} className={styles.checkIcon} /> Listing highlight</li>
                          <li><Check size={16} className={styles.checkIcon} /> Facebook Ads</li>
                          <li><Check size={16} className={styles.checkIcon} /> Google Ads</li>
                          <li><Check size={16} className={styles.checkIcon} /> Priority 24/7 support</li>
                        </ul>
                        <button className={styles.planActionOrange} onClick={() => router.push('/premium/checkout?plan=premium-plus')}>Renew Plan</button>
                      </div>

                    </div>
                  </div>
                </div>
              </>
            )}
          </main>

        </div>
      </div>
    </>
  );
}
