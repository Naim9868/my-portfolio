'use client';
import { useState, useEffect } from 'react';
import { FaSave,FaLink , FaPlus, FaTrash, FaGithub, FaLinkedin, FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function FooterEditor() {
  const [footerData, setFooterData] = useState({
    name: 'Md. Naimul Islam',
    tagline: 'Building amazing web experiences with React and modern technologies. Let\'s create something extraordinary together.',
    phone: '+8801521-529868',
    location: 'Dhaka, Bangladesh',
    email: 'naimislam9868@gmail.com',
    copyrightText: 'Designed & Build by N@im',
    socialLinks: [
      { platform: 'GitHub', url: 'https://github.com/Naim9868', icon: 'FaGithub', color: '#000000ff' },
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

  const [newSocialLink, setNewSocialLink] = useState({
    platform: '',
    url: '',
    icon: '',
    color: '#333'
  });

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

  const handleSave = async () => {
    console.log(footerData);
    try {
      const response = await fetch('/api/admin/footer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(footerData)
      });
      
      if (response.ok) {
        alert('Footer saved successfully!');
      }
    } catch (error) {
      alert('Error saving footer:', error);
    }
  };

  const addSocialLink = () => {
    if (newSocialLink.platform && newSocialLink.url) {
      setFooterData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, { ...newSocialLink }]
      }));
      setNewSocialLink({ platform: '', url: '', icon: '', color: '#333' });
    }
  };

  const removeSocialLink = (index) => {
    setFooterData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  const moveSkill = (index, direction) => {
    const category = footerData.socialLinks;
    if (!category || category.length <= 1) return;
    
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === category.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedLinks = [...footerData.socialLinks];
    [updatedLinks[index], updatedLinks[newIndex]] = [updatedLinks[newIndex], updatedLinks[index]];
    
    setFooterData(prev => ({ ...prev, socialLinks: updatedLinks }));
  };

  const iconOptions = [
    { value: 'FaGithub', label: 'GitHub' },
    { value: 'FaLinkedin', label: 'LinkedIn' },
    { value: 'FaWhatsapp', label: 'WhatsApp' },
    { value: 'FaFacebook', label: 'Facebook' },
    { value: 'FaTwitter', label: 'Twitter' },
    { value: 'FaEnvelope', label: 'Email' },
    { value: 'FaPhone', label: 'Phone' },
    { value: 'FaMapMarkerAlt', label: 'Location' },
    { value: 'SiLeetcode', label: 'LeetCode' },
    { value: 'FaLink', label: 'another link' }
    
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Footer Editor</h2>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaSave />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={footerData.name}
              onChange={(e) => setFooterData({...footerData, name: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Copyright Text</label>
            <input
              type="text"
              value={footerData.copyrightText}
              onChange={(e) => setFooterData({...footerData, copyrightText: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Tagline */}
        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <textarea
            value={footerData.tagline}
            onChange={(e) => setFooterData({...footerData, tagline: e.target.value})}
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={footerData.showPhone}
              onChange={(e) => setFooterData({...footerData, showPhone: e.target.checked})}
              className="rounded"
            />
            <label className="text-sm">Show Phone</label>
            <input
              type="text"
              value={footerData.phone}
              onChange={(e) => setFooterData({...footerData, phone: e.target.value})}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={footerData.showEmail}
              onChange={(e) => setFooterData({...footerData, showEmail: e.target.checked})}
              className="rounded"
            />
            <label className="text-sm">Show Email</label>
            <input
              type="email"
              value={footerData.email}
              onChange={(e) => setFooterData({...footerData, email: e.target.value})}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={footerData.showLocation}
              onChange={(e) => setFooterData({...footerData, showLocation: e.target.checked})}
              className="rounded"
            />
            <label className="text-sm">Show Location</label>
            <input
              type="text"
              value={footerData.location}
              onChange={(e) => setFooterData({...footerData, location: e.target.value})}
              className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Social Media Links</h3>
          
          {/* Add New Link Form */}
          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder="Platform (e.g., GitHub)"
                value={newSocialLink.platform}
                onChange={(e) => setNewSocialLink({...newSocialLink, platform: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              
              <input
                type="url"
                placeholder="URL"
                value={newSocialLink.url}
                onChange={(e) => setNewSocialLink({...newSocialLink, url: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              
              <select
                value={newSocialLink.icon}
                onChange={(e) => setNewSocialLink({...newSocialLink, icon: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <input
                type="color"
                value={newSocialLink.color}
                onChange={(e) => setNewSocialLink({...newSocialLink, color: e.target.value})}
                className="w-full h-10 rounded-lg cursor-pointer"
              />
            </div>
            
            <button
              onClick={addSocialLink}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>Add Social Link</span>
            </button>
          </div>

          {/* Existing Links List */}
          <div className="space-y-2">
            {footerData.socialLinks.map((link, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => moveSkill( index, 'up')}
                            disabled={index === 0}
                            className={`p-1 text-xs ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveSkill(index, 'down')}
                            disabled={index === footerData.socialLinks.length - 1}
                            className={`p-1 text-xs ${index === footerData.socialLinks.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                          >
                            ↓
                          </button>
                      </div>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: link.color}}>
                    {getIconComponent(link.icon)}
                  </div>
                  <div>
                    <div className="font-medium">{link.platform}</div>
                    <div className="text-sm text-gray-400 truncate max-w-xs">{link.url}</div>
                  </div>
                </div>
                
                <button
                  onClick={() => removeSocialLink(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div>
            <h4 className="font-medium">Footer Status</h4>
            <p className="text-sm text-gray-400">Show or hide the footer section</p>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={footerData.enabled}
              onChange={(e) => setFooterData({...footerData, enabled: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">
              {footerData.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}

function getIconComponent(iconName) {
  const icons = {
    FaGithub: <FaGithub />,
    FaLinkedin: <FaLinkedin />,
    FaWhatsapp: <FaWhatsapp />,
    FaFacebook: <FaFacebook />,
    FaTwitter: <FaTwitter />,
    FaEnvelope: <FaEnvelope />,
    FaPhone: <FaPhone />,
    FaMapMarkerAlt: <FaMapMarkerAlt />,
    SiLeetcode: <SiLeetcode />,
    FaLink: <FaLink />
  };
  
  return icons[iconName] || <FaLink />;
}