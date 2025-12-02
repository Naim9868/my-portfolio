// components/AnimatedContact.jsx
'use client';

import { useEffect, useState } from 'react';
import { FaEnvelope, FaPhone, FaLinkedin } from 'react-icons/fa';
import emailjs from "emailjs-com";
export default function AnimatedContact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSending, setIsSending] = useState(false);


  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if(window.innerWidth < 668){
        setIsMobile(true);
      }else{
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial size
    return () => {
      window.removeEventListener('resize', handleResize);
    };

  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    console.log('Form submitted:', formData);
    // Add your form submission logic here

    //emailjs setup.
    const SERVICE_ID = "service_exxu8un";
    const TEMPLATE_ID = "template_kwkeo1c";
    const PUBLIC_KEY = "vR1VFMtGTt3fsxQ9f";

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

  const contactMethods = [
    {
      icon: <FaEnvelope />,
      title: 'Email',
      value: 'naimislam9868@gmail.com',
      link: 'https://mail.google.com/mail/?view=cm&fs=1&to=naimislam9868@gmail.com&su=Hello%20Naim&body=Hi,%20I%20want%20to%20connect!'
    },
    {
      icon: <FaPhone />,
      title: 'Phone',
      value: '+8801521-529868',
      link: 'tel:+8801521-529868'
    },
    // {
    //   icon: '📍',
    //   title: 'Location',
    //   value: 'San Francisco, CA',
    //   link: '#'
    // },
    {
      icon: <FaLinkedin />,
      title: 'LinkedIn',
      value: 'in/yourprofile',
      link: 'https://linkedin.com'
    }
  ];

  return (
    <div className="w-full bg-transparent flex  justify-center p-8 py-16">
      <div className="max-w-6xl sm:ml-5 sm:p-8 md:p-10 w-full bg-transparent">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="overflow-hidden">
            <h2 className={`text-2xl lg:text-5xl md:text-3xl font-bold text-blue-400 bg-clip-text  transform transition-all duration-1000 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              Get In Touch
            </h2>
          </div>
          
          <div className="overflow-hidden">
            <p className={`text-xs md:text-xl text-gray-400 font-['courgette'] mt-2 md:mt-4 max-w-2xl mx-auto transform transition-all duration-1000 delay-300 ease-out ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
              Let&apos;s work together! I&apos;m always open to discussing new opportunities and creative projects.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          
          {/* Left Section - Contact Information */}
          {!isMobile && <div className="space-y-4 border border-blue-400 rounded-2xl p-6 md:p-6 ">
            <div className="overflow-hidden">
              <h3 className={`text-xl font-bold text-white mb-0 md:mb-0`}>
                Let&apos;s talk about everything!
              </h3>
            </div>

            <div className="overflow-hidden">
              <p className={`text-white/80 text-xs md:text-sm leading-relaxed mb-2 md:mb-0 transform transition-all duration-1000 delay-500 ease-out ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
                Whether you have a project in mind, want to collaborate, or just want to say hello, 
                I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-2">
              {contactMethods.map((method, index) => (
                <a
                  key={method.title}
                  href={method.link}
                  target='_blank'
                  className={`flex items-center space-x-4 p-2 bg-white/5 backdrop-blur-sm  border border-white/30 rounded-lg hover:bg-white/20 hover:border-blue-400 transition-all duration-50 group transform smooth ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="text-2xl group-hover:scale-110 transition-transform text-blue-400">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-semibold">{method.title}</div>
                    <div className="text-white/60 text-sm">{method.value}</div>
                  </div>
                  <div className="text-white/40 group-hover:text-white transition-colors">
                    →
                  </div>
                </a>
              ))}
            </div>
          </div>
         } 

          {/* Right Section - Contact Form */}
          <div>
            <div className={`bg-white/5 backdrop-blur-sm rounded-2xl border border-blue-400 md:p-6 transform transition-all duration-1000 delay-400 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <form onSubmit={handleSubmit} className="space-y-0 md:space-y-2 p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Name Field */}
                  <div className="space-y-0.5 md:space-y-1">
                    <label className="text-white text-sm font-medium invisible md:visible">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-2 py-1 md:px-3 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-0.5 md:space-y-1">
                    <label className="text-white text-sm font-medium invisible md:visible">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-2 py-1 md:px-3 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Subject Field */}
                <div className="space-y-0.5 md:space-y-1">
                  <label className="text-white text-sm font-medium invisible md:visible">Subject *</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-2 py-1 md:px-3 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-0.5 md:space-y-1">
                  <label className="text-white text-sm font-medium invisible md:visible">Message *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-2 py-1 md:px-3 md:py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className={`px-2 py-1 md:px-3 md:py-2 ring-1 ring-blue-400
              backdrop-blur-sm text-blue-400 bg-[#0a192f] rounded-lg font-semibold border-1-solid border-blue-400
               transition-all transform hover:translate-y-[-2px] hover:translate-x-[-2px] 
               shadow-none hover:shadow-[4px_5px_blue-400]`}
                >
                  {isSending ? "Sending..." : "Send Message"}
                </button>

                {/* Form Note */}
                <p className="text-blue-400 text-sm text-center mt-2 md:mt-4">
                  I&apos;ll get back to you within 24 hours
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .floating-element {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}