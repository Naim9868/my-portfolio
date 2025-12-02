import React, { useState } from 'react';
import { FaEnvelope, FaCopy, FaTimes } from 'react-icons/fa';

const Footer_2 = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const email = 'naimislam9868@gmail.com';

  const handleEmailClick = () => {
    setShowEmailModal(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      alert('Email copied to clipboard!');
      setShowEmailModal(false);
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Email copied to clipboard!');
      setShowEmailModal(false);
    }
  };

  const openEmailClient = () => {
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=naimislam9868@gmail.com&su=Hello%20Naim&body=Hi,%20I%20want%20to%20connect!`);
    setShowEmailModal(false);
  };

  return (
    <>
      {/* Email Contact Item */}
      <div 
        onClick={handleEmailClick}
        className="flex items-center space-x-3 text-gray-300 hover:text-blue-400 cursor-pointer transition-colors duration-300 group"
      >
        <FaEnvelope className="text-blue-400 text-lg group-hover:scale-110 transition-transform duration-300" />
        <span>{email}</span>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Contact via Email</h3>
              <button 
                onClick={() => setShowEmailModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4">Choose how you'd like to contact:</p>
            
            <div className="bg-gray-100 p-4 rounded mb-4">
              <p className="text-sm text-gray-500 mb-1">Email address:</p>
              <p className="text-lg font-mono text-blue-600 break-all">{email}</p>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={copyToClipboard}
                className="flex-1 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
              >
                <FaCopy />
                <span>Copy Email</span>
              </button>
              
              <button
                onClick={openEmailClient}
                className="flex-1 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
              >
                <FaEnvelope />
                <span>Open Email</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer_2;