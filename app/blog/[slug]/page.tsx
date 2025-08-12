import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { blogCategories } from "@/data";
import type { BlogPost } from "@/data";
import { getBlogPostBySlug, getRecentPosts, loadBlogPosts } from "@/lib/database";
import BlogSidebar from "@/components/blog-sidebar";
import BlogPostClient from "./blog-post-client";

// Generate static paths for all blog posts
export async function generateStaticParams() {
  try {
    const posts = await loadBlogPosts();
    return posts.map((post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error('Failed to generate static params:', error);
    return [];
  }
}

// Metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);
    
    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch (error) {
    console.error('Failed to generate metadata:', error);
    return {
      title: 'Blog Post',
    };
  }
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;

  let post: BlogPost | null | undefined = null;
  let recentPosts: BlogPost[] = [];

  try {
    const [postData, recentData] = await Promise.all([
      getBlogPostBySlug(slug),
      getRecentPosts(4) // Get 4 to filter out current post
    ]);
    
    post = postData || null;
    recentPosts = recentData ? recentData.filter(p => p.slug !== slug).slice(0, 3) : [];
  } catch (error) {
    console.error('Failed to load blog data:', error);
  }

  if (!post) {
    notFound();
  }

  const category = blogCategories.find((cat) => cat.id === post.category);

  return (
    <div className="min-h-screen pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Main Content */}
          <div className="lg:col-span-3 max-w-4xl">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors group"
              >
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Blog
              </Link>
            </div>

            {/* Article Header */}
            <header className="mb-8">
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
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
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
            </header>

            {/* Featured Image */}
            <div className="mb-8">
              <div className="h-64 md:h-96 rounded-2xl overflow-hidden relative">
                <Image
                  src={post.imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Client-side interactive components */}
            <BlogPostClient post={post} />

            {/* Article Content */}
            <article className="prose prose-invert prose-lg max-w-none mb-12">
              <div 
                className="text-slate-200 leading-relaxed"
                dangerouslySetInnerHTML={{ 
                  __html: post.content
                    .replace(/\n/g, '<br />')
                    .replace(/```([^`]+)```/g, '<pre class="bg-slate-800 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                }} 
              />
            </article>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <section className="border-t border-slate-700 pt-12">
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
                              {new Date(recentPost.publishedAt).toLocaleDateString()}
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
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <BlogSidebar currentPostSlug={post.slug} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;