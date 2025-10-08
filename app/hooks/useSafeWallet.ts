import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { coinbaseWallet } from 'wagmi/connectors';
import { useCallback, useRef } from 'react';

export const useSafeWallet = () => {
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const isConnecting = useRef(false);

  const safeConnect = useCallback(async () => {
    if (isConnecting.current) {
      console.warn('Wallet connection already in progress');
      return;
    }

    try {
      isConnecting.current = true;
      
      // Use wagmi's connect function with a timeout
      const connectPromise = connect({ connector: coinbaseWallet() });
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Connection timeout')), 10000)
      );
      
      await Promise.race([connectPromise, timeoutPromise]);
    } catch (error) {
      console.error('Wallet connection failed:', error);
      
      // Fallback to direct ethereum call if wagmi fails
      if (typeof window !== 'undefined' && window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (fallbackError) {
          console.error('Fallback wallet connection failed:', fallbackError);
          throw fallbackError;
        }
      } else {
        throw error;
      }
    } finally {
      isConnecting.current = false;
    }
  }, [connect]);

  const safeDisconnect = useCallback(() => {
    try {
      disconnect();
    } catch (error) {
      console.error('Wallet disconnect failed:', error);
    }
  }, [disconnect]);

  return {
    address,
    isConnected,
    connect: safeConnect,
    disconnect: safeDisconnect,
    isConnecting: isConnecting.current
  };
};
