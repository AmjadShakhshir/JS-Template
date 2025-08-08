"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowLeft, Twitter, Linkedin, Copy } from "lucide-react";
import { blogCategories } from "@/data";
import type { BlogPost } from "@/data";
import BlogSidebar from "@/components/blog-sidebar";

interface BlogPostClientProps {
  post: BlogPost;
  recentPosts: BlogPost[];
}

export default function BlogPostClient({ post, recentPosts }: BlogPostClientProps) {
  const [copied, setCopied] = useState(false);
  const [postUrl, setPostUrl] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setPostUrl(window.location.href);
  }, []);

  const category = blogCategories.find((cat) => cat.id === post.category);

  // Format date safely for hydration
  const formatDate = (dateString: string) => {
    if (!isClient) {
      // Return a simple format for SSR to match client initial render
      return new Date(dateString).toISOString().split('T')[0];
    }
    return new Date(dateString).toLocaleDateString();
  };

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
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-3 max-w-4xl">
            {/* Back Button */}
            <motion.div
              initial={isClient ? { opacity: 0, x: -20 } : false}
              animate={isClient ? { opacity: 1, x: 0 } : false}
              transition={isClient ? { duration: 0.6 } : {}}
              className="mb-8"
            >
              <Link
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
              >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.header
              initial={isClient ? { opacity: 0, y: 20 } : false}
              animate={isClient ? { opacity: 1, y: 0 } : false}
              transition={isClient ? { duration: 0.6, delay: 0.1 } : {}}
              className="mb-8"
            >
              {/* Category */}
              <div className="mb-4">
                <span
                  className="px-3 py-1 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: category?.color }}
                >
                  {category?.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-slate-300 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400 mb-6">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="text-sm">
                  By <span className="text-primary font-medium">{post.author}</span>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="bg-slate-800/50 text-slate-300 px-3 py-1 rounded-full text-sm hover:bg-slate-700/50 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center gap-4">
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
            </motion.header>

            {/* Featured Image */}
            <motion.div
              initial={isClient ? { opacity: 0, y: 20 } : false}
              animate={isClient ? { opacity: 1, y: 0 } : false}
              transition={isClient ? { duration: 0.6, delay: 0.2 } : {}}
              className="mb-8"
            >
              <div className="h-64 md:h-96 rounded-2xl overflow-hidden relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
            </motion.div>

            {/* Article Content */}
            <motion.article
              initial={isClient ? { opacity: 0, y: 20 } : false}
              animate={isClient ? { opacity: 1, y: 0 } : false}
              transition={isClient ? { duration: 0.6, delay: 0.3 } : {}}
              className="prose prose-invert prose-lg max-w-none mb-12"
            >
              <div 
                className="text-slate-200 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br />').replace(/```([^`]+)```/g, '<pre class="bg-slate-800 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                }} 
              />
            </motion.article>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <motion.section
                initial={isClient ? { opacity: 0, y: 20 } : false}
                animate={isClient ? { opacity: 1, y: 0 } : false}
                transition={isClient ? { duration: 0.6, delay: 0.4 } : {}}
                className="border-t border-slate-700 pt-12"
              >
                <h2 className="text-2xl font-bold text-white mb-6">More Articles</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {recentPosts.map((recentPost) => {
                    const recentCategory = blogCategories.find((cat) => cat.id === recentPost.category);
                    return (
                      <Link key={recentPost.id} href={`/blog/${recentPost.slug}`}>
                        <div className="glass-morphism rounded-xl p-4 hover:scale-[1.02] transition-all duration-300 cursor-pointer">
                          <div className="mb-3">
                            <span
                              className="px-2 py-1 rounded-full text-xs font-medium text-white"
                              style={{ backgroundColor: recentCategory?.color }}
                            >
                              {recentCategory?.name}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-white mb-2 hover:text-primary transition-colors">
                            {recentPost.title}
                          </h3>
                          <p className="text-slate-300 text-sm mb-3 line-clamp-2">
                            {recentPost.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <div className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {formatDate(recentPost.publishedAt)}
                            </div>
                            <div className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {recentPost.readTime} min
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </motion.section>
            )}
          </div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <BlogSidebar currentPostSlug={post.slug} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
