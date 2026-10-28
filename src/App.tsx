import React, { useEffect, useState } from 'react';
import { Preloader } from './components/Preloader';
import { HeroSection } from './components/HeroSection';
import { ProjectDetailPage } from './components/ProjectDetailPage';
import { QrGeneratorPage } from './components/QrGeneratorPage';

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

  // Client fallback for /qr (production uses Vercel / Netlify 302).
  useEffect(() => {
    if (path === '/qr') {
      window.location.replace('/');
    }
  }, [path]);

  if (path === '/qr') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono-custom text-[11px] uppercase tracking-[0.28em] text-white/50">
        Redirecting…
      </div>
    );
  }

  if (path === '/tools/qr') {
    return <QrGeneratorPage />;
  }

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
