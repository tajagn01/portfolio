import React, { useState, useEffect, useRef } from 'react';

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

function ClientSuccessStories() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounts();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounts = () => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4); // Smooth easing

      const newCounts = stats.map((stat, index) => {
        const targetValue = stat.value;
        const currentValue = Math.floor(targetValue * easeOutQuart);
        return currentValue;
      });

      setCounts(newCounts);

      if (currentStep >= steps) {
        clearInterval(interval);
        // Ensure final values are exact
        setCounts(stats.map(stat => stat.value));
      }
    }, stepDuration);
  };

  return (
    <section ref={sectionRef} id="work" className="w-full py-20 bg-black">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center mb-4">Client Success Stories</h2>
        <p className="text-center text-blue-100 text-lg mb-12">Hear from our satisfied clients about their experience working with us and the results we've delivered.</p>
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-[#181b20] rounded-xl flex flex-col items-center justify-center py-8 shadow border border-[#23272f] transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-400/20 hover:-translate-y-2">
              <span className="text-3xl md:text-4xl font-extrabold text-blue-200 mb-1">
                {counts[idx]}{stat.suffix}
              </span>
              <span className="text-gray-300 text-base md:text-lg text-center">{stat.label}</span>
            </div>
          ))}
        </div>
        {/* Testimonials Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div key={idx} className={`bg-[#181b20] rounded-xl p-7 shadow border border-[#23272f] transition-all duration-300 hover:border-blue-400/50 hover:shadow-blue-400/20 flex flex-col ${
              idx === 0 ? 'hover:rotate-2' : 
              idx === 1 ? 'hover:-rotate-1' : 
              'hover:rotate-1'
            }`}>
              <div className="flex items-center mb-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-blue-400" />
                <div>
                  <div className="font-bold text-white text-lg flex items-center gap-2">{t.name}
                    {t.connect && <span className="ml-2 px-2 py-0.5 text-xs rounded bg-blue-900 text-blue-200 border border-blue-400 cursor-pointer">Connect</span>}
                  </div>
                  <div className="text-gray-400 text-xs md:text-sm">{t.title}</div>
                </div>
              </div>
              <div className="flex items-center mb-2">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <span key={i} className="text-blue-300 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-200 text-sm md:text-base">{t.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ClientSuccessStories; 