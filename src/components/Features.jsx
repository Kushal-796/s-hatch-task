import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Bot, Rocket, Shield, Zap, TrendingUp, Users, Clock, Star } from 'lucide-react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Bot,
      title: 'AI-Powered Assistant',
      description: 'Get intelligent insights and recommendations tailored to your business needs with our advanced AI technology.',
      color: 'from-sky-blue to-blue-600',
      delay: 0.1
    },
    {
      icon: Rocket,
      title: 'Launch Acceleration',
      description: 'Speed up your go-to-market strategy with automated workflows and proven launch frameworks.',
      color: 'from-neon-pink to-pink-600',
      delay: 0.2
    },
    {
      icon: TrendingUp,
      title: 'Growth Analytics',
      description: 'Track your progress with detailed analytics and performance metrics that matter to your business.',
      color: 'from-purple-500 to-indigo-600',
      delay: 0.3
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Your data is protected with enterprise-grade security and compliance standards.',
      color: 'from-green-500 to-emerald-600',
      delay: 0.4
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Work seamlessly with your team using real-time collaboration tools and shared workspaces.',
      color: 'from-orange-500 to-red-600',
      delay: 0.5
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock customer support team.',
      color: 'from-cyan-500 to-blue-600',
      delay: 0.6
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
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
    <section id="features" className="relative py-20 lg:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-sky-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl" />
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
            className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-sky-blue/30 rounded-full px-4 py-2 mb-6"
          >
            <Star className="w-4 h-4 text-sky-blue" />
            <span className="text-sm font-medium text-white-smoke">
              Powerful Features
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white-smoke mb-6">
            Everything you need to{' '}
            <span className="gradient-text">succeed</span>
          </h2>
          
          <p className="text-lg text-white-smoke/80 max-w-3xl mx-auto">
            From AI-powered insights to enterprise-grade security, we've built the tools 
            that modern startups need to scale and thrive in today's competitive landscape.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <Parallax translateY={[-10, 10]} className="h-full">
                  <div className="h-full card-glow p-8 relative overflow-hidden">
                    {/* Icon */}
                    <div className="relative z-10 mb-6">
                      <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold text-white-smoke mb-4 group-hover:text-sky-blue transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-white-smoke/80 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/5 to-neon-pink/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Animated Border */}
                    <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-sky-blue/30 transition-colors duration-300" />
                  </div>
                </Parallax>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center space-x-2"
            >
              <Zap className="w-4 h-4" />
              <span>Explore All Features</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary"
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Wrapper to provide Parallax context
const FeaturesWithParallax = () => {
  return (
    <ParallaxProvider>
      <Features />
    </ParallaxProvider>
  );
};

export default FeaturesWithParallax;
