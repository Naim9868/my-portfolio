// components/AnimatedProjects.jsx
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function AnimatedProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [projectsData, setProjectsData] = useState({
    projects: [],
    enabled: true,
    showAllButton: true
  });
  
  useEffect(() => {
    setIsVisible(true);
    setIsMobile(window.innerWidth < 768);
    fetchProjectsData();
  }, []);

  const fetchProjectsData = async () => {
  try {
    const response = await fetch('/api/admin/projects');

    if (!response.ok) {
      console.error('API error:', response.status);
      return;
    }

    const text = await response.text();
    if (!text) {
      console.warn('Empty API response');
      return;
    }

    const data = JSON.parse(text);
    
    setProjectsData(prev => ({
      ...prev,
      ...data,
      projects: data?.projects ?? prev.projects
    }));

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const { projects } = projectsData;


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
    <div className="min-h-[1vh] w-full bg-transparent flex items-center justify-center p-8 py-16">
      <div className="w-full max-w-6xl sm:ml-5 sm:p-8 md:p-10 bg-transparent">
        
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="overflow-hidden">
            <h2 className={` text-blue-400 mb-5
              text-2xl lg:text-5xl md:text-3xl font-bold
              transform transition-all duration-1000 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
            `}>
              Featured Projects
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <p className={`
                text-xs md:text-xl text-[#c0cef3] font-['courgette']
                transform transition-all duration-1000 delay-400 ease-out
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
              `}>
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </div>
        </div>

        {/* Projects Grid - Optimized for Mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => {
            if(index > 5) return null;

          return (
            <div
              key={project.id}
              className={`
                space-y-3 border border-blue-300 rounded-xl p-4 md:p-6 shadow-xl shadow-gray-400/30 
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
              <div className="overflow-hidden rounded-lg shadow-xl shadow-right  shadow-gray-400/30">
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
          )})}
        </div>

        {/* View More Projects Button */}
        <div className="text-center mt-8 md:mt-12">
          <button className="px-6 py-3 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400/10 transition-all duration-300 transform hover:scale-105">
          
            <Link href="/projects" >  View All Projects</Link>
          </button>
        </div>
      </div>
    </div>
  );
}