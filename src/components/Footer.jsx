import React from 'react';
import Footer_2 from './Footer_2';
import { 
  FaGithub, 
  FaLinkedin, 
  FaWhatsapp, 
  FaFacebook, 
  FaTwitter,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Social media links (replace with your actual links)
  const socialLinks = {
    github: 'https://github.com/Naim9868',
    linkedin: 'https://linkedin.com/in/md-naimul-islam',
    whatsapp: 'https://wa.me/+8801521529868',
    facebook: 'https://facebook.com/naim-islam',
    twitter: 'https://twitter.com/yourusername'
  };

  const handleEmailClick = () => {
    const email = 'naimislam9868@gmail.com';
  };

  const handlePhoneClick = () => {
    window.location.href = 'tel:+88801521529868';
  };

  return (
    <footer className="bg-transparent">
      {/* Main Footer Content */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid grid-cols-1 md:grid-cols-4  gap-12">
          
          {/* Company/Personal Info */}
          <div className="md:col-span-2">
            <h3 className="text-xl font-bold text-blue-400 mb-4 relative pb-2">
               Md. Naimul Islam
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-blue-400"></span>
            </h3>
            <p className="text-[#c0cef3] font-['courgette'] mb-6 leading-relaxed">
              Building amazing web experiences with React and modern technologies. 
              Let's create something extraordinary together.
            </p>
            <div className="space-y-3">
              <div 
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300"
                onClick={handleEmailClick}
              >
                  <Footer_2 />
              </div>
              <div 
                className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300"
                onClick={handlePhoneClick}
               >
                   <FaPhone className="text-blue-400 text-lg" />
                   <span>+880 1521-529868</span>
                </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <FaMapMarkerAlt className="text-blue-400 text-lg" />
                <span>Dhaka, Bangladesh</span>
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
              {/* GitHub */}
              <a 
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative w-12 h-12 flex items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400/25"
              >
                <FaGithub className="text-xl relative z-10 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 bg-blue-400 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>

              {/* LinkedIn */}
              <a 
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="group relative w-12 h-12 flex items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0077b5]/25"
              >
                <FaLinkedin className="text-xl relative z-10 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 bg-[#0077b5] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>

              {/* WhatsApp */}
              <a 
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="group relative w-12 h-12 flex items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#25D366]/25"
              >
                <FaWhatsapp className="text-xl relative z-10 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 bg-[#25D366] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>

              {/* Facebook */}
              <a 
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="group relative w-12 h-12 flex items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#4267B2]/25"
              >
                <FaFacebook className="text-xl relative z-10 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 bg-[#4267B2] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>

              {/* Twitter */}
              <a 
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group relative w-12 h-12 flex items-center justify-center bg-blue-400/10 border-2 border-blue-400 rounded-full text-blue-400 transition-all duration-300 hover:transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1DA1F2]/25"
              >
                <FaTwitter className="text-xl relative z-10 group-hover:text-white transition-colors duration-300" />
                <div className="absolute inset-0 bg-[#1DA1F2] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300"></div>
              </a>
            </div>
        </div>
    </div>
</div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 bg-black/20 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-1 text-[#c0cef3] font-['courgette']">
              <span>&copy; {currentYear} Designed & Build by N@im</span>
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