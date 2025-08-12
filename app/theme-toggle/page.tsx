"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Monitor, Palette, Eye, Sparkles } from "lucide-react";
import TransitionPage from "@/components/transition-page";

const ThemeTogglePage = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark' | 'auto'>('dark');
  const [showToast, setShowToast] = useState(false);

  // Initialize theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'auto';
    if (savedTheme) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const themes = [
    {
      id: 'light',
      name: 'Light Mode',
      icon: <Sun className="w-5 h-5" />,
      description: 'Clean, bright interface',
      preview: 'bg-gray-100 text-gray-900 border border-gray-300'
    },
    {
      id: 'dark',
      name: 'Dark Mode',
      icon: <Moon className="w-5 h-5" />,
      description: 'Easy on the eyes',
      preview: 'bg-gray-900 text-gray-100 border border-gray-700'
    },
    {
      id: 'auto',
      name: 'System',
      icon: <Monitor className="w-5 h-5" />,
      description: 'Follows system preference',
      preview: 'bg-gradient-to-r from-gray-100 via-gray-500 to-gray-900 text-gray-200 border border-gray-500'
    }
  ];

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setCurrentTheme(theme);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
    
    // In a real implementation, you would apply the theme to the document
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      // Auto mode - check system preference
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4 pb-20">
        <div className="max-w-6xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Theme Toggle Demo
                </h1>
                <p className="text-gray-300">
                  Advanced theme switching with smooth transitions
                </p>
              </div>
            </div>

            {/* Theme Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {themes.map((theme) => (
                <motion.div
                  key={theme.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-6 rounded-xl border cursor-pointer transition-all duration-300 ${
                    currentTheme === theme.id
                      ? 'border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70'
                  }`}
                  onClick={() => handleThemeChange(theme.id as 'light' | 'dark' | 'auto')}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <motion.div
                      animate={currentTheme === theme.id ? { rotate: [0, 5, -5, 0] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {theme.icon}
                    </motion.div>
                    <h3 className="font-semibold text-white">{theme.name}</h3>
                    {currentTheme === theme.id && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto w-3 h-3 bg-purple-500 rounded-full"
                      />
                    )}
                  </div>
                  <p className="text-gray-400 text-sm mb-4">{theme.description}</p>
                  
                  {/* Theme Preview */}
                  <motion.div 
                    className={`w-full h-20 rounded-lg ${theme.preview} p-3 flex items-center justify-center transition-all duration-300`}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="text-center">
                      <motion.div 
                        className="w-8 h-2 bg-current rounded mb-2 opacity-60"
                        animate={currentTheme === theme.id ? { opacity: [0.6, 1, 0.6] } : {}}
                        transition={{ duration: 2, repeat: currentTheme === theme.id ? Infinity : 0 }}
                      />
                      <motion.div 
                        className="w-12 h-2 bg-current rounded opacity-40"
                        animate={currentTheme === theme.id ? { opacity: [0.4, 0.8, 0.4] } : {}}
                        transition={{ duration: 2, repeat: currentTheme === theme.id ? Infinity : 0, delay: 0.3 }}
                      />
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center gap-4 mb-8"
            >
              <motion.button
                onClick={() => {
                  const themes: ('light' | 'dark' | 'auto')[] = ['light', 'dark', 'auto'];
                  const randomTheme = themes[Math.floor(Math.random() * themes.length)];
                  handleThemeChange(randomTheme);
                }}
                className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Random Theme
              </motion.button>
              <motion.button
                onClick={() => handleThemeChange('dark')}
                className="px-4 py-2 bg-gray-500/20 text-gray-300 rounded-lg hover:bg-gray-500/30 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Reset to Dark
              </motion.button>
            </motion.div>

            {/* Demo Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="bg-gray-800/50 rounded-xl p-6 mb-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Live Demo</h3>
              <div className={`p-6 rounded-lg transition-all duration-500 ${
                currentTheme === 'light' 
                  ? 'bg-white text-gray-900 border border-gray-200' 
                  : currentTheme === 'dark'
                  ? 'bg-gray-900 text-white border border-gray-700'
                  : 'bg-gradient-to-r from-white to-gray-900 text-gray-700 border border-gray-400'
              }`}>
                <h4 className="text-lg font-semibold mb-2">Sample Content</h4>
                <p className="mb-4">This content changes appearance based on your theme selection above.</p>
                <div className="flex gap-2">
                  <div className={`px-3 py-1 rounded text-sm ${
                    currentTheme === 'light' ? 'bg-blue-100 text-blue-800' : 'bg-blue-900/50 text-blue-300'
                  }`}>
                    Tag 1
                  </div>
                  <div className={`px-3 py-1 rounded text-sm ${
                    currentTheme === 'light' ? 'bg-green-100 text-green-800' : 'bg-green-900/50 text-green-300'
                  }`}>
                    Tag 2
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Features */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Sparkles className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Smooth Transitions</h4>
                    <p className="text-gray-400 text-sm">Animated theme changes with CSS transitions</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Monitor className="w-4 h-4 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">System Integration</h4>
                    <p className="text-gray-400 text-sm">Respects user&apos;s system preference</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Eye className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Accessibility</h4>
                    <p className="text-gray-400 text-sm">Reduces eye strain and improves readability</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mt-1">
                    <Sun className="w-4 h-4 text-orange-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Persistent State</h4>
                    <p className="text-gray-400 text-sm">Remembers user preference across sessions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Implementation Guide */}
            <div className="bg-gray-800/30 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Implementation</h3>
              <div className="space-y-4">
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">1. CSS Variables</h4>
                  <p className="text-gray-300 text-sm">Use CSS custom properties for colors that change with theme</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">2. Context Provider</h4>
                  <p className="text-gray-300 text-sm">React context to manage theme state across components</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">3. Local Storage</h4>
                  <p className="text-gray-300 text-sm">Persist user preference between sessions</p>
                </div>
                <div className="bg-gray-900/50 rounded-lg p-4">
                  <h4 className="font-medium text-purple-400 mb-2">4. Media Queries</h4>
                  <p className="text-gray-300 text-sm">Detect system preference for auto mode</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              className="fixed bottom-24 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Theme changed to {themes.find(t => t.id === currentTheme)?.name}!</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ThemeTogglePage;
