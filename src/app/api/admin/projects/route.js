import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { Projects } from '@/app/lib/models';

// GET: Fetch projects data
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
    
    let projectsData = await Projects.findOne();
    
    if (!projectsData) {
      const defaultProjects = {
        projects: [
          {
            id: 1,
            title: "E-Commerce Platform",
            description: "Full-stack e-commerce with real-time inventory and payment integration.",
            image: "/api/placeholder/400/250",
            technologies: ["React", "Node.js", "MongoDB", "Stripe"],
            category: "Full Stack",
            liveUrl: "#",
            githubUrl: "#",
            featured: true
          },
          {
            id: 2,
            title: "Task Management App",
            description: "Collaborative task management with real-time updates.",
            image: "/api/placeholder/400/250",
            technologies: ["Vue.js", "Firebase", "Tailwind", "PWA"],
            category: "Frontend",
            liveUrl: "#",
            githubUrl: "#",
            featured: false
          }
        ],
        enabled: true,
        showAllButton: true
      };
      
      projectsData = await Projects.create(defaultProjects);
    }
    
    return NextResponse.json(projectsData);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects data', details: error.message },
      { status: 500 }
    );
  }
}

// POST: Update projects data
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
    
    // Ensure unique IDs for projects
    if (data.projects) {
      data.projects = data.projects.map((project, index) => ({
        ...project,
        id: project.id || index + 1
      }));
    }
    
    const updateData = {
      ...data,
      updatedAt: new Date()
    };
    
    const projectsData = await Projects.findOneAndUpdate(
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
      message: 'Projects updated successfully',
      data: projectsData
    });
  } catch (error) {
    console.error('Error updating projects:', error);
    return NextResponse.json(
      { error: 'Failed to update projects data', details: error.message },
      { status: 500 }
    );
  }
}

// PUT: Add a single project
export async function PUT(request) {
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
    const newProject = await request.json();
    
    let projectsData = await Projects.findOne();
    
    if (!projectsData) {
      projectsData = await Projects.create({ projects: [] });
    }
    
    // Add new project with unique ID
    const updatedProjects = [
      ...projectsData.projects,
      {
        ...newProject,
        id: projectsData.projects.length + 1,
        featured: newProject.featured || false
      }
    ];
    
    projectsData.projects = updatedProjects;
    projectsData.updatedAt = new Date();
    await projectsData.save();
    
    return NextResponse.json({
      success: true,
      message: 'Project added successfully',
      data: projectsData
    });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json(
      { error: 'Failed to add project', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Delete a project
export async function DELETE(request) {
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
    const { projectId } = await request.json();
    
    const projectsData = await Projects.findOne();
    
    if (!projectsData) {
      return NextResponse.json(
        { error: 'Projects data not found' },
        { status: 404 }
      );
    }
    
    // Filter out the project to delete
    const updatedProjects = projectsData.projects.filter(
      project => project.id !== projectId
    );
    
    projectsData.projects = updatedProjects;
    projectsData.updatedAt = new Date();
    await projectsData.save();
    
    return NextResponse.json({
      success: true,
      message: 'Project deleted successfully',
      data: projectsData
    });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project', details: error.message },
      { status: 500 }
    );
  }
}