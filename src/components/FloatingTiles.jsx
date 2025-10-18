import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// AI/ML related SVG icons as components
const AIMLIcons = {
  Brain: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-1.04Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-1.04Z" />
    </svg>
  ),
  DataFlow: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <rect x="2" y="2" width="6" height="6" rx="1" />
      <rect x="16" y="2" width="6" height="6" rx="1" />
      <rect x="2" y="16" width="6" height="6" rx="1" />
      <rect x="16" y="16" width="6" height="6" rx="1" />
      <path d="M8 5h8" />
      <path d="M5 8v8" />
      <path d="M19 8v8" />
      <path d="M8 19h8" />
    </svg>
  ),
  Algorithm: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 6h18" />
      <path d="M7 12h10" />
      <path d="M11 18h6" />
    </svg>
  ),
  Chart: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M3 3v18h18" />
      <path d="M7 17l4-6 4 2 4-5" />
    </svg>
  ),
  Cloud: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  ),
  Code: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  )
};

const FloatingTiles = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    const tiles = container.querySelectorAll('.floating-tile');
    
    // Create random animations for each tile
    tiles.forEach((tile) => {
      // Random starting position
      gsap.set(tile, {
        x: `random(-30, 30)`,
        y: `random(-30, 30)`,
        rotation: `random(-10, 10)`,
        opacity: `random(0.1, 0.3)`
      });
      
      // Create floating animation
      gsap.to(tile, {
        x: `random(-50, 50)`,
        y: `random(-50, 50)`,
        rotation: `random(-15, 15)`,
        opacity: `random(0.1, 0.4)`,
        duration: `random(20, 40)`,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: `random(0, 5)`
      });
    });
    
    return () => {
      // Clean up animations
      tiles.forEach((tile) => {
        gsap.killTweensOf(tile);
      });
    };
  }, []);
  
  // Create an array of icons
  const iconComponents = Object.values(AIMLIcons);
  
  // Generate tiles with different sizes and icons
  const generateTiles = (count) => {
    const tiles = [];
    
    for (let i = 0; i < count; i++) {
      const IconComponent = iconComponents[i % iconComponents.length];
      const size = 30 + Math.floor(Math.random() * 40); // Random size between 30px and 70px
      
      tiles.push(
        <div 
          key={i}
          className="floating-tile absolute opacity-20"
          style={{ 
            width: `${size}px`, 
            height: `${size}px`,
            color: i % 2 === 0 ? '#38bdf8' : '#a855f7', // Alternate between sky blue and purple
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        >
          <IconComponent />
        </div>
      );
    }
    
    return tiles;
  };
  
  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      {generateTiles(15)}
    </div>
  );
};

export default FloatingTiles;