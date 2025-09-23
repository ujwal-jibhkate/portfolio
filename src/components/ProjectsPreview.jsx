import React, { useRef } from 'react';
import { gsap } from 'gsap';
import WavyLines from './WavyLines';

const ProjectsPreview = () => {
  const buttonRef = useRef(null);

  // This is the animation logic for the button click
  const handleProjectClick = () => {
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Create a clone to animate, leaving the original button in place
    const clone = button.cloneNode(true);
    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '50'; // Ensure it animates over everything
    document.body.appendChild(clone);

    gsap.set(button, { opacity: 0 });

    gsap.to(clone, {
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 0.7,
      ease: 'power3.inOut',
      onComplete: () => {
        console.log("Navigate to Projects Page!");
        setTimeout(() => {
          document.body.removeChild(clone);
          gsap.set(button, { opacity: 1 });
        }, 500);
      }
    });
  };

  return (
    // The 'projects-section' class is the trigger for the line animation.
    // Flexbox is used here to perfectly center the button container.
    <section className="projects-section h-screen bg-black flex items-center justify-center relative overflow-hidden">
      
      {/* A SINGLE instance of WavyLines, positioned absolutely to fill the background. */}
      <WavyLines />
      
      {/* This container holds the button and sits on top of the lines. */}
      <div className="z-10">
        <button
          ref={buttonRef}
          onClick={handleProjectClick}
          className="w-64 h-64 md:w-80 md:h-80 bg-white text-black rounded-full flex items-center justify-center text-4xl md:text-5xl font-semibold transition-transform duration-300 hover:scale-105"
        >
          Projects
        </button>
      </div>
    </section>
  );
};

export default ProjectsPreview;