// Authentication Context Provider
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChange, 
  createUserDocument, 
  getUserDocument,
  signUpWithEmail,
  signInWithEmail,
  signInWithGoogle,
  logout
} from '../utils/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state listener
  useEffect(() => {
    console.log('🔥 AuthContext: Setting up auth state listener...');
    
    const unsubscribe = onAuthStateChange(async (user) => {
      console.log('🔥 AuthContext: Auth state changed', { user: !!user, uid: user?.uid });
      
      setCurrentUser(user);
      setLoading(true);
      setError(null);

      if (user) {
        console.log('🔥 AuthContext: User authenticated, fetching user document...');
        try {
          // Create user document if it doesn't exist
          await createUserDocument(user);
          console.log('🔥 AuthContext: User document created/verified');
          
          // Fetch user document
          const userData = await getUserDocument(user.uid);
          console.log('🔥 AuthContext: User document fetched', userData);
          setUserDoc(userData);
        } catch (err) {
          console.error('❌ AuthContext: Error setting up user:', err);
          setError(err.message);
        }
      } else {
        console.log('🔥 AuthContext: User not authenticated, clearing user doc');
        setUserDoc(null);
      }
      
      console.log('🔥 AuthContext: Setting loading to false');
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Refresh user data
  const refreshUserData = async () => {
    if (currentUser) {
      try {
        const userData = await getUserDocument(currentUser.uid);
        setUserDoc(userData);
      } catch (err) {
        console.error('Error refreshing user data:', err);
        setError(err.message);
      }
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, displayName) => {
    try {
      setError(null);
      const { user } = await signUpWithEmail(email, password);
      
      // Update display name if provided
      if (displayName) {
        await user.updateProfile({ displayName });
      }
      
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with email and password
  const signIn = async (email, password) => {
    try {
      setError(null);
      const { user } = await signInWithEmail(email, password);
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign in with Google
  const signInGoogle = async () => {
    try {
      setError(null);
      const { user } = await signInWithGoogle();
      return user;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Sign out
  const signOut = async () => {
    try {
      setError(null);
      await logout();
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!currentUser;

  // Check if user has a specific plan
  const hasPlan = (planType) => {
    return userDoc?.plan === planType;
  };

  // Check if user can access feature
  const canAccess = (feature) => {
    if (!userDoc) return false;
    
    const { plan, usageCount, maxUsage } = userDoc;
    
    if (plan === 'premium') return true;
    if (plan === 'basic' && (maxUsage === -1 || usageCount < maxUsage)) return true;
    if (plan === 'free' && usageCount < maxUsage) return true;
    
    return false;
  };

  const value = {
    currentUser,
    userDoc,
    loading,
    error,
    isAuthenticated,
    signUp,
    signIn,
    signInGoogle,
    signOut,
    refreshUserData,
    hasPlan,
    canAccess,
    setError
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
