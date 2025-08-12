"use client"

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { 
  Gamepad2, 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  Timer, 
  Zap,
  Target,
  Brain,
  Shuffle
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

type GameType = 'snake' | 'memory' | 'reaction' | 'number-guess' | null;

// Snake Game Component
const SnakeGame = () => {
  const [snake, setSnake] = useState([[10, 10]]);
  const [food, setFood] = useState([15, 15]);
  const [direction, setDirection] = useState([0, 1]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gridSize = 20;

  const moveSnake = useCallback(() => {
    if (!isPlaying || gameOver) return;

    setSnake(prevSnake => {
      const newSnake = [...prevSnake];
      const head = newSnake[newSnake.length - 1];
      const newHead = [head[0] + direction[0], head[1] + direction[1]];

      // Check wall collision
      if (newHead[0] < 0 || newHead[0] >= gridSize || newHead[1] < 0 || newHead[1] >= gridSize) {
        setGameOver(true);
        setIsPlaying(false);
        return prevSnake;
      }

      // Check self collision
      for (const segment of newSnake) {
        if (newHead[0] === segment[0] && newHead[1] === segment[1]) {
          setGameOver(true);
          setIsPlaying(false);
          return prevSnake;
        }
      }

      newSnake.push(newHead);

      // Check food collision
      if (newHead[0] === food[0] && newHead[1] === food[1]) {
        setScore(prev => prev + 10);
        setFood([
          Math.floor(Math.random() * gridSize),
          Math.floor(Math.random() * gridSize)
        ]);
      } else {
        newSnake.shift();
      }

      return newSnake;
    });
  }, [direction, isPlaying, gameOver, food, gridSize]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isPlaying) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction[0] !== 1) setDirection([-1, 0]);
          break;
        case 'ArrowDown':
          if (direction[0] !== -1) setDirection([1, 0]);
          break;
        case 'ArrowLeft':
          if (direction[1] !== 1) setDirection([0, -1]);
          break;
        case 'ArrowRight':
          if (direction[1] !== -1) setDirection([0, 1]);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, isPlaying]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, 150);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  const resetGame = () => {
    setSnake([[10, 10]]);
    setFood([15, 15]);
    setDirection([0, 1]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(false);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Snake Game</h3>
        <div className="flex items-center gap-4">
          <span className="text-green-400 font-semibold">Score: {score}</span>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={gameOver}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {isPlaying ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      {gameOver && (
        <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 mb-4">
          <p className="text-red-400 font-semibold">Game Over! Final Score: {score}</p>
        </div>
      )}

      <div className="grid grid-cols-20 gap-0 bg-gray-900 rounded-lg p-2 mb-4" style={{
        gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
        aspectRatio: '1'
      }}>
        {Array.from({ length: gridSize * gridSize }).map((_, index) => {
          const row = Math.floor(index / gridSize);
          const col = index % gridSize;
          const isSnake = snake.some(([r, c]) => r === row && c === col);
          const isFood = food[0] === row && food[1] === col;
          const isHead = snake[snake.length - 1]?.[0] === row && snake[snake.length - 1]?.[1] === col;

          return (
            <div
              key={index}
              className={`aspect-square ${
                isSnake 
                  ? isHead 
                    ? 'bg-green-300' 
                    : 'bg-green-500' 
                  : isFood 
                    ? 'bg-red-500' 
                    : 'bg-gray-800'
              } ${isFood ? 'rounded-full' : ''}`}
            />
          );
        })}
      </div>

      <div className="text-gray-400 text-sm">
        Use arrow keys to control the snake. Eat the red food to grow and score points!
      </div>
    </div>
  );
};

// Memory Game Component
const MemoryGame = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const emojis = ['🎮', '🎯', '🚀', '⭐', '🎨', '🎪', '🎭', '🎸'];

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => index);
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setScore(0);
    setMoves(0);
    setIsPlaying(true);
  };

  const handleCardClick = (index: number) => {
    if (!isPlaying || flipped.includes(index) || matched.includes(index)) return;

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      const [first, second] = newFlipped;
      const firstEmoji = emojis[cards[first] % emojis.length];
      const secondEmoji = emojis[cards[second] % emojis.length];

      if (firstEmoji === secondEmoji) {
        setMatched(prev => [...prev, first, second]);
        setScore(prev => prev + 100);
        setFlipped([]);
        
        if (matched.length + 2 === cards.length) {
          setTimeout(() => {
            setIsPlaying(false);
          }, 500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Memory Game</h3>
        <div className="flex items-center gap-4">
          <span className="text-blue-400 font-semibold">Score: {score}</span>
          <span className="text-purple-400 font-semibold">Moves: {moves}</span>
          <button
            onClick={initGame}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            <Shuffle className="w-4 h-4" />
            New Game
          </button>
        </div>
      </div>

      {matched.length === cards.length && cards.length > 0 && (
        <div className="bg-green-500/20 border border-green-500 rounded-lg p-4 mb-4">
          <p className="text-green-400 font-semibold">Congratulations! You won in {moves} moves!</p>
        </div>
      )}

      <div className="grid grid-cols-4 gap-4 mb-4">
        {cards.map((cardIndex, index) => {
          const isFlipped = flipped.includes(index) || matched.includes(index);
          const emoji = emojis[cardIndex % emojis.length];

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleCardClick(index)}
              className={`aspect-square rounded-lg cursor-pointer transition-all duration-300 ${
                isFlipped 
                  ? matched.includes(index)
                    ? 'bg-green-500 text-white'
                    : 'bg-blue-500 text-white'
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            >
              <div className="flex items-center justify-center h-full text-2xl">
                {isFlipped ? emoji : '?'}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="text-gray-400 text-sm">
        Click cards to flip them and find matching pairs!
      </div>
    </div>
  );
};

// Reaction Time Game
const ReactionGame = () => {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'go' | 'result'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [bestTime, setBestTime] = useState<number | null>(null);

  const startGame = () => {
    setGameState('ready');
    const delay = Math.random() * 3000 + 1000; // 1-4 seconds
    
    setTimeout(() => {
      setGameState('go');
      setStartTime(Date.now());
    }, delay);
  };

  const handleClick = () => {
    if (gameState === 'go') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setGameState('result');
      
      if (!bestTime || time < bestTime) {
        setBestTime(time);
      }
    } else if (gameState === 'ready') {
      setGameState('waiting');
    }
  };

  const resetGame = () => {
    setGameState('waiting');
    setReactionTime(0);
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Reaction Time Test</h3>
        <div className="flex items-center gap-4">
          {bestTime && (
            <span className="text-yellow-400 font-semibold">Best: {bestTime}ms</span>
          )}
          <button
            onClick={resetGame}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
      </div>

      <motion.div
        onClick={handleClick}
        className={`h-64 rounded-lg cursor-pointer flex items-center justify-center text-center p-8 transition-all duration-300 ${
          gameState === 'waiting' 
            ? 'bg-blue-500 hover:bg-blue-600' 
            : gameState === 'ready'
              ? 'bg-red-500'
              : gameState === 'go'
                ? 'bg-green-500'
                : 'bg-purple-500'
        }`}
        whileTap={{ scale: 0.98 }}
      >
        <div className="text-white">
          {gameState === 'waiting' && (
            <div>
              <Target className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Click to Start</h4>
              <p>Test your reaction speed!</p>
            </div>
          )}
          {gameState === 'ready' && (
            <div>
              <Timer className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">Wait for Green...</h4>
              <p>Don&apos;t click yet!</p>
            </div>
          )}
          {gameState === 'go' && (
            <div>
              <Zap className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">CLICK NOW!</h4>
              <p>React as fast as you can!</p>
            </div>
          )}
          {gameState === 'result' && (
            <div>
              <Trophy className="w-16 h-16 mx-auto mb-4" />
              <h4 className="text-xl font-bold mb-2">{reactionTime}ms</h4>
              <p>
                {reactionTime < 200 ? 'Lightning fast!' : 
                 reactionTime < 300 ? 'Very good!' :
                 reactionTime < 400 ? 'Good!' : 'Keep practicing!'}
              </p>
              <button
                onClick={startGame}
                className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

// Number Guessing Game
const NumberGuessGame = () => {
  const [targetNumber, setTargetNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameWon, setGameWon] = useState(false);
  const [range, setRange] = useState([1, 100]);

  const startGame = () => {
    const newTarget = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    setTargetNumber(newTarget);
    setGuess('');
    setAttempts(0);
    setFeedback(`I'm thinking of a number between ${range[0]} and ${range[1]}...`);
    setGameWon(false);
  };

  const makeGuess = () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < range[0] || guessNum > range[1]) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (guessNum === targetNumber) {
      setFeedback(`Congratulations! You got it in ${newAttempts} attempts!`);
      setGameWon(true);
    } else if (guessNum < targetNumber) {
      setFeedback('Too low! Try a higher number.');
    } else {
      setFeedback('Too high! Try a lower number.');
    }
    
    setGuess('');
  };

  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range]);

  return (
    <div className="bg-gray-800/50 rounded-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-white">Number Guessing Game</h3>
        <div className="flex items-center gap-4">
          <span className="text-orange-400 font-semibold">Attempts: {attempts}</span>
          <select
            value={`${range[0]}-${range[1]}`}
            onChange={(e) => {
              const [min, max] = e.target.value.split('-').map(Number);
              setRange([min, max]);
            }}
            className="px-3 py-1 bg-gray-700 text-white rounded border border-gray-600"
          >
            <option value="1-10">1-10 (Easy)</option>
            <option value="1-100">1-100 (Medium)</option>
            <option value="1-1000">1-1000 (Hard)</option>
          </select>
          <button
            onClick={startGame}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            New Game
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className={`p-4 rounded-lg ${gameWon ? 'bg-green-500/20 border border-green-500' : 'bg-gray-700'}`}>
          <p className={`${gameWon ? 'text-green-400' : 'text-gray-300'} text-center`}>
            {feedback}
          </p>
        </div>
      </div>

      {!gameWon && (
        <div className="flex gap-4 mb-4">
          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && makeGuess()}
            min={range[0]}
            max={range[1]}
            placeholder={`Enter ${range[0]}-${range[1]}`}
            className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-orange-500 focus:outline-none"
          />
          <button
            onClick={makeGuess}
            disabled={!guess}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Guess
          </button>
        </div>
      )}

      <div className="text-gray-400 text-sm text-center">
        {gameWon ? 'Great job! Start a new game to play again.' : 'Enter your guess and press Guess or Enter'}
      </div>
    </div>
  );
};

const InteractiveGamesPage = () => {
  const [selectedGame, setSelectedGame] = useState<GameType>(null);

  const games = [
    {
      id: 'snake' as GameType,
      title: 'Snake Game',
      description: 'Classic arcade game where you control a growing snake',
      icon: <Gamepad2 className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-500',
      difficulty: 'Medium'
    },
    {
      id: 'memory' as GameType,
      title: 'Memory Match',
      description: 'Test your memory by matching pairs of cards',
      icon: <Brain className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      difficulty: 'Easy'
    },
    {
      id: 'reaction' as GameType,
      title: 'Reaction Test',
      description: 'How fast are your reflexes? Test your reaction time',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-yellow-500 to-orange-500',
      difficulty: 'Easy'
    },
    {
      id: 'number-guess' as GameType,
      title: 'Number Guesser',
      description: 'Guess the secret number with strategic thinking',
      icon: <Target className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      difficulty: 'Easy'
    }
  ];

  const renderGame = () => {
    switch (selectedGame) {
      case 'snake':
        return <SnakeGame />;
      case 'memory':
        return <MemoryGame />;
      case 'reaction':
        return <ReactionGame />;
      case 'number-guess':
        return <NumberGuessGame />;
      default:
        return null;
    }
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen pt-20 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Gamepad2 className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Interactive Games
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Take a break and enjoy some fun mini-games while exploring my portfolio
            </p>
          </motion.div>

          {!selectedGame ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {games.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedGame(game.id)}
                    className="bg-gray-800/50 rounded-xl p-8 cursor-pointer hover:bg-gray-800/70 transition-all duration-300 border border-gray-700 hover:border-gray-600"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`p-4 rounded-xl bg-gradient-to-r ${game.color} shadow-lg`}>
                        <div className="text-white">
                          {game.icon}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-1">
                          {game.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          game.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          game.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {game.difficulty}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {game.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-primary font-medium">
                        Click to play
                      </span>
                      <Play className="w-5 h-5 text-primary" />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Features */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-gray-800/30 rounded-xl p-8"
              >
                <h2 className="text-3xl font-bold text-white mb-8 text-center">Game Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Gamepad2 className="w-6 h-6 text-purple-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Interactive Gameplay</h3>
                    <p className="text-gray-400 text-sm">Fully interactive games built with React hooks and state management</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Trophy className="w-6 h-6 text-blue-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Score Tracking</h3>
                    <p className="text-gray-400 text-sm">Keep track of your best scores and improvements over time</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Zap className="w-6 h-6 text-green-400" />
                    </div>
                    <h3 className="font-semibold text-white mb-2">Responsive Design</h3>
                    <p className="text-gray-400 text-sm">Optimized for desktop and mobile devices with touch support</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                >
                  ← Back to Games
                </button>
                <h2 className="text-2xl font-bold text-white">
                  {games.find(g => g.id === selectedGame)?.title}
                </h2>
              </div>
              
              {renderGame()}
            </motion.div>
          )}
        </div>
      </div>
    </>
  );
};

export default InteractiveGamesPage;
