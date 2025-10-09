# Hash Service

A Firebase-powered hash storage service for the AxonLayer advertising platform. This service stores and retrieves ad hash records with transaction metadata for decentralized advertising.

## Overview

The Hash Service is a backend service that manages ad hash records in Firebase Firestore. It stores metadata about ad content, payment transactions, and validity periods for the AxonLayer advertising platform.

## Features

- **Firebase Firestore Integration**: Scalable NoSQL database for hash storage
- **RESTful API**: Clean API endpoints for hash management
- **Transaction Metadata**: Stores payment and validity information
- **Express.js Backend**: Fast and reliable API server
- **TypeScript Support**: Full type safety and development experience
- **Environment Configuration**: Flexible configuration via environment variables
- **Security**: Helmet.js for security headers and CORS protection
- **Logging**: Structured logging with Pino

## API Endpoints

### Hash Management

- **POST** `/hashes` — Store a new hash record
  - Body JSON:
    ```json
    {
      "index": "<unique-id>",
      "media_hash": "...",
      "validUpto": 1735689600,
      "txHash": "0x...",
      "AmountPaid": "1000000000000000000",
      "payerAddress": "0x...",
      "recieverAddress": "0x..."
    }
    ```

- **GET** `/hashes/:index` — Retrieve hash record by ID (path parameter)
- **GET** `/hashes?index=<id>` — Retrieve hash record by ID (query parameter)

### Health Check

- **GET** `/health` — Service health status

## Installation

1. Navigate to the service directory:
```bash
cd service
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

4. Configure your Firebase settings in `.env`:
   - Get your Firebase config from Firebase Console → Project Settings → General → Your apps
   - Copy the values to the corresponding environment variables

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

## Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `FIREBASE_API_KEY` | Firebase API key | - | Yes |
| `FIREBASE_AUTH_DOMAIN` | Firebase auth domain | - | Yes |
| `FIREBASE_PROJECT_ID` | Firebase project ID | - | Yes |
| `FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | - | Yes |
| `FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | - | Yes |
| `FIREBASE_APP_ID` | Firebase app ID | - | Yes |
| `FIREBASE_MEASUREMENT_ID` | Firebase measurement ID | - | No |
| `FIREBASE_COLLECTION` | Firestore collection name | `hashes` | No |
| `PORT` | Server port | `4000` | No |
| `NODE_ENV` | Environment mode | `development` | No |

## Project Structure

```
service/
├── src/
│   ├── routes/
│   │   └── hashes.ts           # Hash management routes
│   ├── firebase.ts             # Firebase configuration
│   ├── index.ts                # Main service file
│   └── types.ts                # TypeScript definitions
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── .env.example                # Environment variables template
└── README.md                   # This file
```

## Integration

The Hash Service integrates with:

- **AxonLayer Frontend**: Hash storage for ad content
- **Firebase Firestore**: NoSQL database for metadata storage
- **IPFS/Lighthouse**: Content addressing for ad media

## Data Model

Hash records are stored with the following structure:

```typescript
interface HashRecord {
  index: string;              // Unique identifier
  media_hash: string;         // IPFS hash of ad content
  validUpto: number;          // Unix timestamp for expiration
  txHash: string;             // Blockchain transaction hash
  AmountPaid: string;         // Payment amount in wei
  payerAddress: string;       // Payer wallet address
  recieverAddress: string;    // Receiver wallet address
}
```

## Security

- **Input Validation**: All inputs are validated using Zod
- **CORS Protection**: Configurable cross-origin resource sharing
- **Security Headers**: Helmet.js for security headers
- **Environment Variables**: Sensitive data stored securely

## Monitoring

- **Health Checks**: Built-in health check endpoint
- **Structured Logging**: Pino for performance logging
- **Error Handling**: Comprehensive error handling and logging

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

**Hash Service** - Powering decentralized storage for the AxonLayer advertising platform! 🔗


