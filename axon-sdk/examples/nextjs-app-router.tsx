// app/page.tsx - Next.js App Router example
'use client';

import React from 'react';
import { AdProvider, AdSlot } from 'axon-sdk';

export default function HomePage() {
  const config = {
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID || 'nextjs-app-router-001',
    walletAddress: process.env.NEXT_PUBLIC_WALLET_ADDRESS || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.your-ad-platform.com',
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
        paymasterUrl: process.env.NEXT_PUBLIC_PAYMASTER_URL || 'https://paymaster.base.org'
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Next.js App Router + Axon SDK
        </h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-semibold mb-4">Hero Banner</h2>
            <AdProvider 
              config={config}
              onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
              walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
            >
              <AdSlot
                slotId="hero-banner-001"
                size="banner"
                price="0.25"
                durations={['1h', '6h', '24h']}
                category="hero"
                clickable={true}
                onSlotClick={(slotId) => console.log('Hero banner clicked:', slotId)}
              />
            </AdProvider>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Sidebar Ad</h3>
              <AdProvider 
                config={config}
                onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
                walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
              >
                <AdSlot
                  slotId="sidebar-001"
                  size="sidebar"
                  price="0.15"
                  durations={['6h', '24h']}
                  category="sidebar"
                  clickable={true}
                  onSlotClick={(slotId) => console.log('Sidebar clicked:', slotId)}
                />
              </AdProvider>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Square Ad</h3>
              <AdProvider 
                config={config}
                onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
                walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
              >
                <AdSlot
                  slotId="square-001"
                  size="square"
                  price="0.10"
                  durations={['1h', '6h', '24h']}
                  category="content"
                  clickable={true}
                  onSlotClick={(slotId) => console.log('Square clicked:', slotId)}
                />
              </AdProvider>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Mobile Ad</h3>
            <AdProvider 
              config={config}
              onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
              walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
            >
              <AdSlot
                slotId="mobile-001"
                size="mobile"
                price="0.05"
                durations={['30m', '1h', '6h']}
                category="mobile"
                clickable={true}
                onSlotClick={(slotId) => console.log('Mobile clicked:', slotId)}
              />
            </AdProvider>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Next.js App Router Setup</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium">1. Install dependencies:</h4>
              <pre className="bg-gray-100 p-2 rounded text-sm mt-1">
                npm install axon-sdk
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium">2. Create .env.local:</h4>
              <pre className="bg-gray-100 p-2 rounded text-sm mt-1 overflow-x-auto">
{`NEXT_PUBLIC_WEBSITE_ID=your-website-id
NEXT_PUBLIC_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
NEXT_PUBLIC_API_BASE_URL=https://api.your-ad-platform.com
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_PAYMASTER_URL=https://paymaster.base.org`}
              </pre>
            </div>
            
            <div>
              <h4 className="font-medium">3. Add to your layout.tsx:</h4>
              <pre className="bg-gray-100 p-2 rounded text-sm mt-1">
{`import '@coinbase/onchainkit/styles.css';`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
