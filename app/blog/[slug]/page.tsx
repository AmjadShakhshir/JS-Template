import { notFound } from "next/navigation";
import { blogPosts, getBlogPostBySlug } from "@/data";
import BlogPostClient from "./BlogPostClient";

// Generate static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    notFound();
  }

  // Get recent posts (exclude current post)
  const recentPosts = blogPosts
    .filter(p => p.slug !== slug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return <BlogPostClient post={post} recentPosts={recentPosts} />;
}
