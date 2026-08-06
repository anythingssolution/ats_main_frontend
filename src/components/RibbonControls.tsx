import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, RotateCcw, Play, Pause, Box, Eye, Sparkles, Moon, Sun, Layers } from 'lucide-react';
import { RibbonConfig, ThemeMode } from '../types';

interface RibbonControlsProps {
  config: RibbonConfig;
  onChange: (newConfig: RibbonConfig) => void;
  onReplayLoader: () => void;
}

export const RibbonControls: React.FC<RibbonControlsProps> = ({
  config,
  onChange,
  onReplayLoader,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const updateConfig = (key: keyof RibbonConfig, value: any) => {
    onChange({ ...config, [key]: value });
  };

  return (
    <div className="fixed top-24 right-6 z-40">
      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md px-4 py-2.5 rounded-full border border-neutral-200/80 dark:border-neutral-800 shadow-lg text-xs font-mono-custom uppercase tracking-wider text-neutral-800 dark:text-neutral-200 cursor-pointer"
      >
        <Sliders className="w-3.5 h-3.5 text-black dark:text-white" />
        <span className="hidden sm:inline font-bold">3D SCULPTURE CONTROLS</span>
      </motion.button>

      {/* Floating Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 280 }}
            className="absolute top-12 right-0 w-80 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-xl rounded-2xl p-5 border border-neutral-200/90 dark:border-neutral-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100 dark:border-neutral-800">
              <span className="text-[10px] font-mono-custom uppercase tracking-[0.2em] text-neutral-400">
                PARAMETRIC HELIX RIG
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-neutral-400 hover:text-black dark:hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Rotation Toggle & Speed Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono-custom">
                <span className="text-neutral-500 uppercase">AUTO ROTATE SPEED</span>
                <span className="font-bold text-neutral-900 dark:text-white">{config.speed.toFixed(1)}x</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateConfig('autoRotate', !config.autoRotate)}
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    config.autoRotate
                      ? 'bg-black text-white dark:bg-white dark:text-black border-transparent'
                      : 'bg-neutral-100 text-neutral-500 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700'
                  }`}
                >
                  {config.autoRotate ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
                <input
                  type="range"
                  min="0.2"
                  max="3.0"
                  step="0.1"
                  value={config.speed}
                  onChange={(e) => updateConfig('speed', parseFloat(e.target.value))}
                  className="w-full accent-black dark:accent-white cursor-pointer"
                />
              </div>
            </div>

            {/* Twist Angle Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono-custom">
                <span className="text-neutral-500 uppercase">TWIST FACTOR</span>
                <span className="font-bold text-neutral-900 dark:text-white">{config.twistFactor.toFixed(1)}π</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.1"
                value={config.twistFactor}
                onChange={(e) => updateConfig('twistFactor', parseFloat(e.target.value))}
                className="w-full accent-black dark:accent-white cursor-pointer"
              />
            </div>

            {/* Theme Presets */}
            <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
              <span className="text-[10px] font-mono-custom uppercase tracking-wider text-neutral-400">
                ARCHITECTURAL LIGHTING MODE
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono-custom font-bold uppercase">
                {(
                  [
                    { id: 'classic-white', label: 'Classic White' },
                    { id: 'architectural-monochrome', label: 'Slate Gray' },
                    { id: 'dusk-gold', label: 'Dusk Warm' },
                    { id: 'cyber-dark', label: 'Obsidian Night' },
                  ] as { id: ThemeMode; label: string }[]
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => updateConfig('theme', t.id)}
                    className={`py-2 px-2.5 rounded-lg text-center border transition-all cursor-pointer ${
                      config.theme === t.id
                        ? 'border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-extrabold'
                        : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/50 text-neutral-600 dark:text-neutral-400 hover:border-neutral-300'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Wireframe & Replay Preloader Actions */}
            <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800 flex flex-col gap-2">
              <button
                onClick={() => updateConfig('wireframe', !config.wireframe)}
                className={`w-full py-2 px-3 rounded-lg border flex items-center justify-center gap-2 text-xs font-mono-custom uppercase font-bold cursor-pointer transition-colors ${
                  config.wireframe
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>{config.wireframe ? 'CAD WIREFRAME: ON' : 'SOLID ARCHITECTURAL MESH'}</span>
              </button>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onReplayLoader();
                }}
                className="w-full py-2 px-3 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200 flex items-center justify-center gap-2 text-xs font-mono-custom uppercase font-bold cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-neutral-500" />
                <span>REPLAY INTRO LOADER</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
