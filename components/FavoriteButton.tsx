"use client";
import React from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';

interface FavoriteButtonProps {
  item: {
    id: string | number;
    title: string;
    location: string;
    price: string;
    features?: string[];
    image: string;
  };
  className?: string;
}

export default function FavoriteButton({ item, className }: FavoriteButtonProps) {
  const { addToWishlist, removeFromWishlist, isWishlisted } = useWishlist();
  const { isAuthenticated, openAuthModal } = useAuth();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      openAuthModal();
      return;
    }

    if (isWishlisted(item.title)) {
      removeFromWishlist(item.title);
    } else {
      addToWishlist({
        id: item.id,
        title: item.title,
        location: item.location,
        price: item.price,
        features: item.features,
        image: item.image
      });
    }
  };

  return (
    <div
      className={className}
      role="button"
      aria-label="Save to favorites"
      onClick={toggleWishlist}
    >
      <Heart size={16} fill={isWishlisted(item.title) ? "#EF4444" : "none"} color={isWishlisted(item.title) ? "#EF4444" : "currentColor"} />
    </div>
  );
}
