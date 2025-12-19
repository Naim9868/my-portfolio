'use client';
import { useEffect, useState } from 'react';

export default function PreviewPage() {
  const [components, setComponents] = useState({});

  useEffect(() => {
    fetchAllComponents();
  }, []);

  const fetchAllComponents = async () => {
    try {
      const [footer, hero, about, projects, contact] = await Promise.all([
        fetch('/api/admin/footer').then(r => r.json()),
        fetch('/api/admin/hero').then(r => r.json()),
        fetch('/api/admin/about').then(r => r.json()),
        fetch('/api/admin/projects').then(r => r.json()),
        fetch('/api/admin/contact').then(r => r.json())
      ]);

      setComponents({ footer, hero, about, projects, contact });
    } catch (error) {
      console.error('Error fetching components:', error);
    }
  };

  return (
    <div className='mt-40'>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Live Preview</h1>
          <p className="text-gray-400">Preview your portfolio with current changes</p>
        </div>
        
        <div className="flex space-x-4">
          <button
            onClick={fetchAllComponents}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Refresh Preview
          </button>
          
          <button
            onClick={() => window.open('/', '_blank')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Open Live Site
          </button>
        </div>
      </div>

      {/* Preview Container */}
      <div className="bg-white rounded-xl overflow-hidden border-4 border-gray-800">
        <div className="h-12 bg-gray-800 flex items-center px-4">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="ml-4 text-sm text-gray-300">localhost:3000</div>
        </div>
        
        {/* Embedded Portfolio Preview */}
        <div className="h-[80vh]">
          <iframe
            src="/"
            className="w-full h-full border-0"
            title="Portfolio Preview"
          />
        </div>
      </div>

      {/* Component Status */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(components).map(([key, data]) => (
          <div key={key} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold capitalize">{key}</h3>
              <div className={`w-3 h-3 rounded-full ${data?.enabled !== false ? 'bg-green-500' : 'bg-red-500'}`}></div>
            </div>
            <p className="text-sm text-gray-400 mt-2">
              {data?.enabled !== false ? 'Visible' : 'Hidden'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}