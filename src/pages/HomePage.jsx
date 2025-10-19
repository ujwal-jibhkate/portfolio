import HeroAnimation from '../components/HeroAnimation';
import AboutPreview from '../components/AboutPreview';
import ScrollIndicator from '../components/ScrollIndicator';
import InvitationSection from '../components/InvitationSection';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  // Add scroll animations
  useEffect(() => {
    // Animation for section transitions
    const sections = document.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      if (section.classList.contains('about-preview-section')) return;
      gsap.fromTo(section, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <section className="hero-section h-screen relative z-0">
        <HeroAnimation />
      </section>

      <section className="about-preview-section relative z-10">
        <AboutPreview />
      </section>
      
      <section className="invitation-section relative z-0">
        <InvitationSection />
      </section>
      
      {/* Fixed ScrollIndicator that persists across all screens */}
      <ScrollIndicator sectionsList={[".hero-section", ".about-preview-section", ".invitation-section"]} />
    </>
  );
};

export default HomePage;