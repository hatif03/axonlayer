// Vite + React example
import React, { useState } from 'react';
import { AdProvider, AdSlot } from 'axon-sdk';

function ViteAdExample() {
  const [selectedSlot, setSelectedSlot] = useState('banner');

  const config = {
    websiteId: 'vite-website-001',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: 'https://api.your-ad-platform.com',
    theme: {
      primaryColor: '#646cff',
      backgroundColor: '#ffffff',
      textColor: '#213547',
      borderColor: '#e5e5e5',
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      borderRadius: 8
    },
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

  const slotConfigs = {
    banner: { size: 'banner', price: '0.10', slotId: 'vite-banner-001' },
    square: { size: 'square', price: '0.05', slotId: 'vite-square-001' },
    mobile: { size: 'mobile', price: '0.03', slotId: 'vite-mobile-001' },
    sidebar: { size: 'sidebar', price: '0.15', slotId: 'vite-sidebar-001' }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <h1 style={{ 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem',
        background: 'linear-gradient(45deg, #646cff, #747bff)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Vite + React + Axon SDK
      </h1>
      
      <p style={{ 
        fontSize: '1.1rem', 
        color: '#666', 
        marginBottom: '2rem' 
      }}>
        A modern React application with Vite and Axon SDK integration
      </p>

      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginBottom: '2rem',
        flexWrap: 'wrap'
      }}>
        {Object.entries(slotConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setSelectedSlot(key)}
            style={{
              padding: '8px 16px',
              border: selectedSlot === key ? '2px solid #646cff' : '1px solid #ccc',
              borderRadius: '6px',
              backgroundColor: selectedSlot === key ? '#f0f2ff' : '#fff',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              transition: 'all 0.2s ease'
            }}
          >
            {key.charAt(0).toUpperCase() + key.slice(1)} ({config.price} USDC)
          </button>
        ))}
      </div>

      <div style={{ 
        backgroundColor: '#fff', 
        borderRadius: '12px', 
        padding: '2rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Selected Slot: {selectedSlot.charAt(0).toUpperCase() + selectedSlot.slice(1)}
        </h2>
        
        <AdProvider 
          config={config}
          onchainKitApiKey="your_onchainkit_api_key"
          walletConnectProjectId="your_walletconnect_project_id"
        >
          <AdSlot
            slotId={slotConfigs[selectedSlot as keyof typeof slotConfigs].slotId}
            size={slotConfigs[selectedSlot as keyof typeof slotConfigs].size as any}
            price={slotConfigs[selectedSlot as keyof typeof slotConfigs].price}
            durations={['30m', '1h', '6h', '24h']}
            category="vite-demo"
            clickable={true}
            onSlotClick={(slotId) => console.log(`${selectedSlot} clicked:`, slotId)}
            onAdLoad={(adData) => console.log('Ad loaded:', adData)}
            onAdError={(error) => console.error('Ad error:', error)}
          />
        </AdProvider>
      </div>

      <div style={{ 
        marginTop: '2rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        padding: '1.5rem',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Vite Setup Instructions
        </h3>
        
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>1. Create Vite project:</h4>
            <pre style={{ 
              backgroundColor: '#1e293b', 
              color: '#e2e8f0', 
              padding: '0.75rem', 
              borderRadius: '6px',
              fontSize: '14px',
              overflow: 'auto'
            }}>
              npm create vite@latest my-ad-app -- --template react-ts
              cd my-ad-app
              npm install
            </pre>
          </div>
          
          <div>
            <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>2. Install Axon SDK:</h4>
            <pre style={{ 
              backgroundColor: '#1e293b', 
              color: '#e2e8f0', 
              padding: '0.75rem', 
              borderRadius: '6px',
              fontSize: '14px',
              overflow: 'auto'
            }}>
              npm install axon-sdk
            </pre>
          </div>
          
          <div>
            <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>3. Add OnchainKit styles to index.css:</h4>
            <pre style={{ 
              backgroundColor: '#1e293b', 
              color: '#e2e8f0', 
              padding: '0.75rem', 
              borderRadius: '6px',
              fontSize: '14px',
              overflow: 'auto'
            }}>
              @import '@coinbase/onchainkit/styles.css';
            </pre>
          </div>
          
          <div>
            <h4 style={{ fontWeight: '500', marginBottom: '0.5rem' }}>4. Configure your app:</h4>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>
              Copy the configuration from this example and adapt it to your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViteAdExample;
