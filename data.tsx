import { 
  BookText, 
  Code2, 
  Home, 
  UserRound, 
  Linkedin, 
  Twitter, 
  Github, 
  Mail,
  Briefcase,
  Pencil, 
  Computer, 
  Rocket, 
  Speech,
  Database,
  Smartphone,
  Globe,
  Sparkles,
  Bot,
  TrendingUp,
  Brain,
  Clock,
  Zap,
  Eye,
  PlayCircle,
  Cloud,
  Music,
  Palette,
  BarChart3,
  Copy,
  Bell,
  FileText
} from "lucide-react";

export const personalInfo = {
  name: "Amjad Shakhshir",
  title: "Full Stack Developer",
  tagline: "Building Digital Excellence",
  description: "Achievement-minded full‑stack professional experienced in current web tech, using AI-enhanced workflows to build scalable, design-forward, functional applications.",
  location: "Helsinki, Finland",
  email: "info@amjadshakhshir.com"
};

export const socialNetworks = [
  {
    id: 1,
    name: "LinkedIn",
    logo: <Linkedin size={30} strokeWidth={1} />,
    src: "https://linkedin.com/in/amjadshakhshir",
  },
  {
    id: 2,
    name: "GitHub",
    logo: <Github size={30} strokeWidth={1} />,
    src: "https://github.com/AmjadShakhshir",
  },
  {
    id: 3,
    name: "Twitter",
    logo: <Twitter size={30} strokeWidth={1} />,
    src: "https://x.com/shakhshir_amjad",
  },
  {
    id: 4,
    name: "Email",
    logo: <Mail size={30} strokeWidth={1} />,
    src: "mailto:info@amjadshakhshir.com",
  },
];

export const itemsNavbar = [
  {
    id: 1,
    title: "Home",
    icon: <Home size={25} color="#fff" strokeWidth={1} />,
    link: "/",
  },
  {
    id: 2,
    title: "About",
    icon: <UserRound size={25} color="#fff" strokeWidth={1} />,
    link: "/about-me",
  },
  {
    id: 3,
    title: "Services",
    icon: <BookText size={25} color="#fff" strokeWidth={1} />,
    link: "/services",
  },
  {
    id: 4,
    title: "Portfolio",
    icon: <Code2 size={25} color="#fff" strokeWidth={1} />,
    link: "/portfolio",
  },
  {
    id: 5,
    title: "Blog",
    icon: <FileText size={25} color="#fff" strokeWidth={1} />,
    link: "/blog",
  },
  {
    id: 6,
    title: "Interactive",
    icon: <Sparkles size={25} color="#fff" strokeWidth={1} />,
    link: "/demo-features",
  },
  {
    id: 7,
    title: "Contact",
    icon: <Speech size={25} color="#fff" strokeWidth={1} />,
    link: "/contact",
  },
];

// Interactive Features for quick access
export const interactiveFeatures = [
  {
    id: 1,
    title: "AI Chat",
    icon: <Bot size={20} color="#fff" strokeWidth={1} />,
    link: "/ai-chat",
    description: "Chat with AI assistant"
  },
  {
    id: 2,
    title: "Code Playground",
    icon: <Code2 size={20} color="#fff" strokeWidth={1} />,
    link: "/code-playground",
    description: "Interactive code editor"
  },
  {
    id: 3,
    title: "Live Stats",
    icon: <TrendingUp size={20} color="#fff" strokeWidth={1} />,
    link: "/live-stats",
    description: "Real-time analytics"
  },
  {
    id: 4,
    title: "Skills Quiz",
    icon: <Brain size={20} color="#fff" strokeWidth={1} />,
    link: "/skills-assessment",
    description: "Test your knowledge"
  },
  {
    id: 5,
    title: "Timeline",
    icon: <Clock size={20} color="#fff" strokeWidth={1} />,
    link: "/interactive-timeline",
    description: "Career journey"
  },
  {
    id: 6,
    title: "Animations",
    icon: <Zap size={20} color="#fff" strokeWidth={1} />,
    link: "/advanced-animations",
    description: "Advanced UI effects"
  },
  {
    id: 7,
    title: "Weather",
    icon: <Cloud size={20} color="#fff" strokeWidth={1} />,
    link: "/live-weather",
    description: "Live weather widget"
  },
  {
    id: 8,
    title: "Music",
    icon: <Music size={20} color="#fff" strokeWidth={1} />,
    link: "/spotify-integration",
    description: "Currently playing"
  },
  {
    id: 9,
    title: "Loading States",
    icon: <Eye size={20} color="#fff" strokeWidth={1} />,
    link: "/loading-states",
    description: "Enhanced loading UX"
  },
  {
    id: 10,
    title: "Theme Toggle",
    icon: <Palette size={20} color="#fff" strokeWidth={1} />,
    link: "/theme-toggle",
    description: "Dark/light mode"
  },
  {
    id: 11,
    title: "Scroll Progress",
    icon: <BarChart3 size={20} color="#fff" strokeWidth={1} />,
    link: "/scroll-progress",
    description: "Reading progress"
  },
  {
    id: 12,
    title: "Copy Clipboard",
    icon: <Copy size={20} color="#fff" strokeWidth={1} />,
    link: "/copy-clipboard",
    description: "Easy copying"
  },
  {
    id: 13,
    title: "Notifications",
    icon: <Bell size={20} color="#fff" strokeWidth={1} />,
    link: "/toast-notifications",
    description: "Toast messages"
  },
  {
    id: 14,
    title: "Games",
    icon: <PlayCircle size={20} color="#fff" strokeWidth={1} />,
    link: "/interactive-games",
    description: "Mini-games collection"
  }
];

export const dataAboutPage = [
  {
    id: 1,
    title: "Frontend and Testing Developer",
    subtitle: "Emma Systems Ltd.",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies.",
    date: "2025 - Present",
  },
  {
    id: 2,
    title: "Full Stack Developer",
    subtitle: "Younovel",
    description: "Developed and maintained multiple client projects using modern JavaScript frameworks. Collaborated with design teams to create responsive and user-friendly interfaces.",
    date: "2023 - present",
  },
  {
    id: 3,
    title: "Full Stack bootcamp",
    subtitle: "Integrify",
    description: "Specialized in creating interactive user interfaces and optimizing web performance. Worked with cross-functional teams to deliver high-quality digital experiences.",
    date: "2023 - 2024",
  },
  {
    id: 4,
    title: "Computer Science Master",
    subtitle: "University of Debrecen",
    description: "Graduated with honors, focusing on software engineering, algorithms, and data structures. Participated in various coding competitions and open-source projects.",
    date: "2023",
  },
];

export const dataCounter = [
  {
    id: 0,
    endCounter: 3,
    text: "Years of Experience",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 1,
    endCounter: 5,
    text: "Happy Clients",
    lineRight: true,
    lineRightMobile: false,
  },
  {
    id: 2,
    endCounter: 10,
    text: "Projects Completed",
    lineRight: true,
    lineRightMobile: true,
  },
  {
    id: 3,
    endCounter: 1,
    text: "Awards Won",
    lineRight: false,
    lineRightMobile: false,
  },
];

export const serviceData = [
  {
    icon: <Computer />,
    title: "Web Development",
    description: "Full-stack web development using modern technologies like React, Node.js, and cloud platforms to create scalable applications.",
  },
  {
    icon: <Smartphone />,
    title: "Mobile Development",
    description: "Cross-platform mobile app development using React Native and Flutter for iOS and Android platforms.",
  },
  {
    icon: <Database />,
    title: "Backend Development",
    description: "Robust backend solutions with APIs, databases, and server architecture using Node.js, Python, and cloud services.",
  },
  {
    icon: <Pencil />,
    title: "UI/UX Design",
    description: "User-centered design approach creating intuitive interfaces and seamless user experiences across all platforms.",
  },
  {
    icon: <Globe />,
    title: "Cloud Solutions",
    description: "Cloud architecture and deployment using AWS, Azure, and Google Cloud Platform for scalable applications.",
  },
  {
    icon: <Rocket />,
    title: "Performance Optimization",
    description: "Website and application optimization for speed, SEO, and user experience to maximize performance and conversion.",
  },
];

// Business Information
export const businessInfo = {
  company: "Shakhshir Digital Solutions",
  tagline: "Transforming Ideas into Digital Excellence",
  description: "A Helsinki-based digital agency specializing in full-stack development, delivering cutting-edge web and mobile solutions that drive business growth and enhance user experience.",
  mission: "To empower businesses with innovative digital solutions that are scalable, efficient, and user-centric.",
  established: "2020",
  location: "Helsinki, Finland",
};

// Business Statistics
export const businessStats = [
  {
    icon: <Briefcase />,
    number: "50+",
    label: "Projects Delivered",
    description: "Successful projects across various industries"
  },
  {
    icon: <Clock />,
    number: "4+",
    label: "Years Experience",
    description: "Professional development experience"
  },
  {
    icon: <TrendingUp />,
    number: "30+",
    label: "Happy Clients",
    description: "Satisfied clients worldwide"
  },
  {
    icon: <Zap />,
    number: "99%",
    label: "Project Success",
    description: "On-time delivery rate"
  }
];

// Pricing Packages
export const pricingPackages = [
  {
    id: 1,
    name: "Starter",
    price: "€1000",
    duration: "Project",
    description: "Perfect for small businesses and startups",
    features: [
      "Responsive website design",
      "Up to 5 pages",
      "Basic SEO optimization",
      "Contact form integration",
      "Mobile optimization",
      "1 month support",
    ],
    popular: false,
    ctaText: "Get Started",
  },
  {
    id: 2,
    name: "Professional",
    price: "€2,500",
    duration: "Project",
    description: "Ideal for growing businesses",
    features: [
      "Custom web application",
      "User authentication",
      "Database integration",
      "API development",
      "Advanced SEO",
      "Analytics integration",
      "3 months support",
      "Performance optimization",
    ],
    popular: true,
    ctaText: "Most Popular",
  },
  {
    id: 3,
    name: "Enterprise",
    price: "custom quote",
    duration: "Project",
    description: "For large-scale applications",
    features: [
      "Full-stack application",
      "Complex backend systems",
      "Third-party integrations",
      "Advanced security",
      "Scalable architecture",
      "DevOps & deployment",
      "6 months support",
      "Training & documentation",
      "Ongoing maintenance",
    ],
    popular: false,
    ctaText: "Contact Us",
  },
];

export const dataPortfolio = [
  {
    id: 1,
    title: "Younovel Academy",
    image: "/portfolio/project-1.svg",
    urlGithub: "",
    urlDemo: "https://younovel.academy",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS", "Express.js"],
    description: "Comprehensive e-learning platform with interactive courses and learning materials.",
  },
  {
    id: 2,
    title: "Task Management App",
    image: "/portfolio/project-2.svg",
    urlGithub: "https://github.com/yourusername/task-manager",
    urlDemo: "https://your-taskmanager-demo.com",
    technologies: ["React", "Firebase", "Material-UI"],
    description: "Collaborative task management application with real-time updates and team collaboration features.",
  },
  {
    id: 3,
    title: "Weather Dashboard",
    image: "/portfolio/project-3.svg",
    urlGithub: "https://github.com/yourusername/weather-dashboard",
    urlDemo: "https://your-weather-demo.com",
    technologies: ["Vue.js", "OpenWeather API", "Chart.js"],
    description: "Interactive weather dashboard with forecasts, charts, and location-based weather data.",
  },
  {
    id: 4,
    title: "Social Media App",
    image: "/portfolio/project-4.svg",
    urlGithub: "https://github.com/yourusername/social-app",
    urlDemo: "https://your-social-demo.com",
    technologies: ["React Native", "Node.js", "Socket.io"],
    description: "Real-time social media application with chat functionality and media sharing capabilities.",
  },
  {
    id: 5,
    title: "Portfolio Website",
    image: "/portfolio/project-5.svg",
    urlGithub: "https://github.com/AmjadShakhshir/JS-Template",
    urlDemo: "https://your-portfolio.com",
    technologies: ["Next.js", "Tailwind CSS", "Framer Motion"],
    description: "Modern portfolio website with smooth animations and responsive design showcasing projects and skills.",
  },
  {
    id: 6,
    title: "Learning Management System",
    image: "/portfolio/project-6.svg",
    urlGithub: "https://github.com/yourusername/lms",
    urlDemo: "https://your-lms-demo.com",
    technologies: ["React", "Express", "PostgreSQL", "JWT"],
    description: "Comprehensive learning management system with course creation, progress tracking, and assessment tools.",
  },
];

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Vue.js", level: 85 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 90 },
      { name: "Python", level: 85 },
      { name: "Express", level: 88 },
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 80 },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git", level: 95 },
      { name: "Docker", level: 78 },
      { name: "AWS", level: 75 },
      { name: "Figma", level: 85 },
      { name: "Jest", level: 80 },
    ],
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Project Manager at TechCorp",
    description: "Amjad delivered an exceptional web application that exceeded our expectations. His attention to detail and technical expertise are outstanding.",
    imageUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO at StartupXYZ",
    description: "Working with Amjad was a fantastic experience. He transformed our ideas into a beautiful, functional platform that our users love.",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Marketing Director",
    description: "The e-commerce platform Amjad built for us increased our sales by 300%. His expertise in both frontend and backend development is impressive.",
    imageUrl: "https://randomuser.me/api/portraits/women/65.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "David Thompson",
    position: "CTO at InnovateLab",
    description: "Amjad's code quality and problem-solving skills are top-notch. He delivered our project on time and within budget.",
    imageUrl: "https://randomuser.me/api/portraits/men/43.jpg",
    rating: 5,
  },
];

export const contactInfo = {
  email: "info@amjadshakhshir.com",
  phone: "+358",
  address: "Helsinki, Finland",
  availability: "Available for freelance projects",
};

// Blog Data
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  category: string;
  tags: string[];
  readTime: number;
  featured: boolean;
  imageUrl: string;
}

export const blogCategories = [
  { id: "web-development", name: "Web Development", color: "#3B82F6" },
  { id: "react", name: "React", color: "#61DAFB" },
  { id: "nextjs", name: "Next.js", color: "#000000" },
  { id: "javascript", name: "JavaScript", color: "#F7DF1E" },
  { id: "typescript", name: "TypeScript", color: "#3178C6" },
  { id: "career", name: "Career", color: "#10B981" },
  { id: "tutorials", name: "Tutorials", color: "#8B5CF6" },
  { id: "insights", name: "Tech Insights", color: "#F59E0B" },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Applications with React 19",
    slug: "building-modern-web-apps-react-19",
    excerpt: "Explore the latest features in React 19 and how they're revolutionizing modern web development.",
    content: `
# Building Modern Web Applications with React 19

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

React 19 represents a significant step forward in web development, offering improved performance, better developer experience, and enhanced capabilities for building modern applications.
    `,
    author: "Amjad Shakhshir",
    publishedAt: "2024-12-15",
    updatedAt: "2024-12-15",
    category: "react",
    tags: ["React", "Web Development", "Frontend", "Modern Development"],
    readTime: 5,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80" // React/Code
  },
  {
    id: "2",
    title: "Mastering TypeScript: Advanced Patterns and Best Practices",
    slug: "mastering-typescript-advanced-patterns",
    excerpt: "Deep dive into advanced TypeScript patterns that will make your code more type-safe and maintainable.",
    content: `
# Mastering TypeScript: Advanced Patterns and Best Practices

TypeScript has become an essential tool for modern web development. In this comprehensive guide, we'll explore advanced patterns and best practices.

## Advanced Type Patterns

### 1. Conditional Types
Conditional types allow you to create flexible type definitions based on conditions.

\`\`\`typescript
type ApiResponse<T> = T extends string ? string : T extends number ? number : never;
\`\`\`

### 2. Mapped Types
Create new types by transforming properties of existing types.

\`\`\`typescript
type Partial<T> = {
  [P in keyof T]?: T[P];
};
\`\`\`

## Best Practices

1. Use strict mode
2. Leverage utility types
3. Create custom type guards
4. Use discriminated unions

## Conclusion

Mastering these advanced TypeScript patterns will significantly improve your code quality and development experience.
    `,
    author: "Amjad Shakhshir",
    publishedAt: "2024-12-10",
    updatedAt: "2024-12-10",
    category: "typescript",
    tags: ["TypeScript", "Advanced Patterns", "Best Practices", "Type Safety"],
    readTime: 8,
    featured: false,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80" // TypeScript/Code
  },
  {
    id: "3",
    title: "The Future of Web Development: Trends to Watch in 2024",
    slug: "future-web-development-trends-2024",
    excerpt: "Discover the emerging trends and technologies that are shaping the future of web development.",
    content: `
# The Future of Web Development: Trends to Watch in 2024

The web development landscape is constantly evolving. Let's explore the key trends that are defining the future of our industry.

## Emerging Trends

### 1. AI-Powered Development
AI tools are revolutionizing how we write code, debug applications, and optimize performance.

### 2. Edge Computing
Moving computation closer to users for improved performance and user experience.

### 3. WebAssembly Growth
WebAssembly is enabling new possibilities for web applications with near-native performance.

### 4. Progressive Web Apps
PWAs continue to bridge the gap between web and native applications.

## What This Means for Developers

- Stay updated with new technologies
- Focus on performance optimization
- Embrace AI-assisted development
- Consider user experience above all

## Conclusion

The future of web development is exciting, with new technologies opening up possibilities we couldn't imagine just a few years ago.
    `,
    author: "Amjad Shakhshir",
    publishedAt: "2024-12-05",
    updatedAt: "2024-12-05",
    category: "insights",
    tags: ["Web Development", "Trends", "Future", "Technology"],
    readTime: 6,
    featured: true,
    imageUrl: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80" // Future/Trends
  }
];

// Blog utility functions
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts.filter(post => post.featured);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts.filter(post => post.category === category);
};

// Note: These functions are deprecated - use the ones from blog-storage.ts instead
// They are kept for backward compatibility but won't have real-time data
