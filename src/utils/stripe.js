// Razorpay payment integration

// Load Razorpay script dynamically
const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

// Pricing plans configuration
export const pricingPlans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: '₹',
    period: 'forever',
    features: [
      '3 uses of chatbot/tools',
      'Basic features',
      'Community support',
      'Standard response time'
    ],
    maxUsage: 3,
    popular: false,
    razorpayPlanId: null,
    buttonText: 'Current Plan'
  },
  {
    id: 'basic',
    name: 'Basic',
    price: 99,
    currency: '₹',
    period: 'month',
    features: [
      '10 uses per month',
      'Extra features',
      'Priority support',
      'Faster response time',
      'Email support'
    ],
    maxUsage: 10,
    popular: true,
    razorpayPlanId: 'plan_basic_monthly', // Replace with actual Razorpay plan ID
    buttonText: 'Upgrade to Basic'
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 299,
    currency: '₹',
    period: 'month',
    features: [
      'Unlimited everything',
      'Priority UX',
      '24/7 support',
      'Custom integrations',
      'Advanced analytics',
      'API access'
    ],
    maxUsage: -1, // unlimited
    popular: false,
    razorpayPlanId: 'plan_premium_monthly', // Replace with actual Razorpay plan ID
    buttonText: 'Upgrade to Premium'
  }
];

// Create Razorpay payment
export const createRazorpayPayment = async (planId, userId, userEmail, userName, userPhone = '') => {
  try {
    // Load Razorpay script
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK');
    }

    const plan = getPlanById(planId);
    if (!plan || plan.price === 0) {
      throw new Error('Invalid plan selected');
    }

    // In a real implementation, you would call your backend API to create an order
    // For demo purposes, we'll create the payment directly
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Razorpay Key ID
      amount: plan.price * 100, // Amount in paise (multiply by 100)
      currency: 'INR',
      name: 'LaunchFlow',
      description: `${plan.name} Plan Subscription`,
      image: '/logo.png', // Your logo
      order_id: `order_${Date.now()}_${userId}`, // In production, get this from backend
      handler: function (response) {
        console.log('Payment successful:', response);
        // Handle successful payment
        // In production, verify payment on backend
        return {
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature
        };
      },
      prefill: {
        name: userName || 'User',
        email: userEmail,
        contact: userPhone || '9999999999'
      },
      notes: {
        user_id: userId,
        plan_id: planId
      },
      theme: {
        color: '#0ea5e9' // Sky blue color to match your theme
      },
      modal: {
        ondismiss: function() {
          console.log('Payment modal closed');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    
    return new Promise((resolve, reject) => {
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        reject(new Error(response.error.description));
      });
      
      options.handler = function (response) {
        resolve({
          success: true,
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
          planId
        });
      };
      
      const newRzp = new window.Razorpay(options);
      newRzp.open();
    });

  } catch (error) {
    console.error('Error creating Razorpay payment:', error);
    throw error;
  }
};

// Mock function for demo purposes - handles plan upgrade without actual payment
export const mockUpgradePlan = async (planId, userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Mock upgrade: User ${userId} upgraded to ${planId} plan`);
      resolve({ success: true, planId });
    }, 2000);
  });
};

// Get plan by ID
export const getPlanById = (planId) => {
  return pricingPlans.find(plan => plan.id === planId) || pricingPlans[0];
};

// Check if user can access features based on plan
export const canAccessFeature = (userPlan, featureName) => {
  const plan = getPlanById(userPlan);
  return plan && plan.features.some(feature => 
    feature.toLowerCase().includes(featureName.toLowerCase())
  );
};

// Check if user has exceeded usage limit
export const hasExceededUsage = (usageCount, maxUsage) => {
  if (maxUsage === -1) return false; // unlimited
  return usageCount >= maxUsage;
};

export default loadRazorpay;
