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
  FaUserCircle
} from 'react-icons/fa';

export default function AdminLayout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      setIsAuthenticated(!!token);
      setLoading(false);
    };
    
    checkAuth();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: <FaHome /> },
    { name: 'Hero Section', href: '/admin?section=hero', icon: <FaUserCircle /> },
    { name: 'About Section', href: '/admin?section=about', icon: <FaAddressCard /> },
    { name: 'Projects', href: '/admin?section=projects', icon: <FaProjectDiagram /> },
    { name: 'Contact', href: '/admin?section=contact', icon: <FaEnvelope /> },
    { name: 'Footer', href: '/admin?section=footer', icon: <FaPuzzlePiece /> },
    { name: 'Preview', href: '/admin/preview', icon: <FaEye /> },
    { name: 'Settings', href: '/admin?section=settings', icon: <FaCog /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/admin/login') {
    router.push('/admin/login');
    return null;
  }

  if (pathname === '/admin/login') {
    return children;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="fixed left-0 top-25 h-full w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-2xl font-bold text-blue-400">Portfolio Admin</h1>
          <p className="text-gray-400 text-sm">Manage your portfolio content</p>
        </div>
        
        <nav className="p-4 space-y-2">
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

      {/* Main Content */}
      <div className="ml-64 p-8">
        {children}
      </div>
    </div>
  );
}