'use client';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Earth3Dbg from '../components/Earth3Dbg';
import InteractiveNavbar from '../components/InteractiveNavbar';
// import TransparentCard from '@/components/card/TransparentCard';
// import TransparentCard from '@/components/card/TransparentCard_1';
// import AnimatedProfile from '@/components/HeroSection';
import Profile from '@/components/hero1';
import AnimatedAbout from '@/components/About';
import AnimatedProjects from '@/components/Project';
import AnimatedContact from '@/components/Contact'
import Footer from '@/components/Footer';
import { useConstantDark } from '../hooks/useConstantDark';




export default function Home() {

  useConstantDark(); // Ensures dark theme is applied

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading completion
    const timer = setTimeout(() => setIsLoading(false),500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-2xl">Loading Portfolio...</div>
      </div>
    );
  }

  return (
     <>
      <Head>
        <title>3D Earth Background</title>
        <meta name="description" content="3D Earth background using Three.js" />
      </Head>
      
      <Earth3Dbg />
      {/* <InteractiveNavbar /> */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        // color: 'white',
        textAlign: 'center',
        paddingTop: '0',
        // fontFamily: 'Arial, sans-serif'
      }}>
        

        <main>
          <div className="flex flex-col items-center flex-direction-column justify-center">
            <div className="flex-1">
              {/* <AnimatedProfile  /> */}
              <Profile />
            </div>
            <div className="w-full flex-2">
                <AnimatedAbout />
            </div>
              <div className="w-full flex-3">
                 <AnimatedProjects /> 
              </div>
              <div className="w-full  flex-4 ">
                <AnimatedContact />
              </div>
          </div>
        </main>

        <div>
             {/* Footer at the bottom */}
          <Footer />
        </div>
      </div>

  </>
  );
 
}