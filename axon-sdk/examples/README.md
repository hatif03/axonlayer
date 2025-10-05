# Axon SDK Examples

This directory contains example implementations showing how to use the Axon SDK in different scenarios.

## Examples

### 1. Basic Usage (`basic-usage.tsx`)
- Simple implementation with minimal configuration
- Shows basic ad slot rendering
- Demonstrates different slot sizes (banner, square, mobile)
- Perfect for getting started

### 2. Next.js Usage (`nextjs-usage.tsx`)
- Next.js specific implementation
- Environment variable configuration
- Tailwind CSS styling
- Server-side rendering considerations
- Includes environment variable setup guide

### 3. Advanced Usage (`advanced-usage.tsx`)
- Custom components and hooks
- Dynamic theme switching
- Custom loading and empty slot components
- Advanced event handling
- State management with ad slots
- useAdContext hook usage

## Getting Started

1. **Install the SDK**:
   ```bash
   npm install axon-sdk
   ```

2. **Choose an example** that matches your use case

3. **Copy the code** and adapt it to your needs

4. **Set up your configuration**:
   - Get OnchainKit API key
   - Get WalletConnect project ID
   - Configure your ad platform API

## Configuration

### Environment Variables (Next.js)
```bash
NEXT_PUBLIC_WEBSITE_ID=your-website-id
NEXT_PUBLIC_WALLET_ADDRESS=0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6
NEXT_PUBLIC_API_BASE_URL=https://api.your-ad-platform.com
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id
NEXT_PUBLIC_PAYMASTER_URL=https://paymaster.base.org
```

### Basic Configuration
```typescript
const config = {
  websiteId: 'your-website-id',
  walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
  apiBaseUrl: 'https://api.your-ad-platform.com',
  theme: {
    primaryColor: '#0052ff',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    borderColor: '#e5e5e5',
    fontFamily: 'Inter, sans-serif',
    borderRadius: 8
  }
};
```

## API Requirements

Your backend needs to implement these endpoints:

- `GET /api/ads/{slotId}` - Fetch ad data
- `GET /api/queue-info/{slotId}` - Get queue information  
- `POST /api/analytics` - Track ad events

## Base Network

The SDK is optimized for Base network:

- **Mainnet**: Base (Chain ID: 8453)
- **Testnet**: Base Sepolia (Chain ID: 84532)
- **USDC Token**: 0x833589fcd6edb6e08f4c7c32d4f71b54bda02913

## Support

For questions and support, please open an issue on our GitHub repository.
