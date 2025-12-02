'use client';
import { useState, useEffect } from 'react';
import { FaToggleOn, FaToggleOff, FaSave, FaArrowsAltV } from 'react-icons/fa';

export default function ComponentManager() {
  const [components, setComponents] = useState([
    { id: 'hero', name: 'Hero Section', enabled: true, order: 1 },
    { id: 'about', name: 'About Section', enabled: true, order: 2 },
    { id: 'projects', name: 'Projects', enabled: true, order: 3 },
    { id: 'contact', name: 'Contact', enabled: true, order: 4 },
    { id: 'footer', name: 'Footer', enabled: true, order: 5 }
  ]);

  useEffect(() => {
    fetchComponentStatus();
  }, []);

  const fetchComponentStatus = async () => {
    try {
      const responses = await Promise.all([
        fetch('/api/admin/hero'),
        fetch('/api/admin/about'),
        fetch('/api/admin/projects'),
        fetch('/api/admin/contact'),
        fetch('/api/admin/footer')
      ]);
      
      const data = await Promise.all(responses.map(r => r.json()));
      
      const updatedComponents = components.map((comp, index) => ({
        ...comp,
        enabled: data[index]?.enabled !== false
      }));
      
      setComponents(updatedComponents);
    } catch (error) {
      console.error('Error fetching component status:', error);
    }
  };

  const toggleComponent = async (id) => {
    const updatedComponents = components.map(comp => 
      comp.id === id ? { ...comp, enabled: !comp.enabled } : comp
    );
    setComponents(updatedComponents);
    
    // Update in database
    try {
      const component = updatedComponents.find(c => c.id === id);
      await fetch(`/api/admin/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: component.enabled })
      });
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };

  const moveComponent = (index, direction) => {
    const newComponents = [...components];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (newIndex >= 0 && newIndex < newComponents.length) {
      [newComponents[index], newComponents[newIndex]] = 
      [newComponents[newIndex], newComponents[index]];
      
      // Update order
      newComponents.forEach((comp, idx) => {
        comp.order = idx + 1;
      });
      
      setComponents(newComponents);
    }
  };

  const saveOrder = async () => {
    try {
      // Save order to database or localStorage
      localStorage.setItem('component_order', JSON.stringify(components));
      alert('Component order saved!');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Component Manager</h2>
        <button
          onClick={saveOrder}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaSave />
          <span>Save Order</span>
        </button>
      </div>

      <div className="space-y-4">
        {components.sort((a, b) => a.order - b.order).map((component, index) => (
          <div key={component.id} className="flex items-center justify-between bg-gray-900 p-4 rounded-lg border border-gray-700">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col space-y-1">
                <button
                  onClick={() => moveComponent(index, 'up')}
                  disabled={index === 0}
                  className={`p-1 rounded ${index === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveComponent(index, 'down')}
                  disabled={index === components.length - 1}
                  className={`p-1 rounded ${index === components.length - 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-700'}`}
                >
                  ↓
                </button>
              </div>
              
              <div>
                <h3 className="font-semibold">{component.name}</h3>
                <p className="text-sm text-gray-400">Order: {component.order}</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">
                {component.enabled ? 'Visible' : 'Hidden'}
              </span>
              
              <button
                onClick={() => toggleComponent(component.id)}
                className={`p-2 rounded-lg transition-colors ${
                  component.enabled 
                    ? 'bg-green-600 hover:bg-green-700' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {component.enabled ? <FaToggleOn /> : <FaToggleOff />}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-700">
        <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => {
              const allEnabled = components.every(c => c.enabled);
              const updated = components.map(c => ({ ...c, enabled: !allEnabled }));
              setComponents(updated);
            }}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            {components.every(c => c.enabled) ? 'Disable All' : 'Enable All'}
          </button>
          
          <button
            onClick={() => {
              const sorted = [...components].sort((a, b) => a.name.localeCompare(b.name));
              sorted.forEach((c, i) => c.order = i + 1);
              setComponents(sorted);
            }}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            Sort Alphabetically
          </button>
          
          <button
            onClick={fetchComponentStatus}
            className="px-4 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            Refresh Status
          </button>
        </div>
      </div>
    </div>
  );
}