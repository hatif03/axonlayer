import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

/**
 * Initializes Firebase Web SDK using environment variables.
 * Loads configuration from .env file.
 */

// Validate required environment variables
const requiredEnvVars = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN', 
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
}

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.FIREBASE_PROJECT_ID!,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.FIREBASE_APP_ID!,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID, // Optional
} as const;

let firestoreInstance: ReturnType<typeof getFirestore> | null = null;

export function getDb() {
  if (!firestoreInstance) {
    if (getApps().length === 0) {
      initializeApp(firebaseConfig);
    }
    firestoreInstance = getFirestore();
  }
  return firestoreInstance;
}

export const COLLECTION_NAME = process.env.FIREBASE_COLLECTION || 'hashes';


