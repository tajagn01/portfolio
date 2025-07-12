import React, { useState, useEffect } from 'react';
import { FaLinkedinIn, FaGoogle, FaTrophy } from 'react-icons/fa';
import { BsCalendar2Event } from 'react-icons/bs';
import { MdDesignServices } from 'react-icons/md';
import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import tajagnImg from '../assets/tajagn.png';

function HeroSection() {
  // Interpolated mouse position for the glow
  const [glowCenter, setGlowCenter] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
      const mouseY = ((e.clientY - rect.top) / rect.height) * 100;
      // Interpolate: 70% center, 30% mouse
      const x = 50 + (mouseX - 50) * 0.3;
      const y = 50 + (mouseY - 50) * 0.3;
      setGlowCenter({ x, y });
    };

    const section = document.querySelector('.hero-section');
    if (section) {
      section.addEventListener('mousemove', handleMouseMove);
      return () => section.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <section className="hero-section relative flex flex-col md:flex-row items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32 py-16 min-h-[80vh] font-sans overflow-hidden bg-black">
      {/* Main Black Background Gradient with Medium, Subtle Centered Blue Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(circle at ${glowCenter.x}% ${glowCenter.y}%, rgba(96,165,250,0.18) 0%, transparent 35%), radial-gradient(circle at 50% 50%, #000 0%, #000 100%)`,
            filter: 'blur(20px)'
          }}
        ></div>
      </div>
      
      {/* Animated Holo Rings - Now active for dynamic effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-5 w-[120vw] h-[120vw] max-w-[1800px] max-h-[1800px]">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[900px] max-h-[900px] rounded-full blur-[40px] opacity-20 animate-holoRing1"
          style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.3) 60%, transparent 100%)' }}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1200px] max-h-[1200px] rounded-full blur-[60px] opacity-15 animate-holoRing2"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.2) 60%, transparent 100%)' }}></div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1500px] max-h-[1500px] rounded-full blur-[80px] opacity-10 animate-holoRing3"
          style={{ background: 'radial-gradient(circle, rgba(96,165,250,0.1) 60%, transparent 100%)' }}></div>
      </div>
      
      {/* Content Layer */}
      <div className="flex-1 z-20 relative">
        {/* Available for Projects Badge */}
        <div className="flex items-center gap-2 bg-black/60 border border-white/20 px-6 py-1.5 rounded-full shadow-lg text-white text-sm font-medium backdrop-blur-md w-max mb-8 animate-float" style={{boxShadow: '0 2px 16px 0 rgba(0,0,0,0.12)'}}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400"></span>
          </span>
          <span className="text-blue-100">Available for Projects</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6 mt-0" style={{fontFamily: 'Poppins, Inter, Arial, sans-serif'}}>
          Helping <br />
          Entrepreneurs <br />
          <span className="text-blue-300" style={{color: '#A3C9F9'}}>Dreams Come To<br />Life</span>
        </h1>
        
        <div className="flex flex-wrap gap-4 mb-6">
          <button className="flex items-center gap-2 bg-blue-200 hover:bg-blue-300 text-black px-6 py-3 rounded-lg font-semibold text-lg transition shadow border border-blue-200">
            Start Your Project <FiArrowUpRight className="text-xl" />
          </button>
          <button className="flex items-center gap-2 border border-blue-200 text-blue-200 hover:bg-blue-200 hover:text-black px-6 py-3 rounded-lg font-semibold text-lg transition shadow">
            View Portfolio <FiArrowRight className="text-xl" />
          </button>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-4">
          <a href="#" className="flex items-center gap-2 bg-[#17212b] text-blue-200 px-4 py-2 rounded-md text-base font-medium hover:bg-blue-900 transition shadow">
            <FaLinkedinIn className="text-blue-400 text-lg" /> LinkedIn
          </a>
          <a href="#" className="flex items-center gap-2 bg-[#17212b] text-blue-200 px-4 py-2 rounded-md text-base font-medium hover:bg-blue-900 transition shadow">
            <BsCalendar2Event className="text-blue-400 text-lg" /> Book a Free UX Audit
          </a>
          <a href="#" className="flex items-center gap-2 bg-yellow-900 text-yellow-200 px-4 py-2 rounded-md text-base font-medium hover:bg-yellow-700 transition shadow">
            <FaTrophy className="text-yellow-400 text-lg" /> Awwwards
          </a>
        </div>
        
        <div className="flex flex-wrap gap-3 mb-8">
          <a href="#" className="flex items-center gap-2 bg-[#17212b] text-blue-200 px-4 py-2 rounded-md text-base font-medium hover:bg-blue-900 transition shadow">
            <FaGoogle className="text-blue-400 text-lg" /> Google Business
          </a>
          <a href="#" className="flex items-center gap-2 bg-red-900 text-red-200 px-4 py-2 rounded-md text-base font-medium hover:bg-red-700 transition shadow">
            <MdDesignServices className="text-red-400 text-lg" /> Design Rush
          </a>
        </div>
      </div>
      
      {/* Right Side - Image */}
      <div className="flex-1 flex flex-col items-center md:items-end justify-center relative mt-12 md:mt-0 z-20">
        {/* Glowing gradient behind image */}
        <div className="absolute w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-br from-blue-300/60 via-blue-400/50 to-blue-500/60 blur-2xl animate-glow-float"></div>
        <img 
          src={tajagnImg} 
          alt="Tajagn" 
          className="w-96 h-96 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] object-contain rounded-3xl shadow-lg opacity-95 relative z-10 animate-float" 
        />
      </div>
      
      {/* Scroll to explore - Hidden on mobile */}
      <div className="hidden md:flex absolute left-1/2 bottom-8 transform -translate-x-1/2 flex-col items-center z-20">
        <div className="w-8 h-12 border-2 border-gray-400 rounded-full flex items-start justify-center mb-2 animate-bounce">
          <div className="w-1 h-3 bg-blue-400 rounded-full mt-2"></div>
        </div>
        <span className="text-gray-300 text-base font-medium">Scroll to explore</span>
      </div>
      
      {/* Keyframes for holo ring animation */}
      <style>{`
        @keyframes holoRing1 {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.08); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
        }
        @keyframes holoRing2 {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
          50% { transform: translate(-50%, -50%) scale(1.12); opacity: 0.25; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
        }
        @keyframes holoRing3 {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
          50% { transform: translate(-50%, -50%) scale(1.16); opacity: 0.2; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.1; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes glow-float {
          0% { transform: translateY(0px) scale(1); opacity: 0.6; }
          25% { transform: translateY(-5px) scale(1.05); opacity: 0.8; }
          50% { transform: translateY(-10px) scale(1.1); opacity: 0.6; }
          75% { transform: translateY(-5px) scale(1.05); opacity: 0.8; }
          100% { transform: translateY(0px) scale(1); opacity: 0.6; }
        }
        .animate-holoRing1 { animation: holoRing1 6s ease-in-out infinite; }
        .animate-holoRing2 { animation: holoRing2 8s ease-in-out infinite; }
        .animate-holoRing3 { animation: holoRing3 10s ease-in-out infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-glow-float { animation: glow-float 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
}

export default HeroSection;