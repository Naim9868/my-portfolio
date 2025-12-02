'use client';
import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';

export default function HeroEditor() {
  const [heroData, setHeroData] = useState({
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
  });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await fetch('/api/admin/hero');
      const data = await response.json();
      if (data) {
        setHeroData(data);
      }
    } catch (error) {
      console.error('Error fetching hero data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(heroData)
      });
      
      if (response.ok) {
        alert('Hero section saved successfully!');
      }
    } catch (error) {
      alert('Error saving hero section:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Hero Section Editor</h2>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaSave />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Main Content */}
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            type="text"
            value={heroData.name}
            onChange={(e) => setHeroData({...heroData, name: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={heroData.title}
              onChange={(e) => setHeroData({...heroData, title: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Subtitle</label>
            <input
              type="text"
              value={heroData.subtitle}
              onChange={(e) => setHeroData({...heroData, subtitle: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tagline</label>
          <textarea
            value={heroData.tagline}
            onChange={(e) => setHeroData({...heroData, tagline: e.target.value})}
            rows="2"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={heroData.description}
            onChange={(e) => setHeroData({...heroData, description: e.target.value})}
            rows="4"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* CTA Buttons */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Call-to-Action Buttons</h3>
          <div className="space-y-4">
            {heroData.ctaButtons.map((button, index) => (
              <div key={index} className="flex items-center space-x-4 bg-gray-900 p-4 rounded-lg">
                <div className="flex-1 grid grid-cols-3 gap-4">
                  <input
                    type="text"
                    value={button.text}
                    onChange={(e) => {
                      const newButtons = [...heroData.ctaButtons];
                      newButtons[index].text = e.target.value;
                      setHeroData({...heroData, ctaButtons: newButtons});
                    }}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="Button Text"
                  />
                  
                  <input
                    type="text"
                    value={button.url}
                    onChange={(e) => {
                      const newButtons = [...heroData.ctaButtons];
                      newButtons[index].url = e.target.value;
                      setHeroData({...heroData, ctaButtons: newButtons});
                    }}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                    placeholder="URL"
                  />
                  
                  <select
                    value={button.variant}
                    onChange={(e) => {
                      const newButtons = [...heroData.ctaButtons];
                      newButtons[index].variant = e.target.value;
                      setHeroData({...heroData, ctaButtons: newButtons});
                    }}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                  >
                    <option value="primary">Primary</option>
                    <option value="secondary">Secondary</option>
                    <option value="outline">Outline</option>
                  </select>
                </div>
                
                <button
                  onClick={() => {
                    const newButtons = heroData.ctaButtons.filter((_, i) => i !== index);
                    setHeroData({...heroData, ctaButtons: newButtons});
                  }}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4 pt-4 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Hero Section Status</h4>
              <p className="text-sm text-gray-400">Show or hide the hero section</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={heroData.enabled}
                onChange={(e) => setHeroData({...heroData, enabled: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Scroll Indicator</h4>
              <p className="text-sm text-gray-400">Show scroll indicator animation</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={heroData.showScrollIndicator}
                onChange={(e) => setHeroData({...heroData, showScrollIndicator: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}