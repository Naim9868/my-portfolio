'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import FooterEditor from './components/FooterEditor';
import HeroEditor from './components/HeroEditor';
import AboutEditor from './components/AboutEditor';
import ProjectEditor from './components/ProjectEditor';
import ContactEditor from './components/ContactEditor';
import ComponentManager from './components/ConponentManager';
import { FaChartLine, FaEdit, FaToggleOn, FaDatabase } from 'react-icons/fa';

function DashboardContent() {
  const searchParams = useSearchParams();
  const section = searchParams.get('section') || 'dashboard';
  const [stats, setStats] = useState({
    components: 5,
    lastUpdated: 'Just now',
    totalProjects: 0,
    activeSections: 5
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const responses = await Promise.all([
        fetch('/api/admin/footer'),
        fetch('/api/admin/hero'),
        fetch('/api/admin/about'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/contact')
      ]);
      
      const data = await Promise.all(responses.map(r => r.json()));
      const activeSections = data.filter(d => d.enabled !== false).length;
      
      setStats(prev => ({
        ...prev,
        activeSections,
        totalProjects: data[3]?.projects?.length || 0
      }));
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const renderSection = () => {
    switch (section) {
      case 'hero':
        return <HeroEditor />;
      case 'about':
        return <AboutEditor />;
      case 'projects':
        return <ProjectEditor />;
      case 'contact':
        return <ContactEditor />;
      case 'footer':
        return <FooterEditor />;
      case 'settings':
        return <ComponentManager />;
      default:
        return (
          <div className="space-y-8">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Components</p>
                    <h3 className="text-2xl font-bold mt-2">{stats.components}</h3>
                  </div>
                  <FaPuzzlePiece className="text-3xl text-blue-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Sections</p>
                    <h3 className="text-2xl font-bold mt-2">{stats.activeSections}</h3>
                  </div>
                  <FaToggleOn className="text-3xl text-green-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Projects</p>
                    <h3 className="text-2xl font-bold mt-2">{stats.totalProjects}</h3>
                  </div>
                  <FaProjectDiagram className="text-3xl text-purple-400" />
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Last Updated</p>
                    <h3 className="text-xl font-bold mt-2">{stats.lastUpdated}</h3>
                  </div>
                  <FaDatabase className="text-3xl text-yellow-400" />
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => window.location.href = '/admin?section=hero'}
                  className="bg-blue-600 hover:bg-blue-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                >
                  <FaEdit className="text-2xl mb-2" />
                  <span>Edit Hero</span>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/admin?section=projects'}
                  className="bg-purple-600 hover:bg-purple-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                >
                  <FaProjectDiagram className="text-2xl mb-2" />
                  <span>Manage Projects</span>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/admin/preview'}
                  className="bg-green-600 hover:bg-green-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                >
                  <FaEye className="text-2xl mb-2" />
                  <span>Preview Site</span>
                </button>
                
                <button 
                  onClick={() => window.location.href = '/admin?section=settings'}
                  className="bg-yellow-600 hover:bg-yellow-700 p-4 rounded-lg flex flex-col items-center justify-center transition-colors"
                >
                  <FaCog className="text-2xl mb-2" />
                  <span>Settings</span>
                </button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold capitalize">
          {section === 'dashboard' ? 'Dashboard' : `Edit ${section}`}
        </h1>
        <p className="text-gray-400">
          {section === 'dashboard' 
            ? 'Manage your portfolio content and settings'
            : `Edit and update your ${section} section content`
          }
        </p>
      </div>
      
      {renderSection()}
    </div>
  );
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DashboardContent />
    </Suspense>
  );
}