import logoImg from '../assets/logo.jpg';

function Navbar() {
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

  return (
    <nav className="flex justify-between items-center px-4 sm:px-8 md:px-16 lg:px-32 py-6 bg-black/10 bg-gray-800/30 backdrop-blur-md">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center gap-3 text-2xl font-bold text-white cursor-pointer" onClick={() => scrollToSection('work')}>
        <img src={logoImg} alt="CodeCrafter Logo" className="w-8 h-8 rounded-lg object-cover" />
        CodeCrafter
      </div>
      
      {/* Right side - Navigation Items */}
      <div className="flex items-center space-x-8">
        <button 
          onClick={() => scrollToSection('work')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Work
        </button>
        <button 
          onClick={() => scrollToSection('services')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Service
        </button>
        <button 
          onClick={() => scrollToSection('tools')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Tools
        </button>
        <button 
          onClick={() => scrollToSection('about')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          About
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className="text-gray-300 hover:text-white transition-colors duration-300"
        >
          Contact
        </button>
        <button 
          onClick={() => scrollToSection('contact')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors duration-300 font-medium"
        >
          Get in Touch
        </button>
      </div>
    </nav>
  )
}

export default Navbar 