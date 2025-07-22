import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  MessageSquare,
  BarChart3,
  Lightbulb,
  Rocket,
  Crown,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Assistant',
      description: 'Get personalized advice and insights from our advanced AI that understands startup challenges.',
      benefits: ['24/7 availability', 'Industry-specific knowledge', 'Personalized recommendations', 'Continuous learning']
    },
    {
      icon: Target,
      title: 'Market Analysis',
      description: 'Comprehensive market research and competitor analysis to help you identify opportunities.',
      benefits: ['Real-time market data', 'Competitor tracking', 'Trend identification', 'Market sizing']
    },
    {
      icon: TrendingUp,
      title: 'Growth Strategy',
      description: 'Data-driven growth strategies tailored to your startup\'s unique needs and goals.',
      benefits: ['Growth metrics tracking', 'A/B testing insights', 'User acquisition strategies', 'Revenue optimization']
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Tools and insights to help you build and manage your startup team effectively.',
      benefits: ['Hiring guidance', 'Team productivity tips', 'Culture building', 'Performance tracking']
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics to track your startup\'s performance and key metrics.',
      benefits: ['Real-time dashboard', 'Custom KPIs', 'Performance insights', 'Automated reports']
    },
    {
      icon: Lightbulb,
      title: 'Innovation Hub',
      description: 'Access to cutting-edge ideas, trends, and innovative solutions for your startup.',
      benefits: ['Trend monitoring', 'Innovation frameworks', 'Idea validation', 'Technology insights']
    }
  ];

  const planFeatures = {
    free: {
      name: 'Free Plan',
      features: ['3 AI assistant queries', 'Basic market insights', 'Community support'],
      color: 'text-green-400'
    },
    basic: {
      name: 'Basic Plan',
      features: ['10 AI assistant queries', 'Market analysis tools', 'Growth recommendations', 'Email support'],
      color: 'text-sky-blue'
    },
    premium: {
      name: 'Premium Plan',
      features: ['Unlimited AI queries', 'Advanced analytics', 'Team management tools', 'Priority support', 'Custom integrations'],
      color: 'text-neon-pink'
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="min-h-screen bg-deep-night pt-20">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-sky-blue/5 via-transparent to-neon-pink/5" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 py-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-sky-blue/30 rounded-full px-4 py-2 mb-6"
          >
            <Rocket className="w-4 h-4 text-sky-blue" />
            <span className="text-sm font-medium text-white-smoke">
              Powerful Features
            </span>
          </motion.div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white-smoke mb-6">
            Everything you need to{' '}
            <span className="gradient-text">launch & scale</span>
          </h1>
          
          <p className="text-xl text-white-smoke/80 max-w-3xl mx-auto mb-8">
            From AI-powered insights to comprehensive analytics, LaunchFlow provides 
            all the tools you need to turn your startup idea into a successful business.
          </p>

          <Link to="/pricing">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary px-8 py-4 text-lg"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </Link>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            
            return (
              <motion.div
                key={feature.title}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="card-glow p-8 group"
              >
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-blue/20 rounded-lg mb-4 group-hover:bg-sky-blue/30 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-sky-blue" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white-smoke mb-3">
                    {feature.title}
                  </h3>
                  
                  <p className="text-white-smoke/70 mb-6">
                    {feature.description}
                  </p>
                </div>

                <div className="space-y-3">
                  {feature.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-white-smoke/80">{benefit}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feature Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white-smoke mb-4">
              Choose your <span className="gradient-text">feature set</span>
            </h2>
            <p className="text-lg text-white-smoke/80 max-w-2xl mx-auto">
              All plans include core features, with additional capabilities as you scale
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Object.entries(planFeatures).map(([planKey, plan]) => (
              <motion.div
                key={planKey}
                whileHover={{ y: -5 }}
                className={`card-glow p-8 ${planKey === 'basic' ? 'ring-2 ring-sky-blue/30' : ''}`}
              >
                <div className="text-center mb-6">
                  <div className="inline-flex items-center space-x-2 mb-3">
                    <Crown className={`w-5 h-5 ${plan.color}`} />
                    <h3 className={`text-xl font-bold ${plan.color}`}>
                      {plan.name}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-white-smoke/80">{feature}</span>
                    </div>
                  ))}
                </div>

                {planKey === 'basic' && (
                  <div className="mt-6 text-center">
                    <div className="inline-flex items-center space-x-1 bg-sky-blue/20 text-sky-blue text-xs font-bold px-3 py-1 rounded-full">
                      <Zap className="w-3 h-3" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center py-16"
        >
          <div className="card-glow p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white-smoke mb-6">
              Ready to accelerate your startup?
            </h2>
            <p className="text-lg text-white-smoke/80 mb-8 max-w-2xl mx-auto">
              Join thousands of entrepreneurs who are already using LaunchFlow 
              to build and scale their startups successfully.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-8 py-4"
                >
                  Start Free Trial
                  <Rocket className="w-5 h-5 ml-2" />
                </motion.button>
              </Link>
              
              <Link to="/pricing">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border border-sky-blue text-sky-blue hover:bg-sky-blue hover:text-white rounded-lg font-semibold transition-all duration-300"
                >
                  View Pricing
                </motion.button>
              </Link>
            </div>

            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-white-smoke/60">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>Setup in minutes</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
