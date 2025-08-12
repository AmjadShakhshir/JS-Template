"use client"

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Music, 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward,
  Volume2,
  Heart,
  Shuffle,
  Repeat,
  ExternalLink,
  Headphones
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  albumArt: string;
  isPlaying: boolean;
  currentTime: number;
  genre: string;
  releaseYear: number;
}

// Mock Spotify data (in real implementation, this would come from Spotify API)
const mockTracks: Track[] = [
  {
    id: "1",
    title: "Code in the Dark",
    artist: "Dev Beats",
    album: "Programming Sessions",
    duration: 180,
    albumArt: "🎵",
    isPlaying: false,
    currentTime: 0,
    genre: "Electronic",
    releaseYear: 2024
  },
  {
    id: "2", 
    title: "React Symphony",
    artist: "Frontend Orchestra",
    album: "Component Classics",
    duration: 240,
    albumArt: "🎼",
    isPlaying: false,
    currentTime: 0,
    genre: "Ambient",
    releaseYear: 2023
  },
  {
    id: "3",
    title: "Async Dreams",
    artist: "JavaScript Jazz",
    album: "Promise Land",
    duration: 195,
    albumArt: "🎧",
    isPlaying: false,
    currentTime: 0,
    genre: "Lo-fi",
    releaseYear: 2024
  },
  {
    id: "4",
    title: "TypeScript Blues",
    artist: "Static Analysis",
    album: "Type Safety",
    duration: 210,
    albumArt: "🎶",
    isPlaying: false,
    currentTime: 0,
    genre: "Blues",
    releaseYear: 2023
  }
];

const SpotifyIntegrationPage = () => {
  const [currentTrack, setCurrentTrack] = useState<Track>(mockTracks[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [volume, setVolume] = useState(75);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'track' | 'playlist'>('off');

  // Simulate playback progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentTrack.duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTrack.duration]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockTracks.length;
    setCurrentTrack(mockTracks[nextIndex]);
    setCurrentTime(0);
  };

  const prevTrack = () => {
    const currentIndex = mockTracks.findIndex(track => track.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? mockTracks.length - 1 : currentIndex - 1;
    setCurrentTrack(mockTracks[prevIndex]);
    setCurrentTime(0);
  };

  const selectTrack = (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'track':
        return <Repeat className="w-4 h-4 text-primary" />;
      case 'playlist':
        return <Repeat className="w-4 h-4 text-green-400" />;
      default:
        return <Repeat className="w-4 h-4 text-gray-400" />;
    }
  };

  const toggleRepeat = () => {
    const modes: ('off' | 'track' | 'playlist')[] = ['off', 'track', 'playlist'];
    const currentIndex = modes.indexOf(repeatMode);
    const nextIndex = (currentIndex + 1) % modes.length;
    setRepeatMode(modes[nextIndex]);
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black p-4 pb-20">
        <div className="max-w-6xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500/20 rounded-full text-green-400 font-medium mb-6"
            >
              <Headphones className="w-5 h-5" />
              Currently Coding To
            </motion.div>
            
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Spotify Integration
            </h1>
            <p className="text-gray-300 text-lg">
              What I&apos;m listening to while coding your next project
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Now Playing Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2 bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 p-8"
            >
              <div className="flex items-center gap-6 mb-8">
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center text-4xl"
                  animate={isPlaying ? {
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 20px rgba(34, 197, 94, 0.3)',
                      '0 0 40px rgba(34, 197, 94, 0.5)',
                      '0 0 20px rgba(34, 197, 94, 0.3)'
                    ]
                  } : {}}
                  transition={{ duration: 2, repeat: isPlaying ? Infinity : 0 }}
                >
                  {currentTrack.albumArt}
                </motion.div>
                
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {currentTrack.title}
                  </h2>
                  <p className="text-lg text-gray-300 mb-1">
                    {currentTrack.artist}
                  </p>
                  <p className="text-gray-400 mb-3">
                    {currentTrack.album} • {currentTrack.releaseYear}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-sm">
                      {currentTrack.genre}
                    </span>
                    <a
                      href="#"
                      className="flex items-center gap-1 text-green-400 hover:text-green-300 text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Open in Spotify
                    </a>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(currentTrack.duration)}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-1">
                  <motion.div
                    className="bg-green-500 h-1 rounded-full"
                    style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`p-2 rounded-full transition-colors ${
                      isShuffled ? 'text-green-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Shuffle className="w-4 h-4" />
                  </button>
                  
                  <button
                    onClick={prevTrack}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>
                  
                  <motion.button
                    onClick={togglePlay}
                    className="p-4 bg-green-500 hover:bg-green-400 rounded-full text-black transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </motion.button>
                  
                  <button
                    onClick={nextTrack}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                  
                  <button
                    onClick={toggleRepeat}
                    className="p-2 rounded-full transition-colors"
                  >
                    {getRepeatIcon()}
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-2 transition-colors ${
                      isLiked ? 'text-green-400' : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-gray-400" />
                    <div className="w-20 bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-green-500 h-1 rounded-full"
                        style={{ width: `${volume}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Queue/Playlist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-800/30 backdrop-blur-lg rounded-2xl border border-gray-700 p-6"
            >
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Music className="w-5 h-5" />
                Coding Playlist
              </h3>
              
              <div className="space-y-3">
                <AnimatePresence>
                  {mockTracks.map((track, index) => (
                    <motion.div
                      key={track.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => selectTrack(track)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        currentTrack.id === track.id
                          ? 'bg-green-500/20 border border-green-500/30'
                          : 'bg-gray-700/30 hover:bg-gray-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{track.albumArt}</div>
                        <div className="flex-1 min-w-0">
                          <p className={`font-medium truncate ${
                            currentTrack.id === track.id ? 'text-green-400' : 'text-white'
                          }`}>
                            {track.title}
                          </p>
                          <p className="text-sm text-gray-400 truncate">
                            {track.artist}
                          </p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(track.duration)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Music Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">24/7</div>
              <div className="text-sm text-gray-400">Coding Music</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">127</div>
              <div className="text-sm text-gray-400">Liked Songs</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">15</div>
              <div className="text-sm text-gray-400">Playlists</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">8.5k</div>
              <div className="text-sm text-gray-400">Minutes Played</div>
            </div>
          </motion.div>

          {/* Integration Benefits */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="mt-8 bg-gray-800/20 rounded-xl border border-gray-700 p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4 text-center">
              Why Music Integration Matters
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🎵</div>
                <h4 className="font-semibold text-white mb-1">Personal Touch</h4>
                <p className="text-sm text-gray-400">Shows personality and creates connection with visitors</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">🔄</div>
                <h4 className="font-semibold text-white mb-1">Live Updates</h4>
                <p className="text-sm text-gray-400">Real-time data showing current activity</p>
              </div>
              <div className="text-center p-4">
                <div className="text-3xl mb-2">💡</div>
                <h4 className="font-semibold text-white mb-1">Creative Insight</h4>
                <p className="text-sm text-gray-400">Gives insight into work environment and inspiration</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SpotifyIntegrationPage;
