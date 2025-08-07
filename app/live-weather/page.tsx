"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  CloudSnow, 
  MapPin, 
  Thermometer,
  Wind,
  Eye,
  Droplets,
  Clock,
  RefreshCw
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  uvIndex: number;
  timestamp: string;
}

// Mock weather data (in a real app, this would come from an API like OpenWeatherMap)
const generateMockWeatherData = (useRealTime = false): WeatherData => {
  const conditions = ['sunny', 'cloudy', 'rainy', 'snowy', 'partly-cloudy'];
  const locations = ['New York, NY', 'London, UK', 'Tokyo, Japan', 'Sydney, Australia', 'San Francisco, CA'];
  
  return {
    location: locations[Math.floor(Math.random() * locations.length)],
    temperature: Math.floor(Math.random() * 35) + 5, // 5-40°C
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
    windSpeed: Math.floor(Math.random() * 20) + 5, // 5-25 km/h
    visibility: Math.floor(Math.random() * 5) + 10, // 10-15 km
    pressure: Math.floor(Math.random() * 50) + 1000, // 1000-1050 hPa
    uvIndex: Math.floor(Math.random() * 10) + 1, // 1-10
    timestamp: useRealTime ? new Date().toLocaleTimeString() : '--:--:--'
  };
};

const getWeatherIcon = (condition: string, size = 'w-8 h-8') => {
  switch (condition) {
    case 'sunny':
      return <Sun className={`${size} text-yellow-400`} />;
    case 'cloudy':
      return <Cloud className={`${size} text-gray-400`} />;
    case 'rainy':
      return <CloudRain className={`${size} text-blue-400`} />;
    case 'snowy':
      return <CloudSnow className={`${size} text-blue-200`} />;
    case 'partly-cloudy':
      return <Cloud className={`${size} text-gray-300`} />;
    default:
      return <Sun className={`${size} text-yellow-400`} />;
  }
};

const getWeatherGradient = (condition: string) => {
  switch (condition) {
    case 'sunny':
      return 'from-yellow-400 via-orange-500 to-red-500';
    case 'cloudy':
      return 'from-gray-400 via-gray-500 to-gray-600';
    case 'rainy':
      return 'from-blue-400 via-blue-600 to-blue-800';
    case 'snowy':
      return 'from-blue-100 via-blue-300 to-blue-500';
    case 'partly-cloudy':
      return 'from-yellow-300 via-gray-400 to-gray-600';
    default:
      return 'from-blue-400 via-purple-500 to-purple-600';
  }
};

const LiveWeatherPage = () => {
  const [weatherData, setWeatherData] = useState<WeatherData>(generateMockWeatherData(false));
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Initialize client-side data
  useEffect(() => {
    setIsClient(true);
    setCurrentTime(new Date());
    setWeatherData(generateMockWeatherData(true));
  }, []);

  // Update time every second
  useEffect(() => {
    if (!isClient) return;
    
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [isClient]);

  // Auto-refresh weather data every 30 seconds
  useEffect(() => {
    if (!isClient) return;
    
    const interval = setInterval(() => {
      setWeatherData(generateMockWeatherData(true));
    }, 30000);

    return () => clearInterval(interval);
  }, [isClient]);

  const refreshWeather = () => {
    setIsLoading(true);
    setTimeout(() => {
      setWeatherData(generateMockWeatherData(true));
      setIsLoading(false);
    }, 1000);
  };

  const getTemperatureColor = (temp: number) => {
    if (temp < 0) return 'text-blue-300';
    if (temp < 10) return 'text-blue-200';
    if (temp < 20) return 'text-green-300';
    if (temp < 30) return 'text-yellow-300';
    return 'text-red-300';
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4 pb-20">
        <div className="max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Live Weather Integration
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Real-time weather data enhancing user experience
            </p>
            
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
              <Clock className="w-4 h-4" />
              <span className="font-mono">
                {currentTime ? currentTime.toLocaleString() : 'Loading...'}
              </span>
            </div>
          </motion.div>

          {/* Main Weather Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`bg-gradient-to-r ${getWeatherGradient(weatherData.condition)} p-1 rounded-2xl mb-8`}
          >
            <div className="bg-gray-900/80 backdrop-blur-lg rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <motion.div
                    animate={isLoading ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: isLoading ? Infinity : 0 }}
                  >
                    {getWeatherIcon(weatherData.condition, 'w-16 h-16')}
                  </motion.div>
                  <div>
                    <h2 className={`text-4xl font-bold ${getTemperatureColor(weatherData.temperature)}`}>
                      {weatherData.temperature}°C
                    </h2>
                    <p className="text-xl text-white capitalize">
                      {weatherData.condition.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center gap-2 text-gray-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{weatherData.location}</span>
                  </div>
                  <button
                    onClick={refreshWeather}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                </div>
              </div>

              <div className="text-sm text-gray-300">
                Last updated: {weatherData.timestamp}
              </div>
            </div>
          </motion.div>

          {/* Weather Details Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <Droplets className="w-6 h-6" />, label: 'Humidity', value: `${weatherData.humidity}%`, color: 'text-blue-400' },
              { icon: <Wind className="w-6 h-6" />, label: 'Wind Speed', value: `${weatherData.windSpeed} km/h`, color: 'text-gray-400' },
              { icon: <Eye className="w-6 h-6" />, label: 'Visibility', value: `${weatherData.visibility} km`, color: 'text-green-400' },
              { icon: <Thermometer className="w-6 h-6" />, label: 'Pressure', value: `${weatherData.pressure} hPa`, color: 'text-purple-400' }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-4"
              >
                <div className={`${item.color} mb-2`}>
                  {item.icon}
                </div>
                <div className="text-white font-semibold">{item.value}</div>
                <div className="text-gray-400 text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Weather Animation Demo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gray-800/30 backdrop-blur-lg rounded-xl border border-gray-700 p-8 mb-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Weather Animations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Rain Animation */}
              <div className="bg-gray-700/30 rounded-lg p-6 relative overflow-hidden h-32">
                <h4 className="text-white font-medium mb-2">Rain Effect</h4>
                {weatherData.condition === 'rainy' && (
                  <div className="absolute inset-0">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: '-10px'
                        }}
                        animate={{
                          y: [0, 140],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: Math.random() * 2
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Snow Animation */}
              <div className="bg-gray-700/30 rounded-lg p-6 relative overflow-hidden h-32">
                <h4 className="text-white font-medium mb-2">Snow Effect</h4>
                {weatherData.condition === 'snowy' && (
                  <div className="absolute inset-0">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white rounded-full opacity-80"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: '-10px'
                        }}
                        animate={{
                          y: [0, 140],
                          x: [0, Math.random() * 20 - 10],
                          opacity: [0, 1, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          delay: Math.random() * 3
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Sun Rays Animation */}
              <div className="bg-gray-700/30 rounded-lg p-6 relative overflow-hidden h-32">
                <h4 className="text-white font-medium mb-2">Sun Effect</h4>
                {weatherData.condition === 'sunny' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="w-12 h-12 bg-yellow-400 rounded-full relative"
                      animate={{
                        boxShadow: [
                          '0 0 20px #fbbf24',
                          '0 0 40px #fbbf24',
                          '0 0 20px #fbbf24'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-6 bg-yellow-400"
                          style={{
                            top: '-12px',
                            left: '50%',
                            transformOrigin: '50% 24px',
                            transform: `rotate(${i * 45}deg) translateX(-50%)`
                          }}
                          animate={{
                            opacity: [0.5, 1, 0.5]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.1
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Implementation Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gray-800/20 rounded-xl border border-gray-700 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Why Live Weather Integration?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🌍</div>
                <h4 className="font-semibold text-white mb-1">Global Connection</h4>
                <p className="text-sm text-gray-400">Connect with visitors worldwide through shared weather experiences</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="font-semibold text-white mb-1">Real-time Data</h4>
                <p className="text-sm text-gray-400">Dynamic content that updates automatically</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎨</div>
                <h4 className="font-semibold text-white mb-1">Visual Appeal</h4>
                <p className="text-sm text-gray-400">Beautiful weather animations and effects</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default LiveWeatherPage;
