'use client';

import { useRouter } from 'next/navigation';
import { AdProvider, AdSlot } from 'axon-sdk';

export default function BlogDemo() {
  const router = useRouter();
  
  const adConfig = {
    websiteId: 'axonlayer-blog-demo',
    walletAddress: '0x3c11A511598fFD31fE4f6E3BdABcC31D99C1bD10',
    apiBaseUrl: 'https://api.axonlayer.com'
  };

  const handleSlotClick = (slotId: string) => {
    // For blog ads, we'll use default values based on slot type
    const slotConfigs = {
      'header-banner': { price: '0.25', size: 'banner', durations: '1h,6h,24h', category: 'technology' },
      'mid-article': { price: '0.15', size: 'square', durations: '30m,1h,2h', category: 'technology' },
      'sidebar': { price: '0.20', size: 'sidebar', durations: '1h,6h,24h', category: 'technology' },
      'footer-banner': { price: '0.18', size: 'banner', durations: '2h,6h,12h', category: 'technology' }
    };
    
    const config = slotConfigs[slotId as keyof typeof slotConfigs] || { price: '0.10', size: 'banner', durations: '1h,6h,24h', category: 'general' };
    
    const params = new URLSearchParams({
      slotId: slotId,
      price: config.price,
      size: config.size,
      durations: config.durations,
      category: config.category
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <AdProvider 
      config={adConfig}
      onchainKitApiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
      walletConnectProjectId={process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID}
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Ad */}
        <div className="mb-8">
          <AdSlot
            slotId="header-banner"
            size="banner"
            price="0.25"
            durations={['1h', '6h', '24h']}
            category="technology"
            onSlotClick={handleSlotClick}
          />
        </div>

        <article className="prose lg:prose-xl">
          <h1 className="text-4xl font-bold mb-6">The Death of Ad Networks: How AxonLayer is Revolutionizing Digital Advertising</h1>
          
          <p className="text-lg text-gray-700 mb-6">
            <strong>The ad industry is broken.</strong> Publishers lose 30-50% of their revenue to greedy middlemen. Advertisers pay premium prices for mediocre placements. 
            AxonLayer changes everything with Base network&apos;s gas-free transactions and direct publisher-to-advertiser connections.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            <strong>Imagine this:</strong> You publish content, set your ad price, and money flows directly to your wallet instantly. No Google AdSense delays. 
            No Facebook approval processes. No 30% cuts to ad networks. Just pure, transparent revenue that you control completely.
          </p>
          
          {/* Mid-article ad */}
          <div className="my-8 flex justify-center">
            <AdSlot
              slotId="mid-article"
              size="square"
              price="0.15"
              durations={['30m', '1h', '2h']}
              category="technology"
              onSlotClick={handleSlotClick}
            />
          </div>

          <h2 className="text-2xl font-bold mt-8 mb-4">The AxonLayer Advantage: Why Traditional Ad Networks Are Dead</h2>
          
          <p className="text-lg text-gray-700 mb-4">
            <strong>Here&apos;s the brutal truth:</strong> Traditional ad networks are dinosaurs. They&apos;re slow, expensive, and designed to extract maximum value from both publishers and advertisers. 
            AxonLayer flips the script with a revolutionary approach:
          </p>
          
          <ol className="list-decimal list-inside space-y-3 text-lg text-gray-700 mb-6">
            <li><strong>Publishers set their own prices</strong> - No more &quot;market rates&quot; that favor ad networks</li>
            <li><strong>Advertisers pay instantly with Base USDC</strong> - Zero gas fees, immediate confirmation</li>
            <li><strong>Ads go live in seconds</strong> - No approval processes, no waiting periods</li>
            <li><strong>Publishers keep 95%+ of revenue</strong> - Compare that to Google&apos;s 32% cut</li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4">For Publishers: Finally, You&apos;re in Control</h2>
          
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 mb-6">
            <li><strong>3x Higher Revenue</strong> - Keep 95%+ instead of losing 30-50% to ad networks</li>
            <li><strong>Instant Payments</strong> - Money hits your wallet immediately, no 30-day delays</li>
            <li><strong>Zero Approval Hassles</strong> - Set your price, get paid. No content restrictions or waiting periods</li>
            <li><strong>Complete Transparency</strong> - See exactly who&apos;s paying and how much, every single transaction</li>
            <li><strong>Global Reach</strong> - Accept payments from anywhere in the world with Base USDC</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">For Advertisers: Cut Costs, Boost Results</h2>
          
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-700 mb-6">
            <li><strong>50% Lower Costs</strong> - No ad network fees, no middleman markups, just direct publisher payments</li>
            <li><strong>Instant Campaign Launch</strong> - Your ad goes live the moment you pay, no waiting for approvals</li>
            <li><strong>Transparent Pricing</strong> - Know exactly what you&apos;re paying and where your ad appears</li>
            <li><strong>Premium Placements</strong> - Access high-quality, engaged audiences without bidding wars</li>
            <li><strong>Real-Time Performance</strong> - Track every view, click, and conversion as it happens</li>
          </ul>

          <p className="text-lg text-gray-700 mb-6">
            <strong>The future is here, and it&apos;s decentralized.</strong> AxonLayer isn&apos;t just another ad platform - it&apos;s a complete revolution that puts power back in the hands of content creators and advertisers. 
            No more feeding the ad network giants. No more waiting for payments. No more hidden fees. Just pure, transparent, profitable advertising that works for everyone.
          </p>
        </article>

        {/* Sidebar */}
        <aside className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
          <AdSlot
            slotId="sidebar"
            size="sidebar"
            price="0.20"
            durations={['1h', '6h', '24h']}
            category="technology"
            onSlotClick={handleSlotClick}
          />
        </aside>

        {/* Footer Ad */}
        <div className="mt-12">
          <AdSlot
            slotId="footer-banner"
            size="banner"
            price="0.18"
            durations={['2h', '6h', '12h']}
            category="technology"
            onSlotClick={handleSlotClick}
          />
        </div>
      </div>
    </AdProvider>
  );
}
