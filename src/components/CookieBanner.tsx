import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Cookie } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <AnimatePresence>
      {!accepted && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex items-center gap-4 bg-white/95 backdrop-blur-md px-5 py-2.5 rounded-full border border-neutral-200/90 shadow-lg text-xs font-mono-custom tracking-widest text-neutral-500 uppercase select-none"
        >
          <div className="flex items-center gap-1.5">
            <span>THIS WEBSITE USES <strong className="font-semibold text-black">COOKIES</strong></span>
          </div>

          <button
            onClick={() => setAccepted(true)}
            className="flex items-center bg-[#e5e5e5] hover:bg-neutral-300 text-neutral-800 text-[10px] font-mono-custom uppercase tracking-widest font-bold px-4 py-1.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <span>ACCEPT</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
