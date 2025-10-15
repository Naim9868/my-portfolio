// components/AnimatedProjects.jsx
'use client';
import Image from 'next/image';
import { Children, useEffect, useState } from 'react';
import { motion, AnimatePresence, px} from 'framer-motion';



export default function AnimatedProjects() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsVisible(true);
    if(window.innerWidth < "668px"){
        setIsMobile(true);
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with real-time inventory management and payment integration.",
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
      description: "Collaborative task management application with real-time updates and team collaboration features.",
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
      description: "AI-powered content generation tool with natural language processing and custom templates.",
      image: "/api/placeholder/400/250",
      technologies: ["Python", "FastAPI", "React", "OpenAI"],
      category: "AI/ML",
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "Fitness Tracking App",
      description: "Mobile fitness application with workout plans, progress tracking, and social features.",
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
      description: "Cryptocurrency blockchain explorer with real-time transaction monitoring and analytics.",
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
      description: "Analytics dashboard for social media management with insights and scheduling capabilities.",
      image: "/api/placeholder/400/250",
      technologies: ["Angular", "D3.js", "Express", "PostgreSQL"],
      category: "Analytics",
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  return (
  <div className=" min-h-[1vh] w-full bg-transparent flex items-center justify-center p-5">
      <div className="mt-20 mb-20 md:mt-[50px] sm:ml-5 sm:p-8 md:p-10 max-w-6xl w-full bg-transparent">
        
        
        {/* Section Header */}
        <div className="text-left lg:space-y-8  md:text-left mt-10 lg:mt-0">
          <div className="overflow-hidden flex gap-2">
            <h2 className={`font-['Ubuntu'] text-[#64ffda] mb-2
            text-2xl  md:text-3xl lg:text-4xl font-bold bg-transparent bg-clip-text 
              transform transition-all duration-1000 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
            `}>
              Featured Projects
            </h2>
            <motion.span
             className="block w-17 sm:w-50 md:w-80 lg:w-120 mt-4.5 h-[0.5px] md:mt-9 bg-[#64ffda]"
            />
          </div>
          
          <div className="overflow-hidden">
            <p className={`
                text-sm md:text-xl lg:text-2xl text-[#64ffda] dark:text-[#64ffda] font-['SUSEMono-thin']
                transform transition-all duration-1000 delay-400 ease-out mb-10
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
              `}>
              Here are some of my recent projects that showcase my skills and passion for development.
            </p>
          </div>
        </div>
         



        {/* Projects Grid */}
       <div className="grid grid-cols-1 grid-rows-6 sm:grid-rows-2 md:grid-rows-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`
                group relative bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 
                overflow-hidden transform transition-all duration-700 ease-out
                hover:scale-105 hover:bg-white/10 hover:border-white/20
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Featured Badge */}
              {project.featured && (
                <div className="absolute top-1.5 md:top-4 right-2 md:right-4 z-10">
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs md:text-sm font-bold rounded-full">
                    Featured
                  </span>
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-13 md:h-45 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <span className="text-white text-xl md:text-2xl font-bold">{project.title.split(' ')[0]}</span>
                </div>

                {/* // Replace the image section with actual images: */}
                    {/* <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />   */}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100  transition-opacity duration-300 flex items-center justify-center space-x-4">
                  <a href={project.liveUrl} className="p-3 group md:h-10 md:w-10 relative bg-white/20 backdrop-blur-sm hover:ring-1 ring-[#64ffda] duration-300 rounded-full hover:bg-white/30 transition-colors">
                    <span className="text-white md:absolute md:inset-0 md:flex md:items-center md:justify-center">🌐</span>
                    <div className=" text-[#64ffda] md:invisible opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      live demo
                    </div>
                  </a>
                  <a href={project.githubUrl} className="p-3 group md:h-10 md:w-10 relative bg-white/20 backdrop-blur-sm hover:ring-1 ring-[#64ffda] duration-300 rounded-full hover:bg-white/30 transition-colors">
                    <span className="text-white md:absolute md:inset-0 md:flex md:items-center md:justify-center">💻</span>
                    <div className=" text-[#64ffda] md:invisible opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      view code
                    </div>
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-3 md:p-6 h-50 md:h-full overflow-auto">
                {/* Category */}
                <div className="mb-1 md:mb-3">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-medium rounded-full">
                    {project.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1 md:mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-white/70 text-sm leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-white/5 text-[#64ffda] text-xs rounded border border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 invisible md:visible">
                  <a 
                    href={project.liveUrl}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-sm font-medium rounded-lg text-center hover:from-green-600 hover:to-blue-600 transition-all transform hover:scale-105"
                  >
                    Live Demo
                  </a>
                  <a 
                    href={project.githubUrl}
                    className="flex-1 px-4 py-2 bg-white/10 text-white text-sm font-medium rounded-lg text-center border border-white/20 hover:bg-white/20 transition-all transform hover:scale-105"
                  >
                    Code
                  </a>
                </div>
              </div>

              {/* Hover Effect Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            </div>
          ))}
        </div>
      </div> 


      {/* Custom Animations */}
      <style jsx>{`
        @keyframes floatIn {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .project-card {
          animation: floatIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}



