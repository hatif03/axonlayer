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
          <h1 className="text-4xl font-bold mb-6">The Future of Decentralized Advertising</h1>
          
          <p className="text-lg text-gray-700 mb-6">
            Welcome to the future of web advertising where publishers get paid instantly and advertisers can place ads without intermediaries. 
            The Ad-402 platform revolutionizes digital advertising by leveraging x402 payments for seamless, decentralized ad placements.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Traditional advertising networks take significant cuts and have complex approval processes. With Ad-402, publishers can monetize 
            their content instantly, and advertisers can place ads directly using cryptocurrency payments.
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

          <h2 className="text-2xl font-bold mt-8 mb-4">How It Works</h2>
          
          <p className="text-lg text-gray-700 mb-4">
            The Ad-402 platform uses a simple but powerful mechanism:
          </p>
          
          <ol className="list-decimal list-inside space-y-2 text-lg text-gray-700 mb-6">
            <li>Publishers register ad slots on their websites</li>
            <li>Advertisers browse available slots and place ads with instant payments</li>
            <li>Ads are displayed immediately after payment confirmation</li>
            <li>Publishers receive revenue instantly, minus a small platform fee</li>
          </ol>

          <h2 className="text-2xl font-bold mt-8 mb-4">Benefits for Publishers</h2>
          
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
            <li>Instant monetization of website traffic</li>
            <li>No complex approval processes</li>
            <li>Transparent pricing and revenue sharing</li>
            <li>Direct relationship with advertisers</li>
            <li>Global reach with cryptocurrency payments</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Benefits for Advertisers</h2>
          
          <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 mb-6">
            <li>Direct ad placement without intermediaries</li>
            <li>Instant ad activation after payment</li>
            <li>Transparent pricing and placement</li>
            <li>Global reach and targeting options</li>
            <li>Real-time analytics and tracking</li>
          </ul>

          <p className="text-lg text-gray-700 mb-6">
            The Ad-402 platform represents a paradigm shift in digital advertising, moving away from centralized control 
            to a decentralized, transparent, and efficient system that benefits both publishers and advertisers.
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
