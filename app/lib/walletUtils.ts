// Utility functions to handle wallet extension conflicts and prevent stack overflow

export const detectWalletConflicts = () => {
  if (typeof window === 'undefined') return false;
  
  // Check for multiple ethereum providers
  const ethereumProviders = [];
  
  // Check for common wallet extensions
  if (window.ethereum) {
    ethereumProviders.push('ethereum');
  }
  
  // Check for specific wallet extensions
  if ((window as unknown as { coinbaseWalletExtension?: unknown }).coinbaseWalletExtension) {
    ethereumProviders.push('coinbase');
  }
  
  if ((window as unknown as { metamask?: unknown }).metamask) {
    ethereumProviders.push('metamask');
  }
  
  if ((window as unknown as { phantom?: unknown }).phantom) {
    ethereumProviders.push('phantom');
  }
  
  return ethereumProviders.length > 1;
};

export const getSafeEthereumProvider = () => {
  if (typeof window === 'undefined') return null;
  
  // Try to get the most reliable provider
  if (window.ethereum) {
    // Check if it's a Coinbase Wallet
    if (window.ethereum.isCoinbaseWallet) {
      return window.ethereum;
    }
    
    // Check if it's MetaMask
    if (window.ethereum.isMetaMask) {
      return window.ethereum;
    }
    
    // Fallback to the first available provider
    return window.ethereum;
  }
  
  return null;
};

export const safeWalletRequest = async (method: string, params?: unknown[]) => {
  try {
    const provider = getSafeEthereumProvider();
    if (!provider) {
      throw new Error('No wallet provider found');
    }
    
    // Add a small delay to prevent rapid successive calls
    await new Promise(resolve => setTimeout(resolve, 100));
    
    return await provider.request({ method, params });
  } catch (error) {
    console.error(`Wallet request failed for method ${method}:`, error);
    throw error;
  }
};

export const preventWalletConflicts = () => {
  if (typeof window === 'undefined') return;
  
  // Add a small delay to prevent rapid successive calls
  const originalRequest = window.ethereum?.request;
  if (originalRequest) {
    let isRequesting = false;
    
    window.ethereum.request = async (args: unknown) => {
      if (isRequesting) {
        console.warn('Wallet request already in progress, skipping...');
        return Promise.reject(new Error('Request already in progress'));
      }
      
      isRequesting = true;
      try {
        const result = await originalRequest.call(window.ethereum, args);
        return result;
      } finally {
        // Reset the flag after a short delay
        setTimeout(() => {
          isRequesting = false;
        }, 500);
      }
    };
  }
};
