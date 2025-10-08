'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AdSlotProps, AdData, QueueInfo, AdError } from '../types';
import { useAdContext } from './AdProvider';
import { useAccount } from 'wagmi';

// Default slot dimensions
const SLOT_DIMENSIONS = {
  banner: { width: 728, height: 90 },
  square: { width: 300, height: 250 },
  mobile: { width: 320, height: 60 },
  sidebar: { width: 160, height: 600 },
  card: { width: 300, height: 200 },
  leaderboard: { width: 970, height: 90 }
};

// Default font sizes based on slot dimensions
const getOptimalFontSizes = (width: number, height: number) => {
  const baseSize = Math.min(width, height);
  return {
    icon: Math.max(12, baseSize * 0.08),
    title: Math.max(10, baseSize * 0.06),
    subtitle: Math.max(8, baseSize * 0.05),
    small: Math.max(6, baseSize * 0.04)
  };
};

// Default loading component
const DefaultLoadingComponent: React.FC = () => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '12px',
    color: '#666'
  }}>
    Loading...
  </div>
);

// Default error component
const DefaultErrorComponent: React.FC<{ error: AdError; theme?: any }> = ({ error, theme }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    fontFamily: theme?.fontFamily || 'JetBrains Mono, monospace',
    fontSize: '10px',
    color: theme?.errorColor || '#c00',
    textAlign: 'center',
    padding: '8px',
    backgroundColor: theme?.backgroundColor || '#ffffff',
    border: `1px solid ${theme?.borderColor || '#e5e5e5'}`,
    borderRadius: theme?.borderRadius || 0
  }}>
    Error: {error.message}
  </div>
);

// Enhanced empty slot component with wallet connection
const DefaultEmptySlotComponent: React.FC<{
  slotId: string;
  price: string;
  size: string;
  queueInfo: QueueInfo | null;
  onClick: () => void;
  clickable: boolean;
  theme: any;
  isConnected: boolean;
}> = ({ slotId, price, size, queueInfo, onClick, clickable, theme, isConnected }) => {
  const dimensions = SLOT_DIMENSIONS[size as keyof typeof SLOT_DIMENSIONS];
  const fontSizes = getOptimalFontSizes(dimensions.width, dimensions.height);

  return (
    <div
      onClick={clickable ? onClick : undefined}
      style={{
        width: '100%',
        height: '100%',
        border: `2px dashed ${theme.borderColor}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.backgroundColor,
        padding: '4px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        cursor: clickable ? 'pointer' : 'default',
        fontFamily: theme.fontFamily,
        color: theme.textColor,
        transition: 'all 0.2s ease'
      }}
      onMouseEnter={(e) => {
        if (clickable) {
          e.currentTarget.style.backgroundColor = theme.hoverBackgroundColor || '#f5f5f5';
          e.currentTarget.style.color = theme.hoverTextColor || theme.textColor;
        }
      }}
      onMouseLeave={(e) => {
        if (clickable) {
          e.currentTarget.style.backgroundColor = theme.backgroundColor;
          e.currentTarget.style.color = theme.textColor;
        }
      }}
    >
      <div style={{ fontSize: fontSizes.icon, marginBottom: '2px', lineHeight: '1' }}>💳</div>
      <div style={{ fontSize: fontSizes.title, fontWeight: '600', marginBottom: '1px', lineHeight: '1.1' }}>
        Ad Slot: {slotId}
      </div>
      <div style={{ fontSize: fontSizes.subtitle, marginBottom: '1px', lineHeight: '1.1', color: theme.secondaryTextColor || '#666' }}>
        {price} USDC • {size}
      </div>
      {queueInfo && !queueInfo.isAvailable && (
        <div style={{ fontSize: fontSizes.small, marginBottom: '1px', lineHeight: '1.1', color: theme.primaryColor, fontWeight: 'bold' }}>
          {queueInfo.totalInQueue} in queue
        </div>
      )}
      <div style={{ fontSize: fontSizes.small, marginBottom: '1px', lineHeight: '1.1', color: theme.secondaryTextColor || '#666' }}>
        Base USDC
      </div>
      {!isConnected && (
        <div style={{ fontSize: fontSizes.small, lineHeight: '1.1', color: theme.primaryColor, fontWeight: 'bold' }}>
          Connect wallet to purchase
        </div>
      )}
      {isConnected && clickable && (
        <div style={{ fontSize: fontSizes.small, lineHeight: '1.1', color: theme.secondaryTextColor || '#666' }}>
          {queueInfo && !queueInfo.isAvailable ? 'Click to bid' : 'Click to purchase'}
        </div>
      )}
    </div>
  );
};

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  size = 'banner',
  price = '0.10',
  durations = ['30m', '1h', '6h', '24h'],
  category = 'general',
  className = '',
  clickable = true,
  dimensions: customDimensions,
  onSlotClick,
  onAdLoad,
  onAdError,
  loadingComponent,
  errorComponent,
  emptySlotComponent,
  ...props
}) => {
  const { config, apiBaseUrl } = useAdContext();
  const { address, isConnected } = useAccount();
  const [adData, setAdData] = useState<AdData | null>(null);
  const [queueInfo, setQueueInfo] = useState<QueueInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AdError | null>(null);
  const [showTransaction, setShowTransaction] = useState(false);
  const slotRef = useRef<HTMLDivElement>(null);

  // Get slot dimensions
  const slotDimensions = customDimensions || SLOT_DIMENSIONS[size as keyof typeof SLOT_DIMENSIONS];
  const fontSizes = getOptimalFontSizes(slotDimensions.width, slotDimensions.height);

  // Fetch ad data with improved error handling
  const fetchAdData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Add timeout and retry logic
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(`${apiBaseUrl}/api/ads/${slotId}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 404) {
          // No ad found - this is not an error, just empty slot
          setAdData({ hasAd: false });
          return;
        }
        
        if (response.status >= 500) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        
        if (response.status === 403) {
          throw new Error('Access forbidden - check your API configuration');
        }
        
        if (response.status === 0) {
          // CORS or network issue
          throw new Error('Network error - check your API endpoint and CORS configuration');
        }
        
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setAdData(data);
      
      if (data.hasAd && onAdLoad) {
        onAdLoad(data);
      }
    } catch (err) {
      let errorMessage = 'Failed to fetch ad data';
      let errorCode = 'FETCH_ERROR';

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'Request timeout - please check your connection';
          errorCode = 'TIMEOUT_ERROR';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Network error - please check your internet connection';
          errorCode = 'NETWORK_ERROR';
        } else if (err.message.includes('CORS')) {
          errorMessage = 'CORS error - API server configuration issue';
          errorCode = 'CORS_ERROR';
        } else {
          errorMessage = err.message;
        }
      }

      // For network errors, show empty slot instead of error
      if (errorCode === 'NETWORK_ERROR' || errorCode === 'CORS_ERROR') {
        console.warn('API not available, showing empty slot:', errorMessage);
        setAdData({ hasAd: false });
        return;
      }

      const error: AdError = {
        code: errorCode,
        message: errorMessage,
        details: err
      };
      setError(error);
      
      if (onAdError) {
        onAdError(err instanceof Error ? err : new Error(errorMessage));
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiBaseUrl, slotId, onAdLoad, onAdError]);

  // Fetch queue info with improved error handling
  const fetchQueueInfo = useCallback(async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for queue info

      const response = await fetch(`${apiBaseUrl}/api/queue-info/${slotId}`, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        setQueueInfo(data);
      } else if (response.status !== 404) {
        // 404 is expected if no queue exists, other errors should be logged
        console.warn(`Queue info fetch failed: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.warn('Failed to fetch queue info:', err.message);
      }
    }
  }, [apiBaseUrl, slotId]);

  // Handle transaction status
  const handleTransactionStatus = useCallback((status: any) => {
    console.log('Transaction status:', status);
    if (status.statusName === 'success') {
      setShowTransaction(false);
      // Refresh ad data after successful purchase
      fetchAdData();
    }
  }, [fetchAdData]);

  // Handle slot click
  const handleSlotClick = useCallback(() => {
    if (onSlotClick) {
      onSlotClick(slotId);
    } else if (isConnected) {
      setShowTransaction(true);
    } else {
      // Show wallet connection prompt
      console.log('Please connect your wallet to purchase ad slots');
    }
  }, [onSlotClick, slotId, isConnected]);

  // Initial data fetch
  useEffect(() => {
    fetchAdData();
    fetchQueueInfo();
  }, [fetchAdData, fetchQueueInfo]);

  // Set slot attributes for external tracking
  useEffect(() => {
    if (slotRef.current) {
      slotRef.current.setAttribute('data-slot-id', slotId);
      slotRef.current.setAttribute('data-size', size);
      slotRef.current.setAttribute('data-price', price);
      slotRef.current.setAttribute('data-durations', durations.join(','));
      slotRef.current.setAttribute('data-category', category);
      slotRef.current.setAttribute('data-website-id', config.websiteId);
    }
  }, [slotId, size, price, durations, category, config.websiteId]);

  // Loading state
  if (isLoading) {
    return (
      <div
        ref={slotRef}
        className={`ad-slot ${className}`}
        style={{
          width: slotDimensions.width,
          height: slotDimensions.height,
          maxWidth: '100%',
          maxHeight: '100%',
          border: `2px solid ${config.theme?.borderColor}`,
          backgroundColor: config.theme?.backgroundColor,
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          margin: '0 auto'
        }}
      >
        {loadingComponent || <DefaultLoadingComponent />}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        ref={slotRef}
        className={`ad-slot ${className}`}
        style={{
          width: slotDimensions.width,
          height: slotDimensions.height,
          maxWidth: '100%',
          maxHeight: '100%',
          border: `2px solid ${config.theme?.borderColor}`,
          backgroundColor: config.theme?.backgroundColor,
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          margin: '0 auto'
        }}
      >
        {errorComponent || <DefaultErrorComponent error={error} theme={config.theme} />}
      </div>
    );
  }

  // Ad exists - show the ad
  if (adData?.hasAd && adData.contentUrl) {
    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div
          ref={slotRef}
          className={`ad-slot ${className}`}
          style={{
            width: slotDimensions.width,
            height: slotDimensions.height,
            maxWidth: '100%',
            maxHeight: '100%',
            border: `2px solid ${config.theme?.borderColor}`,
            backgroundColor: config.theme?.backgroundColor,
            boxSizing: 'border-box',
            overflow: 'hidden',
            position: 'relative',
            margin: '0 auto'
          }}
        >
          <img
            src={adData.contentUrl}
            alt="Advertisement"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              cursor: 'pointer'
            }}
            onClick={() => {
              // Track ad click if needed
              console.log(`Ad clicked: ${slotId}`);
            }}
            onError={() => {
              // If image fails to load, fall back to empty slot
              setAdData({ hasAd: false });
            }}
          />
        </div>
        
        {/* Book Next Slot Button */}
        {clickable && (
          <button
            onClick={handleSlotClick}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              minWidth: '24px',
              height: '24px',
              backgroundColor: config.theme?.primaryColor,
              color: config.theme?.backgroundColor,
              border: 'none',
              borderRadius: config.theme?.borderRadius || 0,
              fontSize: '10px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: config.theme?.fontFamily,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.2s ease',
              zIndex: 10,
              padding: queueInfo && queueInfo.totalInQueue > 0 ? '0 6px' : '0'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${config.theme?.primaryColor || '#000000'}dd`;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = config.theme?.primaryColor || '#000000';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title={queueInfo && queueInfo.totalInQueue > 0 
              ? `Book next slot (${queueInfo.totalInQueue} in queue)` 
              : "Book next slot"
            }
          >
            {queueInfo && queueInfo.totalInQueue > 0 ? queueInfo.totalInQueue : '+'}
          </button>
        )}
      </div>
    );
  }

  // Empty slot - show purchase option with OnchainKit integration
  return (
    <div
      ref={slotRef}
      className={`ad-slot ${className}`}
      style={{
        width: slotDimensions.width,
        height: slotDimensions.height,
        maxWidth: '100%',
        maxHeight: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        margin: '0 auto'
      }}
    >
      {!isConnected ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔗</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
            Connect Wallet
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Connect your wallet to purchase ad slots
          </div>
        </div>
      ) : showTransaction ? (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>⏳</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '5px' }}>
            Processing Transaction
          </div>
          <div style={{ fontSize: '12px', color: '#666' }}>
            Please wait while your transaction is processed
          </div>
        </div>
      ) : (
        emptySlotComponent || (
          <DefaultEmptySlotComponent
            slotId={slotId}
            price={price}
            size={size}
            queueInfo={queueInfo}
            onClick={handleSlotClick}
            clickable={clickable}
            theme={config.theme || {}}
            isConnected={isConnected}
          />
        )
      )}
    </div>
  );
};


