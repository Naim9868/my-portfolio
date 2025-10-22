
"use client"
import { motion } from 'framer-motion';
import { FaCode, FaPalette, FaMobile, FaRocket } from 'react-icons/fa';

const AboutPage = () => {
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

  const skills = [
    { name: 'Frontend Development', level: 90, icon: <FaCode /> },
    { name: 'UI/UX Design', level: 85, icon: <FaPalette /> },
    { name: 'Mobile Development', level: 75, icon: <FaMobile /> },
    { name: 'DevOps & Deployment', level: 80, icon: <FaRocket /> },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-20 px-4"
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
            Passionate developer crafting digital experiences that make a difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-600 dark:text-white mb-6">
              My Journey
            </h2>
            <div className="space-y-4 font-['courgette'] text-gray-400 dark:text-gray-300 leading-relaxed">
              <p>
                Hello! I'm Naim, a passionate full-stack developer with a love for 
                creating beautiful and functional web applications. My journey in 
                web development started 3 years ago, and I've been hooked ever since.
              </p>
              <p>
                I specialize in modern JavaScript frameworks like React and Next.js, 
                and I'm constantly learning new technologies to stay ahead in this 
                rapidly evolving field.
              </p>
              <p>
                When I'm not coding, you can find me exploring new design trends, 
                contributing to open-source projects, or enjoying a good cup of coffee 
                while planning my next project.
              </p>
            </div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 gap-6 mt-8"
            >
              {[
                { number: '50+', label: 'Projects Completed' },
                { number: '3+', label: 'Years Experience' },
                { number: '100%', label: 'Client Satisfaction' },
                { number: '24/7', label: 'Learning Mindset' },
              ].map((stat, index) => (
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
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-blue-600 dark:text-blue-400 text-lg">
                        {skill.icon}
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
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;