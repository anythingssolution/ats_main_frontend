import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getProject } from '../data/projects';
import { navigate } from '../lib/navigate';
import { ContactModal } from './ContactModal';

interface ProjectDetailPageProps {
  slug: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug }) => {
  const project = getProject(slug);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
        <p className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45">404</p>
        <h1 className="mt-4 font-syne text-4xl font-semibold">Project not found</h1>
        <button
          type="button"
          onClick={() => navigate('/#portfolio')}
          className="mt-8 font-mono-custom text-xs uppercase tracking-[0.28em] text-brand hover:text-white"
        >
          Back to portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed left-0 right-0 top-0 z-50 px-5 py-3 md:px-10 md:py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-7">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="shrink-0 cursor-pointer"
              aria-label="Any Things Solution home"
            >
              <img src="/nav-logo-light.png" alt="ATS Any Things Solution" className="h-9 w-auto md:h-11" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/#portfolio')}
              className="hidden items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[0.16em] text-white/70 hover:text-white md:flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Portfolio
            </button>
          </div>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono-custom text-xs font-bold uppercase tracking-widest text-black transition-all hover:scale-105 hover:bg-neutral-200 active:scale-95"
          >
            <span>CONTACT US</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-28 md:px-12 md:pb-32 md:pt-32">
        <p className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45">
          Work / {project.year}
        </p>
        <h1 className="mt-4 font-syne text-[clamp(2.8rem,8vw,7rem)] font-semibold uppercase leading-[0.9] tracking-tight">
          {project.title}
        </h1>
        <p className="mt-6 max-w-[36rem] text-[16px] leading-relaxed text-white/55 md:text-[18px]">
          {project.summary}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-6 sm:grid-cols-3">
          <div>
            <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Client</dt>
            <dd className="mt-2 text-sm text-white/85">{project.client}</dd>
          </div>
          <div>
            <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Year</dt>
            <dd className="mt-2 text-sm text-white/85">{project.year}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Services</dt>
            <dd className="mt-2 text-sm text-white/85">{project.services.join(' · ')}</dd>
          </div>
        </dl>

        <div className="mt-12 overflow-hidden border border-white/10">
          <img
            src={project.images[0]}
            alt={`${project.title} hero`}
            className="h-auto w-full object-cover"
          />
        </div>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35 lg:col-span-3">
            About the work
          </p>
          <div className="space-y-6 text-[15px] leading-relaxed text-white/60 lg:col-span-8">
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6">
          {project.images.slice(1).map((src, index) => (
            <div key={src} className="overflow-hidden border border-white/10">
              <img
                src={src}
                alt={`${project.title} screen ${index + 2}`}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
          <button
            type="button"
            onClick={() => navigate('/#portfolio')}
            className="inline-flex items-center gap-2 font-mono-custom text-xs uppercase tracking-[0.28em] text-white/55 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All work
          </button>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center gap-3 bg-white px-8 py-3.5 font-mono-custom text-xs uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.03] active:scale-95"
          >
            Start a project
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </main>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};
