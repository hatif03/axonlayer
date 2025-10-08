'use client';

import React from 'react';
import { AdProvider, AdSlot } from 'axon-sdk';

// Next.js usage example with environment variables
export function NextJSAdExample() {
  // In Next.js, you can use environment variables
  const config = {
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID || 'nextjs-website-001',
    walletAddress: process.env.NEXT_PUBLIC_WALLET_ADDRESS || '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.axonlayer.com',
    theme: {
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      borderColor: '#e5e5e5',
      fontFamily: 'JetBrains Mono, monospace',
      borderRadius: 0
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Next.js Ad Platform Example</h1>
      <p className="text-gray-600 mb-8">
        This example shows how to use the Axon SDK in a Next.js application with environment variables.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Banner Ad</h2>
          <AdProvider 
            config={config}
            onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Square Ad</h2>
          <AdProvider 
            config={config}
            onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Mobile Ad</h2>
          <AdProvider 
            config={config}
            onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
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

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Card Ad</h2>
          <AdProvider 
            config={config}
            onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
          >
            <AdSlot
              slotId="card-001"
              size="card"
              price="0.08"
              durations={['1h', '6h', '24h']}
              category="technology"
              clickable={true}
              onSlotClick={(slotId) => console.log('Card clicked:', slotId)}
            />
          </AdProvider>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Leaderboard Ad</h2>
          <AdProvider 
            config={config}
            onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
            walletConnectProjectId={process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}
          >
            <AdSlot
              slotId="leaderboard-001"
              size="leaderboard"
              price="0.15"
              durations={['6h', '24h', '7d']}
              category="general"
              clickable={true}
              onSlotClick={(slotId) => console.log('Leaderboard clicked:', slotId)}
            />
          </AdProvider>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Environment Variables</h3>
        <p className="text-sm text-gray-600 mb-4">
          Make sure to set these environment variables in your <code>.env.local</code> file:
        </p>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
{`NEXT_PUBLIC_WEBSITE_ID=your-website-id
NEXT_PUBLIC_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
NEXT_PUBLIC_API_BASE_URL=https://api.axonlayer.com
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_PAYMASTER_URL=https://paymaster.base.org`}
        </pre>
      </div>
    </div>
  );
}

export default NextJSAdExample;
