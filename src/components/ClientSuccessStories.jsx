import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useMotionValueEvent, useMotionValue, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 50, label: 'Projects Delivered', suffix: '+' },
  { value: 40, label: 'Happy Clients', suffix: '+' },
  { value: 5, label: 'Years Experience', suffix: '+' },
  { value: 98, label: 'Client Satisfaction', suffix: '%' },
];

const testimonials = [
  {
    name: 'Omar Turner',
    title: 'Chief Executive Officer, Binns Media Group, New York',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    review: `Marc was able to execute the vision perfectly! He's big on communication and easy to speak with. Marc dedicates his time to the client, ensuring the client is completely satisfied at each step of the process. I highly recommend Marc's services to anyone who needs a web developer who can execute on a vision and provide a professional finished product!`,
    stars: 5,
    connect: true,
  },
  {
    name: 'Bradley Thompson',
    title: 'Marketing Director',
    avatar: 'https://randomuser.me/api/portraits/men/44.jpg',
    review: `Marc's expertise in web development is truly exceptional. He delivered a website that not only looks stunning but also performs flawlessly. His attention to detail and commitment to quality made the entire process smooth and enjoyable.`,
    stars: 5,
    connect: true,
  },
  {
    name: 'Jayden Youngleson',
    title: 'CEO of Tanj Capital',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    review: `It has been an absolute pleasure working alongside Marc. His deep knowledge, strong work ethic, and commitment to delivering results have made a significant impact on our team. Marc consistently went above and beyond to meet our development needs, and I highly recommend him to anyone seeking a reliable and skilled professional.`,
    stars: 5,
    connect: true,
  },
];

// Tilt component for testimonial cards
const TiltCard = ({ children, index }) => {
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-15, 15]);
  
  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXFromCenter = e.clientX - centerX;
    const mouseYFromCenter = e.clientY - centerY;
    
    mouseX.set(mouseXFromCenter / (rect.width / 2));
    mouseY.set(mouseYFromCenter / (rect.height / 2));
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`bg-[#181b20] rounded-xl p-7 shadow border border-[#23272f] transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-400/20 flex flex-col ${
        index === 0 ? 'hover:rotate-2' : 
        index === 1 ? 'hover:-rotate-1' : 
        'hover:rotate-1'
      }`}
      whileHover={{ scale: 1.02, y: -8 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

function ClientSuccessStories() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const controls = useAnimation();
  
  // GSAP refs for enhanced animations
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statsRef = useRef([]);
  const testimonialsRef = useRef([]);
  
  // Scroll progress tracking
  const { scrollYProgress } = useScroll();
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    console.log("Page scroll progress: ", latest);
  });

  // GSAP animations on component mount
  useEffect(() => {
    // Wait for elements to be available
    const initAnimations = () => {
      if (!titleRef.current || !subtitleRef.current) {
        setTimeout(initAnimations, 100);
        return;
      }

      // Set initial states for GSAP animations
      gsap.set([titleRef.current, subtitleRef.current], {
        opacity: 1,
        y: 0,
        scale: 1
      });

      gsap.set(statsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0
      });

      gsap.set(testimonialsRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationY: 0
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

      // Animate title and subtitle with stagger
      tl.fromTo(titleRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(statsRef.current,
        { opacity: 0, y: 60, scale: 0.8, rotationY: -15 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          rotationY: 0, 
          duration: 0.8, 
          stagger: 0.1, 
          ease: 'power2.out' 
        },
        '-=0.3'
      )
      .fromTo(testimonialsRef.current,
        { opacity: 0, y: 80, rotationY: -20, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          rotationY: 0, 
          scale: 1, 
          duration: 0.9, 
          stagger: 0.15, 
          ease: 'power2.out' 
        },
        '-=0.4'
      );
    };

    initAnimations();

    // Add hover animations for stats cards
    statsRef.current.forEach((stat, index) => {
      if (stat) {
        // Mouse enter animation
        stat.addEventListener('mouseenter', () => {
          gsap.to(stat, {
            scale: 1.05,
            y: -10,
            rotationY: 5,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        // Mouse leave animation
        stat.addEventListener('mouseleave', () => {
          gsap.to(stat, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
      }
    });

    // Add testimonial card hover animations
    testimonialsRef.current.forEach((testimonial, index) => {
      if (testimonial) {
        testimonial.addEventListener('mouseenter', () => {
          gsap.to(testimonial, {
            scale: 1.02,
            y: -8,
            rotationY: 3,
            duration: 0.4,
            ease: 'power2.out'
          });
          
          // Add glow effect to avatar
          gsap.to(testimonial.querySelector('.testimonial-avatar'), {
            scale: 1.1,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        testimonial.addEventListener('mouseleave', () => {
          gsap.to(testimonial, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.4,
            ease: 'power2.out'
          });
          
          gsap.to(testimonial.querySelector('.testimonial-avatar'), {
            scale: 1,
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
          const interval = setInterval(() => {
            start += increment;
            setCounts(stats.map((stat, index) => {
              const targetValue = stat.value;
              const progress = Math.min(start / 100, 1);
              const easeOutQuart = 1 - Math.pow(1 - progress, 4);
              return Math.floor(targetValue * easeOutQuart);
            }));
            if (start >= 100) {
              clearInterval(interval);
              // Ensure final values are exact
              setCounts(stats.map(stat => stat.value));
            }
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
  }, [controls, isVisible]);

  // Add stat card to ref array
  const addStatRef = (el) => {
    if (el && !statsRef.current.includes(el)) {
      statsRef.current.push(el);
    }
  };

  // Add testimonial card to ref array
  const addTestimonialRef = (el) => {
    if (el && !testimonialsRef.current.includes(el)) {
      testimonialsRef.current.push(el);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-400 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <section ref={sectionRef} id="work" className="w-full py-20 bg-black">
        <div className="max-w-5xl mx-auto px-4">
          {/* Heading */}
          <motion.h2 
            ref={titleRef}
            initial={{ opacity: 1, y: 0, scale: 1 }}
            className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            Client Success Stories
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            ref={subtitleRef}
            initial={{ opacity: 1, y: 0 }}
            className="text-center text-blue-100 text-lg mb-12"
          >
            Hear from our satisfied clients about their experience working with us and the results we've delivered.
          </motion.p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
            {stats.map((stat, idx) => (
              <motion.div 
                key={idx} 
                ref={addStatRef}
                initial={{ opacity: 1, y: 0, scale: 1, rotationY: 0 }}
                className="bg-[#181b20] rounded-xl flex flex-col items-center justify-center py-8 shadow border border-[#23272f] transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-400/20 hover:-translate-y-2"
                whileHover={{ scale: 1.05, y: -10, rotationY: 5 }}
                transition={{ duration: 0.3 }}
              >
                <motion.span 
                  className="text-3xl md:text-4xl font-extrabold text-blue-200 mb-1"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  {counts[idx]}{stat.suffix}
                </motion.span>
                <span className="text-gray-300 text-base md:text-lg text-center">{stat.label}</span>
              </motion.div>
            ))}
          </div>
          
          {/* Testimonials Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <TiltCard key={idx} index={idx}>
                <div className="flex items-center mb-4">
                  <motion.img 
                    src={t.avatar} 
                    alt={t.name} 
                    className="testimonial-avatar w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-400 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div>
                    <div className="font-bold text-white text-lg flex items-center gap-2">
                      {t.name}
                      {t.connect && (
                        <motion.span 
                          className="ml-2 px-2 py-0.5 text-xs rounded bg-blue-900 text-blue-200 border border-blue-400 cursor-pointer"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          Connect
                        </motion.span>
                      )}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm">{t.title}</div>
                  </div>
                </div>
                
                <div className="flex items-center mb-2">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-blue-300 text-lg"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
                
                <motion.p 
                  className="text-gray-200 text-sm md:text-base"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {t.review}
                </motion.p>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default ClientSuccessStories; 