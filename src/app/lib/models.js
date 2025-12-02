// Models for your components
export const componentSchemas = {
  footer: {
    name: String,
    tagline: String,
    phone: String,
    location: String,
    email: String,
    copyrightText: String,
    socialLinks: [
      {
        platform: String,
        url: String,
        icon: String,
        color: String,
        enabled: Boolean
      }
    ],
    enabled: Boolean,
    showPhone: Boolean,
    showLocation: Boolean,
    showEmail: Boolean,
    updatedAt: Date
  },
  
  hero: {
    name: String,
    title: String,
    subtitle: String,
    description: String,
    tagline: String,
    ctaButtons: [
      {
        text: String,
        url: String,
        icon: String,
        variant: String
      }
    ],
    socialLinks: [
      {
        platform: String,
        url: String,
        icon: String
      }
    ],
    enabled: Boolean,
    showScrollIndicator: Boolean,
    updatedAt: Date
  },
  
  about: {
    title: String,
    description: String,
    bio: String,
    imageUrl: String,
    stats: [
      {
        number: String,
        label: String
      }
    ],
    skills: [String],
    buttons: [
      {
        text: String,
        url: String,
        icon: String
      }
    ],
    enabled: Boolean,
    showImage: Boolean,
    showStats: Boolean,
    updatedAt: Date
  },
  
  projects: {
    projects: [
      {
        id: Number,
        title: String,
        description: String,
        image: String,
        technologies: [String],
        category: String,
        liveUrl: String,
        githubUrl: String,
        featured: Boolean
      }
    ],
    enabled: Boolean,
    showAllButton: Boolean,
    updatedAt: Date
  },
  
  contact: {
    title: String,
    description: String,
    contactMethods: [
      {
        title: String,
        value: String,
        icon: String,
        link: String
      }
    ],
    formEnabled: Boolean,
    emailService: {
      serviceId: String,
      templateId: String,
      publicKey: String
    },
    enabled: Boolean,
    updatedAt: Date
  }
};