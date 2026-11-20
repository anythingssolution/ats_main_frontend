import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Shield,
  Clock,
  Building,
  Mail,
  MapPin,
  ExternalLink,
  Lock,
  FileText,
  Cookie,
  UserCheck,
  Database,
  Eye,
  CheckCircle2,
} from 'lucide-react';
import { navigate } from '../lib/navigate';
import { applyPageSeo, restoreHomeSeo } from '../lib/seo';
import { ContactModal } from './ContactModal';

const SECTIONS = [
  { id: 'interpretation-and-definitions', label: '1. Interpretation & Definitions' },
  { id: 'collecting-and-using-your-personal-information', label: '2. Collecting & Using Your Information' },
  { id: 'types-of-data-collected', label: '2.1 Types of Data Collected', indent: true },
  { id: 'use-of-your-personal-data', label: '2.2 Use of Your Personal Data', indent: true },
  { id: 'retention-of-your-personal-data', label: '2.3 Retention of Data', indent: true },
  { id: 'transfer-of-your-personal-data', label: '2.4 Transfer of Data', indent: true },
  { id: 'delete-your-personal-data', label: '2.5 Delete Your Personal Data', indent: true },
  { id: 'disclosure-of-your-personal-data', label: '2.6 Disclosure of Data', indent: true },
  { id: 'security-of-your-personal-data', label: '2.7 Security of Data', indent: true },
  { id: 'detailed-information-on-the-processing-of-your-personal-data', label: '3. Processing & Analytics' },
  { id: 'children-s-and-minors-privacy', label: "4. Children's Privacy" },
  { id: 'links-to-other-websites', label: '5. Links to Other Websites' },
  { id: 'changes-to-this-privacy-policy', label: '6. Changes to this Policy' },
  { id: 'contact-us', label: '7. Contact Us' },
];

export const PrivacyPolicyPage: React.FC = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('interpretation-and-definitions');

  useEffect(() => {
    window.scrollTo(0, 0);

    applyPageSeo({
      title: 'Privacy Policy | Any Things Solution (ATS)',
      description:
        'This Privacy Policy describes Any Things Solution policies and procedures on the collection, use and disclosure of your information when you use our service.',
      url: 'https://anythingssolution.com/privacy-policy',
      keywords: 'privacy policy, Any Things Solution, data protection, cookies policy, GDPR, terms, ATS privacy',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Privacy Policy | Any Things Solution',
        url: 'https://anythingssolution.com/privacy-policy',
        description:
          'Privacy Policy of Any Things Solution detailing how personal data is collected, used, and protected.',
        publisher: {
          '@type': 'Organization',
          name: 'Any Things Solution',
          url: 'https://anythingssolution.com/',
        },
      },
    });

    return () => {
      restoreHomeSeo();
    };
  }, []);

  // Track active section for TOC highlighting on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-[#e0e0e0] selection:bg-brand selection:text-black">
      {/* Top Fixed Navigation Header */}
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 px-5 py-3 backdrop-blur-md md:px-10 md:py-3.5">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-7">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="shrink-0 cursor-pointer transition-opacity hover:opacity-80"
              aria-label="Any Things Solution home"
            >
              <img src="/nav-logo-light.png" alt="ATS Any Things Solution" className="h-9 w-auto md:h-11" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[0.16em] text-white/70 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>
          </div>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="flex items-center gap-2 rounded-full bg-white px-5 py-2.5 font-mono-custom text-xs font-bold uppercase tracking-widest text-black transition-all hover:scale-105 hover:bg-neutral-200 active:scale-95 cursor-pointer"
          >
            <span>CONTACT US</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </header>

      {/* Main Page Container */}
      <main className="mx-auto w-full max-w-[1400px] px-6 pb-24 pt-28 md:px-12 md:pb-32 md:pt-36">
        {/* Header Hero Banner */}
        <div className="border-b border-white/10 pb-10 md:pb-14">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[0.24em] text-brand">
              <Shield className="h-3 w-3" />
              Legal &amp; Trust
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/60">
              <Clock className="h-3 w-3 text-white/40" />
              Last updated: 19 November 2026
            </span>
          </div>

          <h1 className="mt-6 font-syne text-[clamp(2.5rem,6.5vw,5.5rem)] font-bold uppercase leading-[0.92] tracking-tight text-white">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-[54rem] text-[16px] md:text-[18px] leading-relaxed text-white/70">
            This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your
            information when You use the Service and tells You about Your privacy rights and how the law protects You.
          </p>

          <p className="mt-4 max-w-[54rem] text-[14px] md:text-[15px] leading-relaxed text-white/50">
            We use Your Personal Data to provide and improve the Service. We collect, use, and disclose Your information as
            described in this Privacy Policy and, where required by applicable law, only where We have a valid legal basis
            to do so, including Your consent (where consent is required).
          </p>

          {/* Key Facts Quick Grid */}
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.24em] text-brand">Entity</p>
              <p className="mt-1 font-syne text-sm font-semibold text-white">Any Things Solution (ATS)</p>
              <p className="mt-0.5 text-xs text-white/50">HN 66 unique paradise, Bhatagaon, Raipur, CG</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.24em] text-brand">Jurisdiction</p>
              <p className="mt-1 font-syne text-sm font-semibold text-white">Chhattisgarh, India</p>
              <p className="mt-0.5 text-xs text-white/50">Compliant with applicable digital data laws</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 backdrop-blur-sm">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.24em] text-brand">Direct Contact</p>
              <p className="mt-1 font-syne text-sm font-semibold text-white">anythingssolution@gmail.com</p>
              <p className="mt-0.5 text-xs text-white/50">Privacy, data inquiries &amp; deletion requests</p>
            </div>
          </div>
        </div>

        {/* Content Layout: Sticky TOC + Main Article */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                <FileText className="h-4 w-4 text-brand" />
                <h2 className="font-mono-custom text-xs font-bold uppercase tracking-[0.24em] text-white">
                  Table of Contents
                </h2>
              </div>

              <nav className="mt-4 flex max-h-[calc(100vh-220px)] flex-col gap-1 overflow-y-auto pr-1 text-xs">
                {SECTIONS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => scrollToSection(item.id)}
                      className={`cursor-pointer rounded-lg px-3 py-2 text-left font-mono-custom transition-all ${
                        item.indent ? 'pl-6 text-[11px]' : 'text-xs font-semibold'
                      } ${
                        isActive
                          ? 'bg-brand/15 text-brand font-bold border-l-2 border-brand'
                          : 'text-white/60 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </nav>

              <div className="mt-6 border-t border-white/10 pt-4">
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Have privacy questions?
                </p>
                <button
                  type="button"
                  onClick={() => setContactOpen(true)}
                  className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 py-2.5 font-mono-custom text-[11px] uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-black cursor-pointer"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>Reach Our Legal Team</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Full Privacy Content */}
          <div className="space-y-16 lg:col-span-8">
            {/* ============================================================ */}
            {/* SECTION 1 */}
            {/* ============================================================ */}
            <section id="interpretation-and-definitions" className="scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-[0.28em] text-brand">01</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-3 font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">
                1. Interpretation and Definitions
              </h2>

              <div className="mt-6 space-y-6 text-white/70">
                <div>
                  <h3 className="font-syne text-lg font-semibold text-white">Interpretation</h3>
                  <p className="mt-2 leading-relaxed">
                    The words whose initial letters are capitalised have meanings defined under the following conditions.
                    The following definitions shall have the same meaning regardless of whether they appear in singular or
                    in plural.
                  </p>
                </div>

                <div>
                  <h3 className="font-syne text-lg font-semibold text-white">Definitions</h3>
                  <p className="mt-2 leading-relaxed">For the purposes of this Privacy Policy:</p>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Account</p>
                      <p className="mt-1 text-sm text-white/70">
                        A unique account created for You to access Our Service or parts of Our Service.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Affiliate</p>
                      <p className="mt-1 text-sm text-white/70">
                        An entity that controls, is controlled by, or is under common control with a party (50%+ voting
                        interest).
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Company</p>
                      <p className="mt-1 text-sm text-white/70">
                        Refers to <strong className="text-white">anythingssolution</strong>, HN 66 unique paradise,
                        Bhatagaon, Raipur.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Cookies</p>
                      <p className="mt-1 text-sm text-white/70">
                        Small files placed on Your computer or mobile device containing browsing details and preferences.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Country / State</p>
                      <p className="mt-1 text-sm text-white/70">
                        Refers to: <strong className="text-white">Chhattisgarh, India</strong>.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Device</p>
                      <p className="mt-1 text-sm text-white/70">
                        Any device that can access the Service, such as a computer, mobile phone, or digital tablet.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:col-span-2">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Personal Data</p>
                      <p className="mt-1 text-sm text-white/70">
                        Any information that relates to an identified or identifiable individual. We use &ldquo;Personal Data&rdquo; and &ldquo;Personal Information&rdquo; interchangeably unless a law uses a specific term.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Service</p>
                      <p className="mt-1 text-sm text-white/70">Refers to the Website.</p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Service Provider</p>
                      <p className="mt-1 text-sm text-white/70">
                        Any natural or legal person who processes data on behalf of the Company.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Usage Data</p>
                      <p className="mt-1 text-sm text-white/70">
                        Data collected automatically from the Service infrastructure (e.g., page visit duration).
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">Website</p>
                      <p className="mt-1 text-sm text-white/70">
                        Refers to anythingssolution, accessible from{' '}
                        <a
                          href="https://anythingssolution.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="text-brand underline hover:text-white"
                        >
                          anythingssolution.com
                        </a>.
                      </p>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 sm:col-span-2">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">You</p>
                      <p className="mt-1 text-sm text-white/70">
                        The individual accessing or using the Service, or the company or legal entity on behalf of which
                        such individual is accessing or using the Service.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 2 */}
            {/* ============================================================ */}
            <section id="collecting-and-using-your-personal-information" className="scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-[0.28em] text-brand">02</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-3 font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">
                2. Collecting and Using Your Personal Information
              </h2>

              <div className="mt-8 space-y-10 text-white/70">
                {/* 2.1 */}
                <div id="types-of-data-collected" className="scroll-mt-28 space-y-6">
                  <h3 className="font-syne text-xl font-semibold text-white">2.1 Types of Data Collected</h3>

                  {/* 2.1.1 */}
                  <div id="personal-data" className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <h4 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">
                      2.1.1 Personal Data
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed">
                      While using Our Service, We may ask You to provide Us with certain personally identifiable information
                      that can be used to contact or identify You. Personally identifiable information may include, but is
                      not limited to:
                    </p>
                    <ul className="mt-3 space-y-1.5 pl-5 text-sm text-white">
                      <li className="list-disc">Email address</li>
                      <li className="list-disc">First name and last name</li>
                    </ul>
                  </div>

                  {/* 2.1.2 */}
                  <div id="usage-data" className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <h4 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">
                      2.1.2 Usage Data
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed">
                      Usage Data is collected automatically when using the Service.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">
                      Usage Data may include information such as Your Device&apos;s Internet Protocol address (e.g. IP
                      address), browser type, browser version, the pages of Our Service that You visit, the time and date of
                      Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">
                      When You access the Service by or through a mobile device, We may collect certain information
                      automatically, including, but not limited to, the type of mobile device You use, Your mobile
                      device&apos;s unique ID, the IP address of Your mobile device, Your mobile operating system, the type
                      of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed">
                      We may also collect information that Your browser sends whenever You visit Our Service or when You
                      access the Service by or through a mobile device.
                    </p>
                  </div>

                  {/* 2.1.3 */}
                  <div id="tracking-technologies-and-cookies" className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                    <h4 className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">
                      2.1.3 Tracking Technologies and Cookies
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed">
                      We use tracking technologies (such as cookies) to track the activity and to improve Our Service. The
                      technologies We use may include:
                    </p>

                    <div className="mt-4 space-y-3">
                      <div className="rounded-lg border border-white/10 bg-black/40 p-3.5">
                        <p className="text-sm font-semibold text-white">Cookies or Browser Cookies</p>
                        <p className="mt-1 text-xs text-white/60">
                          A cookie is a small file placed on Your Device. You can instruct Your browser to refuse all
                          Cookies or to indicate when a Cookie is being sent. However, if You do not accept Cookies, You may
                          not be able to use some parts of Our Service.
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-black/40 p-3.5">
                        <p className="text-sm font-semibold text-white">Web Beacons</p>
                        <p className="mt-1 text-xs text-white/60">
                          Certain sections of Our Service may contain small electronic files known as web beacons that permit
                          the Company to count users who have visited those pages and for other related statistics.
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-xs leading-relaxed text-white/60">
                      Cookies can be &ldquo;Persistent&rdquo; or &ldquo;Session&rdquo; Cookies. Persistent Cookies remain on
                      Your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon
                      as You close Your web browser.
                    </p>
                    <p className="mt-2 text-xs leading-relaxed text-white/60">
                      Where required by law, We use non-essential cookies only with Your consent. You can withdraw or change
                      Your consent at any time through Your browser/device settings.
                    </p>

                    <h5 className="mt-6 font-mono-custom text-[11px] uppercase tracking-wider text-white">
                      Cookie Categories We Use
                    </h5>

                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div className="rounded-lg border border-white/10 bg-black/40 p-3.5">
                        <span className="font-mono-custom text-[10px] uppercase text-brand">Type: Session</span>
                        <p className="mt-1 text-sm font-semibold text-white">Necessary / Essential Cookies</p>
                        <p className="mt-1 text-xs text-white/60">
                          Essential to provide services available through the Website, authenticate users, and prevent fraud.
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-black/40 p-3.5">
                        <span className="font-mono-custom text-[10px] uppercase text-brand">Type: Persistent</span>
                        <p className="mt-1 text-sm font-semibold text-white">Notice Acceptance Cookies</p>
                        <p className="mt-1 text-xs text-white/60">
                          Identify whether users have accepted cookies and record consent choices for future visits.
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-black/40 p-3.5">
                        <span className="font-mono-custom text-[10px] uppercase text-brand">Type: Persistent</span>
                        <p className="mt-1 text-sm font-semibold text-white">Functionality Cookies</p>
                        <p className="mt-1 text-xs text-white/60">
                          Remember choices You make (e.g. login details or language) to provide a personalised experience.
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/10 bg-black/40 p-3.5">
                        <span className="font-mono-custom text-[10px] uppercase text-brand">Type: Third Parties</span>
                        <p className="mt-1 text-sm font-semibold text-white">Analytics Cookies</p>
                        <p className="mt-1 text-xs text-white/60">
                          Collect information about traffic, pages visited, and time spent to evaluate and improve performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2.2 */}
                <div id="use-of-your-personal-data" className="scroll-mt-28 space-y-4">
                  <h3 className="font-syne text-xl font-semibold text-white">2.2 Use of Your Personal Data</h3>
                  <p className="leading-relaxed">The Company may use Personal Data for the following purposes:</p>

                  <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">To provide and maintain Our Service:</strong> including to monitor
                      the usage of Our Service.
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">To manage Your Account:</strong> manage Your registration and
                      functionalities available to registered users.
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">For performance of a contract:</strong> development, compliance, and
                      undertaking of purchase contracts.
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">To contact You:</strong> by email, phone, SMS, or equivalent electronic
                      communications regarding updates or security.
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">To provide offers &amp; news:</strong> information about similar goods,
                      services, and events until opted out.
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">To manage Your requests:</strong> attend and handle inquiries or
                      support submitted to Us.
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">For business transfers:</strong> evaluate or conduct mergers, asset sales,
                      or restructurings.
                    </li>
                    <li className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm">
                      <strong className="text-white">For analytics &amp; improvement:</strong> data analysis, usage trends, and
                      enhancing user experience.
                    </li>
                  </ul>

                  <p className="pt-2 font-mono-custom text-xs font-semibold uppercase tracking-wider text-white">
                    We may share Your Personal Data in the following situations:
                  </p>
                  <ul className="space-y-2 pl-5 text-sm text-white/70">
                    <li className="list-disc">
                      <strong className="text-white">With Service Providers:</strong> to monitor and analyse the use of Our
                      Service and to contact You.
                    </li>
                    <li className="list-disc">
                      <strong className="text-white">For business transfers:</strong> in connection with or during negotiations
                      of any merger or acquisition.
                    </li>
                    <li className="list-disc">
                      <strong className="text-white">With Affiliates:</strong> requiring affiliates to honour this Privacy
                      Policy.
                    </li>
                    <li className="list-disc">
                      <strong className="text-white">With other users:</strong> in public areas where information may be viewed
                      by all users.
                    </li>
                    <li className="list-disc">
                      <strong className="text-white">With Your consent:</strong> for any other purpose with Your explicit
                      agreement.
                    </li>
                  </ul>
                </div>

                {/* 2.3 */}
                <div id="retention-of-your-personal-data" className="scroll-mt-28 space-y-4">
                  <h3 className="font-syne text-xl font-semibold text-white">2.3 Retention of Your Personal Data</h3>
                  <p className="leading-relaxed">
                    The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in
                    this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with Our
                    legal obligations, resolve disputes, and enforce Our legal agreements and policies.
                  </p>

                  <div className="overflow-x-auto rounded-xl border border-white/10">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-white/5 font-mono-custom uppercase tracking-wider text-white/60">
                        <tr>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Scope</th>
                          <th className="p-3.5">Max Retention</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 text-white/70">
                        <tr>
                          <td className="p-3.5 font-semibold text-white">Account Information</td>
                          <td className="p-3.5">User profile &amp; credentials</td>
                          <td className="p-3.5">Duration of relationship + up to 24 months</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-semibold text-white">Customer Support</td>
                          <td className="p-3.5">Tickets, correspondence &amp; chat transcripts</td>
                          <td className="p-3.5">Up to 24 months from closure</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-semibold text-white">Usage Data &amp; Logs</td>
                          <td className="p-3.5">Analytics cookies, IP addresses &amp; server logs</td>
                          <td className="p-3.5">Up to 24 months</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-semibold text-white">Marketing Data</td>
                          <td className="p-3.5">Analytics identifiers &amp; engagement profiles</td>
                          <td className="p-3.5">Up to 24 months or until opt-out</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs leading-relaxed text-white/50">
                    When retention periods expire, Personal Data is deleted from Our active systems, purged from backup
                    schedules, or converted into anonymised statistical records.
                  </p>
                </div>

                {/* 2.4 */}
                <div id="transfer-of-your-personal-data" className="scroll-mt-28 space-y-3">
                  <h3 className="font-syne text-xl font-semibold text-white">2.4 Transfer of Your Personal Data</h3>
                  <p className="leading-relaxed">
                    Your information, including Personal Data, is processed at the Company&apos;s operating offices and in
                    any other places where the parties involved in the processing are located. This means that this
                    information may be transferred to — and maintained on — computers located outside of Your state,
                    province, country or other governmental jurisdiction where the data protection laws may differ.
                  </p>
                  <p className="leading-relaxed">
                    The Company will take all steps reasonably necessary to ensure that Your data is treated securely and in
                    accordance with this Privacy Policy with adequate controls in place.
                  </p>
                </div>

                {/* 2.5 */}
                <div id="delete-your-personal-data" className="scroll-mt-28 space-y-3">
                  <h3 className="font-syne text-xl font-semibold text-white">2.5 Delete Your Personal Data</h3>
                  <p className="leading-relaxed">
                    You have the right to delete or request that We assist in deleting the Personal Data that We have
                    collected about You.
                  </p>
                  <p className="leading-relaxed">
                    You may update, amend, or delete Your information at any time by signing in to Your Account, if You have
                    one, or by contacting Us directly at{' '}
                    <a href="mailto:anythingssolution@gmail.com" className="text-brand underline hover:text-white">
                      anythingssolution@gmail.com
                    </a>.
                  </p>
                  <p className="text-xs text-white/50">
                    Please note, however, that We may need to retain certain information when We have a legal obligation or
                    lawful basis to do so.
                  </p>
                </div>

                {/* 2.6 */}
                <div id="disclosure-of-your-personal-data" className="scroll-mt-28 space-y-4">
                  <h3 className="font-syne text-xl font-semibold text-white">2.6 Disclosure of Your Personal Data</h3>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div id="business-transactions" className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">
                        2.6.1 Business Transactions
                      </p>
                      <p className="mt-1 text-xs text-white/70">
                        If involved in a merger, acquisition or asset sale, Your Personal Data may be transferred with prior
                        notice.
                      </p>
                    </div>

                    <div id="law-enforcement" className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">
                        2.6.2 Law Enforcement
                      </p>
                      <p className="mt-1 text-xs text-white/70">
                        If required to do so by law or in response to valid requests by public authorities (e.g. courts or
                        agencies).
                      </p>
                    </div>

                    <div id="other-legal-requirements" className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="font-mono-custom text-xs font-bold uppercase tracking-wider text-brand">
                        2.6.3 Legal Requirements
                      </p>
                      <p className="mt-1 text-xs text-white/70">
                        To comply with legal obligations, protect Company rights, prevent wrongdoing, or defend liability.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2.7 */}
                <div id="security-of-your-personal-data" className="scroll-mt-28 space-y-3">
                  <h3 className="font-syne text-xl font-semibold text-white">2.7 Security of Your Personal Data</h3>
                  <p className="leading-relaxed">
                    The security of Your Personal Data is important to Us, but remember that no method of transmission over
                    the Internet, or method of electronic storage, is 100% secure. While We strive to use commercially
                    reasonable means to protect Your Personal Data, We cannot guarantee its absolute security.
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 3 */}
            {/* ============================================================ */}
            <section
              id="detailed-information-on-the-processing-of-your-personal-data"
              className="scroll-mt-28"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-[0.28em] text-brand">03</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-3 font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">
                3. Detailed Information on Processing
              </h2>

              <div className="mt-6 space-y-4 text-white/70">
                <p className="leading-relaxed">
                  The Service Providers We use may have access to Your Personal Data. These third-party vendors collect,
                  store, use, process and transfer information about Your activity on Our Service in accordance with their
                  Privacy Policies.
                </p>

                <div id="analytics" className="rounded-xl border border-white/10 bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-syne text-lg font-semibold text-white">3.1 Analytics &mdash; Google Analytics</h3>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 font-mono-custom text-[9px] uppercase tracking-wider text-brand">
                      Third-Party Provider
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-white/70">
                    Google Analytics is a web analytics service offered by Google that tracks and reports website traffic.
                    Google uses the data collected to track and monitor the use of Our Service. This data is shared with
                    other Google services. Google may use the collected data to contextualise and personalise the ads of its
                    own advertising network.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-white/70">
                    You can opt out of making Your activity on the Service available to Google Analytics by installing the
                    Google Analytics opt-out browser add-on. The add-on prevents the Google Analytics JavaScript (ga.js,
                    analytics.js and dc.js) from sharing information with Google Analytics about visit activity.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-mono-custom text-xs uppercase tracking-wider text-brand hover:text-white"
                    >
                      <span>Read Google&apos;s Privacy Policy</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 4 */}
            {/* ============================================================ */}
            <section id="children-s-and-minors-privacy" className="scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-[0.28em] text-brand">04</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-3 font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">
                4. Children&apos;s and Minors&apos; Privacy
              </h2>

              <div className="mt-6 space-y-3 text-white/70">
                <p className="leading-relaxed">
                  The Service is not directed to, and We do not knowingly collect Personal Information from, anyone under the
                  age of 16.
                </p>
                <p className="leading-relaxed">
                  If You are a parent or guardian and You believe Your child has provided Us with Personal Information,
                  please contact Us. If We become aware that We have collected Personal Information from anyone under the age
                  of 16, We will take steps to remove that information from Our servers as soon as reasonably possible.
                </p>
                <p className="leading-relaxed">
                  Some countries and states set a higher age at which an individual can consent to the processing of their
                  own Personal Information. Where We rely on consent as a legal basis and the law applicable to a User sets
                  an age higher than 16, We may require the consent of that User&apos;s parent or guardian before We
                  collect and use their Personal Information.
                </p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 5 */}
            {/* ============================================================ */}
            <section id="links-to-other-websites" className="scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-[0.28em] text-brand">05</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-3 font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">
                5. Links to Other Websites
              </h2>

              <div className="mt-6 space-y-3 text-white/70">
                <p className="leading-relaxed">
                  Our Service may contain links to other websites that are not operated by Us. If You click on a third-party
                  link, You will be directed to that third party&apos;s site. We strongly advise You to review the Privacy
                  Policy of every site You visit.
                </p>
                <p className="leading-relaxed">
                  We have no control over and assume no responsibility for the content, privacy policies or practices of any
                  third-party sites or services.
                </p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 6 */}
            {/* ============================================================ */}
            <section id="changes-to-this-privacy-policy" className="scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-[0.28em] text-brand">06</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-3 font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">
                6. Changes to this Privacy Policy
              </h2>

              <div className="mt-6 space-y-3 text-white/70">
                <p className="leading-relaxed">
                  We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new
                  Privacy Policy on this page.
                </p>
                <p className="leading-relaxed">
                  We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming
                  effective and update the &ldquo;Last updated&rdquo; date at the top of this Privacy Policy.
                </p>
                <p className="leading-relaxed">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy
                  are effective when they are posted on this page.
                </p>
              </div>
            </section>

            {/* ============================================================ */}
            {/* SECTION 7 */}
            {/* ============================================================ */}
            <section id="contact-us" className="scroll-mt-28">
              <div className="flex items-center gap-3">
                <span className="font-mono-custom text-xs font-bold uppercase tracking-[0.28em] text-brand">07</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h2 className="mt-3 font-syne text-2xl font-bold tracking-tight text-white md:text-3xl">
                7. Contact Us
              </h2>

              <div className="mt-6 rounded-2xl border border-brand/20 bg-gradient-to-br from-brand/10 via-white/[0.02] to-transparent p-6 md:p-8">
                <p className="text-white/80">
                  If You have any questions, clarifications, or requests regarding this Privacy Policy or Your Personal
                  Data, You can contact Us directly:
                </p>

                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="mailto:anythingssolution@gmail.com"
                    className="inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3 font-mono-custom text-xs font-bold uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95"
                  >
                    <Mail className="h-3.5 w-3.5" />
                    <span>anythingssolution@gmail.com</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className="inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono-custom text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black"
                  >
                    <span>Open Message Modal</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="mt-6 flex items-start gap-2.5 text-xs text-white/50">
                  <MapPin className="h-4 w-4 shrink-0 text-brand" />
                  <span>
                    Any Things Solution &mdash; HN 66 unique paradise, Bhatagaon, Raipur, Chhattisgarh, India
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Page Footer */}
      <footer className="border-t border-white/10 bg-black py-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 px-6 sm:flex-row md:px-12">
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40">
            &copy; 2026 Any Things Solution / All rights reserved
          </p>
          <div className="flex items-center gap-4 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/60">
            <span className="text-white">Privacy Policy</span>
            <span className="text-white/30">&middot;</span>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Back to Home
            </button>
          </div>
        </div>
      </footer>

      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
};
