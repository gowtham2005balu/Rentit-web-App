"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import styles from './page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useAuth();

  useEffect(() => {
    const fetchNotifications = async () => {
      const uid = userId || localStorage.getItem('rentit_userId');
      if (!uid) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/notifications?userId=${uid}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setNotifications(data.notifications || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, [userId]);

  const handleMarkAllRead = async () => {
    const uid = userId || localStorage.getItem('rentit_userId');
    if (!uid) return;
    await fetch('/api/notifications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: uid, markAll: true })
    });
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleClearAll = async () => {
    const uid = userId || localStorage.getItem('rentit_userId');
    if (!uid) return;
    await fetch(`/api/notifications?userId=${uid}&clearAll=true`, {
      method: 'DELETE'
    });
    setNotifications([]);
  };

  const handleDismiss = async (id: number) => {
    const uid = userId || localStorage.getItem('rentit_userId');
    if (!uid) return;
    await fetch(`/api/notifications?userId=${uid}&notificationId=${id}`, {
      method: 'DELETE'
    });
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const filteredNotifications = activeTab === 'All' 
    ? notifications 
    : notifications.filter(n => n.type === activeTab);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const getRelativeTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return date.toLocaleDateString();
  };

  return (
    <>
      <Navbar hideSearchBar={true} />
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          {/* Main content block */}
          <div className={styles.mainCard}>
            
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerLeft}>
                <h1 className={styles.pageTitle}>Notifications</h1>
                <p className={styles.pageSubtitle}>{unreadCount} unread notifications</p>
              </div>
              <div className={styles.headerRight}>
                <button className={styles.markReadBtn} onClick={handleMarkAllRead}>✓ Mark All as Read</button>
                <button className={styles.clearAllBtn} onClick={handleClearAll}>Clear All</button>
              </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
              <button 
                className={`${styles.filterBtn} ${activeTab === 'All' ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveTab('All')}
              >
                All <span className={styles.badge}>{notifications.length}</span>
              </button>
              <button 
                className={`${styles.filterBtn} ${activeTab === 'Enquiries' ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveTab('Enquiries')}
              >
                Enquiries <span className={styles.badge}>{notifications.filter(n => n.type === 'Enquiries').length}</span>
              </button>
              <button 
                className={`${styles.filterBtn} ${activeTab === 'Listings' ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveTab('Listings')}
              >
                Listings <span className={styles.badge}>{notifications.filter(n => n.type === 'Listings').length}</span>
              </button>
              <button 
                className={`${styles.filterBtn} ${activeTab === 'Premium' ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveTab('Premium')}
              >
                Premium <span className={styles.badge}>{notifications.filter(n => n.type === 'Premium').length}</span>
              </button>
            </div>

            {/* Notifications List */}
            <div className={styles.notificationsList}>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading notifications...</div>
              ) : filteredNotifications.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>No notifications found.</div>
              ) : (
                filteredNotifications.map((notif: any) => (
                  <div key={notif.id} className={styles.notificationItem} style={{ opacity: notif.isRead ? 0.7 : 1 }}>
                    <div className={styles.notificationHeader}>
                      <h3 className={styles.notificationTitle}>{notif.title}</h3>
                      <div className={styles.notificationTime}>
                        {getRelativeTime(notif.createdAt)} {!notif.isRead && <span className={styles.unreadDot}></span>}
                      </div>
                    </div>
                    <p className={styles.notificationText}>
                      "{notif.message}"
                    </p>
                    <div className={styles.notificationActions}>
                      {notif.title === 'Draft Saved 📝' && (
                        <button className={styles.actionBtn} onClick={() => window.location.href = '/add-property'} style={{ color: '#EF4444', border: '1px solid #EF4444' }}>Resume Posting</button>
                      )}
                      <button className={styles.actionBtn} onClick={() => handleDismiss(notif.id)}>Dismiss</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
