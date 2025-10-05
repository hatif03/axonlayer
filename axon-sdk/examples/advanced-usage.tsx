import React, { useState, useCallback } from 'react';
import { AdProvider, AdSlot, useAdContext } from 'axon-sdk';

// Advanced usage example with custom components and hooks
function CustomAdSlot({ slotId, size, price }: { slotId: string; size: string; price: string }) {
  const { config } = useAdContext();
  const [isPurchased, setIsPurchased] = useState(false);

  const handleSlotClick = useCallback((slotId: string) => {
    console.log(`Custom slot clicked: ${slotId}`);
    // Custom logic for slot interaction
    setIsPurchased(true);
  }, []);

  const customEmptySlotComponent = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '20px',
      backgroundColor: '#f8f9fa',
      border: '2px dashed #dee2e6',
      borderRadius: '8px',
      textAlign: 'center'
    }}>
      <div style={{ fontSize: '24px', marginBottom: '10px' }}>🎯</div>
      <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px' }}>
        Custom Ad Slot
      </div>
      <div style={{ fontSize: '14px', color: '#6c757d', marginBottom: '10px' }}>
        {price} USDC • {size}
      </div>
      <div style={{ fontSize: '12px', color: '#6c757d' }}>
        Click to purchase this premium slot
      </div>
    </div>
  );

  const customLoadingComponent = (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      padding: '20px'
    }}>
      <div style={{ 
        width: '20px', 
        height: '20px', 
        border: '2px solid #f3f3f3',
        borderTop: '2px solid #0052ff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '10px'
      }}></div>
      <div style={{ fontSize: '14px', color: '#6c757d' }}>
        Loading ad data...
      </div>
    </div>
  );

  if (isPurchased) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        padding: '20px',
        backgroundColor: '#d4edda',
        border: '2px solid #c3e6cb',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '24px', marginBottom: '10px' }}>✅</div>
        <div style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '5px', color: '#155724' }}>
          Slot Purchased!
        </div>
        <div style={{ fontSize: '14px', color: '#155724' }}>
          Your ad will be displayed here
        </div>
      </div>
    );
  }

  return (
    <AdSlot
      slotId={slotId}
      size={size as any}
      price={price}
      durations={['30m', '1h', '6h', '24h']}
      category="premium"
      clickable={true}
      onSlotClick={handleSlotClick}
      onAdLoad={(adData) => console.log('Ad loaded:', adData)}
      onAdError={(error) => console.error('Ad error:', error)}
      loadingComponent={customLoadingComponent}
      emptySlotComponent={customEmptySlotComponent}
    />
  );
}

export function AdvancedAdExample() {
  const [selectedTheme, setSelectedTheme] = useState('default');

  const themes = {
    default: {
      primaryColor: '#0052ff',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      borderColor: '#e5e5e5',
      fontFamily: 'Inter, sans-serif',
      borderRadius: 8
    },
    dark: {
      primaryColor: '#00d4ff',
      backgroundColor: '#1a1a1a',
      textColor: '#ffffff',
      borderColor: '#333333',
      fontFamily: 'Inter, sans-serif',
      borderRadius: 8
    },
    purple: {
      primaryColor: '#8b5cf6',
      backgroundColor: '#faf5ff',
      textColor: '#1f2937',
      borderColor: '#e5e7eb',
      fontFamily: 'Inter, sans-serif',
      borderRadius: 12
    }
  };

  const config = {
    websiteId: 'advanced-website-001',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: 'https://api.your-ad-platform.com',
    theme: themes[selectedTheme as keyof typeof themes],
    payment: {
      networks: ['base', 'base-sepolia'],
      defaultNetwork: 'base',
      supportedTokens: [{
        symbol: 'USDC',
        address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
        decimals: 6,
        chainId: 8453
      }],
      sponsorship: {
        enabled: true,
        paymasterUrl: 'https://paymaster.base.org'
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1>Advanced Ad Platform Example</h1>
      <p>This example shows advanced features like custom components, themes, and hooks.</p>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Theme Selector</h2>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
          {Object.keys(themes).map(theme => (
            <button
              key={theme}
              onClick={() => setSelectedTheme(theme)}
              style={{
                padding: '8px 16px',
                border: selectedTheme === theme ? '2px solid #0052ff' : '1px solid #ccc',
                borderRadius: '4px',
                backgroundColor: selectedTheme === theme ? '#f0f8ff' : '#fff',
                cursor: 'pointer'
              }}
            >
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <AdProvider 
        config={config}
        onchainKitApiKey="your_onchainkit_api_key"
        walletConnectProjectId="your_walletconnect_project_id"
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div>
            <h3>Custom Banner Slot</h3>
            <CustomAdSlot slotId="custom-banner-001" size="banner" price="0.15" />
          </div>
          
          <div>
            <h3>Custom Square Slot</h3>
            <CustomAdSlot slotId="custom-square-001" size="square" price="0.08" />
          </div>
          
          <div>
            <h3>Custom Mobile Slot</h3>
            <CustomAdSlot slotId="custom-mobile-001" size="mobile" price="0.05" />
          </div>
        </div>
      </AdProvider>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
        <h3>Advanced Features Demonstrated:</h3>
        <ul style={{ marginLeft: '20px' }}>
          <li>Custom loading components</li>
          <li>Custom empty slot components</li>
          <li>Dynamic theme switching</li>
          <li>Custom click handlers</li>
          <li>Ad load/error callbacks</li>
          <li>useAdContext hook usage</li>
          <li>State management with ad slots</li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default AdvancedAdExample;
