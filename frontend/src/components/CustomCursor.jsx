import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const cursorDotRef = useRef(null);
  const cursorOutlineRef = useRef(null);
  const requestRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [clicking, setClicking] = useState(false);

  // Mouse position states
  const mousePos = useRef({ x: -100, y: -100 });
  const outlinePos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia('(pointer: coarse)').matches && !window.matchMedia('(pointer: fine)').matches) {
      setIsTouchDevice(true);
      return;
    }

    // Safely apply class to hide default cursor ONLY if custom cursor is active
    document.body.classList.add('custom-cursor-active');

    const updateMousePosition = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      const isClickable = 
        ['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName) || 
        e.target.closest('button') || 
        e.target.closest('a') ||
        window.getComputedStyle(e.target).cursor === 'pointer';
        
      setHovered(isClickable);
    };

    const handleMouseDown = () => setClicking(true);
    const handleMouseUp = () => setClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Smooth animation loop for the trailing outline
    const animate = () => {
      // Lerp (Linear Interpolation) for smooth trailing effect
      outlinePos.current.x += (mousePos.current.x - outlinePos.current.x) * 0.15;
      outlinePos.current.y += (mousePos.current.y - outlinePos.current.y) * 0.15;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.style.transform = `translate3d(${outlinePos.current.x}px, ${outlinePos.current.y}px, 0)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(requestRef.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden">
      {/* Center Dot */}
      <div 
        ref={cursorDotRef}
        className={`absolute top-0 left-0 rounded-full bg-slate-900 border-2 border-white shadow-[0_0_8px_rgba(0,0,0,0.8)] transition-all duration-200 ease-out flex items-center justify-center font-black text-white text-[12px] tracking-widest ${
          hovered ? 'w-16 h-16 -ml-8 -mt-8 opacity-100 scale-100' : clicking ? 'w-4 h-4 -ml-2 -mt-2 opacity-50 scale-75' : 'w-5 h-5 -ml-2.5 -mt-2.5 opacity-100 scale-100'
        }`}
      >
        {hovered && <span className="animate-fade-in drop-shadow-md">TAP</span>}
      </div>
      
      {/* Trailing Outline Ring */}
      <div 
        ref={cursorOutlineRef}
        className={`absolute top-0 left-0 rounded-full border-[3px] border-white shadow-[0_0_12px_rgba(0,0,0,0.8)] transition-all duration-300 ease-out ${
          hovered ? 'w-24 h-24 -ml-12 -mt-12 opacity-0 scale-150' : clicking ? 'w-10 h-10 -ml-5 -mt-5 opacity-100 scale-90 border-[4px]' : 'w-12 h-12 -ml-6 -mt-6 opacity-80 scale-100'
        }`}
      />
    </div>
  );
};

export default CustomCursor;
