// Plan Management Context Provider
import { createContext, useContext, useState } from 'react';
import { useAuth } from './AuthContext';
import { updateUserPlan, incrementUsage } from '../utils/firebase';
import { pricingPlans, getPlanById, hasExceededUsage, createRazorpayPayment } from '../utils/razorpay';

const PlanContext = createContext();

export const usePlan = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};

export const PlanProvider = ({ children }) => {
  const { currentUser, userDoc, refreshUserData } = useAuth();
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeError, setUpgradeError] = useState(null);

  // Get current plan details
  const getCurrentPlan = () => {
    if (!userDoc) return pricingPlans[0]; // default to free
    return getPlanById(userDoc.plan) || pricingPlans[0];
  };

  // Get usage information
  const getUsageInfo = () => {
    if (!userDoc) {
      return {
        current: 0,
        max: 3,
        percentage: 0,
        exceeded: false,
        remaining: 3
      };
    }

    const { usageCount, maxUsage } = userDoc;
    const current = usageCount || 0;
    const max = maxUsage === -1 ? Infinity : maxUsage;
    const exceeded = hasExceededUsage(current, maxUsage);
    const percentage = maxUsage === -1 ? 0 : Math.min((current / max) * 100, 100);
    const remaining = maxUsage === -1 ? Infinity : Math.max(max - current, 0);

    return {
      current,
      max: maxUsage,
      percentage,
      exceeded,
      remaining
    };
  };

  // Check if user can use a feature
  const canUseFeature = () => {
    if (!currentUser || !userDoc) return false;
    
    const { exceeded } = getUsageInfo();
    return !exceeded;
  };

  // Use a feature (increment usage)
  const useFeature = async () => {
    if (!currentUser || !canUseFeature()) {
      throw new Error('Feature usage not allowed');
    }

    try {
      await incrementUsage(currentUser.uid);
      await refreshUserData();
      return true;
    } catch (error) {
      console.error('Error using feature:', error);
      throw error;
    }
  };

  // Upgrade user plan
  const upgradePlan = async (planId) => {
    if (!currentUser) {
      throw new Error('User not authenticated');
    }

    setUpgrading(true);
    setUpgradeError(null);

    try {
      const plan = getPlanById(planId);
      if (!plan) {
        throw new Error('Invalid plan selected');
      }

      // Integrate with Razorpay for payment
      if (plan.price > 0) {
        console.log(`Starting payment process for ${plan.name} plan (₹${plan.price})`);
        console.log('🔑 Environment check:', {
          razorpayKey: import.meta.env.VITE_RAZORPAY_KEY_ID ? 'Present' : 'Missing',
          keyFormat: import.meta.env.VITE_RAZORPAY_KEY_ID?.startsWith('rzp_') ? 'Valid' : 'Invalid'
        });
        
        try {
          const paymentResult = await createRazorpayPayment(
            planId, 
            currentUser.uid, 
            currentUser.email,
            currentUser.displayName || 'LaunchFlow User',
            currentUser.phoneNumber || ''
          );
          
          console.log('Payment completed successfully:', paymentResult);
        } catch (paymentError) {
          console.error('Payment failed:', paymentError);
          throw new Error(`Payment failed: ${paymentError.message}`);
        }
      }
      
      // Update user plan in Firebase
      console.log('Updating user plan in Firebase...');
      await updateUserPlan(currentUser.uid, planId);
      
      // Refresh user data
      console.log('Refreshing user data...');
      await refreshUserData();
      
      console.log(`Plan upgrade to ${plan.name} completed successfully!`);
      return { success: true, plan };
    } catch (error) {
      console.error('Error upgrading plan:', error);
      setUpgradeError(error.message);
      throw error;
    } finally {
      setUpgrading(false);
    }
  };

  // Get all available plans
  const getAllPlans = () => pricingPlans;

  // Check if plan is current user's plan
  const isCurrentPlan = (planId) => {
    return userDoc?.plan === planId;
  };

  // Get plan recommendation based on usage
  const getRecommendedPlan = () => {
    const usage = getUsageInfo();
    
    if (usage.exceeded && userDoc?.plan === 'free') {
      return getPlanById('basic');
    }
    
    if (usage.percentage > 80 && userDoc?.plan === 'basic') {
      return getPlanById('premium');
    }
    
    return null;
  };

  // Check if user needs to upgrade
  const needsUpgrade = () => {
    const { exceeded } = getUsageInfo();
    return exceeded;
  };

  const value = {
    currentPlan: getCurrentPlan(),
    usageInfo: getUsageInfo(),
    canUseFeature,
    useFeature,
    upgradePlan,
    upgrading,
    upgradeError,
    getAllPlans,
    isCurrentPlan,
    getRecommendedPlan,
    needsUpgrade,
    setUpgradeError
  };

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
};

export default PlanContext;
