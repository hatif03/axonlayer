import React from 'react';
import { AdProvider, AdSlot } from 'axon-sdk';

// Basic usage example
export function BasicAdExample() {
  const config = {
    websiteId: 'example-website-001',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: 'https://api.your-ad-platform.com',
    theme: {
      primaryColor: '#0052ff',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      borderColor: '#e5e5e5',
      fontFamily: 'Inter, sans-serif',
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

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif' }}>
      <h1>Basic Ad Platform Example</h1>
      <p>This example shows how to use the Axon SDK with basic configuration.</p>
      
      <div style={{ margin: '20px 0' }}>
        <h2>Banner Ad Slot</h2>
        <AdProvider 
          config={config}
          onchainKitApiKey="your_onchainkit_api_key"
          walletConnectProjectId="your_walletconnect_project_id"
        >
          <AdSlot
            slotId="banner-001"
            size="banner"
            price="0.10"
            durations={['30m', '1h', '6h', '24h']}
            category="general"
            clickable={true}
            onSlotClick={(slotId) => console.log('Banner clicked:', slotId)}
          />
        </AdProvider>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Square Ad Slot</h2>
        <AdProvider 
          config={config}
          onchainKitApiKey="your_onchainkit_api_key"
          walletConnectProjectId="your_walletconnect_project_id"
        >
          <AdSlot
            slotId="square-001"
            size="square"
            price="0.05"
            durations={['1h', '6h', '24h']}
            category="technology"
            clickable={true}
            onSlotClick={(slotId) => console.log('Square clicked:', slotId)}
          />
        </AdProvider>
      </div>

      <div style={{ margin: '20px 0' }}>
        <h2>Mobile Ad Slot</h2>
        <AdProvider 
          config={config}
          onchainKitApiKey="your_onchainkit_api_key"
          walletConnectProjectId="your_walletconnect_project_id"
        >
          <AdSlot
            slotId="mobile-001"
            size="mobile"
            price="0.03"
            durations={['30m', '1h', '6h']}
            category="mobile"
            clickable={true}
            onSlotClick={(slotId) => console.log('Mobile clicked:', slotId)}
          />
        </AdProvider>
      </div>
    </div>
  );
}

export default BasicAdExample;
