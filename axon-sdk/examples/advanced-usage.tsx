import React from 'react';
import { AdProvider, AdSlot } from 'axon-sdk';

// Advanced usage example with enhanced theme customization
export function AdvancedAdExample() {
  const config = {
    websiteId: 'advanced-website-001',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: 'https://api.axonlayer.com',
    theme: {
      primaryColor: '#0052FF', // Base blue
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      borderColor: '#e1e5e9',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: 12,
      hoverBackgroundColor: '#f8fafc',
      hoverTextColor: '#0052FF',
      secondaryTextColor: '#64748b',
      successColor: '#10b981',
      warningColor: '#f59e0b',
      errorColor: '#ef4444',
      shadowColor: 'rgba(0, 82, 255, 0.1)',
      customStyles: {
        'boxShadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    },
    payment: {
      networks: ['base', 'base-sepolia', 'mainnet', 'sepolia'],
      defaultNetwork: 'base',
      supportedTokens: [
        {
          symbol: 'USDC',
          address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
          decimals: 6,
          chainId: 8453
        },
        {
          symbol: 'ETH',
          address: '0x0000000000000000000000000000000000000000',
          decimals: 18,
          chainId: 8453
        }
      ],
      sponsorship: {
        enabled: true,
        paymasterUrl: 'https://paymaster.base.org'
      }
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Inter, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1a1a1a' }}>
        Advanced Ad Platform Example
      </h1>
      <p style={{ fontSize: '1.125rem', color: '#64748b', marginBottom: '2rem' }}>
        This example showcases the enhanced axon-sdk with improved error handling, 
        multiple wallet providers, and advanced theme customization.
      </p>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Banner Ad Slot
          </h2>
          <AdProvider 
            config={config}
            onchainKitApiKey="your_onchainkit_api_key"
            walletConnectProjectId="your_walletconnect_project_id"
          >
            <AdSlot
              slotId="banner-advanced-001"
              size="banner"
              price="0.10"
              durations={['30m', '1h', '6h', '24h']}
              category="general"
              clickable={true}
              onSlotClick={(slotId) => console.log('Banner clicked:', slotId)}
              onAdError={(error) => console.error('Ad error:', error)}
            />
          </AdProvider>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Card Ad Slot
          </h2>
          <AdProvider 
            config={config}
            onchainKitApiKey="your_onchainkit_api_key"
            walletConnectProjectId="your_walletconnect_project_id"
          >
            <AdSlot
              slotId="card-advanced-001"
              size="card"
              price="0.08"
              durations={['1h', '6h', '24h']}
              category="technology"
              clickable={true}
              onSlotClick={(slotId) => console.log('Card clicked:', slotId)}
              onAdError={(error) => console.error('Ad error:', error)}
            />
          </AdProvider>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Leaderboard Ad Slot
        </h2>
        <div style={{ 
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          padding: '2rem',
          borderRadius: '16px',
          color: 'white'
        }}>
          <AdProvider 
            config={config}
            onchainKitApiKey="your_onchainkit_api_key"
            walletConnectProjectId="your_walletconnect_project_id"
          >
            <AdSlot
              slotId="leaderboard-advanced-001"
              size="leaderboard"
              price="0.15"
              durations={['6h', '24h', '7d']}
              category="general"
              clickable={true}
              onSlotClick={(slotId) => console.log('Leaderboard clicked:', slotId)}
              onAdError={(error) => console.error('Ad error:', error)}
            />
          </AdProvider>
        </div>
      </div>

      <div style={{ 
        background: '#f8fafc',
        padding: '2rem',
        borderRadius: '12px',
        border: '1px solid #e1e5e9'
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Enhanced Features
        </h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>✅</span>
            <strong>New Size Options:</strong> Card (300x200) and Leaderboard (970x90)
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>✅</span>
            <strong>Enhanced Error Handling:</strong> Timeout, retry logic, and graceful fallbacks
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>✅</span>
            <strong>Advanced Theme Options:</strong> Hover states, success/error colors, custom styles
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>✅</span>
            <strong>Multiple Wallet Providers:</strong> MetaMask, Coinbase Wallet, WalletConnect, Injected
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>✅</span>
            <strong>Multi-Network Support:</strong> Base, Base Sepolia, Mainnet, Sepolia
          </li>
          <li style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
            <span style={{ marginRight: '0.5rem' }}>✅</span>
            <strong>Improved API Handling:</strong> Better error messages and fallback behavior
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AdvancedAdExample;