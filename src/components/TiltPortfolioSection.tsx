import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { navigate } from '../lib/navigate';

gsap.registerPlugin(ScrollTrigger);

export const TiltPortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const lastActiveRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startProgressRef = useRef(0);
  const dragDistRef = useRef(0);
  const [active, setActive] = useState(0);

  const openProject = (slug: string) => {
    if (dragDistRef.current > 8) return;
    navigate(`/work/${slug}`);
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const updateActive = () => {
      const cards = track.querySelectorAll<HTMLElement>('[data-tilt-card]');
      const progress = stRef.current?.progress ?? 0;
      const endBlend = Math.max(0, (progress - 0.7) / 0.3);
      const mid = window.innerWidth * (0.42 + 0.32 * endBlend);
      let best = 0;
      let bestDist = Infinity;
      cards.forEach((card, i) => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const d = Math.abs(cx - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (progress >= 0.97) best = cards.length - 1;
      if (best !== lastActiveRef.current) {
        lastActiveRef.current = best;
        setActive(best);
      }
    };

    const getTravel = () => {
      const last = track.querySelector<HTMLElement>('[data-tilt-card]:last-child');
      const vw = window.innerWidth;
      if (!last) return Math.max(0, track.scrollWidth - vw);
      const lastRight = last.offsetLeft + last.offsetWidth;
      return Math.max(0, lastRight - vw * 0.82);
    };

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getTravel(),
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${getTravel()}`,
            pin: true,
            pinSpacing: true,
            scrub: 1.1,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
            onUpdate: updateActive,
            onRefresh: updateActive,
          },
        }
      );
      stRef.current = tween.scrollTrigger ?? null;
    }, section);

    const onPointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      draggingRef.current = true;
      dragDistRef.current = 0;
      startXRef.current = e.clientX;
      startYRef.current = e.clientY;
      startProgressRef.current = stRef.current?.progress ?? 0;
    };

    const onPointerMove = (e: PointerEvent) => {
      const st = stRef.current;
      if (!draggingRef.current || !st) return;
      const dx = e.clientX - startXRef.current;
      const dy = e.clientY - startYRef.current;
      dragDistRef.current = Math.max(dragDistRef.current, Math.hypot(dx, dy));
      if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return;
      if (Math.abs(dx) <= Math.abs(dy)) return;
      e.preventDefault();
      const next = gsap.utils.clamp(0, 1, startProgressRef.current - dx / (window.innerWidth * 0.9));
      const y = st.start + (st.end - st.start) * next;
      window.scrollTo(0, y);
    };

    const onPointerUp = () => {
      draggingRef.current = false;
    };

    const refresh = () => ScrollTrigger.refresh();

    const imgs = Array.from(track.querySelectorAll('img'));
    Promise.all(
      imgs.map(
        (img) =>
          img.complete
            ? Promise.resolve()
            : new Promise<void>((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
              })
      )
    ).then(() => {
      refresh();
    });

    window.addEventListener('resize', refresh);
    section.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove, { passive: false });
    window.addEventListener('pointerup', onPointerUp);

    const raf = requestAnimationFrame(refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', refresh);
      section.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      ctx.revert();
      stRef.current = null;
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      data-portfolio-tilt
      className="relative z-10 h-screen w-full cursor-grab overflow-hidden bg-black select-none"
      aria-labelledby="portfolio-heading"
    >
      <h2
        id="portfolio-heading"
        className="pointer-events-none absolute left-6 top-24 z-20 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45 md:left-12"
      >
        Portfolio
      </h2>
      <div
        className="absolute inset-0 flex items-center"
        style={{ perspective: '1400px', perspectiveOrigin: '40% 50%' }}
      >
        <div
          className="w-full"
          style={{
            transform: 'rotateZ(-9deg) rotateY(-18deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <div
            ref={trackRef}
            className="flex items-center gap-8 pl-[12vw] pr-[5vw] will-change-transform"
          >
            {PROJECTS.map((project, i) => (
              <article
                key={project.slug}
                data-tilt-card
                role="link"
                tabIndex={0}
                onClick={() => openProject(project.slug)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openProject(project.slug);
                  }
                }}
                className="relative h-[62vh] w-[min(42vw,340px)] shrink-0 cursor-pointer overflow-hidden bg-neutral-900"
              >
                <img
                  src={project.images[0]}
                  alt={project.title}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />

                <p className="absolute left-5 top-5 font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/80">
                  ATS
                </p>
                <p className="absolute right-5 top-5 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/70">
                  {project.year}
                </p>

                <div className="absolute inset-x-5 top-1/2 -translate-y-1/2 text-center">
                  <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/70">
                    {project.subtitle}
                  </p>
                  <h3 className="mt-2 font-syne text-[clamp(1.4rem,3.2vw,2.6rem)] font-bold uppercase leading-[0.95] tracking-tight text-white">
                    {project.title}
                  </h3>
                </div>

                <p className="absolute bottom-5 left-5 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/75">
                  ({String(i + 1).padStart(2, '0')}) {project.title}
                </p>

                {active === i && (
                  <div className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-6 flex items-center gap-1.5 md:left-12">
        {PROJECTS.map((_, i) => (
          <span
            key={i}
            className={`h-3.5 border border-white/70 ${
              i === active ? 'w-5 bg-white/20' : 'w-2.5'
            }`}
          />
        ))}
      </div>

      <p className="pointer-events-none absolute bottom-8 right-6 font-mono-custom text-[10px] uppercase tracking-[0.35em] text-white/80 md:right-12">
        (SCROLL / DRAG)
      </p>
    </section>
  );
};
