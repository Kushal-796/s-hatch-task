import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Typewriter from 'typewriter-effect';

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Floating Particles */}
      <div className="particles-bg">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center space-x-2 bg-gray-900/50 backdrop-blur-sm border border-sky-blue/30 rounded-full px-4 py-2 mb-8"
            >
              <Sparkles className="w-4 h-4 text-sky-blue" />
              <span className="text-sm font-medium text-white-smoke">
                New: AI-Powered Launch Assistant
              </span>
            </motion.div>

            {/* Main Heading with Typewriter */}
            <motion.div variants={itemVariants} className="mb-6">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white-smoke leading-tight">
                <div className="mb-2">Empower your</div>
                <div className="gradient-text mb-2">
                  <Typewriter
                    options={{
                      strings: ['Startup.', 'Vision.', 'Growth.', 'Success.'],
                      autoStart: true,
                      loop: true,
                      delay: 75,
                      deleteSpeed: 50,
                    }}
                  />
                </div>
                <div className="text-white-smoke/90">
                  Launch Faster. Flow Better.
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-white-smoke/80 mb-8 max-w-2xl"
            >
              Transform your ideas into reality with our AI-powered platform. 
              Get instant insights, automated workflows, and premium tools designed 
              for modern entrepreneurs who refuse to settle for ordinary.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <span>{isAuthenticated ? 'Go to Dashboard' : 'Start Your Journey'}</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/pricing')}
                className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <Zap className="w-5 h-5" />
                <span>View Pricing</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mt-12 pt-12 border-t border-gray-800/50"
            >
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">1000+</div>
                <div className="text-sm text-white-smoke/70">Active Users</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">99.9%</div>
                <div className="text-sm text-white-smoke/70">Uptime</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-3xl font-bold gradient-text">24/7</div>
                <div className="text-sm text-white-smoke/70">Support</div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Visual */}
          <motion.div
            variants={itemVariants}
            className="relative lg:ml-8"
          >
            {/* Main Card */}
            <div className="relative">
              <motion.div
                animate={{
                  y: [-10, 10, -10],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="card-glow p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-sky-blue rounded-lg flex items-center justify-center">
                      <Zap className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white-smoke font-medium">AI Assistant</div>
                      <div className="text-white-smoke/70 text-sm">Ready to help</div>
                    </div>
                    <div className="ml-auto">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="text-white-smoke/90 text-sm">
                      "How can I optimize my startup's growth strategy?"
                    </div>
                    <div className="mt-2 text-sky-blue text-sm">
                      ✨ Analyzing market trends and growth opportunities...
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <div className="flex-1 h-2 bg-sky-blue rounded-full"></div>
                    <div className="flex-1 h-2 bg-sky-blue/50 rounded-full"></div>
                    <div className="flex-1 h-2 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </motion.div>

              {/* Floating Elements */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-neon-pink to-sky-blue rounded-full opacity-20"
              />

              <motion.div
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-sky-blue to-neon-pink rounded-lg opacity-60"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-sky-blue rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-sky-blue rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
