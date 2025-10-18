import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import ReactDOMServer from 'react-dom/server';



// AI/ML themed SVG icons
const AIIcons = {
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M13 3c.552 0 1 .448 1 1v5h5c.552 0 1 .448 1 1s-.448 1-1 1h-5v5c0 .552-.448 1-1 1s-1-.448-1-1v-5H7c-.552 0-1-.448-1-1s.448-1 1-1h5V4c0-.552.448-1 1-1zm-1-3c-2.761 0-5 2.239-5 5H4c-2.209 0-4 1.791-4 4s1.791 4 4 4v5c0 2.761 2.239 5 5 5s5-2.239 5-5h3c2.209 0 4-1.791 4-4s-1.791-4-4-4V5c0-2.761-2.239-5-5-5z"/>
    </svg>
  ),
  DataFlow: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.18l7 3.12v4.7c0 4.67-3.13 8.42-7 9.88-3.87-1.45-7-5.2-7-9.88V6.3l7-3.12z"/>
    </svg>
  ),
  Algorithm: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14h-2V9h-2V7h4v10z"/>
    </svg>
  ),
  Chart: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M3 13h2v7H3v-7zm4-7h2v14H7V6zm4 3h2v11h-2V9zm4-6h2v17h-2V3z"/>
    </svg>
  ),
  Genomics: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M4 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm4.89 1.06l1.7 1.7c.2.2.2.51 0 .71l-1.7 1.7c-.2.2-.51.2-.71 0l-1.7-1.7c-.2-.2-.2-.51 0-.71l1.7-1.7c.2-.2.51-.2.71 0zM9 15c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm4.89 1.06l1.7 1.7c.2.2.2.51 0 .71l-1.7 1.7c-.2.2-.51.2-.71 0l-1.7-1.7c-.2-.2-.2-.51 0-.71l1.7-1.7c.2-.2.51-.2.71 0zM16 4c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm-7 5c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2zm4.89 1.06l1.7 1.7c.2.2.2.51 0 .71l-1.7 1.7c-.2.2-.51.2-.71 0l-1.7-1.7c-.2-.2-.2-.51 0-.71l1.7-1.7c.2-.2.51-.2.71 0z"/>
    </svg>
  ),
  Cloud: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
    </svg>
  ),
  Recommender: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )
};

const ProjectsPreview = () => {
  const buttonRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });


  // Create floating elements and text
  useEffect(() => {
    const section = sectionRef.current;
    const floatingElements = [];
    const icons = Object.values(AIIcons);
    
    // Background floating images from public/images (larger, gentle drift)
    const imagePaths = [
      '/images/ape.png',
      '/images/chat.jpg',
      '/images/embed.png',
      '/images/idea.png',
      '/images/placeholder.svg',
      '/images/profile.jpg',
      '/images/users.png',
      '/images/xray_chest.png'
    ];
    // Floating icons near center (no images)
      for (let i = 0; i < 14; i++) {
        const element = document.createElement('div');
        const size = Math.random() * 36 + 18; // 18–54px
        const IconComponent = icons[Math.floor(Math.random() * icons.length)];

        element.style.position = 'absolute';
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.opacity = '0.28';
        element.style.color = i % 2 === 0 ? '#0ea5e9' : '#a855f7';
        element.style.pointerEvents = 'none';
        element.style.zIndex = '3';
        element.style.mixBlendMode = 'screen';
        element.style.willChange = 'transform';

        // Center-biased positions (not a circle)
        const xPos = 35 + Math.random() * 30; // 35%–65%
        const yPos = 40 + Math.random() * 25; // 40%–65%
        element.style.left = `${xPos}%`;
        element.style.top = `${yPos}%`;

        const svgContainer = document.createElement('div');
        svgContainer.innerHTML = ReactDOMServer.renderToString(<IconComponent />);
        element.appendChild(svgContainer.firstChild);

        section.appendChild(element);
        floatingElements.push({ element, xPos, yPos });

        gsap.to(element, {
          y: Math.random() * 16 - 8,
          x: Math.random() * 16 - 8,
          rotation: Math.random() * 12 - 6,
          duration: 8 + Math.random() * 8,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      // Floating AI/ML term chips
      const chipTerms = [
        'Machine Learning','Deep Learning','Data Science','Genomics',
        'Recommender','Vision','NLP','Algorithms'
      ];
      chipTerms.forEach((term, idx) => {
        const el = document.createElement('span');
        el.textContent = term;
        el.style.position = 'absolute';
        el.style.fontSize = '12px';
        el.style.color = idx % 2 === 0 ? 'rgba(255,255,255,0.78)' : 'rgba(255,255,255,0.65)';
        el.style.background = 'rgba(99,102,241,0.12)';
        el.style.border = '1px solid rgba(255,255,255,0.14)';
        el.style.borderRadius = '9999px';
        el.style.padding = '4px 8px';
        el.style.pointerEvents = 'none';
        el.style.zIndex = '2';
        el.style.mixBlendMode = 'screen';

        const xPos = 34 + Math.random() * 32;
        const yPos = 36 + Math.random() * 30;
        el.style.left = `${xPos}%`;
        el.style.top = `${yPos}%`;

        section.appendChild(el);
        floatingElements.push({ element: el, xPos, yPos });

        gsap.to(el, {
          y: Math.random() * 12 - 6,
          x: Math.random() * 12 - 6,
          duration: 9 + Math.random() * 7,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      });
     // AI/ML related terms for floating text
     const aiTerms = [
       "Machine Learning", "Neural Networks", "Deep Learning", 
       "Data Science", "AI", "Genomics", "Recommender Systems",
       "Computer Vision", "NLP", "Reinforcement Learning",
       "Big Data", "Algorithms", "Predictive Analytics",
       "Feature Engineering", "Clustering", "Classification"
     ];
     
     // Ring icons rendered via JSX; random floating icons disabled
     
     // Floating text disabled per request; no text elements created
     
     return () => {
       floatingElements.forEach(({ element }) => {
         if (section.contains(element)) {
           section.removeChild(element);
         }
       });
     };
   }, []);
   
   // Track mouse position for hover effects
   useEffect(() => {
     const handleMouseMove = (e) => {
       const section = sectionRef.current;
       if (!section) return;
       
       const rect = section.getBoundingClientRect();
       setMousePosition({
         x: e.clientX - rect.left,
         y: e.clientY - rect.top
       });
     };
     
     const section = sectionRef.current;
     if (section) {
       section.addEventListener('mousemove', handleMouseMove);
     }
     
     return () => {
       if (section) {
         section.removeEventListener('mousemove', handleMouseMove);
       }
     };
   }, []);


   
   // Simple click animation: subtle press, then navigate
   const handleProjectClick = () => {
     const button = buttonRef.current;
     if (!button) {
       navigate('/projects');
       return;
     }

     gsap.fromTo(
       button,
       { scale: 1 },
       {
         scale: 0.98,
         duration: 0.12,
         ease: 'power1.out',
         yoyo: true,
         repeat: 1,
         onComplete: () => navigate('/projects')
       }
     );
   };
   
   return (
     <section 
       ref={sectionRef}
       className="projects-section h-screen bg-black flex items-center justify-center relative overflow-hidden"
     >
       {/* AI themed background layers */}
       <div className="absolute inset-0 -z-10 pointer-events-none">
         {/* Dotted grid */}
         <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,_rgba(255,255,255,0.12)_1px,_transparent_1px)] bg-[length:18px_18px]" />
         {/* Gradient blobs */}
         <div className="absolute -top-24 -left-24 w-[28rem] h-[28rem] bg-purple-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
         <div className="absolute top-1/3 -right-24 w-[24rem] h-[24rem] bg-sky-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
         <div className="absolute -bottom-24 left-1/3 w-[26rem] h-[26rem] bg-pink-500/20 rounded-full blur-3xl mix-blend-screen animate-pulse" />
         {/* Diagonal data stream */}
         <div className="absolute left-[-20%] top-[50%] w-[160%] h-[3px] opacity-40 bg-gradient-to-r from-transparent via-sky-400/50 to-transparent rotate-12 filter blur-[0.5px] mix-blend-screen animate-pulse" />
       </div>
       

       
       {/* Custom cursor effect */}
       <div 
         className="pointer-events-none absolute w-24 h-24 rounded-full mix-blend-screen filter blur-xl opacity-70 z-10"
         style={{
           background: 'radial-gradient(circle, rgba(14,165,233,0.8) 0%, rgba(168,85,247,0.4) 70%, transparent 100%)',
           left: `${mousePosition.x - 48}px`,
           top: `${mousePosition.y - 48}px`,
           opacity: isHovering ? 0.9 : 0.3,
           transition: 'opacity 0.3s ease'
         }}
       />
       
       <div className="text-center z-10">
         <h2 
           className="text-6xl sm:text-7xl md:text-8xl font-semibold mb-16 md:mb-20 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-fuchsia-500 to-purple-600 hover:from-purple-500 hover:via-sky-400 hover:to-indigo-500 transition-all duration-500"
           style={{ fontFamily: "'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
         >
           Projects
         </h2>
         <div className="relative inline-block">
           <button 
             ref={buttonRef}
             onClick={handleProjectClick}
             onMouseEnter={() => setIsHovering(true)}
             onMouseLeave={() => setIsHovering(false)}
             className="relative bg-gradient-to-r from-sky-500 via-fuchsia-500 to-indigo-600 text-white font-bold py-4 px-10 rounded-full text-lg md:text-xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)] ring-1 ring-white/20 hover:ring-2 hover:ring-fuchsia-400 group"
           >
             {/* Corner accents that appear on hover */}
             <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
             <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
             <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
             <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
             
             <span className="relative inline-block">
               View All Projects
               <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
             </span>
           </button>
           {/* Floating icon chips near the button */}
-          <img src="/images/idea.png" alt="Idea icon" className="pointer-events-none absolute -top-6 -right-16 w-8 h-8 opacity-80 animate-pulse filter drop-shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
-          <img src="/images/embed.png" alt="Embed icon" className="pointer-events-none absolute -bottom-8 -left-14 w-9 h-9 opacity-80 animate-pulse filter drop-shadow-[0_0_8px_rgba(14,165,233,0.6)]" />

         </div>
       </div>
     </section>
   );
 }

 export default ProjectsPreview;