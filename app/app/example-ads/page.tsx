'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AdProvider, AdSlot } from 'axon-sdk';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ExampleAdsPage() {
  const router = useRouter();
  
  const adConfig = {
    websiteId: 'axonlayer-examples',
    walletAddress: '0x6d63C3DD44983CddEeA8cB2e730b82daE2E91E32',
    apiBaseUrl: 'https://api.axonlayer.com'
  };

  const handleSlotClick = (slotId: string) => {
    // For example ads, we'll use default values
    const params = new URLSearchParams({
      slotId: slotId,
      price: '0.10',
      size: 'banner',
      durations: '30m,1h,6h,24h',
      category: 'general'
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <AdProvider 
      config={adConfig}
      onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      walletConnectProjectId={process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID}
    >
      <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-mono font-bold text-foreground mb-2">
            Live Ad Slot Showcase
          </h1>
          <p className="text-muted-foreground font-mono text-sm">
            Experience the power of AxonLayer - click any slot to purchase and see instant results
          </p>
        </div>

        {/* Available Slots Section */}
        <div className="mb-12">
          <h2 className="text-xl font-mono font-semibold text-foreground mb-4">
            Premium Ad Slots - Click to Purchase & Go Live Instantly
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">Banner Ad</CardTitle>
                <CardDescription className="font-mono text-xs">
                  728x90 pixels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdSlot
                  slotId="banner-001"
                  size="banner"
                  price="0.10"
                  durations={['30m', '1h', '6h', '24h']}
                  category="general"
                  clickable={true}
                  onSlotClick={handleSlotClick}
                />
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">Square Ad</CardTitle>
                <CardDescription className="font-mono text-xs">
                  300x250 pixels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdSlot
                  slotId="square-001"
                  size="square"
                  price="0.15"
                  durations={['30m', '1h', '6h', '24h']}
                  category="general"
                  clickable={true}
                  onSlotClick={handleSlotClick}
                />
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">Mobile Ad</CardTitle>
                <CardDescription className="font-mono text-xs">
                  320x60 pixels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdSlot
                  slotId="mobile-001"
                  size="mobile"
                  price="0.08"
                  durations={['30m', '1h', '6h', '24h']}
                  category="general"
                  clickable={true}
                  onSlotClick={handleSlotClick}
                />
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">Sidebar Ad</CardTitle>
                <CardDescription className="font-mono text-xs">
                  160x600 pixels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdSlot
                  slotId="sidebar-001"
                  size="sidebar"
                  price="0.12"
                  durations={['30m', '1h', '6h', '24h']}
                  category="general"
                  clickable={true}
                  onSlotClick={handleSlotClick}
                />
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">Card Ad</CardTitle>
                <CardDescription className="font-mono text-xs">
                  300x220 pixels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdSlot
                  slotId="card-001"
                  size="square"
                  price="0.20"
                  durations={['30m', '1h', '6h', '24h']}
                  category="general"
                  clickable={true}
                  onSlotClick={handleSlotClick}
                />
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">Leaderboard Ad</CardTitle>
                <CardDescription className="font-mono text-xs">
                  728x90 pixels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AdSlot
                  slotId="leaderboard-001"
                  size="banner"
                  price="0.18"
                  durations={['30m', '1h', '6h', '24h']}
                  category="general"
                  clickable={true}
                  onSlotClick={handleSlotClick}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-8">
          <h2 className="text-xl font-mono font-semibold text-foreground mb-4">
            Why AxonLayer is the Future of Advertising
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">⚡ Instant Purchase</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono">
                  Click, pay with Base USDC (gas-free!), and your ad goes live in seconds. No waiting, no approvals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">🔒 Decentralized Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono">
                  Your ad content is stored on IPFS - censorship-resistant, permanent, and globally accessible.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">💰 Maximum Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono">
                  Publishers keep 95%+ of revenue. Advertisers pay 50% less. Everyone wins with AxonLayer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h2 className="text-xl font-mono font-semibold text-foreground mb-4">
            The AxonLayer Advantage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">🚀 Gas-Free Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono">
                  Base network sponsors all transactions. Pay with USDC, keep 100% of your ad spend - no hidden gas fees.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">⚡ Instant Activation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono">
                  Your ad goes live the moment payment confirms. No waiting periods, no approval processes, just results.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">📊 Real-Time Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono">
                  Track every view, click, and conversion as it happens. Transparent data you can trust and act on.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="font-mono text-sm">🌍 Global Reach</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground font-mono">
                  Accept payments from anywhere in the world. No geographic restrictions, no currency conversion fees.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </AdProvider>
  );
}
