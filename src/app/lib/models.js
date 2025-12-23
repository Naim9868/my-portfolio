import mongoose from 'mongoose';

// Social Link Schema
const SocialLinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String,
  color: String,
  enabled: { type: Boolean, default: true }
});

// CTA Button Schema
const CTAButtonSchema = new mongoose.Schema({
  text: String,
  url: String,
  icon: String,
  variant: String
});

// Stat Schema
const StatSchema = new mongoose.Schema({
  number: String,
  label: String
});

//about page schemas
const SkillSchema = new mongoose.Schema({
  name: String,
  level: Number,
  icon: String
});


// Button Schema
const ButtonSchema = new mongoose.Schema({
  text: String,
  url: String,
  icon: String
});

// Project Schema
const ProjectSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  image: String,
  technologies: [String],
  category: String,
  liveUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false }
});

// Contact Method Schema
const ContactMethodSchema = new mongoose.Schema({
  title: String,
  value: String,
  icon: String,
  link: String
});

// Email Service Schema
const EmailServiceSchema = new mongoose.Schema({
  serviceId: String,
  templateId: String,
  publicKey: String
});

// Individual Skill Schema
const SkillItemSchema = new mongoose.Schema({
  name: String,
  icon: String,
  level: { type: Number, min: 0, max: 100 },
  color: String
});

// Skill Category Schema
const SkillCategorySchema = new mongoose.Schema({
  title: String,
  skills: [SkillItemSchema]
});

const AboutPageSchema = new mongoose.Schema({
  subtitle: String,
  description_1: {type: String, default: "Hello! I'm Naim, a passionate full-stack developer with a love for creating beautiful and functional web applications. My journey in web development started 3 years ago, and I've been hooked ever since."},
  description_2: {type: String, default: "I specialize in modern JavaScript frameworks like React and Next.js, and I'm constantly learning new technologies to stay ahead in this rapidly evolving field."},
  description_3: {type: String, default: "When I'm not coding, you can find me exploring new design trends, contributing to open-source projects, or enjoying a good cup of coffee while planning my next project."},
  skills: [SkillSchema],
  stats: [StatSchema]
});

// Individual Component Schemas
const FooterSchema = new mongoose.Schema({
  name: { type: String, default: 'Md. Naimul Islam' },
  tagline: { type: String, default: 'Building amazing web experiences with React and modern technologies. Let\'s create something extraordinary together.' },
  phone: { type: String, default: '+8801521-529868' },
  location: { type: String, default: 'Dhaka, Bangladesh' },
  email: { type: String, default: 'naimislam9868@gmail.com' },
  copyrightText: { type: String, default: 'Designed & Build by N@im' },
  socialLinks: [SocialLinkSchema],
  enabled: { type: Boolean, default: true },
  showPhone: { type: Boolean, default: true },
  showLocation: { type: Boolean, default: true },
  showEmail: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'footer' });

const HeroSchema = new mongoose.Schema({
  name: { type: String, default: 'Naim' },
  title: { type: String, default: 'Full Stack Developer' },
  subtitle: { type: String, default: 'UI/UX Enthusiast' },
  description: { type: String, default: 'Hi! My name is Naimul Islam. Welcome to my page where I\'ve designed to showcase my skills and expertise that I\'ve accumulated over the years. Passionate about creating amazing user experiences with modern technologies. Specialized in React, Node.js, Next.js.' },
  tagline: { type: String, default: 'Student of department of EEE, at Dhaka university of Engineering and Technology.' },
  ctaButtons: [CTAButtonSchema],
  socialLinks: [SocialLinkSchema],
  enabled: { type: Boolean, default: true },
  showScrollIndicator: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'hero' });

const AboutSchema = new mongoose.Schema({
  title: { type: String, default: 'About Me' },
  description: { type: String, default: "Hello! I'm Naim, a passionate full-stack developer with over 2 years of experience creating digital solutions that make a difference." },
  bio: { type: String, default: "I specialize in turning complex problems into simple, beautiful, and intuitive designs. When I'm not coding, you can find me exploring new technologies." },
  imageUrl: { type: String, default: './images/profile pic.jpg' },
  stats: [StatSchema],
  skills: [String],
  buttons: [ButtonSchema],
  aboutPage: AboutPageSchema,
  enabled: { type: Boolean, default: true },
  showImage: { type: Boolean, default: true },
  showStats: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'about' });

const ProjectsSchema = new mongoose.Schema({
  projects: [ProjectSchema],
  enabled: { type: Boolean, default: true },
  showAllButton: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'projects' });

const ContactSchema = new mongoose.Schema({
  title: { type: String, default: 'Get In Touch' },
  description: { type: String, default: "Let's work together! I'm always open to discussing new opportunities and creative projects." },
  contactMethods: [ContactMethodSchema],
  formEnabled: { type: Boolean, default: true },
  emailService: EmailServiceSchema,
  enabled: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'contact' });

// Skills Page Schema
const SkillsSchema = new mongoose.Schema({
  title: { type: String, default: 'Skills & Technologies' },
  subtitle: { type: String, default: 'Technologies and tools I use to bring ideas to life' },
  learningText: { type: String, default: 'I believe in continuous learning and regularly explore new technologies and frameworks to enhance my skills and stay up-to-date with industry trends.' },
  skillCategories: [SkillCategorySchema],
  enabled: { type: Boolean, default: true },
  updatedAt: { type: Date, default: Date.now }
}, { collection: 'skills' });

// User Schema for Admin Authentication
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'editor'], 
    default: 'editor' 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  lastLogin: { 
    type: Date 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, { collection: 'users' });



// Create or get models
const Footer = mongoose.models.Footer || mongoose.model('Footer', FooterSchema);
const Hero = mongoose.models.Hero || mongoose.model('Hero', HeroSchema);
const About = mongoose.models.About || mongoose.model('About', AboutSchema);
const Projects = mongoose.models.Projects || mongoose.model('Projects', ProjectsSchema);
const Contact = mongoose.models.Contact || mongoose.model('Contact', ContactSchema);
const Skills = mongoose.models.Skills || mongoose.model('Skills', SkillsSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export {
  Footer,
  Hero,
  About,
  Projects,
  Contact,
  Skills,
  User
};