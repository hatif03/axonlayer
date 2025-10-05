# Configuration Guide

## SDK Configuration

This is an SDK library that can be used in any React application. Configuration is passed directly to the components, not through environment variables.

## Required Configuration

The SDK requires the following configuration to be passed to the `AdProvider` component:

## API Endpoints

The SDK expects the following API endpoints to be available:

### Ad Data Endpoint
```
GET /api/ads/{slotId}
```

### Queue Info Endpoint
```
GET /api/queue-info/{slotId}
```

### Analytics Endpoint
```
POST /api/analytics
```

## Base Network Configuration

The SDK is configured for Base network with the following defaults:

- **Mainnet**: Base (Chain ID: 8453)
- **Testnet**: Base Sepolia (Chain ID: 84532)
- **USDC Token**: 0x833589fcd6edb6e08f4c7c32d4f71b54bda02913

## Usage Example

```typescript
import { AdProvider, AdSlot } from 'axon-sdk';

const config = {
  websiteId: 'your-website-id',
  walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  apiBaseUrl: 'https://api.your-ad-platform.com',
  payment: {
    networks: ['base', 'base-sepolia'],
    defaultNetwork: 'base',
    supportedTokens: [{
      symbol: 'USDC',
      address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
      decimals: 6,
      chainId: 8453
    }],
    sponsorship: {
      enabled: true,
      paymasterUrl: 'https://paymaster.base.org'
    }
  }
};

<AdProvider 
  config={config}
  onchainKitApiKey="your_onchainkit_api_key"
  walletConnectProjectId="your_walletconnect_project_id"
  paymasterUrl="https://paymaster.base.org"
>
  <AdSlot
    slotId="banner-001"
    size="banner"
    price="0.10"
    clickable={true}
  />
</AdProvider>
```

## Configuration Options

### AdProvider Props

- `config`: AdConfig object (required)
- `onchainKitApiKey`: OnchainKit API key (optional)
- `walletConnectProjectId`: WalletConnect project ID (optional)
- `paymasterUrl`: Paymaster service URL (optional, defaults to Base paymaster)

### AdConfig Interface

```typescript
interface AdConfig {
  websiteId: string;
  walletAddress: string;
  apiBaseUrl?: string;
  theme?: AdTheme;
  payment?: PaymentConfig;
}
```
