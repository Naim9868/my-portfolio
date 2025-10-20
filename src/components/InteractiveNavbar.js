'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaBolt, FaEnvelope } from 'react-icons/fa';
import HexagonalLogo from './HexagonalLogo';
import Link from 'next/link';
import * as THREE from 'three';

// Main Navbar Component
const InteractiveNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const mobileMenuRef = useRef(null);

  const menuItems = [
     { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'about', label: 'About', icon: <FaUser /> },
    { id: 'projects', label: 'Projects', icon: <FaBriefcase /> },
    { id: 'skills', label: 'Skills', icon: <FaBolt /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
  ];


// Handle click outside to close mobile menu
useEffect(() => {
  const handleClickOutside = (event) => {
    if (mobileMenuRef.current && 
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest('button[class*="p-2"]')) {
      setMenuVisible(false);
    }
  };

  if (menuVisible && isMobile) {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }
}, [menuVisible, isMobile]);

  // Handle menu item click (for mobile)
const handleMenuItemClick = () => {
  if (isMobile) {
    setMenuVisible(!menuVisible);
  }
};

// Toggle menu with event stop propagation
const toggleMenu = (event) => {
  // event?.stopPropagation();
  setMenuVisible(!menuVisible);
};

  useEffect(() => {
    // Check mobile device
    const checkMobile = () => {
      if(window.innerWidth < 768){
        setIsMobile(true);
      }else{
        setIsMobile(false);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initial animations
    const timer1 = setTimeout(() => setIsExpanded(!isExpanded), 100);
    // const timer2 = setTimeout(() => setMenuVisible(!menuVisible), 100);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer1);
      // clearTimeout(timer2);
    };
  }, []);

  const menuVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.1,
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full shadow-xl bg-transparent backdrop-blur-2xl z-50 rounded-2xl  dark:bg-[#0a192f]  border-white/20" >
     
      {/* Navigation Content */}
      <nav className="relative z-10 " >
        <div className={`container mx-auto px-4 transition-all duration-700  ${
          isExpanded ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex items-center space-x-3"
            >
              {/* <div className="w-7 h-7 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold text-lg">N</span>
              </div> */}

              <HexagonalLogo />
              <motion.span 
                className="text-xl font-bold  text-blue-400 bg-clip-text "
                whileHover={{ scale: 1.05 }}
              >
                Naimul Islam
              </motion.span>
            </motion.div>

            {/* Desktop Menu */}
            {!isMobile && (
              <div className="flex bg-transparent backdrop-blur-xl dark:bg-[#0a192f] items-center space-x-0">
                <AnimatePresence>
                  {!menuVisible && menuItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      whileHover={{scale: 1.05}}
                      variants={menuVariants}
                      className="relative"
                    >
                      <button
                        onMouseEnter={() => setActiveMenu(item.id)}
                        onMouseLeave={() => setActiveMenu(null)}
                        className="flex items-center space-x-1 px-2 py-1 rounded-lg transition-colors duration-200 hover:bg-black/15 dark:hover:bg-white/15"
                      >
                        {/* <span className="text-xl">{item.icon}</span> */}
                        <span
                        className="font-serif text-blue-400 dark:text-blue-400">
                          <Link  href={`/${index === 0? item.id = "": item.id}`}>{item.label}</Link>
                        </span>
                      </button>
                      
                      {/* Hover effect line */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: activeMenu === item.id ? '100%' : 0 }}
                        className="h-0.5 bg-gradient-to-r from-[#63b3ed] to-[rgb] absolute bottom-0 left-0"
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="p-2 rounded-lg bg-transparent dark:bg-transparent"
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                  <motion.span
                    animate={{ rotate: !menuVisible ? 0 : 45, y: !menuVisible ? 0 : 7 }}
                    className={`block ${menuVisible?"w-6":"w-5" } h-[1px] bg-blue-400 dark:bg-blue-400`}
                  />
                  <motion.span
                    animate={{ opacity: !menuVisible ? 1 : 0 }}
                    className="block w-3.5 h-[1px] bg-blue-400 dark:bg-blue-400"
                  />
                  <motion.span
                    animate={{ rotate: !menuVisible ? 0 : -45, y: !menuVisible ? 0 : -7 }}
                    className={`block ${menuVisible?"w-6":"w-2"} h-[1px] bg-blue-400 dark:bg-blue-400`}
                  />
                </div>
              </motion.button>
            )}

          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobile && (
         <div ref={mobileMenuRef}>
          <AnimatePresence>
            {menuVisible && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{  opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className=" dark:bg-gray-900/90 bg-[rgba(0,0,0,0)]"
              >
                <div className="container mx-0.5 px-2 py-2">
                  <div className="flex flex-col space-y-1">
                    {menuItems.map((item, index) => (
                      
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                         onClick={toggleMenu}
                        className="flex items-center justify-center space-x-3 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                      >
                       <div className='flex items-center justify-between gap-4'>
                         <span className="text-xl text-blue-400">{item.icon}</span>
                        <span
                        className="font-serif text-blue-400 dark:text-blue-400">
                          <Link  
                            href={`/${index === 0? item.id = "": item.id}`}
                            onClick={handleMenuItemClick}
                          >
                            {item.label}
                          </Link>
                        </span>
                       </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
           </div>
        )}

        {/* Progress Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-[1px] bg-blue-400 origin-right"
        />
      </nav>
    </div>
  );
};

export default InteractiveNavbar;