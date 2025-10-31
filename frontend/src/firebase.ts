// Firebase initialization (modular SDK)
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Only initialize Firebase services on the client to avoid server-side errors
let app: ReturnType<typeof initializeApp> | null = null;
let analytics: ReturnType<typeof getAnalytics> | null = null;
let auth: ReturnType<typeof getAuth> | null = null;

if (typeof window !== 'undefined') {
  // Only initialize when a valid API key is present
  if (firebaseConfig.apiKey) {
    try {
      app = getApps().length ? getApp() : initializeApp(firebaseConfig as any);
    } catch (e) {
      // fallback: attempt initialize
      app = initializeApp(firebaseConfig as any);
    }

    try {
      analytics = getAnalytics(app as any);
    } catch (e) {
      analytics = null;
    }

    try {
      auth = getAuth(app as any);
    } catch (e) {
      // If auth fails (invalid config), log a friendly warning but don't crash the app
      // The client will still see Firebase errors when calling auth methods.
      // We keep auth as null here so imports won't throw during SSR.
      // eslint-disable-next-line no-console
      console.warn('Firebase auth initialization failed:', (e as Error).message);
      auth = null;
    }
  } else {
    // eslint-disable-next-line no-console
    console.warn('Firebase not configured. Set NEXT_PUBLIC_FIREBASE_API_KEY in .env.local');
  }
}

export { app, analytics, auth };
