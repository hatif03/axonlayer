# Facilitator API

A payment facilitator service for the AxonLayer advertising platform, handling micropayments and transaction processing using the X402 protocol.

## Overview

The Facilitator API is a backend service that processes payments for the AxonLayer advertising platform. It handles micropayments using the X402 protocol and provides transaction facilitation services for ad purchases.

## Features

- **X402 Protocol Integration**: Micropayment processing for small transactions
- **Payment Facilitation**: Transaction processing and validation
- **Express.js API**: RESTful API endpoints for payment operations
- **CORS Support**: Cross-origin resource sharing for web applications
- **TypeScript**: Full TypeScript support with type safety
- **Environment Configuration**: Flexible configuration via environment variables

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Protocol**: X402 for micropayments
- **Language**: TypeScript
- **Package Manager**: npm/pnpm

## Installation

1. Navigate to the facilitator-api directory:
```bash
cd facilitator-api
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your environment variables in `.env`:
```env
# Server Configuration
PORT=3001
NODE_ENV=development

# X402 Configuration
X402_API_KEY=your_x402_api_key_here
X402_BASE_URL=https://api.x402.org

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

## Usage

### Development

Start the development server with hot reload:

```bash
npm run dev
# or
pnpm dev
```

### Production

Build and start the production server:

```bash
npm run build
npm start
# or
pnpm build
pnpm start
```

## API Endpoints

### Payment Processing

- `POST /payments` - Process a new payment
- `GET /payments/:id` - Get payment status
- `POST /payments/:id/confirm` - Confirm payment

### Health Check

- `GET /health` - Service health status

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3001` | No |
| `NODE_ENV` | Environment mode | `development` | No |
| `X402_API_KEY` | X402 API key | - | Yes |
| `X402_BASE_URL` | X402 API base URL | `https://api.x402.org` | No |
| `CORS_ORIGIN` | CORS origin | `http://localhost:3000` | No |

## Development

### Code Formatting

```bash
# Format code with Prettier
npm run format

# Check formatting
npm run format:check
```

### Linting

```bash
# Lint code
npm run lint

# Check linting
npm run lint:check
```

## Project Structure

```
facilitator-api/
├── index.ts                 # Main service file
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── eslint.config.js         # ESLint configuration
├── .env.example             # Environment variables template
└── README.md                # This file
```

## Integration

The Facilitator API integrates with:

- **AxonLayer Frontend**: Payment processing for ad purchases
- **X402 Protocol**: Micropayment processing
- **Base Network**: Transaction facilitation

## Error Handling

The API includes comprehensive error handling:

- **Validation Errors**: Input validation with detailed error messages
- **Network Errors**: Retry logic for external API calls
- **Rate Limiting**: Protection against abuse
- **CORS Errors**: Proper cross-origin resource sharing

## Security

- **Input Validation**: All inputs are validated and sanitized
- **CORS Protection**: Configurable cross-origin resource sharing
- **Environment Variables**: Sensitive data stored in environment variables
- **Error Sanitization**: Error messages don't expose sensitive information

## Monitoring

- **Health Checks**: Built-in health check endpoint
- **Error Logging**: Comprehensive error logging
- **Performance Monitoring**: Request timing and performance metrics

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

- 📖 [Documentation](https://github.com/hatif03/axonlayer)
- 🐛 [Report Issues](https://github.com/hatif03/axonlayer/issues)
- 💬 [Discord Community](https://discord.gg/axonlayer)
- 📧 [Email Support](mailto:support@axonlayer.com)

---

**Facilitator API** - Powering micropayments for the AxonLayer advertising platform! 💳
