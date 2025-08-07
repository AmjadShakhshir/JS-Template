"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { blogCategories, type BlogPost } from "@/data";
import { loadBlogPosts } from "@/lib/database";
import BlogCard from "@/components/blog-card";
import BlogSidebar from "@/components/blog-sidebar";

const BlogContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  // Load posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const loadedPosts = await loadBlogPosts();
        setBlogPosts(loadedPosts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      }
    };
    
    loadPosts();
  }, []);

  // Handle URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const tagParam = searchParams.get("tag");
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }
    
    if (tagParam) {
      setSearchTerm(tagParam);
    }
  }, [searchParams]);

  // Filter and sort posts
  const filteredPosts = blogPosts
    .filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "all" || post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "readTime":
          return a.readTime - b.readTime;
        default:
          return 0;
      }
    });

  const featuredPosts = blogPosts.filter((post) => post.featured);

  return (
    <>
      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <motion.section
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <span className="w-4 h-4 bg-primary rounded-full mr-3"></span>
            Featured Posts
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} variant="featured" />
            ))}
          </div>
        </motion.section>
      )}

      {/* Search and Filter */}
      <motion.div
        className="mb-8 glass-morphism p-6 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => {
                const newSearchTerm = e.target.value;
                setSearchTerm(newSearchTerm);
                
                // Clear tag parameter from URL when manually searching
                const url = new URL(window.location.href);
                url.searchParams.delete("tag");
                if (url.search !== window.location.search) {
                  router.replace(url.pathname + url.search);
                }
              }}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => {
                const category = e.target.value;
                setSelectedCategory(category);
                
                // Update URL to reflect the selected category
                const url = new URL(window.location.href);
                if (category === "all") {
                  url.searchParams.delete("category");
                  // Also clear search term and tag when selecting "All Categories"
                  url.searchParams.delete("tag");
                  setSearchTerm("");
                } else {
                  url.searchParams.set("category", category);
                }
                router.replace(url.pathname + url.search);
              }}
              className="pl-10 pr-8 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
            >
              <option value="all">All Categories</option>
              {blogCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-primary appearance-none cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="readTime">By Read Time</option>
          </select>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Blog Posts */}
        <div className="lg:col-span-3">
          {/* Blog Posts Grid */}
          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {filteredPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </motion.div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <motion.div
              className="text-center py-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-white mb-2">No posts found</h3>
              <p className="text-slate-400">Try adjusting your search or filter criteria.</p>
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <BlogSidebar />
        </motion.div>
      </div>
    </>
  );
};

const Blog = () => {
  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
            My Blog
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on web development, technology, and career growth.
          </p>
        </motion.div>

        {/* Content with Suspense boundary */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        }>
          <BlogContent />
        </Suspense>
      </div>
    </div>
  );
};

export default Blog;
