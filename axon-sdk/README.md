# Axon SDK

A React SDK for building onchain advertising platforms with Base network integration and OnchainKit.

## Features

- 🚀 **Base Network Integration**: Built for Base mainnet and testnet
- 💳 **OnchainKit Integration**: Seamless wallet connection and transaction handling
- 🎨 **Customizable UI**: Theme support for ad slots and components
- 🔗 **Wallet Support**: Coinbase Wallet and WalletConnect integration
- ⚡ **Gas-Free Transactions**: Paymaster integration for sponsored transactions
- 📱 **Responsive Design**: Mobile-friendly ad slot components
- 🎯 **TypeScript**: Full TypeScript support with comprehensive types
- 🌐 **RESTful API**: Clean API endpoints for seamless integration

## Installation

```bash
npm install axon-sdk
```

## Quick Start

```tsx
import { AdProvider, AdSlot } from 'axon-sdk';

function App() {
  const config = {
    websiteId: 'your-website-id',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: 'https://api.axonlayer.com',
    theme: {
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      textColor: '#000000',
      borderColor: '#e5e5e5',
      fontFamily: 'JetBrains Mono, monospace',
      borderRadius: 0
    }
  };

  return (
    <AdProvider 
      config={config}
      onchainKitApiKey="your_onchainkit_api_key"
      walletConnectProjectId="your_walletconnect_project_id"
    >
      <AdSlot
        slotId="banner-001"
        size="banner"
        price="0.10"
        clickable={true}
      />
    </AdProvider>
  );
}
```

## Components

### AdProvider

The main provider component that wraps your application and provides configuration.

```tsx
<AdProvider 
  config={config}
  onchainKitApiKey="your_api_key"
  walletConnectProjectId="your_project_id"
  paymasterUrl="https://paymaster.base.org"
>
  {children}
</AdProvider>
```

### AdSlot

Displays ad slots with wallet connection and transaction capabilities.

```tsx
<AdSlot
  slotId="banner-001"
  size="banner"
  price="0.10"
  durations={['30m', '1h', '6h', '24h']}
  category="general"
  clickable={true}
  onSlotClick={(slotId) => console.log('Slot clicked:', slotId)}
/>
```

## Configuration

See [CONFIGURATION.md](./CONFIGURATION.md) for detailed configuration options.

## API Requirements

The SDK expects your backend to provide the following endpoints:

- `GET /api/ads/{slotId}` - Fetch ad data for a slot
- `GET /api/queue-info/{slotId}` - Get queue information
- `POST /api/analytics` - Track ad events

## API Integration

This SDK provides clean RESTful API endpoints for seamless integration:

- ✅ **RESTful API**: Clean API endpoints at `https://api.axonlayer.com`
- ✅ **Component Structure**: `AdProvider` and `AdSlot` for easy integration
- ✅ **Configuration**: Simple configuration format
- ✅ **Enhanced Features**: Base network support, OnchainKit integration, and wallet connection

### Quick Integration

```tsx
// Import the SDK
import { AdProvider, AdSlot } from 'axon-sdk';

// Use with your configuration
<AdProvider config={config}>
  <AdSlot slotId="banner-001" size="banner" price="0.10" />
</AdProvider>
```

## Base Network

The SDK is optimized for Base network:

- **Mainnet**: Base (Chain ID: 8453)
- **Testnet**: Base Sepolia (Chain ID: 84532)
- **USDC Token**: 0x833589fcd6edb6e08f4c7c32d4f71b54bda02913

## License

MIT

## Contributing

Contributions are welcome! Please read our contributing guidelines and submit pull requests to our repository.

## Support

For support and questions, please open an issue on our GitHub repository.
