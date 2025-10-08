'use client';

import React, { useEffect } from 'react';
// import { OnchainKitProvider } from '@coinbase/onchainkit';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdContextProvider } from './components/AdContextProvider';
import { initializeWalletConnect } from '../lib/walletConnectSingleton';

// Create wagmi config with Base networks and native features
const createWagmiConfig = (walletConnectProjectId?: string) => createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'AxonLayer Ad Platform',
      appLogoUrl: '/logo.png',
    }),
    ...(walletConnectProjectId ? [walletConnect({
      projectId: walletConnectProjectId,
    })] : []),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

// Create a client for React Query
const queryClient = new QueryClient();

// Create stable wagmi config instance
const wagmiConfig = createWagmiConfig(process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID);

interface ProvidersProps {
  children: React.ReactNode;
  onchainKitApiKey?: string;
  walletConnectProjectId?: string;
  websiteId: string;
  walletAddress: string;
  apiBaseUrl?: string;
  paymasterUrl?: string;
}

export function Providers({
  children,
  onchainKitApiKey,
  walletConnectProjectId,
  websiteId,
  walletAddress,
  apiBaseUrl = 'https://api.axonlayer.com',
  paymasterUrl = 'https://paymaster.base.org'
}: ProvidersProps) {
  // Initialize WalletConnect only once
  useEffect(() => {
    initializeWalletConnect();
  }, []);

  // Ad configuration with Base native features
  const adConfig = {
    websiteId,
    walletAddress,
    apiBaseUrl,
    theme: {
      primaryColor: '#0052FF', // Base blue
      backgroundColor: '#ffffff',
      textColor: '#000000',
      borderColor: '#e5e5e5',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: 8
    },
    payment: {
      networks: ['base', 'base-sepolia'],
      defaultNetwork: 'base',
      recipientAddress: walletAddress,
      supportedTokens: [
        {
          symbol: 'USDC',
          address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // Base USDC
          decimals: 6,
          chainId: 8453
        },
        {
          symbol: 'ETH',
          address: '0x0000000000000000000000000000000000000000', // Native ETH
          decimals: 18,
          chainId: 8453
        }
      ],
      sponsorship: {
        enabled: true,
        paymasterUrl
      }
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={wagmiConfig}>
        <AdContextProvider
          websiteId={websiteId}
          walletAddress={walletAddress}
          apiBaseUrl={apiBaseUrl}
        >
          {children}
        </AdContextProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
