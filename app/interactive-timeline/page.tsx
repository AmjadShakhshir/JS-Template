"use client"

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Code, 
  Briefcase,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  Zap
} from "lucide-react";
import TransitionPage from "@/components/transition-page";

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  organization: string;
  location: string;
  type: 'work' | 'education' | 'project' | 'achievement';
  description: string;
  technologies?: string[];
  achievements?: string[];
  link?: string;
  expanded?: boolean;
}

const timelineData: TimelineEvent[] = [
  {
    id: "current",
    date: "2024 - Present",
    title: "Senior Full Stack Developer",
    organization: "Tech Innovations Inc.",
    location: "Remote",
    type: "work",
    description: "Leading development of scalable web applications using React, Node.js, and cloud technologies. Mentoring junior developers and architecting robust solutions for enterprise clients.",
    technologies: ["React", "Node.js", "TypeScript", "AWS", "MongoDB", "Docker"],
    achievements: [
      "Reduced application load time by 40%",
      "Led team of 5 developers",
      "Implemented CI/CD pipeline",
      "Migrated legacy systems to modern architecture"
    ]
  },
  {
    id: "portfolio-launch",
    date: "December 2024",
    title: "Portfolio Website Launch",
    organization: "Personal Project",
    location: "Global",
    type: "project",
    description: "Built this modern portfolio website using React 19, Next.js, and cutting-edge web technologies. Features interactive components, animations, and responsive design.",
    technologies: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    achievements: [
      "100% Lighthouse performance score",
      "Fully responsive design",
      "Interactive components",
      "Modern animations"
    ],
    link: "#"
  },
  {
    id: "prev-role",
    date: "2022 - 2024",
    title: "Full Stack Developer",
    organization: "Digital Solutions LLC",
    location: "New York, NY",
    type: "work",
    description: "Developed and maintained multiple client projects ranging from e-commerce platforms to SaaS applications. Collaborated with design teams to implement pixel-perfect UIs.",
    technologies: ["React", "Vue.js", "Express.js", "PostgreSQL", "Redis"],
    achievements: [
      "Delivered 15+ successful projects",
      "Increased client satisfaction by 25%",
      "Optimized database queries",
      "Mentored 3 junior developers"
    ]
  },
  {
    id: "certification",
    date: "2023",
    title: "AWS Certified Solutions Architect",
    organization: "Amazon Web Services",
    location: "Online",
    type: "achievement",
    description: "Earned AWS Solutions Architect certification, demonstrating expertise in cloud architecture and deployment strategies.",
    achievements: [
      "Cloud architecture design",
      "Security best practices",
      "Cost optimization",
      "Scalability planning"
    ]
  },
  {
    id: "education",
    date: "2018 - 2022",
    title: "Bachelor of Computer Science",
    organization: "University of Technology",
    location: "Boston, MA",
    type: "education",
    description: "Graduated with honors, focusing on software engineering and web development. Active in coding clubs and hackathons.",
    achievements: [
      "Summa Cum Laude (GPA: 3.9/4.0)",
      "President of Coding Club",
      "Won 3 hackathon competitions",
      "Published research paper on web optimization"
    ]
  },
  {
    id: "first-internship",
    date: "Summer 2021",
    title: "Software Engineering Intern",
    organization: "StartupTech",
    location: "San Francisco, CA",
    type: "work",
    description: "Contributed to the development of a mobile application using React Native. Gained hands-on experience with agile development methodologies.",
    technologies: ["React Native", "JavaScript", "Firebase", "Git"],
    achievements: [
      "Developed 5 mobile app features",
      "Reduced app crash rate by 30%",
      "Implemented user authentication",
      "Received offer for full-time position"
    ]
  }
];

const InteractiveTimelinePage = () => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>('all');

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'work': return <Briefcase className="w-5 h-5" />;
      case 'education': return <GraduationCap className="w-5 h-5" />;
      case 'project': return <Code className="w-5 h-5" />;
      case 'achievement': return <Award className="w-5 h-5" />;
      default: return <Calendar className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'work': return 'from-blue-500 to-cyan-500';
      case 'education': return 'from-green-500 to-emerald-500';
      case 'project': return 'from-purple-500 to-violet-500';
      case 'achievement': return 'from-orange-500 to-red-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const filteredData = filter === 'all' 
    ? timelineData 
    : timelineData.filter(item => item.type === filter);

  return (
    <>
      <TransitionPage />
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 p-4 pb-20">
        <div className="max-w-4xl mx-auto pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold gradient-text mb-4">
              Interactive Career Timeline
            </h1>
            <p className="text-gray-300 text-lg mb-8">
              Explore my professional journey through an interactive timeline
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { key: 'all', label: 'All', icon: <Calendar className="w-4 h-4" /> },
                { key: 'work', label: 'Work', icon: <Briefcase className="w-4 h-4" /> },
                { key: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
                { key: 'project', label: 'Projects', icon: <Code className="w-4 h-4" /> },
                { key: 'achievement', label: 'Achievements', icon: <Award className="w-4 h-4" /> }
              ].map((filterOption) => (
                <button
                  key={filterOption.key}
                  onClick={() => setFilter(filterOption.key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    filter === filterOption.key
                      ? 'bg-primary text-white'
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                  }`}
                >
                  {filterOption.icon}
                  {filterOption.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-purple-500 to-pink-500"></div>

            <div className="space-y-8">
              <AnimatePresence>
                {filteredData.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-20"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-6 w-5 h-5 rounded-full bg-gradient-to-r ${getTypeColor(item.type)} border-4 border-gray-900 shadow-lg`}>
                    </div>

                    {/* Content Card */}
                    <motion.div
                      className="bg-gray-800/50 backdrop-blur-lg rounded-xl border border-gray-700 p-6 hover:border-gray-600 transition-colors cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => toggleExpanded(item.id)}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-gradient-to-r ${getTypeColor(item.type)}`}>
                            {getIcon(item.type)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white">{item.title}</h3>
                            <p className="text-primary font-medium">{item.organization}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-400 mb-1">{item.date}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-300 mb-4">{item.description}</p>

                      {/* Technologies */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.technologies.map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-primary/20 text-primary rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Expand/Collapse Button */}
                      <div className="flex items-center justify-between">
                        {item.link && (
                          <a
                            href={item.link}
                            className="flex items-center gap-1 text-primary hover:text-primary/80 text-sm"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                            View Project
                          </a>
                        )}
                        <button className="flex items-center gap-1 text-gray-400 hover:text-white text-sm">
                          {expandedItems.includes(item.id) ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Show Less
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Show More
                            </>
                          )}
                        </button>
                      </div>

                      {/* Expanded Content */}
                      <AnimatePresence>
                        {expandedItems.includes(item.id) && item.achievements && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-4 border-t border-gray-700"
                          >
                            <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-primary" />
                              Key Achievements
                            </h4>
                            <ul className="space-y-2">
                              {item.achievements.map((achievement, idx) => (
                                <motion.li
                                  key={idx}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center gap-2 text-gray-300 text-sm"
                                >
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  {achievement}
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Summary Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {timelineData.filter(item => item.type === 'work').length}
              </div>
              <div className="text-sm text-gray-400">Work Experiences</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {timelineData.filter(item => item.type === 'project').length}
              </div>
              <div className="text-sm text-gray-400">Major Projects</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-primary mb-1">
                {timelineData.filter(item => item.type === 'achievement').length}
              </div>
              <div className="text-sm text-gray-400">Achievements</div>
            </div>
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-700 text-center">
              <div className="text-2xl font-bold text-primary mb-1">6+</div>
              <div className="text-sm text-gray-400">Years Experience</div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default InteractiveTimelinePage;
