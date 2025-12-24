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
        setFooterData(prev => ({
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
    setIsSending(true);
    console.log('Form submitted:', formData);

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

  const location = {
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
      className="min-h-screen pt-20 pb-12 px-4 md:px-6 lg:px-8 mt-20"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header - Mobile Responsive */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-10 md:mb-16 px-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4 md:mb-6">
            {title}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-2 sm:px-4">
            Have a project in mind? Let&apos;s discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Contact Information - Mobile Responsive */}
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6 md:mb-8 px-2">
              Let&apos;s Talk
            </h2>

            <div className="space-y-4 sm:space-y-6 mb-6 md:mb-8">
              {contactMethods.map((info, index) => {
                if (index > 3) return null;
                const Icons = ICON_MAP[info.icon];

                return (
                  <motion.a
                    key={index}
                    href={info.link}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group w-full"
                  >
                    <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
                      {Icons && <Icons className="text-lg sm:text-xl" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base md:text-lg truncate">
                        {info.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base truncate">
                        {info.value}
                      </p>
                    </div>
                  </motion.a>
                )
              })}

              <motion.a
                href={location.link}
                whileHover={{ x: 10 }}
                className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className="p-2 sm:p-3 bg-blue-100 dark:bg-blue-900 rounded-lg text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center">
                  {location.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-800 dark:text-white text-sm sm:text-base md:text-lg truncate">
                    {location.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm md:text-base truncate">
                    {location.value}
                  </p>
                </div>
              </motion.a>
            </div>

            {/* Social Links - Mobile Responsive */}
            <div className="pb-6 md:pb-10">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-3 md:mb-4 px-2">
                Follow Me
              </h3>
              <div className="flex flex-wrap gap-3 md:gap-4 px-2">
                {socialLinks.map((social, index) => {
                  const SocialIcon = ICON_MAP[social.icon];

                  return (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.platform}
                      className="group relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/25"
                    >
                      {SocialIcon && (
                        <SocialIcon className="text-base sm:text-lg md:text-xl relative z-10 group-hover:text-white transition-colors duration-300" />
                      )}
                      <div className="absolute inset-0 bg-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                      
                      {/* Tooltip for mobile (visible on hover/touch) */}
                      <div className="absolute top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                        {social.platform}
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form - Mobile Responsive */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 pt-4 sm:pt-7 px-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
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
                    className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
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
                    className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
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
                  className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
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
                  rows="4"
                  className="w-full px-4 py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSending ? "Sending..." : "Send Message"}
                <FaPaperPlane className="text-sm sm:text-base" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;