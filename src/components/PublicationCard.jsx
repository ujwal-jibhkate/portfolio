import React from 'react';

const PublicationCard = ({ category, title, description, link }) => {
  return (
    // Card size is now wider (w-[28rem]) and taller (h-72)
    <a 
      href={link} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="block w-[25rem] h-85 p-8 bg-white/70 backdrop-blur-sm border border-gray-300 rounded-lg shadow-lg
                 flex flex-col space-y-3
                 transition-all duration-300 ease-in-out
                 hover:scale-[1.03] hover:shadow-2xl hover:bg-white"
    >
      <p className="font-semibold text-amber-700 uppercase tracking-wider text-sm">
        {category}
      </p>
      <h3 className="text-2xl font-bold text-black">
        {title}
      </h3>
      <p className="text-gray-700 flex-grow text-base">
        {description}
      </p>
      <span className="font-semibold text-black group-hover:text-amber-700">
        Read More &rarr;
      </span>
    </a>
  );
};

export default PublicationCard;