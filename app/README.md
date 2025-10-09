# AxonLayer Frontend

A Next.js 15 frontend application built with OnchainKit and Base network integration for onchain advertising. This is the main frontend console for the AxonLayer advertising platform.

## Features

- **Base Network Integration**: Built specifically for Base network with native USDC support
- **Gas-Free Transactions**: All transactions are sponsored by Base network, eliminating gas fees
- **OnchainKit Integration**: Seamless wallet connection and transaction management
- **Ad Slot Management**: Purchase and manage advertisement slots with competitive bidding
- **Real-time Analytics**: Track ad performance and earnings
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **IPFS Storage**: Decentralized storage for ad content via Lighthouse
- **Multiple SDK Support**: Integration with both AxonLayer SDK and legacy Ad402 SDK

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Web3**: OnchainKit, Wagmi, Viem
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React Query (TanStack Query)
- **Ad SDKs**: AxonLayer SDK (main) and Ad402 SDK (legacy)
- **Storage**: IPFS via Lighthouse
- **Database**: Prisma with SQLite (development)
- **UI Components**: Radix UI with custom styling
- **Forms**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Base network RPC access
- OnchainKit API key
- WalletConnect Project ID
- Lighthouse API key (for IPFS storage)
- USDC on Base network for testing

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
# OnchainKit Configuration
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_onchainkit_api_key_here
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_walletconnect_project_id_here

# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.axonlayer.com
NEXT_PUBLIC_PAYMASTER_URL=https://paymaster.base.org

# Publisher Configuration
NEXT_PUBLIC_PUBLISHER_WALLET=0x1234567890123456789012345678901234567890
NEXT_PUBLIC_WEBSITE_ID=axonlayer-demo

# Lighthouse IPFS Storage
LIGHTHOUSE_API_KEY=your_lighthouse_api_key_here
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
├── app/                           # Next.js App Router
│   ├── ads/                       # Ad management interface
│   │   └── page.tsx               # Ad management page
│   ├── blog/                      # Blog content
│   │   └── page.tsx               # Blog page
│   ├── checkout/                  # Payment & bidding interface
│   │   └── page.tsx               # Checkout page
│   ├── dashboard/                 # Publisher analytics
│   │   └── page.tsx               # Dashboard page
│   ├── example-ads/               # Demo ad slots
│   │   └── page.tsx               # Example ads page
│   ├── test-ads/                  # Testing interface
│   │   └── page.tsx               # Test ads page
│   ├── test-upload/               # Upload testing
│   │   └── page.tsx               # Test upload page
│   ├── upload/                    # Ad content upload
│   │   └── page.tsx               # Upload page
│   ├── components/                # Shared components
│   │   └── [components].tsx       # Shared UI components
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Homepage with ad slot demos
│   └── providers.tsx              # Web3 and ad providers
├── components/                    # React Components
│   ├── OnchainKitIdentity.tsx     # Identity display components
│   ├── OnchainKitWallet.tsx      # Wallet connection components
│   ├── WalletConnectModal.tsx     # Web3 wallet integration
│   ├── ui/                        # UI component library
│   └── [other-components].tsx     # Additional components
├── lib/                           # Core Libraries
│   ├── lighthouse.ts              # IPFS storage system
│   ├── adService.ts               # Ad management services
│   ├── usdc.ts                    # USDC payment utilities
│   ├── walletUtils.ts             # Wallet utilities
│   └── [other-utils].ts           # Additional utilities
├── hooks/                         # Custom React hooks
│   └── useSafeWallet.ts           # Safe wallet hook
├── env.example                    # Environment variables template
└── README.md                      # This file
```

## Key Components

### Providers

The `providers.tsx` file sets up all necessary providers:

- **WagmiProvider**: For wallet connection and blockchain interactions
- **QueryClientProvider**: For React Query state management
- **OnchainKitProvider**: For Base network features and gas sponsorship
- **AdProvider**: For ad platform functionality (AxonLayer SDK)
- **Ad402Provider**: For legacy ad platform functionality (Ad402 SDK)

### Ad Slots

The application includes several ad slot types:

- **Banner**: 728x90 standard banner ads
- **Square**: 300x250 square ads
- **Mobile**: 320x60 mobile-optimized ads
- **Sidebar**: 160x600 vertical sidebar ads
- **Card**: 300x200 content card ads (AxonLayer SDK)
- **Leaderboard**: 970x90 wide banner ads (AxonLayer SDK)

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

The application integrates with multiple SDKs:

### AxonLayer SDK (Main)
- Ad slot management with OnchainKit integration
- Gas-free payment processing via Base network
- Analytics tracking
- Queue management with competitive bidding

### Ad402 SDK (Legacy)
- Legacy ad slot management
- Traditional payment processing
- Analytics tracking
- Queue management

## Development

### Database Management

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Open Prisma Studio
npm run db:studio

# Reset database
npm run db:reset
```

### Building for Production

```bash
npm run build
```

### Code Formatting

```bash
# Format code with Prettier
npm run format

# Lint code
npm run lint
```

## Deployment

The application is ready for deployment on:

- Vercel (recommended for Next.js)
- Netlify
- Any Node.js hosting platform

Make sure to set all environment variables in your deployment platform:

- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`
- `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID`
- `LIGHTHOUSE_API_KEY`
- `NEXT_PUBLIC_API_BASE_URL`
- `NEXT_PUBLIC_PAYMASTER_URL`
- `NEXT_PUBLIC_PUBLISHER_WALLET`
- `NEXT_PUBLIC_WEBSITE_ID`

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