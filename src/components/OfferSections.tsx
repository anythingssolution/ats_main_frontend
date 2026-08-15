import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Building2, Rocket, Store } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    n: '01',
    title: 'Discover',
    body: 'We sit with you and read the business from the surface — how you sell, where it leaks, what already works. No 80-page deck. A clear picture first.',
  },
  {
    n: '02',
    title: 'Strategy',
    body: 'Want to go deep? We go deep. Then we pick the path that saves time and money — the tech and the marketing you actually need, not a bloated stack.',
  },
  {
    n: '03',
    title: 'Build',
    body: 'Sites, apps, brand, product. One room of designers, developers, and strategists. The system that runs the business, not a pretty shell.',
  },
  {
    n: '04',
    title: 'Launch',
    body: 'Ads and films made with our tech — no camera crew, no studio day, no extra equipment. Ready to run, from the same team that built the product.',
  },
  {
    n: '05',
    title: 'Grow',
    body: 'Digital marketing from those ads, videos, and pages. Head to toe, ongoing. One partner from first conversation to the next shift.',
  },
];

const AUDIENCES = [
  {
    n: '01',
    icon: Rocket,
    title: 'Startups',
    line: 'We help you look real, launch fast, and spend only on what moves the needle.',
  },
  {
    n: '02',
    icon: Store,
    title: 'Local businesses',
    line: 'We help you get found, look current, and get customers without a big-agency bill.',
  },
  {
    n: '03',
    icon: Building2,
    title: 'Growing teams',
    line: 'We help you replace scattered vendors with one digital path — product, ads, growth.',
  },
];

export const OfferSections: React.FC = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const activeRef = useRef(0);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const method = root.querySelector<HTMLElement>('#method');
    if (!method) return;

    const steps = Array.from(method.querySelectorAll<HTMLElement>('[data-process-step]'));
    const gaps = Math.max(steps.length - 1, 1);

    const pick = () => {
      const mid = window.innerHeight * 0.48;
      let best = 0;
      let bestDist = Infinity;
      steps.forEach((step, i) => {
        const r = step.getBoundingClientRect();
        const cy = r.top + r.height / 2;
        const d = Math.abs(cy - mid);
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      if (best !== activeRef.current) {
        activeRef.current = best;
        setActiveStep(best);
      }
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: method,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: pick,
        onEnter: pick,
        onEnterBack: pick,
        onRefresh: pick,
      });

      ScrollTrigger.create({
        trigger: method,
        start: 'top top',
        end: 'bottom bottom',
        snap: {
          snapTo: 1 / gaps,
          directional: true,
          duration: { min: 0.28, max: 0.5 },
          delay: 0.02,
          ease: 'power3.inOut',
        },
      });
    }, root);

    pick();
    window.addEventListener('scroll', pick, { passive: true });
    requestAnimationFrame(() => {
      pick();
      ScrollTrigger.refresh();
    });

    return () => {
      window.removeEventListener('scroll', pick);
      ctx.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <section id="offer" className="relative z-10 bg-black text-white">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
          <p data-reveal className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45">
            03 — Offer
          </p>
          <div className="relative mb-12 md:mb-16">
            <div data-rule-line className="h-px w-full bg-white/20" />
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <h2
              data-reveal
              className="font-syne text-[clamp(2.8rem,8vw,6.2rem)] font-semibold leading-[0.92] tracking-tight lg:col-span-7"
            >
              Head to toe.
              <br />
              One partner.
            </h2>
            <div data-reveal className="flex flex-col justify-end lg:col-span-5">
              <p className="text-[15px] leading-relaxed text-white/55">
                We start at the table, not in a deck. We look at your business from the surface — and go deeper if you want. Then we choose the tech and the marketing that actually save you time and money.
              </p>
              <p className="mt-5 text-[15px] leading-relaxed text-white/55">
                Need a site, an app, a brand, ads, or the whole machine? We build it. Ads and videos can be made with our tech — no studio, no camera, no extra crew. From that same work we run the digital marketing. One team. Full path. Every kind of business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="audience" className="relative z-10 bg-[#F4F4F4] text-[#111111]">
        <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
          <p data-reveal className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-[#111111]/45">
            04 — Clients
          </p>
          <div className="relative mb-10">
            <div data-rule-line className="h-px w-full bg-[#111111]/20" />
          </div>
          <h2
            data-reveal
            className="mb-12 max-w-[18ch] font-syne text-[clamp(2.2rem,5.5vw,4.4rem)] font-semibold leading-[0.95] tracking-tight md:mb-16"
          >
            If you run a business, you&apos;re in scope.
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {AUDIENCES.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  data-service-card
                  className="group relative overflow-hidden border border-[#111111]/10 bg-white/50 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#111111]/25 hover:bg-white md:p-8"
                >
                  <div className="mb-10 flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center border border-[#111111]/15 bg-white text-[#111111] transition-colors duration-300 group-hover:border-[#111111] group-hover:bg-[#111111] group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#111111]/35">
                      ({item.n})
                    </span>
                  </div>
                  <h3 className="font-syne text-2xl font-semibold tracking-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-[#111111]/55">{item.line}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="method" className="relative z-10 bg-black text-white">
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 md:grid-cols-12">
          <div className="flex flex-col justify-center px-6 py-16 md:sticky md:top-0 md:col-span-5 md:h-screen md:px-12">
            <p className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45">
              05 — Method
            </p>
            <p className="font-syne text-[clamp(4.5rem,12vw,9rem)] font-semibold leading-none tracking-tight text-white/20">
              {STEPS[activeStep].n}
            </p>
            <h2 className="mt-4 font-syne text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[0.95] tracking-tight">
              How we work
            </h2>
            <p className="mt-3 font-syne text-2xl font-semibold tracking-tight text-white">
              {STEPS[activeStep].title}
            </p>
            <p className="mt-5 max-w-[22rem] text-[15px] leading-relaxed text-white/45">
              Startups buy a path, not a menu. Five steps. You can enter at any point — most start at the table.
            </p>
            <div className="mt-10 h-px w-full max-w-[16rem] bg-white/15">
              <div
                className="h-px bg-white transition-[width] duration-500 ease-out"
                style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="md:col-span-7 md:border-l md:border-white/10">
            {STEPS.map((step, i) => (
              <article
                key={step.title}
                data-process-step
                className="flex min-h-screen flex-col justify-center px-6 py-16 md:px-12"
              >
                <div
                  data-process-inner
                  className={`transition-[filter,transform] duration-500 ${
                    activeStep === i
                      ? 'translate-y-0 [filter:drop-shadow(0_0_34px_rgba(255,255,255,0.35))]'
                      : 'translate-y-1'
                  }`}
                >
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.32em] text-white/70">
                    Step {step.n}
                  </span>
                  <h3 className="mt-6 font-syne text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.92] tracking-tight text-white">
                    {step.title}
                  </h3>
                  <p className="mt-6 max-w-[32rem] text-[15px] leading-relaxed text-white/70">
                    {step.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const CASES = [
  {
    n: '01',
    title: 'Commerce OS',
    tag: 'Product + growth',
    problem: 'A retailer needed a store that could take orders and look like a brand — not a template.',
    did: 'We mapped the business, built the site, then launched ads made with our tech. No shoot. No extra crew.',
    result: 'Live in weeks, not quarters. One team from first call to paid traffic.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=70',
  },
  {
    n: '02',
    title: 'Shift Link',
    tag: 'App + brand',
    problem: 'A fintech idea with no product face — and no budget for a traditional production house.',
    did: 'Strategy first, then app UI and a brand system. Ads and motion from the same stack that designed the product.',
    result: 'A launch kit that felt complete: product, identity, and campaigns that could run the same week.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=70',
  },
  {
    n: '03',
    title: 'Local growth',
    tag: 'Ads + marketing',
    problem: 'A local business was spending on ads that did not look like them, shot with gear they did not own.',
    did: 'Surface analysis, then creatives built in-house with our tech. We ran the digital marketing from those same assets.',
    result: 'Head-to-toe coverage without a camera day — time and money stayed in the business.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=70',
  },
];

export const CaseStudiesSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-case-media]').forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: 'inset(0 28% 0 0)', scale: 1.08 },
          {
            clipPath: 'inset(0 0% 0 0)',
            scale: 1,
            ease: 'none',
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              end: 'top 32%',
              scrub: 0.8,
            },
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} id="work" className="relative z-10 bg-[#F4F4F4] text-[#111111]">
      <div className="mx-auto w-full max-w-[1400px] px-6 py-24 md:px-12 md:py-32">
        <p data-reveal className="mb-4 font-mono-custom text-[10px] uppercase tracking-[0.4em] text-[#111111]/45">
          06 — Work
        </p>
        <div className="relative mb-10">
          <div data-rule-line className="h-px w-full bg-[#111111]/20" />
        </div>
        <div className="mb-16 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
          <h2
            data-reveal
            className="max-w-[12ch] font-syne text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.95] tracking-tight"
          >
            Stories, not just cards.
          </h2>
          <p data-reveal className="max-w-[22rem] text-[15px] leading-relaxed text-[#111111]/50 md:text-right">
            The gallery above is the teaser. This is the path: problem, what we did, what it unlocked.
          </p>
        </div>

        <div className="space-y-20 md:space-y-28">
          {CASES.map((item, i) => (
            <article
              key={item.title}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14"
            >
              <div className={`overflow-hidden lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div data-case-media className="origin-center will-change-transform">
                  <img
                    src={item.image}
                    alt=""
                    className="aspect-[16/10] h-auto w-full object-cover"
                  />
                </div>
              </div>
              <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#111111]/40">
                  ({item.n}) {item.tag}
                </p>
                <h3 className="mt-4 font-syne text-[clamp(1.8rem,4vw,3rem)] font-semibold tracking-tight">
                  {item.title}
                </h3>
                <dl className="mt-8 space-y-5">
                  <div>
                    <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#111111]/40">
                      Problem
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-[#111111]/65">{item.problem}</dd>
                  </div>
                  <div>
                    <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#111111]/40">
                      What we did
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-[#111111]/65">{item.did}</dd>
                  </div>
                  <div>
                    <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#111111]/40">
                      Result
                    </dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-[#111111]/65">{item.result}</dd>
                  </div>
                </dl>
                <p className="mt-8 inline-flex items-center gap-2 font-mono-custom text-[10px] uppercase tracking-[0.28em] text-[#111111]/40">
                  Case {item.n}
                  <ArrowUpRight className="h-3 w-3" />
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
