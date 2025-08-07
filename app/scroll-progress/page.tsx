"use client"

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, BarChart3, Eye, Zap, Target, TrendingUp } from "lucide-react";
import TransitionPage from "@/components/transition-page";

const ScrollProgressPage = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const updateScrollTop = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', updateScrollTop);
    return () => window.removeEventListener('scroll', updateScrollTop);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sample content sections for demonstration
  const sections = [
    {
      id: 'introduction',
      title: 'Scroll Progress Indicators',
      content: 'Enhance user experience with visual feedback showing reading progress through long content. This feature helps users understand how much content remains and provides a sense of accomplishment as they progress.',
      icon: <BarChart3 className="w-8 h-8" />
    },
    {
      id: 'benefits',
      title: 'User Experience Benefits',
      content: 'Progress indicators reduce anxiety about long content, provide clear navigation feedback, improve engagement rates, and give users control over their reading experience. They\'re especially valuable for blog posts, documentation, and portfolio content.',
      icon: <Eye className="w-8 h-8" />
    },
    {
      id: 'implementation',
      title: 'Implementation Techniques',
      content: 'Built using Framer Motion\'s useScroll hook for smooth animations, with spring physics for natural movement. The progress bar updates in real-time based on scroll position and can be styled to match your brand colors.',
      icon: <Zap className="w-8 h-8" />
    },
    {
      id: 'features',
      title: 'Advanced Features',
      content: 'Includes smooth scrolling back to top, percentage indicators, section-based progress tracking, and responsive design. The component can be customized with different shapes, positions, and animation styles.',
      icon: <Target className="w-8 h-8" />
    },
    {
      id: 'analytics',
      title: 'Analytics Integration',
      content: 'Track user engagement with scroll depth analytics, measure content effectiveness, identify drop-off points, and optimize content layout based on user behavior patterns. This data helps improve content strategy.',
      icon: <TrendingUp className="w-8 h-8" />
    }
  ];

  return (
    <>
      <TransitionPage />
      
      {/* Fixed Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 transform-origin-0 z-50"
        style={{ scaleX }}
      />
      
      {/* Circular Progress Indicator */}
      <div className="fixed top-6 right-6 z-40">
        <div className="relative w-16 h-16">
          <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            <motion.path
              d="M18 2.0845a 15.9155 15.9155 0 0 1 0 31.831a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{
                pathLength: scrollYProgress
              }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#EC4899" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="text-xs font-bold text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(scrollYProgress.get() * 100)}%
            </motion.span>
          </div>
        </div>
      </div>

      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Content Sections */}
          <div className="space-y-20">
            {sections.map((section, index) => (
              <motion.section
                key={section.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="bg-gray-800/50 rounded-2xl p-8"
              >
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-purple-400">
                      {section.icon}
                    </div>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                      {section.title}
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {section.content}
                    </p>
                    
                    {/* Additional content for demonstration */}
                    <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">Feature Highlight</h4>
                        <p className="text-gray-400 text-sm">
                          This section demonstrates how content can be organized with visual progress tracking.
                        </p>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-4">
                        <h4 className="font-semibold text-white mb-2">Implementation</h4>
                        <p className="text-gray-400 text-sm">
                          Built with React hooks and Framer Motion for smooth, performant animations.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.section>
            ))}
          </div>

          {/* Demo Features */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-20 mb-20"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              Progress Indicator Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Linear Progress</h3>
                <p className="text-gray-400 text-sm">Top bar showing overall page progress</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-pink-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Circular Progress</h3>
                <p className="text-gray-400 text-sm">Floating indicator with percentage</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ArrowUp className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Scroll to Top</h3>
                <p className="text-gray-400 text-sm">Quick navigation back to beginning</p>
              </div>
            </div>
          </motion.div>

          {/* More content to enable scrolling */}
          <div className="space-y-8 mb-20">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="bg-gray-800/30 rounded-xl p-8">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Additional Content Section {item}
                </h3>
                <p className="text-gray-300 mb-4">
                  This is additional content to demonstrate the scroll progress functionality. 
                  As you scroll through this page, you can see the progress indicators updating 
                  in real-time at the top and in the floating circular indicator.
                </p>
                <p className="text-gray-400">
                  The scroll progress feature enhances user experience by providing visual 
                  feedback about their position in the content. This is particularly useful 
                  for long-form content like blog posts, documentation, or portfolio pieces.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: showScrollTop ? 1 : 0, 
          scale: showScrollTop ? 1 : 0 
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-40"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUp className="w-5 h-5 text-white" />
      </motion.button>
    </>
  );
};

export default ScrollProgressPage;
