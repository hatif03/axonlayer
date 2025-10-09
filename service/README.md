### Hash Service (Express + Firebase Firestore)

Runs a small API to store and retrieve records keyed by `index` with fields `{ media_hash, validUpto, txHash, AmountPaid, payerAddress, recieverAddress }`.

### Endpoints
- **POST** `/hashes` — store a record
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
- **GET** `/hashes/:index` — retrieve by path param
- **GET** `/hashes?index=<id>` — retrieve by query param

### Setup
1. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your Firebase configuration in `.env`:
   - Get your Firebase config from Firebase Console → Project Settings → General → Your apps
   - Copy the values to the corresponding environment variables
3. Install deps and run (from `service/`):
   ```bash
   pnpm install
   pnpm dev
   ```

### Required Environment Variables
- `FIREBASE_API_KEY` - Your Firebase API key
- `FIREBASE_AUTH_DOMAIN` - Your Firebase auth domain (project-id.firebaseapp.com)
- `FIREBASE_PROJECT_ID` - Your Firebase project ID
- `FIREBASE_STORAGE_BUCKET` - Your Firebase storage bucket
- `FIREBASE_MESSAGING_SENDER_ID` - Your Firebase messaging sender ID
- `FIREBASE_APP_ID` - Your Firebase app ID
- `FIREBASE_MEASUREMENT_ID` - (Optional) Your Firebase measurement ID

### Optional Environment Variables
- `FIREBASE_COLLECTION=hashes` - Firestore collection name
- `PORT=4000` - Server port
- `NODE_ENV=development` - Environment mode

### Folder structure
```
hash-service/
  src/
    routes/
      hashes.ts
    firebase.ts
    index.ts
  package.json
  tsconfig.json
  .env (not committed, optional)
  .env.example (optional)
  README.md
```


