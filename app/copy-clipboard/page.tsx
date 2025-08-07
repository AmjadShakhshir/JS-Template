"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Code, 
  Link as LinkIcon, 
  FileText,
  Share,
  Clipboard,
  Download
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface CopyItem {
  id: string;
  label: string;
  value: string;
  icon: React.ReactNode;
  type: 'text' | 'email' | 'phone' | 'code' | 'url';
  description: string;
}

const CopyToClipboardPage = () => {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [showToast, setShowToast] = useState<string | null>(null);

  const copyItems: CopyItem[] = [
    {
      id: 'email',
      label: 'Email Address',
      value: 'amjad.shakhshir@example.com',
      icon: <Mail className="w-5 h-5" />,
      type: 'email',
      description: 'Professional contact email'
    },
    {
      id: 'phone',
      label: 'Phone Number',
      value: '+1 (555) 123-4567',
      icon: <Phone className="w-5 h-5" />,
      type: 'phone',
      description: 'Direct line for business inquiries'
    },
    {
      id: 'location',
      label: 'Location',
      value: 'San Francisco, CA, USA',
      icon: <MapPin className="w-5 h-5" />,
      type: 'text',
      description: 'Current base of operations'
    },
    {
      id: 'linkedin',
      label: 'LinkedIn Profile',
      value: 'https://www.linkedin.com/in/amjad-shakhshir/',
      icon: <LinkIcon className="w-5 h-5" />,
      type: 'url',
      description: 'Professional networking profile'
    },
    {
      id: 'github',
      label: 'GitHub Profile',
      value: 'https://github.com/AmjadShakhshir',
      icon: <Code className="w-5 h-5" />,
      type: 'url',
      description: 'Open source contributions and projects'
    }
  ];

  const codeSnippets = [
    {
      id: 'react-component',
      title: 'React Component Hook',
      language: 'tsx',
      code: `const useCopyToClipboard = () => {
  const [copied, setCopied] = useState(false);
  
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
    }
  };
  
  return { copy, copied };
};`
    },
    {
      id: 'vanilla-js',
      title: 'Vanilla JavaScript',
      language: 'js',
      code: `function copyToClipboard(text) {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
}`
    },
    {
      id: 'css-styles',
      title: 'CSS Animation',
      language: 'css',
      code: `.copy-button {
  transition: all 0.2s ease;
}

.copy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.copy-success {
  background: linear-gradient(135deg, #10B981, #059669);
  color: white;
}`
    }
  ];

  const copyToClipboard = async (text: string, id: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItems(prev => new Set([...prev, id]));
      setShowToast(label);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      }, 2000);

      // Hide toast after 3 seconds
      setTimeout(() => {
        setShowToast(null);
      }, 3000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  };

  const downloadAsFile = (text: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen pt-20 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-6">
              <Clipboard className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Copy to Clipboard Demo
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Enhanced user experience with one-click copying for contact information, code snippets, and URLs
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {copyItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800/70 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="text-blue-400">
                        {item.icon}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-white mb-1">{item.label}</h3>
                      <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-900/50 px-2 py-1 rounded text-sm text-gray-300 flex-1 truncate">
                          {item.value}
                        </code>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(item.value, item.id, item.label)}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            copiedItems.has(item.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {copiedItems.has(item.id) ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Code Snippets */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Code Snippets</h2>
            <div className="space-y-6">
              {codeSnippets.map((snippet, index) => (
                <motion.div
                  key={snippet.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-gray-800/50 rounded-xl overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <div className="flex items-center gap-3">
                      <Code className="w-5 h-5 text-purple-400" />
                      <h3 className="font-semibold text-white">{snippet.title}</h3>
                      <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                        {snippet.language}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => downloadAsFile(snippet.code, `${snippet.id}.${snippet.language}`)}
                        className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors"
                        title="Download as file"
                      >
                        <Download className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => copyToClipboard(snippet.code, snippet.id, `${snippet.title} code`)}
                        className={`p-2 rounded-lg transition-all duration-300 ${
                          copiedItems.has(snippet.id)
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        }`}
                      >
                        {copiedItems.has(snippet.id) ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                    </div>
                  </div>
                  <div className="p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{snippet.code}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-8">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Check className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Visual Feedback</h3>
                <p className="text-gray-400 text-sm">Instant confirmation with icon and color changes</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Share className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Browser Compatibility</h3>
                <p className="text-gray-400 text-sm">Works across all modern browsers with fallbacks</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Multiple Formats</h3>
                <p className="text-gray-400 text-sm">Copy text, URLs, code, and download files</p>
              </div>
              
              <div className="bg-gray-800/50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Clipboard className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">Error Handling</h3>
                <p className="text-gray-400 text-sm">Graceful fallbacks for unsupported browsers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          className="fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 max-w-sm"
        >
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 flex-shrink-0" />
            <span className="truncate">{showToast} copied to clipboard!</span>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default CopyToClipboardPage;
