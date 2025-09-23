import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePicture from '../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

const InvitationSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    // This animation fades and slides the section up as it scrolls into view
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100, // Start 100px below its final position
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%', // Start the animation when the top of the section is 85% down the screen
          toggleActions: 'play none none none', // Play the animation once and don't reverse
        }
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="h-screen w-full bg-sky-500 text-white flex flex-col justify-between p-8 md:p-12 relative overflow-hidden">
      {/* ... (the rest of the JSX is the same as before) ... */}
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold max-w-2xl leading-tight">
          Let's connect and grow together!
        </h1>
        <a href="mailto:ujwaljibhkate06@gmail.com" className="text-xl md:text-4xl font-bold hover:text-gray-200 transition-colors mt-8 md:mt-0">
          ujwaljibhkate06@gmail.com
        </a>
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <div className="flex items-center space-x-4">
          <img src={profilePicture} alt="Ujwal" className="w-16 h-16 rounded-full object-cover shadow-lg" />
          <div className="text-lg font-medium">
            <p>AI/ML Engineer</p>
            <p>LLM Enthusiast, Deep Learning Fan!</p>
          </div>
        </div>
        <div className="text-md md:text-right mt-8 md:mt-0">
          <p>
            This Website Design is inspired by{" "}
            <a href="https://www.linkedin.com/in/bettina-sosa/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-200 transition-colors">
              Bettina Sosa!
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;