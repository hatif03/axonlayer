// 3. components/AdSlot.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AdSlotProps {
  slotId: string;
  size?: 'banner' | 'square' | 'sidebar' | 'leaderboard' | 'mobile' | 'card';
  price?: string;
  durations?: string[];
  category?: string;
  className?: string;
  clickable?: boolean;
}

export const AdSlot: React.FC<AdSlotProps> = ({
  slotId,
  size = 'banner',
  price = '0.10',
  durations = ['30m', '1h', '6h', '24h'],
  category = 'general',
  className = '',
  clickable = true
}) => {
  const slotRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [adContent, setAdContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAd, setHasAd] = useState(false);
  const [queueInfo, setQueueInfo] = useState<{
    position: number;
    totalInQueue: number;
    nextActivation?: string;
    isAvailable: boolean;
  } | null>(null);

  // Function to fetch ad content
  const fetchAdContent = async () => {
    try {
      setIsLoading(true);
      
      // Check if there's an ad for this slot
      const response = await fetch(`/api/ads/${slotId}`);
      
      if (response.ok) {
        const adData = await response.json();
        if (adData.hasAd && adData.contentUrl) {
          setAdContent(adData.contentUrl);
          setHasAd(true);
        } else {
          setHasAd(false);
        }
      } else {
        setHasAd(false);
      }
    } catch (error) {
      console.error('Error fetching ad content:', error);
      setHasAd(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to fetch queue information
  const fetchQueueInfo = async () => {
    try {
      const response = await fetch(`/api/queue-info/${slotId}`);
      if (response.ok) {
        const queueData = await response.json();
        setQueueInfo(queueData);
      }
    } catch (error) {
      console.error('Error fetching queue info:', error);
    }
  };

  useEffect(() => {
    if (slotRef.current) {
      slotRef.current.setAttribute('data-slot-id', slotId);
      slotRef.current.setAttribute('data-size', size);
      slotRef.current.setAttribute('data-price', price);
      slotRef.current.setAttribute('data-durations', durations.join(','));
      slotRef.current.setAttribute('data-category', category);
    }
    
          // Fetch ad content and queue info when component mounts
          fetchAdContent();
          fetchQueueInfo();
  }, [slotId, size, price, durations, category]);

  const handleSlotClick = () => {
    if (clickable) {
      const params = new URLSearchParams({
        slotId,
        price,
        size,
        durations: durations.join(','),
        category
      });
      router.push(`/checkout?${params.toString()}`);
    }
  };

  const dimensions = getDimensions(size);
  const fontSizes = getOptimalFontSizes(dimensions);

  // If loading, show loading state
  if (isLoading) {
    return (
      <div
        ref={slotRef}
        className={`ad-slot ${className}`}
        style={{
          width: dimensions.width,
          height: dimensions.height,
          maxWidth: '100%',
          maxHeight: '100%',
          border: '2px dashed hsl(var(--border))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'hsl(var(--background))',
          padding: '4px',
          boxSizing: 'border-box',
          overflow: 'hidden',
          position: 'relative',
          margin: '0 auto'
        }}
      >
        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent"></div>
      </div>
    );
  }

        // If ad exists, show the ad with "Book Next Slot" button
        if (hasAd && adContent) {
          return (
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                ref={slotRef}
                className={`ad-slot ${className}`}
                style={{
                  width: dimensions.width,
                  height: dimensions.height,
                  maxWidth: '100%',
                  maxHeight: '100%',
                  border: '2px solid hsl(var(--border))',
                  backgroundColor: 'hsl(var(--background))',
                  boxSizing: 'border-box',
                  overflow: 'hidden',
                  position: 'relative',
                  margin: '0 auto'
                }}
              >
                <img
                  src={adContent}
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
                    // If image fails to load, fall back to placeholder
                    setHasAd(false);
                    setAdContent(null);
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
                    backgroundColor: 'hsl(var(--primary))',
                    color: 'hsl(var(--primary-foreground))',
                    border: 'none',
                    borderRadius: '0',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'JetBrains Mono, monospace',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                    zIndex: 10,
                    padding: queueInfo && queueInfo.totalInQueue > 0 ? '0 6px' : '0'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--primary) / 0.9)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'hsl(var(--primary))';
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

  // Show placeholder slot for purchase
  return (
    <div
      ref={slotRef}
      className={`ad-slot ${className} ${clickable ? 'cursor-pointer hover:bg-secondary transition-colors' : ''}`}
      onClick={handleSlotClick}
      style={{
        width: dimensions.width,
        height: dimensions.height,
        maxWidth: '100%',
        maxHeight: '100%',
        border: '2px dashed hsl(var(--border))',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'hsl(var(--background))',
        padding: '4px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        margin: '0 auto'
      }}
    >
      <div 
        style={{ 
          textAlign: 'center', 
          color: 'hsl(var(--foreground))',
          fontFamily: 'JetBrains Mono, monospace',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      >
        <div style={{ fontSize: fontSizes.icon, marginBottom: '2px', lineHeight: '1' }}>💳</div>
        <div style={{ fontSize: fontSizes.title, fontWeight: '600', marginBottom: '1px', lineHeight: '1.1' }}>
          Ad Slot: {slotId}
        </div>
        <div style={{ fontSize: fontSizes.subtitle, marginBottom: '1px', lineHeight: '1.1', color: 'hsl(var(--muted-foreground))' }}>
          {price} USDC • {size}
        </div>
        {queueInfo && !queueInfo.isAvailable && (
          <div style={{ fontSize: fontSizes.small, marginBottom: '1px', lineHeight: '1.1', color: 'hsl(var(--primary))', fontWeight: 'bold' }}>
            {queueInfo.totalInQueue} in queue
          </div>
        )}
        <div style={{ fontSize: fontSizes.small, marginBottom: '1px', lineHeight: '1.1', color: 'hsl(var(--muted-foreground))' }}>
          Polygon USDC
        </div>
        {clickable && (
          <div style={{ fontSize: fontSizes.small, lineHeight: '1.1', color: 'hsl(var(--muted-foreground))' }}>
            {queueInfo && !queueInfo.isAvailable ? 'Click to bid' : 'Click to purchase'}
          </div>
        )}
      </div>
    </div>
  );
};

function getDimensions(size: string) {
  const dimensions = {
    banner: { width: 728, height: 90 },
    leaderboard: { width: 728, height: 90 },
    square: { width: 300, height: 250 },
    sidebar: { width: 160, height: 600 },
    mobile: { width: 320, height: 60 }, // Increased height for better content fit
    card: { width: 300, height: 220 } // Increased height for better content fit
  };
  return dimensions[size as keyof typeof dimensions] || dimensions.banner;
}

function getOptimalFontSizes(dimensions: { width: number; height: number }) {
  const { width, height } = dimensions;
  const area = width * height;
  
  // Calculate font sizes based on slot dimensions
  const baseSize = Math.min(width, height) * 0.08; // 8% of smallest dimension
  
  return {
    icon: `${Math.max(12, Math.min(24, baseSize * 1.5))}px`,
    title: `${Math.max(8, Math.min(14, baseSize))}px`,
    subtitle: `${Math.max(7, Math.min(12, baseSize * 0.8))}px`,
    small: `${Math.max(6, Math.min(10, baseSize * 0.7))}px`
  };
}

// 4. utils/usdcService.ts
export interface USDCConfig {
  address: string;
  name: string;
  decimals: number;
  version: string;
}

export interface PaymentSignatureData {
  signature: string;
  domain: unknown;
  types: unknown;
  message: unknown;
  userAddress: string;
  paymentInfo: unknown;
  usdcConfig: USDCConfig;
  chainId: number;
}

// USDC contract configurations
export const USDC_CONTRACTS = {
  "137": {
    address: "0x3c499c542cef5e3811e1192ce70d8cc03d5c3359",
    name: "USD Coin",
    decimals: 6,
    version: "2"
  },
  "80002": {
    address: "0x41E94Eb019C0762f9Bfcf9Fb1E58725BfB0e7582", 
    name: "USDC",
    decimals: 6,
    version: "2"
  }
} as const;

export class USDCService {
  /**
   * Get USDC configuration for a specific chain
   */
  static getUSDCConfig(chainId: number): USDCConfig | null {
    const config = USDC_CONTRACTS[chainId.toString() as keyof typeof USDC_CONTRACTS];
    return config || null;
  }

  /**
   * Check if chain is supported
   */
  static isSupportedChain(chainId: number): boolean {
    return chainId === 137 || chainId === 80002; // Polygon Mainnet or Amoy
  }

  /**
   * Generate EIP-3009 transferWithAuthorization signature
   */
  static async generateEIP3009Signature(
    walletClient: unknown,
    userAddress: string,
    recipient: string,
    amount: string,
    chainId: number
  ): Promise<PaymentSignatureData> {
    const usdcConfig = this.getUSDCConfig(chainId);
    
    if (!usdcConfig) {
      throw new Error(`Unsupported network. Chain ID: ${chainId}`);
    }

    // EIP-712 domain with correct USDC details
    const domain = {
      name: usdcConfig.name,
      version: usdcConfig.version,
      chainId,
      verifyingContract: usdcConfig.address
    };

    // EIP-3009 types
    const types = {
      TransferWithAuthorization: [
        { name: 'from', type: 'address' },
        { name: 'to', type: 'address' },
        { name: 'value', type: 'uint256' },
        { name: 'validAfter', type: 'uint256' },
        { name: 'validBefore', type: 'uint256' },
        { name: 'nonce', type: 'bytes32' }
      ]
    };

    // Generate random nonce
    const nonce = '0x' + Array.from(crypto.getRandomValues(new Uint8Array(32)))
      .map(b => b.toString(16).padStart(2, '0')).join('');
    
    // Convert amount to wei (6 decimals for USDC)
    const value = (parseFloat(amount) * Math.pow(10, usdcConfig.decimals)).toString();
    
    // Time validity
    const currentTime = Math.floor(Date.now() / 1000);
    const validAfter = 0;
    const validBefore = currentTime + 3600; // Valid for 1 hour

    // Message to sign
    const message = {
      from: userAddress,
      to: recipient,
      value,
      validAfter,
      validBefore,
      nonce
    };

    // Sign the message
    const signature = await (walletClient as { signTypedData: (args: unknown) => Promise<string> }).signTypedData({
      domain,
      types,
      primaryType: 'TransferWithAuthorization',
      message
    });

    return {
      signature,
      domain,
      types,
      message,
      userAddress,
      paymentInfo: { amount, recipient },
      usdcConfig,
      chainId
    };
  }

  /**
   * Send signed data to x402 endpoint
   */
  static async sendToX402(
    endpoint: string,
    signatureData: PaymentSignatureData,
    additionalData: unknown = {}
  ): Promise<unknown> {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${signatureData.signature}`
      },
      body: JSON.stringify({
        signature: signatureData.signature,
        signatureData,
        ...(additionalData as Record<string, unknown>),
        timestamp: Date.now()
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `HTTP ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Format address for display
   */
  static formatAddress(address: string): string {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }

  /**
   * Get network name from chain ID
   */
  static getNetworkName(chainId: number): string {
    switch (chainId) {
      case 137:
        return 'Polygon Mainnet';
      case 80002:
        return 'Polygon Amoy';
      default:
        return `Chain ${chainId}`;
    }
  }
}