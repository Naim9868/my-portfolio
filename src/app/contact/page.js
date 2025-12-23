"use client"
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ICON_MAP } from '@/app/utils/constant';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from "emailjs-com";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);

  const [contactData, setContactData] = useState({
    title: '',
    description: "",
    contactMethods: [],
    formEnabled: true,
    emailService: {},
    enabled: true
  });

  const { contactMethods, description, emailService, title, enabled, formEnabled } = contactData;

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('/api/admin/contact');
      const data = await response.json();
      console.log(data);
      if (data) {
        setContactData(data);
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  const [footerData, setFooterData] = useState({
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
      });
   
      const { socialLinks } = footerData;
      
      
  
      useEffect(() => {
          fetchFooterData();
        }, []);
      
        const fetchFooterData = async () => {
          try {
            const response = await fetch('/api/admin/footer');
            const data = await response.json();
            if (data) {
              setFooterData(prev =>({
                ...prev,
                ...data,
                socialLinks: data?.socialLinks ?? prev.socialLinks
              }));
            }
          } catch (error) {
            console.error('Error fetching footer data:', error);
          }
        };
      





  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    setIsSending(true);
    console.log('Form submitted:', formData);

    //emailjs setup.
    const SERVICE_ID = emailService.serviceId;
    const TEMPLATE_ID = emailService.templateId;
    const PUBLIC_KEY = emailService.publicKey;

    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY)
      .then(
        () => {
          alert("✅ Message sent successfully!");
          setFormData({ name: "", email: "", subject: "", message: "" });
        },
        (error) => {
          alert("❌ Failed to send message. Try again later.");
          // console.error("EmailJS Error:", error);
        }
      )
      .finally(() => setIsSending(false))
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const location =
  {
    icon: <FaMapMarkerAlt />,
    title: 'Location',
    value: 'Dhaka, Bangladesh',
    link: 'https://www.google.com/search?q=location+dhaka+bangladesh&ie=UTF-8'
  }


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen py-20 px-4 mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl  font-bold text-gray-800 dark:text-white mb-8">
              Let's Talk
            </h2>

            <div className="space-y-6 mb-8">
              {contactMethods.map((info, index) => {

                const Icons = ICON_MAP[info.icon];

                if (index > 3) return null;
                return (
                  <motion.a
                    key={index}
                    href={info.link}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                      {Icons && <Icons />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}

              <motion.a
                href={location.link}
                whileHover={{ x: 10 }}
                className="flex items-center space-x-4 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  {location.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {location.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {location.value}
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Social Links */}
            <div className='pb-10'>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                Follow Me
              </h3>
              <div className="flex space-x-4">
                {
                  socialLinks.map((social, index) => {

                    const SocialIcon = ICON_MAP[social.icon]

                    return (
                      <motion.a
                        key={index}
                        href={socialLinks.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="group relative w-12 h-12 flex ml-10 items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/25"
                      >
                        {SocialIcon && <SocialIcon className="text-xl relative z-10 group-hover:text-white transition-colors duration-300" />}
                        <div className="absolute inset-0 bg-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                       
                        <div className="absolute top-12 px-2 py-1 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
                          {social.platform}
                        </div>
                      </motion.a>
                    )
                  })
                }
                
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-6 pt-7">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
                  placeholder="Project Discussion"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSending ? "Sending..." : "Send Message"}
                <FaPaperPlane />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;