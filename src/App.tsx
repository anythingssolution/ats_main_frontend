import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { HeroSection } from './components/HeroSection';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="w-full bg-white text-[#111111] antialiased relative">
      <HeroSection isLoading={isLoading} onReplayLoader={() => setIsLoading(true)} />
      <Preloader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
    </div>
  );
}
