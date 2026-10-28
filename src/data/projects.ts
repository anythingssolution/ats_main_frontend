export type ProjectFeature = {
  title: string;
  why: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  year: string;
  images: string[];
  /** Designed poster for the portfolio card. Falls back to images[0]. */
  cover?: string;
  imageAlts?: string[];
  client: string;
  services: string[];
  summary: string;
  body: string[];
  hindiName?: string;
  eyebrow?: string;
  liveUrl?: string;
  youtubeUrl?: string;
  youtubePlaylist?: string;
  supportEmail?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  problem?: string[];
  audienceFor?: string[];
  audienceNot?: string[];
  features?: ProjectFeature[];
  example?: { title: string; body: string };
  approach?: string[];
  stack?: { layer: string; choice: string }[];
  notBuilt?: { item: string; why: string }[];
  credit?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: 'krishi-udhar',
    title: 'Krishi Udhar',
    hindiName: 'कृषि उधार',
    subtitle: 'Product',
    year: '2026',
    eyebrow: 'Product by Anythingssolution (ATS)',
    images: [
      '/portfolio/kisankhata-01.png',
      '/portfolio/kisankhata-02.png',
      '/portfolio/kisankhata-03.png',
    ],
    cover: '/portfolio/krishi-udhar-cover.png',
    imageAlts: [
      'Krishi Udhar public site — billing and udhari software for agricultural shops, built by Anythingssolution (ATS)',
      'Krishi Udhar collections view — farmer dues in one khata, a product of Anythingssolution (ATS)',
      'Krishi Udhar onboarding steps — Hindi shop app designed and operated by Anythingssolution (ATS)',
    ],
    client: 'Anythingssolution (ATS)',
    services: ['Product design', 'Hindi shop app', 'Public site', 'Shop accounting'],
    liveUrl: 'https://krishiudhar.com',
    youtubeUrl: 'https://www.youtube.com/@krishiudhar',
    youtubePlaylist: 'https://www.youtube.com/playlist?list=PLAkYSS2p35g0',
    supportEmail: 'krishiudhar@gmail.com',
    seoTitle: 'Krishi Udhar (कृषि उधार) by ATS | Billing & Udhari for Agri Shops',
    seoDescription:
      'Anythingssolution (ATS) built Krishi Udhar, Hindi billing and udhari software for fertiliser and seed shops — bills, farmer dues, stock, purchases and returns in one shop account.',
    seoKeywords:
      'Krishi Udhar, कृषि उधार, Krishi Udhar ATS, Anythingssolution, Any Things Solution, agri billing software, fertiliser shop billing, seed shop udhari, agricultural input shop software, Hindi billing app, krishiudhar.com',
    summary:
      'Billing, farmer credit (udhari) and stock for small agricultural input shops. Hindi shop app, printed bills, collections, batches/expiry, dealer purchases and goods returns — built so a one-counter retailer can close the day knowing what sold, what cash came in, and who still owes. Currently free in beta at krishiudhar.com.',
    body: [
      'Krishi Udhar is Anythingssolution’s web product for fertiliser, seed and agri-input retailers. Village shops already sell on credit; the hard part is keeping each farmer’s running balance, today’s bill, and remaining stock in one place. Generic billing tools assume cash-and-carry. Krishi Udhar does not.',
      'The shopkeeper registers a dukaan, adds customers once, and makes Hindi bills on a phone: goods, amount received, amount still due. Old notebook dues attach to the same customer instead of being typed as fake new sales. Stock falls on sale and returns to sellable stock only when returned goods are actually fit to sell. Collections, payment promises, daily cash closing, dealer purchases and a manual WhatsApp reminder (the owner presses Send) follow the same khata.',
      'A sample shop and short Hindi video lessons sit on the public site so a retailer can practise before using real money. The beta is free; future pricing is not announced. It is shop accounting — not GST filing, not automatic messaging, not a loan product.',
    ],
    problem: [
      'A typical agri-input retailer sells urea, seed and crop-care goods every day. Farmers often pay only part of the bill. Later they return with some money, return a bag, or promise a date after harvest. The shop also buys from dealers, watches expiry and batch, and must know who still owes how much before closing at night.',
      'Paper copies split the truth: a new bill in one ledger, old village dues in another. Generic GST billing software assumes walk-in cash sales and an accountant. It does not start from “Ramesh already owes money; today he takes more and pays some.” Stock and credit stayed separate. Reminders were typed from memory, often with the wrong remaining amount.',
      'Success for the shopkeeper is simple. Before locking the shutter they can answer: how much sold today, how much cash came in, who still owes, and which goods are low or near expiry. That is shop accounting — not a loan app, not a collection agency, and not a GST filing service.',
    ],
    audienceFor: [
      'Small fertiliser, seed and agri-input / crop-care retailers',
      'One-counter shops where the owner runs billing themselves',
      'Hindi-first users; computer skill is not required',
      'Shops that already run udhari with farmers and want that khata digital',
      'Initial focus: Chhattisgarh, usable anywhere in India',
    ],
    audienceNot: [
      'Farmers taking loans from the app',
      'Multi-branch chains, staff roles, or barcode POS',
      'CA / GST return filing, e-invoice, or e-way bill',
      'Automatic or bulk WhatsApp sending',
      'Crop-treatment or medical advice',
    ],
    features: [
      {
        title: 'Hindi billing, print and WhatsApp share',
        why: 'Choose an existing customer, add goods, enter money actually received, save, print, or share the bill. This bill’s due is shown separately from the farmer’s earlier due — the moment at the counter cannot hide the khata.',
      },
      {
        title: 'One customer, one khata',
        why: 'Add a farmer once. Opening receivable is the old copy balance, not a fake sale. Bills, payments and returns sit on the same ledger so “Ramesh of village X” is never split across two names.',
      },
      {
        title: 'Vasooli, promises, daily cash',
        why: 'Who to collect from first, payment promises as reminders only, and evening cash closing against the drawer. A promise does not reduce the balance. Money changes only when a receipt is saved.',
      },
      {
        title: 'Stock with units, batch and expiry',
        why: 'Bags, kilograms and bottles are not mixed. A sale reduces sellable stock. Corrections need a reason. Expiry and batch matter in agri retail — this is not a generic SKU count.',
      },
      {
        title: 'Dealer purchase (kharid)',
        why: 'Supplier master, stock in, supplier due, pay the dealer, purchase return. If only sales are digital, purchase and stock drift and the owner stops using the app.',
      },
      {
        title: 'Goods return against the original bill',
        why: 'Qty limited to what was sold. Return first reduces customer due; leftover becomes customer credit. Cash refund is a separate entry. History is not deleted.',
      },
      {
        title: 'Manual WhatsApp due reminder',
        why: 'The app prepares a message with the current due. The shopkeeper checks number and permission, then presses Send in their own WhatsApp. Automatic bulk send was deliberately not built.',
      },
      {
        title: 'Sample shop and Hindi video lessons',
        why: 'A dummy shop opens in a separate tab so practice cannot touch a real account. Seven short how-to videos sit on the public site in Hindi, English and Hinglish.',
      },
    ],
    example: {
      title: 'This bill’s due is not the total due',
      body: 'Ramesh already owes ₹3,000 from the old copy. Today’s bill is ₹3,200; he pays ₹1,000. This bill still due is ₹2,200. His khata total is ₹5,200. Krishi Udhar keeps those two numbers visible so the counter never confuses a new parchi with the village running balance.',
    },
    approach: [
      'We did not start from GST software. We started from the moment a farmer pays part of a bill and already had money pending from last season.',
      'Hindi at the counter. The public site can be three languages; the working shop app stays Hindi until the shop is fluent.',
      'Record what happened: an opening copy balance is not a sale, a promise is not a payment, a reminder is not money in, a return is not a refund.',
      'Phone-first, fat taps, short labels. Weak-network drafts, idempotent money writes, and a reason on every important reversal.',
      'Beta honesty: free now, not a forever promise. ATS runs an operator admin for support — retailers never see that workspace.',
    ],
    stack: [
      { layer: 'Shop UI', choice: 'React 19 + Vite; Hindi billing screens on a phone or computer' },
      { layer: 'Public site', choice: 'Localized Hindi / English / Hinglish landing and task guides' },
      { layer: 'Real shops', choice: 'Backend API + PostgreSQL so ledgers are durable, not only localStorage' },
      { layer: 'Demo', choice: 'Sample shop in a separate tab with session storage so it cannot overwrite a real login' },
      { layer: 'Money writes', choice: 'Idempotency keys and per-action in-flight locks for rural double-taps' },
    ],
    notBuilt: [
      { item: 'WhatsApp Business API / bulk send', why: 'The shopkeeper must send; consent and the correct due come first.' },
      { item: 'Staff users and multi-branch', why: 'Current beta is one owner, one shop.' },
      { item: 'Barcode POS', why: 'Rural mix is named goods, not retail barcodes.' },
      { item: 'GSTR filing, e-invoice, e-way bill', why: 'Out of scope; claiming it would be a lie.' },
      { item: 'Crop advisory or lending', why: 'Khata is a record, not agronomy software and not a loan book.' },
    ],
    credit:
      'Krishi Udhar (कृषि उधार) is designed and operated by Anythingssolution (ATS). Shopkeepers use it at krishiudhar.com. For product help: krishiudhar@gmail.com. For company enquiries, use Anythingssolution’s contact channels.',
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
      'Random stand-in text. This card keeps the original portfolio reel while Krishi Udhar is the first real project.',
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

const PROJECT_ALIASES: Record<string, string> = {
  kisankhata: 'krishi-udhar',
};

export function resolveProjectSlug(slug: string) {
  return PROJECT_ALIASES[slug] ?? slug;
}

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === resolveProjectSlug(slug));
}
