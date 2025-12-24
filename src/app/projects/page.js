"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { FaExternalLinkAlt, FaGithub, FaArrowLeft, FaArrowRight } from 'react-icons/fa';


//ProjectShowCase
const Page = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentProject, setCurrentProject] = useState(0);
  const [projectsData, setProjectsData] = useState({
    projects: [],
    enabled: true,
    showAllButton: true
  })

  const { projects } = projectsData;

  useEffect(() => {
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

      // console.log(data);

      setProjectsData(prev => ({
        ...prev,
        ...data,
        projects: data?.projects ?? prev.projects
      }));

    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'mobile', label: 'Mobile' }
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const featuredProjects = projects.filter(project => project.featured);

  const nextProject = () => {
  if (!hasFeaturedProjects) return;
  setCurrentProject((prev) => (prev + 1) % featuredProjects.length);
};


 const prevProject = () => {
  if (!hasFeaturedProjects) return;
  setCurrentProject(
    (prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length
  );
};

  const hasFeaturedProjects = featuredProjects.length > 0;
  const activeFeaturedProject = hasFeaturedProjects
    ? featuredProjects[currentProject]
    : null;


  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 py-20 px-4">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            My Projects
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
            A collection of my recent work showcasing my skills in modern web technologies,
            user experience design, and problem-solving capabilities.
          </p>
        </div>

        {/* Featured Projects Carousel */}
        <section className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800 dark:text-white">Featured Work</h2>
            <div className="flex space-x-4">
              <button
                onClick={prevProject}
                disabled={!hasFeaturedProjects}
                className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <FaArrowLeft className="text-slate-600 dark:text-slate-300" />
              </button>
              <button
                onClick={nextProject}
                disabled={!hasFeaturedProjects}
                className="p-3 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
              >
                <FaArrowRight className="text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>

          <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                {activeFeaturedProject?.image &&
                  typeof activeFeaturedProject.image === "string" && (
                    <Image
                      src={
                        activeFeaturedProject.image.startsWith("http")
                          ? activeFeaturedProject.image
                          : `/${activeFeaturedProject.image}`
                      }
                      width={400}
                      height={300}
                      alt={activeFeaturedProject.title || "Project image"}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl font-bold mb-2">{activeFeaturedProject?.title}</h3>
                    <p className="text-blue-200">{activeFeaturedProject?.description}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold">
                    Featured Project
                  </span>
                </div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                  {activeFeaturedProject?.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed">
                  {activeFeaturedProject?.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {activeFeaturedProject?.technologies?.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex space-x-4 pt-4">
                  <a
                    href={activeFeaturedProject?.liveUrl}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={activeFeaturedProject?.githubUrl}
                    className="flex items-center space-x-2 px-6 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <FaGithub />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${activeFilter === filter.id
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-md hover:shadow-lg'
                  }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  {project.image && typeof project.image === "string" && (
                    <Image
                      src={project.image.startsWith("http")
                        ? project.image
                        : `/${project.image}`
                      }
                      width={300}
                      height={200}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />)}

                  {project.featured && (
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        Featured
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <a
                      href={project.liveUrl}
                      className="p-3 bg-white rounded-full hover:scale-110 transition-transform duration-300"
                    >
                      <FaExternalLinkAlt className="text-slate-800" />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 bg-white rounded-full hover:scale-110 transition-transform duration-300"
                    >
                      <FaGithub className="text-slate-800" />
                    </a>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-medium">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-slate-200 dark:border-slate-700">
                    <span className="text-sm text-slate-500 dark:text-slate-400 capitalize">
                      {project.category}
                    </span>
                    <div className="flex space-x-2">
                      <a
                        href={project.liveUrl}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
                      >
                        <FaExternalLinkAlt />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors duration-300"
                      >
                        <FaGithub />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;