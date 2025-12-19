'use client';
import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash, FaEdit, FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

export default function ProjectEditor() {
  const [projectsData, setProjectsData] = useState({
    projects: [],
    enabled: true,
    showAllButton: true
  });

  const [editingProject, setEditingProject] = useState(null);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    image: '',
    technologies: [],
    category: '',
    liveUrl: '',
    githubUrl: '',
    featured: false
  });

  const [newTech, setNewTech] = useState('');

  useEffect(() => {
    fetchProjectsData();
  }, []);

const fetchProjectsData = async () => {
  try {
    const response = await fetch('/api/admin/projects');

    if (!response.ok) {
      console.error('API error:', response.status);
      return;
    }

    const text = await response.text();
    if (!text) {
      console.warn('Empty API response');
      return;
    }

    const data = JSON.parse(text);
    console.log(data);
    setProjectsData(prev => ({
      ...prev,
      ...data,
      projects: data?.projects ?? prev.projects
    }));

  } catch (error) {
    console.error('Fetch error:', error);
  }
};

  const handleSave = async () => {
    console.log(projectsData);
    try {
      const response = await fetch('/api/admin/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectsData)
      });
      
      if (response.ok) {
        alert('Projects saved successfully!');
      }
    } catch (error) {
      alert('Error saving projects:', error);
    }
  };

  const addProject = () => {
    if (newProject.title && newProject.description) {
      const project = {
        ...newProject,
        id: projectsData.projects.length + 1,
        technologies: [...newProject.technologies]
      };
      
      setProjectsData(prev => ({
        ...prev,
        projects: [...prev.projects, project]
      }));

      console.log(project);
      
      setNewProject({
        title: '',
        description: '',
        image: '',
        technologies: [],
        category: '',
        liveUrl: '',
        githubUrl: '',
        featured: false
      });
      setNewTech('');
    }
  };

  const updateProject = (index, field, value) => {
    const updatedProjects = [...projectsData.projects];
    updatedProjects[index] = { ...updatedProjects[index], [field]: value };
    setProjectsData(prev => ({ ...prev, projects: updatedProjects }));
  };

  const removeProject = (index) => {
    setProjectsData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const addTechnology = () => {
    if (newTech.trim()) {
      if (editingProject !== null) {
        const updatedProjects = [...projectsData.projects];
        updatedProjects[editingProject] = {
          ...updatedProjects[editingProject],
          technologies: [...updatedProjects[editingProject].technologies, newTech.trim()]
        };
        setProjectsData(prev => ({ ...prev, projects: updatedProjects }));
      } else {
        setNewProject(prev => ({
          ...prev,
          technologies: [...prev.technologies, newTech.trim()]
        }));
      }
      setNewTech('');
    }
  };

  const removeTechnology = (projectIndex, techIndex) => {
    if (editingProject !== null) {
      const updatedProjects = [...projectsData.projects];
      updatedProjects[projectIndex] = {
        ...updatedProjects[projectIndex],
        technologies: updatedProjects[projectIndex].technologies.filter((_, i) => i !== techIndex)
      };
      setProjectsData(prev => ({ ...prev, projects: updatedProjects }));
    } else {
      setNewProject(prev => ({
        ...prev,
        technologies: prev.technologies.filter((_, i) => i !== techIndex)
      }));
    }
  };

  const startEdit = (index) => {
    setEditingProject(index);
    setNewProject({ ...projectsData.projects[index] });
  };

  const saveEdit = () => {
    if (editingProject !== null) {
      const updatedProjects = [...projectsData.projects];
      updatedProjects[editingProject] = { ...newProject };
      setProjectsData(prev => ({ ...prev, projects: updatedProjects }));
      setEditingProject(null);
      setNewProject({
        title: '',
        description: '',
        image: '',
        technologies: [],
        category: '',
        liveUrl: '',
        githubUrl: '',
        featured: false
      });
    }
  };

  const cancelEdit = () => {
    setEditingProject(null);
    setNewProject({
      title: '',
      description: '',
      image: '',
      technologies: [],
      category: '',
      liveUrl: '',
      githubUrl: '',
      featured: false
    });
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects Editor</h2>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaSave />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Add/Edit Project Form */}
        <div className="border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">
            {editingProject !== null ? 'Edit Project' : 'Add New Project'}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="Project title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <input
                type="text"
                value={newProject.category}
                onChange={(e) => setNewProject({...newProject, category: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="e.g., Full Stack, Frontend, Mobile"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              rows="3"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="Project description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Live URL</label>
              <input
                type="url"
                value={newProject.liveUrl}
                onChange={(e) => setNewProject({...newProject, liveUrl: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="https://demo.example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">GitHub URL</label>
              <input
                type="url"
                value={newProject.githubUrl}
                onChange={(e) => setNewProject({...newProject, githubUrl: e.target.value})}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                placeholder="https://github.com/username/project"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <input
              type="text"
              value={newProject.image}
              onChange={(e) => setNewProject({...newProject, image: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              placeholder="/images/project.jpg or URL"
            />
          </div>

          {/* Technologies */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Technologies</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Add technology (e.g., React)"
                value={newTech}
                onChange={(e) => setNewTech(e.target.value)}
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              <button
                onClick={addTechnology}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
              >
                <FaPlus />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.technologies.map((tech, index) => (
                <div key={index} className="relative group">
                  <span className="px-3 py-1 bg-gray-900 border border-blue-400 rounded-full text-blue-400 text-sm">
                    {tech}
                  </span>
                  <button
                    onClick={() => removeTechnology(editingProject, index)}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={newProject.featured}
              onChange={(e) => setNewProject({...newProject, featured: e.target.checked})}
              className="rounded mr-2"
              id="featured"
            />
            <label htmlFor="featured" className="text-sm">
              Mark as Featured Project
            </label>
          </div>

          <div className="flex gap-2">
            {editingProject !== null ? (
              <>
                <button
                  onClick={saveEdit}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <FaSave />
                  <span>Save Edit</span>
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={addProject}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <FaPlus />
                <span>Add Project</span>
              </button>
            )}
          </div>
        </div>

        {/* Projects List */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Projects ({projectsData.projects.length})</h3>
          
          <div className="space-y-4">
            {projectsData.projects.map((project, index) => (
              <div key={project.id} className="bg-gray-900 rounded-lg p-4 border border-gray-700">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-lg flex items-center gap-2">
                      {project.title}
                      {project.featured && (
                        <span className="px-2 py-1 bg-yellow-600 text-black text-xs font-bold rounded-full">
                          Featured
                        </span>
                      )}
                    </h4>
                    <p className="text-gray-400 text-sm">{project.category}</p>
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEdit(index)}
                      className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => removeProject(index)}
                      className="p-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-3">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-2 py-1 bg-gray-800 text-blue-400 text-xs rounded border border-gray-700">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && project.githubUrl !== '#' && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                    >
                      <FaGithub />
                      Code
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Settings */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Projects Section Status</h4>
              <p className="text-sm text-gray-400">Show or hide the projects section</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={projectsData.enabled}
                onChange={(e) => setProjectsData({...projectsData, enabled: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div>
              <h4 className="font-medium">"View All Projects" Button</h4>
              <p className="text-sm text-gray-400">Show button to view all projects</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={projectsData.showAllButton}
                onChange={(e) => setProjectsData({...projectsData, showAllButton: e.target.checked})}
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