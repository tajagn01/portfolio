import React, { useState } from 'react';
import logoImg from '../assets/logo.jpg';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop - 80; // Account for navbar height
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200; // 1.2 seconds for buttery smooth animation
      let start = null;

      function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      // Cubic easing function for buttery smooth animation
      function easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <nav className="relative flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32 py-6 bg-black/10 bg-gray-800/30 backdrop-blur-md z-50">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white cursor-pointer" onClick={() => handleNavClick('work')}>
        <img src={logoImg} alt="CodeCrafter Logo" className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-cover mix-blend-multiply filter brightness-0 invert" />
        <span className="hidden sm:block">CodeCrafter</span>
        <span className="sm:hidden">CC</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => handleNavClick('work')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Work
        </button>
        <button 
          onClick={() => handleNavClick('services')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Service
        </button>
        <button 
          onClick={() => handleNavClick('tools')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Tools
        </button>
        <button 
          onClick={() => handleNavClick('about')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          About
        </button>
        <button 
          onClick={() => handleNavClick('contact')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Contact
        </button>
        <button 
          onClick={() => handleNavClick('contact')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-medium"
        >
          Get in Touch
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-300 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsMenuOpen(false)}
          style={{ animation: 'fadeIn 0.3s ease-out' }}
        />
      )}

      {/* Mobile Menu */}
      <div 
        className={`fixed top-0 left-0 right-0 bg-black/95 backdrop-blur-md border-b border-gray-700 transition-all duration-300 ease-in-out z-50 md:hidden ${
          isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        style={{ 
          top: '80px', // Position below navbar
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}
      >
        <div className="flex flex-col space-y-0">
          <button 
            onClick={() => handleNavClick('work')}
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700"
          >
            Work
          </button>
          <button 
            onClick={() => handleNavClick('services')}
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700"
          >
            Service
          </button>
          <button 
            onClick={() => handleNavClick('tools')}
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700"
          >
            Tools
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700"
          >
            Contact
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-left transition-all duration-300 font-medium"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar 