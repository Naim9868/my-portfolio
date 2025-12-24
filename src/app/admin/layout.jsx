'use client';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaHome, 
  FaCog, 
  FaEye, 
  FaSignOutAlt, 
  FaPuzzlePiece,
  FaAddressCard,
  FaEnvelope,
  FaProjectDiagram,
  FaUserCircle,
  FaBars,
  FaTimes,
  FaChartBar,
  FaCode
} from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <FaHome /> },
    { name: 'Hero Section', href: '/admin?section=hero', icon: <FaUserCircle /> },
    { name: 'About Section', href: '/admin?section=about', icon: <FaAddressCard /> },
    { name: 'Skills', href: '/admin?section=skills', icon: <FaCode /> },
    { name: 'Projects', href: '/admin?section=projects', icon: <FaProjectDiagram /> },
    { name: 'Contact', href: '/admin?section=contact', icon: <FaEnvelope /> },
    { name: 'Footer', href: '/admin?section=footer', icon: <FaPuzzlePiece /> },
    { name: 'Preview', href: '/admin/preview', icon: <FaEye /> },
    // { name: 'Analytics', href: '/admin?section=analytics', icon: <FaChartBar /> },
    { name: 'Settings', href: '/admin?section=settings', icon: <FaCog /> },
  ];

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }

  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 bg-gray-800 border-b border-gray-700 z-40">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600"
          >
            {sidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
          <h1 className="text-xl font-bold text-blue-400">Portfolio Admin</h1>
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            {user?.username?.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed left-0 top-16 md:top-21 h-full bg-gray-800 border-r border-gray-700 transition-transform duration-300 z-30 ${
        sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full'
      }`}>
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-xl">{user?.username?.charAt(0).toUpperCase()}</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-blue-400">Portfolio Admin</h1>
              <p className="text-gray-400 text-sm truncate">{user?.username}</p>
              <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                {user?.role}
              </span>
            </div>
          </div>
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-160px)]">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === item.href || 
                (item.href.includes('?section=') && pathname === '/admin')
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-red-600 hover:text-white transition-colors"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className={`transition-all duration-300 ${
        sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
      }`}>
        <div className="p-4 lg:p-8 pt-20 lg:pt-8">
          {children}
        </div>
      </div>
    </div>
  );
}