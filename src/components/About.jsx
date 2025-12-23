// components/AnimatedAbout.jsx
'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaDownload,FaProjectDiagram } from 'react-icons/fa';

export default function AnimatedAbout() {
  const [isVisible, setIsVisible] = useState(false);
  const [aboutData, setAboutData] = useState({
      title: '',
      description: '',
      bio: '',
      imageUrl: '',
      stats: [],
      skills: [],
      buttons: [],
      enabled: true,
      showImage: true,
      showStats: true
    });

  useEffect(() => {
    setIsVisible(true);
    fetchAboutData();
  }, []);

  const fetchAboutData = async()=>{
    try{
      const response = await fetch("/api/admin/about/");
      const data = await response.json();
      if(data){
        setAboutData(prev =>({
          ...prev,
          ...data,
          stats: data?.stats ?? prev.stats,
          skills: data?.skills ?? prev.skills,
          buttons: data?.buttons ?? prev.buttons
        }));
      }
    }catch (error) {
      console.error('Error fetching about data:', error);
    }
  }


  return (
    <div className="min-h-[1vh] w-full dark:bg-transparent flex items-center justify-center p-5 lg:gap-3">
      
      <div className={`mt-[-10px] mb-10 md:mt-[ 0px] sm:ml-5 sm:p-8 md:p-10 max-w-6xl
       w-full bg-transparent 
       grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20"
       `}>
        
        {/* Left Section - Profile Image with Animation */}
        <div className="flex justify-center order-1 md:order-2 items-center p-8">
          <div className="relative w-64 h-64 md:w-80 md:h-80 group">
            {/* The offset frame / border behind image */}
            <div className={`absolute inset-0 rounded-[10px] border border-blue-400 
                            transform translate-x-[-10px] translate-y-[-10px] 
                            transition-all duration-500 ease-in-out
                            group-hover:translate-x-[-10px] group-hover:translate-y-[-10px]
                            group-hover:border-blue-400
                            group-hover:shadow-[0_0_20px_#3b82f6,0_0_40px_#64ffda]
                            -z-10" `}/>

            {/* The image container (on top) */}
            <div className={`relative w-full h-full overflow-hidden rounded-[10px] shadow-lg
                    group-hover:translate-x-2 group-hover:translate-y-2 group-hover:border-blue-400
                    transform transition-all duration-500 ease-in-out
                    `}>
             {aboutData.imageUrl && (
               <img
                src={aboutData.imageUrl}
                alt="Profile"
                className={`w-full h-full object-cover rounded-[10px]
                          opacity-90 group-hover:opacity-100
                          transform transition-all duration-500 ease-in-out
                          `}
              />
             )}
            </div>
          </div>
        </div>




        {/* Right Section - About Content */}
        <div className=" text-left lg:space-y-8  md:text-left mt-10 lg:mt-0 order-2 md:order-1 lg:col-span-2 ">
          {/* Section title */}
         <div className=" flex gap-3 ">
            <h2 className={`font-['Ubuntu'] text-blue-400 mb-2 
            text-2xl  md:text-3xl lg:text-4xl font-bold bg-transparent bg-clip-text 
              transform transition-all duration-1000 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
            `}>
              {aboutData.title} 
               
            </h2>
           {/* <motion.span
              className="block w-30 sm:w-40 md:w-80 lg:w-100 mt-4.5 h-[0.5px] md:mt-9 bg-blue-400"
            />  */}
            
          </div> 

          {/* Main description */}
          <div className="space-y-4 mb-4">
            <div className="overflow-hidden">
              <p className={`
                text-sm md:text-xl lg:text-xl text-gray-400 dark:text-[#c0cef3] font-['courgette']
                transform transition-all duration-1000 delay-200 ease-out
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
              `}>
                {/* Hello! I'm <span className="text-[#64ffda] font-semibold">Naim</span>, a passionate 
                full-stack developer with over <span className="text-[#64ffda]">2 years</span> of experience 
                creating digital solutions that make a difference. */}
                {aboutData.description}
              </p>
            </div>

            <div className="overflow-hidden">
              <p className={`
                text-sm md:text-xl lg:text-xl text-gray-400 dark:text-[#c0cef3] font-['courgette']
                transform transition-all duration-1000 delay-400 ease-out
                ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
              `}>
                {/* I specialize in turning complex problems into simple, beautiful, and intuitive designs. 
                When I'm not coding, you can find me exploring new technologies. */}
                {aboutData.bio}
              </p>
            </div>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-3 md:grid-cols-3 gap-1 md:gap-4 p-1 md:p-0">
            {aboutData.stats.map((stat, index) => (
              <div key={stat.label} className=" p-1 md:p-2 overflow-hidden">
                 {/* text-blue-400 dark:text-[#c0cef3] bg-[#0a192f] */}
                <div className={`px-0 py-3 ring-1 ring-blue-400 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white
              backdrop-blur-sm rounded-lg font-semibold border-1-solid border-blue-400
               transition-all transform hover:translate-y-[-2px] hover:translate-x-[-2px] 
              hover:shadow-[4px_4px_#64ffda]`}>
                  <div className="text-xl sm:text-2xl font-bold">{stat.number}</div>
                  <div className="p-0 text-xs mt-1">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Skills tags */}
          <div className="overflow-hidden pt-2 md:p-0 md:m-0">
            <div className={`
              flex flex-wrap gap-3 p-2
              transform transition-all duration-1000 delay-700 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}>
              {['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'Tailwind'].map((skill) => {
                return (
                 <span 
                  key={skill}
                 className={`px-4 py-1 ring-1 ring-blue-400 text-sm md:text-md lg:text-lg
              backdrop-blur-sm text-[#c0cef3] bg-[#0a192f] rounded-full font-semibold border-1-solid border-blue-400
               transition-all transform hover:translate-y-[-2px] hover:translate-x-[-2px] 
                shadow-[3px_3px_#64ffda]`}
                >
                  {skill}
                </span>
              );
            })}
            </div>
          </div>

          {/* Call to action */}
          <div className="overflow-hidden pt-2">
            <div className={`
              flex gap-4 p-2
              transform transition-all duration-1000 delay-900 ease-out
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}
            `}>
              <button className={`px-4 py-3 ring-1 ring-blue-400
              backdrop-blur-sm text-blue-400 bg-[#0a192f] rounded-lg font-semibold border-1-solid border-blue-400
               transition-all transform hover:translate-y-[-2px] hover:translate-x-[-2px] 
               shadow-none hover:shadow-[4px_5px_#64ffda]`}
               onClick={() => {
                // Replace with your resume link
                window.open(`${aboutData.buttons[0].url}`, '_blank');
               }}>
                Download Resume <FaDownload className='ml-2 inline' />
              </button>

              <button className={`px-4 py-3 ring-1 ring-blue-400
              backdrop-blur-sm text-blue-400 bg-[#0a192f] rounded-lg font-semibold border-1-solid border-blue-400
               transition-all transform hover:translate-y-[-2px] hover:translate-x-[-2px] 
               shadow-none hover:shadow-[4px_5px_#64ffda]`} onClick={() => {
                // Replace with your projects link
                window.open(`${aboutData.buttons[1].url}`, '_blank');
               }}>
                View Projects <FaProjectDiagram className='ml-2 inline' />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes orbFloat {
          0%, 100% {
            transform: scale(1) rotate(0deg);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.1) rotate(180deg);
            opacity: 0.6;
          }
        }

        @keyframes textReveal {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes statPop {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}