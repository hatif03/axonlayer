'use client';

import { Button } from '@/components/ui/button';
import { Connected } from '@coinbase/onchainkit';
import { useSafeWallet } from '../hooks/useSafeWallet';
import { useEffect } from 'react';
import { preventWalletConflicts } from '../lib/walletUtils';

export function OnchainKitIdentity() {
  const { address, isConnected, connect, disconnect } = useSafeWallet();

  // Prevent wallet conflicts on component mount
  useEffect(() => {
    preventWalletConflicts();
  }, []);

  if (!isConnected) {
    return (
      <Button 
        onClick={connect}
        className="border-2"
        style={{ 
          backgroundColor: '#000000', 
          color: '#ffffff',
          borderColor: '#000000'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ffffff';
          e.currentTarget.style.color = '#000000';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#000000';
          e.currentTarget.style.color = '#ffffff';
        }}
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Connected>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-mono">
            {address ? address.slice(2, 4).toUpperCase() : '??'}
          </div>
          <div className="flex flex-col">
            <div className="text-sm font-mono">
              {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
            </div>
            <div className="text-xs text-muted-foreground">
              Base Network
            </div>
          </div>
        </div>
      </Connected>
      <Button 
        onClick={() => disconnect()}
        variant="outline"
        size="sm"
      >
        Disconnect
      </Button>
    </div>
  );
}
