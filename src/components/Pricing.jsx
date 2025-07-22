import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Zap, Crown, Gift, ArrowRight, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePlan } from '../context/PlanContext';
import { useNavigate } from 'react-router-dom';

const Pricing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { isAuthenticated } = useAuth();
  const { getAllPlans, isCurrentPlan, upgradePlan, upgrading } = usePlan();
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const plans = getAllPlans();
  
  // Debug log to check plan data
  console.log('📋 Available plans:', plans.map(p => ({ id: p.id, name: p.name, price: p.price })));

  const handlePlanSelect = async (plan) => {
    console.log('🔥 Plan select clicked:', {
      planId: plan.id,
      planName: plan.name,
      price: plan.price,
      isAuthenticated,
      isCurrentPlan: isCurrentPlan(plan.id)
    });

    if (!isAuthenticated) {
      console.log('🚫 User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }

    if (isCurrentPlan(plan.id)) {
      console.log('✅ User already has this plan, redirecting to dashboard');
      navigate('/dashboard');
      return;
    }

    if (plan.id === 'free') {
      console.log('🚫 Free plan selected, no action needed');
      return;
    }

    console.log('💳 Starting plan upgrade process...');
    try {
      setSelectedPlan(plan.id);
      console.log('🔄 Calling upgradePlan function...');
      await upgradePlan(plan.id);
      console.log('✅ Plan upgrade successful, redirecting to dashboard');
      navigate('/dashboard');
    } catch (error) {
      console.error('❌ Error upgrading plan:', error);
      alert(`Payment failed: ${error.message}`);
    } finally {
      setSelectedPlan(null);
    }
  };

  const getButtonText = (plan) => {
    if (!isAuthenticated) {
      return plan.id === 'free' ? 'Get Started Free' : `Get Started - ${plan.currency}${plan.price}/${plan.period}`;
    }
    
    if (isCurrentPlan(plan.id)) {
      return 'Current Plan';
    }
    
    return plan.buttonText;
  };

  const getButtonStyle = (plan) => {
    if (isCurrentPlan(plan.id)) {
      return 'bg-gray-600 text-gray-300 cursor-not-allowed';
    }
    
    if (plan.popular) {
      return 'btn-primary';
    }
    
    return 'btn-secondary';
  };

  const getPlanIcon = (plan) => {
    switch (plan.id) {
      case 'free':
        return Gift;
      case 'basic':
        return Zap;
      case 'premium':
        return Crown;
      default:
        return Zap;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-blue/5 via-transparent to-neon-pink/5" />
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-neon-pink/30 rounded-full px-4 py-2 mb-6"
          >
            <Crown className="w-4 h-4 text-neon-pink" />
            <span className="text-sm font-medium text-white-smoke">
              Choose Your Plan
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white-smoke mb-6">
            Simple, transparent{' '}
            <span className="gradient-text">pricing</span>
          </h2>
          
          <p className="text-lg text-white-smoke/80 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises. 
            Just the tools you need to launch and grow your startup successfully.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => {
            const Icon = getPlanIcon(plan);
            const isLoading = upgrading && selectedPlan === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                variants={itemVariants}
                whileHover={{ 
                  y: plan.popular ? -5 : -10,
                  transition: { duration: 0.3 }
                }}
                className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-neon-pink to-sky-blue text-white text-xs font-bold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={`h-full card-glow p-8 relative overflow-hidden ${
                  plan.popular ? 'border-neon-pink/50' : ''
                }`}>
                  {/* Plan Icon & Name */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 rounded-xl mb-4 ${
                      plan.id === 'free' 
                        ? 'bg-gradient-to-br from-gray-600 to-gray-700'
                        : plan.id === 'basic'
                        ? 'bg-gradient-to-br from-sky-blue to-blue-600'
                        : 'bg-gradient-to-br from-neon-pink to-purple-600'
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white-smoke mb-2">
                      {plan.name}
                    </h3>
                    
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-3xl sm:text-4xl font-bold gradient-text">
                        {plan.currency}{plan.price}
                      </span>
                      {plan.period !== 'forever' && (
                        <span className="text-white-smoke/70">
                          /{plan.period}
                        </span>
                      )}
                    </div>
                    
                    {plan.id === 'free' && (
                      <p className="text-sm text-white-smoke/70 mt-2">
                        Perfect to get started
                      </p>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-start space-x-3"
                      >
                        <Check className="w-5 h-5 text-sky-blue flex-shrink-0 mt-0.5" />
                        <span className="text-white-smoke/90 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan)}
                    disabled={isCurrentPlan(plan.id) || isLoading}
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${getButtonStyle(plan)}`}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>{getButtonText(plan)}</span>
                        {!isCurrentPlan(plan.id) && <ArrowRight className="w-4 h-4" />}
                      </>
                    )}
                  </motion.button>

                  {/* Usage Info */}
                  {plan.maxUsage !== -1 && (
                    <div className="mt-4 text-center">
                      <span className="text-xs text-white-smoke/60">
                        {plan.maxUsage} uses per {plan.period}
                      </span>
                    </div>
                  )}

                  {/* Glow Effect for Popular Plan */}
                  {plan.popular && (
                    <div className="absolute inset-0 bg-gradient-to-br from-neon-pink/10 to-sky-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-xl p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-bold text-white-smoke mb-4">
              All plans include
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-white-smoke/80">
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-sky-blue" />
                <span>SSL Certificate</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-sky-blue" />
                <span>Regular Updates</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-sky-blue" />
                <span>Data Encryption</span>
              </div>
            </div>

            <div className="mt-6 text-xs text-white-smoke/60">
              <p>
                * All prices are in Indian Rupees. Cancel anytime. 
                Test mode is enabled - no actual payments will be processed.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
