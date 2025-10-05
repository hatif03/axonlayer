// Main exports
export { AdProvider, useAdContext, useAdConfig, useAdApi } from './components/AdProvider';
export { AdSlot } from './components/AdSlot';

// Type exports
export type {
  AdConfig,
  AdSlotConfig,
  AdTheme,
  PaymentConfig,
  AdData,
  SlotInfo,
  QueueInfo,
  AdProviderProps,
  AdSlotProps,
  AdResponse,
  QueueResponse,
  AdError,
  UseAdSlotReturn,
  AdContextType
} from './types';

// Utility exports
export {
  createDefaultConfig,
  validateConfig,
  isValidUrl,
  isValidColor,
  formatPrice,
  formatTimeRemaining,
  generateCheckoutUrl,
  generateUploadUrl,
  fetchAdData,
  fetchQueueInfo,
  createAdDataHook,
  generateSlotId,
  parseSlotConfigFromUrl,
  trackAdEvent
} from './utils';

// Default export
export { AdProvider as default } from './components/AdProvider';
