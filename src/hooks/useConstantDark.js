import { useEffect } from 'react';

export const useConstantDark = () => {
  useEffect(() => {
    // Force dark theme on document root
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    
    // Set data-theme attribute for additional certainty
    document.documentElement.setAttribute('data-theme', 'dark');
    document.documentElement.setAttribute('class', 'dark');
    
    // Set meta theme color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', '#000000');
    }
    
    // Prevent flash of light theme
    document.body.style.backgroundColor = 'black';
    document.body.style.color = 'white';
    
    // Add a global class to body for additional styling
    document.body.classList.add('dark-theme');
    
  }, []);
};