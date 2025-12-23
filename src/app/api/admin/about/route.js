import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { About } from '@/app/lib/models';
import { adminAuthMiddleware } from '../middleware';

// GET: Fetch about data
export async function GET() {
  try {

    // Check authentication
    // const auth = await adminAuthMiddleware(request);
    // if (!auth.authorized) {
    //   return NextResponse.json(
    //     { error: auth.error },
    //     { status: 401 }
    //   );
    // }

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
        aboutPage: {
          subtitle: 'Passionate developer crafting digital experiences that make a difference',
          description_1: "Hello! I'm Naim, a passionate full-stack developer with a love for creating beautiful and functional web applications. My journey in web development started 3 years ago, and I've been hooked ever since.",
          description_2: "I specialize in modern JavaScript frameworks like React and Next.js, and I'm constantly learning new technologies to stay ahead in this rapidly evolving field.",
          description_3: "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while planning my next project.",
          skills: [
              { name: 'Frontend Development', level: 90, icon: 'FaCode' },
              { name: 'UI/UX Design', level: 85, icon: 'FaPalette' },
              { name: 'Mobile Development', level: 30, icon: 'FaMobile' },
              { name: 'DevOps & Deployment', level: 80, icon: 'FaRocket' },
            ], 
          stats: [
            { number: '50+', label: 'Projects Completed' },
            { number: '3+', label: 'Years Experience' },
            { number: '100%', label: 'Client Satisfaction' },
            { number: '24/7', label: 'Learning Mindset' }
          ]
        },
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

     // Check authentication
    // const auth = await adminAuthMiddleware(request);
    // if (!auth.authorized) {
    //   return NextResponse.json(
    //     { error: auth.error },
    //     { status: 401 }
    //   );
    // }

    // // Check if user has admin role for write operations
    // if (auth.user.role !== 'admin') {
    //   return NextResponse.json(
    //     { error: 'Insufficient permissions. Admin role required.' },
    //     { status: 403 }
    //   );
    // }

    
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