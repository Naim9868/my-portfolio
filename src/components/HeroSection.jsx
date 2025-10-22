// components/AnimatedProfile.jsx
'use client'; // Required for animations in Next.js

import { useEffect, useRef, useState } from 'react';




export default function AnimatedProfile() {
  const [isVisible, setIsVisible] = useState(false);
   const waterRef = useRef(null);



  useEffect(() => {
   
    setIsVisible(true);
  }, []);




  return (
     
    <div className=" h-screen w-full bg-transparent  ">
      <div className="mt-[180px]  md:mt-[20vh] sm:ml-5 sm:p-8 md:p-10 max-w-6xl w-full bg-transparent pl-4 
       ">
        
        {/* Profile Information */}
        <div className="space-y-6 text-left md:text-left md:position-relative top-5">
          <div className="overflow-hidden">
            <div className=' '>
              <p className="text-blue-400 text-shadow-md text-sm -tracking-tighter
               mb-2 font-['italic']
              md:text-2xl
              ">Hi, my name is </p>
            </div>
            <h1 className={` font-['Ubuntu'] font-bold 
              text-3xl bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent
              transform transition-all duration-1000 ease-out
              md:text-7xl
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
            `}>
              Naimul Islam
            </h1>
          </div>

          <div className="overflow-hidden">
            <h2 className={`text-[#aab9e0]
               text-sm md:text-2xl lg:text-3xl dark:text-[#aab9e0] font-serif
              transform transition-all duration-1000 delay-300 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
            `}>
              Full Stack Developer <br /> & <br />
              <div>Student of department of EEE, at</div>
              <div>Dhaka university of Engineering and Technology.</div>
                

            </h2>
          </div>

          <div className="overflow-hidden">
            <p className={`font-['courgette'] text-sm md:text-xl lg:text-xl text-[#c0cef3
              dark:text-[#c0cef3] leading-relaxed text-shadow-md
              transform transition-all duration-1000 delay-500 ease-out
              ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}
            `}>
              Hi! My name is Naimul Islam. Welcome to my page where I've designed to showcase my skills and expertise that I've accumulated over the years.
              Passionate about creating amazing user experiences with modern technologies.
              Specialized in React, Node.js, Next.js.
            </p>
          </div>

          {/* Animated skills tags */}
          <div className="flex flex-wrap gap-2 bg-transparent p-2 overflow-hidden">
            {['React', 'Next.js', 'Node.js','JavaScript','Tailwind', 'CSS' ].map((skill, index) => (
              <span
                key={skill}
                className={`px-4 py-1 ring-1 ring-blue-400 text-sm md:text-md lg:text-lg
              backdrop-blur-sm text-[#aab9e0] bg-[#0a192f] rounded-full font-semibold border-1-solid border-blue-400
               transition-all transform hover:translate-y-[-2px] hover:translate-x-[-2px] 
                shadow-[4px_5px_#64ffda]`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
    
  );
}