import React, { useState, useEffect, useRef } from 'react';
import { FiExternalLink, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const projects = [
  {
    title: 'Wellness TCYS',
    description: 'Comprehensive wellness platform for practitioners and clients.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
    caseStudy: '#',
    website: '#',
  },
  {
    title: 'Modern SaaS Dashboard',
    description: 'A modern analytics dashboard for SaaS businesses.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    caseStudy: '#',
    website: '#',
  },
  {
    title: 'E-Commerce Platform',
    description: 'A scalable e-commerce platform for online retailers.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    caseStudy: '#',
    website: '#',
  },
];

function PortfolioSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, exit, enter
  const total = projects.length;
  const timerRef = useRef();
  const animationDuration = 600; // ms

  const nextProject = () => setCurrent((prev) => (prev + 1) % total);
  const prevProject = () => setCurrent((prev) => (prev - 1 + total) % total);

  // New animation handler with phases
  const animateTo = (changer, direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationPhase('exit');
    
    setTimeout(() => {
      changer();
      setAnimationPhase('enter');
      
      setTimeout(() => {
        setAnimationPhase('idle');
        setIsAnimating(false);
      }, animationDuration / 2);
    }, animationDuration / 2);
  };

  // Auto-advance every 3 seconds
  useEffect(() => {
    timerRef.current && clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      animateTo(nextProject, 'next');
    }, 3000);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [current, total]);

  const project = projects[current];

  // Manual navigation resets timer and animates
  const handlePrev = () => {
    clearInterval(timerRef.current);
    animateTo(prevProject, 'prev');
  };
  const handleNext = () => {
    clearInterval(timerRef.current);
    animateTo(nextProject, 'next');
  };

  return (
    <section className="w-full py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Badge */}
        <div className="flex justify-center mb-4">
          <span className="px-4 py-1 rounded-full bg-[#181b20] text-blue-100 text-sm font-medium shadow border border-[#23272f]">Featured Projects</span>
        </div>
        {/* Heading */}
        <h2 className="text-5xl md:text-6xl font-extrabold text-white text-center mb-3"> Past Projects</h2>
        {/* Subtitle */}
        <p className="text-center text-blue-100 text-xl mb-16">
          <span className="font-bold text-white">Explore real results</span> from our recent projects.<br />
          Each solution delivered <span className="font-bold text-blue-200">measurable business impact</span> for our clients.
        </p>
        {/* Project Card - New Animation Container */}
        <div className="relative rounded-xl overflow-hidden max-w-7xl mx-auto min-h-[440px] bg-[#232428] shadow-2xl">
          {/* Image Section - New Slide Animation */}
          <div className={`absolute left-0 top-0 md:w-1/2 w-full h-full transition-all duration-${animationDuration} ease-in-out ${
            animationPhase === 'exit' ? 'transform translate-x-full rotate-y-12' : 
            animationPhase === 'enter' ? 'transform -translate-x-full rotate-y-12' : 
            'transform translate-x-0 rotate-y-0'
          }`}>
            <div className="relative w-full h-full bg-[#191a1e] rounded-l-3xl overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title} 
                className={`object-cover w-full h-full md:rounded-l-3xl transition-all duration-${animationDuration} ${
                  animationPhase !== 'idle' ? 'filter brightness-75 blur-sm' : 'filter brightness-100 blur-0'
                }`} 
              />
              {/* Dynamic gradient overlay on image (keep for subtle effect) */}
              <div className={`absolute inset-0 w-full h-full pointer-events-none transition-all duration-${animationDuration} ${
                animationPhase !== 'idle' ? 'opacity-0' : 'opacity-100'
              }`} 
                style={{
                  background: 'linear-gradient(45deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(35,36,40,0.9) 100%)'
                }}
              ></div>
              {/* Persistent vertical gradient between image and text */}
              <div className="hidden md:block absolute right-0 top-0 h-full w-16 pointer-events-none z-20" style={{background: 'linear-gradient(to right, rgba(35,36,40,0.0) 0%, rgba(35,36,40,0.7) 100%)'}}></div>
              {/* Left Arrow */}
              <button 
                onClick={handlePrev} 
                className={`absolute left-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 z-20 hover:scale-110 hover:border-2 hover:border-blue-400 ${
                  isAnimating ? 'pointer-events-none opacity-30' : ''
                }`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span className="flex items-center justify-center w-full h-full"><FiArrowLeft size={24} /></span>
              </button>
            </div>
          </div>
          
          {/* Text Section - New Slide Animation */}
          <div className={`absolute right-0 top-0 md:w-1/2 w-full h-full transition-all duration-${animationDuration} ease-in-out ${
            animationPhase === 'exit' ? 'transform translate-x-full -rotate-y-12' : 
            animationPhase === 'enter' ? 'transform -translate-x-full -rotate-y-12' : 
            'transform translate-x-0 rotate-y-0'
          }`}>
            <div className="relative w-full h-full flex flex-col justify-center p-12 md:p-16 bg-[#232428] rounded-r-3xl">
              <h3 className={`text-2xl md:text-3xl font-bold text-white mb-3 transition-all duration-${animationDuration} ${
                animationPhase !== 'idle' ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'
              }`}>
                {project.title}
              </h3>
              <p className={`text-blue-100 text-base mb-6 transition-all duration-${animationDuration} delay-75 ${
                animationPhase !== 'idle' ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'
              }`}>
                {project.description}
              </p>
              <div className={`flex gap-3 mb-2 transition-all duration-${animationDuration} delay-150 ${
                animationPhase !== 'idle' ? 'transform translate-y-4 opacity-0' : 'transform translate-y-0 opacity-100'
              }`}>
                <a href={project.caseStudy} className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 border border-blue-400 flex items-center gap-2 shadow-lg hover:shadow-blue-500/25 hover:scale-105">
                  View Case Study <span className="text-lg">&#8594;</span>
                </a>
                <a href={project.website} className="bg-[#23272f] hover:bg-blue-900 text-blue-100 border border-blue-400 px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-400/25 hover:scale-105">
                  Visit Website <FiExternalLink className="text-lg" />
                </a>
              </div>
              {/* Right Arrow */}
              <button 
                onClick={handleNext} 
                className={`absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 z-20 hover:scale-110 hover:border-2 hover:border-blue-400 ${
                  isAnimating ? 'pointer-events-none opacity-30' : ''
                }`}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
              >
                <span className="flex items-center justify-center w-full h-full"><FiArrowRight size={24} /></span>
              </button>
            </div>
          </div>
          

        </div>
      </div>
    </section>
  );
}

export default PortfolioSection; 