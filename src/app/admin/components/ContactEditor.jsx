'use client';
import { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash, FaEnvelope, FaPhone, FaLinkedin, FaMapMarkerAlt } from 'react-icons/fa';

export default function ContactEditor() {
  const [contactData, setContactData] = useState({
    title: 'Get In Touch',
    description: "Let's work together! I'm always open to discussing new opportunities and creative projects.",
    contactMethods: [
      { title: 'Email', value: 'naimislam9868@gmail.com', icon: 'FaEnvelope', link: 'mailto:naimislam9868@gmail.com' },
      { title: 'Phone', value: '+8801521-529868', icon: 'FaPhone', link: 'tel:+8801521529868' },
      { title: 'LinkedIn', value: 'in/yourprofile', icon: 'FaLinkedin', link: 'https://linkedin.com' }
    ],
    formEnabled: true,
    emailService: {
      serviceId: 'service_exxu8un',
      templateId: 'template_kwkeo1c',
      publicKey: 'vR1VFMtGTt3fsxQ9f'
    },
    enabled: true
  });

  const [newContactMethod, setNewContactMethod] = useState({
    title: '',
    value: '',
    icon: 'FaEnvelope',
    link: ''
  });

  useEffect(() => {
    fetchContactData();
  }, []);

  const fetchContactData = async () => {
    try {
      const response = await fetch('/api/admin/contact');
      const data = await response.json();
      console.log(data);
      if (data) {
        setContactData(data);
      }
    } catch (error) {
      console.error('Error fetching contact data:', error);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactData)
      });
      
      if (response.ok) {
        alert('Contact section saved successfully!');
      }
    } catch (error) {
      alert('Error saving contact section:', error);
    }
  };

  const addContactMethod = () => {
    if (newContactMethod.title && newContactMethod.value) {
      setContactData(prev => ({
        ...prev,
        contactMethods: [...prev.contactMethods, { ...newContactMethod }]
      }));
      setNewContactMethod({
        title: '',
        value: '',
        icon: 'FaEnvelope',
        link: ''
      });
    }
  };

  const removeContactMethod = (index) => {
    setContactData(prev => ({
      ...prev,
      contactMethods: prev.contactMethods.filter((_, i) => i !== index)
    }));
  };

  const iconOptions = [
    { value: 'FaEnvelope', label: 'Email', icon: <FaEnvelope /> },
    { value: 'FaPhone', label: 'Phone', icon: <FaPhone /> },
    { value: 'FaLinkedin', label: 'LinkedIn', icon: <FaLinkedin /> },
    { value: 'FaMapMarkerAlt', label: 'Location', icon: <FaMapMarkerAlt /> }
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Contact Section Editor</h2>
        <button
          onClick={handleSave}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <FaSave />
          <span>Save Changes</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* Section Title */}
        <div>
          <label className="block text-sm font-medium mb-2">Section Title</label>
          <input
            type="text"
            value={contactData.title}
            onChange={(e) => setContactData({...contactData, title: e.target.value})}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={contactData.description}
            onChange={(e) => setContactData({...contactData, description: e.target.value})}
            rows="3"
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Contact Methods */}
        <div className="border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Contact Methods</h3>
          
          {/* Add New Contact Method */}
          <div className="bg-gray-900 p-4 rounded-lg mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                placeholder="Title (e.g., Email)"
                value={newContactMethod.title}
                onChange={(e) => setNewContactMethod({...newContactMethod, title: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
              
              <input
                type="text"
                placeholder="Value (e.g., example@email.com)"
                value={newContactMethod.value}
                onChange={(e) => setNewContactMethod({...newContactMethod, value: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
              <select
                value={newContactMethod.icon}
                onChange={(e) => setNewContactMethod({...newContactMethod, icon: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              >
                {iconOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              
              <input
                type="url"
                placeholder="Link URL"
                value={newContactMethod.link}
                onChange={(e) => setNewContactMethod({...newContactMethod, link: e.target.value})}
                className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <button
              onClick={addContactMethod}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <FaPlus />
              <span>Add Contact Method</span>
            </button>
          </div>

          {/* Contact Methods List */}
          <div className="space-y-2">
            {contactData.contactMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-900 p-3 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-blue-400 text-xl">
                    {getIconComponent(method.icon)}
                  </div>
                  <div>
                    <div className="font-medium">{method.title}</div>
                    <div className="text-sm text-gray-400">{method.value}</div>
                    {method.link && (
                      <div className="text-xs text-blue-400 truncate max-w-xs">{method.link}</div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => removeContactMethod(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Email Service Settings */}
        <div className="border border-gray-700 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">EmailJS Configuration</h3>
          <p className="text-sm text-gray-400 mb-4">
            Configure EmailJS settings for the contact form. Get these values from your EmailJS account.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Service ID</label>
              <input
                type="text"
                value={contactData.emailService.serviceId}
                onChange={(e) => setContactData({
                  ...contactData,
                  emailService: { ...contactData.emailService, serviceId: e.target.value }
                })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Template ID</label>
              <input
                type="text"
                value={contactData.emailService.templateId}
                onChange={(e) => setContactData({
                  ...contactData,
                  emailService: { ...contactData.emailService, templateId: e.target.value }
                })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Public Key</label>
              <input
                type="text"
                value={contactData.emailService.publicKey}
                onChange={(e) => setContactData({
                  ...contactData,
                  emailService: { ...contactData.emailService, publicKey: e.target.value }
                })}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4 border-t border-gray-700 pt-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Contact Section Status</h4>
              <p className="text-sm text-gray-400">Show or hide the contact section</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contactData.enabled}
                onChange={(e) => setContactData({...contactData, enabled: e.target.checked})}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">Contact Form</h4>
              <p className="text-sm text-gray-400">Enable or disable the contact form</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={contactData.formEnabled}
                onChange={(e) => setContactData({...contactData, formEnabled: e.target.checked})}
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

function getIconComponent(iconName) {
  const icons = {
    FaEnvelope: <FaEnvelope />,
    FaPhone: <FaPhone />,
    FaLinkedin: <FaLinkedin />,
    FaMapMarkerAlt: <FaMapMarkerAlt />
  };
  
  return icons[iconName] || <FaEnvelope />;
}