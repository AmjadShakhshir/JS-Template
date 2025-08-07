"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Copy, RotateCcw, Code, Zap } from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface CodeExample {
  id: string;
  title: string;
  description: string;
  language: string;
  code: string;
  output: string;
}

const codeExamples: CodeExample[] = [
  {
    id: "react-hook",
    title: "Custom React Hook",
    description: "A custom hook for managing local storage with React",
    language: "javascript",
    code: `function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage example
const [name, setName] = useLocalStorage('name', 'Anonymous');
console.log('Current name:', name);`,
    output: "Custom hook created successfully!\nCurrent name: Anonymous"
  },
  {
    id: "algorithm",
    title: "Binary Search Algorithm",
    description: "Efficient searching algorithm with O(log n) complexity",
    language: "javascript",
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

const numbers = [1, 3, 5, 7, 9, 11, 13, 15];
const result = binarySearch(numbers, 7);
console.log('Found at index:', result);`,
    output: "Found at index: 3"
  },
  {
    id: "css-animation",
    title: "CSS Animation",
    description: "Pure CSS animation with keyframes",
    language: "css",
    code: `@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animated-element {
  animation: fadeInUp 0.6s ease-out;
  background: linear-gradient(45deg, #667eea, #764ba2);
  padding: 20px;
  border-radius: 12px;
  color: white;
  text-align: center;
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}`,
    output: "✨ Animation styles applied!\nElements will fade in and pulse smoothly."
  },
  {
    id: "api-fetch",
    title: "Modern API Fetching",
    description: "Clean async/await API calls with error handling",
    language: "javascript",
    code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const userData = await response.json();
    
    return {
      success: true,
      data: userData
    };
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

// Usage
const result = await fetchUserData(123);
console.log('API Result:', result);`,
    output: "API Result: { success: true, data: { id: 123, name: 'John Doe' } }"
  }
];

const CodePlaygroundPage = () => {
  const [selectedExample, setSelectedExample] = useState(codeExamples[0]);
  const [code, setCode] = useState(selectedExample.code);
  const [output, setOutput] = useState(selectedExample.output);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setCode(selectedExample.code);
    setOutput(selectedExample.output);
  }, [selectedExample]);

  const runCode = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      setOutput(selectedExample.output);
      setIsRunning(false);
    }, 1000);
  };

  const resetCode = () => {
    setCode(selectedExample.code);
    setOutput(selectedExample.output);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      // You could show a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 p-4">
        <div className="max-w-7xl mx-auto pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Interactive Code Playground
            </h1>
            <p className="text-gray-300 text-lg">
              Explore my coding skills through interactive examples
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Example Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Examples
              </h3>
              <div className="space-y-3">
                {codeExamples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => setSelectedExample(example)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedExample.id === example.id
                        ? 'bg-primary/20 border-primary text-white'
                        : 'bg-gray-800/50 border-gray-700 text-gray-300 hover:bg-gray-700/50'
                    }`}
                  >
                    <h4 className="font-semibold mb-1">{example.title}</h4>
                    <p className="text-sm opacity-80">{example.description}</p>
                    <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                      example.language === 'javascript' ? 'bg-yellow-500/20 text-yellow-300' :
                      example.language === 'css' ? 'bg-blue-500/20 text-blue-300' :
                      'bg-green-500/20 text-green-300'
                    }`}>
                      {example.language}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Code Editor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 shadow-2xl">
                {/* Editor Header */}
                <div className="border-b border-gray-700 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-white">{selectedExample.title}</h3>
                      <p className="text-sm text-gray-400">{selectedExample.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={copyCode}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={resetCode}
                        className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                        title="Reset code"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={runCode}
                        disabled={isRunning}
                        className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 disabled:opacity-50 text-white rounded-lg transition-colors"
                      >
                        {isRunning ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-4 h-4" />
                          </motion.div>
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        {isRunning ? 'Running...' : 'Run Code'}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Code Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Code Input */}
                  <div className="border-r border-gray-700">
                    <div className="bg-gray-700/30 px-4 py-2 border-b border-gray-700">
                      <span className="text-sm text-gray-400">Code Editor</span>
                    </div>
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full h-96 p-4 bg-transparent text-white font-mono text-sm resize-none focus:outline-none"
                      style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
                    />
                  </div>

                  {/* Output */}
                  <div>
                    <div className="bg-gray-700/30 px-4 py-2 border-b border-gray-700">
                      <span className="text-sm text-gray-400">Output</span>
                    </div>
                    <div className="h-96 p-4 overflow-auto">
                      {isRunning ? (
                        <div className="flex items-center gap-2 text-gray-400">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <Zap className="w-4 h-4" />
                          </motion.div>
                          Executing code...
                        </div>
                      ) : (
                        <pre className="text-green-400 font-mono text-sm whitespace-pre-wrap">
                          {output}
                        </pre>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-white mb-2">Live Editing</h4>
                  <p className="text-sm text-gray-400">
                    Modify the code in real-time and see your changes
                  </p>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-white mb-2">Multiple Languages</h4>
                  <p className="text-sm text-gray-400">
                    Examples in JavaScript, CSS, and more technologies
                  </p>
                </div>
                <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700">
                  <h4 className="font-semibold text-white mb-2">Interactive Output</h4>
                  <p className="text-sm text-gray-400">
                    See the results of your code execution instantly
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CodePlaygroundPage;
