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
    try {
      window.history.replaceState(null, '', '/#portfolio');
    } catch {}
    navigate(`/work/${slug}`);
  };

  const scrollToCard = (targetIndex: number) => {
    const st = stRef.current;
    if (!st) return;
    const count = PROJECTS.length;
    if (count <= 1) return;
    const targetProgress = targetIndex / (count - 1);
    const y = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getMetrics = () => {
      const cards = track.querySelectorAll<HTMLElement>('[data-tilt-card]');
      const count = cards.length;
      const vh = window.innerHeight;

      if (count <= 1) {
        return {
          travel: 0,
          pinDistance: vh * 0.6,
        };
      }

      const first = cards[0];
      const second = cards[1];
      const step =
        second && first
          ? Math.abs(second.offsetLeft - first.offsetLeft)
          : (first?.offsetWidth ?? 340) + 32;

      // Exact horizontal travel to bring each card from Card 0 to Card N-1 into the focal spot:
      const travel = (count - 1) * step;

      // Generous comfortable pin distance: ~0.85 screen heights of scroll per card transition
      const pinDistance = Math.max(vh * 0.8, (count - 1) * vh * 0.85);

      return {
        travel,
        pinDistance,
        step,
        count,
      };
    };

    const updateActive = () => {
      const count = PROJECTS.length;
      if (count <= 1) {
        setActive(0);
        return;
      }
      const progress = stRef.current?.progress ?? 0;
      const best = Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1))));
      if (best !== lastActiveRef.current) {
        lastActiveRef.current = best;
        setActive(best);
      }
    };

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: () => -getMetrics().travel,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            id: 'portfolio-trigger',
            trigger: section,
            start: 'top top',
            end: () => `+=${getMetrics().pinDistance}`,
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
      const count = PROJECTS.length;
      const dragFactor = (count > 1 ? count - 1 : 1) * (window.innerWidth * 0.45);
      const next = gsap.utils.clamp(0, 1, startProgressRef.current - dx / dragFactor);
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
            className="flex items-center gap-8 will-change-transform"
            style={{
              paddingLeft: 'max(8vw, calc(44vw - min(21vw, 170px)))',
              paddingRight: '16vw',
            }}
          >
            {PROJECTS.map((project, i) => {
              const poster = Boolean(project.cover);
              return (
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
                className={`relative h-[62vh] w-[min(42vw,340px)] shrink-0 cursor-pointer overflow-hidden ${
                  poster ? 'bg-white' : 'bg-neutral-900'
                }`}
              >
                <img
                  src={project.cover ?? project.images[0]}
                  alt={project.title}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                  draggable={false}
                />
                {!poster && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
                )}

                {!poster && (
                  <>
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
                  </>
                )}

                {active === i && (
                  <div
                    className={`absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full shadow-lg ${
                      project.slug === 'homeopathy-clinic'
                        ? 'bg-[#1b4332] text-white'
                        : project.slug === 'krishi-udhar'
                        ? 'bg-[#163024] text-amber-200'
                        : project.slug === 'mathur-cineplex'
                        ? 'bg-[#4a0d17] text-amber-200'
                        : poster
                        ? 'bg-[#163024] text-white'
                        : 'bg-white text-black'
                    }`}
                  >
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                )}
              </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-20 flex items-center gap-2 md:left-12">
        {PROJECTS.map((project, i) => (
          <button
            key={project.slug}
            type="button"
            onClick={() => scrollToCard(i)}
            title={`Go to ${project.title}`}
            aria-label={`Go to ${project.title}`}
            className={`h-3.5 border border-white/70 transition-all duration-300 cursor-pointer ${
              i === active
                ? 'w-6 bg-white/35 border-white'
                : 'w-2.5 bg-transparent hover:bg-white/15'
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
