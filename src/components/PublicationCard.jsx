import React, { useState } from 'react';

const PublicationCard = ({ category, title, description, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="publication-card group relative block h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Soft ambient glow on hover */}
      <span className={`absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-purple-500/20 blur-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Gradient frame with glass interior */}
      <div className="rounded-2xl p-[2px] bg-gradient-to-br from-sky-500 via-blue-600 to-purple-600">
        <div className="rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 p-6 md:p-8 flex flex-col h-full min-h-[22rem] w-[20rem] md:w-[22rem]
                        shadow-lg transition-all duration-500 ease-in-out
                        group-hover:-translate-y-1 group-hover:shadow-sky-500/25">
          {/* Accent line */}
          <div className="h-[3px] w-20 bg-gradient-to-r from-sky-500 via-blue-500 to-purple-500 rounded-full mb-4" />

          <p className={`text-xs font-semibold uppercase tracking-wider transition-colors duration-300 ${isHovered ? 'text-sky-700' : 'text-sky-600'}`}>{category}</p>
          <h3 className="mt-2 text-xl md:text-2xl font-bold text-gray-900">{title}</h3>

          {/* Limit description height to keep cards consistent */}
          <p className="mt-3 text-gray-700 flex-grow overflow-hidden max-h-28">{description}</p>

          {/* Read more CTA */}
          <div className="mt-6 flex items-center text-sky-700 font-semibold">
            <span className="mr-2">Read More</span>
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </a>
  );
};

export default PublicationCard;