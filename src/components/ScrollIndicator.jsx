import React from 'react';

// This component takes a 'targetSelector' prop to know what to scroll to.
const ScrollIndicator = ({ targetSelector }) => {

  const handleScrollClick = () => {
    const nextSection = document.querySelector(targetSelector);
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <button 
      onClick={handleScrollClick}
      className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 group hover:scale-110 transition-transform duration-300"
    >
      <div className="flex flex-col items-center space-y-2 text-gray-500 group-hover:text-black">
        <span className="text-sm font-medium">Scroll</span>
        <div className="w-6 h-10 border-2 border-gray-400 group-hover:border-black rounded-full flex justify-center group-hover:scale-105 transition-all duration-300">
          <div className="w-1 h-3 bg-gray-400 group-hover:bg-black rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </button>
  );
};

export default ScrollIndicator;