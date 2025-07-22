import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Mail, 
  Github, 
  Twitter, 
  Linkedin, 
  Heart,
  ArrowRight,
  MapPin,
  Phone
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', path: '/#features' },
      { name: 'Pricing', path: '/pricing' },
      { name: 'Documentation', path: '#' },
      { name: 'API Reference', path: '#' },
    ],
    company: [
      { name: 'About Us', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Contact', path: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
      { name: 'GDPR', path: '#' },
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'Community', path: '#' },
      { name: 'Status', path: '#' },
      { name: 'Contact Support', path: '#' },
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Kushal-796', label: 'GitHub' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="relative bg-deep-night border-t border-gray-800/50">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-80 h-80 bg-sky-blue/5 rounded-full blur-3xl" />
        <div className="absolute -top-40 right-1/4 w-80 h-80 bg-neon-pink/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-b border-gray-800/50 py-12"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-white-smoke mb-4">
              Stay in the loop
            </h3>
            <p className="text-white-smoke/80 mb-8">
              Get the latest updates, tips, and insights delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white-smoke placeholder-white-smoke/60 focus:outline-none focus:ring-2 focus:ring-sky-blue focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary flex items-center justify-center space-x-2 px-6 py-3"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Logo */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="p-2 bg-gradient-to-br from-sky-blue to-neon-pink rounded-lg">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">
                    LaunchFlow
                  </span>
                </div>

                <p className="text-white-smoke/80 mb-6 max-w-md">
                  Empowering startups to launch faster and flow better with AI-powered 
                  tools, seamless workflows, and premium user experiences.
                </p>

                {/* Contact Info */}
                <div className="space-y-3 text-sm text-white-smoke/70">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-sky-blue" />
                    <span>San Francisco, CA</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-4 h-4 text-sky-blue" />
                    <span>hello@launchflow.app</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-4 h-4 text-sky-blue" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center space-x-4 mt-8">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ 
                          scale: 1.1,
                          y: -2,
                          transition: { duration: 0.2 }
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="p-3 bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-lg text-white-smoke hover:text-sky-blue hover:border-sky-blue/50 transition-all duration-300"
                        aria-label={social.label}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links], categoryIndex) => (
              <div key={category}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-white-smoke font-semibold mb-4 capitalize">
                    {category}
                  </h4>
                  <ul className="space-y-3">
                    {links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <motion.div
                          whileHover={{ x: 4, transition: { duration: 0.2 } }}
                        >
                          <Link
                            to={link.path}
                            className="text-white-smoke/70 hover:text-sky-blue transition-colors duration-200 text-sm"
                          >
                            {link.name}
                          </Link>
                        </motion.div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-gray-800/50 py-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="text-sm text-white-smoke/70 mb-4 sm:mb-0">
              <span>© {currentYear} LaunchFlow. All rights reserved.</span>
            </div>
            
            <div className="flex items-center space-x-2 text-sm text-white-smoke/70">
              <span>Made with</span>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                <Heart className="w-4 h-4 text-neon-pink fill-current" />
              </motion.div>
              <span>by</span>
              <a
                href="https://github.com/Kushal-796"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-blue hover:text-neon-pink transition-colors duration-200 font-medium"
              >
                Vakada Kushal
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
