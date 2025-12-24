"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
// import { FaCode, FaPalette, FaMobile, FaRocket } from 'react-icons/fa';
import { ICON_MAP } from '@/app/utils/constant';

const AboutPage = () => {
  const [aboutPageData, setAboutPageData] = useState({
    subtitle: 'Passionate developer crafting digital experiences that make a difference',
    description_1: "Hello! I'm Naim, a passionate full-stack developer with a love for creating beautiful and functional web applications. My journey in web development started 3 years ago, and I've been hooked ever since.",
    description_2: "I specialize in modern JavaScript frameworks like React and Next.js, and I'm constantly learning new technologies to stay ahead in this rapidly evolving field.",
    description_3: "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while planning my next project.",
    skills: [
      { name: 'Frontend Development', level: 90, icon: 'FaCode' },
      { name: 'UI/UX Design', level: 85, icon: 'FaPalette' },
      { name: 'Mobile Development', level: 75, icon: 'FaMobile' },
      { name: 'DevOps & Deployment', level: 80, icon: 'FaRocket' }
    ],
    stats: [
      { number: '50+', label: 'Projects Completed' },
      { number: '3+', label: 'Years Experience' },
      { number: '100%', label: 'Client Satisfaction' },
      { number: '24/7', label: 'Learning Mindset' }
    ]
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/admin/about');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // console.log('Fetched about data:', data);
      
      if (data && data.aboutPage) {
        setAboutPageData(prev => ({
          ...prev,
          ...data.aboutPage,
          skills: data.aboutPage?.skills || prev.skills,
          stats: data.aboutPage?.stats || prev.stats
        }));
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
      setError('Failed to load about page content. Using default data.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  // Map icon strings to actual components
  // const iconMap = {
  //   FaCode: <FaCode />,
  //   FaPalette: <FaPalette />,
  //   FaMobile: <FaMobile />,
  //   FaRocket: <FaRocket />
  // };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading about page...</p>
        </div>
      </div>
    );
  }

  if (error && !aboutPageData.description_1) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-xl">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={fetchAboutData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-20 px-4 mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About Me
          </h1>
          <p className="text-xl font-['courgette'] text-gray-500 dark:text-gray-300 max-w-3xl mx-auto">
            {aboutPageData.subtitle || 'Passionate developer crafting digital experiences'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-600 dark:text-white mb-6">
              My Journey
            </h2>
            <div className="space-y-4 font-['courgette'] text-gray-400 dark:text-gray-300 leading-relaxed">
              <p>{aboutPageData.description_1}</p>
              <p>{aboutPageData.description_2}</p>
              <p>{aboutPageData.description_3}</p>
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 mt-8"
            >
              {aboutPageData.stats?.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stat.number}</div>
                  <div className="text-sm font-['courgette'] text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Skills */}
          <motion.div variants={itemVariants}>
            <h3 className="text-2xl font-bold text-gray-600 dark:text-white mb-8">
              My Skills
            </h3>
            <div className="space-y-6">
              {aboutPageData.skills?.map((skill, index) => {
                
                const Icon = ICON_MAP[skill.icon]

                return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600 dark:text-blue-400 text-lg">
                        {Icon && <Icon />}
                      </div>
                      <span className="font-semibold font-['courgette'] text-gray-700 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.2 }}
                      className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                    />
                  </div>
                </motion.div>
              )})}
            </div>
          </motion.div>
        </div>

        {/* Debug button - remove in production */}
        {/* {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <button 
              onClick={fetchAboutData}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors mr-4"
            >
              Reload Data
            </button>
            <button 
              onClick={() => console.log('Current data:', aboutPageData)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Log Data
            </button>
            <pre className="mt-4 text-xs bg-gray-500 p-4 rounded overflow-auto">
              {JSON.stringify(aboutPageData, null, 2)}
            </pre>
          </div>
        )} */}
      </div>
    </motion.div>
  );
};

export default AboutPage;