# AxonLayer Frontend

A Next.js frontend application built with OnchainKit and Base network integration for onchain advertising.

## Features

- **Base Native Integration**: Built specifically for Base network with native USDC support
- **Gas Sponsorship**: All transactions are sponsored by Base, eliminating gas fees
- **OnchainKit Integration**: Seamless wallet connection and transaction management
- **Ad Slot Management**: Purchase and manage advertisement slots
- **Real-time Analytics**: Track ad performance and earnings
- **Responsive Design**: Mobile-first design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Web3**: OnchainKit, Wagmi, Viem
- **Styling**: Tailwind CSS
- **State Management**: React Query (TanStack Query)
- **Ad SDK**: Custom AxonLayer SDK

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Base network RPC access
- OnchainKit API key

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp env.example .env.local
```

3. Configure your environment variables in `.env.local`:

```env
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here
NEXT_PUBLIC_API_BASE_URL=https://api.axonlayer.com
NEXT_PUBLIC_PAYMASTER_URL=https://paymaster.base.org
NEXT_PUBLIC_PUBLISHER_WALLET=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_WEBSITE_ID=axonlayer-demo
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Base Network Features

### Gas Sponsorship

All transactions are automatically sponsored by Base network, meaning users never pay gas fees. This is configured through the paymaster URL in the environment variables.

### Native USDC

The application uses Base native USDC (0x833589fcd6edb6e08f4c7c32d4f71b54bda02913) for all payments, eliminating the need for token bridging.

### Fast Transactions

Base's 2-second block times ensure quick transaction confirmations and smooth user experience.

## Project Structure

```
app/
├── app/
│   ├── components/
│   │   └── Navigation.tsx          # Global navigation component
│   ├── ads/
│   │   └── page.tsx               # Ad management page
│   ├── dashboard/
│   │   └── page.tsx               # User dashboard
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Homepage with ad slot demos
│   └── providers.tsx              # Web3 and ad providers
├── env.example                    # Environment variables template
└── README.md                      # This file
```

## Key Components

### Providers

The `providers.tsx` file sets up all necessary providers:

- **WagmiProvider**: For wallet connection and blockchain interactions
- **QueryClientProvider**: For React Query state management
- **OnchainKitProvider**: For Base network features
- **AdProvider**: For ad platform functionality

### Ad Slots

The application includes several ad slot types:

- **Banner**: 728x90 standard banner ads
- **Square**: 300x250 square ads
- **Mobile**: 320x60 mobile-optimized ads
- **Sidebar**: 160x600 vertical sidebar ads

### Navigation

Global navigation component with:

- Responsive design
- Active page highlighting
- Wallet connection status
- Mobile-friendly menu

## Base Network Configuration

The application is configured for Base mainnet and Base Sepolia testnet:

```typescript
const createWagmiConfig = (walletConnectProjectId?: string) => createConfig({
  chains: [base, baseSepolia],
  connectors: [
    coinbaseWallet({
      appName: 'AxonLayer Ad Platform',
      appLogoUrl: '/logo.png',
    }),
    ...(walletConnectProjectId ? [walletConnect({
      projectId: walletConnectProjectId,
    })] : []),
  ],
  ssr: true,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
```

## Ad Platform Integration

The application integrates with the AxonLayer SDK for:

- Ad slot management
- Payment processing
- Analytics tracking
- Queue management

## Development

### Running Tests

```bash
npm run test
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Deployment

The application is ready for deployment on:

- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

Make sure to set all environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For support and questions:

- GitHub Issues
- Discord Community
- Documentation

---

Built with ❤️ on Base network using OnchainKit