"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, User } from 'lucide-react';

interface ContactOwnerButtonProps {
  propertyId: string | number;
  ownerId?: string;
  propertyTitle: string;
  className?: string;
  variant?: 'primary' | 'outline' | 'icon';
}

export default function ContactOwnerButton({ propertyId, ownerId = 'demoOwner1', propertyTitle, className, variant = 'primary' }: ContactOwnerButtonProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleContactOwner = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const renterId = localStorage.getItem('rentit_userId');
    if (!renterId) {
      alert("Please log in to contact the owner.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/contact-owner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: String(propertyId),
          ownerId: String(ownerId),
          renterId: String(renterId),
          propertyTitle: propertyTitle
        })
      });
      const data = await res.json();
      if (data.success) {
        router.push(`/chat?conversationId=${data.conversationId}`);
      } else {
        alert(data.error || "Failed to contact owner");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <button className={className} onClick={handleContactOwner} disabled={isLoading} style={{ opacity: isLoading ? 0.7 : 1 }}>
      {variant === 'primary' ? (
        <><Phone size={16} /> {isLoading ? 'Connecting...' : 'Contact Owner'}</>
      ) : variant === 'outline' ? (
        <>{isLoading ? 'Connecting...' : 'Contact Owner'}</>
      ) : (
        <><User size={16} /> {isLoading ? 'Connecting...' : 'Contact Owner'}</>
      )}
    </button>
  );
}
