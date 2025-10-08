# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.0] - 2025-01-08

### Added
- **New Ad Slot Sizes**: Card (300x200) and Leaderboard (970x90) formats
- **Enhanced Theme Customization**: 
  - Hover states with `hoverBackgroundColor` and `hoverTextColor`
  - Secondary text color with `secondaryTextColor`
  - State colors: `successColor`, `warningColor`, `errorColor`
  - Shadow effects with `shadowColor`
  - Custom CSS styling with `customStyles` object
- **Multiple Wallet Providers**: MetaMask, Coinbase Wallet, WalletConnect, and Injected wallets
- **Multi-Network Support**: Base, Base Sepolia, Mainnet, and Sepolia networks
- **Enhanced Error Handling**: 
  - Request timeouts (10s for ad data, 5s for queue info)
  - Better error categorization (Network, CORS, Timeout, Server errors)
  - Graceful fallbacks for network/CORS errors
  - Detailed error messages for debugging
- **Advanced Examples**: New advanced usage example showcasing all features
- **Improved API Resilience**: Better handling of API unavailability with fallback to empty slots

### Changed
- **Enhanced Error Components**: Now use theme colors for consistent styling
- **Improved Fetch Logic**: Added AbortController for proper request cancellation
- **Better User Experience**: Network errors show empty slots instead of error states
- **Updated Default Theme**: Enhanced with new color options and better visual hierarchy
- **Enhanced Payment Configuration**: Support for multiple tokens and networks

### Technical Details
- Updated type definitions for new theme properties and ad sizes
- Enhanced AdProvider with multiple wallet connectors and network support
- Improved AdSlot component with better error handling and theme integration
- Added comprehensive examples for all new features
- Updated package version to 1.2.0 with enhanced description

## [1.1.0] - 2025-01-08

### Added
- **Enhanced Base Network Support**: Improved Base USDC token configuration
- **API Integration**: Clean RESTful API endpoints for seamless integration
- **Enhanced Documentation**: Updated README with comprehensive integration guide
- **Improved Examples**: Updated all examples with better configuration

### Changed
- **Default API URL**: Changed from `https://api.your-ad-platform.com` to `https://api.axonlayer.com`
- **Default Theme**: Updated to use JetBrains Mono font and black primary color
- **Payment Configuration**: Enhanced with Base USDC token support and sponsorship configuration
- **Examples**: Updated all examples to use new API endpoints
- **Package Description**: Updated to reflect standalone SDK nature

### Technical Details
- Updated all utility functions to use new API endpoints
- Enhanced payment configuration with Base USDC token (0x833589fcd6edb6e08f4c7c32d4f71b54bda02913)
- Added sponsorship configuration for gas-free transactions
- Updated package keywords to include "decentralized"
- Created comprehensive documentation

## [1.0.1] - 2025-01-08

### Fixed
- Fixed import issues with `import { AdSlot } from 'axon-sdk'`
- Updated package.json configuration for proper module resolution
- Added proper `exports` field for modern module resolution
- Fixed TypeScript configuration for better library compatibility
- Removed problematic `"type": "module"` from package.json

### Technical Details
- Changed `moduleResolution` from `"bundler"` to `"node"` in tsconfig.json
- Updated package.json to use correct module paths
- Added proper exports field for both import and require compatibility
- Ensured all components are properly exported from main index

## [1.0.0] - 2025-01-07

### Added
- Initial release of Axon SDK
- AdProvider component with OnchainKit integration
- AdSlot component with Base network support
- TypeScript definitions for all components
- Comprehensive examples and documentation
- Support for wallet connection and transaction handling
