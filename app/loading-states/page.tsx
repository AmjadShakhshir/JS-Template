"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, Zap, Eye } from "lucide-react";
import TransitionPage from "@/components/transition-page";
import { 
  PortfolioCardSkeleton, 
  ServiceCardSkeleton, 
  ProfileSkeleton,
  TimelineItemSkeleton,
  FullPageLoader 
} from "@/components/loading-spinner";

const LoadingStatesPage = () => {
  const [loading, setLoading] = useState(false);
  const [showFullLoader, setShowFullLoader] = useState(false);

  const triggerLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  const triggerFullPageLoader = () => {
    setShowFullLoader(true);
    setTimeout(() => setShowFullLoader(false), 2000);
  };

  if (showFullLoader) {
    return <FullPageLoader />;
  }

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4 pb-20">
        <div className="max-w-6xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Enhanced Loading States
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Beautiful skeleton screens and loading animations for better UX
            </p>

            <div className="flex gap-4 justify-center">
              <button
                onClick={triggerLoading}
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Trigger Loading
              </button>
              <button
                onClick={triggerFullPageLoader}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <Zap className="w-4 h-4" />
                Full Page Loader
              </button>
            </div>
          </motion.div>

          {/* Portfolio Cards Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Portfolio Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <PortfolioCardSkeleton key={index} />
                ))
              ) : (
                Array.from({ length: 3 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6"
                  >
                    <div className="w-full h-48 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                      <Eye className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      Project {index + 1}
                    </h3>
                    <p className="text-gray-300 mb-4">
                      This is a sample project description showing how content loads after the skeleton animation.
                    </p>
                    <div className="flex gap-2 mb-4">
                      <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">React</span>
                      <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">TypeScript</span>
                      <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">Node.js</span>
                    </div>
                    <div className="flex gap-3">
                      <button className="px-4 py-2 bg-primary hover:bg-primary/80 text-white rounded transition-colors">
                        View Live
                      </button>
                      <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors">
                        GitHub
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Service Cards Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Service Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {loading ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <ServiceCardSkeleton key={index} />
                ))
              ) : (
                Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-lg mb-4 flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Service {index + 1}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      Professional service description with details about capabilities and offerings.
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Profile Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Profile Cards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {loading ? (
                Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
                    <ProfileSkeleton />
                  </div>
                ))
              ) : (
                Array.from({ length: 2 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-primary to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">A{index + 1}</span>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Amjad Shakhshir</h3>
                        <p className="text-gray-400">Full Stack Developer</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Timeline Section */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6">Timeline Items</h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500"></div>
              <div className="space-y-8">
                {loading ? (
                  Array.from({ length: 3 }).map((_, index) => (
                    <TimelineItemSkeleton key={index} />
                  ))
                ) : (
                  Array.from({ length: 3 }).map((_, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-20"
                    >
                      <div className="absolute left-6 w-5 h-5 rounded-full bg-gradient-to-r from-primary to-purple-500 border-4 border-gray-900"></div>
                      <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-r from-primary to-purple-500 rounded-lg">
                              <Zap className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">Timeline Event {index + 1}</h3>
                              <p className="text-primary font-medium">Company Name</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">2024 - Present</div>
                            <div className="text-xs text-gray-500">Remote</div>
                          </div>
                        </div>
                        <p className="text-gray-300 mb-4">
                          This is a sample timeline event showing how content appears after loading.
                        </p>
                        <div className="flex gap-2">
                          <span className="px-2 py-1 bg-primary/20 text-primary rounded text-xs">React</span>
                          <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs">Node.js</span>
                          <span className="px-2 py-1 bg-green-500/20 text-green-300 rounded text-xs">AWS</span>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LoadingStatesPage;
