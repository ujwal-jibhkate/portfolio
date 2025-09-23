import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// This component now has more <path> elements to create a denser line effect.
const WavePattern = () => (
  <svg 
    className="w-full h-full flex-shrink-0" 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 800 800"
    preserveAspectRatio="none"
  >
    {/* Original lines + new lines for a total of 9 */}
    <path d="M 0 380 Q 200 350 400 380 T 800 380" stroke="white" strokeWidth="0.5" fill="none" />
    <path d="M 0 400 Q 200 450 400 400 T 800 400" stroke="white" strokeWidth="2" fill="none" />
    <path d="M 0 420 Q 200 380 400 420 T 800 420" stroke="white" strokeWidth="1.5" fill="none" />
    <path d="M 0 440 Q 200 480 400 440 T 800 440" stroke="white" strokeWidth="1" fill="none" />
    <path d="M 0 460 Q 200 420 400 460 T 800 460" stroke="white" strokeWidth="0.5" fill="none" />
    <path d="M 0 480 Q 200 450 400 480 T 800 480" stroke="white" strokeWidth="1" fill="none" />
    <path d="M 0 500 Q 200 530 400 500 T 800 500" stroke="white" strokeWidth="1.5" fill="none" />
    <path d="M 0 520 Q 200 490 400 520 T 800 520" stroke="white" strokeWidth="0.5" fill="none" />
    <path d="M 0 540 Q 200 560 400 540 T 800 540" stroke="white" strokeWidth="1" fill="none" />
  </svg>
);

const WavyLines = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        xPercent: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: '.projects-section',
          start: 'top bottom',
          end: 'bottom top',
          // The scrub value has been decreased to make the animation faster
          scrub: 1, 
        },
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full opacity-20 overflow-hidden">
      <div ref={containerRef} className="w-[200%] h-full flex">
        <WavePattern />
        <WavePattern />
      </div>
    </div>
  );
};

export default WavyLines;