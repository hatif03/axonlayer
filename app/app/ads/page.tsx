'use client';

// Removed OnchainKit imports for now
import { useAccount } from 'wagmi';
import { useState } from 'react';
import { SimpleAdSlot } from '../components/SimpleAdSlot';

export default function AdsPage() {
  const { isConnected, address } = useAccount();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<string>('');

  const adSlots = [
    {
      id: 'hero-banner',
      name: 'Hero Banner',
      size: 'banner',
      price: '0.15',
      description: 'Premium placement at the top of the page',
      dimensions: { width: 728, height: 90 }
    },
    {
      id: 'sidebar-premium',
      name: 'Premium Sidebar',
      size: 'sidebar',
      price: '0.08',
      description: 'High-visibility sidebar placement',
      dimensions: { width: 160, height: 600 }
    },
    {
      id: 'content-square',
      name: 'Content Square',
      size: 'square',
      price: '0.05',
      description: 'Perfect for article content',
      dimensions: { width: 300, height: 250 }
    },
    {
      id: 'mobile-leaderboard',
      name: 'Mobile Leaderboard',
      size: 'mobile',
      price: '0.03',
      description: 'Mobile-optimized leaderboard',
      dimensions: { width: 320, height: 60 }
    }
  ];

  const handleSlotClick = (slotId: string) => {
    setSelectedSlot(slotId);
    setTransactionStatus('preparing');
  };

  const handleTransactionComplete = (status: string) => {
    setTransactionStatus('completed');
    setTimeout(() => {
      setSelectedSlot(null);
      setTransactionStatus('');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Manage Your Ad Campaigns
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Purchase and manage advertisement slots with Base network integration
          </p>
        </div>

        {/* Wallet Status */}
        {!isConnected ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-yellow-400 rounded-full mr-3"></span>
              <div>
                <h4 className="text-lg font-semibold text-yellow-800">Wallet Not Connected</h4>
                <p className="text-yellow-600">
                  Please connect your wallet to purchase ad slots
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-400 rounded-full mr-3"></span>
              <div>
                <h4 className="text-lg font-semibold text-green-800">Wallet Connected</h4>
                <p className="text-green-600">
                  Address: {address?.slice(0, 6)}...{address?.slice(-4)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Ad Slots Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {adSlots.map((slot) => (
            <div key={slot.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{slot.name}</h3>
                  <p className="text-gray-600">{slot.description}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">{slot.price} USDC</div>
                  <div className="text-sm text-gray-500">Base Network</div>
                </div>
              </div>

              {/* Ad Slot Preview */}
              <div className="mb-6">
                <div className="flex justify-center">
                  <SimpleAdSlot
                    slotId={slot.id}
                    size={slot.size as string}
                    price={slot.price}
                    className="border-2 border-dashed border-gray-300 rounded-lg"
                  />
                </div>
              </div>

              {/* Slot Details */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Dimensions:</span>
                  <div className="font-medium">{slot.dimensions.width}x{slot.dimensions.height}</div>
                </div>
                <div>
                  <span className="text-gray-500">Network:</span>
                  <div className="font-medium">Base</div>
                </div>
                <div>
                  <span className="text-gray-500">Payment:</span>
                  <div className="font-medium">USDC</div>
                </div>
                <div>
                  <span className="text-gray-500">Gas:</span>
                  <div className="font-medium text-green-600">Sponsored</div>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                onClick={() => handleSlotClick(slot.id)}
                disabled={!isConnected}
                className={`w-full mt-4 py-3 px-4 rounded-lg font-medium transition-colors ${
                  isConnected
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isConnected ? 'Purchase Slot' : 'Connect Wallet to Purchase'}
              </button>
            </div>
          ))}
        </div>

        {/* Transaction Modal */}
        {selectedSlot && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Purchase Ad Slot
              </h3>
              <p className="text-gray-600 mb-6">
                You are purchasing the {adSlots.find(s => s.id === selectedSlot)?.name} slot.
              </p>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Slot Price:</span>
                  <span className="font-medium">
                    {adSlots.find(s => s.id === selectedSlot)?.price} USDC
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Gas Fees:</span>
                  <span className="font-medium text-green-600">Sponsored by Base</span>
                </div>
                <div className="flex justify-between border-t pt-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold">
                    {adSlots.find(s => s.id === selectedSlot)?.price} USDC
                  </span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={() => setSelectedSlot(null)}
                  className="w-full py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setTransactionStatus('processing')}
                  className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Status */}
        {transactionStatus === 'processing' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Processing Transaction
              </h3>
              <p className="text-gray-600">
                Please confirm the transaction in your wallet
              </p>
            </div>
          </div>
        )}

        {/* Success Message */}
        {transactionStatus === 'completed' && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Transaction Successful!
              </h3>
              <p className="text-gray-600">
                Your ad slot has been purchased successfully
              </p>
            </div>
          </div>
        )}

        {/* Base Features Info */}
        <section className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Choose Base for Advertising?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Zero Gas Fees</h4>
              <p className="text-sm text-gray-600">
                Transactions sponsored by Base network
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🔗</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Native USDC</h4>
              <p className="text-sm text-gray-600">
                Direct USDC payments on Base
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🛡️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure</h4>
              <p className="text-sm text-gray-600">
                Built on Ethereum&apos;s security
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-xl">🚀</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Fast</h4>
              <p className="text-sm text-gray-600">
                2-second block times
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
