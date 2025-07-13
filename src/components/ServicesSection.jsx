import React, { useState } from 'react';
import { FiGlobe, FiPenTool } from 'react-icons/fi';
import { useSectionAnimation } from '../hooks/useSectionAnimation';

function ServicesSection() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useSectionAnimation();

  const handleMouseMove = (e, cardIndex) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const handleMouseLeave = (e, cardIndex) => {
    e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setHoveredCard(null);
  };

  const handleMouseEnter = (cardIndex) => {
    setHoveredCard(cardIndex);
  };

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Badge */}
        <div className="animate-on-scroll flex justify-center mb-6">
          <span className="px-5 py-1.5 rounded-full bg-[#181b20] text-blue-100 text-base font-medium shadow border border-[#23272f]">Services</span>
        </div>
        {/* Heading */}
        <h2 className="animate-on-scroll text-5xl md:text-6xl font-extrabold text-white text-center mb-4">What I Deliver</h2>
        {/* Subtitle */}
        <div className="animate-on-scroll text-center text-xl mb-14">
          <span className="font-bold text-white">Results-focused solutions</span> <span className="text-blue-100">tailored to your specific business goals</span>
        </div>
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Web Development Card */}
          <div 
            className="animate-on-scroll relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl p-8 shadow border border-[#23272f] flex flex-col transition-all duration-500 ease-out cursor-pointer group"
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={(e) => handleMouseLeave(e, 0)}
            onMouseEnter={() => handleMouseEnter(0)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Pulse/Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
              hoveredCard === 0 
                ? 'bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/5 animate-pulse-glow' 
                : 'bg-transparent'
            }`}></div>
            
            {/* Bounce Animation Container */}
            <div className={`relative z-10 transition-all duration-300 ${
              hoveredCard === 0 ? 'animate-bounce-subtle' : ''
            }`}>
              <div className="flex items-center mb-6">
                <span className={`bg-[#23272f] rounded-xl p-3 mr-3 text-3xl text-blue-200 transition-all duration-300 ${
                  hoveredCard === 0 ? 'animate-pulse scale-110' : ''
                }`}>
                  <FiGlobe />
                </span>
                <span className="text-2xl font-bold text-white">Web Development</span>
              </div>
              <p className="text-blue-100 text-base mb-4">
                <span className="font-bold text-white">SEO-ready websites</span> that load in under 2 seconds and drive up to <span className="font-bold">40% more leads</span>.
              </p>
              <ul className="text-blue-100 text-base mb-6 list-none pl-0">
                <li className="mb-2 transition-all duration-300 hover:text-blue-200 hover:translate-x-1">→ 98/100 PageSpeed score</li>
                <li className="mb-2 transition-all duration-300 hover:text-blue-200 hover:translate-x-1">→ Mobile-first responsive design</li>
                <li className="mb-2 transition-all duration-300 hover:text-blue-200 hover:translate-x-1">→ Conversion-optimized layouts</li>
              </ul>
            </div>
          </div>
          
          {/* UI/UX Design Card */}
          <div 
            className="animate-on-scroll relative bg-gradient-to-br from-gray-800 via-gray-900 to-gray-950 rounded-2xl p-8 shadow border border-[#23272f] flex flex-col transition-all duration-500 ease-out cursor-pointer group"
            onMouseMove={(e) => handleMouseMove(e, 1)}
            onMouseLeave={(e) => handleMouseLeave(e, 1)}
            onMouseEnter={() => handleMouseEnter(1)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Pulse/Glow Effect */}
            <div className={`absolute inset-0 rounded-2xl transition-all duration-500 ${
              hoveredCard === 1 
                ? 'bg-gradient-to-br from-blue-400/20 via-blue-500/10 to-blue-600/5 animate-pulse-glow' 
                : 'bg-transparent'
            }`}></div>
            
            {/* Bounce Animation Container */}
            <div className={`relative z-10 transition-all duration-300 ${
              hoveredCard === 1 ? 'animate-bounce-subtle' : ''
            }`}>
              <div className="flex items-center mb-6">
                <span className={`bg-[#23272f] rounded-xl p-3 mr-3 text-3xl text-blue-200 transition-all duration-300 ${
                  hoveredCard === 1 ? 'animate-pulse scale-110' : ''
                }`}>
                  <FiPenTool />
                </span>
                <span className="text-2xl font-bold text-white">UI/UX Design</span>
              </div>
              <p className="text-blue-100 text-base mb-4">
                <span className="font-bold text-white">User-centered designs</span> that increase engagement by <span className="font-bold">35%</span> and reduce bounce rates by <span className="font-bold">40%</span>.
              </p>
              <ul className="text-blue-100 text-base mb-6 list-none pl-0">
                <li className="mb-2 transition-all duration-300 hover:text-blue-200 hover:translate-x-1">→ Data-driven design decisions</li>
                <li className="mb-2 transition-all duration-300 hover:text-blue-200 hover:translate-x-1">→ Intuitive user journeys</li>
                <li className="mb-2 transition-all duration-300 hover:text-blue-200 hover:translate-x-1">→ A/B tested interfaces</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ServicesSection; 