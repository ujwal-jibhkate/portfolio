import React, { useEffect, useState } from 'react';

const ScrollIndicator = ({ sectionsList }) => {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const sections = sectionsList.map(selector => document.querySelector(selector));
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      sections.forEach((section, index) => {
        if (!section) return;
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionsList]);

  const scrollToSection = (index) => {
    const section = document.querySelector(sectionsList[index]);
    if (!section) return;
    
    window.scrollTo({
      top: section.offsetTop,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 pointer-events-none z-20">
      <div className="flex flex-col gap-4 pointer-events-auto">
        {sectionsList.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToSection(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === activeSection
                ? 'bg-black scale-150'
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Scroll to section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ScrollIndicator;