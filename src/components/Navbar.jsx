import React, { useState, useEffect } from 'react';
import logoImg from '../assets/logo.jpg';
import { FiMenu, FiX } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Add entrance animation for navbar
    gsap.fromTo('.navbar', 
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Use GSAP for smooth scrolling
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: element, offsetY: 80 },
        ease: 'power2.inOut'
      });
    }
  };

  const handleNavClick = (sectionId) => {
    // Add click animation
    gsap.to(`[data-section="${sectionId}"]`, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.out',
      onComplete: () => {
        gsap.to(`[data-section="${sectionId}"]`, {
          scale: 1,
          duration: 0.1,
          ease: 'power2.out'
        });
      }
    });
    
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar relative flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32 py-6 bg-black/10 bg-gray-800/30 backdrop-blur-md z-50">
      {/* Left side - Logo/Brand */}
      <div 
        className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-300" 
        onClick={() => handleNavClick('work')}
        data-section="work"
      >
        <img src={logoImg} alt="CodeCrafter Logo" className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg object-cover" />
        <span className="hidden sm:block">CodeCrafter</span>
        <span className="sm:hidden">CC</span>
      </div>
      
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-8">
        <button 
          onClick={() => handleNavClick('work')}
          data-section="work"
          className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform"
        >
          Work
        </button>
        <button 
          onClick={() => handleNavClick('services')}
          data-section="services"
          className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform"
        >
          Service
        </button>
        <button 
          onClick={() => handleNavClick('tools')}
          data-section="tools"
          className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform"
        >
          Tools
        </button>
        <button 
          onClick={() => handleNavClick('about')}
          data-section="about"
          className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform"
        >
          About
        </button>
        <button 
          onClick={() => handleNavClick('contact')}
          data-section="contact"
          className="text-gray-300 hover:text-white transition-colors duration-300 hover:scale-105 transform"
        >
          Contact
        </button>
        <button 
          onClick={() => handleNavClick('contact')}
          data-section="contact"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all duration-300 font-medium hover:scale-105 transform hover:shadow-lg"
        >
          Get in Touch
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-white p-2 hover:bg-gray-800/50 rounded-lg transition-colors duration-300 z-50 hover:scale-110 transform"
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
          top: '80px',
          maxHeight: 'calc(100vh - 80px)',
          overflowY: 'auto'
        }}
      >
        <div className="flex flex-col space-y-0">
          <button 
            onClick={() => handleNavClick('work')}
            data-section="work"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700 hover:scale-105 transform"
          >
            Work
          </button>
          <button 
            onClick={() => handleNavClick('services')}
            data-section="services"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700 hover:scale-105 transform"
          >
            Service
          </button>
          <button 
            onClick={() => handleNavClick('tools')}
            data-section="tools"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700 hover:scale-105 transform"
          >
            Tools
          </button>
          <button 
            onClick={() => handleNavClick('about')}
            data-section="about"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700 hover:scale-105 transform"
          >
            About
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            data-section="contact"
            className="text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all duration-300 px-6 py-4 text-left border-b border-gray-700 hover:scale-105 transform"
          >
            Contact
          </button>
          <button 
            onClick={() => handleNavClick('contact')}
            data-section="contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-left transition-all duration-300 font-medium hover:scale-105 transform"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Animation styles */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </nav>
  )
}

export default Navbar 