"use client"
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ICON_MAP } from '@/app/utils/constant'

const Profile = () => {

  const [heroData, setHeroData] = useState({
    name: '',
    title: '',
    subtitle: '',
    description: '',
    tagline: '',
    ctaButtons: [],
    socialLinks: [],
    enabled: true,
    showScrollIndicator: true
  });

  const sateCtaButtons = Array.isArray(heroData.ctaButtons)
    ? heroData.ctaButtons
    : [];

  const safeSocialLinks = Array.isArray(heroData.socialLinks)
    ? heroData.socialLinks
    : [];

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/admin/hero');
      const data = await response.json();

      if (data) {
        setHeroData(prev => ({
          ...prev,
          ...data,
          ctaButtons: data?.ctaButtons ?? prev.ctaButtons,
          socialLinks: data?.socialLinks ?? prev.socialLinks
        }));
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  const { name, title, subtitle, description,
    tagline, ctaButtons, socialLinks, enabled, showScrollIndicator } = heroData;



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

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 mt-30"
    >
      <div className="max-w-4xl mx-auto text-center">
        {/* Profile Image */}
        {/* <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
            <div className="w-full h-full bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <span className="text-2xl font-bold">N</span>
            </div>
          </div>
        </motion.div> */}

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {name}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.div
          variants={itemVariants}
          className="mb-8"
        >
          <div className="text-xl md:text-2xl text-gray-400 dark:text-gray-300 mb-4">
            <span className="font-semibold">{title}</span>
            <span className="mx-4">•</span>
            <span className="font-semibold ">{subtitle}</span>
          </div>
          {/* <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
                I create beautiful, functional, and user-friendly web applications 
                with modern technologies and best practices.
            </p> */}

          <div className="overflow-hidden">
            <h2 className={`text-[#aab9e0]
               text-sm md:text-2xl lg:text-3xl dark:text-[#aab9e0] font-serif
              transform transition-all duration-1000 delay-300 ease-out
             
            `}>
              & <br />
              <div>{tagline}</div>
              <div></div>

            </h2>
          </div>

          <div className="overflow-hidden">
            <p className={`font-['courgette'] text-sm md:text-xl lg:text-xl text-gray-400
              dark:text-gray-400 leading-relaxed text-shadow-md
              transform transition-all duration-1000 delay-500 ease-out
            `}>
              {description}
            </p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          {ctaButtons.map((btn, index) => {

            const IconComponent = ICON_MAP[btn.icon];

            return (
              <motion.a
                key={index}
                href={btn.url}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold flex items-center gap-2
        ${index === 0
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                    : "border-2 border-gray-300 dark:border-gray-600 text-gray-400"
                  }`}
              >
                {btn.text}
                {IconComponent && <IconComponent />}
              </motion.a>
            );
          })}

        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-6"
        >
          {socialLinks.map((social, index) => {
            const IconComponent = ICON_MAP[social.icon];

            if (!IconComponent) return null;

            return (
              <motion.a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                className="p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl
                 text-gray-600 dark:text-gray-300 hover:text-blue-600
                 dark:hover:text-blue-400 transition-all duration-300"
                aria-label={social.platform}
              >
                <IconComponent size={22} />
              </motion.a>
            );
          })}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-15 md:bottom-25 left-1/2 transform -translate-x-1/2"

        ><a href="#hero">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-gray-400 rounded-full mt-2 "
              />
            </motion.div></a>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Profile;