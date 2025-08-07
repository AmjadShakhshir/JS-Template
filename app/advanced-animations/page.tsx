"use client"

import { motion } from "framer-motion";
import { useState } from "react";
import { Play, Pause, RotateCcw, Download } from "lucide-react";
import TransitionPage from "@/components/transition-page";

// Create simple JSON animations (since we can't use external Lottie files in this demo)
const createCodingAnimation = () => ({
  "v": "5.5.7",
  "fr": 24,
  "ip": 0,
  "op": 120,
  "w": 400,
  "h": 400,
  "nm": "Coding Animation",
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Code Lines",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 0, "k": 0},
        "p": {"a": 0, "k": [200, 200, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {"a": 0, "k": [100, 100, 100]}
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "rc",
          "d": 1,
          "s": {"a": 0, "k": [300, 20]},
          "p": {"a": 0, "k": [0, 0]},
          "r": {"a": 0, "k": 5}
        }
      ],
      "ip": 0,
      "op": 120,
      "st": 0
    }
  ]
});

// CSS-based animations as Lottie alternatives
const CSSLottieAlternative = ({ type, isPlaying }: { type: string; isPlaying: boolean }) => {
  const getAnimation = () => {
    switch (type) {
      case 'coding':
        return (
          <div className="w-64 h-64 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-4">
              {/* Code lines animation */}
              {Array.from({ length: 8 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="h-2 bg-gradient-to-r from-primary to-purple-500 rounded mb-2"
                  style={{ 
                    width: `${60 + Math.random() * 40}%`,
                    opacity: 0.7 
                  }}
                  animate={isPlaying ? {
                    opacity: [0.3, 1, 0.3],
                    scale: [1, 1.02, 1]
                  } : {}}
                  transition={{
                    duration: 2,
                    repeat: isPlaying ? Infinity : 0,
                    delay: i * 0.2
                  }}
                />
              ))}
              
              {/* Typing cursor */}
              <motion.div
                className="w-1 h-4 bg-primary absolute"
                style={{ top: `${8 * 12}px`, left: '60%' }}
                animate={isPlaying ? {
                  opacity: [1, 0, 1]
                } : {}}
                transition={{
                  duration: 1,
                  repeat: isPlaying ? Infinity : 0
                }}
              />
            </div>
          </div>
        );
      
      case 'rocket':
        return (
          <div className="w-64 h-64 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center relative overflow-hidden">
            <motion.div
              className="text-6xl"
              animate={isPlaying ? {
                y: [-20, -40, -20],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0
              }}
            >
              🚀
            </motion.div>
            
            {/* Particle trail */}
            {Array.from({ length: 5 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-orange-400 rounded-full"
                style={{
                  bottom: '30%',
                  left: '48%'
                }}
                animate={isPlaying ? {
                  y: [0, 60],
                  opacity: [1, 0],
                  scale: [1, 0.5]
                } : {}}
                transition={{
                  duration: 1,
                  repeat: isPlaying ? Infinity : 0,
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        );
      
      case 'success':
        return (
          <div className="w-64 h-64 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center relative">
            <motion.div
              className="w-24 h-24 border-4 border-green-400 rounded-full flex items-center justify-center"
              animate={isPlaying ? {
                scale: [0, 1.2, 1],
                borderColor: ["#22c55e", "#16a34a", "#22c55e"]
              } : {}}
              transition={{
                duration: 1.5,
                repeat: isPlaying ? Infinity : 0
              }}
            >
              <motion.div
                className="text-green-400 text-2xl"
                animate={isPlaying ? {
                  scale: [0, 1.1, 1],
                  opacity: [0, 1, 1]
                } : {}}
                transition={{
                  duration: 1,
                  delay: 0.5,
                  repeat: isPlaying ? Infinity : 0
                }}
              >
                ✓
              </motion.div>
            </motion.div>
          </div>
        );
      
      case 'loading':
        return (
          <div className="w-64 h-64 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full"
              animate={isPlaying ? { rotate: 360 } : {}}
              transition={{
                duration: 1,
                repeat: isPlaying ? Infinity : 0,
                ease: "linear"
              }}
            />
          </div>
        );
      
      case 'pulse':
        return (
          <div className="w-64 h-64 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center">
            <motion.div
              className="w-24 h-24 bg-gradient-to-r from-primary to-purple-500 rounded-full"
              animate={isPlaying ? {
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1]
              } : {}}
              transition={{
                duration: 2,
                repeat: isPlaying ? Infinity : 0
              }}
            />
          </div>
        );
      
      default:
        return (
          <div className="w-64 h-64 bg-gray-800/50 rounded-xl border border-gray-700 flex items-center justify-center">
            <span className="text-gray-400">Animation Preview</span>
          </div>
        );
    }
  };

  return getAnimation();
};

const AdvancedAnimationsPage = () => {
  const [playingAnimations, setPlayingAnimations] = useState<{ [key: string]: boolean }>({});

  const animations = [
    { id: 'coding', title: 'Coding Animation', description: 'Animated code lines with typing effect' },
    { id: 'rocket', title: 'Rocket Launch', description: 'Success and achievement animation' },
    { id: 'success', title: 'Success Check', description: 'Completion and validation animation' },
    { id: 'loading', title: 'Loading Spinner', description: 'Smooth loading indicator' },
    { id: 'pulse', title: 'Pulse Effect', description: 'Attention-grabbing pulse animation' }
  ];

  const toggleAnimation = (id: string) => {
    setPlayingAnimations(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetAnimation = (id: string) => {
    setPlayingAnimations(prev => ({
      ...prev,
      [id]: false
    }));
    setTimeout(() => {
      setPlayingAnimations(prev => ({
        ...prev,
        [id]: true
      }));
    }, 100);
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 p-4 pb-20">
        <div className="max-w-6xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Advanced Animations
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Beautiful, complex animations that enhance user experience
            </p>
          </motion.div>

          {/* Animation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {animations.map((animation, index) => (
              <motion.div
                key={animation.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700 p-6"
              >
                <div className="flex flex-col items-center">
                  <CSSLottieAlternative 
                    type={animation.id} 
                    isPlaying={playingAnimations[animation.id] || false} 
                  />
                  
                  <div className="mt-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">
                      {animation.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">
                      {animation.description}
                    </p>
                    
                    <div className="flex gap-2 justify-center">
                      <button
                        onClick={() => toggleAnimation(animation.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                          playingAnimations[animation.id]
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-green-600 hover:bg-green-700'
                        } text-white`}
                      >
                        {playingAnimations[animation.id] ? (
                          <>
                            <Pause className="w-4 h-4" />
                            Pause
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            Play
                          </>
                        )}
                      </button>
                      
                      <button
                        onClick={() => resetAnimation(animation.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Reset
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Demo Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700 p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Real-world Implementation Examples
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Button Animations */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Interactive Buttons</h3>
                <div className="space-y-4">
                  <motion.button
                    className="w-full px-6 py-3 bg-primary text-white rounded-lg font-medium"
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(139, 92, 246, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Hover & Click Me
                  </motion.button>
                  
                  <motion.button
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium"
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: '200% 200%'
                    }}
                  >
                    Animated Background
                  </motion.button>
                </div>
              </div>

              {/* Card Animations */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Card Interactions</h3>
                <motion.div
                  className="bg-gray-700/50 p-6 rounded-lg border border-gray-600"
                  whileHover={{ 
                    y: -10,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    borderColor: "#8b5cf6"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <h4 className="text-white font-semibold mb-2">Interactive Card</h4>
                  <p className="text-gray-300 text-sm">
                    This card animates on hover with smooth transitions
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Implementation Guide */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-8 bg-gray-800/20 rounded-xl border border-gray-700 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Download className="w-5 h-5" />
              Implementation Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-white mb-1">Performance</h4>
                <p className="text-sm text-gray-400">Optimized animations that don't impact performance</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-white mb-1">User Engagement</h4>
                <p className="text-sm text-gray-400">Increased user interaction and time on site</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="font-semibold text-white mb-1">Modern Feel</h4>
                <p className="text-sm text-gray-400">Professional, contemporary user experience</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdvancedAnimationsPage;
