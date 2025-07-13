import barba from '@barba/core';
import { gsap } from 'gsap';

// Wait for DOM to be ready and React app to be rendered
const initBarba = () => {
  // Check if wrapper exists
  const wrapper = document.querySelector('[data-barba="wrapper"]');
  if (!wrapper) {
    // If wrapper doesn't exist yet, wait a bit and try again
    setTimeout(initBarba, 50);
    return;
  }

  // Barba.js configuration
  barba.init({
    // Prevent default link behavior
    prevent: ({ el }) => {
      // Only handle internal links
      return !el.href || el.href.startsWith('http') || el.href.startsWith('mailto:') || el.href.startsWith('tel:');
    },

    // Transitions
    transitions: [
      {
        name: 'default-transition',
        leave: (data) => {
          return gsap.to(data.current.container, {
            opacity: 0,
            y: -50,
            duration: 0.5,
            ease: 'power2.inOut'
          });
        },
        enter: (data) => {
          return gsap.fromTo(data.next.container, 
            {
              opacity: 0,
              y: 50
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out'
            }
          );
        }
      }
    ],

    // Views
    views: [
      {
        name: 'section',
        beforeEnter: (data) => {
          // Add entrance animations for sections
          const sections = data.next.container.querySelectorAll('section');
          sections.forEach((section, index) => {
            // Special handling for technologies section
            if (section.id === 'tools') {
              // Reset any existing animations
              gsap.set(section.querySelectorAll('.tech-item'), {
                opacity: 0,
                y: 50,
                scale: 0.8,
                rotationY: -15
              });
              
              gsap.set(section.querySelector('h2'), {
                opacity: 0,
                y: 30,
                scale: 0.9
              });
              
              gsap.set(section.querySelector('p'), {
                opacity: 0,
                y: 20
              });
            } else if (section.id === 'portfolio-section') {
              // Reset portfolio section animations
              gsap.set(section.querySelectorAll('h2, p, .md\\:hidden, .hidden.md\\:block'), {
                opacity: 0,
                y: 30,
                scale: 0.9
              });
              
              gsap.set(section.querySelector('span'), {
                opacity: 0,
                y: 20,
                scale: 0.8
              });
            } else if (section.id === 'about') {
              // Reset expertise section animations
              gsap.set(section.querySelectorAll('h2, p, .mx-auto'), {
                opacity: 1,
                y: 0,
                scale: 1
              });
              
              gsap.set(section.querySelectorAll('.grid > div'), {
                opacity: 1,
                y: 0,
                rotationY: 0,
                scale: 1
              });
              
              gsap.set(section.querySelectorAll('.flex-1'), {
                opacity: 1,
                y: 0,
                scale: 1
              });
            } else {
              gsap.fromTo(section,
                {
                  opacity: 0,
                  y: 30
                },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: 'power2.out'
                }
              );
            }
          });
        }
      }
    ],

    // Events
    beforeEnter: (data) => {
      // Scroll to top when entering new section
      window.scrollTo(0, 0);
    },

    afterEnter: (data) => {
      // Reinitialize any components that need it
      if (data.next.namespace === 'home') {
        // Reinitialize any home-specific components
        console.log('Entered home section');
        
        // Trigger technologies section animations if it exists
        const techSection = data.next.container.querySelector('#tools');
        if (techSection) {
          // Small delay to ensure DOM is ready
          setTimeout(() => {
            const title = techSection.querySelector('h2');
            const subtitle = techSection.querySelector('p');
            const techItems = techSection.querySelectorAll('.tech-item');
            
            if (title && subtitle && techItems.length > 0) {
              const tl = gsap.timeline();
              
              tl.fromTo(title,
                { opacity: 0, y: 30, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
              )
              .fromTo(subtitle,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
                '-=0.3'
              )
              .fromTo(techItems,
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
            }
          }, 100);
        }
        
        // Trigger portfolio section animations if it exists
        const portfolioSection = data.next.container.querySelector('#portfolio-section');
        if (portfolioSection) {
          setTimeout(() => {
            const badge = portfolioSection.querySelector('span');
            const title = portfolioSection.querySelector('h2');
            const subtitle = portfolioSection.querySelector('p');
            const mobileCard = portfolioSection.querySelector('.md\\:hidden');
            const desktopContainer = portfolioSection.querySelector('.hidden.md\\:block');
            
            if (badge && title && subtitle && mobileCard && desktopContainer) {
              const tl = gsap.timeline();
              
              tl.fromTo(badge,
                { opacity: 0, y: 30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
              )
              .fromTo(title,
                { opacity: 0, y: 40, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
                '-=0.3'
              )
              .fromTo(subtitle,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                '-=0.4'
              )
              .fromTo(mobileCard,
                { opacity: 0, y: 50, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: 'power2.out' },
                '-=0.3'
              )
              .fromTo(desktopContainer,
                { opacity: 0, y: 60, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'power2.out' },
                '-=0.4'
              );
            }
          }, 100);
        }
        
        // Trigger expertise section animations if it exists
        const expertiseSection = data.next.container.querySelector('#about');
        if (expertiseSection) {
          setTimeout(() => {
            const badge = expertiseSection.querySelector('span');
            const title = expertiseSection.querySelector('h2');
            const subtitle = expertiseSection.querySelector('p');
            const progressCard = expertiseSection.querySelector('.mx-auto');
            const phaseCards = expertiseSection.querySelectorAll('.flex-1');
            const serviceCards = expertiseSection.querySelectorAll('.grid > div');
            
            if (badge && title && subtitle && progressCard) {
              const tl = gsap.timeline();
              
              tl.fromTo(badge,
                { opacity: 0, y: 30, scale: 0.8 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' }
              )
              .fromTo(title,
                { opacity: 0, y: 40, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' },
                '-=0.3'
              )
              .fromTo(subtitle,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                '-=0.4'
              )
              .fromTo(progressCard,
                { opacity: 0, y: 50, scale: 0.9, rotationY: -10 },
                { opacity: 1, y: 0, scale: 1, rotationY: 0, duration: 0.8, ease: 'power2.out' },
                '-=0.3'
              )
              .fromTo(phaseCards,
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
              .fromTo(serviceCards,
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
            }
          }, 100);
        }
        
        // Trigger client success stories section animations if it exists
        const successStoriesSection = data.next.container.querySelector('#work');
        if (successStoriesSection) {
          setTimeout(() => {
            const title = successStoriesSection.querySelector('h2');
            const subtitle = successStoriesSection.querySelector('p');
            const statsCards = successStoriesSection.querySelectorAll('.grid > div');
            const testimonialCards = successStoriesSection.querySelectorAll('.grid-cols-1 > div');
            
            if (title && subtitle) {
              const tl = gsap.timeline();
              
              tl.fromTo(title,
                { opacity: 0, y: 40, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power2.out' }
              )
              .fromTo(subtitle,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
                '-=0.4'
              )
              .fromTo(statsCards,
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
              .fromTo(testimonialCards,
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
            }
          }, 100);
        }
      }
    }
  });

  console.log('Barba.js initialized successfully');
};

// Initialize Barba with a slight delay to ensure React has rendered
setTimeout(initBarba, 100);

export default barba; 