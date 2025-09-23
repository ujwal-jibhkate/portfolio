import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Ujwal', href: '/', isHome: true },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Publications/Articles', href: '/publications' },
    { name: 'Contact', href: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className={`
        fixed top-0 left-8 right-8 z-50 backdrop-blur-sm
        transition-transform duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}`
      }>
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-8">
            {navItems.slice(0, -1).map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  text-white font-medium transition-all duration-300 ease-in-out
                  hover:scale-110 hover:text-white/90
                  [text-shadow:0_2px_8px_rgb(0_0_0_/_0.7)]
                  ${item.isHome ? 'text-xl font-bold' : 'text-sm'}`
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          <Link
            to="/contact"
            className="bg-white text-black px-6 py-2 rounded-full font-bold text-lg hover:bg-gray-200 hover:scale-110 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
          >
            Contact
          </Link>
        </div>
      </nav>

      {!isVisible && (
        <button
          onClick={toggleMenu}
          className="fixed top-4 right-8 z-50 bg-black text-white px-4 py-2 rounded-lg font-bold text-sm border-2 border-white/20 hover:bg-white hover:text-black hover:border-black hover:scale-110 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
        >
          Menu
        </button>
      )}

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <button onClick={toggleMenu} className="absolute top-8 right-8 text-white text-2xl font-bold hover:scale-110 transition-all duration-300">
              ×
            </button>
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={toggleMenu}
                className={`
                  text-white font-medium transition-all duration-300 ease-in-out
                  hover:scale-110 hover:text-white/90
                  [text-shadow:0_2px_8px_rgb(0_0_0_/_0.7)]
                  ${item.isHome ? 'text-3xl font-bold' : 'text-xl'}
                  ${item.name === 'Contact' ? 'bg-white text-black px-8 py-3 rounded-full font-bold text-xl hover:bg-gray-200' : ''}`
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;