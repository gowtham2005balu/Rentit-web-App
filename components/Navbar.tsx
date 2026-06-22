"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import { Search, Bell, MessageSquare, Heart, X, Crown, Award, Home, Calendar, PlusCircle, User, Settings, CircleHelp, LogOut, ChevronDown } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './Navbar.module.css';

interface NavbarProps {
  hideSearchBar?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ hideSearchBar = false }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [selectedTags, setSelectedTags] = useState<string[]>(['Velachery']);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, logout, userId, isAuthModalOpen, openAuthModal, closeAuthModal } = useAuth();
  const [activeToggle, setActiveToggle] = useState<'Location' | 'Metro'>('Location');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  const [userName, setUserName] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);

  const loadProfile = () => {
    if (isAuthenticated && userId) {
      const localProfile = JSON.parse(localStorage.getItem(`rentit_user_profile_${userId}`) || '{}');
      if (localProfile.name) setUserName(localProfile.name);
      if (localProfile.photo) setUserPhoto(localProfile.photo);
      
      fetch('/api/auth/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          if (data.user.name) setUserName(data.user.name);
          if (data.user.photo) setUserPhoto(data.user.photo);
        }
      })
      .catch(() => {});
    }
  };

  React.useEffect(() => {
    loadProfile();
    window.addEventListener('profileUpdated', loadProfile);
    return () => window.removeEventListener('profileUpdated', loadProfile);
  }, [isAuthenticated, userId]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname?.startsWith(path)) return true;
    return false;
  };

  const removeTag = (tagToRemove: string) => {
    setSelectedTags(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !selectedTags.includes(tag.trim())) {
      setSelectedTags([...selectedTags, tag.trim()]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        addTag(searchQuery);
        setSearchQuery('');
      } else {
        handleMainSearch();
      }
    }
  };

  const handleMainSearch = () => {
    const params = new URLSearchParams();
    let rentMax = "";
    let loc = "";
    let roomType = "";
    let furnishing = "";
    
    const allTags = [...selectedTags];
    if (searchQuery.trim()) allTags.push(searchQuery.trim());
    
    allTags.filter(t => t.trim()).forEach(tag => {
      const lowerTag = tag.toLowerCase();
      if (lowerTag.includes('under ₹15k') || lowerTag.includes('under 15k')) {
        rentMax = "15000";
      } else if (lowerTag.includes('bhk') || lowerTag.includes('rk')) {
        roomType = tag.replace(/bhk/i, ' BHK').replace(/rk/i, ' RK');
      } else if (lowerTag.includes('furnished') || lowerTag.includes('brokerage')) {
        furnishing = tag;
      } else {
        loc = loc ? `${loc} ${tag}` : tag;
      }
    });

    if (rentMax) params.append('rentMax', rentMax);
    if (loc) params.append('locality', loc);
    if (roomType) params.append('roomType', roomType);
    if (furnishing) params.append('furnishing', furnishing);
    
    router.push(`/apartments?${params.toString()}`);
  };

  return (
    <div className={styles.navbarWrapper}>
      {/* Top Nav Header */}
      <header className={styles.topHeader}>
        <div className={styles.container}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div className={styles.logoSection}>
              <span className={styles.logoTextDark}>RENT</span>
              <span className={styles.logoTextOrange}>IT</span>
            </div>
          </Link>

          {/* Navigation Links */}
          {/* Center Links Removed for new UI */}

          {/* Actions */}
          <div className={styles.actionItems}>
            <Link href="/notifications" className={styles.iconBtn}>
              <Bell size={20} className={styles.actionIcon} />
              <span className={styles.dotBadge}></span>
            </Link>
            <Link href="/chat" className={styles.iconBtn}>
              <MessageSquare size={20} className={styles.actionIcon} />
              <span className={styles.dotBadge}></span>
            </Link>

            <div className={styles.divider}></div>
            {isAuthenticated ? (
              <Link href="/add-property" style={{ textDecoration: 'none' }}>
                <button className={styles.postPropertyBtn}>
                  <PlusCircle size={18} />
                  Post Your Property
                </button>
              </Link>
            ) : (
              <button 
                className={styles.postPropertyBtn} 
                onClick={(e) => { e.preventDefault(); openAuthModal(); }}
              >
                <PlusCircle size={18} />
                Post Your Property
              </button>
            )}
            <div className={styles.profileSection} ref={profileDropdownRef}>
              {isAuthenticated ? (
                <>
                  <div className={styles.userAvatarWrapper} onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <div className={styles.userAvatar} style={{ overflow: 'hidden', padding: 0 }}>
                      {userPhoto ? (
                        <img src={userPhoto} alt="User Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        userName ? userName.charAt(0).toUpperCase() : (userId?.toString().charAt(0).toUpperCase() || 'U')
                      )}
                    </div>
                    <ChevronDown size={16} className={styles.profileChevron} />
                  </div>

                  {isProfileOpen && (
                    <div className={styles.profileDropdown}>
                      <div className={styles.profileHeader}>
                        <div className={styles.profileName}>{userName ? userName : `User #${userId}`}</div>
                        <div className={styles.profileEmail}>Verified User</div>
                      </div>
                  
                  <div className={styles.dropdownDivider}></div>
                  
                  <div className={styles.dropdownMenu}>
                    <Link href="/dashboard" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <Home size={18} />
                      <span>My Listings</span>
                    </Link>
                    <Link href="/chat" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <MessageSquare size={18} />
                      <span>My Chat</span>
                    </Link>
                    <Link href="/visits?tab=shortlist" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <Heart size={18} />
                      <span>Your Shortlist</span>
                    </Link>
                    <Link href="/visits" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <Calendar size={18} />
                      <span>Visits Scheduled</span>
                    </Link>
                    <Link href="/premium" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <Award size={18} />
                      <span>Premium</span>
                    </Link>
                    
                    <div className={styles.dropdownDivider}></div>
                    
                    <Link href="/add-property" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <PlusCircle size={18} />
                      <span>Add Property</span>
                    </Link>
                    
                    <div className={styles.dropdownDivider}></div>
                    
                    <Link href="/profile" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <User size={18} />
                      <span>Manage Your Account</span>
                    </Link>
                    <Link href="/settings" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <Settings size={18} />
                      <span>Settings</span>
                    </Link>
                    <Link href="/help" className={styles.dropdownItem} onClick={() => setIsProfileOpen(false)}>
                      <CircleHelp size={18} />
                      <span>Help Center</span>
                    </Link>
                    
                    <button className={`${styles.dropdownItem} ${styles.logoutItem}`} onClick={() => { logout(); setIsProfileOpen(false); }}>
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
              </>
              ) : (
                <button 
                  className={styles.loginBtn} 
                  onClick={() => openAuthModal()}
                >
                  <User size={16} />
                  Login / Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {!hideSearchBar && (
        <>
          {/* Search Section */}
          <div className={styles.searchSection}>
            <div className={styles.searchContainer}>
              <div className={styles.searchPillWrapper}>
                <div className={styles.searchPill}>
                  {/* Selected tags */}
                  {selectedTags.map(tag => (
                    <div key={tag} className={styles.selectedTag}>
                      {tag}
                      <button className={styles.removeTag} onClick={() => removeTag(tag)}><X size={12} /></button>
                    </div>
                  ))}
                  <span className={styles.addMore} onClick={() => searchInputRef.current?.focus()}>+ Add more</span>
                  
                  {/* Divider */}
                  <div className={styles.verticalDivider}></div>
                  
                  {/* Input */}
                  <div className={styles.inputWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input 
                      ref={searchInputRef}
                      type="text" 
                      placeholder="Search locality, flatmates, apartments..." 
                      className={styles.searchInput}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                  </div>

                  {/* Location/Metro Toggle */}
                  <div className={styles.toggleGroup}>
                    <button 
                      className={`${styles.toggleBtn} ${activeToggle === 'Location' ? styles.toggleActive : ''}`}
                      onClick={() => setActiveToggle('Location')}
                    >Location</button>
                    <button 
                      className={`${styles.toggleBtn} ${activeToggle === 'Metro' ? styles.toggleActive : ''}`}
                      onClick={() => setActiveToggle('Metro')}
                    >Metro</button>
                  </div>
                </div>
              </div>
              
              <button className={styles.mainSearchBtn} onClick={handleMainSearch}>
                <Search size={18} />
                Search
              </button>
            </div>
          </div>

          {/* Trending Section */}
          <div className={styles.trendingSection}>
            <div className={styles.trendingContainer}>
              <span className={styles.trendingLabel}>Trending:</span>
              <div className={styles.trendingTags}>
                {['Velachery', 'OMR', 'Anna Nagar', 'Adyar', 'T. Nagar', 'Sholinganallur', 'Perungudi'].map(tag => (
                  <span 
                    key={tag} 
                    className={styles.trendingTag}
                    onClick={() => addTag(tag)}
                    style={{ cursor: 'pointer' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
