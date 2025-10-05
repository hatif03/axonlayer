import { ReactNode } from 'react';

// Ad Configuration
export interface AdConfig {
  /** Base URL of the Ad API (default: https://api.your-ad-platform.com) */
  apiBaseUrl?: string;
  /** Your website's unique identifier */
  websiteId: string;
  /** Your wallet address to receive payments (required) */
  walletAddress: string;
  /** Default slot configuration */
  defaultSlotConfig?: Partial<AdSlotConfig>;
  /** Theme configuration */
  theme?: AdTheme;
  /** Payment configuration */
  payment?: PaymentConfig;
}

// Slot Configuration
export interface AdSlotConfig {
  /** Unique identifier for the ad slot */
  slotId: string;
  /** Size of the ad slot */
  size: 'banner' | 'square' | 'mobile' | 'sidebar';
  /** Base price in USDC */
  price: string;
  /** Available duration options */
  durations?: string[];
  /** Category for the ad slot */
  category?: string;
  /** Custom CSS class name */
  className?: string;
  /** Whether the slot is clickable for purchase */
  clickable?: boolean;
  /** Custom dimensions (overrides size defaults) */
  dimensions?: {
    width: number;
    height: number;
  };
}

// Theme Configuration
export interface AdTheme {
  /** Primary color (default: #000000) */
  primaryColor?: string;
  /** Background color (default: #ffffff) */
  backgroundColor?: string;
  /** Text color (default: #000000) */
  textColor?: string;
  /** Border color (default: #e5e5e5) */
  borderColor?: string;
  /** Font family (default: 'JetBrains Mono, monospace') */
  fontFamily?: string;
  /** Border radius (default: 0) */
  borderRadius?: number;
}

// Payment Configuration
export interface PaymentConfig {
  /** Supported networks */
  networks?: ('base' | 'base-sepolia')[];
  /** Default network */
  defaultNetwork?: 'base' | 'base-sepolia';
  /** Payment recipient address */
  recipientAddress?: string;
  /** Supported tokens */
  supportedTokens?: {
    symbol: string;
    address: string;
    decimals: number;
    chainId: number;
  }[];
  /** Transaction sponsorship */
  sponsorship?: {
    enabled: boolean;
    paymasterUrl?: string;
  };
}

// Ad Data
export interface AdData {
  /** Whether an ad is currently active */
  hasAd: boolean;
  /** URL of the ad content */
  contentUrl?: string;
  /** Expiration timestamp */
  expiresAt?: number;
  /** Placement ID */
  placementId?: string;
  /** Amount paid for the ad */
  amountPaid?: string;
  /** Advertiser wallet address */
  advertiserAddress?: string;
  /** Slot information */
  slotInfo?: SlotInfo;
}

// Slot Information
export interface SlotInfo {
  id: string;
  slotIdentifier: string;
  size: string;
  width: number;
  height: number;
}

// Queue Information
export interface QueueInfo {
  slotId: string;
  position: number;
  totalInQueue: number;
  nextActivation?: string;
  isAvailable: boolean;
}

// Provider Props
export interface AdProviderProps {
  /** Configuration object */
  config: AdConfig;
  /** Child components */
  children: ReactNode;
  /** OnchainKit API key */
  onchainKitApiKey?: string;
  /** WalletConnect project ID */
  walletConnectProjectId?: string;
  /** Paymaster service URL */
  paymasterUrl?: string;
}

// Slot Props
export interface AdSlotProps extends AdSlotConfig {
  /** Callback when slot is clicked */
  onSlotClick?: (slotId: string) => void;
  /** Callback when ad is loaded */
  onAdLoad?: (adData: AdData) => void;
  /** Callback when ad fails to load */
  onAdError?: (error: Error) => void;
  /** Loading component */
  loadingComponent?: ReactNode;
  /** Error component */
  errorComponent?: ReactNode;
  /** Empty slot component */
  emptySlotComponent?: ReactNode;
}

// API Response Types
export interface AdResponse {
  hasAd: boolean;
  contentUrl?: string;
  expiresAt?: number;
  placementId?: string;
  amountPaid?: string;
  advertiserAddress?: string;
  slotInfo?: SlotInfo;
  message?: string;
}

export interface QueueResponse {
  slotId: string;
  position: number;
  totalInQueue: number;
  nextActivation?: string;
  isAvailable: boolean;
}

// Error Types
export interface AdError {
  code: string;
  message: string;
  details?: any;
}

// Hook Return Types
export interface UseAdSlotReturn {
  /** Current ad data */
  adData: AdData | null;
  /** Queue information */
  queueInfo: QueueInfo | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: AdError | null;
  /** Refresh function */
  refresh: () => Promise<void>;
  /** Purchase function */
  purchase: (bidAmount?: string) => Promise<void>;
}

// Context Type
export interface AdContextType {
  config: AdConfig;
  apiBaseUrl: string;
}
