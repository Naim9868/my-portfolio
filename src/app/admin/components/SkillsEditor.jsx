'use client';
import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash, FaEdit, FaTimes, FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Available icons for selection
const AVAILABLE_ICONS = [
  { value: 'FaReact', label: 'React' },
  { value: 'FaNodeJs', label: 'Node.js' },
  { value: 'FaPython', label: 'Python' },
  { value: 'FaDatabase', label: 'Database' },
  { value: 'FaAws', label: 'AWS' },
  { value: 'FaDocker', label: 'Docker' },
  { value: 'FaGitAlt', label: 'Git' },
  { value: 'FaFigma', label: 'Figma' },
  { value: 'SiNextdotjs', label: 'Next.js' },
  { value: 'SiTailwindcss', label: 'Tailwind CSS' },
  { value: 'SiTypescript', label: 'TypeScript' },
  { value: 'SiMongodb', label: 'MongoDB' },
  { value: 'SiPostgresql', label: 'PostgreSQL' },
  { value: 'SiJavascript', label: 'JavaScript' },
  { value: 'FaCode', label: 'Code' },
  { value: 'FaPalette', label: 'Palette' },
  { value: 'FaMobile', label: 'Mobile' },
  { value: 'FaRocket', label: 'Rocket' },
];

// Available colors for selection
const AVAILABLE_COLORS = [
  { value: 'text-blue-400', label: 'Blue' },
  { value: 'text-green-500', label: 'Green' },
  { value: 'text-yellow-400', label: 'Yellow' },
  { value: 'text-red-500', label: 'Red' },
  { value: 'text-purple-500', label: 'Purple' },
  { value: 'text-pink-500', label: 'Pink' },
  { value: 'text-indigo-500', label: 'Indigo' },
  { value: 'text-cyan-400', label: 'Cyan' },
  { value: 'text-orange-500', label: 'Orange' },
  { value: 'text-gray-500', label: 'Gray' },
  { value: 'text-black dark:text-white', label: 'Black/White' },
];

export default function SkillsEditor() {
  const [skillsData, setSkillsData] = useState({
    title: '',
    subtitle: '',
    learningText: '',
    skillCategories: [],
    enabled: true
  });

  const [newCategory, setNewCategory] = useState({
    title: '',
    skills: []
  });

  const [newSkill, setNewSkill] = useState({
    name: '',
    icon: 'FaReact',
    level: 50,
    color: 'text-blue-400'
  });

  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSkill, setEditingSkill] = useState({ categoryIndex: null, skillIndex: null });

  useEffect(() => {
    fetchSkillsData();
  }, []);

  const fetchSkillsData = async () => {
    try {
      const response = await fetch('/api/admin/skills');
      const data = await response.json();
      
      if (data) {
        setSkillsData({
          ...data,
          skillCategories: data.skillCategories || []
        });
      }
    } catch (error) {
      console.error('Error fetching skills data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillsData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        alert(result.message || 'Skills saved successfully!');
      } else {
        alert(result.error || 'Error saving skills');
      }
    } catch (error) {
      alert('Error saving: ' + error.message);
    }
  };

  // Category Functions
  const addCategory = () => {
    if (newCategory.title.trim()) {
      setSkillsData(prev => ({
        ...prev,
        skillCategories: [...prev.skillCategories, { ...newCategory }]
      }));
      setNewCategory({ title: '', skills: [] });
    }
  };

  const updateCategory = (index, field, value) => {
    const updatedCategories = [...skillsData.skillCategories];
    updatedCategories[index] = { ...updatedCategories[index], [field]: value };
    setSkillsData(prev => ({ ...prev, skillCategories: updatedCategories }));
  };

  const deleteCategory = async (index) => {
    if (confirm('Are you sure you want to delete this category? All skills in this category will be deleted.')) {
      try {
        const response = await fetch('/api/admin/skills', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ categoryIndex: index })
        });
        
        const result = await response.json();
        
        if (response.ok) {
          setSkillsData(prev => ({
            ...prev,
            skillCategories: prev.skillCategories.filter((_, i) => i !== index)
          }));
          alert('Category deleted successfully');
        } else {
          alert(result.error || 'Error deleting category');
        }
      } catch (error) {
        // Fallback to local delete if API fails
        setSkillsData(prev => ({
          ...prev,
          skillCategories: prev.skillCategories.filter((_, i) => i !== index)
        }));
      }
    }
  };

  const moveCategory = (index, direction) => {
    if ((direction === 'up' && index === 0) || 
        (direction === 'down' && index === skillsData.skillCategories.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    const updatedCategories = [...skillsData.skillCategories];
    [updatedCategories[index], updatedCategories[newIndex]] = 
    [updatedCategories[newIndex], updatedCategories[index]];
    
    setSkillsData(prev => ({ ...prev, skillCategories: updatedCategories }));
  };

  // Skill Functions
  const addSkill = (categoryIndex) => {
    if (newSkill.name.trim()) {
      const updatedCategories = [...skillsData.skillCategories];
      updatedCategories[categoryIndex].skills = [
        ...updatedCategories[categoryIndex].skills,
        { ...newSkill }
      ];
      
      setSkillsData(prev => ({ ...prev, skillCategories: updatedCategories }));
      setNewSkill({ name: '', icon: 'FaReact', level: 50, color: 'text-blue-400' });
    }
  };

  const updateSkill = (categoryIndex, skillIndex, field, value) => {
    const updatedCategories = [...skillsData.skillCategories];
    updatedCategories[categoryIndex].skills[skillIndex] = {
      ...updatedCategories[categoryIndex].skills[skillIndex],
      [field]: value
    };
    
    setSkillsData(prev => ({ ...prev, skillCategories: updatedCategories }));
  };

  const deleteSkill = (categoryIndex, skillIndex) => {
    const updatedCategories = [...skillsData.skillCategories];
    updatedCategories[categoryIndex].skills = updatedCategories[categoryIndex].skills.filter(
      (_, index) => index !== skillIndex
    );
    
    setSkillsData(prev => ({ ...prev, skillCategories: updatedCategories }));
  };

  const moveSkill = (categoryIndex, skillIndex, direction) => {
    const category = skillsData.skillCategories[categoryIndex];
    if (!category || category.skills.length <= 1) return;
    
    if ((direction === 'up' && skillIndex === 0) || 
        (direction === 'down' && skillIndex === category.skills.length - 1)) {
      return;
    }
    
    const newIndex = direction === 'up' ? skillIndex - 1 : skillIndex + 1;
    const updatedCategories = [...skillsData.skillCategories];
    const skills = updatedCategories[categoryIndex].skills;
    [skills[skillIndex], skills[newIndex]] = [skills[newIndex], skills[skillIndex]];
    
    setSkillsData(prev => ({ ...prev, skillCategories: updatedCategories }));
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skills Page Editor</h2>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaSave />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Page Settings */}
        <div className="border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Page Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Page Title</label>
              <input
                type="text"
                value={skillsData.title}
                onChange={(e) => setSkillsData({...skillsData, title: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Skills & Technologies"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <input
                type="text"
                value={skillsData.subtitle}
                onChange={(e) => setSkillsData({...skillsData, subtitle: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Technologies and tools I use to bring ideas to life"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Learning Text</label>
              <textarea
                value={skillsData.learningText}
                onChange={(e) => setSkillsData({...skillsData, learningText: e.target.value})}
                rows="3"
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="I believe in continuous learning..."
              />
            </div>
          </div>
        </div>

        {/* Add New Category */}
        <div className="border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category Title</label>
              <input
                type="text"
                value={newCategory.title}
                onChange={(e) => setNewCategory({...newCategory, title: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="e.g., Frontend, Backend, Tools"
              />
            </div>
            
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>Add Category</span>
            </button>
          </div>
        </div>

        {/* Categories List */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Skill Categories ({skillsData.skillCategories.length})</h3>
          
          {skillsData.skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="border border-gray-700 rounded-lg p-4">
              {/* Category Header */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => moveCategory(categoryIndex, 'up')}
                      disabled={categoryIndex === 0}
                      className={`p-1 rounded ${categoryIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                    >
                      <FaChevronUp />
                    </button>
                    <button
                      onClick={() => moveCategory(categoryIndex, 'down')}
                      disabled={categoryIndex === skillsData.skillCategories.length - 1}
                      className={`p-1 rounded ${categoryIndex === skillsData.skillCategories.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                    >
                      <FaChevronDown />
                    </button>
                  </div>
                  
                  {editingCategory === categoryIndex ? (
                    <input
                      type="text"
                      value={category.title}
                      onChange={(e) => updateCategory(categoryIndex, 'title', e.target.value)}
                      className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                      onBlur={() => setEditingCategory(null)}
                      autoFocus
                    />
                  ) : (
                    <h4 className="text-xl font-bold">{category.title}</h4>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={() => setEditingCategory(editingCategory === categoryIndex ? null : categoryIndex)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {editingCategory === categoryIndex ? <FaTimes /> : <FaEdit />}
                  </button>
                  <button
                    onClick={() => deleteCategory(categoryIndex)}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>

              {/* Add New Skill to Category */}
              <div className="bg-gray-900 p-4 rounded-lg mb-4">
                <h5 className="font-medium mb-3">Add New Skill</h5>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({...newSkill, name: e.target.value})}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  />
                  
                  <select
                    value={newSkill.icon}
                    onChange={(e) => setNewSkill({...newSkill, icon: e.target.value})}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    {AVAILABLE_ICONS.map(icon => (
                      <option key={icon.value} value={icon.value}>
                        {icon.label}
                      </option>
                    ))}
                  </select>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({...newSkill, level: parseInt(e.target.value)})}
                      className="flex-1"
                    />
                    <span className="w-12 text-center">{newSkill.level}%</span>
                  </div>
                  
                  <select
                    value={newSkill.color}
                    onChange={(e) => setNewSkill({...newSkill, color: e.target.value})}
                    className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
                  >
                    {AVAILABLE_COLORS.map(color => (
                      <option key={color.value} value={color.value}>
                        {color.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <button
                  onClick={() => addSkill(categoryIndex)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <FaPlus />
                  <span>Add Skill to {category.title}</span>
                </button>
              </div>

              {/* Skills List in Category */}
              <div className="space-y-3">
                <h5 className="font-medium">Skills ({category.skills.length})</h5>
                
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="bg-gray-900 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => moveSkill(categoryIndex, skillIndex, 'up')}
                            disabled={skillIndex === 0}
                            className={`p-1 text-xs ${skillIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => moveSkill(categoryIndex, skillIndex, 'down')}
                            disabled={skillIndex === category.skills.length - 1}
                            className={`p-1 text-xs ${skillIndex === category.skills.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
                          >
                            ↓
                          </button>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <input
                            type="text"
                            value={skill.name}
                            onChange={(e) => updateSkill(categoryIndex, skillIndex, 'name', e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                          />
                          
                          <select
                            value={skill.icon}
                            onChange={(e) => updateSkill(categoryIndex, skillIndex, 'icon', e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                          >
                            {AVAILABLE_ICONS.map(icon => (
                              <option key={icon.value} value={icon.value}>
                                {icon.label}
                              </option>
                            ))}
                          </select>
                          
                          <div className="flex items-center space-x-2">
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={skill.level}
                              onChange={(e) => updateSkill(categoryIndex, skillIndex, 'level', parseInt(e.target.value))}
                              className="flex-1"
                            />
                            <span className="w-10 text-center">{skill.level}%</span>
                          </div>
                          
                          <select
                            value={skill.color}
                            onChange={(e) => updateSkill(categoryIndex, skillIndex, 'color', e.target.value)}
                            className="bg-gray-800 border border-gray-600 rounded-lg px-3 py-1 focus:outline-none focus:border-blue-500"
                          >
                            {AVAILABLE_COLORS.map(color => (
                              <option key={color.value} value={color.value}>
                                {color.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => deleteSkill(categoryIndex, skillIndex)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Page Status */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <div>
            <h4 className="font-medium">Skills Page Status</h4>
            <p className="text-sm text-gray-400">Show or hide the skills page</p>
          </div>
          
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={skillsData.enabled}
              onChange={(e) => setSkillsData({...skillsData, enabled: e.target.checked})}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            <span className="ml-3 text-sm font-medium">
              {skillsData.enabled ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}