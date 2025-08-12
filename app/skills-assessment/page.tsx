"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  Brain, 
  Clock,
  RotateCcw,
  Sparkles
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface Result {
  score: number;
  totalQuestions: number;
  category: string;
  level: string;
  badge: string;
}

const questions: Question[] = [
  {
    id: 1,
    category: "React",
    question: "What is the correct way to handle state updates in React?",
    options: [
      "Directly mutate the state object",
      "Use setState() or useState hook",
      "Modify state.value directly",
      "Use jQuery to update DOM"
    ],
    correctAnswer: 1,
    explanation: "React requires state updates to be immutable. setState() in class components and useState hook in functional components are the correct ways.",
    difficulty: "Easy"
  },
  {
    id: 2,
    category: "JavaScript",
    question: "What will be the output of: console.log(0.1 + 0.2 === 0.3)?",
    options: [
      "true",
      "false",
      "undefined",
      "NaN"
    ],
    correctAnswer: 1,
    explanation: "Due to floating-point precision in JavaScript, 0.1 + 0.2 equals 0.30000000000000004, not exactly 0.3.",
    difficulty: "Medium"
  },
  {
    id: 3,
    category: "TypeScript",
    question: "Which TypeScript feature helps catch errors at compile time?",
    options: [
      "Type annotations",
      "console.log statements",
      "Runtime checks",
      "Browser debugging"
    ],
    correctAnswer: 0,
    explanation: "Type annotations in TypeScript provide static type checking, helping catch type-related errors during compilation.",
    difficulty: "Easy"
  },
  {
    id: 4,
    category: "CSS",
    question: "Which CSS property is used to create a flexible layout?",
    options: [
      "position: fixed",
      "display: block",
      "display: flex",
      "float: left"
    ],
    correctAnswer: 2,
    explanation: "Flexbox (display: flex) is designed for creating flexible, responsive layouts with easy alignment and distribution of space.",
    difficulty: "Easy"
  },
  {
    id: 5,
    category: "Node.js",
    question: "What is the purpose of the package.json file?",
    options: [
      "Store user data",
      "Configure project metadata and dependencies",
      "Define CSS styles",
      "Handle database connections"
    ],
    correctAnswer: 1,
    explanation: "package.json contains project metadata, dependencies, scripts, and configuration for Node.js projects.",
    difficulty: "Easy"
  }
];

const SkillsAssessmentPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [, setShowExplanation] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes

  const handleStartQuiz = () => {
    setQuizStarted(true);
    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...userAnswers, selectedAnswer];
      setUserAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowExplanation(false);
      } else {
        handleFinishQuiz();
      }
    }
  };

  const handleFinishQuiz = () => {
    setShowResult(true);
  };

  const calculateResult = (): Result => {
    const correctAnswers = userAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;

    const score = Math.round((correctAnswers / questions.length) * 100);
    
    let level = "Beginner";
    let badge = "🥉";
    
    if (score >= 80) {
      level = "Expert";
      badge = "🏆";
    } else if (score >= 60) {
      level = "Advanced";
      badge = "🥇";
    } else if (score >= 40) {
      level = "Intermediate";
      badge = "🥈";
    }

    return {
      score,
      totalQuestions: questions.length,
      category: "Full Stack Development",
      level,
      badge
    };
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setUserAnswers([]);
    setShowResult(false);
    setShowExplanation(false);
    setQuizStarted(false);
    setTimeRemaining(300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <>
        <TransitionPage />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              className="mb-8"
            >
              <Brain className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-4xl font-bold gradient-text mb-4">
                Skills Assessment Challenge
              </h1>
              <p className="text-gray-300 text-lg">
                Test your full-stack development knowledge with interactive questions
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-8 mb-8"
            >
              <h3 className="text-xl font-bold text-white mb-4">Quiz Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{questions.length}</div>
                  <div className="text-gray-400">Questions</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-gray-400">Minutes</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">Mixed</div>
                  <div className="text-gray-400">Difficulty</div>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              onClick={handleStartQuiz}
              className="px-8 py-4 bg-primary hover:bg-primary/80 text-white font-bold rounded-xl transition-colors text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Assessment
            </motion.button>
          </motion.div>
        </div>
      </>
    );
  }

  if (showResult) {
    const result = calculateResult();
    
    return (
      <>
        <TransitionPage />
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4 pb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="text-6xl mb-4"
            >
              {result.badge}
            </motion.div>
            
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Assessment Complete!
            </h1>
            
            <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">{result.score}%</div>
                  <div className="text-gray-400">Overall Score</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">{result.level}</div>
                  <div className="text-gray-400">Skill Level</div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-700">
                <p className="text-gray-300">
                  You answered {userAnswers.filter((answer, index) => answer === questions[index].correctAnswer).length} out of {questions.length} questions correctly!
                </p>
              </div>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetQuiz}
                className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
              <a
                href="/contact"
                className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4 pb-20">
        <div className="max-w-4xl mx-auto pt-20">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Question {currentQuestion + 1} of {questions.length}
              </h1>
              <div className="w-64 bg-gray-700 rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="bg-primary h-2 rounded-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-white">
                <Clock className="w-4 h-4" />
                <span className="font-mono">{formatTime(timeRemaining)}</span>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                question.difficulty === 'Easy' ? 'bg-green-500/20 text-green-300' :
                question.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {question.difficulty}
              </span>
            </div>
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-8 mb-8"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-4">
                {question.category}
              </span>
              <h2 className="text-xl font-bold text-white leading-relaxed">
                {question.question}
              </h2>
            </div>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all ${
                    selectedAnswer === index
                      ? 'bg-primary/20 border-primary text-white'
                      : 'bg-gray-700/30 border-gray-600 text-gray-300 hover:bg-gray-700/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm ${
                      selectedAnswer === index
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-500'
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    {option}
                  </div>
                </motion.button>
              ))}
            </div>

            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 pt-6 border-t border-gray-700"
              >
                <div className="flex items-center gap-3 mb-3">
                  {selectedAnswer === question.correctAnswer ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )}
                  <span className={`font-medium ${
                    selectedAnswer === question.correctAnswer ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Incorrect'}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {question.explanation}
                </p>
                <button
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-lg transition-colors"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default SkillsAssessmentPage;
