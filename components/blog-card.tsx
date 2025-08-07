"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, Eye } from "lucide-react";
import { blogCategories, type BlogPost } from "@/data";
import { useState, useEffect } from "react";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
  index?: number;
  variant?: "default" | "featured" | "compact";
}

const BlogCard = ({ post, index = 0, variant = "default" }: BlogCardProps) => {
  const [isClient, setIsClient] = useState(false);
  const category = blogCategories.find((cat) => cat.id === post.category);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Format date safely for hydration
  const formatDate = (dateString: string) => {
    if (!isClient) {
      // Return a simple format for SSR to match client initial render
      return new Date(dateString).toISOString().split('T')[0];
    }
    return new Date(dateString).toLocaleDateString();
  };

  const baseClasses = "group block transition-all duration-300 hover:scale-[1.02]";
  
  if (variant === "featured") {
    return (
      <motion.div
        initial={isClient ? { opacity: 0, y: 20 } : false}
        animate={isClient ? { opacity: 1, y: 0 } : false}
        transition={isClient ? { duration: 0.6, delay: index * 0.1 } : {}}
      >
        <Link href={`/blog/${post.slug}`} className={baseClasses}>
          <div className="glass-morphism rounded-2xl overflow-hidden">
            {/* Featured Image */}
            <div className="h-48 relative overflow-hidden">
              <Image
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20">
                <span
                  className="px-3 py-1 rounded-full text-xs font-medium text-white shadow-lg"
                  style={{ backgroundColor: category?.color }}
                >
                  {category?.name}
                </span>
              </div>
              <div className="absolute top-4 right-4 z-20">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-white flex items-center">
                  <Eye size={12} className="mr-1" />
                  Featured
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-slate-300 text-sm mb-4 line-clamp-2">
                {post.excerpt}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {post.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-800/50 text-slate-400 px-2 py-1 rounded text-xs"
                  >
                    #{tag}
                  </span>
                ))}
                {post.tags.length > 3 && (
                  <span className="text-slate-400 text-xs">+{post.tags.length - 3} more</span>
                )}
              </div>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Calendar size={12} className="mr-1" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center">
                    <Clock size={12} className="mr-1" />
                    {post.readTime} min read
                  </div>
                </div>
                <span className="text-primary font-medium">{post.author}</span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <Link href={`/blog/${post.slug}`} className={baseClasses}>
          <div className="glass-morphism rounded-xl p-4">
            <div className="flex items-start space-x-4">
              {/* Small image */}
              <div className="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80";
                  }}
                />
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <h4 className="text-white font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                  {post.title}
                </h4>
                <p className="text-slate-300 text-sm mb-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-xs text-slate-400 space-x-3">
                  <div className="flex items-center">
                    <Calendar size={10} className="mr-1" />
                    {formatDate(post.publishedAt)}
                  </div>
                  <div className="flex items-center">
                    <Clock size={10} className="mr-1" />
                    {post.readTime}m
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={isClient ? { opacity: 0, y: 20 } : false}
      animate={isClient ? { opacity: 1, y: 0 } : false}
      transition={isClient ? { duration: 0.6, delay: index * 0.1 } : {}}
    >
      <Link href={`/blog/${post.slug}`} className={baseClasses}>
        <div className="glass-morphism rounded-2xl overflow-hidden h-full">
          {/* Image */}
          <div className="h-40 relative overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="absolute bottom-3 left-3 z-20">
              <span
                className="px-2 py-1 rounded-full text-xs font-medium text-white shadow-lg"
                style={{ backgroundColor: category?.color }}
              >
                {category?.name}
              </span>
            </div>
            {post.featured && (
              <div className="absolute top-3 right-3 z-20">
                <div className="bg-yellow-500/30 backdrop-blur-sm rounded-full px-2 py-1 text-xs text-yellow-400 flex items-center">
                  <Eye size={10} className="mr-1" />
                  Featured
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-slate-300 text-sm mb-3 line-clamp-2">
              {post.excerpt}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {post.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="bg-slate-800/50 text-slate-300 px-2 py-1 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
              {post.tags.length > 2 && (
                <span className="text-slate-400 text-xs">+{post.tags.length - 2} more</span>
              )}
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                {formatDate(post.publishedAt)}
              </div>
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                {post.readTime} min
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default BlogCard;
