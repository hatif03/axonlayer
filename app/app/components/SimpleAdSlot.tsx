'use client';

import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useAdContext } from './AdContextProvider';

interface SimpleAdSlotProps {
  slotId: string;
  size?: 'banner' | 'square' | 'mobile' | 'sidebar';
  price?: string;
  className?: string;
}

const SLOT_DIMENSIONS = {
  banner: { width: 728, height: 90 },
  square: { width: 300, height: 250 },
  mobile: { width: 320, height: 60 },
  sidebar: { width: 160, height: 600 }
};

export function SimpleAdSlot({
  slotId,
  size = 'banner',
  price = '0.10',
  className = ''
}: SimpleAdSlotProps) {
  const { isConnected, address } = useAccount();
  const { websiteId, apiBaseUrl } = useAdContext();
  const [isLoading, setIsLoading] = useState(true);
  const [hasAd, setHasAd] = useState(false);

  const dimensions = SLOT_DIMENSIONS[size];

  useEffect(() => {
    // Simulate loading ad data
    const timer = setTimeout(() => {
      setIsLoading(false);
      // For demo purposes, we'll show empty slots
      setHasAd(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [slotId]);

  if (isLoading) {
    return (
      <div
        className={`ad-slot ${className}`}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: '100%',
          maxHeight: '100%',
          border: '2px solid #e5e5e5',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '12px',
          color: '#666'
        }}
      >
        Loading...
      </div>
    );
  }

  if (hasAd) {
    return (
      <div
        className={`ad-slot ${className}`}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: '100%',
          maxHeight: '100%',
          border: '2px solid #0052FF',
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: '12px',
          color: '#000'
        }}
      >
        Ad Content
      </div>
    );
  }

  // Empty slot - show purchase option
  return (
    <div
      className={`ad-slot ${className}`}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        maxWidth: '100%',
        maxHeight: '100%',
        border: '2px dashed #e5e5e5',
        backgroundColor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '12px',
        color: '#666',
        cursor: isConnected ? 'pointer' : 'default',
        transition: 'all 0.2s ease'
      }}
      onClick={() => {
        if (isConnected) {
          console.log(`Purchase slot ${slotId} for ${price} USDC`);
        } else {
          console.log('Please connect your wallet to purchase ad slots');
        }
      }}
    >
      <div style={{ fontSize: '16px', marginBottom: '4px' }}>💳</div>
      <div style={{ fontWeight: '600', marginBottom: '2px' }}>
        Ad Slot: {slotId}
      </div>
      <div style={{ marginBottom: '2px', color: '#0052FF' }}>
        {price} USDC • {size}
      </div>
      <div style={{ fontSize: '10px', color: '#666' }}>
        Base Network
      </div>
      {!isConnected && (
        <div style={{ fontSize: '10px', color: '#0052FF', fontWeight: 'bold', marginTop: '4px' }}>
          Connect wallet to purchase
        </div>
      )}
      {isConnected && (
        <div style={{ fontSize: '10px', color: '#666' }}>
          Click to purchase
        </div>
      )}
    </div>
  );
}

