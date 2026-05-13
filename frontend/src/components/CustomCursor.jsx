import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Safely apply class to hide default cursor ONLY if custom cursor is active
    document.body.classList.add('custom-cursor-active');

    // Detect dark mode
    const isDark = document.documentElement.classList.contains('dark') || 
                   window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(isDark);

    // Watch for dark mode changes
    const darkModeObserver = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setIsDarkMode(isDark);
    });

    darkModeObserver.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      const isClickable = 
        ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName) || 
        e.target.closest('button') || 
        e.target.closest('a') ||
        window.getComputedStyle(e.target).cursor === 'pointer';
        
      setHovered(isClickable);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      darkModeObserver.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isTouchDevice) return null;

  // Colors that are visible in both light and dark modes
  const dotColor = isDarkMode ? 'bg-white' : 'bg-gray-900';
  const dotBorder = isDarkMode ? 'border-gray-900' : 'border-white';
  const ringBorder = isDarkMode ? 'border-white' : 'border-gray-900';
  const ringGlow = isDarkMode 
    ? 'shadow-[0_0_8px_rgba(255,255,255,0.6)]' 
    : 'shadow-[0_0_8px_rgba(0,0,0,0.3)]';
  const ringHoverBg = isDarkMode ? 'bg-white/10' : 'bg-gray-900/10';

  return (
    <>
      {/* Inner Dot - Adapts to dark/light mode */}
      <div 
        className={`fixed top-0 left-0 w-3 h-3 ${dotColor} border-[1.5px] ${dotBorder} rounded-full pointer-events-none z-[10000] transition-transform duration-75 ease-out`}
        style={{ 
          transform: `translate3d(${position.x - 6}px, ${position.y - 6}px, 0) scale(${hovered ? 0.4 : 1})`,
        }}
      />
      
      {/* Outer Ring - Adapts to dark/light mode with glow */}
      <div 
        className={`fixed top-0 left-0 w-10 h-10 border-[2.5px] ${ringBorder} rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out flex items-center justify-center ${ringGlow} ${hovered ? ringHoverBg : 'bg-transparent'}`}
        style={{ 
          transform: `translate3d(${position.x - 20}px, ${position.y - 20}px, 0) scale(${hovered ? 1.4 : 1})`,
        }}
      />
    </>
  );
};

export default CustomCursor;
