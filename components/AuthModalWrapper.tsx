"use client";

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import AuthModal from './AuthModal';

export default function AuthModalWrapper() {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  
  if (!isAuthModalOpen) return null;

  return <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />;
}
