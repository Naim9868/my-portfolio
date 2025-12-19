import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { About } from '@/app/lib/models';

// GET: Fetch about data
export async function GET() {
  try {
    await dbConnect();
    
    let about = await About.findOne();
    
    if (!about) {
      const defaultAbout = {
        title: 'About Me',
        description: "Hello! I'm Naim, a passionate full-stack developer with over 2 years of experience creating digital solutions that make a difference.",
        bio: "I specialize in turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you can find me exploring new technologies.",
        imageUrl: './images/profile pic.jpg',
        stats: [
          { number: '10+', label: 'Projects Completed' },
          { number: '2+', label: 'Years Experience' },
          { number: '100%', label: 'Client Satisfaction' }
        ],
        skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'Tailwind'],
        buttons: [
          { text: 'Download Resume', url: '/files/resume.pdf', icon: 'FaDownload' },
          { text: 'View Projects', url: '/projects', icon: 'FaProjectDiagram' }
        ],
        enabled: true,
        showImage: true,
        showStats: true
      };
      
      about = await About.create(defaultAbout);
    }
    
    return NextResponse.json(about);
  } catch (error) {
    console.error('Error fetching about:', error);
    return NextResponse.json(
      { error: 'Failed to fetch about data', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Update about data
export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    const about = await About.findOneAndUpdate(
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
      message: 'About section updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Error updating about:', error);
    return NextResponse.json(
      { error: 'Failed to update about data', details: error.message },
      { status: 500 }
    );
  }
}