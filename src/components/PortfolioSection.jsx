import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiArrowRight, FiArrowLeft, FiX } from 'react-icons/fi';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A modern, responsive e-commerce website with full shopping cart functionality and payment integration.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    caseStudy: '#',
    website: 'https://e-commrece01.netlify.app/',
    details: {
      overview: 'A fully functional e-commerce platform with modern design, shopping cart functionality, and secure payment processing for online retailers.',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Netlify'],
      features: ['Product Catalog', 'Shopping Cart', 'User Authentication', 'Payment Processing', 'Responsive Design'],
      challenges: 'Creating a seamless shopping experience with real-time cart updates and ensuring the platform works flawlessly across all devices.',
      solutions: 'Built a responsive design with modern CSS, implemented efficient state management for cart functionality, and optimized for performance and user experience.'
    }
  },
  {
    title: 'Modern SaaS Dashboard',
    description: 'A modern analytics dashboard for SaaS businesses.',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
    caseStudy: '#',
    website: '#',
    details: {
      overview: 'A comprehensive analytics dashboard providing real-time insights and data visualization for SaaS businesses, helping them make informed decisions.',
      technologies: ['React', 'TypeScript', 'D3.js', 'Chart.js', 'Firebase'],
      features: ['Real-time Analytics', 'Custom Dashboards', 'Data Export', 'User Management', 'API Integration'],
      challenges: 'Creating complex data visualizations that are both informative and performant, while handling large datasets efficiently.',
      solutions: 'Implemented optimized chart rendering with D3.js, used React.memo for performance, and created a modular dashboard system for easy customization.'
    }
  },
  {
    title: 'Gujarat Flavor Restaurant',
    description: 'A modern restaurant website showcasing authentic Gujarati cuisine with online ordering and reservation system.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    caseStudy: '#',
    website: 'https://gujaratflaver01.netlify.app/',
    details: {
      overview: 'A beautifully designed restaurant website for Gujarat Flavor, showcasing authentic Gujarati cuisine with an elegant dining experience. The website features a modern design that reflects the rich cultural heritage of Gujarat while providing a seamless user experience for customers.',
      technologies: ['React', 'JavaScript', 'CSS3', 'HTML5', 'Netlify', 'Framer Motion'],
      features: ['Menu Showcase', 'Online Reservations', 'Contact Information', 'Gallery', 'Responsive Design', 'Interactive UI'],
      challenges: 'Creating an elegant restaurant website that captures the essence of Gujarati culture while maintaining modern design standards and ensuring excellent user experience across all devices.',
      solutions: 'Designed a visually stunning website with cultural elements, implemented smooth animations using Framer Motion, created a responsive layout that works perfectly on all devices, and optimized for fast loading and excellent user experience.'
    }
  },
];

// Case Study Modal Component
const CaseStudyModal = ({ project, isOpen, onClose }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-[#232428] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#23272f]"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#232428] rounded-t-2xl p-6 border-b border-[#23272f] flex justify-between items-center">
              <h2 className="text-2xl font-bold text-white">{project.title} - Case Study</h2>
              <motion.button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 rounded-full hover:bg-[#23272f]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FiX size={24} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Project Image */}
              <div className="mb-8">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover rounded-xl shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                {/* Overview */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">Project Overview</h3>
                  <p className="text-blue-100 leading-relaxed">{project.details.overview}</p>
                </motion.div>

                {/* Technologies */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.details.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                        className="bg-blue-500/20 text-blue-200 px-3 py-1 rounded-full text-sm border border-blue-400/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                  <ul className="space-y-2">
                    {project.details.features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
                        className="flex items-center text-blue-100"
                      >
                        <span className="text-blue-400 mr-2">•</span>
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Challenges & Solutions */}
                <div className="grid md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">Challenges</h3>
                    <p className="text-blue-100 leading-relaxed">{project.details.challenges}</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">Solutions</h3>
                    <p className="text-blue-100 leading-relaxed">{project.details.solutions}</p>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#23272f]"
                >
                  <motion.a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-button bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 border border-blue-400 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Live Website <FiExternalLink className="text-lg" />
                  </motion.a>
                  <motion.button
                    onClick={onClose}
                    className="portfolio-button bg-[#23272f] hover:bg-blue-900 text-blue-100 border border-blue-400 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-400/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Close Case Study
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

function PortfolioSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationPhase, setAnimationPhase] = useState('idle');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const total = projects.length;
  const timerRef = useRef();
  const animationDuration = 600;

  // Refs for GSAP animations
  const sectionRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const mobileCardRef = useRef(null);
  const desktopContainerRef = useRef(null);
  const imageSectionRef = useRef(null);
  const textSectionRef = useRef(null);
  const buttonsRef = useRef([]);

  const nextProject = () => setCurrent((prev) => (prev + 1) % total);
  const prevProject = () => setCurrent((prev) => (prev - 1 + total) % total);

  // GSAP animations on component mount
  useEffect(() => {
    // Set initial states
    gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, mobileCardRef.current, desktopContainerRef.current], {
      opacity: 1,
      y: 0,
      scale: 1
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate badge, title, and subtitle
    tl.fromTo(badgeRef.current,
      { opacity: 0, y: 30, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo(titleRef.current,
      { opacity: 0, y: 40, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )
    .fromTo(mobileCardRef.current,
      { opacity: 0, y: 50, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(desktopContainerRef.current,
      { opacity: 0, y: 60, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
      '-=0.4'
    );

    // Animate navigation buttons
    gsap.fromTo(buttonsRef.current,
      { opacity: 0, scale: 0.8, rotation: -10 },
      { 
        opacity: 1, 
        scale: 1, 
        rotation: 0, 
        duration: 0.5, 
        stagger: 0.1, 
        ease: 'power2.out',
        delay: 0.5
      }
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Enhanced animation handler with GSAP
  const animateTo = (changer, direction) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setAnimationPhase('exit');
    
    // GSAP exit animation
    const exitTl = gsap.timeline();
    exitTl.to([imageSectionRef.current, textSectionRef.current], {
      x: direction === 'next' ? '100%' : '-100%',
      rotationY: direction === 'next' ? 15 : -15,
      opacity: 0.7,
      duration: 0.3,
      ease: 'power2.inOut'
    });
    
    setTimeout(() => {
      changer();
      setAnimationPhase('enter');
      
      // GSAP enter animation
      const enterTl = gsap.timeline();
      enterTl.fromTo([imageSectionRef.current, textSectionRef.current], {
        x: direction === 'next' ? '-100%' : '100%',
        rotationY: direction === 'next' ? -15 : 15,
        opacity: 0.7
      }, {
        x: '0%',
        rotationY: 0,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      setTimeout(() => {
        setAnimationPhase('idle');
        setIsAnimating(false);
      }, 300);
    }, 300);
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

  // Add button to ref array
  const addButtonRef = (el) => {
    if (el && !buttonsRef.current.includes(el)) {
      buttonsRef.current.push(el);
    }
  };

  return (
    <>
      <section ref={sectionRef} id="portfolio-section" className="w-full py-24 bg-black relative overflow-hidden" style={{ minHeight: '600px' }}>
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10 gradient-animate"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-4">
                    <motion.span 
            ref={badgeRef}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            className="px-4 py-1 rounded-full bg-[#181b20] text-blue-100 text-sm font-medium shadow border border-[#23272f]"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            Featured Projects
          </motion.span>
          </div>
          
          {/* Heading */}
          <motion.h2 
            ref={titleRef}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            className="text-5xl md:text-6xl font-extrabold text-white text-center mb-3"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Past Projects
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            ref={subtitleRef}
            initial={{ opacity: 1, y: 0 }}
            className="text-center text-blue-100 text-xl mb-16"
          >
            <span className="font-bold text-white">Explore real results</span> from our recent projects.<br />
            Each solution delivered <span className="font-bold text-blue-200">measurable business impact</span> for our clients.
          </motion.p>
          
          {/* Mobile Layout */}
          <motion.div 
            ref={mobileCardRef}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            className="md:hidden"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="project-card relative rounded-xl overflow-hidden bg-[#232428] shadow-2xl">
              {/* Image Section */}
              <div className="relative h-64 bg-[#191a1e] overflow-hidden">
                <motion.img 
                  key={current}
                  src={project.image} 
                  alt={project.title} 
                  className="project-image object-cover w-full h-full"
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Navigation Arrows */}
                <motion.button 
                  ref={addButtonRef}
                  onClick={handlePrev} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 z-20"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                >
                  <FiArrowLeft size={20} />
                </motion.button>
                <motion.button 
                  ref={addButtonRef}
                  onClick={handleNext} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 z-20"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.8)' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                >
                  <FiArrowRight size={20} />
                </motion.button>
              </div>
              
              {/* Content Section */}
              <div className="p-6 bg-[#232428]">
                <motion.h3 
                  key={`title-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-2xl font-bold text-white mb-3"
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  key={`desc-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-blue-100 text-base mb-6"
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  key={`buttons-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button 
                    onClick={() => setIsModalOpen(true)}
                    className="portfolio-button bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 border border-blue-400 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Case Study <span className="text-lg">&#8594;</span>
                  </motion.button>
                  <motion.a 
                    href={project.website} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-button bg-[#23272f] hover:bg-blue-900 text-blue-100 border border-blue-400 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-blue-400/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Website <FiExternalLink className="text-lg" />
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Desktop Layout */}
          <motion.div 
            ref={desktopContainerRef}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            className="project-card hidden md:block relative rounded-xl overflow-hidden max-w-7xl mx-auto min-h-[440px] bg-[#232428] shadow-2xl"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Image Section */}
            <div 
              ref={imageSectionRef}
              className="absolute left-0 top-0 w-1/2 h-full transition-all duration-300 ease-in-out"
            >
              <div className="relative w-full h-full bg-[#191a1e] rounded-l-3xl overflow-hidden">
                               <motion.img 
                   key={`desktop-${current}`}
                   src={project.image} 
                   alt={project.title} 
                   className="project-image object-cover w-full h-full rounded-l-3xl"
                   initial={{ scale: 1.1, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   exit={{ scale: 1.1, opacity: 0 }}
                   transition={{ duration: 0.5, ease: "easeOut" }}
                 />
                {/* Dynamic gradient overlay */}
                <div className="absolute inset-0 w-full h-full pointer-events-none transition-all duration-300 opacity-100" 
                  style={{
                    background: 'linear-gradient(45deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(35,36,40,0.9) 100%)'
                  }}
                ></div>
                {/* Persistent vertical gradient */}
                <div className="absolute right-0 top-0 h-full w-16 pointer-events-none z-20" 
                  style={{background: 'linear-gradient(to right, rgba(35,36,40,0.0) 0%, rgba(35,36,40,0.7) 100%)'}}
                ></div>
                
                {/* Left Arrow */}
                <motion.button 
                  ref={addButtonRef}
                  onClick={handlePrev} 
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 z-20 hover:border-2 hover:border-blue-400"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  <span className="flex items-center justify-center w-full h-full">
                    <FiArrowLeft size={24} />
                  </span>
                </motion.button>
              </div>
            </div>
            
            {/* Text Section */}
            <div 
              ref={textSectionRef}
              className="absolute right-0 top-0 w-1/2 h-full transition-all duration-300 ease-in-out"
            >
              <div className="relative w-full h-full flex flex-col justify-center p-16 bg-[#232428] rounded-r-3xl">
                <motion.h3 
                  key={`desktop-title-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="text-3xl font-bold text-white mb-3"
                >
                  {project.title}
                </motion.h3>
                <motion.p 
                  key={`desktop-desc-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="text-blue-100 text-base mb-6"
                >
                  {project.description}
                </motion.p>
                <motion.div 
                  key={`desktop-buttons-${current}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex gap-3 mb-2"
                >
                  <motion.button 
                    onClick={() => setIsModalOpen(true)}
                    className="portfolio-button bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 border border-blue-400 flex items-center gap-2 shadow-lg hover:shadow-blue-500/25"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Case Study <span className="text-lg">&#8594;</span>
                  </motion.button>
                  <motion.a 
                    href={project.website} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="portfolio-button bg-[#23272f] hover:bg-blue-900 text-blue-100 border border-blue-400 px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-blue-400/25"
                    whileHover={{ scale: 1.05, y: 0 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Visit Website <FiExternalLink className="text-lg" />
                  </motion.a>
                </motion.div>
                
                {/* Right Arrow */}
                <motion.button 
                  ref={addButtonRef}
                  onClick={handleNext} 
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-transparent hover:bg-transparent text-white rounded-full w-12 h-12 flex items-center justify-center shadow-xl transition-all duration-300 z-20 hover:border-2 hover:border-blue-400"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0,0,0,0.3)' }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isAnimating}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  <span className="flex items-center justify-center w-full h-full">
                    <FiArrowRight size={24} />
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Study Modal */}
      <CaseStudyModal 
        project={project}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default PortfolioSection; 