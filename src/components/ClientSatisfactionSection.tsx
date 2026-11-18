import React, { useRef, useState } from 'react';
import { Star, ArrowUpRight, CheckCircle2, MapPin, User, Sparkles } from 'lucide-react';
import { navigate } from '../lib/navigate';

interface PersonTag {
  id: string;
  name: string;
  role: string;
  tag: string;
  x: number; // percentage from left
  y: number; // percentage from top (torso/chest to never block faces)
  zoneClass: string;
}

const PEOPLE_TAGS: PersonTag[] = [
  {
    id: 'left',
    name: 'Rahul Sahu',
    role: 'Co-Founder, ATS',
    tag: 'ATS Co-Founder',
    x: 23,
    y: 58,
    zoneClass: 'left-0 w-[35%]',
  },
  {
    id: 'center',
    name: 'Dr. Utkarsh Trivedi',
    role: 'Clinic Founder & B.H.M.S. Doctor',
    tag: 'Client Partner',
    x: 51,
    y: 52,
    zoneClass: 'left-[35%] w-[32%]',
  },
  {
    id: 'right',
    name: 'Deepesh Hial',
    role: 'Co-Founder, ATS',
    tag: 'ATS Co-Founder',
    x: 80,
    y: 58,
    zoneClass: 'left-[67%] w-[33%]',
  },
];

export const ClientSatisfactionSection: React.FC = () => {
  const rootRef = useRef<HTMLElement>(null);
  const [activePerson, setActivePerson] = useState<string | null>(null);

  return (
    <section
      ref={rootRef}
      id="clients"
      className="relative z-10 bg-white pt-10 pb-20 md:pt-14 md:pb-28 text-[#111111] scroll-mt-20 md:scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        {/* Section Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <p className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-[#111111]/45">
              VI — Client Satisfaction
            </p>
            <div className="flex items-center gap-2.5">
              <span className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                ))}
              </span>
              <span className="font-mono-custom text-[11px] uppercase tracking-[0.2em] text-[#111111]/55">
                4.9 / 5.0 (50+ Deployments)
              </span>
            </div>
          </div>

          <div className="relative my-5 md:my-6">
            <div className="h-px w-full bg-[#111111]/15" />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-8">
              <h2 className="font-syne text-[clamp(2.2rem,5vw,4.2rem)] font-semibold leading-[0.95] tracking-tight text-[#111111]">
                Built side-by-side.
                <br />
                <span className="italic font-normal text-[#111111]/80">Proven on the ground.</span>
              </h2>
            </div>
            <div className="lg:col-span-4 lg:mb-1">
              <p className="text-[14px] md:text-[15px] leading-relaxed text-[#111111]/60 lg:text-right">
                We do not build software from ivory towers. We sit with founders, doctors, and operators in their real environments — engineering software that eliminates bottlenecks and drives real growth.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================ */}
        {/* FULL-WIDTH FEATURED CLIENT CARD */}
        {/* ============================================================ */}
        <article className="group relative w-full overflow-hidden rounded-2xl border border-[#111111]/12 bg-[#F9F9F9] p-6 transition-all duration-500 hover:border-[#111111]/25 md:p-10">
          {/* Card Top Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#111111]/10 pb-5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/20 bg-emerald-50 px-3.5 py-1 font-mono-custom text-[10px] uppercase tracking-wider text-emerald-700">
                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                Verified Client & On-Site Deployment
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono-custom text-[10px] uppercase tracking-[0.24em] text-[#111111]/45">
                Healthcare ERP
              </span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                ))}
              </div>
            </div>
          </div>

          {/* Card Content Grid: Image (Left) + Testimonial & Details (Right) */}
          <div className="mt-7 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
            
            {/* Left: Interactive Client Photo with Hover Hotspots */}
            <div className="relative overflow-hidden rounded-xl border border-[#111111]/10 bg-black/5 lg:col-span-5 select-none">
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src="/dr-trivedi-client.jpeg"
                  alt="ATS with the client for Dr. Trivedi’s Homeopathy Clinic ERP project"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Subtle dark gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Hint badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1 font-mono-custom text-[9px] uppercase tracking-wider text-white/80 backdrop-blur-md border border-white/15 pointer-events-none">
                  <Sparkles className="h-2.5 w-2.5 text-white/70" />
                  <span>Hover people to identify</span>
                </div>

                {/* Bottom Location Label */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-md border border-white/15 bg-black/75 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-wider text-white backdrop-blur-md pointer-events-none">
                  <MapPin className="h-3 w-3 text-white/80" />
                  <span>Dr. Trivedi’s Homeopathy Clinic</span>
                </div>

                {/* Invisible Hover Zones over Left, Center, and Right People */}
                {PEOPLE_TAGS.map((person) => (
                  <div
                    key={`zone-${person.id}`}
                    className={`absolute top-0 bottom-0 z-20 cursor-pointer ${person.zoneClass}`}
                    onMouseEnter={() => setActivePerson(person.id)}
                    onMouseLeave={() => setActivePerson(null)}
                    onClick={() => setActivePerson(activePerson === person.id ? null : person.id)}
                    aria-label={`Show info for ${person.name}`}
                  />
                ))}

                {/* Hotspot Pins & Upward Tooltips */}
                {PEOPLE_TAGS.map((person) => {
                  const isHovered = activePerson === person.id;
                  return (
                    <div
                      key={person.id}
                      className="absolute z-30 transition-transform duration-300"
                      style={{ left: `${person.x}%`, top: `${person.y}%` }}
                    >
                      {/* Interactive Subtle Monochrome Pin (Positioned on torso/chest) */}
                      <button
                        type="button"
                        className="relative flex -translate-x-1/2 -translate-y-1/2 items-center justify-center cursor-pointer group"
                        onMouseEnter={() => setActivePerson(person.id)}
                        onMouseLeave={() => setActivePerson(null)}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActivePerson(activePerson === person.id ? null : person.id);
                        }}
                        aria-label={`Identify ${person.name}`}
                      >
                        {/* Soft Translucent Pulse Ring */}
                        <span
                          className={`absolute h-7 w-7 rounded-full bg-white/30 transition-all duration-300 ${
                            isHovered ? 'scale-125 opacity-70 animate-ping' : 'opacity-40 animate-pulse'
                          }`}
                        />
                        {/* Core Monochrome Pin */}
                        <span
                          className={`relative flex h-6 w-6 items-center justify-center rounded-full border shadow-md transition-all duration-300 ${
                            isHovered
                              ? 'scale-110 bg-white text-black border-white'
                              : 'bg-black/80 text-white border-white/50 backdrop-blur-sm'
                          }`}
                        >
                          <User className="h-3 w-3" strokeWidth={2} />
                        </span>
                      </button>

                      {/* Tooltip Card: Opens ABOVE the Pin to prevent bottom clipping */}
                      <div
                        className={`pointer-events-none absolute bottom-full left-1/2 z-40 mb-3 -translate-x-1/2 transition-all duration-250 ease-out ${
                          isHovered
                            ? 'opacity-100 scale-100 translate-y-0'
                            : 'opacity-0 scale-95 translate-y-2'
                        }`}
                        style={{ minWidth: '190px' }}
                      >
                        {/* Tooltip Bubble styled to match ATS minimalist theme */}
                        <div className="relative rounded-xl border border-white/20 bg-black/95 px-4 py-3 shadow-[0_12px_32px_rgba(0,0,0,0.6)] backdrop-blur-xl text-center">
                          <div className="relative z-10 space-y-1">
                            <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 font-mono-custom text-[8px] uppercase tracking-[0.2em] text-white/70 border border-white/15">
                              {person.tag}
                            </span>
                            <p className="font-syne text-[13px] font-semibold tracking-tight text-white">
                              {person.name}
                            </p>
                            <p className="font-mono-custom text-[9px] uppercase tracking-[0.2em] text-white/50">
                              {person.role}
                            </p>
                          </div>

                          {/* Arrow pointing DOWN to the pin */}
                          <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-white/20 bg-black/95" />
                        </div>
                      </div>

                    </div>
                  );
                })}

              </div>
            </div>

            {/* Right: Quote, Client Details & Actions */}
            <div className="flex flex-col justify-between space-y-7 lg:col-span-7">
              <blockquote className="font-syne text-[clamp(1.15rem,2vw,1.55rem)] font-normal leading-snug tracking-tight text-[#111111]">
                “Before ATS stepped in, our waiting room faced token bottlenecks and chaotic manual prescriptions. ATS came to our clinic, studied our exact consultation workflow, and engineered a real-time live TV queue and prescription system that completely transformed our daily practice.”
              </blockquote>

              {/* Client Profile & Case Study Button */}
              <div className="flex flex-col gap-4 border-t border-[#111111]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-syne text-xl font-semibold tracking-tight text-[#111111]">
                    Dr. Trivedi’s Homeopathy Clinic
                  </h3>
                  <p className="mt-1 font-mono-custom text-[11px] uppercase tracking-[0.2em] text-[#111111]/50">
                    Clinic Management ERP & Live TV Queue System
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => navigate('/work/homeopathy-clinic')}
                  className="inline-flex cursor-pointer items-center justify-center gap-2.5 self-start rounded-full bg-[#111111] px-6 py-3 font-mono-custom text-xs uppercase tracking-[0.24em] text-white shadow-sm transition-transform hover:scale-105 active:scale-95 sm:self-auto"
                >
                  <span>View Case Study</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Bottom Metric Pills */}
              <div className="grid grid-cols-3 gap-3 border-t border-[#111111]/10 pt-4 text-left">
                <div>
                  <p className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">&lt;100ms</p>
                  <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-wider text-[#111111]/45">WebSocket Live Queue</p>
                </div>
                <div className="border-l border-[#111111]/10 pl-3">
                  <p className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">4 Portals</p>
                  <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-wider text-[#111111]/45">Doc / Rec / Med / Patient</p>
                </div>
                <div className="border-l border-[#111111]/10 pl-3">
                  <p className="font-syne text-xl sm:text-2xl font-bold tracking-tight text-[#111111]">100%</p>
                  <p className="mt-1 font-mono-custom text-[9px] uppercase tracking-wider text-[#111111]/45">Zero Bottlenecks</p>
                </div>
              </div>

            </div>
          </div>
        </article>

      </div>
    </section>
  );
};
