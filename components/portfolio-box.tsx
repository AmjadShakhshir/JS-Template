import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { useState } from "react";

interface PortfolioBoxProps {
  data: {
    id: number;
    title: string;
    image: string;
    urlGithub?: string;
    urlDemo?: string;
    technologies: string[];
    description: string;
  };
}

const PortfolioBox = (props: PortfolioBoxProps) => {
  const { data } = props;
  const { id, title, image, urlDemo, urlGithub, technologies, description } = data;
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <motion.div
      key={id}
      className="p-6 border border-gray-700 rounded-xl glass-morphism group hover:border-primary/50 transition-all duration-300 flex flex-col h-full"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
    >
      {/* Image Section - Fixed height */}
      <div className="relative overflow-hidden rounded-lg mb-4 flex-shrink-0">
        {imageError ? (
          <div className="w-full h-48 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
            <Image
              src="/fallback/project-placeholder.svg"
              alt={`${title} placeholder`}
              width={800}
              height={400}
              className="w-full h-48 object-contain rounded-lg opacity-70"
            />
          </div>
        ) : (
          <Image
            src={image}
            alt={title}
            width={800}
            height={400}
            className="w-full h-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            priority={id <= 3}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWEREiMxUf/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content Section - Expandable */}
      <div className="flex-grow flex flex-col">
        <h3 className="mb-3 text-xl font-bold text-white">{title}</h3>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3 leading-relaxed">{description}</p>

        {/* Technologies - Grows to fill space */}
        <div className="flex flex-wrap gap-2 mb-6 flex-grow">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full h-fit"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons - Always at bottom */}
        <div className="flex gap-3 mt-auto">
          {urlGithub && (
            <Link
              href={urlGithub}
              target="_blank"
              className="flex items-center gap-2 px-4 py-3 text-sm transition duration-150 rounded-lg bg-gray-700 hover:bg-gray-600 text-white font-medium"
            >
              <Github size={16} />
              Code
            </Link>
          )}

          {urlDemo && (
            <Link
              href={urlDemo}
              target="_blank"
              className="flex items-center gap-2 px-4 py-3 text-sm transition duration-150 rounded-lg bg-primary hover:bg-primary/80 text-black font-medium"
            >
              <ExternalLink size={16} />
              Live Demo
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PortfolioBox;
