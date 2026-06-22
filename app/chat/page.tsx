"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import { Search, MoreVertical, Eye, Paperclip, Send, Home, Calendar, BellOff, Ban, ChevronRight } from 'lucide-react';
import styles from './page.module.css';

import { useAuth } from '@/context/AuthContext';
import { properties } from '../../data/mockData';

export default function ChatPage() {
  const { userId } = useAuth();
  const [chats, setChats] = useState<any[]>([]);
  const [activeChatId, setActiveChatId] = useState<number | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeConversation, setActiveConversation] = useState<any>(null);
  const [inputText, setInputText] = useState('');
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(false);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Default to true to match the initial CSS styling
  const [blockedUsers, setBlockedUsers] = useState<Set<string>>(new Set());
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatHistoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages]);
  const router = useRouter();

  const handleScheduleVisit = () => {
    router.push('/visits');
  };

  const handleBlockReport = () => {
    const activeChat = chats.find(c => c.id === activeChatId);
    if (!activeChat) return;
    const otherUserId = activeChat.ownerId === String(userId) ? activeChat.renterId : activeChat.ownerId;

    if (window.confirm("Are you sure you want to block this user and report them for abuse?")) {
      setBlockedUsers(prev => {
        const newSet = new Set(prev);
        newSet.add(otherUserId);
        return newSet;
      });
      alert("User has been blocked successfully.");
      setIsContactInfoOpen(false);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(prev => !prev);
  };

  // Fetch all chats for user
  useEffect(() => {
    if (!userId) {
      setChats([]);
      setIsLoadingChats(false);
      return;
    }

    let isInitialFetch = true;

    const fetchChats = async () => {
      try {
        const res = await fetch(`/api/messages?userId=${userId}`);
        const data = await res.json();
        if (data.success) {
          setChats(data.chats);
          
          if (isInitialFetch) {
            isInitialFetch = false;
            // If there's a conversationId in the URL, select it. Otherwise select first
            const urlParams = new URLSearchParams(window.location.search);
            const urlConvId = urlParams.get('conversationId');
            
            // Only set active chat if we haven't already selected one
            setActiveChatId(prevId => {
              if (urlConvId) return parseInt(urlConvId);
              if (!prevId && data.chats.length > 0) return data.chats[0].id;
              return prevId;
            });
          }
        }
      } catch (e) {
        console.error("Failed to load chats", e);
      } finally {
        setIsLoadingChats(false);
      }
    };
    
    fetchChats();

    // Poll chats every 5 seconds to update the sidebar with any new incoming messages
    const intervalId = setInterval(fetchChats, 5000);

    return () => clearInterval(intervalId);
  }, [userId]);

  // Fetch messages for active chat
  useEffect(() => {
    if (!userId || !activeChatId) return;

    const fetchMessages = async (showLoading = false) => {
      if (showLoading) setIsLoadingMessages(true);
      try {
        const res = await fetch(`/api/messages?userId=${userId}&conversationId=${activeChatId}`);
        const data = await res.json();
        if (data.success) {
          setMessages(data.messages);
          setActiveConversation(data.conversation);

          // Also update URL to reflect active chat without reloading
          window.history.replaceState({}, '', `/chat?conversationId=${activeChatId}`);
        }
      } catch (e) {
        console.error("Failed to load messages", e);
      } finally {
        if (showLoading) setIsLoadingMessages(false);
      }
    };
    
    fetchMessages(true);

    // Poll for new messages every 3 seconds
    const intervalId = setInterval(() => fetchMessages(false), 3000);

    return () => clearInterval(intervalId);
  }, [userId, activeChatId]);

  const handleSendMessage = async (textOverride?: string) => {
    const textToSend = textOverride || inputText.trim();
    if (!textToSend || !userId || !activeChatId) return;

    if (!textOverride) {
      setInputText('');
    }

    // Optimistic UI update
    const tempMsg = {
      id: Date.now(),
      senderId: userId,
      text: textToSend,
      createdAt: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempMsg]);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: activeChatId,
          senderId: userId,
          text: textToSend
        })
      });
      const data = await res.json();
      if (!data.success) {
        console.error("Failed to send message", data.error);
        // Could revert optimistic update here if needed
      } else {
        // Swap the optimistic message with the real one from the server
        setMessages(prev => prev.map(m => m.id === tempMsg.id ? data.message : m));

        // Refresh chats list so the sidebar shows the new latest message
        const chatRes = await fetch(`/api/messages?userId=${userId}`);
        const chatData = await chatRes.json();
        if (chatData.success) {
          setChats(chatData.chats);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleSendMessage(`📎 Attachment: ${file.name}`);
      e.target.value = '';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contactInfoRef.current && !contactInfoRef.current.contains(event.target as Node)) {
        setIsContactInfoOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Navbar hideSearchBar={true} />

      <div className={styles.chatContainer}>
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h1 className={styles.sidebarTitle}>Messages</h1>
            <div className={styles.searchContainer}>
              <Search className={styles.searchIcon} size={16} />
              <input type="text" placeholder="Search chats..." className={styles.searchInput} />
            </div>
          </div>

          <div className={styles.chatList}>
            {isLoadingChats ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>Loading...</div>
            ) : chats.length === 0 ? (
              <div style={{ padding: '24px', textAlign: 'center', color: '#9ca3af', fontSize: '14px' }}>
                No messages yet
              </div>
            ) : (
              chats.map(chat => (
                <div
                  key={chat.id}
                  className={`${styles.chatItem} ${activeChatId === chat.id ? styles.active : ''}`}
                  onClick={() => setActiveChatId(chat.id)}
                >
                  <div className={`${styles.avatar} ${styles[chat.avatarClass] || styles.rk}`}>
                    {chat.initials}
                  </div>
                  <div className={styles.chatItemContent}>
                    <div className={styles.chatItemHeader}>
                      <div className={styles.chatItemName}>
                        {chat.name}
                        {chat.type && (
                          <span className={`${styles.badge} ${chat.type === 'Owner' ? styles.badgeOwner : styles.badgeTenant}`}>
                            {chat.type}
                          </span>
                        )}
                      </div>
                      <span className={styles.chatItemTime}>{chat.time}</span>
                    </div>
                    <div className={styles.chatItemMessage}>{chat.message}</div>
                    <div className={styles.chatItemSub}>{chat.sub}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={styles.mainArea}>
          {(() => {
            if (chats.length === 0 || !activeChatId) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9ca3af', gap: '16px' }}>
                  <div style={{ backgroundColor: '#f3f4f6', padding: '24px', borderRadius: '50%' }}>
                    <Search size={48} color="#d1d5db" />
                  </div>
                  <h2 style={{ color: '#374151', fontSize: '1.25rem', fontWeight: 600 }}>Your messages will appear here</h2>
                  <p style={{ textAlign: 'center', maxWidth: '300px' }}>Contact property owners to start a conversation and find your perfect home.</p>
                </div>
              );
            }

            const activeChat = chats.find(c => c.id === activeChatId);
            if (!activeChat) return null;

            const otherUserId = activeChat.ownerId === String(userId) ? activeChat.renterId : activeChat.ownerId;
            const isBlocked = blockedUsers.has(otherUserId);

            // Property details from the API
            const activeProp = activeChat.property || {
              title: activeChat.sub || `Property ${activeChat.propertyId}`,
              location: 'Location not specified',
              price: 0,
              deposit: 0,
              bhk: 'Space'
            };

            return (
              <>
                {/* Header */}
                <div className={styles.mainHeader}>
                  <div className={styles.headerProfile}>
                    <div className={`${styles.avatar} ${styles[activeChat.avatarClass] || styles.rk}`}>{activeChat.initials}</div>
                    <span className={styles.headerName}>{activeChat.name}</span>
                    <span className={`${styles.badge} ${activeChat.type === 'Owner' ? styles.badgeOwner : styles.badgeTenant}`}>{activeChat.type}</span>
                    {isBlocked && (
                      <span className={styles.badge} style={{ backgroundColor: '#FEF2F2', color: '#EF4444', border: '1px solid #FCA5A5' }}>Blocked</span>
                    )}
                  </div>
                  <div className={styles.headerOptionsContainer} ref={contactInfoRef}>
                    <button
                      className={styles.optionsBtn}
                      onClick={() => setIsContactInfoOpen(!isContactInfoOpen)}
                    >
                      <MoreVertical size={18} />
                    </button>

                    {isContactInfoOpen && (
                      <div className={styles.contactInfoPopup}>
                        <div className={styles.contactInfoHeader}>Contact Info</div>

                        <div className={styles.contactInfoProfile}>
                          <div className={`${styles.avatar} ${styles[activeChat.avatarClass] || styles.rk}`}>{activeChat.initials}</div>
                          <div className={styles.contactInfoDetails}>
                            <div className={styles.contactInfoName}>{activeChat.name}</div>
                            <div className={styles.contactInfoSub}>{activeProp.title}</div>
                          </div>
                        </div>

                        <div className={styles.contactInfoAction} onClick={handleScheduleVisit}>
                          <div className={`${styles.actionIconWrapper} ${styles.green}`}>
                            <Calendar size={18} />
                          </div>
                          <div className={styles.actionTexts}>
                            <div className={styles.actionTitle}>Schedule a Visit</div>
                            <div className={styles.actionDesc}>Book a property visit</div>
                          </div>
                          <ChevronRight size={16} className={styles.chevronIcon} />
                        </div>

                        <div className={styles.contactInfoAction} onClick={handleMuteToggle}>
                          <div className={`${styles.actionIconWrapper} ${styles.gray}`}>
                            <BellOff size={18} />
                          </div>
                          <div className={styles.actionTexts}>
                            <div className={styles.actionTitle}>Mute Notifications</div>
                            <div className={styles.actionDesc}>{isMuted ? 'Alerts are silenced' : 'Silence alerts for this chat'}</div>
                          </div>
                          <div className={styles.toggleSwitch} style={{ backgroundColor: isMuted ? '#334155' : '#E2E8F0' }}>
                            <div className={styles.toggleThumb} style={{ left: isMuted ? 'auto' : '3px', right: isMuted ? '3px' : 'auto' }}></div>
                          </div>
                        </div>

                        <div className={styles.contactInfoAction} style={{ borderBottom: 'none' }} onClick={handleBlockReport}>
                          <div className={`${styles.actionIconWrapper} ${styles.red}`}>
                            <Ban size={18} />
                          </div>
                          <div className={styles.actionTexts}>
                            <div className={`${styles.actionTitle} ${styles.danger}`}>Block & Report</div>
                            <div className={`${styles.actionDesc} ${styles.danger}`}>Block owner and report abuse</div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Property Banner */}
                <div className={styles.propertyBanner}>
                  <div className={styles.propertyInfo}>
                    <div className={styles.propertyIconWrapper}>
                      <Home size={24} />
                    </div>
                    <div>
                      <div className={styles.propertyTitle}>{activeProp.title}</div>
                      <div className={styles.propertySub}>{activeProp.location}</div>
                    </div>
                  </div>
                  <div className={styles.propertyStats}>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>₹{activeProp.price ? activeProp.price.toLocaleString() : 'N/A'}</span>
                      <span className={styles.statLabel}>Rent</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{activeProp.deposit ? `₹${activeProp.deposit.toLocaleString()}` : 'N/A'}</span>
                      <span className={styles.statLabel}>Deposit</span>
                    </div>
                    <div className={styles.statItem}>
                      <span className={styles.statValue}>{activeProp.bhk ? `${activeProp.bhk} BHK` : 'Space'}</span>
                      <span className={styles.statLabel}>Type</span>
                    </div>
                    <button className={styles.viewBtn} onClick={() => router.push(`/property/${activeChat.propertyId}`)}>
                      <Eye size={16} /> View
                    </button>
                  </div>
                </div>

                {/* Chat History */}
                <div className={styles.chatHistory} ref={chatHistoryRef}>
                  {isLoadingMessages ? (
                    <div style={{ textAlign: 'center', padding: '20px', color: '#6b7280' }}>Loading messages...</div>
                  ) : (
                    <>
                      <div className={styles.dateSeparator}>Conversation History</div>

                      {messages.map((msg, index) => {
                        const isSentByMe = msg.senderId === String(userId);
                        const msgTime = new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                        return (
                          <div key={msg.id || index} className={`${styles.messageWrapper} ${isSentByMe ? styles.sent : styles.received}`}>
                            <div className={styles.messageBubble}>
                              {msg.text}
                            </div>
                            <div className={styles.messageTime}>{msgTime}</div>
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>

                {/* Input Section */}
                {isBlocked ? (
                  <div className={styles.inputSection} style={{ alignItems: 'center', justifyContent: 'center', padding: '24px', backgroundColor: '#FEF2F2', borderRadius: '12px', margin: '0 24px 24px', border: '1px solid #FCA5A5' }}>
                    <p style={{ color: '#EF4444', fontWeight: '500', marginBottom: '12px', fontSize: '14px' }}>You have blocked this user.</p>
                    <button 
                      onClick={() => setBlockedUsers(prev => { const next = new Set(prev); next.delete(otherUserId); return next; })}
                      style={{ padding: '8px 16px', backgroundColor: '#EF4444', color: '#fff', border: 'none', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'background-color 0.2s' }}
                    >
                      Unblock User
                    </button>
                  </div>
                ) : (
                  <div className={styles.inputSection}>
                    <div className={styles.quickReplies}>
                      <button className={styles.quickReplyChip} onClick={() => setInputText("When can I visit?")}>When can I visit?</button>
                      <button className={styles.quickReplyChip} onClick={() => setInputText("Is negotiation possible?")}>Is negotiation possible?</button>
                      <button className={styles.quickReplyChip} onClick={() => setInputText("Any brokerage?")}>Any brokerage?</button>
                      <button className={styles.quickReplyChip} onClick={() => setInputText("Is it furnished?")}>Is it furnished?</button>
                    </div>

                    <div className={styles.inputWrapper}>
                      <button className={styles.attachBtn} onClick={() => fileInputRef.current?.click()}>
                        <Paperclip size={20} />
                      </button>
                      <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/*,video/*,.pdf,.doc,.docx" 
                        onChange={handleFileChange} 
                      />
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className={styles.messageInput}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                      />
                      <button className={styles.sendBtn} onClick={() => handleSendMessage()} disabled={!inputText.trim()}>
                        <Send size={16} style={{ marginLeft: '-2px' }} />
                      </button>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
