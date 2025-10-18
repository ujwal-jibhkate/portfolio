import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profilePicture from '../assets/profile.jpg';

gsap.registerPlugin(ScrollTrigger);

// InvitationSection now supports a minimalist neutral palette via the `variant` prop.
// Usage: <InvitationSection variant="neutral" />
const InvitationSection = ({
  variant = 'sky',
  title = "Let's connect and grow together!",
  email = 'ujwaljibhkate06@gmail.com',
}) => {
  const sectionRef = useRef(null);
  const isNeutral = variant === 'neutral';

  useEffect(() => {
    // Fade and slide in as it scrolls into view
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerClasses = `min-h-screen w-full ${isNeutral ? 'bg-stone-100 text-black' : 'bg-sky-500 text-white'} flex flex-col justify-center items-start p-8 md:p-12 relative overflow-hidden`;
  const emailClasses = isNeutral
    ? 'text-xl md:text-4xl font-bold text-amber-700 hover:text-amber-800 transition-colors mt-8 md:mt-0'
    : 'text-xl md:text-4xl font-bold hover:text-gray-200 transition-colors mt-8 md:mt-0';
  const creditLinkClasses = isNeutral
    ? 'underline hover:text-black/70 transition-colors'
    : 'underline hover:text-gray-200 transition-colors';

  return (
    <section ref={sectionRef} className={containerClasses}>
      <div className="w-full max-w-6xl px-2 md:px-4">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-left">
            {title}
          </h1>
          <a href={`mailto:${email}`} className={emailClasses}>
            {email}
          </a>
        </div>
        <div className="w-full h-px bg-white my-6" />
        <div className="flex items-center space-x-4">
          <img src={profilePicture} alt="Ujwal" className="w-16 h-16 rounded-full object-cover shadow-lg" />
          <div className="text-base md:text-lg font-medium">
            <p>AI/ML Engineer</p>
            <p>LLM Enthusiast, Deep Learning Fan!</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 right-8 text-sm md:text-base md:text-right">
        <p>
          This Website Design is inspired by{' '}
          <a
            href="https://www.linkedin.com/in/bettina-sosa/"
            target="_blank"
            rel="noopener noreferrer"
            className={creditLinkClasses}
          >
            Bettina Sosa!
          </a>
        </p>
      </div>
    </section>
  );
};

export default InvitationSection;