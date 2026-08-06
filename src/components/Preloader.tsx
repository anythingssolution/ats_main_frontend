import React, { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PreloaderProps {
  onComplete: () => void;
  isLoading: boolean;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete, isLoading }) => {
  const [progress, setProgress] = useState(0);

  // Force scroll to top and reset ScrollTriggers on load/reload
  useLayoutEffect(() => {
    if (!isLoading) return;
    window.scrollTo(0, 0);
    ScrollTrigger.getAll().forEach(st => st.kill());
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) return;
    setProgress(0);

    const duration = 1800;
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const nextVal = Math.min(100, Math.round((currentStep / steps) * 100));
      setProgress(nextVal);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isLoading, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[55] flex flex-col justify-between p-6 md:p-12 select-none pointer-events-none bg-white"
        >
          {/* Top minimal header info during preloader */}
          <div className="flex justify-between items-center text-[11px] tracking-[0.3em] font-mono-custom uppercase text-neutral-400 max-w-[1920px] w-full mx-auto">
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              ANY THINGS SOLUTION
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              ATS SOLUTIONS
            </motion.span>
          </div>

          {/* Bottom Progress Indicator */}
          <div className="w-full max-w-2xl mx-auto space-y-3 pb-4">
            <div className="flex justify-between items-end font-mono-custom text-xs tracking-widest text-neutral-500 uppercase">
              <span>LOADING EXPERIENCE</span>
              <span className="font-syne font-bold text-xl text-black">{progress}%</span>
            </div>

            <div className="w-full h-[2px] bg-neutral-200 relative overflow-hidden rounded-full">
              <div
                className="h-full bg-black transition-all duration-75 ease-out rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


