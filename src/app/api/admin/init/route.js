import { NextResponse } from 'next/server';
import dbConnect from '@/app/lib/dbConnect';
import { Footer, Hero, About, Projects, Contact } from '@/app/lib/models';

// POST: Initialize database with default data
export async function POST() {
  try {
    await dbConnect();
    
    const defaultFooter = {
      name: 'Md. Naimul Islam',
      tagline: 'Building amazing web experiences with React and modern technologies. Let\'s create something extraordinary together.',
      phone: '+8801521-529868',
      location: 'Dhaka, Bangladesh',
      email: 'naimislam9868@gmail.com',
      copyrightText: 'Designed & Build by N@im',
      socialLinks: [
        { platform: 'GitHub', url: 'https://github.com/Naim9868', icon: 'FaGithub', color: '#333' },
        { platform: 'LinkedIn', url: 'https://linkedin.com/in/md-naimul-islam', icon: 'FaLinkedin', color: '#0077b5' },
        { platform: 'WhatsApp', url: 'https://wa.me/+8801521529868', icon: 'FaWhatsapp', color: '#25D366' },
        { platform: 'Facebook', url: 'https://facebook.com/naim-islam', icon: 'FaFacebook', color: '#4267B2' },
        { platform: 'Twitter', url: 'https://twitter.com/yourusername', icon: 'FaTwitter', color: '#1DA1F2' }
      ],
      enabled: true,
      showPhone: true,
      showLocation: true,
      showEmail: true
    };
    
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
              { name: 'Frontend Development', level: 90, icon: <FaCode /> },
              { name: 'UI/UX Design', level: 85, icon: <FaPalette /> },
              { name: 'Mobile Development', level: 30, icon: <FaMobile /> },
              { name: 'DevOps & Deployment', level: 80, icon: <FaRocket /> },
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
    
    const defaultContact = {
      title: 'Get In Touch',
      description: "Let's work together! I'm always open to discussing new opportunities and creative projects.",
      contactMethods: [
        { title: 'Email', value: 'naimislam9868@gmail.com', icon: 'FaEnvelope', link: 'mailto:naimislam9868@gmail.com' },
        { title: 'Phone', value: '+8801521-529868', icon: 'FaPhone', link: 'tel:+8801521529868' },
        { title: 'LinkedIn', value: 'in/yourprofile', icon: 'FaLinkedin', link: 'https://linkedin.com' }
      ],
      formEnabled: true,
      emailService: {
        serviceId: 'service_exxu8un',
        templateId: 'template_kwkeo1c',
        publicKey: 'vR1VFMtGTt3fsxQ9f'
      },
      enabled: true
    };
    
    // Create or update all collections
    const [footer, hero, about, projects, contact] = await Promise.all([
      Footer.findOneAndUpdate({}, defaultFooter, { upsert: true, new: true }),
      Hero.findOneAndUpdate({}, defaultHero, { upsert: true, new: true }),
      About.findOneAndUpdate({}, defaultAbout, { upsert: true, new: true }),
      Projects.findOneAndUpdate({}, defaultProjects, { upsert: true, new: true }),
      Contact.findOneAndUpdate({}, defaultContact, { upsert: true, new: true })
    ]);
    
    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      data: { footer, hero, about, projects, contact }
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { error: 'Failed to initialize database', details: error.message },
      { status: 500 }
    );
  }
}

// GET: Check database status
export async function GET() {
  try {
    await dbConnect();
    
    const [footer, hero, about, projects, contact] = await Promise.all([
      Footer.countDocuments(),
      Hero.countDocuments(),
      About.countDocuments(),
      Projects.countDocuments(),
      Contact.countDocuments()
    ]);
    
    return NextResponse.json({
      success: true,
      data: {
        footer: { count: footer, exists: footer > 0 },
        hero: { count: hero, exists: hero > 0 },
        about: { count: about, exists: about > 0 },
        projects: { count: projects, exists: projects > 0 },
        contact: { count: contact, exists: contact > 0 }
      }
    });
  } catch (error) {
    console.error('Error checking database:', error);
    return NextResponse.json(
      { error: 'Failed to check database status', details: error.message },
      { status: 500 }
    );
  }
}