"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { 
  FaReact, FaNodeJs, FaPython, FaDatabase, 
  FaAws, FaDocker, FaGitAlt, FaFigma,
  FaCode, FaPalette, FaMobile, FaRocket 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiTypescript, 
  SiMongodb, SiPostgresql, SiJavascript 
} from 'react-icons/si';

const SkillsPage = () => {
  const [skillsData, setSkillsData] = useState({
    title: 'Skills & Technologies',
    subtitle: 'Technologies and tools I use to bring ideas to life',
    learningText: 'I believe in continuous learning and regularly explore new technologies and frameworks to enhance my skills and stay up-to-date with industry trends.',
    skillCategories: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/skills');
      const data = await response.json();
      
      if (data) {
        setSkillsData({
          title: data.title || 'Skills & Technologies',
          subtitle: data.subtitle || 'Technologies and tools I use to bring ideas to life',
          learningText: data.learningText || 'I believe in continuous learning...',
          skillCategories: data.skillCategories || []
        });
      }
    } catch (error) {
      console.error('Error fetching skills data:', error);
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
        staggerChildren: 0.1
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

  // Icon mapping
  const iconMap = {
    FaReact: <FaReact />,
    FaNodeJs: <FaNodeJs />,
    FaPython: <FaPython />,
    FaDatabase: <FaDatabase />,
    FaAws: <FaAws />,
    FaDocker: <FaDocker />,
    FaGitAlt: <FaGitAlt />,
    FaFigma: <FaFigma />,
    FaCode: <FaCode />,
    FaPalette: <FaPalette />,
    FaMobile: <FaMobile />,
    FaRocket: <FaRocket />,
    SiNextdotjs: <SiNextdotjs />,
    SiTailwindcss: <SiTailwindcss />,
    SiTypescript: <SiTypescript />,
    SiMongodb: <SiMongodb />,
    SiPostgresql: <SiPostgresql />,
    SiJavascript: <SiJavascript />
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading skills...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-20 px-4"
    >
      <div className="mt-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {skillsData.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {skillsData.subtitle}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                {category.title}
              </h3>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    variants={itemVariants}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-2xl ${skill.color || 'text-blue-400'}`}>
                        {iconMap[skill.icon] || <FaCode />}
                      </div>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        {skill.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-gray-300 dark:bg-gray-600 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className="h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300 w-8">
                        {skill.level}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          variants={itemVariants}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            Always Learning
          </h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {skillsData.learningText}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SkillsPage;