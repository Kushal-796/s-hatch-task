// Debug script to test Firebase connection
import { auth } from './src/utils/firebase.js';

console.log('Firebase Config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
});

console.log('Auth instance:', auth);

// Test auth state
auth.onAuthStateChanged((user) => {
  console.log('Auth state changed:', user);
});
