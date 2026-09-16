export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  images: string[];
  client: string;
  services: string[];
  summary: string;
  body: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: 'kisankhata',
    title: 'KisanKhata',
    subtitle: 'Product',
    year: '2026',
    images: [
      '/portfolio/kisankhata-01.png',
      '/portfolio/kisankhata-02.png',
      '/portfolio/kisankhata-03.png',
    ],
    client: 'KisanKhata',
    services: ['Product design', 'Web app', 'Dashboard'],
    summary:
      'A digital khata for village shops — bills, udhari, and cash in one place. Placeholder copy until the real case study lands.',
    body: [
      'This is temporary project copy. KisanKhata is a ledger product for kirana and krishi shops: every sale, every pending payment, and a live view of who still owes money.',
      'The work covers a marketing site, onboarding, and the operational dashboard. Screens below are live captures from the product, shown as one project rather than three separate pieces.',
      'Replace this paragraph with the real brief, approach, and outcome when you send the details. For now it is only here so the case-study page has body text to sit against the screenshots.',
    ],
  },
  {
    slug: 'commerce-os',
    title: 'Commerce OS',
    subtitle: 'E-commerce',
    year: '2024',
    images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=70'],
    client: 'Placeholder',
    services: ['Product', 'Platform'],
    summary: 'Placeholder case study copy for Commerce OS until the real project details are added.',
    body: [
      'Random stand-in text. This card keeps the original portfolio reel while KisanKhata is the first real project.',
      'Swap this copy, client name, and screens when you send the actual work.',
    ],
  },
  {
    slug: 'shift-link',
    title: 'Shift Link',
    subtitle: 'Fintech app',
    year: '2024',
    images: ['https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1600&q=70'],
    client: 'Placeholder',
    services: ['App', 'Product'],
    summary: 'Placeholder case study copy for Shift Link until the real project details are added.',
    body: [
      'Random stand-in text so the detail page still opens from this card.',
      'Replace with the real brief when you have it.',
    ],
  },
  {
    slug: 'ai-ad-suite',
    title: 'AI Ad Suite',
    subtitle: 'Growth',
    year: '2025',
    images: ['https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1600&q=70'],
    client: 'Placeholder',
    services: ['AI', 'Growth'],
    summary: 'Placeholder case study copy for AI Ad Suite until the real project details are added.',
    body: [
      'Random stand-in text so the detail page still opens from this card.',
      'Replace with the real brief when you have it.',
    ],
  },
  {
    slug: 'nexus-cloud',
    title: 'Nexus Cloud',
    subtitle: 'Platform',
    year: '2025',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=70'],
    client: 'Placeholder',
    services: ['Platform', 'Cloud'],
    summary: 'Placeholder case study copy for Nexus Cloud until the real project details are added.',
    body: [
      'Random stand-in text so the detail page still opens from this card.',
      'Replace with the real brief when you have it.',
    ],
  },
  {
    slug: 'pulse-studio',
    title: 'Pulse Studio',
    subtitle: 'Branding',
    year: '2023',
    images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=70'],
    client: 'Placeholder',
    services: ['Branding', 'UI/UX'],
    summary: 'Placeholder case study copy for Pulse Studio until the real project details are added.',
    body: [
      'Random stand-in text so the detail page still opens from this card.',
      'Replace with the real brief when you have it.',
    ],
  },
  {
    slug: 'orbit-mobile',
    title: 'Orbit Mobile',
    subtitle: 'Product',
    year: '2024',
    images: ['https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1600&q=70'],
    client: 'Placeholder',
    services: ['Product', 'Mobile'],
    summary: 'Placeholder case study copy for Orbit Mobile until the real project details are added.',
    body: [
      'Random stand-in text so the detail page still opens from this card.',
      'Replace with the real brief when you have it.',
    ],
  },
];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
