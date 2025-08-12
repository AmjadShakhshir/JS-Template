"use client"

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const predefinedResponses: Record<string, string> = {
  "skills": "I specialize in full-stack development with React, Node.js, TypeScript, and modern web technologies. I'm particularly experienced with Next.js, Tailwind CSS, and cloud platforms like AWS.",
  "experience": "I have several years of experience in full-stack development, working on everything from small business websites to large enterprise applications. I've led teams and mentored junior developers.",
  "projects": "I've built various projects including e-commerce platforms, SaaS applications, mobile apps, and this portfolio itself using React 19 and modern web technologies.",
  "contact": "You can reach me through the contact form, LinkedIn, or email. I'm always open to discussing new opportunities and interesting projects!",
  "technologies": "I work with React, Next.js, TypeScript, Node.js, Express, MongoDB, PostgreSQL, AWS, Docker, and many other modern technologies.",
  "availability": "I'm currently available for freelance projects and full-time opportunities. Feel free to reach out to discuss your needs!",
  "location": "I'm based in [Your Location] but I work with clients globally and am comfortable with remote collaboration.",
};

const getResponse = (input: string): string => {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(predefinedResponses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
    return "Hello! I'm Amjad's AI assistant. I can tell you about his skills, experience, projects, and more. What would you like to know?";
  }
  
  if (lowerInput.includes("help")) {
    return "I can help you learn about Amjad's skills, experience, projects, technologies, availability, and contact information. Just ask me anything!";
  }
  
  return "That's an interesting question! While I'm still learning, I'd recommend reaching out to Amjad directly through the contact form for detailed discussions about specific topics.";
};

const AIChatPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Amjad's AI assistant. I can tell you about his skills, experience, and projects. What would you like to know?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponse(input),
        isBot: true,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your experience",
    "Show me your projects",
    "How can I contact you?"
  ];

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-4">
        <div className="max-w-4xl mx-auto pt-20 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              AI Assistant
            </h1>
            <p className="text-gray-300 text-lg">
              Chat with my AI assistant to learn about my skills and experience
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gray-800/50 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-2xl"
          >
            {/* Chat Header */}
            <div className="border-b border-gray-700 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/20 rounded-full">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Amjad&apos;s AI Assistant</h3>
                  <p className="text-sm text-gray-400">Always ready to help</p>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-400">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${message.isBot ? '' : 'flex-row-reverse'}`}
                  >
                    <div className={`p-2 rounded-full ${message.isBot ? 'bg-primary/20' : 'bg-gray-600'}`}>
                      {message.isBot ? (
                        <Bot className="w-5 h-5 text-primary" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isBot 
                        ? 'bg-gray-700 text-white' 
                        : 'bg-primary text-white ml-auto'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Bot className="w-5 h-5 text-primary" />
                  </div>
                  <div className="bg-gray-700 px-4 py-2 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="p-4 border-t border-gray-700">
              <p className="text-sm text-gray-400 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(question)}
                    className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-full transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>

              {/* Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything about Amjad..."
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-xl px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="p-2 bg-primary hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-6"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Powered by AI • Built with React 19 & Framer Motion
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AIChatPage;
