import React, { useEffect, useState } from 'react';
import { Preloader } from './components/Preloader';
import { HeroSection } from './components/HeroSection';
import { ProjectDetailPage } from './components/ProjectDetailPage';

function currentPath() {
  return window.location.pathname.replace(/\/$/, '') || '/';
}

export default function App() {
  const [path, setPath] = useState(currentPath);
  const [isLoading, setIsLoading] = useState(() => currentPath() === '/');

  useEffect(() => {
    const onPop = () => setPath(currentPath());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const workMatch = path.match(/^\/work\/([^/]+)$/);
  if (workMatch) {
    return <ProjectDetailPage slug={workMatch[1]} />;
  }

  return (
    <div className="w-full bg-white text-[#111111] antialiased relative">
      <HeroSection isLoading={isLoading} onReplayLoader={() => setIsLoading(true)} />
      <Preloader isLoading={isLoading} onComplete={() => setIsLoading(false)} />
    </div>
  );
}
