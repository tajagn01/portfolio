import React from 'react';

const technologies = [
  { name: 'PostgreSQL', icon: '🌀' },
  { name: 'GraphQL', icon: '🔗' },
  { name: 'Figma', icon: '🎨' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Redis', icon: '🟥' },
  { name: 'MongoDB', icon: '🍃' },
  { name: 'React', icon: '⚛️' },
  { name: 'TypeScript', icon: 'TS' },
  { name: 'Node.js', icon: '🟩' },
  { name: 'Next.js', icon: 'N' },
];

function TechnologiesSection() {
  return (
    <section id="tools" className="w-full py-16 bg-black">
      <h2 className="text-3xl font-bold text-white text-center mb-2">Technologies I Work With</h2>
      <p className="text-center text-gray-400 text-sm mb-8">Modern tools for modern solutions</p>
      <div className="overflow-x-hidden relative">
        <div className="flex w-max animate-marquee space-x-8">
          {technologies.concat(technologies).map((tech, idx) => (
            <div key={idx} className="flex flex-col items-center min-w-[120px] mx-2 group transition-transform duration-300">
              <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-[#23272f] mb-2 text-3xl shadow-lg border border-[#23272f] transition-transform duration-300 group-hover:scale-110 group-hover:shadow-blue-400/40 group-hover:shadow-lg my-8">
                {tech.icon}
              </div>
              <span className="text-gray-200 text-base font-medium mt-1">{tech.name}</span>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            animation: marquee 25s linear infinite;
          }
        `}</style>
      </div>
    </section>
  );
}

export default TechnologiesSection; 