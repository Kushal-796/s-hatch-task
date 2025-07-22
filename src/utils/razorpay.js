// Razorpay payment integration

// Load Razorpay script dynamically
const loadRazorpay = () => {
  return new Promise((resolve) => {
    // Check if Razorpay is already loaded
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    // Check if script is already added
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }

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
    // Check if Razorpay key is available
    const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
    if (!razorpayKey || razorpayKey === 'rzp_test_your_razorpay_key_id_here') {
      throw new Error('Razorpay API key not configured. Please add your actual Razorpay test key to .env.local');
    }

    // Load Razorpay script
    const isLoaded = await loadRazorpay();
    if (!isLoaded) {
      throw new Error('Failed to load Razorpay SDK. Please check your internet connection.');
    }

    const plan = getPlanById(planId);
    if (!plan || plan.price === 0) {
      throw new Error('Invalid plan selected');
    }

    console.log('Initiating payment for:', {
      plan: plan.name,
      amount: plan.price,
      user: userEmail
    });

    return new Promise((resolve, reject) => {
      const options = {
        key: razorpayKey,
        amount: plan.price * 100, // Amount in paise (multiply by 100)
        currency: 'INR',
        name: 'LaunchFlow',
        description: `${plan.name} Plan Subscription`,
        image: 'https://your-app-logo.png', // You can replace with actual logo URL
        // For demo purposes without backend, we'll skip order_id
        // In production, you should create order on backend and pass order_id here
        handler: function (response) {
          console.log('Payment successful:', response);
          
          // Simulate order verification (in production, verify on backend)
          setTimeout(() => {
            resolve({
              success: true,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id || `order_${Date.now()}`,
              signature: response.razorpay_signature || 'demo_signature',
              planId
            });
          }, 500);
        },
        prefill: {
          name: userName || 'LaunchFlow User',
          email: userEmail,
          contact: userPhone || '9999999999'
        },
        notes: {
          user_id: userId,
          plan_id: planId,
          plan_name: plan.name
        },
        theme: {
          color: '#0ea5e9'
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal closed by user');
            reject(new Error('Payment was cancelled by user'));
          }
        },
        retry: {
          enabled: true,
          max_count: 3
        }
      };

      console.log('Opening Razorpay with options:', {
        key: `${razorpayKey.substring(0, 12)}...`,
        amount: options.amount,
        currency: options.currency,
        name: options.name
      });

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response) {
        console.error('Payment failed:', response.error);
        const errorMessage = response.error.description || 
                            response.error.reason || 
                            'Payment failed. Please try again.';
        reject(new Error(errorMessage));
      });
      
      try {
        rzp.open();
      } catch (error) {
        console.error('Error opening Razorpay modal:', error);
        reject(new Error('Failed to open payment modal. Please try again.'));
      }
    });

  } catch (error) {
    console.error('Error creating Razorpay payment:', error);
    throw error;
  }
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
