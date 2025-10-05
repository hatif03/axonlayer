// Real-world blog example with multiple ad placements
import React from 'react';
import { AdProvider, AdSlot } from 'axon-sdk';

function BlogPost() {
  const config = {
    websiteId: 'tech-blog-001',
    walletAddress: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    apiBaseUrl: 'https://api.your-ad-platform.com',
    theme: {
      primaryColor: '#2563eb',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      borderColor: '#e5e7eb',
      fontFamily: 'Inter, system-ui, sans-serif',
      borderRadius: 8
    },
    payment: {
      networks: ['base', 'base-sepolia'],
      defaultNetwork: 'base',
      supportedTokens: [{
        symbol: 'USDC',
        address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
        decimals: 6,
        chainId: 8453
      }],
      sponsorship: {
        enabled: true,
        paymasterUrl: 'https://paymaster.base.org'
      }
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      {/* Header Banner */}
      <div style={{ marginBottom: '2rem' }}>
        <AdProvider 
          config={config}
          onchainKitApiKey="your_onchainkit_api_key"
          walletConnectProjectId="your_walletconnect_project_id"
        >
          <AdSlot
            slotId="header-banner-001"
            size="banner"
            price="0.20"
            durations={['6h', '24h']}
            category="header"
            clickable={true}
            onSlotClick={(slotId) => console.log('Header banner clicked:', slotId)}
          />
        </AdProvider>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '2rem' }}>
        {/* Main Content */}
        <div>
          <article style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              The Future of Onchain Advertising
            </h1>
            
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#4b5563' }}>
              Onchain advertising represents a paradigm shift in how we think about digital marketing. 
              By leveraging blockchain technology, we can create more transparent, efficient, and 
              user-centric advertising ecosystems.
            </p>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#4b5563' }}>
              Traditional advertising models suffer from several issues: lack of transparency, 
              middlemen taking large cuts, and poor user experience. Onchain advertising solves 
              these problems by providing direct relationships between advertisers and publishers.
            </p>

            {/* In-content ad */}
            <div style={{ margin: '2rem 0', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '8px' }}>
              <AdProvider 
                config={config}
                onchainKitApiKey="your_onchainkit_api_key"
                walletConnectProjectId="your_walletconnect_project_id"
              >
                <AdSlot
                  slotId="content-ad-001"
                  size="square"
                  price="0.08"
                  durations={['1h', '6h', '24h']}
                  category="content"
                  clickable={true}
                  onSlotClick={(slotId) => console.log('Content ad clicked:', slotId)}
                />
              </AdProvider>
            </div>

            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginTop: '2rem', marginBottom: '1rem' }}>
              Benefits of Onchain Advertising
            </h2>

            <ul style={{ marginBottom: '1.5rem', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Transparent pricing and revenue sharing</li>
              <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Direct payments without intermediaries</li>
              <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Programmatic ad placement and optimization</li>
              <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>User-controlled ad preferences</li>
              <li style={{ marginBottom: '0.5rem', color: '#4b5563' }}>Real-time analytics and reporting</li>
            </ul>

            <p style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1.5rem', color: '#4b5563' }}>
              The Base network provides an ideal foundation for onchain advertising due to its 
              low transaction costs, fast finality, and growing ecosystem of applications.
            </p>
          </article>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Sponsored Content</h3>
            <AdProvider 
              config={config}
              onchainKitApiKey="your_onchainkit_api_key"
              walletConnectProjectId="your_walletconnect_project_id"
            >
              <AdSlot
                slotId="sidebar-ad-001"
                size="sidebar"
                price="0.12"
                durations={['6h', '24h']}
                category="sidebar"
                clickable={true}
                onSlotClick={(slotId) => console.log('Sidebar ad clicked:', slotId)}
              />
            </AdProvider>
          </div>

          <div style={{ backgroundColor: '#fff', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Related Articles</h3>
            <div style={{ space: '0.5rem' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>Building on Base</h4>
                <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Learn how to build dApps on Base network</p>
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '6px', marginBottom: '0.5rem' }}>
                <h4 style={{ fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>OnchainKit Guide</h4>
                <p style={{ fontSize: '0.8rem', color: '#6b7280' }}>Complete guide to OnchainKit integration</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Banner */}
      <div style={{ marginTop: '2rem' }}>
        <AdProvider 
          config={config}
          onchainKitApiKey="your_onchainkit_api_key"
          walletConnectProjectId="your_walletconnect_project_id"
        >
          <AdSlot
            slotId="footer-banner-001"
            size="banner"
            price="0.15"
            durations={['6h', '24h']}
            category="footer"
            clickable={true}
            onSlotClick={(slotId) => console.log('Footer banner clicked:', slotId)}
          />
        </AdProvider>
      </div>

      {/* Mobile Ad (hidden on desktop) */}
      <div style={{ 
        display: 'none',
        '@media (max-width: 768px)': {
          display: 'block',
          marginTop: '1rem'
        }
      }}>
        <AdProvider 
          config={config}
          onchainKitApiKey="your_onchainkit_api_key"
          walletConnectProjectId="your_walletconnect_project_id"
        >
          <AdSlot
            slotId="mobile-ad-001"
            size="mobile"
            price="0.06"
            durations={['30m', '1h', '6h']}
            category="mobile"
            clickable={true}
            onSlotClick={(slotId) => console.log('Mobile ad clicked:', slotId)}
          />
        </AdProvider>
      </div>
    </div>
  );
}

export default BlogPost;
