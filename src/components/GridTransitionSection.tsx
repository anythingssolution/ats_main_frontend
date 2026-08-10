import React, { useMemo, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Match reference: ~8 columns × 3 rows of large portrait tiles */
const GRID_COLS = 8;
const GRID_ROWS = 3;
const CELL_COUNT = GRID_COLS * GRID_ROWS;

interface GridTransitionSectionProps {
  isLoading?: boolean;
}

export const GridTransitionSection: React.FC<GridTransitionSectionProps> = ({
  isLoading = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLHeadingElement>(null);
  const finalTextRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const cells = useMemo(
    () => Array.from({ length: CELL_COUNT }, (_, i) => i),
    []
  );

  useGSAP(
    () => {
      if (isLoading) return;

      const section = sectionRef.current;
      const panel = panelRef.current;
      const introText = introTextRef.current;
      const finalText = finalTextRef.current;
      const grid = gridRef.current;

      if (!section || !panel || !introText || !finalText || !grid) return;

      const gridItems = gsap.utils.toArray<HTMLElement>('.gts-cell', grid);

      gsap.set(gridItems, {
        scale: 0,
        transformOrigin: 'center center',
        force3D: true,
      });
      gsap.set(introText, { autoAlpha: 1, filter: 'blur(0px)', scale: 1 });
      gsap.set(finalText, { autoAlpha: 0, filter: 'blur(40px)', scale: 1.06 });

      // Sticky panel (no GSAP pin) — avoids pin-spacer duplicate text
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1) Intro blurs out
      tl.to(introText, {
        autoAlpha: 0,
        filter: 'blur(40px)',
        scale: 1.06,
        duration: 0.65,
      });

      // 2) Boxes + final text blur-in together
      tl.addLabel('boxesAndText');

      tl.to(
        gridItems,
        {
          scale: 1,
          duration: 1.35,
          stagger: {
            each: 0.025,
            from: 'center',
            grid: [GRID_ROWS, GRID_COLS],
          },
        },
        'boxesAndText'
      );

      tl.fromTo(
        finalText,
        { autoAlpha: 0, filter: 'blur(40px)', scale: 1.06 },
        {
          autoAlpha: 1,
          filter: 'blur(0px)',
          scale: 1,
          duration: 1.35,
          immediateRender: false,
        },
        'boxesAndText'
      );

      // Hold tiled + text
      tl.to({}, { duration: 0.45 });

      // 3) Fill to solid light
      tl.to(gridItems, {
        scale: 3,
        duration: 0.95,
        stagger: {
          each: 0.015,
          from: 'center',
          grid: [GRID_ROWS, GRID_COLS],
        },
      });

      tl.to(
        panel,
        { backgroundColor: '#f0f0f0', duration: 0.5 },
        '-=0.55'
      );

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    {
      scope: sectionRef,
      dependencies: [isLoading],
      revertOnUpdate: true,
    }
  );

  return (
    <section
      ref={sectionRef}
      data-grid-transition
      className="relative z-30 h-[400vh] w-full"
      aria-label="Grid transition"
    >
      {/* One panel only — sticky keeps it in view while the tall section scrolls */}
      <div
        ref={panelRef}
        className="sticky top-0 h-screen w-full overflow-hidden bg-black"
      >
        <div className="gts-film-grain pointer-events-none absolute inset-0 z-[1]" aria-hidden="true" />

        <div
          ref={gridRef}
          className="pointer-events-none absolute inset-0 z-10 grid"
          style={{
            gridTemplateColumns: `repeat(${GRID_COLS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${GRID_ROWS}, minmax(0, 1fr))`,
            gap: 'clamp(16px, 2vw, 32px)',
            padding: 'clamp(16px, 2vw, 32px)',
          }}
          aria-hidden="true"
        >
          {cells.map((i) => (
            <div
              key={i}
              className="gts-cell h-full w-full rounded-[18px] bg-white will-change-transform sm:rounded-[22px] md:rounded-[28px]"
              style={{ transform: 'scale(0)', transformOrigin: 'center center' }}
            />
          ))}
        </div>

        <div
          ref={finalTextRef}
          className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center px-6 md:px-12"
          style={{ opacity: 0, filter: 'blur(40px)', transform: 'scale(1.06)' }}
        >
          <div className="flex flex-col items-center text-center">
            <span className="block font-syne text-[clamp(2.25rem,7vw,6rem)] font-bold leading-none tracking-tight text-black">
              WE MAKE IT
            </span>
            <span className="mt-[0.1em] block font-syne text-[clamp(2.25rem,7vw,6rem)] font-bold leading-none tracking-tight text-black">
              HAPPEN TODAY
            </span>
          </div>
        </div>

        <div className="absolute inset-0 z-40 flex items-center justify-center px-6 md:px-12">
          <h2
            ref={introTextRef}
            className="max-w-[14ch] text-center font-syne text-[clamp(2.25rem,7vw,6.5rem)] font-bold leading-[0.95] tracking-tight text-white"
          >
            ANY IDEA CAN GO LIVE TODAY
          </h2>
        </div>
      </div>
    </section>
  );
};
