import React from 'react';
import Footer_2 from './EmailModal';
import { ICON_MAP } from '../app/utils/constant';
import { useState, useEffect } from 'react';
import { FaHeart, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media links (actual links)
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
 
    const { name, tagline, phone, location, email, copyrightText, socialLinks } = footerData;
    
    const FaPhone = ICON_MAP['FaPhone'];

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
    

  const handleEmailClick = () => {
    const Email = email;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <footer className="bg-transparent">
      {/* Main Footer Content */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4  gap-12">
          
          {/* Company/Personal Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-blue-400 mb-4 relative pb-2">
               {name}
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <p className="text-[#c0cef3] font-['courgette'] mb-6 leading-relaxed">
              {tagline}
            </p>
            <div className="space-y-3">
              <div 
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300"
                onClick={handleEmailClick}
              >
                  <Footer_2 Email={email} />
              </div>
              <div 
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300"
                onClick={handlePhoneClick}
               >
                   <FaPhone className="text-blue-400 text-lg" />
                   <span>{phone}</span>
                </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-blue-400 text-lg" />
                <span>{location}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          {/* <div>
            <h3 className="text-xl font-bold text-blue-400 mb-4 relative pb-2">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <ul className="space-y-2">
              {['About', 'Projects', 'Services', 'Blog', 'Contact'].map((link) => (
                <li key={link}>
                  <a 
                    href={`/${link.toLowerCase()}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:pl-2 block"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Social Media */}
        <div className='md:col-span-2'>
            <h3 className="text-xl font-bold text-blue-400 mb-4 relative pb-2">
              Connect With Me
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <p className="text-[#c0cef3] font-['courgette'] mb-6 leading-relaxed">
              Follow me on social media for updates and networking.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {socialLinks.map((social, index) => {

                const SocialIcon = ICON_MAP[social.icon]

                return(
                <a 
                  key={index}
                  href={socialLinks.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="group relative w-12 h-12 flex items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/25"
                >
                  {SocialIcon && <SocialIcon className="text-xl relative z-10 group-hover:text-white transition-colors duration-300" />} 
                  <div className="absolute inset-0 bg-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                </a>
                )
              })}
           
            </div>
        </div>
    </div>
</div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 bg-black/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-[#c0cef3] font-['courgette']">
              <span>&copy; {currentYear} {copyrightText}</span>
              <FaHeart className="text-red-500 animate-pulse" />
              {/* <span>using React & Tailwind CSS</span> */}
            </div>
            {/* <div className="flex space-x-6">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((link) => (
                <a 
                  key={link}
                  href={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-300 text-sm"
                >
                  {link}
                </a>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;