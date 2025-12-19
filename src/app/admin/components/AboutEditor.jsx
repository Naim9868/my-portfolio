'use client';
import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash, FaDownload, FaProjectDiagram } from 'react-icons/fa';

export default function AboutEditor() {
  const [aboutData, setAboutData] = useState({
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
    enabled: true,
    showImage: true,
    showStats: true
  });

  const [newSkill, setNewSkill] = useState('');
  const [newStat, setNewStat] = useState({ number: '', label: '' });
  const [newButton, setNewButton] = useState({ text: '', url: '', icon: 'FaDownload' });

  useEffect(() => {
    fetchAboutData();
  }, []);

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/admin/about');
      const data = await response.json();
      if (data) {
        setAboutData(prev =>({
          ...prev,
          ...data,
          stats: data?.stats ?? prev.stats,
          skills: data?.skills ?? prev.skills,
          buttons: data?.buttons ?? prev.buttons
        }));
      }
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  const handleSave = async () => {
    console.log(aboutData);
    try {
      const response = await fetch('/api/admin/about', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(aboutData)
      });
      
      if (response.ok) {
        alert('About section saved successfully!');
      }
    } catch (error) {
      alert('Error saving about section:', error);
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setAboutData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    setAboutData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addStat = () => {
    if (newStat.number && newStat.label) {
      setAboutData(prev => ({
        ...prev,
        stats: [...prev.stats, { ...newStat }]
      }));
      setNewStat({ number: '', label: '' });
    }
  };

  const removeStat = (index) => {
    setAboutData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const addButton = () => {
    if (newButton.text && newButton.url) {
      setAboutData(prev => ({
        ...prev,
        buttons: [...prev.buttons, { ...newButton }]
      }));
      setNewButton({ text: '', url: '', icon: 'FaDownload' });
    }
  };

  const removeButton = (index) => {
    setAboutData(prev => ({
      ...prev,
      buttons: prev.buttons.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">About Section Editor</h2>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaSave />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={aboutData.title}
            onChange={(e) => setAboutData({...aboutData, title: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={aboutData.description}
            onChange={(e) => setAboutData({...aboutData, description: e.target.value})}
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-2">Bio</label>
          <textarea
            value={aboutData.bio}
            onChange={(e) => setAboutData({...aboutData, bio: e.target.value})}
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium mb-2">Profile Image URL</label>
          <input
            type="text"
            value={aboutData.imageUrl}
            onChange={(e) => setAboutData({...aboutData, imageUrl: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="Enter image URL or path"
          />
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              checked={aboutData.showImage}
              onChange={(e) => setAboutData({...aboutData, showImage: e.target.checked})}
              className="rounded mr-2"
            />
            <label className="text-sm">Show Profile Image</label>
          </div>
        </div>

        {/* Stats Section */}
        <div className="border border-gray-700 rounded-lg p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Stats</h3>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={aboutData.showStats}
                onChange={(e) => setAboutData({...aboutData, showStats: e.target.checked})}
                className="rounded mr-2"
              />
              <label className="text-sm">Show Stats</label>
            </div>
          </div>

          {/* Add New Stat */}
          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                placeholder="Number (e.g., 10+)"
                value={newStat.number}
                onChange={(e) => setNewStat({...newStat, number: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="Label (e.g., Projects Completed)"
                value={newStat.label}
                onChange={(e) => setNewStat({...newStat, label: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={addStat}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>Add Stat</span>
            </button>
          </div>

          {/* Stats List */}
          <div className="space-y-2">
            {aboutData.stats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="font-bold text-blue-400">{stat.number}</div>
                  <div>{stat.label}</div>
                </div>
                <button
                  onClick={() => removeStat(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div className="border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Skills</h3>
          
          {/* Add New Skill */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Add a new skill (e.g., JavaScript)"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>Add</span>
            </button>
          </div>

          {/* Skills List */}
          <div className="flex flex-wrap gap-2">
            {aboutData.skills.map((skill, index) => (
              <div key={index} className="relative group">
                <span className="px-3 py-1 bg-gray-900 border border-blue-400 rounded-full text-blue-400">
                  {skill}
                </span>
                <button
                  onClick={() => removeSkill(index)}
                  className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Action Buttons</h3>
          
          {/* Add New Button */}
          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                placeholder="Button Text"
                value={newButton.text}
                onChange={(e) => setNewButton({...newButton, text: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <input
                type="text"
                placeholder="URL"
                value={newButton.url}
                onChange={(e) => setNewButton({...newButton, url: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button
              onClick={addButton}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>Add Button</span>
            </button>
          </div>

          {/* Buttons List */}
          <div className="space-y-2">
            {aboutData.buttons.map((button, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center space-x-4">
                  <span className="font-medium">{button.text}</span>
                  <span className="text-sm text-gray-400 truncate max-w-xs">{button.url}</span>
                </div>
                <button
                  onClick={() => removeButton(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Toggle Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div>
            <h4 className="font-medium">About Section Status</h4>
            <p className="text-sm text-gray-400">Show or hide the about section</p>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={aboutData.enabled}
              onChange={(e) => setAboutData({...aboutData, enabled: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">
              {aboutData.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}