import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ExternalLink } from 'lucide-react';
import { getProject, resolveProjectSlug, type Project } from '../data/projects';
import { navigate } from '../lib/navigate';
import { applyPageSeo, restoreHomeSeo } from '../lib/seo';
import { ContactModal } from './ContactModal';

interface ProjectDetailPageProps {
  slug: string;
}

const ATS_ORG_ID = 'https://anythingssolution.com/#organization';

function projectJsonLd(project: Project, pageUrl: string) {
  const image = project.images[0]
    ? `https://anythingssolution.com${project.images[0]}`
    : 'https://anythingssolution.com/og-image.png';

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        '@id': `${pageUrl}#product`,
        name: project.title,
        alternateName: project.hindiName ? [project.hindiName] : undefined,
        url: project.liveUrl ?? pageUrl,
        image,
        description: project.seoDescription ?? project.summary,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        inLanguage: ['hi', 'en'],
        creator: { '@id': ATS_ORG_ID },
        provider: { '@id': ATS_ORG_ID },
        publisher: { '@id': ATS_ORG_ID },
        isPartOf: { '@id': 'https://anythingssolution.com/#website' },
        sameAs: [project.liveUrl, project.youtubeUrl, project.youtubePlaylist].filter(Boolean),
      },
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.seoTitle ?? `${project.title} | Anythingssolution (ATS)`,
        description: project.seoDescription ?? project.summary,
        inLanguage: 'en',
        isPartOf: { '@id': 'https://anythingssolution.com/#website' },
        about: { '@id': `${pageUrl}#product` },
        primaryImageOfPage: image,
        publisher: { '@id': ATS_ORG_ID },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Any Things Solution',
            item: 'https://anythingssolution.com/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Work',
            item: 'https://anythingssolution.com/#portfolio',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ slug }) => {
  const canonicalSlug = resolveProjectSlug(slug);
  const project = getProject(slug);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    if (slug !== canonicalSlug) {
      navigate(`/work/${canonicalSlug}`);
    }
  }, [slug, canonicalSlug]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [canonicalSlug]);

  useEffect(() => {
    if (!project) return;
    const pageUrl = `https://anythingssolution.com/work/${project.slug}`;
    applyPageSeo({
      title: project.seoTitle ?? `${project.title} | Anythingssolution (ATS)`,
      description: project.seoDescription ?? project.summary,
      url: pageUrl,
      image: `https://anythingssolution.com${project.images[0]}`,
      imageAlt: project.imageAlts?.[0],
      keywords: project.seoKeywords,
      jsonLd: projectJsonLd(project, pageUrl),
    });
    return () => restoreHomeSeo();
  }, [project]);

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

  const isCaseStudy = Boolean(project.features?.length);

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
        <p className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-brand">
          {project.eyebrow ?? `Work / ${project.year}`}
        </p>
        <h1 className="mt-4 font-syne text-[clamp(2.6rem,7vw,6.4rem)] font-semibold uppercase leading-[0.9] tracking-tight">
          {project.title}
          {project.hindiName ? (
            <span className="mt-3 block font-syne text-[clamp(1.1rem,2.4vw,1.8rem)] font-medium normal-case tracking-tight text-white/55">
              {project.hindiName} — billing and credit accounts for agricultural shops
            </span>
          ) : null}
        </h1>
        <p className="mt-6 max-w-[40rem] text-[16px] leading-relaxed text-white/55 md:text-[18px]">
          {project.summary}
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-6 sm:grid-cols-4">
          <div>
            <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Built by</dt>
            <dd className="mt-2 text-sm text-white/85">{project.client}</dd>
          </div>
          <div>
            <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Year</dt>
            <dd className="mt-2 text-sm text-white/85">{project.year}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Scope</dt>
            <dd className="mt-2 text-sm text-white/85">{project.services.join(' · ')}</dd>
          </div>
          {project.liveUrl ? (
            <div>
              <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Live product</dt>
              <dd className="mt-2 text-sm">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-brand hover:text-white"
                >
                  {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </dd>
            </div>
          ) : null}
        </dl>

        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white px-6 py-3 font-mono-custom text-[11px] uppercase tracking-[0.22em] text-black transition-transform hover:scale-[1.03]"
            >
              Open {project.title}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : null}
          {project.youtubeUrl ? (
            <a
              href={project.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-white/15 px-6 py-3 font-mono-custom text-[11px] uppercase tracking-[0.22em] text-white/80 hover:text-white"
            >
              YouTube @krishiudhar
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          ) : null}
        </div>
        {project.liveUrl ? (
          <p className="mt-4 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40">
            Free during beta · future price not announced
          </p>
        ) : null}

        <div className="mt-12 overflow-hidden border border-white/10">
          <img
            src={project.images[0]}
            alt={project.imageAlts?.[0] ?? `${project.title} hero`}
            className="h-auto w-full object-cover"
          />
        </div>

        {project.problem?.length ? (
          <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35 lg:col-span-3">
              The problem
            </h2>
            <div className="space-y-5 text-[15px] leading-relaxed text-white/60 lg:col-span-8">
              {project.problem.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>
        ) : null}

        {project.audienceFor?.length ? (
          <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35 lg:col-span-3">
              Who it is for
            </h2>
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:col-span-8">
              <div>
                <p className="font-syne text-lg text-white">Built for</p>
                <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-white/60">
                  {project.audienceFor.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>
              {project.audienceNot?.length ? (
                <div>
                  <p className="font-syne text-lg text-white">Not for</p>
                  <ul className="mt-4 space-y-2 text-[15px] leading-relaxed text-white/60">
                    {project.audienceNot.map((item) => (
                      <li key={item}>— {item}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </section>
        ) : null}

        <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35 lg:col-span-3">
            About the work
          </h2>
          <div className="space-y-6 text-[15px] leading-relaxed text-white/60 lg:col-span-8">
            {project.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {project.features?.length ? (
          <section className="mt-16">
            <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
              What ATS built
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2">
              {project.features.map((feature) => (
                <article key={feature.title} className="bg-black p-6 md:p-8">
                  <h3 className="font-syne text-xl font-semibold tracking-tight text-white">{feature.title}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-white/55">{feature.why}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        {project.example ? (
          <section className="mt-16 border border-white/10 bg-white/[0.03] px-6 py-8 md:px-10 md:py-10">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-brand">{project.example.title}</p>
            <p className="mt-4 max-w-[46rem] font-syne text-[clamp(1.2rem,2.4vw,1.75rem)] font-medium leading-snug text-white">
              {project.example.body}
            </p>
          </section>
        ) : null}

        <div className="mt-16 grid grid-cols-1 gap-6">
          {project.images.slice(1).map((src, index) => (
            <div key={src} className="overflow-hidden border border-white/10">
              <img
                src={src}
                alt={project.imageAlts?.[index + 1] ?? `${project.title} screen ${index + 2}`}
                className="h-auto w-full object-cover"
              />
            </div>
          ))}
        </div>

        {project.approach?.length ? (
          <section className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
            <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35 lg:col-span-3">
              How ATS worked
            </h2>
            <ul className="space-y-4 text-[15px] leading-relaxed text-white/60 lg:col-span-8">
              {project.approach.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {project.stack?.length ? (
          <section className="mt-16">
            <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">Stack</h2>
            <dl className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {project.stack.map((row) => (
                <div key={row.layer} className="grid grid-cols-1 gap-2 py-5 sm:grid-cols-12 sm:gap-6">
                  <dt className="font-mono-custom text-[11px] uppercase tracking-[0.2em] text-white/45 sm:col-span-3">
                    {row.layer}
                  </dt>
                  <dd className="text-[15px] text-white/70 sm:col-span-9">{row.choice}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {project.notBuilt?.length ? (
          <section className="mt-16">
            <h2 className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
              Product choices — not in this beta
            </h2>
            <ul className="mt-8 space-y-4 text-[15px] leading-relaxed text-white/55">
              {project.notBuilt.map((row) => (
                <li key={row.item}>
                  <span className="text-white/85">{row.item}.</span> {row.why}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-white/10 pt-10">
          <button
            type="button"
            onClick={() => navigate('/#portfolio')}
            className="inline-flex items-center gap-2 font-mono-custom text-xs uppercase tracking-[0.28em] text-white/55 hover:text-white"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All work
          </button>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-white/20 px-8 py-3.5 font-mono-custom text-xs uppercase tracking-[0.28em] text-white transition-colors hover:border-brand"
              >
                {project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            ) : null}
            <button
              type="button"
              onClick={() => setContactOpen(true)}
              className="inline-flex items-center gap-3 bg-white px-8 py-3.5 font-mono-custom text-xs uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              Start a project with ATS
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {project.credit ? (
          <p className="mt-12 max-w-[48rem] text-[13px] leading-relaxed text-white/40">{project.credit}</p>
        ) : null}

        {isCaseStudy ? (
          <div className="seo-outline">
            <p>
              Krishi Udhar (कृषि उधार) is Hindi billing and udhari software for fertiliser, seed and agri-input shops.
              It is designed, built and operated by Anythingssolution (ATS) at anythingssolution.com. Live product:
              krishiudhar.com.
            </p>
          </div>
        ) : null}
      </main>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};
