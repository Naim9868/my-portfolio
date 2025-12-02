'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome, FaUser, FaBriefcase, FaBolt, FaEnvelope } from 'react-icons/fa';
import HexagonalLogo from './HexagonalLogo';
import Link from 'next/link';

// Main Navbar Component
const InteractiveNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isMedium, setIsMedium] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const mobileMenuRef = useRef(null);

  const menuItems = [
    { id: 'home', label: 'Home', icon: <FaHome /> },
    { id: 'about', label: 'About', icon: <FaUser /> },
    { id: 'projects', label: 'Projects', icon: <FaBriefcase /> },
    { id: 'skills', label: 'Skills', icon: <FaBolt /> },
    { id: 'contact', label: 'Contact', icon: <FaEnvelope /> },
  ];

  // Handle scroll progress and auto-hide navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - windowHeight;
      const progress = (scrollTop / totalScroll) * 100;
      setScrollProgress(progress);

      // Auto-hide navbar logic
      if (scrollTop > lastScrollY && scrollTop > 100) {
        // Scrolling down & past 100px - hide navbar
        setIsNavbarVisible(false);
      } else if (scrollTop < lastScrollY) {
        // Scrolling up - show navbar
        setIsNavbarVisible(true);
      }
      
      setLastScrollY(scrollTop);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial calculation
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

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
      setMenuVisible(false);
    }
  };

  // Toggle menu function
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    // Check screen size
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsMedium(width >= 768 && width < 2140 );
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    // Initial animations
    const timer1 = setTimeout(() => setIsExpanded(true), 100);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      clearTimeout(timer1);
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

  const navbarVariants = {
    visible: {
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    hidden: {
      y: -100,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  // Calculate navbar height based on screen size
  const navbarHeight = isMedium ? 'h-20' : isMobile ? 'h-16': 'h-30' ;


  return (
    <>
      {/* Scrollbar at the top - Always sticky */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700 z-50">
        <motion.div
          className="h-full bg-blue-400 origin-left"
          style={{ width: `${scrollProgress}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 200 }}
        />
      </div>

      {/* Main Navbar */}
      <motion.div
        variants={navbarVariants}
        animate={isNavbarVisible ? "visible" : "hidden"}
        className={`fixed top-1 left-0 w-full shadow-xl  dark:shadow-gray-300/20 bg-transparent backdrop-blur-2xl z-40 rounded-b-2xl dark:bg-transparent border-white/20 shadow-gray-400/20  ${navbarHeight}`}
      >
        {/* Navigation Content */}
        <nav className="relative z-10">
          <div className={`container mx-auto px-4 transition-all duration-700 ${
            isExpanded ? 'translate-x-0' : '-translate-x-full'
          }`}>
            <div className={`flex items-center justify-between ${isMedium ? 'h-20' : 'h-16'}`}>
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="flex items-center space-x-3"
              >
                <HexagonalLogo />
                <motion.span 
                  className={`font-['courgette'] font-bold text-blue-400 bg-clip-text ${
                    isMedium ? 'text-2xl' : 'text-xl'
                  }`}
                  whileHover={{ scale: 1.05 }}
                >
                  Naimul Islam
                </motion.span>
              </motion.div>

              {/* Desktop Menu */}
              {!isMobile && (
                <div className="flex gap-4 bg-transparent backdrop-blur-xl dark:bg-transparent items-center space-x-0">
                  <AnimatePresence>
                    {menuItems.map((item, index) => (
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
                          className="flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 hover:bg-black/15 dark:hover:bg-white/15"
                        >
                          <span className="font-['courgette'] text-blue-400 dark:text-blue-400">
                            <Link href={`/${index === 0 ? "" : item.id}`}>
                              {item.label}
                            </Link>
                          </span>
                        </button>
                        
                        {/* Hover effect line */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: activeMenu === item.id ? '100%' : 0 }}
                          className="h-0.5 bg-gradient-to-r from-[#63b3ed] to-blue-400 absolute bottom-0 left-0"
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
                  onClick={toggleMenu}
                >
                  <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
                    <motion.span
                      animate={{ rotate: menuVisible ? 45 : 0, y: menuVisible ? 7 : 0 }}
                      className={`block w-6 h-[1px] bg-blue-400 dark:bg-blue-400  ${menuVisible ? "w-6" : "w-6"}`}
                    />
                    <motion.span
                      animate={{ opacity: menuVisible ? 0 : 1 }}
                      className="block w-4.5 h-[1px] bg-blue-400 dark:bg-blue-400"
                    />
                    <motion.span
                      animate={{ rotate: menuVisible ? -45 : 0, y: menuVisible ? -7 : 0 }}
                      className={`block w-3 h-[1px] bg-blue-400 dark:bg-blue-400  ${menuVisible ? "w-6" : "w-3"}`}
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
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-700 dark:bg-[#0b0c18] backdrop-blur-lg border-t border-white/20"
                  >
                    <div className="container mx-auto px-4 py-4">
                      <div className="flex flex-col space-y-2">
                        {menuItems.map((item, index) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link 
                              href={`/${index === 0 ? "" : item.id}`}
                              onClick={handleMenuItemClick}
                              className="flex items-center space-x-5 p-2 rounded-lg hover:bg-white/10 transition-colors duration-200"
                            >
                              <span className="text-sm text-blue-400">{item.icon}</span>
                              <span className="font-['courgette'] text-blue-400 text-sm">
                                {item.label}
                              </span>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>
      </motion.div>
    </>
  );
};

export default InteractiveNavbar;