// 2. components/Providers.tsx
"use client";

import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet, walletConnect } from "wagmi/connectors";
import { OnchainKitProvider } from "@coinbase/onchainkit";

// Create wagmi config with Base networks
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

const Providers = ({ children }: { children: ReactNode }) => {
  // Create a stable query client instance
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  const wagmiConfig = createWagmiConfig(process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID);

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          chain={base}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export { Providers };
