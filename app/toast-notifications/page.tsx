"use client"

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  X, 
  Zap,
  Sparkles,
  Heart,
  Star,
  MessageCircle
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

const ToastNotificationsPage = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [position, setPosition] = useState<ToastPosition>('top-right');
  const [autoClose, setAutoClose] = useState(true);

  const toastConfigs = {
    success: {
      icon: <CheckCircle className="w-5 h-5" />,
      bgColor: 'bg-green-500',
      borderColor: 'border-green-400',
      textColor: 'text-white'
    },
    error: {
      icon: <XCircle className="w-5 h-5" />,
      bgColor: 'bg-red-500',
      borderColor: 'border-red-400',
      textColor: 'text-white'
    },
    warning: {
      icon: <AlertCircle className="w-5 h-5" />,
      bgColor: 'bg-yellow-500',
      borderColor: 'border-yellow-400',
      textColor: 'text-white'
    },
    info: {
      icon: <Info className="w-5 h-5" />,
      bgColor: 'bg-blue-500',
      borderColor: 'border-blue-400',
      textColor: 'text-white'
    }
  };

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    if (autoClose && toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 5000);
    }
  }, [autoClose]);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const positionClasses = {
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-center': 'top-6 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-6 left-1/2 transform -translate-x-1/2'
  };

  const sampleToasts = [
    {
      type: 'success' as const,
      title: 'Project Deployed',
      message: 'Your portfolio has been successfully deployed to production.',
      duration: 5000
    },
    {
      type: 'error' as const,
      title: 'Build Failed',
      message: 'There was an error compiling your project. Check the console for details.',
      duration: 7000
    },
    {
      type: 'warning' as const,
      title: 'API Rate Limit',
      message: 'You\'re approaching your API rate limit. Consider upgrading your plan.',
      duration: 6000
    },
    {
      type: 'info' as const,
      title: 'New Feature Available',
      message: 'Dark mode is now available in your settings panel.',
      duration: 4000
    }
  ];

  const interactiveToasts = [
    {
      type: 'success' as const,
      title: 'Message Sent',
      message: 'Your message has been delivered successfully.',
      action: {
        label: 'View',
        onClick: () => console.log('Viewing message')
      }
    },
    {
      type: 'info' as const,
      title: 'Update Available',
      message: 'A new version of the app is ready to install.',
      action: {
        label: 'Install',
        onClick: () => console.log('Installing update')
      },
      duration: 0 // Persistent until manually closed
    }
  ];

  return (
    <>
      <TransitionPage />
            <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Toast Notifications Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Elegant, customizable notification system with multiple types, positions, and interactive features
            </p>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800/50 rounded-xl p-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Toast Controls</h2>
            
            {/* Position Settings */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Position</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {Object.keys(positionClasses).map((pos) => (
                  <button
                    key={pos}
                    onClick={() => setPosition(pos as ToastPosition)}
                    className={`p-3 rounded-lg border transition-all duration-300 ${
                      position === pos
                        ? 'border-purple-500 bg-purple-500/20 text-white'
                        : 'border-gray-600 bg-gray-700/50 text-gray-300 hover:border-gray-500'
                    }`}
                  >
                    {pos.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Auto Close Toggle */}
            <div className="mb-6">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={autoClose}
                  onChange={(e) => setAutoClose(e.target.checked)}
                  className="w-4 h-4 text-purple-500 bg-gray-700 border-gray-600 rounded focus:ring-purple-500"
                />
                <span className="text-white">Auto-close notifications</span>
              </label>
            </div>

            {/* Basic Toasts */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Basic Notifications</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sampleToasts.map((toast, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToast(toast)}
                    className={`p-4 rounded-lg ${toastConfigs[toast.type].bgColor} text-white font-medium transition-all duration-300 hover:shadow-lg`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {toastConfigs[toast.type].icon}
                      <span className="capitalize">{toast.type}</span>
                    </div>
                    <div className="text-sm opacity-90">{toast.title}</div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Interactive Toasts */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Interactive Notifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {interactiveToasts.map((toast, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => addToast(toast)}
                    className={`p-4 rounded-lg ${toastConfigs[toast.type].bgColor} text-white font-medium transition-all duration-300 hover:shadow-lg text-left`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {toastConfigs[toast.type].icon}
                      <span>{toast.title}</span>
                    </div>
                    <div className="text-sm opacity-90 mb-2">{toast.message}</div>
                    <div className="text-xs bg-white/20 rounded px-2 py-1 inline-block">
                      Action: {toast.action?.label}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Bulk Actions */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Bulk Actions</h3>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    sampleToasts.forEach((toast, index) => {
                      setTimeout(() => addToast(toast), index * 500);
                    });
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium transition-all duration-300 hover:shadow-lg"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Show All Types
                  </div>
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={clearAllToasts}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg font-medium transition-all duration-300 hover:bg-gray-700"
                >
                  Clear All
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Smooth Animations</h3>
                <p className="text-gray-400 text-sm">Powered by Framer Motion for fluid entrance and exit animations</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Interactive Actions</h3>
                <p className="text-gray-400 text-sm">Add custom buttons and actions to notifications</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Multiple Positions</h3>
                <p className="text-gray-400 text-sm">6 different positioning options to fit your design</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Auto-dismiss</h3>
                <p className="text-gray-400 text-sm">Configurable auto-close timing with manual override</p>
              </div>
            </div>
          </motion.div>

          {/* Implementation Example */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-gray-800/50 rounded-xl p-6 mb-12"
          >
            <h3 className="text-xl font-semibold text-white mb-4">Usage Example</h3>
            <div className="bg-gray-900/50 rounded-lg p-4">
              <pre className="text-sm text-gray-300 overflow-x-auto">
                <code>{`// Basic usage
addToast({
  type: 'success',
  title: 'Success!',
  message: 'Your action was completed successfully.',
  duration: 5000
});

// With custom action
addToast({
  type: 'info',
  title: 'New Message',
  message: 'You have a new message from John.',
  action: {
    label: 'View',
    onClick: () => navigate('/messages')
  },
  duration: 0 // Persistent
});`}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Container */}
      <div className={`fixed ${positionClasses[position]} z-50 max-w-sm w-full space-y-3`}>
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ 
                opacity: 0, 
                x: position.includes('right') ? 300 : position.includes('left') ? -300 : 0,
                y: position.includes('top') ? -50 : 50,
                scale: 0.8
              }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              exit={{ 
                opacity: 0, 
                x: position.includes('right') ? 300 : position.includes('left') ? -300 : 0,
                scale: 0.8
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`${toastConfigs[toast.type].bgColor} ${toastConfigs[toast.type].textColor} rounded-lg shadow-lg p-4 border-l-4 ${toastConfigs[toast.type].borderColor} max-w-sm`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  {toastConfigs[toast.type].icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm">{toast.title}</h4>
                  <p className="text-sm opacity-90 mt-1">{toast.message}</p>
                  {toast.action && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toast.action.onClick}
                      className="mt-2 text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded transition-colors"
                    >
                      {toast.action.label}
                    </motion.button>
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ToastNotificationsPage;
