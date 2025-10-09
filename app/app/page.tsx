'use client';

import { useRouter } from 'next/navigation';
import { AdProvider, AdSlot } from "axon-sdk";
import { OnchainKitIdentity } from "../components/OnchainKitIdentity";
import Link from "next/link";

const Home = () => {
  const router = useRouter();
  
  const adConfig = {
    websiteId: 'axonlayer-demo',
    walletAddress: '0x6d63C3DD44983CddEeA8cB2e730b82daE2E91E32',
    apiBaseUrl: 'https://api.axonlayer.com'
  };

  const handleSlotClick = (slotId: string) => {
    // For home page demo slots, we'll use default values based on slot type
    const slotConfigs = {
      'demo-header': { price: '0.25', size: 'banner', durations: '1h,6h,24h', category: 'demo' },
      'demo-square': { price: '0.15', size: 'square', durations: '30m,1h,2h', category: 'demo' },
      'demo-mobile': { price: '0.10', size: 'mobile', durations: '1h,6h,12h', category: 'demo' }
    };
    
    const config = slotConfigs[slotId as keyof typeof slotConfigs] || { price: '0.10', size: 'banner', durations: '1h,6h,24h', category: 'demo' };
    
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
      <main className="min-h-screen" style={{ backgroundColor: '#ff3131' }}>
        {/* Wallet Connection */}
        <div className="flex justify-end p-4">
                <OnchainKitIdentity />
        </div>
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <div className="mb-6" style={{ 
              backgroundColor: '#ffffff',
              border: '4px solid #000000',
              padding: '20px',
              display: 'inline-block',
              boxShadow: '8px 8px 0px #000000'
            }}>
              <h1 className="press-start-2p-regular" style={{ 
                margin: 0,
                padding: 0
              }}>
                <span style={{ color: '#ff3131' }}>axon</span><span style={{ color: '#000000' }}>layer</span>
              </h1>
            </div>
            <p className="text-xl font-mono mb-8 max-w-3xl mx-auto" style={{ color: '#ffffff' }}>
              Revolutionize digital advertising with gas-free transactions, instant payments, and zero intermediaries. 
              Publishers earn more, advertisers pay less, everyone wins.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog" 
                className="px-8 py-3 transition-colors font-mono border-2"
                style={{ 
                  backgroundColor: '#000000', 
                  color: '#ffffff',
                  borderColor: '#000000'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                View Demo Blog
              </Link>
              <Link 
                href="/example-ads" 
                className="px-8 py-3 transition-colors font-mono border-2"
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#000000',
                  borderColor: '#000000'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                See Ad Examples
              </Link>
              <Link 
                href="/dashboard" 
                className="px-8 py-3 transition-colors font-mono border-2"
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#000000',
                  borderColor: '#000000'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#000000';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Publisher Dashboard
              </Link>
            </div>
          </div>

          {/* Demo Ad Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="p-6 border-2 shadow-sm" style={{ backgroundColor: '#ffffff', borderColor: '#000000' }}>
              <h3 className="text-lg font-mono font-semibold mb-4" style={{ color: '#000000' }}>Header Banner</h3>
              <AdSlot
                slotId="demo-header"
                size="banner"
                price="0.25"
                durations={['1h', '6h', '24h']}
                category="demo"
                onSlotClick={handleSlotClick}
              />
            </div>
            
            <div className="p-6 border-2 shadow-sm" style={{ backgroundColor: '#ffffff', borderColor: '#000000' }}>
              <h3 className="text-lg font-mono font-semibold mb-4" style={{ color: '#000000' }}>Square Ad</h3>
              <AdSlot
                slotId="demo-square"
                size="square"
                price="0.15"
                durations={['30m', '1h', '2h']}
                category="demo"
                onSlotClick={handleSlotClick}
              />
            </div>
            
            <div className="p-6 border-2 shadow-sm" style={{ backgroundColor: '#ffffff', borderColor: '#000000' }}>
              <h3 className="text-lg font-mono font-semibold mb-4" style={{ color: '#000000' }}>Mobile Banner</h3>
              <AdSlot
                slotId="demo-mobile"
                size="mobile"
                price="0.10"
                durations={['1h', '6h', '12h']}
                category="demo"
                onSlotClick={handleSlotClick}
              />
            </div>
          </div>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2" style={{ backgroundColor: '#ffffff', borderColor: '#000000' }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#000000' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-mono font-semibold mb-2" style={{ color: '#ffffff' }}>Lightning-Fast Payments</h3>
              <p className="font-mono" style={{ color: '#ffffff' }}>
                Get paid instantly with Base network&apos;s sponsored transactions. No gas fees, no waiting, just pure profit flowing directly to your wallet.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2" style={{ backgroundColor: '#ffffff', borderColor: '#000000' }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#000000' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-mono font-semibold mb-2" style={{ color: '#ffffff' }}>Cut Out the Middleman</h3>
              <p className="font-mono" style={{ color: '#ffffff' }}>
                Direct publisher-to-advertiser connections eliminate greedy ad networks. Keep 95%+ of your revenue instead of losing 30-50% to middlemen.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 border-2" style={{ backgroundColor: '#ffffff', borderColor: '#000000' }}>
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: '#000000' }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-mono font-semibold mb-2" style={{ color: '#ffffff' }}>Live Performance Data</h3>
              <p className="font-mono" style={{ color: '#ffffff' }}>
                Watch your earnings grow in real-time with transparent analytics. See every view, click, and conversion as it happens - no hidden metrics.
              </p>
            </div>
          </div>

          {/* How It Works */}
          <div className="border-2 shadow-sm p-8 mb-16" style={{ backgroundColor: '#ffffff', borderColor: '#000000' }}>
            <h2 className="text-3xl font-mono font-bold text-center mb-8" style={{ color: '#000000' }}>How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-mono font-bold border-2" style={{ backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000' }}>
                  1
                </div>
                <h3 className="font-mono font-semibold mb-2" style={{ color: '#000000' }}>List Your Space</h3>
                <p className="text-sm font-mono" style={{ color: '#000000' }}>
                  Set your price, choose your terms, and watch advertisers compete for your premium ad space.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-mono font-bold border-2" style={{ backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000' }}>
                  2
                </div>
                <h3 className="font-mono font-semibold mb-2" style={{ color: '#000000' }}>Find Perfect Spots</h3>
                <p className="text-sm font-mono" style={{ color: '#000000' }}>
                  Advertisers discover high-quality ad spaces that match their target audience and budget perfectly.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-mono font-bold border-2" style={{ backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000' }}>
                  3
                </div>
                <h3 className="font-mono font-semibold mb-2" style={{ color: '#000000' }}>Pay & Upload</h3>
                <p className="text-sm font-mono" style={{ color: '#000000' }}>
                  One-click payment with Base USDC (gas-free!) and instant ad upload. Your campaign goes live in seconds.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-mono font-bold border-2" style={{ backgroundColor: '#000000', color: '#ffffff', borderColor: '#000000' }}>
                  4
                </div>
                <h3 className="font-mono font-semibold mb-2" style={{ color: '#000000' }}>Start Earning</h3>
                <p className="text-sm font-mono" style={{ color: '#000000' }}>
                  Your ad goes live instantly and money starts flowing to the publisher&apos;s wallet. No delays, no waiting.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center p-12 border-2" style={{ backgroundColor: '#000000', borderColor: '#000000' }}>
            <h2 className="text-3xl font-mono font-bold mb-4" style={{ color: '#ffffff' }}>Ready to Transform Your Revenue?</h2>
            <p className="text-xl mb-8 font-mono" style={{ color: '#ffffff' }}>
              Stop losing money to ad networks. Start earning what you deserve with AxonLayer.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/blog" 
                className="px-8 py-3 transition-colors font-mono border-2"
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#000000',
                  borderColor: '#ffffff'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff3131';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
              >
                Try Demo
              </Link>
              <Link 
                href="/dashboard" 
                className="px-8 py-3 transition-colors font-mono border-2"
                style={{ 
                  backgroundColor: '#ff3131', 
                  color: '#ffffff',
                  borderColor: '#ff3131'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                  e.currentTarget.style.color = '#000000';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff3131';
                  e.currentTarget.style.color = '#ffffff';
                }}
              >
                Start Publishing
              </Link>
            </div>
          </div>
        </div>
      </main>
    </AdProvider>
  );
};

export default Home;