import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
// Replace these values with your actual Firebase config from .env file
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || ''
};

// Validate that all required config values are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(
  (varName) => !import.meta.env[varName] || import.meta.env[varName] === ''
);

if (missingVars.length > 0) {
  console.error(
    '❌ Missing or empty Firebase environment variables:',
    missingVars.join(', ')
  );
  console.error(
    'Please check your .env file and ensure all Firebase configuration values are set.'
  );
  throw new Error(
    `Missing Firebase environment variables: ${missingVars.join(', ')}`
  );
}

// Validate API key format
if (firebaseConfig.apiKey && !firebaseConfig.apiKey.startsWith('AIza')) {
  console.warn('⚠️ Firebase API key format may be incorrect. API keys typically start with "AIza"');
}

// Log config status (for debugging - remove in production)
if (import.meta.env.DEV) {
  console.log('✅ Firebase config loaded:', {
    apiKey: firebaseConfig.apiKey ? `${firebaseConfig.apiKey.substring(0, 10)}...` : 'MISSING',
    authDomain: firebaseConfig.authDomain || 'MISSING',
    projectId: firebaseConfig.projectId || 'MISSING',
    hasMeasurementId: !!firebaseConfig.measurementId
  });
}

// Initialize Firebase
let app;
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.error('Error initializing Firebase:', error);
  throw new Error(
    'Firebase initialization failed. Please check your .env file and Firebase configuration.'
  );
}

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;

