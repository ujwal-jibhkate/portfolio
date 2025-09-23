import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 px-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Left - Name */}
          <div className="text-left">
            <p className="text-lg font-semibold text-white">Ujwal Jibhkate</p>
          </div>
          
          {/* Middle - Title */}
          <div className="text-center">
            <p className="text-sm text-white/70">AI/ML Engineer</p>
          </div>
          
          {/* Right - Acknowledgement */}
          <div className="text-right">
            <p className="text-sm text-white/70">
              This website design is inspired by{' '}
              <a 
                href="https://www.linkedin.com/in/bettina-sosa/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-white/80 underline transition-colors duration-300"
              >
                Bettina Sosa
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
