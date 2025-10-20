// components/AnimatedProjects.jsx
'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    setIsMobile(window.innerWidth < 768);
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "Full-stack e-commerce with real-time inventory and payment integration.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Full Stack",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "Collaborative task management with real-time updates.",
      image: "/api/placeholder/400/250",
      technologies: ["Vue.js", "Firebase", "Tailwind", "PWA"],
      category: "Frontend",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 3,
      title: "AI Content Generator",
      description: "AI-powered content generation with NLP and templates.",
      image: "images/image_1.png",
      technologies: ["Python", "FastAPI", "React", "OpenAI"],
      category: "AI/ML",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "Fitness Tracking App",
      description: "Mobile fitness app with workout plans and progress tracking.",
      image: "/api/placeholder/400/250",
      technologies: ["React Native", "GraphQL", "Node.js", "MongoDB"],
      category: "Mobile",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "Blockchain Explorer",
      description: "Cryptocurrency explorer with real-time analytics.",
      image: "/api/placeholder/400/250",
      technologies: ["Next.js", "Ethereum", "Web3", "Chart.js"],
      category: "Web3",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 6,
      title: "Social Media Dashboard",
      description: "Analytics dashboard with insights and scheduling.",
      image: "/api/placeholder/400/250",
      technologies: ["Angular", "D3.js", "Express", "PostgreSQL"],
      category: "Analytics",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  // Fallback component for missing images
  const ImageWithFallback = ({ src, alt, className, fallbackText }) => {
    const [imgError, setImgError] = useState(false);
    
    if (imgError || !src || src === '/api/placeholder/400/250') {
      return (
        <div className={`${className} bg-gradient-to-br from-blue-400/10 to-purple-500/10 flex items-center justify-center rounded-lg`}>
          <span className="text-blue-400 text-sm font-bold text-center p-2">
            {fallbackText || alt || 'Project Image'}
          </span>
        </div>
      );
    }

    return (
      <img 
        src={src} 
        alt={alt}
        className={className}
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <div className="min-h-[1vh] w-full bg-transparent flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl bg-transparent">
        
        {/* Section Header */}
        <div className="text-left mb-8 md:mb-12">
          <div className="overflow-hidden">
            <h2 className={`font-['Ubuntu'] text-blue-400 mb-2
              text-2xl md:text-3xl lg:text-4xl font-bold
              transform transition-all duration-1000 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
            `}>
              Featured Projects
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <p className={`
                text-sm md:text-base text-[#c0cef3] font-['courgette']
                transform transition-all duration-1000 delay-400 ease-out
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
              `}>
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </div>
        </div>

        {/* Projects Grid - Optimized for Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`
                space-y-3 border border-blue-400/50 rounded-xl p-4 md:p-6 
                bg-transparent backdrop-blur-sm transform transition-all duration-500 ease-out
                hover:border-blue-400 hover:bg-blue-400/5
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 75}ms` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="overflow-hidden">
                  <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold rounded-full">
                    Featured
                  </span>
                </div>
              )}

              {/* Project Image - Smaller on Mobile */}
              <div className="overflow-hidden rounded-lg border border-blue-400/30">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  fallbackText={project.title.split(' ')[0]}
                  className="w-full h-32 md:h-40 object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Category */}
              <div className="overflow-hidden">
                <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full border border-blue-400/30">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <div className="overflow-hidden">
                <h3 className="text-lg md:text-xl font-bold text-white line-clamp-1 hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
              </div>

              {/* Description - Shorter for Mobile */}
              <div className="overflow-hidden">
                <p className="text-white/80 text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3">
                  {project.description}
                </p>
              </div>

              {/* Technologies - Compact on Mobile */}
              <div className="overflow-hidden">
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {project.technologies.slice(0, isMobile ? 3 : 4).map((tech) => (
                    <span 
                      key={tech} 
                      className="px-1.5 py-0.5 md:px-2 md:py-1 bg-white/5 text-blue-400 text-xs rounded border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > (isMobile ? 3 : 4) && (
                    <span className="px-1.5 py-0.5 md:px-2 md:py-1 bg-white/5 text-blue-400 text-xs rounded border border-white/20">
                      +{project.technologies.length - (isMobile ? 3 : 4)}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons - Stacked on Mobile */}
              <div className="overflow-hidden flex flex-col sm:flex-row gap-2 p-2">
                <a 
                  href={project.liveUrl}
                  className="flex-1 px-3 py-2 bg-gradient-to-r from-[#0a192f] to-blue-500 text-white text-xs md:text-sm font-medium rounded-lg text-center hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105 border border-transparent hover:border-white/20"
                >
                  Live Demo
                </a>
                <a 
                  href={project.githubUrl}
                  className="flex-1 px-3 py-2 bg-white/10 text-white text-xs md:text-sm font-medium rounded-lg text-center border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105"
                >
                  Code
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View More Projects Button */}
        <div className="text-center mt-8 md:mt-12">
          <button className="px-6 py-3 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </div>
  );
}