// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore';

// Firebase configuration object
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth provider
const googleProvider = new GoogleAuthProvider();

// Auth functions
export const signUpWithEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const signInWithEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const logout = () => signOut(auth);

// User management functions
export const createUserDocument = async (user, additionalData = {}) => {
  if (!user) return;
  
  const userRef = doc(db, 'users', user.uid);
  const userDoc = await getDoc(userRef);
  
  if (!userDoc.exists()) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    
    try {
      await setDoc(userRef, {
        displayName,
        email,
        photoURL,
        plan: 'free',
        usageCount: 0,
        maxUsage: 3,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error('Error creating user document:', error);
    }
  }
  
  return userRef;
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;
  
  try {
    const userRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userRef);
    return userDoc.exists() ? { id: userDoc.id, ...userDoc.data() } : null;
  } catch (error) {
    console.error('Error fetching user document:', error);
    return null;
  }
};

export const updateUserPlan = async (uid, plan) => {
  if (!uid) return;
  
  const planLimits = {
    free: 3,
    basic: 10,
    premium: -1 // unlimited
  };
  
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      plan,
      maxUsage: planLimits[plan],
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error updating user plan:', error);
  }
};

export const incrementUsage = async (uid) => {
  if (!uid) return;
  
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      usageCount: increment(1),
      lastUsed: new Date()
    });
  } catch (error) {
    console.error('Error incrementing usage:', error);
  }
};

// Auth state observer
export const onAuthStateChange = (callback) => onAuthStateChanged(auth, callback);

export default app;
