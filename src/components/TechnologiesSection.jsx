import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  SiPostgresql, 
  SiGraphql, 
  SiFigma, 
  SiAmazonwebservices, 
  SiDocker, 
  SiMongodb, 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiNextdotjs,
  SiMaterialdesign,
  SiBootstrap,
  SiPostman,
  SiGit,
  SiSublimetext
} from 'react-icons/si';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const technologies = [
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'GraphQL', icon: SiGraphql },
  { name: 'Figma', icon: SiFigma },
  { name: 'AWS', icon: SiAmazonwebservices },
  { name: 'Docker', icon: SiDocker },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Node.js', icon: SiNodedotjs },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Material UI', icon: SiMaterialdesign },
  { name: 'Bootstrap', icon: SiBootstrap },
  { name: 'Postman', icon: SiPostman },
  { name: 'Git', icon: SiGit },
  { name: 'Sublime Text', icon: SiSublimetext },
];

function TechnologiesSection() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const techContainerRef = useRef(null);
  const techItemsRef = useRef([]);

  useEffect(() => {
    // Initial animations when component mounts
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    });

    // Animate title and subtitle
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 30, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(techItemsRef.current,
      { 
        opacity: 0, 
        y: 50, 
        scale: 0.8,
        rotationY: -15
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotationY: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out'
      },
      '-=0.2'
    );

    // Add hover animations for tech items
    techItemsRef.current.forEach((item, index) => {
      if (item) {
        // Mouse enter animation
        item.addEventListener('mouseenter', () => {
          gsap.to(item, {
            scale: 1.1,
            y: -10,
            rotationY: 5,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          // Add glow effect
          gsap.to(item.querySelector('.tech-icon'), {
            scale: 1.2,
            duration: 0.3,
            ease: 'power2.out'
          });
        });

        // Mouse leave animation
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            scale: 1,
            y: 0,
            rotationY: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
          
          gsap.to(item.querySelector('.tech-icon'), {
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

  // Add tech item to ref array
  const addTechItemRef = (el) => {
    if (el && !techItemsRef.current.includes(el)) {
      techItemsRef.current.push(el);
    }
  };

  return (
    <section ref={sectionRef} id="tools" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-black to-purple-900/10 gradient-animate"></div>
      
      <div className="relative z-10">
        <h2 ref={titleRef} className="text-3xl font-bold text-white text-center mb-2 opacity-0">
          Technologies I Work With
        </h2>
        <p ref={subtitleRef} className="text-center text-gray-400 text-sm mb-8 opacity-0">
          Modern tools for modern solutions
        </p>
        
        <div ref={techContainerRef} className="overflow-x-hidden relative">
          <div className="flex w-max animate-marquee space-x-8">
            {technologies.concat(technologies).map((tech, idx) => {
              const IconComponent = tech.icon;
              return (
                <div 
                  key={idx} 
                  ref={addTechItemRef}
                  className="tech-item flex flex-col items-center min-w-[120px] mx-2 group transition-all duration-300 opacity-0 animate-tech-float"
                  style={{ 
                    transform: 'perspective(1000px)',
                    animationDelay: `${idx * 0.05}s`
                  }}
                >
                  <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-black/80 backdrop-blur-sm mb-2 shadow-lg border border-gray-200/30 transition-all duration-300 my-8 tech-icon-container">
                    <IconComponent 
                      className={`tech-icon ${tech.name === 'PostgreSQL' ? 'text-[#336791]' :
                                tech.name === 'GraphQL' ? 'text-[#E10098]' :
                                tech.name === 'Figma' ? 'text-[#F24E1E]' :
                                tech.name === 'AWS' ? 'text-[#FF9900]' :
                                tech.name === 'Docker' ? 'text-[#2496ED]' :
                                tech.name === 'MongoDB' ? 'text-[#47A248]' :
                                tech.name === 'React' ? 'text-[#61DAFB]' :
                                tech.name === 'TypeScript' ? 'text-[#3178C6]' :
                                tech.name === 'Node.js' ? 'text-[#339933]' :
                                tech.name === 'Next.js' ? 'text-white' :
                                tech.name === 'Material UI' ? 'text-[#0081CB]' :
                                tech.name === 'Bootstrap' ? 'text-[#7952B3]' :
                                tech.name === 'Postman' ? 'text-[#FF6C37]' :
                                tech.name === 'Git' ? 'text-[#F05032]' :
                                tech.name === 'Sublime Text' ? 'text-[#FF9800]' : 'text-blue-400'}`}
                      size={32} 
                    />
                  </div>
                  <span className="text-gray-200 text-base font-medium mt-1 transition-colors duration-300 group-hover:text-white">
                    {tech.name}
                  </span>
                </div>
              );
            })}
          </div>
          
          {/* Enhanced glow effect overlay */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-0 w-32 h-32 bg-blue-500/20 rounded-full blur-3xl animate-float-glow"></div>
            <div className="absolute top-1/4 right-0 w-24 h-24 bg-purple-500/20 rounded-full blur-2xl animate-float-glow" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-green-500/15 rounded-full blur-2xl animate-float-glow" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
        
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
          
          .tech-icon-container:hover {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.4);
            border-color: rgba(59, 130, 246, 0.6);
          }
          
          .tech-icon {
            transition: all 0.3s ease;
          }
          
          .tech-icon:hover {
            filter: drop-shadow(0 0 8px currentColor);
          }
        `}</style>
      </div>
    </section>
  );
}

export default TechnologiesSection; 