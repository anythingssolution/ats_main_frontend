import React, { useState, useLayoutEffect, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight, Globe, Smartphone, BarChart3, Palette, Presentation, Bot, Facebook, Instagram, Github, Linkedin, Twitter } from 'lucide-react';
import { GridTransitionSection } from './GridTransitionSection';
import { FloatingImagesBackground } from './FloatingImagesBackground';
import { TiltPortfolioSection } from './TiltPortfolioSection';
import { CaseStudiesSection, OfferSections } from './OfferSections';
import { ContactModal } from './ContactModal';

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
          data-text={text}
          aria-hidden="true"
          className="absolute inset-0 block leading-none will-change-transform"
          style={{
            clipPath: `inset(${topClip}% 0 ${bottomClip}% 0)`,
            transform: `translateX(${dir * 16}vw)`,
          }}
        />
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
  const [contactOpen, setContactOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isLoading) return;
    const id = window.location.hash.replace('#', '');
    if (!id) return;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'auto' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [isLoading]);

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
        trigger: '#offer',
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
        trigger: '#method',
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
        const lettersRow = lettersWrapper.querySelector('div');
        if (!lettersRow) return;

        const rowRect = lettersRow.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        const targetRect = logoTarget.getBoundingClientRect();

        const rowCX = rowRect.left + rowRect.width / 2;
        const rowCY = rowRect.top + rowRect.height / 2;
        const targetCX = targetRect.left + targetRect.width / 2;
        const targetCY = headerRect.top + headerRect.height / 2;

        const isMobile = window.innerWidth < 768;
        const targetHeight = isMobile ? 18 : 26;
        const scaleFactor = targetHeight / rowRect.height;

        gsap.set(lettersRow, { transformOrigin: '50% 50%' });

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

        // Pack A T S together and dock them into the header bar
        tl.to(
          lettersRow,
          {
            x: targetCX - rowCX,
            y: targetCY - rowCY,
            scale: scaleFactor,
            width: 'auto',
            gap: isMobile ? '0.12em' : '0.14em',
            justifyContent: 'center',
            paddingLeft: 0,
            paddingRight: 0,
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
        className="fixed top-0 left-0 right-0 z-50 px-5 py-3 md:px-10 md:py-3.5 max-md:pt-6"
        style={{ backgroundColor: 'transparent', borderBottom: 'none', backdropFilter: 'none' }}
      >
        <div className="relative z-10 flex items-center justify-between gap-4">
          {/* Left: Logo + nav links */}
          <div className="secondary-ui z-10 flex min-w-0 items-center gap-4 lg:gap-7">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="shrink-0 cursor-pointer"
              aria-label="Any Things Solution home"
            >
              <img
                src={navOnDark ? '/nav-logo-light.png' : '/nav-logo.png'}
                alt="ATS Any Things Solution"
                className="h-9 w-auto md:h-11"
              />
            </button>
            <nav className="hidden min-w-0 items-center gap-4 lg:flex lg:gap-5 xl:gap-7">
              {['Services', 'Work', 'About', 'Portfolio'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`shrink-0 font-mono-custom text-[11px] uppercase tracking-[0.16em] font-medium transition-colors duration-300 cursor-pointer xl:text-xs xl:tracking-[0.2em] ${
                    navOnDark
                      ? 'text-white/70 hover:text-white'
                      : 'text-neutral-600 hover:text-black'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          {/* Center: tagline + dock target for the ATS letters */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-10 w-[7.5rem] -translate-x-1/2 -translate-y-1/2 items-center justify-center xl:w-[16rem]">
            <div
              className={`header-center-text hidden text-center font-mono-custom text-[10px] font-bold uppercase leading-tight tracking-[0.18em] transition-colors duration-300 2xl:block ${
                navOnDark ? 'text-white' : 'text-neutral-900'
              }`}
            >
              Your problems · Solved with tech
            </div>
            <div
              ref={headerLogoTargetRef}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              aria-hidden="true"
            />
          </div>

          {/* Right: Contact CTA — desktop only; hero uses bottom CTA on mobile */}
          <div className="secondary-ui z-10 ml-auto hidden shrink-0 md:block">
            <button
              onClick={() => setContactOpen(true)}
              className={`flex items-center gap-2 text-xs font-mono-custom uppercase font-bold tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                navOnDark
                  ? 'bg-white text-black hover:bg-neutral-200'
                  : 'bg-black text-white hover:bg-neutral-800 shadow-md'
              }`}
            >
              <span>CONTACT US</span>
              <ArrowUpRight className={`w-3.5 h-3.5 ${navOnDark ? 'text-black' : 'text-white'}`} />
            </button>
          </div>
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

        {/* Attract copy — H1 stays out of the fade layer so crawlers always see it */}
        <h1 className="pointer-events-none absolute left-0 right-0 top-24 z-[65] mx-auto max-w-[820px] px-6 text-center font-syne text-lg font-medium leading-[1.25] text-neutral-900 sm:text-xl md:top-28 md:px-12 md:text-2xl">
          Any Things Solution — a tech agency that solves business problems with technology
        </h1>
        <div className="hero-secondary-ui absolute inset-0 z-[65] pointer-events-none">
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
              onClick={() => setContactOpen(true)}
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
              II — Services
            </p>
            <div className="relative mb-10">
              <div data-rule-line className="h-px w-full bg-white/20" />
            </div>
            <h2 className="relative m-0 text-white">
              <span className="pointer-events-none absolute inset-0 z-0 font-syne text-[clamp(2.6rem,8vw,6.4rem)] font-semibold leading-[0.88] tracking-tight text-transparent">
                Digital solutions that grow
              </span>
              <span className="relative z-[1] block" aria-hidden="true">
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
              </span>
            </h2>
          </div>
        </div>

        <div className="px-6 pb-24 md:px-12 md:pb-32">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
            {[
              {
                icon: Globe,
                title: 'Software & Digital Products',
                desc: 'Custom software and digital products built to solve the business problem — not to add another tool to the stack.',
                tag: 'PRODUCT',
              },
              {
                icon: Smartphone,
                title: 'Mobile App Development',
                desc: 'Native and cross-platform iOS & Android product apps with sharp UI, smooth motion, and room to scale.',
                tag: 'MOBILE',
              },
              {
                icon: Bot,
                title: 'AI Solutions',
                desc: 'AI systems, automation, and creatives that shift work from people to software — directed by humans.',
                tag: 'AI POWERED',
              },
              {
                icon: BarChart3,
                title: 'Web Design & Development',
                desc: 'Modern sites and web apps from landing pages to full-stack products that load fast and convert.',
                tag: 'WEB',
              },
              {
                icon: Palette,
                title: 'Branding & UI/UX',
                desc: 'Identity systems and product UX so the technology feels inevitable to use.',
                tag: 'DESIGN',
              },
              {
                icon: Presentation,
                title: 'Growth Systems',
                desc: 'SEO, analytics, and campaigns run on the same tech that built the product — so growth is a system, not a vendor.',
                tag: 'GROWTH',
              },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <article
                  key={service.title}
                  data-service-card
                  className="group relative overflow-hidden border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08] md:p-8"
                >
                  <span className="absolute left-0 top-0 h-full w-[2px] origin-top scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100" />
                  <div className="mb-8 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
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

      <OfferSections />

      {/* ============================================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================================ */}
      <section ref={aboutRef} id="about" className="relative z-10 bg-[#F4F4F4] text-[#111111]">
        <div data-split-scrub className="relative px-5 pt-24 pb-6 md:px-10 md:pt-28 md:pb-8">
          <div className="relative">
            <p className="absolute right-0 top-1 z-10 hidden max-w-[14rem] text-right font-mono-custom text-[9px] uppercase leading-relaxed tracking-[0.22em] text-[#111111]/55 md:block">
              Any Things Solution creates digital paths for businesses &amp; people desiring a shift. Working worldwide.
            </p>

            <h2 className="relative m-0 text-[#111111]">
              <span className="pointer-events-none absolute inset-0 z-0 font-syne text-[clamp(3.8rem,16vw,12rem)] font-semibold leading-[0.88] tracking-tight text-transparent">
                About the shift we grow
              </span>
              <span className="relative z-[1] block" aria-hidden="true">
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
              </span>
            </h2>
          </div>

          <div className="relative mt-8 md:mt-10">
            <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-[#111111]/45">
              I — Concept
            </p>
            <div className="relative">
              <div data-rule-line className="h-px w-full bg-[#111111]/20" />
            </div>
          </div>
        </div>

        <div id="about-body" className="relative px-6 pb-16 pt-6 md:px-12 md:pb-20 md:pt-8">
          <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
            <h3 className="font-syne text-[clamp(2.4rem,6vw,5.5rem)] font-semibold leading-[0.95] tracking-tight text-[#111111] lg:col-span-8">
              We solve problems
              <br />
              with technology
              <br />
              so your business
              <br />
              can grow.
            </h3>

            <div className="flex flex-col justify-end lg:col-span-4 lg:pb-2">
              <p className="max-w-[34rem] text-[15px] leading-relaxed text-[#111111]/60 lg:ml-auto lg:text-right">
                Any Things Solution is a tech agency. Bring the problem — a product, a platform, an app, a system — and we solve it with technology, so startups and enterprises can grow instead of stitching vendors together.
              </p>
              <p className="mt-5 max-w-[34rem] text-[15px] leading-relaxed text-[#111111]/60 lg:ml-auto lg:text-right">
                Designers, developers, and strategists in one room. One shift at a time.
              </p>
              <button
                onClick={() => setContactOpen(true)}
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

      <CaseStudiesSection />

      <footer className="site-footer-grid relative z-10 overflow-x-hidden bg-black text-white">
        <div className="gts-film-grain pointer-events-none absolute inset-0" aria-hidden="true" />

        <div className="relative mx-auto w-full max-w-[1400px] px-6 pt-16 md:px-12 md:pt-20">
          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-6">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex cursor-pointer items-center lg:col-span-2"
              aria-label="Any Things Solution home"
            >
              <img
                src="/nav-logo-light.png"
                alt="ATS Any Things Solution"
                className="h-20 w-auto md:h-24"
              />
            </button>

            <nav className="flex flex-nowrap items-center gap-x-4 overflow-x-auto font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/70 sm:gap-x-5 sm:text-[11px] sm:tracking-[0.24em] lg:col-span-6 lg:justify-center">
              {[
                { label: 'Home', id: null },
                { label: 'Services', id: 'services' },
                { label: 'Work', id: 'work' },
                { label: 'About', id: 'about' },
                { label: 'Portfolio', id: 'portfolio' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    if (!item.id) window.scrollTo({ top: 0, behavior: 'smooth' });
                    else if (item.id === 'contact') setContactOpen(true);
                    else scrollToSection(item.id);
                  }}
                  className="shrink-0 cursor-pointer transition-colors hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <form
              className="lg:col-span-4 lg:justify-self-end lg:max-w-[22rem]"
              onSubmit={(e) => {
                e.preventDefault();
                setContactOpen(true);
              }}
            >
              <p className="font-syne text-xl font-semibold uppercase leading-[0.95] tracking-tight md:text-2xl">
                Have a
                <br />
                problem?
                <br />
                Let&apos;s talk
              </p>
              <label className="mt-6 flex items-center gap-2 rounded-full bg-white py-1.5 pl-5 pr-1.5">
                <span className="sr-only">Email to start a project</span>
                <input
                  type="email"
                  name="project-email"
                  autoComplete="email"
                  placeholder="YOUR EMAIL"
                  className="min-w-0 flex-1 bg-transparent font-mono-custom text-[11px] uppercase tracking-[0.22em] text-black placeholder:text-black/45 outline-none"
                />
                <button
                  type="submit"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-white transition-transform hover:scale-105"
                  aria-label="Send"
                >
                  <ArrowDown className="h-3.5 w-3.5" />
                </button>
              </label>
            </form>
          </div>
        </div>

        <div className="relative w-full px-4 py-10 md:px-6 md:py-14">
          <p className="site-footer-mark mx-auto w-full max-w-[100%] whitespace-nowrap text-center font-syne text-[clamp(1.25rem,7.1vw,8.6rem)] font-bold uppercase not-italic leading-none tracking-[-0.045em] text-white/90">
            Any Things Solution
          </p>
        </div>

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-col gap-6 px-6 pb-10 md:flex-row md:items-end md:justify-between md:px-12 md:pb-12">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40">
            © 2026 Any Things Solution / All rights reserved
          </p>
          <div className="flex flex-nowrap items-center gap-4 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40 md:text-center">
            <span>Privacy policy</span>
            <span className="underline decoration-white/30 underline-offset-4">Terms of use</span>
          </div>
          <div className="flex items-center gap-5">
            {[
              {
                name: 'Facebook',
                href: 'https://www.facebook.com/people/Ats-Ats/pfbid0sDNwNke59QjeXPTKnUM7RT6mVWtERfyhgTbRmudC1q3iiuyUrKyKKmpTKCHb7mbFl/',
                Icon: Facebook,
              },
              {
                name: 'Instagram',
                href: 'https://www.instagram.com/anythingssolution',
                Icon: Instagram,
              },
              {
                name: 'Twitter',
                href: 'https://x.com/AnythingsSol',
                Icon: Twitter,
              },
              {
                name: 'LinkedIn',
                href: 'https://www.linkedin.com/in/anythingssolution',
                Icon: Linkedin,
              },
              {
                name: 'GitHub',
                href: 'https://github.com/anythingssolution',
                Icon: Github,
              },
            ].map(({ name, href, Icon }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
                className="group relative text-brand transition-colors hover:text-white"
              >
                <Icon className="h-5 w-5 md:h-6 md:w-6" strokeWidth={1.75} />
                <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-sm bg-white px-2 py-1 font-mono-custom text-[9px] uppercase tracking-[0.18em] text-black opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                  {name}
                </span>
              </a>
            ))}
          </div>
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40 md:text-right">
            India · Working worldwide
          </p>
        </div>
      </footer>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

    </div>
  );
};
