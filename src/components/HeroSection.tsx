import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Globe, Smartphone, BarChart3, Palette, Presentation, Bot } from 'lucide-react';
import { GridTransitionSection } from './GridTransitionSection';
import { FloatingImagesBackground } from './FloatingImagesBackground';
import { TiltPortfolioSection } from './TiltPortfolioSection';

gsap.registerPlugin(ScrollTrigger);

const SPLIT_BANDS = 4;

const SplitLine: React.FC<{ text: string; className?: string; shift?: number }> = ({
  text,
  className = '',
  shift = 1,
}) => (
  <div className={`relative h-[0.88em] w-full overflow-hidden ${className}`} data-split-line={shift}>
    {Array.from({ length: SPLIT_BANDS }, (_, i) => {
      const topClip = (i / SPLIT_BANDS) * 100;
      const bottomClip = 100 - ((i + 1) / SPLIT_BANDS) * 100;
      const dir = shift * (i % 2 === 0 ? 1 : -1);
      return (
        <span
          key={i}
          data-split-band
          className="absolute inset-0 block leading-none will-change-transform"
          style={{
            clipPath: `inset(${topClip}% 0 ${bottomClip}% 0)`,
            transform: `translateX(${dir * 16}vw)`,
          }}
        >
          {text}
        </span>
      );
    })}
  </div>
);

interface HeroSectionProps {
  onReplayLoader: () => void;
  isLoading: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onReplayLoader, isLoading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const lettersWrapperRef = useRef<HTMLDivElement>(null);
  const headerLogoTargetRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);
  /** true = light nav text (sitting over a dark section) */
  const [navOnDark, setNavOnDark] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Transparent nav — flip link/CTA colors from the section under the bar
  useEffect(() => {
    if (isLoading) return;

    const triggers: ScrollTrigger[] = [];

    const grid = document.querySelector<HTMLElement>('[data-grid-transition]');
    if (grid) {
      triggers.push(
        ScrollTrigger.create({
          trigger: grid,
          start: 'top top+=80',
          end: 'bottom top+=80',
          onUpdate: (self) => {
            // Grid stays black until late, then fills light
            setNavOnDark(self.progress < 0.72);
          },
          onLeave: () => setNavOnDark(false),
          onLeaveBack: () => setNavOnDark(false),
        })
      );
    }

    triggers.push(
      ScrollTrigger.create({
        trigger: '#services',
        start: 'top top+=80',
        end: 'bottom top+=80',
        onEnter: () => setNavOnDark(true),
        onEnterBack: () => setNavOnDark(true),
        onLeave: () => setNavOnDark(false),
        onLeaveBack: () => setNavOnDark(false),
      })
    );

    triggers.push(
      ScrollTrigger.create({
        trigger: '#contact',
        start: 'top top+=80',
        end: 'bottom top+=80',
        onEnter: () => setNavOnDark(true),
        onEnterBack: () => setNavOnDark(true),
        onLeave: () => setNavOnDark(false),
        onLeaveBack: () => setNavOnDark(false),
      })
    );

    const portfolio = document.querySelector<HTMLElement>('[data-portfolio-tilt]');
    if (portfolio) {
      triggers.push(
        ScrollTrigger.create({
          trigger: portfolio,
          start: 'top top+=80',
          end: 'bottom top+=80',
          onEnter: () => setNavOnDark(true),
          onEnterBack: () => setNavOnDark(true),
          onLeave: () => setNavOnDark(false),
          onLeaveBack: () => setNavOnDark(false),
        })
      );
    }

    const marquee = document.querySelector<HTMLElement>('[data-about-marquee]');
    if (marquee) {
      triggers.push(
        ScrollTrigger.create({
          trigger: marquee,
          start: 'top top+=80',
          end: 'bottom top+=80',
          onEnter: () => setNavOnDark(true),
          onEnterBack: () => setNavOnDark(true),
          onLeave: () => setNavOnDark(false),
          onLeaveBack: () => setNavOnDark(false),
        })
      );
    }

    return () => triggers.forEach((t) => t.kill());
  }, [isLoading]);

  // Intro animation — letters slide in from left
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (isLoading) {
        gsap.set('.secondary-ui', { opacity: 0, y: 20 });

        gsap.fromTo(
          '.hero-letter',
          { x: '-100vw', opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.4,
            ease: 'power4.out',
            stagger: 0.12,
          }
        );
      } else {
        gsap.set('.hero-letter', { x: 0, opacity: 1 });

        gsap.fromTo(
          '.secondary-ui',
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1.3,
            ease: 'power2.out',
            stagger: 0.08,
            delay: 0.1,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isLoading]);

  // ScrollTrigger — shrink letters wrapper from hero center → nav center
  useLayoutEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      const hero = heroRef.current;
      const header = headerRef.current;
      const lettersWrapper = lettersWrapperRef.current;
      const logoTarget = headerLogoTargetRef.current;

      if (!hero || !header || !lettersWrapper || !logoTarget) return;

      const ctx = gsap.context(() => {
        // Measure positions
        const wrapperRect = lettersWrapper.getBoundingClientRect();
        const targetRect = logoTarget.getBoundingClientRect();

        // Where the wrapper currently is (center of screen)
        const wrapperCenterX = wrapperRect.left + wrapperRect.width / 2;
        const wrapperCenterY = wrapperRect.top + wrapperRect.height / 2;

        // Where it needs to go (center of nav logo slot)
        const targetCenterX = targetRect.left + targetRect.width / 2;
        const targetCenterY = targetRect.top + targetRect.height / 2;

        // Scale: target height / current height
        const targetHeight = 48; // desired final text height in px
        const scaleFactor = targetHeight / wrapperRect.height;

        // Translation deltas (from current center to target center)
        const deltaX = targetCenterX - wrapperCenterX;
        const deltaY = targetCenterY - wrapperCenterY;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            // Extra scroll room so the next section can rise in while ATS docks in the nav
            end: '+=120%',
            scrub: 0.65,
            pin: true,
            // Let the next section scroll UP over the hero (no empty white gap)
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Shrink + move the entire letters wrapper into the nav
        tl.to(
          lettersWrapper,
          {
            x: deltaX,
            y: deltaY,
            scale: scaleFactor,
            ease: 'none',
          },
          0
        )
          .to(
            '.hero-capital',
            {
              fontWeight: 700,
              ease: 'none',
            },
            0
          )
          .to(
            '.hero-lowercase',
            {
              opacity: 0,
              duration: 0.25,
              ease: 'power1.out',
            },
            0
          )
          .to(
            '.hero-lowercase',
            {
              scaleX: 0,
              width: 0,
              marginLeft: 0,
              duration: 0.55,
              ease: 'power2.inOut',
            },
            0.12
          )
          .to(
            lettersWrapper.querySelector('div'),
            {
              gap: '0.5rem',
              ease: 'none',
            },
            0
          )
          .to(
            header,
            {
              backgroundColor: 'transparent',
              backdropFilter: 'none',
              borderBottomColor: 'transparent',
              borderBottomWidth: 0,
              ease: 'none',
            },
            0
          )
          .to(
            '.header-center-text',
            {
              opacity: 0,
              ease: 'none',
            },
            0
          )
          // Fade hero quote / CTA at the same pace as the "ny/hings/olution" collapse
          // so it reads as one synced motion instead of vanishing early.
          .to(
            '.hero-secondary-ui',
            {
              opacity: 0,
              y: -24,
              duration: 0.65,
              ease: 'power2.inOut',
            },
            0
          );
      }, containerRef);

      return () => ctx.revert();
    }, 600);

    return () => clearTimeout(timer);
  }, [isLoading]);

  useLayoutEffect(() => {
    if (isLoading) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-split-scrub]').forEach((el) => {
        const lines = el.querySelectorAll<HTMLElement>('[data-split-line]');
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: 'top 80%',
            end: 'top 22%',
            scrub: 0.7,
          },
        });

        lines.forEach((line) => {
          const lineDir = Number(line.dataset.splitLine) || 1;
          line.querySelectorAll<HTMLElement>('[data-split-band]').forEach((band, i) => {
            const dir = lineDir * (i % 2 === 0 ? 1 : -1);
            tl.fromTo(band, { x: `${16 * dir}vw` }, { x: 0, duration: 1 }, 0);
          });
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 0.95,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-service-card]').forEach((el, i) => {
        gsap.from(el, {
          y: 56,
          opacity: 0,
          duration: 0.85,
          delay: (i % 3) * 0.1,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: el,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      gsap.utils.toArray<HTMLElement>('[data-rule-line]').forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: 'center center',
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });
    }, containerRef);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(refresh);

    return () => {
      cancelAnimationFrame(raf);
      ctx.revert();
    };
  }, [isLoading]);

  return (
    <div ref={containerRef} className="relative w-full bg-white text-[#111111] select-none font-sans">

      {/* FIXED HEADER — always transparent, colors follow section */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 overflow-visible border-0"
        style={{ backgroundColor: 'transparent', borderBottom: 'none', backdropFilter: 'none' }}
      >
        {/* Left: Nav links */}
        <nav className="secondary-ui hidden md:flex items-center gap-8 z-10">
          {['Services', 'About', 'Portfolio'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className={`font-mono-custom text-xs uppercase tracking-[0.2em] font-medium transition-colors duration-300 cursor-pointer ${
                navOnDark
                  ? 'text-white/70 hover:text-white'
                  : 'text-neutral-600 hover:text-black'
              }`}
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Center: True viewport center */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center min-w-[200px] sm:min-w-[280px] min-h-[40px] pointer-events-none px-2">
          <div
            className={`header-center-text text-center font-mono-custom uppercase tracking-[0.2em] text-[10px] sm:text-xs font-bold leading-snug transition-colors duration-300 ${
              navOnDark ? 'text-white' : 'text-neutral-900'
            }`}
          >
            Your business · Our digital engine
          </div>
          <div
            ref={headerLogoTargetRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Right: Contact CTA */}
        <div className="secondary-ui z-10 ml-auto">
          <button
            onClick={() => scrollToSection('contact')}
            className={`flex items-center gap-2 text-xs font-mono-custom uppercase font-bold tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
              navOnDark
                ? 'bg-white text-black hover:bg-neutral-200'
                : 'bg-black text-white hover:bg-neutral-800 shadow-md'
            }`}
          >
            <span>CONTACT US</span>
            <ArrowUpRight className={`w-3.5 h-3.5 ${navOnDark ? 'text-black' : 'text-white'}`} />
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* FIXED LETTERS LAYER — sits on top of everything, GSAP moves it */}
      {/* ============================================================ */}
      <div
        ref={lettersWrapperRef}
        className={`fixed inset-0 z-[60] flex items-center justify-center pointer-events-none will-change-transform transition-colors duration-300 ${
          navOnDark ? 'text-white' : 'text-black'
        }`}
      >
        <div className="flex w-full items-baseline justify-between gap-[2.5vw] px-4 sm:px-6 md:px-10">
          {/* "Any" */}
          <span className="hero-letter opacity-0 inline-flex items-baseline leading-none text-current select-none">
            <span className="hero-capital font-syne font-bold text-[clamp(3rem,19vw,22rem)] leading-none">
              A
            </span>
            <span className="hero-lowercase uppercase font-syne font-light text-[clamp(0.8rem,5vw,5.75rem)] leading-none tracking-wide" style={{ marginLeft: '-0.05em', transformOrigin: 'left baseline' }}>
              ny
            </span>
          </span>
          {/* "Things" */}
          <span className="hero-letter opacity-0 inline-flex items-baseline leading-none text-current select-none">
            <span className="hero-capital font-syne font-bold text-[clamp(3rem,19vw,22rem)] leading-none">
              T
            </span>
            <span className="hero-lowercase uppercase font-syne font-light text-[clamp(0.8rem,5vw,5.75rem)] leading-none tracking-wide" style={{ marginLeft: 'calc(clamp(3rem, 19vw, 22rem) * -0.24)', transformOrigin: 'left baseline' }}>
              hings
            </span>
          </span>
          {/* "Solution" */}
          <span className="hero-letter opacity-0 inline-flex items-baseline leading-none text-current select-none">
            <span className="hero-capital font-syne font-bold text-[clamp(3rem,19vw,22rem)] leading-none">
              S
            </span>
            <span className="hero-lowercase uppercase font-syne font-light text-[clamp(0.8rem,5vw,5.75rem)] leading-none tracking-wide" style={{ marginLeft: '-0.05em', transformOrigin: 'left baseline' }}>
              olution
            </span>
          </span>
        </div>
      </div>

      {/* HERO SECTION — 100vh trigger zone (scroll trigger area) */}
      <section
        ref={heroRef}
        className="relative z-0 h-screen w-full overflow-hidden"
      >
        {/* Scattered floating images — drift slowly, nudge with the cursor */}
        <FloatingImagesBackground className="z-0" />

        {/* Soft center wash so the headline stays readable over the images */}
        <div
          className="absolute inset-0 z-[1] h-full w-full pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 58% 42% at 50% 50%, rgba(250,249,247,0.78) 0%, rgba(250,249,247,0.28) 55%, rgba(250,249,247,0) 78%)',
          }}
        />

        {/* Attract copy */}
        <div className="hero-secondary-ui absolute inset-0 z-[65] pointer-events-none">
          {/* Quote — above Any Things Solution */}
          <div className="absolute left-0 right-0 top-24 md:top-28 px-6 md:px-12">
            <blockquote className="mx-auto max-w-[820px] text-center font-syne text-lg sm:text-xl md:text-2xl font-medium leading-[1.25] text-neutral-900">
              &ldquo;Bring your business. We&apos;ll build every digital path to{' '}
              <span className="text-[#7B6CFF]">grow it.</span>&rdquo;
            </blockquote>
          </div>

          {/* Scroll arrow — bottom right */}
          <button
            title="Scroll to explore"
            onClick={() => scrollToSection('services')}
            className="pointer-events-auto absolute bottom-6 right-6 md:bottom-8 md:right-12 z-10 flex items-center justify-center w-10 h-10 rounded-lg bg-white/90 hover:bg-white border border-neutral-200 text-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <ArrowDown className="w-4 h-4" />
          </button>

          {/* CTA — bottom center */}
          <div className="absolute bottom-10 left-0 right-0 md:bottom-14 flex justify-center">
            <button
              onClick={() => scrollToSection('contact')}
              className="pointer-events-auto inline-flex items-center gap-2.5 bg-black hover:bg-neutral-800 text-white text-xs font-mono-custom uppercase font-bold tracking-widest px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-[0_8px_24px_rgba(0,0,0,0.25)] cursor-pointer"
            >
              <span>Let&apos;s talk growth</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>
      </section>

      <GridTransitionSection isLoading={isLoading} />

      {/* ============================================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================================ */}
      <section ref={servicesRef} id="services" className="relative z-10 bg-black text-white">
        <div data-split-scrub className="flex flex-col justify-center px-6 py-24 md:px-12 md:py-32">
          <div className="relative mx-auto w-full max-w-[1400px]">
            <p data-reveal className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45">
              02 — Services
            </p>
            <div className="relative mb-10">
              <div data-rule-line className="h-px w-full bg-white/20" />
            </div>
            <h2 className="text-white">
              <SplitLine
                text="DIGITAL"
                shift={1}
                className="font-syne text-[clamp(2.6rem,8vw,6.4rem)] font-semibold tracking-tight"
              />
              <SplitLine
                text="SOLUTIONS"
                shift={-1}
                className="-mt-[0.02em] font-syne text-[clamp(2.6rem,8vw,6.4rem)] font-bold tracking-tight"
              />
              <SplitLine
                text="THAT GROW"
                shift={1}
                className="-mt-[0.02em] font-syne text-[clamp(2.4rem,7.4vw,5.8rem)] font-semibold italic tracking-tight"
              />
            </h2>
          </div>
        </div>

        <div className="px-6 pb-24 md:px-12 md:pb-32">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {[
              {
                icon: BarChart3,
                title: 'Digital Marketing',
                desc: 'SEO, social, and performance campaigns that amplify reach and turn attention into measurable ROI.',
                tag: 'GROWTH',
              },
              {
                icon: Bot,
                title: 'AI-Generated Ads',
                desc: 'High-converting creatives, copy, and campaigns at scale — built with AI, directed by humans.',
                tag: 'AI POWERED',
              },
              {
                icon: Globe,
                title: 'Website Development',
                desc: 'Modern, responsive sites from landing pages to full-stack products that load fast and convert.',
                tag: 'WEB',
              },
              {
                icon: Smartphone,
                title: 'Mobile App Development',
                desc: 'Native and cross-platform iOS & Android apps with sharp UI, smooth motion, and room to scale.',
                tag: 'MOBILE',
              },
              {
                icon: Presentation,
                title: 'Presentation Design',
                desc: 'Pitch decks and investor materials designed to hold a room and close the conversation.',
                tag: 'DESIGN',
              },
              {
                icon: Palette,
                title: 'Branding & UI/UX',
                desc: 'Identity systems, visual language, and product UX that make a brand feel inevitable.',
                tag: 'CREATIVE',
              },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  data-service-card
                  className="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] md:p-8"
                >
                  <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-[#E63946] transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors duration-300 group-hover:border-[#E63946] group-hover:bg-[#E63946]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                      ({String(i + 1).padStart(2, '0')}) {service.tag}
                    </span>
                  </div>
                  <h3 className="font-syne text-xl font-semibold tracking-tight text-white md:text-2xl">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white/50">
                    {service.desc}
                  </p>
                  <div className="mt-8 flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40 transition-colors group-hover:text-white">
                    <span>Learn more</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================================ */}
      <section ref={aboutRef} id="about" className="relative z-10 bg-[#F4F4F4] text-[#111111]">
        <div data-split-scrub className="relative px-5 pt-24 pb-6 md:px-10 md:pt-28 md:pb-8">
          <div className="relative">
            <p className="absolute right-0 top-1 z-10 hidden max-w-[14rem] text-right font-mono-custom text-[9px] uppercase leading-relaxed tracking-[0.22em] text-[#111111]/55 md:block">
              Any Things Solution creates digital paths for businesses &amp; people desiring a shift. Working worldwide.
            </p>

            <h2 className="text-[#111111]">
              <SplitLine
                text="ABOUT"
                shift={1}
                className="font-syne text-[clamp(3.8rem,16vw,12rem)] font-semibold tracking-tight"
              />
              <SplitLine
                text="THE SHIFT"
                shift={-1}
                className="-mt-[0.04em] font-syne text-[clamp(3.2rem,15vw,11rem)] font-bold tracking-tight"
              />
              <SplitLine
                text="WE GROW"
                shift={1}
                className="-mt-[0.04em] font-syne text-[clamp(3.2rem,15vw,11rem)] font-semibold italic tracking-tight"
              />
            </h2>
          </div>

          <div className="relative mt-8 md:mt-10">
            <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-[#111111]/45">
              01 — Concept
            </p>
            <div className="relative">
              <div data-rule-line className="h-px w-full bg-[#111111]/20" />
            </div>
          </div>
        </div>

        <div id="about-body" className="relative px-6 pb-16 pt-6 md:px-12 md:pb-20 md:pt-8">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <h3 className="font-syne text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-[#111111] lg:col-span-8">
              We build digital
              <br />
              experiences that
              <br />
              help you grow.
            </h3>

            <div className="flex flex-col justify-end lg:col-span-4 lg:pb-2">
              <p className="max-w-[34rem] text-[15px] leading-relaxed text-[#111111]/60 lg:ml-auto lg:text-right">
                Any Things Solution is a full-service digital agency. From AI-driven campaigns to custom web and mobile products, we build the paths that help startups and enterprises scale — not just function.
              </p>
              <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-[#111111]/60 lg:ml-auto lg:text-right">
                Designers, developers, and strategists in one room. One shift at a time.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="mt-10 inline-flex items-center gap-3 self-start bg-[#111111] px-8 py-3 font-mono-custom text-xs uppercase tracking-[0.28em] text-white transition-transform hover:scale-[1.03] active:scale-95 lg:self-end"
              >
                <span>Get in Touch</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-[1400px] grid-cols-2 border-t border-[#111111]/15 md:mt-20 md:grid-cols-4">
            {[
              { stat: '150+', label: 'Projects delivered' },
              { stat: '50+', label: 'Happy clients' },
              { stat: '12+', label: 'Team members' },
              { stat: '3+', label: 'Years experience' },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`px-4 py-8 md:px-8 ${i !== 0 ? 'border-l border-[#111111]/15' : ''}`}
              >
                <span className="block font-syne text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-none tracking-tight text-[#111111]">
                  {item.stat}
                </span>
                <p className="mt-4 font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#111111]/45">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          data-about-marquee
          className="relative w-full overflow-hidden bg-[#111111] py-16 md:py-24"
        >
          <div className="absolute left-0 right-0 top-0">
            <div className="h-px w-full bg-white/20" />
          </div>

          <div className="flex overflow-hidden whitespace-nowrap">
            <div className="about-marquee-left flex w-max items-baseline font-syne text-[clamp(3.2rem,10vw,8rem)] font-semibold italic uppercase leading-[0.9] tracking-tight text-white">
              {[0, 1].map((loop) => (
                <span key={`serif-${loop}`} className="flex shrink-0 items-baseline" aria-hidden={loop === 1}>
                  {['Perspective', 'Growth', 'Boundary', 'Intelligence', 'Craft'].map((word) => (
                    <span key={`${loop}-${word}`} className="px-[0.14em]">
                      {word}
                      <span className="text-white/30"> — </span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-2 flex overflow-hidden whitespace-nowrap">
            <div className="about-marquee-right flex w-max items-baseline font-sans text-[clamp(2.2rem,7vw,5.5rem)] font-medium uppercase leading-[0.9] tracking-tight text-white">
              {[0, 1].map((loop) => (
                <span key={`sans-${loop}`} className="flex shrink-0 items-baseline" aria-hidden={loop === 1}>
                  {['Digital Experience', 'Any Things Solution', 'Virtual Products', 'AI Ads', 'Mobile Apps'].map((word) => (
                    <span key={`${loop}-${word}`} className="px-[0.16em]">
                      {word}
                      <span className="text-white/30"> — </span>
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TiltPortfolioSection />

      {/* ============================================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================================ */}
      <section id="contact" className="relative z-10 bg-black text-white">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
          <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45">
            03 — Contact
          </p>
          <div className="relative mb-12 md:mb-16">
            <div data-rule-line className="h-px w-full bg-white/20" />
          </div>

          <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-5">
              <h2 className="font-syne text-[clamp(2.6rem,7vw,5.6rem)] font-semibold leading-[0.92] tracking-tight">
                Let&apos;s build
                <br />
                the next
                <br />
                <span className="italic">shift.</span>
              </h2>
              <p className="mt-8 max-w-[28rem] text-[15px] leading-relaxed text-white/50">
                Have a project in mind? Tell us what you want to grow — we&apos;ll map the digital path.
              </p>

              <ul className="mt-12 divide-y divide-white/10 border-y border-white/10">
                {[
                  { icon: Mail, label: 'Email', value: 'hello@anythingssolution.com', href: 'mailto:hello@anythingssolution.com' },
                  { icon: Phone, label: 'Phone', value: '+91 123 456 7890', href: 'tel:+911234567890' },
                  { icon: MapPin, label: 'Studio', value: 'India', href: null },
                ].map((item) => {
                  const Icon = item.icon;
                  const inner = (
                    <>
                      <span className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors duration-300 group-hover:border-[#E63946] group-hover:bg-[#E63946]">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span className="min-w-0">
                        <span className="block font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                          {item.label}
                        </span>
                        <span className="mt-1 block truncate text-sm text-white/80">{item.value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={item.label}>
                      {item.href ? (
                        <a href={item.href} className="group flex items-center gap-4 py-5 transition-colors hover:text-white">
                          {inner}
                        </a>
                      ) : (
                        <div className="group flex items-center gap-4 py-5">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <form
              className="group/form relative overflow-hidden border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md md:p-10 lg:col-span-7"
              onSubmit={(e) => e.preventDefault()}
            >
              <span className="absolute left-0 top-0 h-full w-[2px] bg-[#E63946]" aria-hidden="true" />

              <div className="mb-10 flex items-end justify-between gap-4">
                <h3 className="font-syne text-2xl font-semibold tracking-tight md:text-3xl">Send a message</h3>
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                  (04) Inquire
                </span>
              </div>

              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                <label className="block">
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40">Name</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className="mt-3 w-full border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#E63946]"
                  />
                </label>
                <label className="block">
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40">Email</span>
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    placeholder="you@studio.com"
                    className="mt-3 w-full border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#E63946]"
                  />
                </label>
              </div>

              <label className="mt-8 block">
                <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40">Project</span>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="What do you want to build?"
                  className="mt-3 w-full resize-none border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#E63946]"
                />
              </label>

              <button
                type="submit"
                className="mt-10 inline-flex items-center gap-3 bg-white px-8 py-3.5 font-mono-custom text-xs uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.03] active:scale-95"
              >
                <span>Send Message</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        <div className="relative px-6 md:px-12">
          <div className="relative mx-auto max-w-[1400px]">
            <div className="h-px w-full bg-white/15" />
          </div>
          <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-6 py-8 md:flex-row md:items-center">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40">
              © 2026 Any Things Solution
            </p>
            <div className="flex items-center gap-6">
              {['Twitter', 'LinkedIn', 'Instagram', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35 transition-colors hover:text-white"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
