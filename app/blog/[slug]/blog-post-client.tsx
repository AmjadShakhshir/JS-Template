"use client";

import { useState, useEffect } from "react";
import { Twitter, Linkedin, Copy } from "lucide-react";
import type { BlogPost } from "@/data";

interface BlogPostClientProps {
  post: BlogPost;
}

const BlogPostClient = ({ post }: BlogPostClientProps) => {
  const [copied, setCopied] = useState(false);
  const [postUrl, setPostUrl] = useState('');

  useEffect(() => {
    setPostUrl(window.location.href);
  }, []);

  const handleCopyLink = async () => {
    if (!postUrl) return;
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const shareOnTwitter = () => {
    if (!postUrl) return;
    const text = `Check out this article: ${post.title}`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank');
  };

  const shareOnLinkedIn = () => {
    if (!postUrl) return;
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="text-slate-400 text-sm">Share:</span>
      <button
        onClick={shareOnTwitter}
        className="p-2 bg-slate-800/50 hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 rounded-full transition-all duration-300"
        title="Share on Twitter"
      >
        <Twitter size={18} />
      </button>
      <button
        onClick={shareOnLinkedIn}
        className="p-2 bg-slate-800/50 hover:bg-blue-600/20 text-slate-400 hover:text-blue-500 rounded-full transition-all duration-300"
        title="Share on LinkedIn"
      >
        <Linkedin size={18} />
      </button>
      <button
        onClick={handleCopyLink}
        className="p-2 bg-slate-800/50 hover:bg-primary/20 text-slate-400 hover:text-primary rounded-full transition-all duration-300"
        title="Copy link"
      >
        <Copy size={18} />
      </button>
      {copied && (
        <span className="text-green-400 text-sm">Link copied!</span>
      )}
    </div>
  );
};

export default BlogPostClient;
