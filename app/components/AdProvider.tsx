'use client';

import React, { useEffect } from 'react';
// import Script from 'next/script';

interface AdProviderProps {
  publisherWallet: string;
  network?: string;
  currency?: string;
  apiBaseUrl?: string;
  children: React.ReactNode;
}

export const AdProvider: React.FC<AdProviderProps> = ({
  publisherWallet,
  network = 'base',
  currency = 'USDC',
  apiBaseUrl = '/api',
  children
}) => {
  useEffect(() => {
    const initAd = () => {
      if ((window as unknown as { Ad?: unknown }).Ad) {
        ((window as unknown as { Ad: { init: (config: unknown) => void } }).Ad).init({
          publisherWallet,
          network,
          currency,
          apiBaseUrl
        });
      }
    };

    if ((window as unknown as { Ad?: unknown }).Ad) {
      initAd();
    } else {
      const checkInterval = setInterval(() => {
        if ((window as unknown as { Ad?: unknown }).Ad) {
          initAd();
          clearInterval(checkInterval);
        }
      }, 100);

      return () => clearInterval(checkInterval);
    }
  }, [publisherWallet, network, currency, apiBaseUrl]);

  return (
    <>
      {/* Disabled Ad SDK to prevent modal conflicts with x402 */}
      {/* <Script
        src="/js/axon-sdk.js"
        strategy="beforeInteractive"
        onLoad={() => {
          console.log('Ad SDK loaded');
        }}
      /> */}
      {children}
    </>
  );
};
