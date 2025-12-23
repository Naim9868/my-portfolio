import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { Skills } from '@/app/lib/models';

// GET: Fetch skills data
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
    
    let skills = await Skills.findOne();
    
    // If no skills exist, create default structure
    if (!skills) {
      const defaultSkills = {
        title: 'Skills & Technologies',
        subtitle: 'Technologies and tools I use to bring ideas to life',
        learningText: 'I believe in continuous learning and regularly explore new technologies and frameworks to enhance my skills and stay up-to-date with industry trends.',
        skillCategories: [
          {
            title: 'Frontend',
            skills: [
              { name: 'React', icon: 'FaReact', level: 90, color: 'text-blue-400' },
              { name: 'Next.js', icon: 'SiNextdotjs', level: 85, color: 'text-black dark:text-white' },
              { name: 'TypeScript', icon: 'SiTypescript', level: 80, color: 'text-blue-600' },
              { name: 'JavaScript', icon: 'SiJavascript', level: 95, color: 'text-yellow-400' },
              { name: 'Tailwind CSS', icon: 'SiTailwindcss', level: 90, color: 'text-cyan-400' },
            ]
          },
          {
            title: 'Backend',
            skills: [
              { name: 'Node.js', icon: 'FaNodeJs', level: 85, color: 'text-green-500' },
              { name: 'Python', icon: 'FaPython', level: 75, color: 'text-yellow-500' },
              { name: 'MongoDB', icon: 'SiMongodb', level: 80, color: 'text-green-600' },
              { name: 'PostgreSQL', icon: 'SiPostgresql', level: 70, color: 'text-blue-700' },
            ]
          },
          {
            title: 'Tools & Others',
            skills: [
              { name: 'Git', icon: 'FaGitAlt', level: 90, color: 'text-orange-500' },
              { name: 'Docker', icon: 'FaDocker', level: 70, color: 'text-blue-500' },
              { name: 'AWS', icon: 'FaAws', level: 65, color: 'text-orange-400' },
              { name: 'Figma', icon: 'FaFigma', level: 75, color: 'text-purple-500' },
            ]
          }
        ],
        enabled: true
      };
      
      skills = await Skills.create(defaultSkills);
    }
    
    return NextResponse.json(skills);
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      { error: 'Failed to fetch skills data', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Update skills data
export async function POST(request) {
  try {

    // // Check authentication
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
    
    const skills = await Skills.findOneAndUpdate(
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
      message: 'Skills updated successfully',
      data: skills
    });
  } catch (error) {
    console.error('Error updating skills:', error);
    return NextResponse.json(
      { error: 'Failed to update skills data', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a skill category
export async function DELETE(request) {
  try {
    await dbConnect();
    const { categoryIndex } = await request.json();
    
    const skills = await Skills.findOne();
    
    if (!skills) {
      return NextResponse.json(
        { error: 'Skills data not found' },
        { status: 404 }
      );
    }
    
    // Filter out the category to delete
    const updatedCategories = skills.skillCategories.filter(
      (_, index) => index !== categoryIndex
    );
    
    skills.skillCategories = updatedCategories;
    skills.updatedAt = new Date();
    await skills.save();
    
    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
      data: skills
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Failed to delete category', details: error.message },
      { status: 500 }
    );
  }
}