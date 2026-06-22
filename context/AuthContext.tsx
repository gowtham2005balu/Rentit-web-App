"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  useEffect(() => {
    // Check if user is logged in from session storage on mount
    const storedUserId = sessionStorage.getItem('rentit_userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const login = (id: string) => {
    setUserId(id);
    sessionStorage.setItem('rentit_userId', id);
  };

  const logout = () => {
    setUserId(null);
    sessionStorage.removeItem('rentit_userId');
    localStorage.removeItem('rentit_userId');
  };

  return (
    <AuthContext.Provider value={{ userId, login, logout, isAuthenticated: !!userId, isAuthModalOpen, openAuthModal, closeAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
