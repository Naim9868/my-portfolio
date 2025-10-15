'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// 3D Navbar Background Component
// const Navbar3DBackground = ({ isExpanded }) => {
//   const meshRef = useRef();
//   const [hovered, setHovered] = useState(false);
  
//   useFrame((state, delta) => {
//     if (meshRef.current) {
//       // Subtle floating animation
//       meshRef.current.rotation.y += delta * 0.1;
//       meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
      
//       // Expand animation
//       meshRef.current.scale.x = THREE.MathUtils.lerp(
//         meshRef.current.scale.x,
//         isExpanded ? 1 : 0.1,
//         delta * 4
//       );
//     }
//   });

//   return (
//     <mesh
//       ref={meshRef}
//       onPointerOver={() => setHovered(true)}
//       onPointerOut={() => setHovered(false)}
//       scale={[0.1, 1, 1]}
//     >
//       <boxGeometry args={[8, 0.5, 0.2]} />
//       <meshPhysicalMaterial
//         color={hovered ? "#3b82f6" : "#000000"}
//         transparent
//         opacity={0.9}
//         metalness={0.8}
//         roughness={0.2}
//         clearcoat={1}
//         clearcoatRoughness={0.1}
//       />
//     </mesh>
//   );
// };



// Main Navbar Component
const InteractiveNavbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'about', label: 'About', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'skills', label: 'Skills', icon: '⚡' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  useEffect(() => {
    // Check mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Initial animations
    const timer1 = setTimeout(() => setIsExpanded(!isExpanded), 100);
    const timer2 = setTimeout(() => setMenuVisible(!menuVisible), 0);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer1);
      clearTimeout(timer2);
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
    <div className="fixed top-0 left-0 w-full z-50 rounded-2xl  bg-[#0a192f]  border-white/20" >
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 h-20">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          {/* <Navbar3DBackground isExpanded={isExpanded} />
          <FloatingParticles /> */}
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

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
              <div className="w-7 h-7 rounded-full flex items-center justify-center">
                <span className="text-blue-400 font-bold text-lg">N</span>
              </div>
              <motion.span 
                className="text-xl font-bold  text-blue-400 bg-clip-text "
                whileHover={{ scale: 1.05 }}
              >
                Naimul Islam
              </motion.span>
            </motion.div>

            {/* Desktop Menu */}
            {!isMobile && (
              <div className="flex bg-[#0a192f] items-center space-x-0">
                <AnimatePresence>
                  {menuVisible && menuItems.map((item, index) => (
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
                        <span className="font-serif text-gray-700 dark:text-gray-200">
                          {item.label}
                        </span>
                      </button>
                      
                      {/* Hover effect line */}
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: activeMenu === item.id ? '100%' : 0 }}
                        className="h-0.5 bg-gradient-to-r from-[rgb(183,134,84)] to-[rgb] absolute bottom-0 left-0"
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
                className="p-2 rounded-lg bg-black/10 dark:bg-white/10"
                onClick={() => setMenuVisible(!menuVisible)}
              >
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <motion.span
                    animate={{ rotate: menuVisible ? 0 : 45, y: menuVisible ? 0 : 6 }}
                    className="block h-0.5 bg-gray-700 dark:bg-gray-200"
                  />
                  <motion.span
                    animate={{ opacity: menuVisible ? 1 : 0 }}
                    className="block h-0.5 bg-gray-700 dark:bg-gray-200"
                  />
                  <motion.span
                    animate={{ rotate: menuVisible ? 0 : -45, y: menuVisible ? 0 : -6 }}
                    className="block h-0.5 bg-gray-700 dark:bg-gray-200"
                  />
                </div>
              </motion.button>
            )}

          </div>
        </div>

        {/* Mobile Menu Panel */}
        {isMobile && (
          <AnimatePresence>
            {!menuVisible && (
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
                        className="flex items-center space-x-3 p-1 rounded-lg hover:bg-black/10 dark:hover:bg-white/10"
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-serif text-gray-700 dark:text-gray-200">
                          {item.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Progress Indicator */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-0.5 bg-blue-400 origin-left"
        />
      </nav>
    </div>
  );
};

export default InteractiveNavbar;