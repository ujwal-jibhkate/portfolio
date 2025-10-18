import React, { useEffect } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  useEffect(() => {
    // 1. Create the cursor elements programmatically
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    // 2. Add classes and styles
    cursorDot.className = 'fixed top-0 left-0 w-2 h-2 bg-sky-500 rounded-full pointer-events-none';
    cursorOutline.className = 'fixed top-0 left-0 w-8 h-8 border-2 border-sky-500 rounded-full pointer-events-none';
    
    cursorDot.style.zIndex = '9999';
    cursorOutline.style.zIndex = '9999';

    // 3. Append the elements directly to the document body
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    // Set initial centered position
    gsap.set([cursorDot, cursorOutline], {
      xPercent: -50,
      yPercent: -50,
    });

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      gsap.to(cursorDot, { x: clientX, y: clientY, duration: 0.2, ease: 'power2.out' });
      gsap.to(cursorOutline, { x: clientX, y: clientY, duration: 0.7, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', moveCursor);

    // 4. CRUCIAL CLEANUP: This function runs when the component unmounts
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      // Remove the elements from the body to prevent memory leaks
      document.body.removeChild(cursorDot);
      document.body.removeChild(cursorOutline);
    };
  }, []); // Empty array ensures this effect runs only once

  // This component doesn't render any JSX itself
  return null;
};

export default CustomCursor;