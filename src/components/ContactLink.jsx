import React from 'react';

const ContactLink = ({ title, href }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      // 'group' is essential for the hover effect on the child span
      // 'relative' allows us to position the line inside the link
      className="contact-link group relative block w-full text-center"
    >
      <h2 className="text-6xl md:text-8xl font-bold uppercase tracking-tighter text-white">
        {title}
      </h2>
      
      {/* This span is the animated strikethrough line. It starts with a width of 0
          and expands to 100% of the parent's width on hover. */}
      <span 
        className="absolute left-0 top-1/2 -translate-y-1/2
                   h-2 md:h-3 bg-sky-500
                   w-0 transition-all duration-500 ease-in-out
                   group-hover:w-full"
      ></span>
    </a>
  );
};

export default ContactLink;