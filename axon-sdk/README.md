# Axon SDK

A React SDK for building onchain advertising platforms with enhanced error handling, multiple wallet providers, and advanced theme customization.

## Features

- 🚀 **Multi-Network Support**: Base, Base Sepolia, Mainnet, and Sepolia networks
- 💳 **OnchainKit Integration**: Seamless wallet connection and transaction handling
- 🎨 **Advanced Theme Customization**: Hover states, custom colors, and CSS styling
- 🔗 **Multiple Wallet Providers**: MetaMask, Coinbase Wallet, WalletConnect, and Injected wallets
- ⚡ **Gas-Free Transactions**: Paymaster integration for sponsored transactions
- 📱 **Responsive Design**: Mobile-friendly ad slot components with new size options
- 🎯 **TypeScript**: Full TypeScript support with comprehensive types
- 🌐 **RESTful API**: Clean API endpoints for seamless integration
- 🛡️ **Enhanced Error Handling**: Timeout, retry logic, and graceful fallbacks
- 📏 **New Ad Sizes**: Card (300x200) and Leaderboard (970x90) formats

## Installation

```bash
npm install axon-sdk
# or
yarn add axon-sdk
# or
pnpm add axon-sdk
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
      primaryColor: '#0052FF',
      backgroundColor: '#ffffff',
      textColor: '#1a1a1a',
      borderColor: '#e1e5e9',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: 12,
      hoverBackgroundColor: '#f8fafc',
      hoverTextColor: '#0052FF',
      secondaryTextColor: '#64748b',
      successColor: '#10b981',
      warningColor: '#f59e0b',
      errorColor: '#ef4444',
      shadowColor: 'rgba(0, 82, 255, 0.1)',
      customStyles: {
        'boxShadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }
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

## Ad Slot Sizes

The SDK supports multiple ad slot sizes:

- **Banner**: 728x90 pixels (standard banner)
- **Square**: 300x250 pixels (medium rectangle)
- **Mobile**: 320x60 pixels (mobile banner)
- **Sidebar**: 160x600 pixels (skyscraper)
- **Card**: 300x200 pixels (content card) - *New in v1.2.0*
- **Leaderboard**: 970x90 pixels (wide banner) - *New in v1.2.0*

## Enhanced Theme Options

Version 1.2.0 introduces advanced theme customization:

```tsx
theme: {
  // Basic colors
  primaryColor: '#0052FF',
  backgroundColor: '#ffffff',
  textColor: '#1a1a1a',
  borderColor: '#e1e5e9',
  
  // Interactive states
  hoverBackgroundColor: '#f8fafc',
  hoverTextColor: '#0052FF',
  
  // Text hierarchy
  secondaryTextColor: '#64748b',
  
  // State colors
  successColor: '#10b981',
  warningColor: '#f59e0b',
  errorColor: '#ef4444',
  
  // Visual effects
  shadowColor: 'rgba(0, 82, 255, 0.1)',
  
  // Custom CSS
  customStyles: {
    'boxShadow': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    'transition': 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
  }
}
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

For support and questions:

- 📖 [Documentation](https://github.com/hatif03/axonlayer)
- 🐛 [Report Issues](https://github.com/hatif03/axonlayer/issues)
- 💬 [Discord Community](https://discord.gg/axonlayer)
- 📧 [Email Support](mailto:support@axonlayer.com)
