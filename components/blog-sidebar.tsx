"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Tag, Calendar, TrendingUp, BookOpen } from "lucide-react";
import Link from "next/link";
import { blogCategories, type BlogPost } from "@/data";
import { loadBlogPosts, getRecentPosts } from "@/lib/blog-storage";
import BlogCard from "./blog-card";

interface BlogSidebarProps {
  currentPostSlug?: string;
  className?: string;
}

const BlogSidebar = ({ currentPostSlug, className = "" }: BlogSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isClient, setIsClient] = useState(false);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    setIsClient(true);
    // Load all blog posts
    const posts = loadBlogPosts();
    setBlogPosts(posts);
    // Only run on client side to avoid hydration mismatch
    setRecentPosts(getRecentPosts(5).filter(post => post.slug !== currentPostSlug));
  }, [currentPostSlug]);
  const popularCategories = blogCategories.slice(0, 6);
  const popularTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).slice(0, 12);

  const searchResults = searchTerm
    ? blogPosts
        .filter(post => 
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        )
        .slice(0, 3)
    : [];

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      <motion.div
        initial={isClient ? { opacity: 0, y: 20 } : false}
        animate={isClient ? { opacity: 1, y: 0 } : false}
        transition={isClient ? { duration: 0.6 } : {}}
        className="glass-morphism rounded-xl p-4"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Search size={18} className="mr-2 text-primary" />
          Search Posts
        </h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary text-sm"
          />
        </div>
        
        {/* Search Results */}
        {searchTerm && (
          <div className="mt-4 space-y-2">
            {searchResults.length > 0 ? (
              <>
                <p className="text-xs text-slate-400 mb-2">
                  Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                </p>
                {searchResults.map((post, index) => (
                  <BlogCard key={post.id} post={post} index={index} variant="compact" />
                ))}
              </>
            ) : (
              <p className="text-sm text-slate-400">No posts found</p>
            )}
          </div>
        )}
      </motion.div>

      {/* Recent Posts */}
      <motion.div
        initial={isClient ? { opacity: 0, y: 20 } : false}
        animate={isClient ? { opacity: 1, y: 0 } : false}
        transition={isClient ? { duration: 0.6, delay: 0.1 } : {}}
        className="glass-morphism rounded-xl p-4"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <TrendingUp size={18} className="mr-2 text-primary" />
          Recent Posts
        </h3>
        <div className="space-y-3">
          {recentPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} variant="compact" />
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <motion.div
        initial={isClient ? { opacity: 0, y: 20 } : false}
        animate={isClient ? { opacity: 1, y: 0 } : false}
        transition={isClient ? { duration: 0.6, delay: 0.2 } : {}}
        className="glass-morphism rounded-xl p-4"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <BookOpen size={18} className="mr-2 text-primary" />
          Categories
        </h3>
        <div className="space-y-2">
          {/* All Categories Link */}
          <Link
            href="/blog"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
          >
            <div className="flex items-center">
              <span className="w-3 h-3 rounded-full mr-3 bg-gradient-to-r from-primary to-secondary" />
              <span className="text-slate-300 group-hover:text-white text-sm font-medium">
                All Categories
              </span>
            </div>
            <span className="text-slate-500 text-xs">
              {blogPosts.length}
            </span>
          </Link>
          
          {popularCategories.map((category) => {
            const postCount = blogPosts.filter(post => post.category === category.id).length;
            return (
              <Link
                key={category.id}
                href={`/blog?category=${category.id}`}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-800/50 transition-colors group"
              >
                <div className="flex items-center">
                  <span
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-slate-300 group-hover:text-white text-sm">
                    {category.name}
                  </span>
                </div>
                <span className="text-slate-500 text-xs">
                  {postCount}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>

      {/* Popular Tags */}
      <motion.div
        initial={isClient ? { opacity: 0, y: 20 } : false}
        animate={isClient ? { opacity: 1, y: 0 } : false}
        transition={isClient ? { duration: 0.6, delay: 0.3 } : {}}
        className="glass-morphism rounded-xl p-4"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Tag size={18} className="mr-2 text-primary" />
          Popular Tags
        </h3>
        <div className="flex flex-wrap gap-2">
          {popularTags.map((tag) => (
            <Link
              key={tag}
              href={`/blog?tag=${tag}`}
              className="bg-slate-800/50 hover:bg-primary/20 text-slate-300 hover:text-primary px-2 py-1 rounded text-xs transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      </motion.div>

      {/* Blog Stats */}
      <motion.div
        initial={isClient ? { opacity: 0, y: 20 } : false}
        animate={isClient ? { opacity: 1, y: 0 } : false}
        transition={isClient ? { duration: 0.6, delay: 0.4 } : {}}
        className="glass-morphism rounded-xl p-4"
      >
        <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
          <Calendar size={18} className="mr-2 text-primary" />
          Blog Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Total Posts</span>
            <span className="text-primary font-semibold">{blogPosts.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Categories</span>
            <span className="text-primary font-semibold">{blogCategories.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Featured Posts</span>
            <span className="text-primary font-semibold">
              {blogPosts.filter(post => post.featured).length}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-300 text-sm">Total Reading Time</span>
            <span className="text-primary font-semibold">
              {blogPosts.reduce((total, post) => total + post.readTime, 0)} min
            </span>
          </div>
        </div>
      </motion.div>

      {/* Newsletter Signup */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="glass-morphism rounded-xl p-4 bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
      >
        <h3 className="text-lg font-semibold text-white mb-2">
          Stay Updated
        </h3>
        <p className="text-slate-300 text-sm mb-4">
          Get notified about new posts and updates.
        </p>
        <div className="space-y-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary text-sm"
          />
          <button className="w-full bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Subscribe
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogSidebar;
