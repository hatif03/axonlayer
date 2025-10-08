'use client';

import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { coinbaseWallet } from 'wagmi/connectors';

export function OnchainKitWallet() {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();

  if (!isConnected) {
    return (
      <Button 
        onClick={() => {
          try {
            // Use wagmi's connect function instead of direct ethereum calls
            connect({ connector: coinbaseWallet() });
          } catch (error) {
            console.error('Wallet connection failed:', error);
            // Fallback to direct ethereum call if wagmi fails
            if (typeof window !== 'undefined' && window.ethereum) {
              try {
                window.ethereum.request({ method: 'eth_requestAccounts' });
              } catch (fallbackError) {
                console.error('Fallback wallet connection failed:', fallbackError);
              }
            }
          }
        }}
        className="bg-primary text-primary-foreground hover:bg-primary/90"
      >
        Connect Wallet
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="text-sm font-mono">
        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
      </div>
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
