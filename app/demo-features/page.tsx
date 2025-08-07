"use client"

import { motion } from "framer-motion";
import { 
  Bot, 
  Code, 
  TrendingUp, 
  Brain, 
  Clock,
  ExternalLink,
  Sparkles,
  Zap,
  Eye,
  PlayCircle,
  Palette,
  BarChart3,
  Copy,
  Bell,
  Cloud,
  Music
} from "lucide-react";
import TransitionPage from "@/components/transition-page";
import Link from "next/link";

interface DemoCard {
  title: string;
  description: string;
  features: string[];
  icon: React.ReactNode;
  link: string;
  color: string;
  preview: string;
}

const demoFeatures: DemoCard[] = [
  {
    title: "AI Chat Assistant",
    description: "Interactive AI-powered chat assistant that can answer questions about my skills, experience, and projects with natural conversations.",
    features: [
      "Natural language processing",
      "Pre-trained responses about skills",
      "Real-time conversation",
      "Quick question suggestions"
    ],
    icon: <Bot className="w-8 h-8" />,
    link: "/ai-chat",
    color: "from-purple-500 to-violet-500",
    preview: "Chat with an AI version of me!"
  },
  {
    title: "Code Playground",
    description: "Interactive code editor where visitors can explore my coding skills through live examples and modify code in real-time.",
    features: [
      "Live code editing",
      "Multiple programming languages",
      "Instant execution",
      "Copy & share functionality"
    ],
    icon: <Code className="w-8 h-8" />,
    link: "/code-playground",
    color: "from-blue-500 to-cyan-500",
    preview: "Try my code examples live!"
  },
  {
    title: "Live Statistics",
    description: "Real-time analytics dashboard showing portfolio performance, visitor metrics, and live development activity.",
    features: [
      "Real-time visitor tracking",
      "GitHub activity integration",
      "Performance metrics",
      "Interactive charts"
    ],
    icon: <TrendingUp className="w-8 h-8" />,
    link: "/live-stats",
    color: "from-green-500 to-emerald-500",
    preview: "See live portfolio analytics!"
  },
  {
    title: "Skills Assessment",
    description: "Interactive quiz system where visitors can test their own technical knowledge while learning about my expertise.",
    features: [
      "Timed quiz challenges",
      "Multiple difficulty levels",
      "Instant feedback",
      "Performance scoring"
    ],
    icon: <Brain className="w-8 h-8" />,
    link: "/skills-assessment",
    color: "from-orange-500 to-red-500",
    preview: "Test your tech skills!"
  },
  {
    title: "Interactive Timeline",
    description: "Engaging career timeline with expandable details, filtering options, and smooth animations showing my professional journey.",
    features: [
      "Expandable timeline events",
      "Category filtering",
      "Achievement highlights",
      "Smooth animations"
    ],
    icon: <Clock className="w-8 h-8" />,
    link: "/interactive-timeline",
    color: "from-pink-500 to-rose-500",
    preview: "Explore my career journey!"
  },
  {
    title: "Interactive Games",
    description: "Fun mini-games including Snake, Memory Match, Reaction Test, and Number Guessing to showcase interactive development skills.",
    features: [
      "Snake game with collision detection",
      "Memory matching game",
      "Reaction time testing",
      "Number guessing with difficulty levels"
    ],
    icon: <PlayCircle className="w-8 h-8" />,
    link: "/interactive-games",
    color: "from-indigo-500 to-purple-500",
    preview: "Play and have fun!"
  }
];

const quickWinFeatures: DemoCard[] = [
  {
    title: "Enhanced Loading States",
    description: "Professional skeleton screens and loading animations that keep users engaged while content loads.",
    features: [
      "Skeleton screen components",
      "Progress indicators",
      "Smooth transitions",
      "Responsive design"
    ],
    icon: <Eye className="w-8 h-8" />,
    link: "/loading-states",
    color: "from-gray-500 to-slate-500",
    preview: "Better loading experience!"
  },
  {
    title: "Advanced Animations",
    description: "Showcase of advanced CSS and JavaScript animations using Framer Motion and Lottie for engaging user interactions.",
    features: [
      "Framer Motion integration",
      "CSS keyframe animations",
      "Interactive hover effects",
      "Performance optimized"
    ],
    icon: <Zap className="w-8 h-8" />,
    link: "/advanced-animations",
    color: "from-yellow-500 to-orange-500",
    preview: "Stunning animations!"
  },
  {
    title: "Live Weather Widget",
    description: "Real-time weather integration with beautiful UI components and location-based updates.",
    features: [
      "Current weather display",
      "Location detection",
      "Animated weather icons",
      "Responsive cards"
    ],
    icon: <Cloud className="w-8 h-8" />,
    link: "/live-weather",
    color: "from-blue-500 to-cyan-500",
    preview: "Weather at a glance!"
  },
  {
    title: "Spotify Integration",
    description: "Show what you're currently listening to while coding, with beautiful music player UI and track information.",
    features: [
      "Now playing display",
      "Album artwork",
      "Artist information",
      "Playback controls"
    ],
    icon: <Music className="w-8 h-8" />,
    link: "/spotify-integration",
    color: "from-green-500 to-emerald-500",
    preview: "Coding soundtrack!"
  },
  {
    title: "Theme Toggle System",
    description: "Advanced dark/light mode switching with smooth transitions and system preference detection.",
    features: [
      "Multiple theme options",
      "System preference sync",
      "Smooth transitions",
      "Persistent settings"
    ],
    icon: <Palette className="w-8 h-8" />,
    link: "/theme-toggle",
    color: "from-purple-500 to-indigo-500",
    preview: "Perfect theming!"
  },
  {
    title: "Scroll Progress Indicator",
    description: "Visual reading progress with multiple indicator styles and smooth scroll-to-top functionality.",
    features: [
      "Linear progress bar",
      "Circular percentage",
      "Scroll to top button",
      "Section tracking"
    ],
    icon: <BarChart3 className="w-8 h-8" />,
    link: "/scroll-progress",
    color: "from-teal-500 to-cyan-500",
    preview: "Track your progress!"
  },
  {
    title: "Copy to Clipboard",
    description: "Enhanced copy functionality for contact info, code snippets, and URLs with visual feedback.",
    features: [
      "One-click copying",
      "Visual confirmation",
      "Multiple data types",
      "Error handling"
    ],
    icon: <Copy className="w-8 h-8" />,
    link: "/copy-clipboard",
    color: "from-blue-500 to-purple-500",
    preview: "Copy with ease!"
  },
  {
    title: "Toast Notifications",
    description: "Elegant notification system with multiple types, positions, and interactive features for better UX.",
    features: [
      "Multiple notification types",
      "Custom positioning",
      "Interactive actions",
      "Auto-dismiss options"
    ],
    icon: <Bell className="w-8 h-8" />,
    link: "/toast-notifications",
    color: "from-orange-500 to-red-500",
    preview: "Smart notifications!"
  }
];

const DemoShowcasePage = () => {
  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4">
        <div className="max-w-7xl mx-auto pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary/20 rounded-full text-primary font-medium mb-6"
            >
              <Sparkles className="w-5 h-5" />
              Interactive Portfolio Features
            </motion.div>
            
            <h1 className="text-5xl font-bold gradient-text mb-6">
              Unique Portfolio Experiences
            </h1>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto">
              Explore cutting-edge interactive features that make this portfolio stand out. 
              Each feature demonstrates modern web development capabilities and creative user engagement.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-16 items-stretch">
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group h-full"
              >
                <Link href={feature.link} className="block h-full">
                  <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-8 h-full hover:border-gray-600 transition-all duration-300 cursor-pointer group-hover:scale-105 flex flex-col">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg flex-shrink-0`}>
                        {feature.icon}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {feature.title}
                        </h3>
                        <p className="text-sm text-primary font-medium">
                          {feature.preview}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed flex-shrink-0">
                      {feature.description}
                    </p>

                    {/* Features List - This will grow to fill available space */}
                    <div className="space-y-2 mb-6 flex-grow">
                      {feature.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-400">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA - Always at bottom */}
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700/50">
                      <span className="text-primary font-medium group-hover:text-primary/80 transition-colors">
                        Try it now
                      </span>
                      <ExternalLink className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Wins Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 rounded-full text-green-400 font-medium mb-6"
              >
                <Zap className="w-5 h-5" />
                Quick Wins & UX Enhancements
              </motion.div>
              
              <h2 className="text-4xl font-bold text-white mb-4">
                Essential Portfolio Features
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                These quick wins significantly enhance user experience and make your portfolio more engaging and professional.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
              {quickWinFeatures.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.05 }}
                  className="group h-full"
                >
                  <Link href={feature.link} className="block h-full">
                    <div className="bg-gray-800/40 backdrop-blur-lg rounded-xl border border-gray-700 p-6 h-full hover:border-gray-600 transition-all duration-300 cursor-pointer group-hover:scale-105 group-hover:shadow-xl flex flex-col">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4 flex-shrink-0">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg flex-shrink-0`}>
                          <div className="text-white">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-lg font-bold text-white mb-1">
                            {feature.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed flex-grow">
                        {feature.description}
                      </p>

                      {/* Preview - Always at bottom */}
                      <div className="text-xs text-primary font-medium bg-primary/10 px-3 py-2 rounded-lg mt-auto">
                        {feature.preview}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Tech Stack Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700 p-8"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-4">
                Built with Modern Technologies
              </h2>
              <p className="text-gray-300">
                These features showcase the power of React 19, Next.js, and modern web development
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "React 19", desc: "Latest React features" },
                { name: "Next.js", desc: "Full-stack framework" },
                { name: "TypeScript", desc: "Type-safe development" },
                { name: "Framer Motion", desc: "Smooth animations" },
                { name: "Tailwind CSS", desc: "Utility-first styling" },
                { name: "Lucide Icons", desc: "Beautiful icons" },
                { name: "Real-time APIs", desc: "Live data updates" },
                { name: "Interactive UI", desc: "Engaging experiences" }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + index * 0.05 }}
                  className="text-center p-4 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                >
                  <div className="text-primary font-semibold mb-1">{tech.name}</div>
                  <div className="text-xs text-gray-400">{tech.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to build something amazing together?
            </h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl transition-colors"
              >
                <Zap className="w-5 h-5" />
                Let&apos;s Connect
              </Link>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-xl border border-gray-600 transition-colors"
              >
                <Eye className="w-5 h-5" />
                View My Work
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default DemoShowcasePage;
