import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { navigate } from '../lib/navigate';

gsap.registerPlugin(ScrollTrigger);

export const TiltPortfolioSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const desktopTrackRef = useRef<HTMLDivElement>(null);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const lastActiveRef = useRef(0);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const startProgressRef = useRef(0);
  const dragDistRef = useRef(0);

  // Desktop active slide
  const [active, setActive] = useState(0);

  // Mobile active slide & dynamic centering padding
  const [mobileActive, setMobileActive] = useState(0);
  const mobileActiveRef = useRef(0);
  const [paddingInline, setPaddingInline] = useState(48);

  // Mobile touch tap detection
  const touchStartRef = useRef({ x: 0, y: 0 });
  const touchMovedRef = useRef(false);

  const openProject = (slug: string) => {
    try {
      window.history.replaceState(null, '', '/#portfolio');
    } catch {}
    navigate(`/work/${slug}`);
  };

  const handleDesktopCardClick = (slug: string) => {
    if (dragDistRef.current > 8) return;
    openProject(slug);
  };

  const scrollToDesktopCard = (targetIndex: number) => {
    const st = stRef.current;
    if (!st) return;
    const count = PROJECTS.length;
    if (count <= 1) return;
    const targetProgress = targetIndex / (count - 1);
    const y = st.start + (st.end - st.start) * targetProgress;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  // Mobile scroll to card
  const scrollToMobileCard = (targetIndex: number) => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-mobile-card]');
    const target = cards[targetIndex];
    if (!target) return;
    const targetLeft = target.offsetLeft - (track.clientWidth - target.clientWidth) / 2;
    track.scrollTo({ left: targetLeft, behavior: 'smooth' });
    mobileActiveRef.current = targetIndex;
    setMobileActive(targetIndex);
  };

  // Mobile track scroll listener
  const onMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track) return;
    const cards = track.querySelectorAll<HTMLElement>('[data-mobile-card]');
    const center = track.scrollLeft + track.clientWidth / 2;
    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((card, i) => {
      const cardCenter = card.offsetLeft + card.clientWidth / 2;
      const diff = Math.abs(center - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = i;
      }
    });
    if (closestIndex !== mobileActiveRef.current) {
      mobileActiveRef.current = closestIndex;
      setMobileActive(closestIndex);
    }
  };

  // Mobile touch handlers to prevent accidental link opening on swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
    touchMovedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const t = e.touches[0];
    const dx = t.clientX - touchStartRef.current.x;
    const dy = t.clientY - touchStartRef.current.y;
    if (Math.hypot(dx, dy) > 8) {
      touchMovedRef.current = true;
    }
  };

  const handleMobileCardClick = (slug: string) => {
    if (touchMovedRef.current) return;
    openProject(slug);
  };

  // Calculate dynamic padding to always center the mobile cards with a gorgeous peek on both sides
  useEffect(() => {
    const updateMobilePadding = () => {
      if (typeof window === 'undefined') return;
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      if (vw >= 768) return;
      const cardHeight = Math.min(vh * 0.48, 440);
      const cardWidth = cardHeight * (1020 / 1674);
      const pad = Math.max(20, (vw - cardWidth) / 2);
      setPaddingInline(pad);
    };

    updateMobilePadding();
    window.addEventListener('resize', updateMobilePadding);
    return () => window.removeEventListener('resize', updateMobilePadding);
  }, []);

  // Desktop GSAP & ScrollTrigger setup — runs exclusively on >= 768px screens
  useEffect(() => {
    const section = sectionRef.current;
    const desktopTrack = desktopTrackRef.current;
    if (!section || !desktopTrack) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const getMetrics = () => {
        const cards = desktopTrack.querySelectorAll<HTMLElement>('[data-tilt-card]');
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

      const tween = gsap.fromTo(
        desktopTrack,
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

      const imgs = Array.from(desktopTrack.querySelectorAll('img'));
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
      };
    });

    return () => {
      mm.revert();
      stRef.current = null;
    };
  }, []);

  const activeMobileProject = PROJECTS[mobileActive] ?? PROJECTS[0];

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      data-portfolio-tilt
      className="relative z-10 w-full min-h-[100dvh] md:h-screen md:cursor-grab overflow-hidden bg-black select-none"
      aria-labelledby="portfolio-heading"
    >
      {/* =========================================================================
          MOBILE VIEW (< 768px):
          High-end touch carousel with 1:1.64 poster framing, smooth snap swipe,
          active project metadata header, service tags, and intuitive controls.
          Does NOT lock vertical page scrolling.
          ========================================================================= */}
      <div className="flex min-h-[100dvh] w-full flex-col justify-between px-4 pt-20 pb-7 md:hidden">
        {/* Top Header: Eyebrow + Active Counter + Dynamic Project Title */}
        <header>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <h2
                id="portfolio-heading"
                className="font-mono-custom text-[10px] uppercase tracking-[0.35em] text-white/50"
              >
                Portfolio
              </h2>
            </div>
            <span className="font-mono-custom text-[11px] font-medium tracking-widest text-white/70 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
              0{mobileActive + 1} / 0{PROJECTS.length}
            </span>
          </div>

          <div className="mt-3 min-h-[48px]">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-syne text-xl font-bold uppercase tracking-tight text-white line-clamp-1">
                {activeMobileProject.title}
              </h3>
              <span className="font-mono-custom text-[10px] uppercase tracking-wider text-white/50 shrink-0">
                {activeMobileProject.year}
              </span>
            </div>
            <p className="mt-0.5 font-mono-custom text-[11px] uppercase tracking-[0.16em] text-white/60 line-clamp-1">
              {activeMobileProject.subtitle}
            </p>
          </div>
        </header>

        {/* Center: Interactive Snap Carousel */}
        <div
          ref={mobileTrackRef}
          onScroll={onMobileScroll}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          className="no-scrollbar relative my-auto flex items-center gap-4 overflow-x-auto snap-x snap-mandatory py-2 scroll-smooth"
          style={{
            paddingLeft: `${paddingInline}px`,
            paddingRight: `${paddingInline}px`,
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {PROJECTS.map((project, i) => {
            const isActive = mobileActive === i;
            const poster = Boolean(project.cover);
            const buttonBg =
              project.slug === 'homeopathy-clinic'
                ? 'bg-[#1b4332] text-white shadow-[#1b4332]/50'
                : project.slug === 'krishi-udhar'
                ? 'bg-[#163024] text-amber-200 shadow-[#163024]/50'
                : project.slug === 'mathur-cineplex'
                ? 'bg-[#4a0d17] text-amber-200 shadow-[#4a0d17]/50'
                : 'bg-black text-white shadow-black/50';

            return (
              <article
                key={project.slug}
                data-mobile-card
                role="link"
                tabIndex={0}
                onClick={() => handleMobileCardClick(project.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openProject(project.slug);
                  }
                }}
                className={`group relative shrink-0 cursor-pointer overflow-hidden rounded-2xl border border-white/15 bg-neutral-900 shadow-2xl transition-all duration-300 ease-out select-none ${
                  isActive
                    ? 'scale-100 opacity-100 ring-1 ring-white/30 shadow-black/90'
                    : 'scale-[0.92] opacity-45 shadow-black/40'
                }`}
                style={{
                  height: 'min(48vh, 440px)',
                  aspectRatio: '1020 / 1674',
                  scrollSnapAlign: 'center',
                }}
              >
                <img
                  src={project.cover ?? project.images[0]}
                  alt={project.title}
                  className="pointer-events-none h-full w-full object-cover"
                  draggable={false}
                  loading={i === 0 ? 'eager' : 'lazy'}
                />

                {!poster && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/20" />
                )}

                {/* Bottom interactive action pills */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between p-3.5 pt-8 bg-gradient-to-t from-black/85 via-black/35 to-transparent">
                  <span
                    className={`rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 font-mono-custom text-[9px] uppercase font-medium tracking-widest text-white/90 border border-white/15 transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    View Project
                  </span>
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-transform duration-200 ${buttonBg} ${
                      isActive ? 'scale-100' : 'scale-90 opacity-0'
                    }`}
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer: Service Tags + Dots Pagination + Chevron Controls */}
        <footer>
          {/* Active project capability tags */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 px-2 min-h-[26px]">
            {activeMobileProject.services.slice(0, 3).map((svc) => (
              <span
                key={svc}
                className="rounded-full border border-white/10 bg-white/[0.06] px-2.5 py-0.5 font-mono-custom text-[9px] uppercase tracking-wider text-white/70"
              >
                {svc}
              </span>
            ))}
          </div>

          {/* Controls Bar: Dots + (SWIPE / TAP) + Chevrons */}
          <div className="mt-4 flex items-center justify-between">
            {/* Interactive Dot Indicators */}
            <div className="flex items-center gap-2">
              {PROJECTS.map((project, i) => (
                <button
                  key={project.slug}
                  type="button"
                  onClick={() => scrollToMobileCard(i)}
                  title={`Go to ${project.title}`}
                  aria-label={`Go to ${project.title}`}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    i === mobileActive
                      ? 'w-7 bg-white'
                      : 'w-2 bg-white/25 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            {/* Swipe guide & Chevrons */}
            <div className="flex items-center gap-2.5">
              <span className="font-mono-custom text-[9px] uppercase tracking-[0.25em] text-white/45">
                (SWIPE / TAP)
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => scrollToMobileCard(Math.max(0, mobileActive - 1))}
                  disabled={mobileActive === 0}
                  aria-label="Previous project"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 disabled:opacity-25 disabled:cursor-not-allowed active:bg-white/20 cursor-pointer"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToMobileCard(Math.min(PROJECTS.length - 1, mobileActive + 1))}
                  disabled={mobileActive === PROJECTS.length - 1}
                  aria-label="Next project"
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 disabled:opacity-25 disabled:cursor-not-allowed active:bg-white/20 cursor-pointer"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* =========================================================================
          DESKTOP / WEB VIEW (>= 768px):
          100% UNTOUCHED original 3D perspective tilt track with pinned GSAP ScrollTrigger
          and pointer drag functionality.
          ========================================================================= */}
      <div className="hidden md:block">
        <h2
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
              ref={desktopTrackRef}
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
                    onClick={() => handleDesktopCardClick(project.slug)}
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
              onClick={() => scrollToDesktopCard(i)}
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
      </div>
    </section>
  );
};
