# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
