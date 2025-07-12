import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

function VantaCtaSection() {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    vantaEffectRef.current = NET({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 500.00,
      scale: 1.00,
      scaleMobile: 1.00,
      color: 0xffffff,
      backgroundColor: 0x0,
      points: 10.00,
      maxDistance: 2.00,
      spacing: 17.00,
      showLines: true,
      lineColor: 0xffffff,
      lineWidth: 0.5,
      lineOpacity: 0.4,
      pointSize: 3,
      pointOpacity: 0.8,
    });
    return () => {
      if (vantaEffectRef.current) vantaEffectRef.current.destroy();
    };
  }, []);

  return (
    <section ref={vantaRef} className="relative w-full flex items-center justify-center py-4 bg-black overflow-hidden">
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl mx-auto px-4 py-4 text-center bg-black/80 rounded-2xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">Ready to Transform Your Business?</h2>
        <p className="text-base md:text-lg font-semibold text-white mb-2">
          <span className="text-white">Claim your <span className="text-blue-200">FREE 30-minute strategy call</span></span> and discover how our proven approach can help you <span className="font-bold">outperform competitors and drive measurable growth.</span>
        </p>
        <button className="mt-4 mb-1 px-6 py-2 bg-blue-200 hover:bg-blue-300 text-black font-semibold text-base rounded-lg shadow transition flex items-center gap-2">
          Claim Your Free Strategy Call <span className="ml-1">→</span>
        </button>
        <div className="text-blue-100 text-xs mt-1">Limited availability. No obligation. 100% confidential.</div>
      </div>
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/60 z-0 pointer-events-none" />
    </section>
  );
}

export default VantaCtaSection; 