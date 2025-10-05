'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AdConfig, AdContextType, AdError } from '../types';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { OnchainKitProvider } from '@coinbase/onchainkit';

// Create wagmi config with Base networks
const createWagmiConfig = (walletConnectProjectId?: string) => createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'Ad Platform',
      appLogoUrl: 'https://your-ad-platform.com/logo.png',
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

// Create the context
const AdContext = createContext<AdContextType | null>(null);

// Provider component
export const AdProvider: React.FC<{
  config: AdConfig;
  children: React.ReactNode;
  onchainKitApiKey?: string;
  walletConnectProjectId?: string;
  paymasterUrl?: string;
}> = ({ config, children, onchainKitApiKey, walletConnectProjectId, paymasterUrl }) => {
  const [error, setError] = useState<AdError | null>(null);

  // Validate configuration
  useEffect(() => {
    if (!config.websiteId) {
      setError({
        code: 'MISSING_WEBSITE_ID',
        message: 'websiteId is required in AdConfig'
      });
      return;
    }

    if (!config.walletAddress) {
      setError({
        code: 'MISSING_WALLET_ADDRESS',
        message: 'walletAddress is required in AdConfig'
      });
      return;
    }

    // Basic wallet address validation (Ethereum address format)
    if (!/^0x[a-fA-F0-9]{40}$/.test(config.walletAddress)) {
      setError({
        code: 'INVALID_WALLET_ADDRESS',
        message: 'walletAddress must be a valid Ethereum address (0x...)'
      });
      return;
    }

    // Reset error if config is valid
    setError(null);
  }, [config]);

  // Default configuration values
  const defaultConfig: AdConfig = {
    apiBaseUrl: config.apiBaseUrl || 'https://api.your-ad-platform.com',
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
      recipientAddress: config.walletAddress,
      supportedTokens: [
        {
          symbol: 'USDC',
          address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913', // Base USDC
          decimals: 6,
          chainId: 8453
        }
      ],
      sponsorship: {
        enabled: true,
        paymasterUrl: paymasterUrl || 'https://paymaster.base.org'
      }
    },
    ...config
  };

  const contextValue: AdContextType = {
    config: defaultConfig,
    apiBaseUrl: defaultConfig.apiBaseUrl || 'https://api.your-ad-platform.com'
  };

  // If there's a configuration error, show it
  if (error) {
    return (
      <div style={{
        padding: '16px',
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '4px',
        fontFamily: 'monospace',
        fontSize: '14px',
        color: '#c00'
      }}>
        <strong>Ad Configuration Error:</strong> {error.message}
      </div>
    );
  }

  const wagmiConfig = createWagmiConfig(walletConnectProjectId);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={onchainKitApiKey}
          chain={base}
        >
          <AdContext.Provider value={contextValue}>
            {children}
          </AdContext.Provider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

// Hook to use the context
export const useAdContext = (): AdContextType => {
  const context = useContext(AdContext);
  
  if (!context) {
    throw new Error('useAdContext must be used within an AdProvider');
  }
  
  return context;
};

// Hook to get configuration
export const useAdConfig = (): AdConfig => {
  const { config } = useAdContext();
  return config;
};

// Hook to get API base URL
export const useAdApi = (): string => {
  const { apiBaseUrl } = useAdContext();
  return apiBaseUrl;
};


