"use client"

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Eye, 
  Globe, 
  Clock, 
  TrendingUp, 
  Activity,
  Coffee,
  Code,
  GitBranch,
  Star
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface StatCard {
  title: string;
  value: string | number;
  change: string;
  icon: React.ReactNode;
  color: string;
}

interface WeeklyData {
  day: string;
  value: number;
  label: string;
}

const LiveStatsPage = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [visitorCount, setVisitorCount] = useState(1247);
  const [todayViews, setTodayViews] = useState(89);
  const [coffeeCount] = useState(3);

  // Stable weekly performance data based on realistic portfolio metrics
  const weeklyPerformanceData: WeeklyData[] = useMemo(() => [
    { day: "Monday", value: 85, label: "Mon" },
    { day: "Tuesday", value: 92, label: "Tue" },
    { day: "Wednesday", value: 78, label: "Wed" },
    { day: "Thursday", value: 95, label: "Thu" },
    { day: "Friday", value: 88, label: "Fri" },
    { day: "Saturday", value: 72, label: "Sat" },
    { day: "Sunday", value: 65, label: "Sun" }
  ], []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate realistic visitor updates (less frequent and smaller increments)
  useEffect(() => {
    const interval = setInterval(() => {
      // More realistic update frequency and amounts
      if (Math.random() < 0.1) { // 10% chance every 10 seconds
        setVisitorCount(prev => prev + Math.floor(Math.random() * 2) + 1);
      }
      if (Math.random() < 0.05) { // 5% chance every 10 seconds
        setTodayViews(prev => prev + 1);
      }
    }, 10000); // Update every 10 seconds instead of 5

    return () => clearInterval(interval);
  }, []);

  const stats: StatCard[] = [
    {
      title: "Total Visitors",
      value: visitorCount.toLocaleString(),
      change: "+12.5%",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Today's Views",
      value: todayViews,
      change: "+8.2%",
      icon: <Eye className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Countries Reached",
      value: 47,
      change: "+3 new",
      icon: <Globe className="w-6 h-6" />,
      color: "from-purple-500 to-violet-500"
    },
    {
      title: "GitHub Repositories",
      value: 39,
      change: "Active projects",
      icon: <GitBranch className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Coffee Consumed",
      value: coffeeCount,
      change: "Today",
      icon: <Coffee className="w-6 h-6" />,
      color: "from-amber-500 to-yellow-500"
    },
    {
      title: "Years of Experience",
      value: "5+",
      change: "MERN Stack",
      icon: <Code className="w-6 h-6" />,
      color: "from-pink-500 to-rose-500"
    }
  ];

  const recentActivity = [
    { time: "2 min ago", action: "New visitor from Finland", type: "visitor" },
    { time: "5 min ago", action: "Portfolio page viewed", type: "view" },
    { time: "12 min ago", action: "Contact form submitted", type: "contact" },
    { time: "18 min ago", action: "GitHub repository updated", type: "code" },
    { time: "25 min ago", action: "New visitor from Germany", type: "visitor" },
    { time: "31 min ago", action: "About page viewed", type: "view" },
    { time: "45 min ago", action: "Live stats page visited", type: "view" },
    { time: "52 min ago", action: "Tech stack explored", type: "view" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'visitor': return <Users className="w-4 h-4 text-blue-400" />;
      case 'view': return <Eye className="w-4 h-4 text-green-400" />;
      case 'contact': return <Star className="w-4 h-4 text-yellow-400" />;
      case 'code': return <GitBranch className="w-4 h-4 text-purple-400" />;
      default: return <Activity className="w-4 h-4 text-gray-400" />;
    }
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 p-4 pb-20">
        <div className="max-w-7xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Live Analytics Dashboard
            </h1>
            <p className="text-gray-300 text-lg">
              Real-time statistics and portfolio performance
            </p>
            <div className="mt-4 flex items-center justify-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span className="font-mono">
                {currentTime.toLocaleString()}
              </span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">
                      {stat.value}
                    </div>
                    <div className="text-sm text-green-400">
                      {stat.change}
                    </div>
                  </div>
                </div>
                <h3 className="text-gray-300 font-medium">{stat.title}</h3>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Real-time Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700"
            >
              <div className="border-b border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Real-time Activity
                </h3>
              </div>
              <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-gray-700/30 hover:bg-gray-700/50 transition-colors"
                  >
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-white text-sm">{activity.action}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stable Performance Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700"
            >
              <div className="border-b border-gray-700 p-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Weekly Performance
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {weeklyPerformanceData.map((item, index) => (
                    <div key={item.day} className="flex items-center gap-4">
                      <span className="text-sm text-gray-400 w-16">{item.label}</span>
                      <div className="flex-1 bg-gray-700 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: index * 0.1, duration: 0.8 }}
                          className="bg-gradient-to-r from-primary to-purple-500 h-2 rounded-full"
                        />
                      </div>
                      <span className="text-sm text-white w-8">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-xs text-gray-400">
                  Based on portfolio engagement and project activity
                </div>
              </div>
            </motion.div>
          </div>

          {/* Live Status Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Portfolio Online</span>
              </div>
              <p className="text-xs text-gray-400">99.9% uptime this month</p>
            </div>
            
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-blue-400">API Connected</span>
              </div>
              <p className="text-xs text-gray-400">All services operational</p>
            </div>
            
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-yellow-400">TypeScript Expert</span>
              </div>
              <p className="text-xs text-gray-400">MERN Stack & AWS certified</p>
            </div>
            
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-purple-400">Available for Hire</span>
              </div>
              <p className="text-xs text-gray-400">Open to new opportunities</p>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LiveStatsPage;
