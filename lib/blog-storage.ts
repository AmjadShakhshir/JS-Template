import type { BlogPost } from "@/data";

const STORAGE_KEY = 'portfolio_blog_posts';

// Default blog posts data that will be used as initial data
const defaultBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with React 19",
    slug: "building-modern-web-apps-react-19",
    excerpt: "Explore the latest features in React 19 and how they're revolutionizing modern web development.",
    content: `# Building Modern Web Applications with React 19

React 19 brings exciting new features that make building modern web applications more efficient and enjoyable. In this post, we'll explore the key improvements and how to leverage them in your projects.

## New Features in React 19

### 1. Improved Server Components
React 19 enhances Server Components with better performance and simpler APIs. This allows for more efficient server-side rendering and improved SEO.

### 2. Enhanced Concurrent Features
The concurrent features introduced in React 18 have been refined and optimized in React 19, providing smoother user experiences.

### 3. Better DevTools Integration
Debugging React applications has become easier with improved DevTools integration and better error boundaries.

## Getting Started

To start using React 19 in your projects:

\`\`\`bash
npm install react@19 react-dom@19
\`\`\`

## Conclusion

React 19 represents a significant step forward in web development, offering improved performance, better developer experience, and enhanced capabilities for building modern applications.`,
    author: "Amjad Shakhshir",
    publishedAt: "2024-12-15",
    updatedAt: "2024-12-15",
    category: "react",
    tags: ["React", "Web Development", "Frontend", "Modern Development"],
    readTime: 5,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "2",
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    slug: "mastering-typescript-advanced-patterns",
    excerpt: "Deep dive into advanced TypeScript patterns that will make your code more type-safe and maintainable.",
    content: `# Mastering TypeScript: Advanced Patterns and Best Practices

TypeScript has become an essential tool for modern web development. In this comprehensive guide, we'll explore advanced patterns and best practices.

## Advanced Type Patterns

### 1. Conditional Types
Conditional types allow you to create flexible type definitions based on conditions.

\`\`\`typescript
type ApiResponse<T> = T extends string ? string : T extends number ? number : never;
\`\`\`

### 2. Mapped Types
Mapped types let you create new types based on existing ones.

### 3. Template Literal Types
Create precise string types using template literals.

## Best Practices

1. Use strict TypeScript configuration
2. Leverage type guards effectively
3. Implement proper error handling
4. Use utility types when appropriate

## Conclusion

Mastering these advanced TypeScript patterns will significantly improve your development experience and code quality.`,
    author: "Amjad Shakhshir",
    publishedAt: "2024-12-10",
    updatedAt: "2024-12-10",
    category: "typescript",
    tags: ["TypeScript", "Advanced", "Best Practices", "Type Safety"],
    readTime: 8,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  }
];

// Storage functions
export const loadBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') {
    return defaultBlogPosts;
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    } else {
      // Initialize with default posts if nothing in storage
      saveBlogPosts(defaultBlogPosts);
      return defaultBlogPosts;
    }
  } catch (error) {
    console.error('Error loading blog posts from storage:', error);
    return defaultBlogPosts;
  }
};

const saveBlogPosts = (posts: BlogPost[]): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (error) {
    console.error('Error saving blog posts to storage:', error);
  }
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  const posts = loadBlogPosts();
  return posts.find(post => post.slug === slug);
};

export const getRecentPosts = (limit: number = 5): BlogPost[] => {
  const posts = loadBlogPosts();
  return posts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
};
