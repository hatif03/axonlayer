'use client';

import React, { createContext, useContext, ReactNode } from 'react';

// Simple ad context without wallet dependencies
interface AdContextType {
  websiteId: string;
  walletAddress: string;
  apiBaseUrl: string;
}

const AdContext = createContext<AdContextType | null>(null);

interface AdContextProviderProps {
  children: ReactNode;
  websiteId: string;
  walletAddress: string;
  apiBaseUrl?: string;
}

export function AdContextProvider({
  children,
  websiteId,
  walletAddress,
  apiBaseUrl = 'https://api.axonlayer.com'
}: AdContextProviderProps) {
  const contextValue: AdContextType = {
    websiteId,
    walletAddress,
    apiBaseUrl
  };

  return (
    <AdContext.Provider value={contextValue}>
      {children}
    </AdContext.Provider>
  );
}

export function useAdContext(): AdContextType {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error('useAdContext must be used within an AdContextProvider');
  }
  return context;
}

