import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowRight, ArrowUpRight, Mail, Phone, MapPin, Globe, Smartphone, BarChart3, Palette, Presentation, Bot } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

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
            end: 'bottom top',
            scrub: 0.5,
            pin: true,
            pinSpacing: false,
            snap: {
              // If user scrolls past 15% of the animation, snap to 100% (complete).
              // Otherwise snap back to 0% (start).
              snapTo: (progress: number) => (progress < 0.15 ? 0 : 1),
              duration: { min: 0.4, max: 0.8 },
              ease: 'power2.inOut',
            },
          },
        });

        // Shrink + move the entire letters wrapper
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
          // Make the capitals bolder as they shrink into the nav
          .to(
            '.hero-capital',
            {
              fontWeight: 600,
              ease: 'none',
            },
            0
          )
          // Phase 1: Smoothly fade out the lowercase text opacity first
          .to(
            '.hero-lowercase',
            {
              opacity: 0,
              duration: 0.3,
              ease: 'power1.out',
            },
            0
          )
          // Phase 2: Then collapse the structural space (width, scale, margin)
          .to(
            '.hero-lowercase',
            {
              scaleX: 0,
              width: 0,
              marginLeft: 0,
              duration: 0.7,
              ease: 'power2.inOut',
            },
            0.15
          )
          // Collapse the gaps between letter groups as lowercase disappears
          .to(
            lettersWrapper.querySelector('div'),
            {
              gap: '0.5rem',
              ease: 'none',
            },
            0
          )
          // Fade in header bg
          .to(
            header,
            {
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0,0,0,0.06)',
              ease: 'none',
            },
            0
          )
          // Fade out center header text
          .to(
            '.header-center-text',
            {
              opacity: 0,
              ease: 'none',
            },
            0
          )
          // Fade out hero footer
          .to(
            '.hero-secondary-ui',
            {
              opacity: 0,
              y: -20,
              ease: 'none',
            },
            0
          );
      }, containerRef);

      return () => ctx.revert();
    }, 600);

    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <div ref={containerRef} className="relative w-full bg-white text-[#111111] select-none font-sans">

      {/* FIXED HEADER */}
      <header
        ref={headerRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 overflow-visible"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Left: Nav links */}
        <nav className="secondary-ui hidden md:flex items-center gap-8">
          {['Services', 'About', 'Portfolio', 'Pricing'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="font-mono-custom text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 hover:text-black transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Center: Text (fades out) + invisible logo landing target */}
        <div className="relative flex items-center justify-center min-w-[120px] min-h-[40px]">
          <div className="header-center-text text-center font-mono-custom uppercase tracking-[0.15em] text-xs sm:text-sm font-medium leading-snug text-neutral-900">
            <div>ANY THINGS</div>
            <div>SOLUTION</div>
          </div>
          {/* Logo target — letters land here */}
          <div
            ref={headerLogoTargetRef}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            aria-hidden="true"
          />
        </div>

        {/* Right: Contact CTA */}
        <div className="secondary-ui">
          <button
            onClick={() => scrollToSection('contact')}
            className="flex items-center gap-2 bg-black hover:bg-neutral-800 text-white text-xs font-mono-custom uppercase font-bold tracking-widest px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
          >
            <span>CONTACT US</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      </header>

      {/* ============================================================ */}
      {/* FIXED LETTERS LAYER — sits on top of everything, GSAP moves it */}
      {/* ============================================================ */}
      <div
        ref={lettersWrapperRef}
        className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none will-change-transform"
      >
        <div className="flex items-baseline gap-8 sm:gap-16 md:gap-24 lg:gap-32">
          {/* "Any" */}
          <span className="hero-letter opacity-0 inline-flex items-baseline leading-none text-black select-none">
            <span className="hero-capital font-light text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] leading-none">
              A
            </span>
            <span className="hero-lowercase font-light text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] leading-none tracking-wide" style={{ marginLeft: '-0.05em', transformOrigin: 'left baseline' }}>
              ny
            </span>
          </span>
          {/* "Things" */}
          <span className="hero-letter opacity-0 inline-flex items-baseline leading-none text-black select-none">
            <span className="hero-capital font-light text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] leading-none">
              T
            </span>
            <span className="hero-lowercase font-light text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] leading-none tracking-wide" style={{ marginLeft: '-0.05em', transformOrigin: 'left baseline' }}>
              hings
            </span>
          </span>
          {/* "Solution" */}
          <span className="hero-letter opacity-0 inline-flex items-baseline leading-none text-black select-none">
            <span className="hero-capital font-light text-[6rem] sm:text-[8rem] md:text-[12rem] lg:text-[16rem] xl:text-[20rem] leading-none">
              S
            </span>
            <span className="hero-lowercase font-light text-[1.5rem] sm:text-[2rem] md:text-[3rem] lg:text-[4rem] xl:text-[5rem] leading-none tracking-wide" style={{ marginLeft: '-0.05em', transformOrigin: 'left baseline' }}>
              olution
            </span>
          </span>
        </div>
      </div>

      {/* HERO SECTION — 100vh trigger zone (scroll trigger area) */}
      <section
        ref={heroRef}
        className="relative h-screen w-full"
      >
        {/* Bottom scroll hint (fades out on scroll) */}
        <footer className="hero-secondary-ui absolute bottom-0 left-0 right-0 z-30 w-full max-w-[1920px] mx-auto px-6 md:px-12 pb-6 flex items-center justify-end">
          <button
            title="Scroll to explore"
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 text-neutral-800 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
          >
            <ArrowDown className="w-4 h-4" />
          </button>
        </footer>
      </section>

      {/* ============================================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================================ */}
      <section id="services" className="relative z-10 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="mb-16 md:mb-24">
            <p className="font-mono-custom text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
              WHAT WE DO
            </p>
            <h2 className="font-light text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-tight text-black max-w-[700px]">
              Digital Solutions That<br />Drive Growth
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: BarChart3,
                title: 'Digital Marketing',
                desc: 'Strategic SEO, social media campaigns, and performance marketing to amplify your brand reach and drive measurable ROI.',
                tag: 'GROWTH',
              },
              {
                icon: Bot,
                title: 'AI-Generated Ads',
                desc: 'Leverage cutting-edge AI to create high-converting ad creatives, copy, and campaigns at scale — faster than ever.',
                tag: 'AI POWERED',
              },
              {
                icon: Globe,
                title: 'Website Development',
                desc: 'Modern, responsive websites built with the latest technologies. From landing pages to full-stack web applications.',
                tag: 'WEB',
              },
              {
                icon: Smartphone,
                title: 'Mobile App Development',
                desc: 'Native and cross-platform iOS & Android applications with stunning UI, smooth performance, and scalable architecture.',
                tag: 'MOBILE',
              },
              {
                icon: Presentation,
                title: 'Presentation Design',
                desc: 'Pitch decks, corporate presentations, and investor materials designed to captivate your audience and close deals.',
                tag: 'DESIGN',
              },
              {
                icon: Palette,
                title: 'Branding & UI/UX',
                desc: 'Complete brand identity systems — logo design, visual guidelines, and user experience design that leaves lasting impressions.',
                tag: 'CREATIVE',
              },
            ].map((service, i) => {
              const Icon = service.icon;
              return (
                <div
                  key={i}
                  className="group relative p-8 rounded-2xl bg-white border border-neutral-200/80 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-black/0 via-black to-black/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-neutral-100 group-hover:bg-black transition-colors duration-300 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-neutral-700 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-neutral-400">
                      {service.tag}
                    </span>
                  </div>
                  <h3 className="text-lg font-medium text-black mb-3">
                    {service.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                  <div className="flex items-center gap-2 text-xs font-mono-custom uppercase tracking-widest text-neutral-400 group-hover:text-black transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* ABOUT SECTION */}
      {/* ============================================================ */}
      <section id="about" className="relative z-10 bg-white border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
            <div>
              <p className="font-mono-custom text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
                ABOUT US
              </p>
              <h2 className="font-light text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-tight text-black mb-8">
                We Build Digital<br />Experiences
              </h2>
              <p className="text-neutral-500 leading-relaxed mb-6 max-w-[500px]">
                Any Things Solution is a full-service digital agency specializing in transforming ideas into powerful digital products. From AI-driven marketing campaigns to custom mobile applications, we deliver end-to-end solutions that help startups and enterprises scale.
              </p>
              <p className="text-neutral-500 leading-relaxed mb-10 max-w-[500px]">
                Our team of designers, developers, and strategists work together to create experiences that are not just functional — but truly exceptional.
              </p>
              <button
                onClick={() => scrollToSection('contact')}
                className="flex items-center gap-3 bg-black hover:bg-neutral-800 text-white text-sm font-mono-custom uppercase font-bold tracking-widest px-8 py-3 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { stat: '150+', label: 'PROJECTS DELIVERED' },
                { stat: '50+', label: 'HAPPY CLIENTS' },
                { stat: '12+', label: 'TEAM MEMBERS' },
                { stat: '3+', label: 'YEARS EXPERIENCE' },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-8 rounded-2xl bg-neutral-50 border border-neutral-200/80 text-center hover:shadow-lg transition-all duration-300"
                >
                  <span className="font-light text-[2.5rem] md:text-[3rem] text-black leading-none block">
                    {item.stat}
                  </span>
                  <p className="font-mono-custom text-[10px] uppercase tracking-[0.3em] text-neutral-400 mt-3">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PORTFOLIO SECTION */}
      {/* ============================================================ */}
      <section id="portfolio" className="relative z-10 bg-neutral-50 border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="mb-16 md:mb-24">
            <p className="font-mono-custom text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
              OUR WORK
            </p>
            <h2 className="font-light text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-tight text-black max-w-[700px]">
              Selected Projects
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'E-Commerce Platform',
                category: 'Web Development',
                desc: 'Full-stack marketplace with AI-powered product recommendations, real-time analytics, and seamless payment integration.',
                tags: ['React', 'Node.js', 'AI'],
                gradient: 'from-violet-100 to-indigo-100',
              },
              {
                title: 'FinTech Mobile App',
                category: 'Mobile Development',
                desc: 'Cross-platform banking app with biometric auth, instant transfers, budget tracking, and investment portfolio management.',
                tags: ['React Native', 'Swift', 'Kotlin'],
                gradient: 'from-amber-100 to-orange-100',
              },
              {
                title: 'AI Ad Campaign Suite',
                category: 'AI & Marketing',
                desc: 'End-to-end AI-powered advertising platform that generates, tests, and optimizes creative assets across all channels.',
                tags: ['AI/ML', 'Python', 'Analytics'],
                gradient: 'from-emerald-100 to-teal-100',
              },
            ].map((project, i) => (
              <div
                key={i}
                className="group rounded-2xl overflow-hidden border border-neutral-200/80 bg-white hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}>
                  <span className="font-mono-custom text-xs uppercase tracking-[0.3em] text-neutral-500">
                    {project.category}
                  </span>
                </div>
                <div className="p-8">
                  <h3 className="text-lg font-medium text-black mb-3 group-hover:text-neutral-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-neutral-500 leading-relaxed mb-6">
                    {project.desc}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-neutral-100 text-[10px] font-mono-custom uppercase tracking-wider text-neutral-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* PRICING SECTION */}
      {/* ============================================================ */}
      <section id="pricing" className="relative z-10 bg-white border-t border-neutral-200">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="mb-16 md:mb-24 text-center">
            <p className="font-mono-custom text-xs uppercase tracking-[0.3em] text-neutral-400 mb-4">
              PRICING
            </p>
            <h2 className="font-light text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-tight text-black">
              Plans That Scale With You
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-[1000px] mx-auto">
            {[
              {
                name: 'Starter',
                price: '$499',
                period: '/project',
                desc: 'Perfect for small businesses and MVPs.',
                features: ['Landing Page Design', 'Basic SEO Setup', 'Social Media Kit', '2 Revision Rounds', 'Email Support'],
                highlight: false,
              },
              {
                name: 'Growth',
                price: '$1,499',
                period: '/month',
                desc: 'For growing startups that need momentum.',
                features: ['Full Website / App', 'AI Ad Campaigns', 'Monthly Analytics', 'Unlimited Revisions', 'Priority Support', 'Brand Strategy'],
                highlight: true,
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                period: '',
                desc: 'Tailored solutions for established businesses.',
                features: ['Dedicated Team', 'Custom AI Solutions', 'Multi-platform Apps', '24/7 Support', 'SLA Guarantee', 'Quarterly Reviews'],
                highlight: false,
              },
            ].map((plan, i) => (
              <div
                key={i}
                className={`relative p-8 rounded-2xl border transition-all duration-300 ${
                  plan.highlight
                    ? 'bg-black text-white border-black shadow-2xl scale-[1.02]'
                    : 'bg-white border-neutral-200/80 hover:border-neutral-300 hover:shadow-lg'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-black text-[10px] font-mono-custom uppercase tracking-[0.3em] rounded-full shadow-sm">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="font-mono-custom text-xs uppercase tracking-[0.3em] mb-6 opacity-60">
                  {plan.name}
                </h3>
                <div className="mb-2">
                  <span className="font-light text-[2.5rem] md:text-[3rem] leading-none">
                    {plan.price}
                  </span>
                  <span className={`text-sm ml-1 ${plan.highlight ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {plan.period}
                  </span>
                </div>
                <p className={`text-sm mb-8 ${plan.highlight ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  {plan.desc}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-sm flex items-center gap-2 ${plan.highlight ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      <span className={`w-1 h-1 rounded-full ${plan.highlight ? 'bg-white' : 'bg-black'}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full py-3 rounded-full text-xs font-mono-custom uppercase tracking-widest font-bold transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer ${
                    plan.highlight
                      ? 'bg-white text-black hover:bg-neutral-100'
                      : 'bg-black text-white hover:bg-neutral-800'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT SECTION */}
      {/* ============================================================ */}
      <section id="contact" className="relative z-10 bg-neutral-950 text-white border-t border-neutral-800">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 md:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            <div>
              <p className="font-mono-custom text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
                GET IN TOUCH
              </p>
              <h2 className="font-light text-[2rem] sm:text-[2.5rem] md:text-[3.5rem] leading-tight text-white mb-8">
                Let's Build Something<br />Amazing Together
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-12 max-w-[450px]">
                Have a project in mind? We'd love to hear about it. Reach out and let's turn your vision into reality.
              </p>

              <div className="space-y-6">
                <a href="mailto:hello@anythingssolution.com" className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-sm">hello@anythingssolution.com</span>
                </a>
                <a href="tel:+911234567890" className="flex items-center gap-4 text-neutral-300 hover:text-white transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 flex items-center justify-center transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="text-sm">+91 123 456 7890</span>
                </a>
                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-lg bg-neutral-800 flex items-center justify-center">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span className="text-sm">India</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="p-8 rounded-2xl bg-neutral-900 border border-neutral-800">
                <h3 className="text-lg font-medium text-white mb-6">Send us a message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors"
                  />
                  <textarea
                    placeholder="Tell us about your project..."
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-neutral-500 transition-colors resize-none"
                  />
                  <button className="w-full py-3 rounded-full bg-white text-black text-xs font-mono-custom uppercase tracking-widest font-bold hover:bg-neutral-200 transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-neutral-800">
          <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-mono-custom text-xs tracking-[0.2em] text-neutral-500 uppercase">
              © 2025 Any Things Solution. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Twitter', 'LinkedIn', 'Instagram', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-neutral-600 hover:text-white transition-colors cursor-pointer"
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
