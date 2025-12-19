import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { Hero } from '@/app/lib/models';

// GET: Fetch hero data
export async function GET() {
  try {
    await dbConnect();
    
    let hero = await Hero.findOne();
    
    if (!hero) {
      const defaultHero = {
        name: 'Naim',
        title: 'Full Stack Developer',
        subtitle: 'UI/UX Enthusiast',
        description: 'Hi! My name is Naimul Islam. Welcome to my page where I\'ve designed to showcase my skills and expertise that I\'ve accumulated over the years. Passionate about creating amazing user experiences with modern technologies. Specialized in React, Node.js, Next.js.',
        tagline: 'Student of department of EEE, at Dhaka university of Engineering and Technology.',
        ctaButtons: [
          { text: 'View My Work', url: '#work', icon: 'FaArrowUpRightFromSquare', variant: 'primary' },
          { text: 'Download CV', url: '/resume.pdf', icon: 'FaDownload', variant: 'secondary' }
        ],
        socialLinks: [
          { platform: 'GitHub', url: 'https://github.com/Naim9868?tab=repositories', icon: 'FaGithub' },
          { platform: 'LinkedIn', url: '#', icon: 'FaLinkedin' },
          { platform: 'Twitter', url: '#', icon: 'FaTwitter' }
        ],
        enabled: true,
        showScrollIndicator: true
      };
      
      hero = await Hero.create(defaultHero);
    }
    
    return NextResponse.json(hero);
  } catch (error) {
    console.error('Error fetching hero:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hero data', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Update hero data
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    const hero = await Hero.findOneAndUpdate(
      {},
      updateData,
      { 
        new: true,
        upsert: true,
        setDefaultsOnInsert: true 
      }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Hero section updated successfully',
      data: hero
    });
  } catch (error) {
    console.error('Error updating hero:', error);
    return NextResponse.json(
      { error: 'Failed to update hero data', details: error.message },
      { status: 500 }
    );
  }
}