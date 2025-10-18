import React, { useState, useEffect } from 'react';

// Enhanced ScrollIndicator that works with multiple sections
const ScrollIndicator = ({ sectionsList }) => {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = sectionsList && sectionsList.length > 0
    ? sectionsList
    : ['.hero-section', '.about-preview-section', '.projects-section', '.invitation-section'];
  
  // Function to scroll to the next section
  const handleScrollClick = () => {
    const nextSectionIndex = (currentSection + 1) % sections.length;
    const nextSection = document.querySelector(sections[nextSectionIndex]);
    
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setCurrentSection(nextSectionIndex);
    }
  };
  
  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Determine which section is currently in view
      for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector(sections[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop - windowHeight/2 && 
              scrollPosition < sectionTop + windowHeight/2) {
            setCurrentSection(i);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections]);

  return (
    <button 
      onClick={handleScrollClick}
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 group hover:scale-110 transition-transform duration-300"
    >
      <div className="flex flex-col items-center space-y-2 text-gray-300 group-hover:text-white">
        <span className="text-sm font-medium">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-white rounded-full flex justify-center group-hover:scale-105 transition-all duration-300">
          <div className="w-1 h-3 bg-gray-400 group-hover:bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
        <span className="text-xs">{currentSection + 1}/{sections.length}</span>
      </div>
    </button>
  );
};

export default ScrollIndicator;