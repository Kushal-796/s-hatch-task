import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Rocket, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, signOut, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActiveLink = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path;
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-deep-night/90 backdrop-blur-md border-b border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2"
          >
            <Link to="/" className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-to-br from-sky-blue to-neon-pink rounded-lg">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl md:text-2xl font-bold gradient-text">
                LaunchFlow
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActiveLink(item.path)
                      ? 'text-sky-blue'
                      : 'text-white-smoke hover:text-sky-blue'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            {/* Auth buttons */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center space-x-2 text-sm font-medium text-white-smoke hover:text-sky-blue transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 text-sm font-medium text-white-smoke hover:text-neon-pink transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </motion.button>
                </div>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="text-sm font-medium text-white-smoke hover:text-sky-blue transition-colors duration-200"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/login')}
                    className="btn-primary text-sm px-6 py-2"
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white-smoke hover:text-sky-blue transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden overflow-hidden bg-deep-night/95 backdrop-blur-md border-t border-gray-800/50"
        >
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-base font-medium transition-colors duration-200 ${
                    isActiveLink(item.path)
                      ? 'text-sky-blue'
                      : 'text-white-smoke hover:text-sky-blue'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <div className="pt-4 border-t border-gray-800/50 space-y-4">
              {isAuthenticated ? (
                <>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate('/dashboard');
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-base font-medium text-white-smoke hover:text-sky-blue transition-colors duration-200"
                  >
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-base font-medium text-white-smoke hover:text-neon-pink transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </motion.button>
                </>
              ) : (
                <>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="block text-base font-medium text-white-smoke hover:text-sky-blue transition-colors duration-200"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    className="btn-primary w-full justify-center"
                  >
                    Get Started
                  </motion.button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </nav>
    </motion.header>
  );
};

export default Header;
