import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Helper function to get random speed
function getRandomSpeed() {
  return 0.8 + Math.random() * 0.7;
}

// LetterDisplay component
const LetterDisplay = ({ word }) => {
  return (
    <>
      {word.split('').map((char, i) => (
        <div
          key={i}
          className="letter text-8xl font-semibold xs:text-[120px] sm:text-[140px] md:text-[160px] lg:text-[180px] xl:text-[200px] 2xl:text-[220px]"
          style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          data-speed={getRandomSpeed()}
        >
          {char === ' ' ? '\u00A0' : char}
        </div>
      ))}
    </>
  );
};

// Helper function to get random rotation
function getRandomRotation() {
  return Math.random() * 60 - 30;
}

// Animation function
function animateLettersOnScroll(ref) {
  const nodes = ref.current?.querySelectorAll('.letter') || [];
  nodes.forEach(letter => {
    const speed = parseFloat(letter.dataset.speed || '1');
    gsap.to(letter, {
      // Restored original highlight amplitude for hero text animation
      // Uses page height for movement to bring back the bold effect.
      y: (1 - speed) * ScrollTrigger.maxScroll(window),
      rotation: getRandomRotation(),
      ease: 'power2.out',
      duration: 0.8,
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        scrub: 0.5,
        invalidateOnRefresh: true
      }
    });
  });
}

const HeroAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    let ctx;
    // A small timeout to ensure everything is rendered before the animation starts
    const timer = setTimeout(() => {
      if (!ref.current) return;
      ctx = gsap.context(() => {
        animateLettersOnScroll(ref);
      }, ref);
      // Removed recursive refresh listener to prevent stack overflow
      // Rely on invalidateOnRefresh for correct behavior
    }, 100);
    
    return () => {
      clearTimeout(timer);
      ctx?.revert();
    };
  }, []);


  return (
    <div ref={ref} className="ml-8 scroll-smooth relative overflow-hidden">


      <div className="-mt-28 mb-36 flex h-screen flex-col justify-end lg:mb-24">
        <div className="flex flex-wrap">
          <LetterDisplay word="I like to Learn" />
        </div>
        <div className="flex flex-wrap">
          <LetterDisplay word="New Things" />
        </div>
      </div>
      <div className="flex flex-wrap">
        <LetterDisplay word="Creative" />
        <div className="w-4 sm:w-10" />
        <LetterDisplay word="Innovative" />
        <div className="w-4 sm:w-10" />
        <LetterDisplay word="Curious" />
      </div>
    </div>
  );
};

export default HeroAnimation;