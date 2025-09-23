import React from 'react';

const ProjectCard = ({ category, title, description, imageUrl, link }) => {
  return (
    // This is the main card container, with a hover effect
    <a 
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="project-card block bg-[#111111] border border-gray-800 rounded-lg overflow-hidden
                 shadow-lg transition-all duration-300 ease-in-out
                 hover:shadow-sky-400/20 hover:-translate-y-2"
    >
      <img 
        src={imageUrl} 
        alt={title}
        className="w-full h-56 object-cover" 
      />
      <div className="p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-sky-400">{category}</p>
        <h3 className="mt-2 text-2xl font-bold text-white">{title}</h3>
        <p className="mt-3 text-gray-400">{description}</p>
      </div>
    </a>
  );
};

export default ProjectCard;