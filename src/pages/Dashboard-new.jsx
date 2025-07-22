import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Crown, 
  Zap,
  Send,
  Bot,
  ArrowUp,
  AlertCircle,
  CheckCircle,
  LogOut,
  CreditCard,
  Activity,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { usePlan } from '../context/PlanContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { currentUser, userDoc, signOut, loading } = useAuth();
  const { 
    currentPlan, 
    usageInfo, 
    canUseFeature, 
    useFeature, 
    needsUpgrade 
  } = usePlan();
  const navigate = useNavigate();

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      id: 1,
      type: 'bot',
      message: 'Welcome to LaunchFlow! I\'m your AI assistant. How can I help you grow your startup today?',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Show loading state while auth is loading
  if (loading) {
    return (
      <div className="min-h-screen bg-deep-night pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-blue mx-auto mb-4"></div>
          <p className="text-white-smoke">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If still no user after loading, show error
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-deep-night pt-20 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <p className="text-white-smoke mb-4">Unable to load user data</p>
          <button 
            onClick={() => navigate('/login')}
            className="btn-primary px-6 py-2"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Mock responses for AI chat
  const mockResponses = [
    "Great question! Based on current market trends, I'd recommend focusing on customer acquisition through content marketing.",
    "Here's a strategic approach: Start by identifying your target audience and create value-driven content.",
    "To optimize your growth strategy, consider implementing a referral program and leveraging user-generated content.",
    "I suggest conducting A/B tests on your landing pages to improve conversion rates.",
    "Focus on building strong product-market fit by gathering customer feedback and iterating."
  ];

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    // Check if user can use the feature
    if (!canUseFeature()) {
      setChatHistory(prev => [...prev, {
        id: Date.now(),
        type: 'system',
        message: 'You\'ve reached your usage limit. Please upgrade your plan to continue using the AI assistant.',
        timestamp: new Date()
      }]);
      return;
    }

    const userMessage = message.trim();
    setMessage('');
    setIsLoading(true);

    // Add user message
    setChatHistory(prev => [...prev, {
      id: Date.now(),
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    }]);

    try {
      // Use the feature (increment usage)
      await useFeature();

      // Simulate AI response
      setTimeout(() => {
        const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        
        setChatHistory(prev => [...prev, {
          id: Date.now() + 1,
          type: 'bot',
          message: randomResponse,
          timestamp: new Date()
        }]);
        setIsLoading(false);
      }, 1500);

    } catch (error) {
      console.error('Error using feature:', error);
      setIsLoading(false);
      setChatHistory(prev => [...prev, {
        id: Date.now() + 2,
        type: 'system',
        message: 'Error processing your request. Please try again.',
        timestamp: new Date()
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUsageColor = () => {
    const percentage = usageInfo?.percentage || 0;
    if (percentage >= 90) return 'text-red-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getUsageBarColor = () => {
    const percentage = usageInfo?.percentage || 0;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-yellow-500';
    return 'bg-sky-blue';
  };

  // Safe defaults for user data
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';
  const planName = currentPlan?.name || 'Free';
  const currentUsage = usageInfo?.current || 0;
  const maxUsage = usageInfo?.max || 3;
  const usagePercentage = usageInfo?.percentage || 0;
  const remainingUsage = usageInfo?.remaining || 0;

  return (
    <div className="min-h-screen bg-deep-night pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white-smoke">
                Welcome back, {displayName}!
              </h1>
              <p className="text-white-smoke/70 mt-1">
                Ready to accelerate your startup journey?
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="card-glow px-4 py-2">
                <div className="flex items-center space-x-2">
                  <Crown className="w-4 h-4 text-neon-pink" />
                  <span className="text-sm font-medium text-white-smoke">
                    {planName} Plan
                  </span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors duration-200"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Sign Out</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Stats & Info */}
          <div className="space-y-6">
            {/* Usage Stats */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-glow p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white-smoke">Usage This Month</h3>
                <BarChart3 className="w-5 h-5 text-sky-blue" />
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white-smoke/70">AI Assistant</span>
                    <span className={`text-sm font-medium ${getUsageColor()}`}>
                      {currentUsage} / {maxUsage === -1 ? '∞' : maxUsage}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getUsageBarColor()}`}
                      style={{ 
                        width: maxUsage === -1 ? '100%' : `${Math.min(usagePercentage, 100)}%` 
                      }}
                    />
                  </div>
                </div>

                {needsUpgrade && needsUpgrade() && (
                  <div className="flex items-start space-x-2 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-red-400 font-medium">Usage Limit Reached</p>
                      <p className="text-xs text-red-400/80 mt-1">
                        Upgrade to continue using the AI assistant
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="card-glow p-6"
            >
              <h3 className="text-lg font-semibold text-white-smoke mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/pricing')}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-sky-blue/10 rounded-lg transition-all duration-200"
                >
                  <CreditCard className="w-4 h-4 text-neon-pink" />
                  <span className="text-sm text-white-smoke">Upgrade Plan</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate('/features')}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-sky-blue/10 rounded-lg transition-all duration-200"
                >
                  <Activity className="w-4 h-4 text-sky-blue" />
                  <span className="text-sm text-white-smoke">View Features</span>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-800/50 hover:bg-sky-blue/10 rounded-lg transition-all duration-200"
                >
                  <Settings className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-white-smoke">Settings</span>
                </motion.button>
              </div>
            </motion.div>

            {/* Account Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="card-glow p-6"
            >
              <h3 className="text-lg font-semibold text-white-smoke mb-4">Account Info</h3>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-white-smoke/60">Email</p>
                  <p className="text-sm text-white-smoke">{currentUser.email}</p>
                </div>
                <div>
                  <p className="text-xs text-white-smoke/60">Plan</p>
                  <p className="text-sm text-white-smoke">{planName}</p>
                </div>
                <div>
                  <p className="text-xs text-white-smoke/60">Member Since</p>
                  <p className="text-sm text-white-smoke">
                    {userDoc?.createdAt ? new Date(userDoc.createdAt.seconds * 1000).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Content - Chat Interface */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="card-glow h-[600px] flex flex-col"
            >
              {/* Chat Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-sky-blue rounded-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white-smoke">AI Assistant</h3>
                    <p className="text-xs text-white-smoke/70">Online</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-white-smoke/70">Active</span>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {chatHistory.map((chat) => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                      chat.type === 'user'
                        ? 'bg-sky-blue text-white'
                        : chat.type === 'system'
                        ? 'bg-red-500/20 border border-red-500/30 text-red-400'
                        : 'bg-gray-800 text-white-smoke'
                    }`}>
                      <p className="text-sm">{chat.message}</p>
                      <p className={`text-xs mt-2 ${
                        chat.type === 'user'
                          ? 'text-white/70'
                          : chat.type === 'system'
                          ? 'text-red-400/70'
                          : 'text-white-smoke/50'
                      }`}>
                        {formatTimestamp(chat.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-gray-800 px-4 py-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-sky-blue rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-sky-blue rounded-full animate-pulse delay-75"></div>
                        <div className="w-2 h-2 bg-sky-blue rounded-full animate-pulse delay-150"></div>
                        <span className="text-sm text-white-smoke/70 ml-2">Thinking...</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-6 border-t border-gray-700">
                <div className="flex space-x-3">
                  <div className="flex-1">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={canUseFeature && canUseFeature() 
                        ? "Ask me anything about your startup..." 
                        : "Upgrade to continue using the AI assistant"}
                      disabled={!canUseFeature || !canUseFeature() || isLoading}
                      className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white-smoke placeholder-white-smoke/60 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      rows="3"
                    />
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSendMessage}
                    disabled={!message.trim() || !canUseFeature || !canUseFeature() || isLoading}
                    className="px-6 py-3 btn-primary disabled:opacity-50 disabled:cursor-not-allowed h-fit"
                  >
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
                
                <div className="flex items-center justify-between mt-3 text-xs text-white-smoke/60">
                  <span>Press Enter to send</span>
                  <span>{remainingUsage} uses remaining</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
