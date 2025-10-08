// Singleton pattern to prevent multiple WalletConnect Core initializations

let isInitialized = false;
let initializationPromise: Promise<void> | null = null;

export const initializeWalletConnect = async () => {
  if (isInitialized) {
    return;
  }

  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = new Promise((resolve) => {
    // Add a small delay to prevent rapid successive initializations
    setTimeout(() => {
      isInitialized = true;
      resolve();
    }, 100);
  });

  return initializationPromise;
};

export const resetWalletConnect = () => {
  isInitialized = false;
  initializationPromise = null;
};
