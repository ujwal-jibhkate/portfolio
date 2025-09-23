import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ProjectCard from '../components/ProjectCard';

gsap.registerPlugin(ScrollTrigger);

// Project Data (no changes)
const projectData = [
  {
    category: "AI / ML Engineering",
    title: "GenAI Enterprise Solution",
    description: "Led the development of two production-intent GenAI applications using Azure OpenAI and Watsonx for a major UK utility provider, enhancing customer service.",
    imageUrl: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070",
    link: "#"
  },
  {
    category: "Full-Stack Development",
    title: "AI-Powered Recommender System",
    description: "A personal project building a complete movie recommender system, from data scraping and model training to a full-stack web application.",
    imageUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?q=80&w=1931",
    link: "#"
  },
  {
    category: "Cloud & DevOps",
    title: "Cloud Data Migration",
    description: "Ensured 100% data integrity for a migration of over 500,000 customer records to the cloud, using COBOL and DB2 validation scripts.",
    imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070",
    link: "#"
  }
];


const ProjectsPage = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // This new animation logic staggers the reveal of each card
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.project-card').forEach((card, index) => {
          gsap.from(card, {
            opacity: 0,
            y: 100,
            scale: 0.9,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%', // Start animation when card is 90% from the top of the viewport
              toggleActions: 'play none none none',
            }
          });
        });
      }, containerRef);
      return () => ctx.revert();
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div ref={containerRef} className="bg-black text-white py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold">My Projects</h1>
          <p className="text-lg text-gray-400 mt-4">A selection of my work in AI, software, and beyond.</p>
        </div>
        
        {/* A responsive grid for the project cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {projectData.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;