import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom'; // 1. Import the useNavigate hook

const AboutPreview = () => {
  const buttonRef = useRef(null);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const handleAboutClick = () => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const clone = button.cloneNode(true);

    clone.style.position = 'fixed';
    clone.style.top = `${rect.top}px`;
    clone.style.left = `${rect.left}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '50';
    clone.style.backgroundColor = '#0ea5e9';
    
    const swipeLayer = clone.querySelector('div');
    if (swipeLayer) {
        swipeLayer.remove();
    }
    
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
        // 3. Navigate to the '/about' page after the animation is complete
        navigate('/about');
        
        // Clean up the clone and restore the button after a short delay
        setTimeout(() => {
          document.body.removeChild(clone);
          gsap.set(button, { opacity: 1 });
        }, 100); // A shorter delay for a quicker transition
      }
    });
  };

  return (
    <section className="about-preview-section h-screen bg-white text-black flex items-center justify-center">
      <div className="container mx-auto px-12">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-4">
            <p className="text-2xl text-gray-800 leading-relaxed">
            "I like to learn new things." As a self-described epistemophile, this is the simple motto that fuels my work as a software engineer. My focus is on the complete lifecycle of an AI application—from training a deep learning model in PyTorch to containerizing it with Docker and deploying it via a high-performance API.
            </p>
            <p className="text-2xl text-gray-800 leading-relaxed">
            I enjoy taking ideas from concept to reality, whether it's an enterprise-grade GenAI solution at IBM or a full-stack recommender system for a personal project. I am currently deepening my expertise in MLOps and cloud-native AI, driven by a constant curiosity to build more scalable and efficient systems.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <button
              ref={buttonRef}
              onClick={handleAboutClick}
              className="group w-64 h-64 md:w-80 md:h-80 bg-black rounded-full flex flex-col items-center justify-center text-white transition-transform duration-300 ease-in-out hover:scale-105 relative overflow-hidden"
            >
              <div 
                className="absolute inset-0 w-full h-full bg-sky-500 transform -translate-x-full transition-transform duration-500 ease-in-out group-hover:translate-x-0"
              ></div>
              <span className="relative text-4xl md:text-5xl font-semibold">
                About Me
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutPreview;