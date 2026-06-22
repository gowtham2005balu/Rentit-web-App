"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

import { useAuth } from '@/context/AuthContext';

export interface WishlistItem {
  id: string | number;
  title: string;
  location: string;
  price: string;
  features?: string[];
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (title: string) => void;
  isWishlisted: (title: string) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { userId } = useAuth();
  
  const storageKey = userId ? `rentit_wishlist_${userId}` : 'rentit_wishlist_guest';

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      try {
        setWishlistItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
        setWishlistItems([]);
      }
    } else {
      setWishlistItems([]);
    }
  }, [storageKey]);

  const saveToStorage = (items: WishlistItem[]) => {
    localStorage.setItem(storageKey, JSON.stringify(items));
  };

  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems(prev => {
      if (prev.some(i => i.title === item.title)) return prev;
      const newItems = [...prev, item];
      saveToStorage(newItems);

      // Fire notification if user is logged in
      if (userId) {
        fetch('/api/notifications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            title: 'Property Saved 💖',
            message: `You saved "${item.title}" to your wishlist. It looks like a great match! Don't forget to schedule a visit or contact the owner before it's gone!`,
            type: 'Premium'
          })
        }).catch(e => console.error("Failed to send wishlist notification:", e));
      }

      return newItems;
    });
  };

  const removeFromWishlist = (title: string) => {
    setWishlistItems(prev => {
      const newItems = prev.filter(i => i.title !== title);
      saveToStorage(newItems);
      return newItems;
    });
  };

  const isWishlisted = (title: string) => {
    if (!userId) return false;
    return wishlistItems.some(i => i.title === title);
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
