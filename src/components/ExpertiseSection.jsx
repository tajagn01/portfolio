import React, { useEffect, useState, useRef } from 'react';
import { FiCode, FiCheck, FiPenTool } from 'react-icons/fi';
import { motion, useAnimation, useScroll, useMotionValueEvent } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const designItems = [
  'User Research',
  'Wireframing',
  'UI Design',
];
const devItems = [
  'Frontend',
  'Backend',
  'Testing',
];

function ExpertiseSection() {
  const [percent, setPercent] = useState(0);
  const [activeStep, setActiveStep] = useState(-1);
  const [animatingStep, setAnimatingStep] = useState(-1);
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  const totalSteps = designItems.length + devItems.length;
  const sectionRef = useRef(null);
  
  // GSAP refs for enhanced animations
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressCardRef = useRef(null);
  const serviceCardsRef = useRef([]);
  const progressBarRef = useRef(null);
  const phaseCardsRef = useRef([]);
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll();
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll progress: ", latest);
  });

  // GSAP animations on component mount
  useEffect(() => {
    // Wait for elements to be available
    const initAnimations = () => {
      if (!badgeRef.current || !titleRef.current || !subtitleRef.current || !progressCardRef.current) {
        setTimeout(initAnimations, 100);
        return;
      }

      // Set initial states for GSAP animations
      gsap.set([badgeRef.current, titleRef.current, subtitleRef.current, progressCardRef.current], {
        opacity: 1,
        y: 0,
        scale: 1
      });

      gsap.set(serviceCardsRef.current, {
        opacity: 1,
        y: 0,
        rotationY: 0,
        scale: 1
      });

      gsap.set(phaseCardsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1
      });

      // Create timeline for section animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      });

      // Animate badge, title, and subtitle with stagger
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
      .fromTo(progressCardRef.current,
        { opacity: 0, y: 50, scale: 0.9, rotationY: -10 },
        { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(phaseCardsRef.current,
        { opacity: 0, y: 40, scale: 0.95, rotationY: -5 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotationY: 0, 
          duration: 0.6, 
          stagger: 0.1, 
          ease: 'power2.out' 
        },
        '-=0.4'
      )
      .fromTo(serviceCardsRef.current,
        { opacity: 0, y: 80, rotationY: -15, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0, 
          scale: 1, 
          duration: 0.7, 
          stagger: 0.1, 
          ease: 'power2.out' 
        },
        '-=0.3'
      );
    };

    initAnimations();

    // Add hover animations for service cards
    serviceCardsRef.current.forEach((card, index) => {
      if (card) {
        // Mouse enter animation
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.05,
            y: -10,
            rotationY: 5,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Add glow effect
          gsap.to(card.querySelector('.service-icon'), {
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        // Mouse leave animation
        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(card.querySelector('.service-icon'), {
            scale: 1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    // Add phase card hover animations
    phaseCardsRef.current.forEach((card, index) => {
      if (card) {
        card.addEventListener('mouseenter', () => {
          gsap.to(card, {
            scale: 1.02,
            y: -5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            scale: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          // Start animation when section becomes visible
          controls.start({ width: '100%' });
          let start = 0;
          const duration = 3000;
          const step = 10;
          const increment = 100 / (duration / step);
          let lastStep = -1;
          const interval = setInterval(() => {
            start += increment;
            setPercent(Math.min(Math.round(start), 100));
            // Animate checklist items in sequence
            const stepIndex = Math.floor((start / 100) * totalSteps);
            setActiveStep(Math.min(stepIndex, totalSteps - 1));
            if (stepIndex !== lastStep) {
              setAnimatingStep(stepIndex);
              setTimeout(() => setAnimatingStep(-1), 300); // Arrow visible for 300ms
              lastStep = stepIndex;
            }
            if (start >= 100) clearInterval(interval);
          }, step);
          return () => clearInterval(interval);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [controls, totalSteps, isVisible]);

  // Add service card to ref array
  const addServiceCardRef = (el) => {
    if (el && !serviceCardsRef.current.includes(el)) {
      serviceCardsRef.current.push(el);
    }
  };

  // Add phase card to ref array
  const addPhaseCardRef = (el) => {
    if (el && !phaseCardsRef.current.includes(el)) {
      phaseCardsRef.current.push(el);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <section id="about" ref={sectionRef} className="py-20 bg-black relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-blue-900/10 gradient-animate"></div>
        
        <div className="max-w-7xl w-full mx-auto px-4 relative z-10">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <motion.span 
            ref={badgeRef}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            className="px-5 py-1.5 rounded-full bg-[#181b20] text-blue-100 text-base font-medium shadow border border-[#23272f]"
            whileHover={{ scale: 1.05, y: -2 }}
            transition={{ duration: 0.3 }}
          >
            Our Expertise
          </motion.span>
        </div>
        {/* Heading */}
        <motion.h2 
          ref={titleRef}
          initial={{ opacity: 1, y: 0, scale: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-white text-center mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          Full-Stack Design Expertise
        </motion.h2>
        {/* Subtitle */}
        <motion.div 
          ref={subtitleRef}
          initial={{ opacity: 1, y: 0 }}
          className="text-center text-xl mb-12"
        >
          <span className="font-bold text-white">Delivering <span className="text-blue-200">measurable results</span></span> <span className="text-blue-100">through strategic thinking and technical excellence</span>
          <span className="inline-block align-middle mx-2 text-blue-200">•</span>
        </motion.div>
        {/* Card */}
        <motion.div 
          ref={progressCardRef}
          initial={{ opacity: 1, y: 0, scale: 1, rotationY: 0 }}
          className="mx-auto bg-[#232428] rounded-2xl shadow-xl p-8 md:p-10 max-w-2xl flex flex-col items-center"
          whileHover={{ y: -5, scale: 1.02 }}
          transition={{ duration: 0.4 }}
        >
          {/* Top Row */}
          <div className="flex items-center w-full mb-4">
            <FiCode className="text-blue-200 text-2xl mr-2" />
            <span className="font-semibold text-lg text-white flex-1">Coding in Progress...</span>
            <motion.span 
              className="text-blue-200 font-bold ml-auto" 
              initial={{opacity: 0}} 
              animate={{opacity: 1}} 
              transition={{delay: 0.2}}
            >
              {percent}%
            </motion.span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-4 bg-[#181b20] rounded-full mb-6 overflow-hidden">
            <motion.div
              ref={progressBarRef}
              className="h-full bg-blue-300 rounded-full"
              initial={{ width: 0 }}
              animate={controls}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
          </div>
          {/* Phases */}
          <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
            {/* Design Phase */}
            <motion.div 
              ref={addPhaseCardRef}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex-1 bg-[#232428] rounded-xl p-5 border transition-all duration-500 ${
                activeStep >= 0 ? 'border-blue-400/60 shadow-blue-400/20 hover:border-blue-400/80 hover:shadow-blue-400/30 hover:scale-[1.02]' : 'border-[#23272f]'
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-2 text-blue-100 font-semibold">
                <FiPenTool className="mr-2 text-blue-300" /> Design Phase
              </div>
              <ul className="text-base ml-2">
                {designItems.map((item, idx) => {
                  const isActive = activeStep >= idx;
                  const isAnimating = animatingStep === idx;
                  return (
                    <li key={item} className="mb-1 flex items-center gap-2">
                      <span className={`transition-colors duration-300 ${isActive ? 'text-blue-500 font-semibold' : 'text-blue-100'}`}>{item}</span>
                      {isActive && !isAnimating && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="inline-block ml-1 text-blue-500 text-lg"
                        >
                          {'✔'}
                        </motion.span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            {/* Development Phase */}
            <motion.div 
              ref={addPhaseCardRef}
              initial={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex-1 bg-[#232428] rounded-xl p-5 border transition-all duration-500 ${
                activeStep >= designItems.length ? 'border-blue-400/60 shadow-blue-400/20 hover:border-blue-400/80 hover:shadow-blue-400/30 hover:scale-[1.02]' : 'border-blue-400/40'
              }`}
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-2 text-blue-100 font-semibold">
                <FiCode className="mr-2 text-blue-300" /> Development Phase
              </div>
              <ul className="text-base ml-2">
                {devItems.map((item, idx) => {
                  const globalIdx = designItems.length + idx;
                  const isActive = activeStep >= globalIdx;
                  const isAnimating = animatingStep === globalIdx;
                  return (
                    <li key={item} className="mb-1 flex items-center gap-2">
                      <span className={`transition-colors duration-300 ${isActive ? 'text-blue-500 font-semibold' : 'text-blue-100'}`}>{item}</span>
                      {isActive && !isAnimating && (
                        <motion.span
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 10 }}
                          transition={{ duration: 0.3 }}
                          className="inline-block ml-1 text-blue-500 text-lg"
                        >
                          {'✔'}
                        </motion.span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>
          {/* Completion Message */}
          <motion.div 
            className={`text-center w-full font-semibold text-lg mt-2`}
            initial={false}
            animate={percent === 100 ? { color: '#22c55e', scale: 1.08, opacity: 1 } : { color: '#bae6fd', scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            Project Successfully Completed! <span role="img" aria-label="party">🎉</span>
          </motion.div>
        </motion.div>
        {/* Services-style Cards at the end */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 w-full mt-12">
          {/* Strategy & Planning */}
          <motion.div 
            ref={addServiceCardRef}
            initial={{ opacity: 1, y: 0, rotationY: 0, scale: 1 }}
            className="bg-gradient-to-br from-blue-900 via-[#232428] to-black rounded-xl p-4 shadow border border-[#23272f] flex flex-col min-h-[280px] w-full transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-400/20 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, y: -10, rotationY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <span className="service-icon bg-[#23272f] rounded-xl p-2 mr-2 text-xl text-blue-200">🎯</span>
              <span className="text-lg font-bold text-white">Strategy & Planning</span>
            </div>
            <p className="text-blue-100 text-sm mb-3">
              Increase ROI by 35% with strategic planning and roadmap development that aligns with your business goals.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Market Research</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">User Analysis</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Competitive Analysis</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">ROI Planning</span>
            </div>
          </motion.div>
          {/* UI/UX Design */}
          <motion.div 
            ref={addServiceCardRef}
            initial={{ opacity: 1, y: 0, rotationY: 0, scale: 1 }}
            className="bg-gradient-to-br from-pink-900 via-[#232428] to-black rounded-xl p-4 shadow border border-[#23272f] flex flex-col min-h-[280px] w-full transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-400/20 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, y: -10, rotationY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <span className="service-icon bg-[#23272f] rounded-xl p-2 mr-2 text-xl text-blue-200">🖌️</span>
              <span className="text-lg font-bold text-white">UI/UX Design</span>
            </div>
            <p className="text-blue-100 text-sm mb-3">
              Boost conversions by 40% with user-centered design that transforms visitors into customers.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">User Research</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Wireframing</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Prototyping</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Design Systems</span>
            </div>
          </motion.div>
          {/* Development */}
          <motion.div 
            ref={addServiceCardRef}
            initial={{ opacity: 1, y: 0, rotationY: 0, scale: 1 }}
            className="bg-gradient-to-br from-cyan-900 via-[#232428] to-black rounded-xl p-4 shadow border border-[#23272f] flex flex-col min-h-[280px] w-full transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-400/20 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, y: -10, rotationY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <span className="service-icon bg-[#23272f] rounded-xl p-2 mr-2 text-xl text-blue-200">💻</span>
              <span className="text-lg font-bold text-white">Development</span>
            </div>
            <p className="text-blue-100 text-sm mb-3">
              Achieve 98/100 PageSpeed scores with modern technologies and performance optimization.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">React/Next.js</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Node.js</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">TypeScript</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">API Development</span>
            </div>
          </motion.div>
          {/* Database Architecture */}
          <motion.div 
            ref={addServiceCardRef}
            initial={{ opacity: 1, y: 0, rotationY: 0, scale: 1 }}
            className="bg-gradient-to-br from-purple-900 via-[#232428] to-black rounded-xl p-4 shadow border border-[#23272f] flex flex-col min-h-[280px] w-full transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-400/20 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, y: -10, rotationY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <span className="service-icon bg-[#23272f] rounded-xl p-2 mr-2 text-xl text-blue-200">🗄️</span>
              <span className="text-lg font-bold text-white">Database Architecture</span>
            </div>
            <p className="text-blue-100 text-sm mb-3">
              Reduce query times by 60% with robust database design and implementation for scalable applications.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Schema Design</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Data Modeling</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Query Optimization</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Migration Strategy</span>
            </div>
          </motion.div>
          {/* Security & Performance */}
          <motion.div 
            ref={addServiceCardRef}
            initial={{ opacity: 1, y: 0, rotationY: 0, scale: 1 }}
            className="bg-gradient-to-br from-green-900 via-[#232428] to-black rounded-xl p-4 shadow border border-[#23272f] flex flex-col min-h-[280px] w-full transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-400/20 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, y: -10, rotationY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <span className="service-icon bg-[#23272f] rounded-xl p-2 mr-2 text-xl text-blue-200">🛡️</span>
              <span className="text-lg font-bold text-white">Security & Performance</span>
            </div>
            <p className="text-blue-100 text-sm mb-3">
              Protect user data with enterprise-grade security measures and 99.9% uptime guarantee.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Security Audits</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Performance Testing</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Load Balancing</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Caching Strategy</span>
            </div>
          </motion.div>
          {/* AI Integration */}
          <motion.div 
            ref={addServiceCardRef}
            initial={{ opacity: 1, y: 0, rotationY: 0, scale: 1 }}
            className="bg-gradient-to-br from-yellow-900 via-[#232428] to-black rounded-xl p-4 shadow border border-[#23272f] flex flex-col min-h-[280px] w-full transition-all duration-300 hover:border-blue-400/60 hover:shadow-blue-400/20 transform hover:-translate-y-2"
            whileHover={{ scale: 1.05, y: -10, rotationY: 5 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center mb-2">
              <span className="service-icon bg-[#23272f] rounded-xl p-2 mr-2 text-xl text-blue-200">✨</span>
              <span className="text-lg font-bold text-white">AI Integration</span>
            </div>
            <p className="text-blue-100 text-sm mb-3">
              Automate 60% of manual tasks with AI solutions that enhance user experiences and business operations.
            </p>
            <div className="flex flex-wrap gap-1 mt-2">
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">AI/ML Integration</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Natural Language</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Computer Vision</span>
              <span className="bg-[#23272f] text-blue-100 px-2 py-0.5 rounded-full text-xs font-medium">Predictive Analytics</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </>
  );
}

export default ExpertiseSection; 