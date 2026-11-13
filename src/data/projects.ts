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
    slug: 'homeopathy-clinic',
    title: 'Dr. Trivedi’s Homeopathy',
    hindiName: 'डॉ. त्रिवेदी होम्योपैथी',
    subtitle: 'Clinic ERP & Live Queue',
    year: '2026',
    eyebrow: 'Full-Stack Clinic ERP by Anythingssolution (ATS)',
    images: [
      '/portfolio/homeopathy-01-live-queue.png',
      '/portfolio/homeopathy-02-doctor-consult.png',
      '/portfolio/homeopathy-03-dispense.png',
      '/portfolio/homeopathy-04-login-roles.png',
      '/portfolio/homeopathy-05-analytics.png',
    ],
    cover: '/portfolio/homeopathy-cover.png',
    imageAlts: [
      'Live Queue and real-time TV token display for Dr. Trivedi’s Homeopathy Clinic by ATS',
      'Doctor consultation portal with Hindi and English numeric prescription drafting',
      'Pharmacy and dispensary dispensing counter with morning/afternoon/evening dosage and payment split',
      'Multi-role login system featuring Doctor, Receptionist, Medical Dispensary, and Patient OTP portals',
      'Reports Next analytics dashboard with revenue metrics and patient appointment trends',
    ],
    client: 'Dr. Trivedi’s Homeopathy Clinic',
    services: [
      'Full-stack Clinic ERP',
      'Socket.IO Real-time Live Queue',
      'Multi-role Portals (DOC / REC / MED / Patient)',
      'Hindi/English Rx Engine',
      'Dispensary Billing & Payments',
    ],
    liveUrl: 'https://drtrivedishomeopathy.in',
    supportEmail: 'support@drtrivedishomeopathy.in',
    seoTitle: 'Dr. Trivedi’s Homeopathy Clinic ERP & Real-Time Live Queue | Built by ATS',
    seoDescription:
      'Anythingssolution (ATS) engineered a comprehensive clinic ERP for Dr. Trivedi’s Homeopathy Clinic — featuring role-based portals (Doctor, Reception, Medical), live TV queue displays via WebSockets, Hindi numeric prescription drafting, and integrated dispensary billing.',
    seoKeywords:
      'Dr Trivedi Homeopathy, Homeopathy Clinic ERP, Live Queue Hospital, Clinic Management Software, Doctor Prescription Software, Hindi Homeopathy Rx, Anythingssolution ATS',
    summary:
      'Full-stack clinic operating system and real-time live queue platform engineered for multi-branch homeopathic clinics. Includes dedicated role-based portals for Doctors, Receptionists, and Medical Dispensaries, combined with patient OTP self-service booking, Hindi/English numeric prescription drafting, WebSocket live TV token boards, and split billing.',
    body: [
      'Dr. Trivedi’s Homeopathy Clinic required a specialized healthcare operating system aligned with real-world clinical workflows. Traditional clinic software treats appointments as static schedules and fails to handle walk-ins, dynamic morning/evening token shifts, or homeopathic dosage terminology. ATS designed and deployed an end-to-end multi-role web platform and standalone TV queue engine.',
      'The platform eliminates waiting room congestion through a sub-second WebSocket live queue that synchronizes tokens across reception check-ins, doctor consulting rooms, pharmacy dispensing counters, and public waiting-room TV displays. Doctors draft complex homeopathic prescriptions using customized numeric power syntax (e.g., 12[14], q/cm/m) with dual Hindi/English instructions. The dispensary handles morning/afternoon/evening doses, partial payments, and split payment methods.',
      'Secure authentication isolates access across four distinct login types: Doctor (DOC), Receptionist (REC), Pharmacy/Dispensary (MED), and Patient OTP self-service, ensuring data confidentiality, branch-specific isolation, and zero-friction patient access without password barriers.',
    ],
    problem: [
      'Busy outpatient clinics face bottlenecks across three friction points: reception queues, consulting room handoffs, and pharmacy dispensing. Standard hospital ERPs are bloated, slow on mobile, and force English-only medical terminology.',
      'Patients had no visibility into real waiting times, leading to reception crowding. Doctors spent valuable consultation time typing repetitive prescription notes. Pharmacy counters struggled to track partial balances (udhari), split cash/UPI payments, and multi-week dosage durations.',
      'Success meant a unified, real-time operating flow: from instant token generation and family-member booking at reception, to fast Hindi prescription drafting in the clinic, to live TV queue calling with sound chimes, and instant dispensary clearance.',
    ],
    audienceFor: [
      'Single and multi-branch homeopathic clinics and medical practices',
      'Clinics requiring live waiting-room TV displays with audio chimes',
      'Doctors needing fast, standardized homeopathic power/dosage drafting in Hindi and English',
      'Reception and dispensary staff managing token queues, family bookings, and split billing',
    ],
    audienceNot: [
      'Generic retail pharmacy POS systems without clinic integration',
      'Third-party telemedicine aggregators',
      'Unverified walk-in public access to internal medical records',
    ],
    features: [
      {
        title: 'Multi-Role Login & Portal Architecture',
        why: 'Four specialized authentication flows: Doctor Portal (consultations, clinical history, leaves, earnings), Receptionist Portal (token generation, booking, check-in, fee collection), Medical/Pharmacy Portal (dispensing queue, stock, partial payment dues), and Patient OTP Portal (mobile booking, family profiles, digital invoices).',
      },
      {
        title: 'Real-Time Live Queue & Smart TV Display',
        why: 'Socket.IO powered token synchronization connecting reception, consulting rooms, dispensary, and waiting-room TV screens (/live-queue-flow-2). Includes 3-second audio chime announcements, M/E slot conventions, bounded early arrivals, and reconnect resilience.',
      },
      {
        title: 'Homeopathic Numeric Rx & Hindi Dosage Engine',
        why: 'Engineered specifically for homeopathic practice: supports power syntax (e.g. 12[14], q/cm/m), mother tinctures, biochemic salts, drops/pills instructions in Hindi, and single-click repeat treatment on follow-up visits.',
      },
      {
        title: 'Family Member / Dependent Booking',
        why: 'A single verified mobile number can manage and schedule appointments for up to 5 family members without separate accounts or credential friction.',
      },
      {
        title: 'Dispensary Billing & Multi-Mode Reconciliation',
        why: 'Supports Morning/Afternoon/Evening packaging, cash + online split payments with UTR transaction references, partial payments (udhari tracking), and print-ready digital invoices.',
      },
      {
        title: 'Reports Next Clinic Analytics',
        why: 'Doctor-centric revenue dashboards, appointment fulfillment metrics, common diagnosis heatmaps, patient visit timelines, and exportable financial summaries.',
      },
      {
        title: 'Branch-Specific Access & Leave Scheduling',
        why: 'Multi-branch clinic support allowing doctors and staff to toggle active locations while automatically enforcing doctor leave calendars to prevent double-booking.',
      },
    ],
    example: {
      title: 'Instant Token Shift & Live Queue Synchronization',
      body: 'When a patient checks in at reception, their token (e.g. M-04) instantly appears on the doctor dashboard and public waiting-room TV. When the doctor clicks "Call Patient", a 3-second announcement chime sounds on the TV screen. Once consultation is saved, the prescription immediately routes to the pharmacy dispensary queue.',
    },
    approach: [
      'Role-first architecture: each portal (Doctor, Reception, Pharmacy, Patient) has an interface tailored strictly to its operational tempo without visual clutter.',
      'Sub-second live queue: WebSockets with automatic fallback polling ensure displays stay current even over unstable clinic Wi-Fi.',
      'Prescription speed: numeric power syntax and instant Hindi dosage templates reduce consultation documentation time by over 60%.',
      'Full financial durability: every partial payment, split cash/UPI entry, and repeat bill is audited in a relational schema with transaction isolation.',
    ],
    stack: [
      { layer: 'Frontend', choice: 'React 19 + TypeScript + Vite + Tailwind CSS with Lucide motion icons' },
      { layer: 'TV Queue', choice: 'Standalone TV display build with legacy browser polyfills (Chrome 64+, Safari 12+) and scoped CSS' },
      { layer: 'Real-time', choice: 'Socket.IO client/server event mesh for instant cross-portal queue updates' },
      { layer: 'Backend', choice: 'Node.js + Express with modular v1 REST API and connection-pooled MySQL' },
      { layer: 'Auth & Security', choice: 'Role-based JWT authorization, OTP verification, rate limiting, and token blacklisting on logout' },
    ],
    notBuilt: [
      { item: 'Third-party tele-consultation video streaming', why: 'The clinic operates on focused in-person and direct clinic follow-ups.' },
      { item: 'Automated bulk SMS promotions', why: 'Prioritizes patient privacy and clinic relationship over spam marketing.' },
    ],
    credit:
      'Dr. Trivedi’s Homeopathy Clinic ERP is designed, engineered, and maintained by Anythingssolution (ATS). Live at drtrivedishomeopathy.in.',
  },
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
    slug: 'mathur-cineplex',
    title: 'Mathur Cineplex',
    hindiName: 'माथुर सिनेप्लेक्स',
    subtitle: 'Cinema ERP & Box Office',
    year: '2026',
    eyebrow: 'In-Premise Cinema ERP by Anythingssolution (ATS)',
    images: [
      '/portfolio/mathur-01-counter.png',
      '/portfolio/mathur-02-ticket.png',
      '/portfolio/mathur-03-admin-dashboard.png',
      '/portfolio/mathur-04-schedule.png',
      '/portfolio/mathur-05-pricing-tax.png',
      '/portfolio/mathur-06-reports.png',
    ],
    cover: '/portfolio/mathur-cineplex-cover.png',
    imageAlts: [
      'Interactive visual seat map and counter booking screen for Mathur Cineplex across Recliner, Gold, Silver, and Lower classes',
      '80mm thermal printed cinema ticket receipt with GST breakdown and barcode verification',
      'Hall Admin control dashboard showing daily box office collections, show occupancy, and seat controls',
      'Movie schedule management with language tracking, show times, and certification rules',
      'Dynamic ticket pricing engine with show-by-show overrides and GST tax configuration',
      'Daily ticket sales register, staff performance tracking, and shift reconciliation reports',
    ],
    client: 'Mathur Cineplex (Dalli Rajhara, Chhattisgarh)',
    services: [
      'In-Premise Cinema ERP',
      'Interactive Visual Seat Map',
      'Dual-Role Portals (Counter / Admin)',
      '80mm Thermal Receipt Printing',
      'Zero-Internet Air-Gapped Windows Daemon',
      'Dynamic Pricing & GST Tax Slabs',
    ],
    supportEmail: 'contact@anythingssolution.com',
    seoTitle: 'Mathur Cineplex In-Premise Cinema ERP & Box Office Ticketing | Built by ATS',
    seoDescription:
      'Anythingssolution (ATS) engineered an air-gapped, zero-cloud dependency cinema ERP for Mathur Cineplex (Dalli Rajhara) — featuring interactive visual seat booking, 80mm thermal ticket printing, movie schedule management, and automated Windows boot release.',
    seoKeywords:
      'Mathur Cineplex, Cinema ERP, Box Office Software, Cinema Ticketing Software, Offline Theatre POS, 80mm Thermal Ticket Print, Cinema Seat Map, Anythingssolution ATS',
    summary:
      'Air-gapped, zero-cloud dependency cinema operating system and box office ticketing engine engineered for Mathur Cineplex in Dalli Rajhara, Chhattisgarh. Packaged for 100% offline on-premise Windows deployment with automated background daemon boot, visual multi-class seat mapping (Recliner, Gold, Silver, Lower), instant 80mm thermal receipt printing, role-isolated Counter & Admin portals, and automated daily GST reconciliation.',
    body: [
      'Mathur Cineplex required a robust, mission-critical cinema management system tailored specifically for single-screen and multiplex hall operations. Regional cinema theatres face unpredictable internet connectivity; relying on cloud SaaS platforms risks counter paralysis during peak showtime rushes. ATS architected an air-gapped, on-premise release deployed directly onto the hall counter machine (D:\\code\\Mathur Cineplex\\release).',
      'The system operates 100% offline with zero cloud dependency. A self-contained Windows service starts automatically upon PC boot, orchestrating local Next.js frontend rendering, Express backend logic, and embedded MySQL relational persistence. Even during sudden power cuts or network failures, the counter PC boots straight into the ready-to-sell interface without manual terminal commands or internet handshakes.',
      'Front-desk staff navigate an interactive, color-coded visual seat map across four pricing tiers (Recliner V, Gold G–O, Silver D–F, and Lower A–C). Concurrency locking guarantees seats cannot be double-sold. Upon confirmation, the system triggers instant 80mm thermal receipt printing with itemized net rates, CGST/SGST tax slabs, service charges, and unique booking IDs for door validation.',
    ],
    problem: [
      'Commercial cinema POS software typically imposes continuous monthly cloud subscriptions, takes commission cuts per ticket sold, and stops functioning entirely when broadband drops out.',
      'Counter staff need to issue tickets in seconds under high walk-in pressure. Manual paper tickets or clunky generic accounting software lead to queue congestion, duplicate seat allocations, and tedious manual cash reconciliations at the end of every night.',
      'The hall manager needed complete back-office authority: defining movie titles, audio languages, and certificates; scheduling shows across a rolling 7-day calendar; locking broken or reserved seats; applying peak/matinee pricing overrides; and exporting automated GST and cashier shift audit reports.',
    ],
    audienceFor: [
      'Single-screen, twin-screen, and regional multiplex cinema halls',
      'Venues demanding 100% offline operational resilience with zero cloud reliance',
      'Ticket counter staff requiring fast visual seat selection and instant 80mm thermal printing',
      'Hall managers needing audit logs, shift reconciliations, and automated GST tax accounting',
    ],
    audienceNot: [
      'Third-party online cinema booking aggregators (BookMyShow / Paytm)',
      'Multi-national 50-multiplex chains requiring centralized cross-city cloud sync',
      'Cashless-only digital kiosks without thermal hardware support',
    ],
    features: [
      {
        title: 'Zero-Internet Air-Gapped Packaging & Auto-Start Daemon',
        why: 'Packaged as a standalone Windows release with automated background launchers (install.bat, launcher.mjs). Runs entirely on the local counter PC with embedded MySQL, auto-starting on Windows boot with zero external internet required.',
      },
      {
        title: 'Interactive Visual Seat Map & Concurrency Protection',
        why: 'Color-coded real-time seat layout showing available, selected, booked, and maintenance-disabled seats across Recliner, Gold, Silver, and Lower classes. Built-in concurrency locking prevents simultaneous counters from double-selling the same seat.',
      },
      {
        title: '80mm Thermal Receipt Printing & GST Breakdown',
        why: 'Single-click generation of standardized 80mm thermal cinema tickets formatted for ESC/POS hardware, complete with movie name, screen, show date/time, seat numbers, net ticket rate, CGST, SGST, service charges, and unique booking reference.',
      },
      {
        title: 'Dual-Role Portal Security (Counter vs Hall Admin)',
        why: 'Strict separation between the rapid-fire Ticket Counter portal (seat selection, guest phone, issue ticket) and the Hall Admin portal (movie database, show schedules, seat layout toggles, pricing rules, and logs).',
      },
      {
        title: 'Dynamic Pricing Engine & Showtime Overrides',
        why: 'Enables base pricing per seat class with dynamic overrides for specific movies, premier dates, or matinee/night show slots, alongside automated GST tax computation.',
      },
      {
        title: 'Shift Reconciliation & Audit Activity Logs',
        why: 'Comprehensive ticket registers, staff collection summaries, show occupancy analytics, and tamper-resistant audit logs tracking every ticket created, printed, or canceled.',
      },
    ],
    example: {
      title: 'Peak Rush Ticket Issuance & Instant Shift Closing',
      body: 'During an evening premiere rush, the counter operator selects the show, clicks two Gold seats (M4, M5) on the visual seat map, enters the guest mobile number, and hits "Issue Ticket". Within 800ms, the 80mm thermal printer dispenses the official tax receipt, marking the seats as booked across the system. At closing, the admin dashboard compiles the day’s collection, tax breakdown, and cashier totals with one click.',
    },
    approach: [
      'Air-gapped reliability: all dependencies, database engines, and runtime assets are bundled locally on the hall PC to ensure uninterrupted operation regardless of network status.',
      'Sub-second counter UI: streamlined 1-screen booking flow minimizing mouse travel and clicks so cashiers can process walk-in queues in seconds.',
      'Relational transactional integrity: ACID transaction locks in MySQL prevent race conditions and double-booking errors even during high-concurrency counter demands.',
      'Turnkey handover: packaged with install scripts, auto-start registry hooks, database migration scripts, and illustrated client handover guides.',
    ],
    stack: [
      { layer: 'Frontend', choice: 'Next.js 14 + React 19 + TypeScript + Tailwind CSS with dark cinema theme' },
      { layer: 'Backend', choice: 'Node.js + Express + custom migration runner (server.cjs, migrate.cjs)' },
      { layer: 'Database', choice: 'Local MySQL (mathur_cineplex) with relational seat & ticket schemas' },
      { layer: 'Deployment', choice: 'Air-gapped Windows release (D:\\code\\Mathur Cineplex\\release) with background daemon & auto-start on boot' },
      { layer: 'Hardware', choice: '80mm Thermal Receipt Printer integration (ESC/POS compatible) & desktop shortcut launcher' },
    ],
    notBuilt: [
      { item: 'Third-party cloud online web booking', why: 'The cinema operates purely as an in-premise box office counter system.' },
      { item: 'Cloud telemetry & remote tracking', why: 'Guarantees 100% data privacy and zero dependence on external servers.' },
    ],
    credit:
      'Mathur Cineplex In-Premise Cinema ERP is designed, engineered, and packaged for on-premise hall deployment by Anythingssolution (ATS). Operating on-premise in Dalli Rajhara, Chhattisgarh.',
  },
];

const PROJECT_ALIASES: Record<string, string> = {
  kisankhata: 'krishi-udhar',
  homeopathy: 'homeopathy-clinic',
  drtrivedi: 'homeopathy-clinic',
  'drtrivedi-homeopathy': 'homeopathy-clinic',
  mathur: 'mathur-cineplex',
  cineplex: 'mathur-cineplex',
};

export function resolveProjectSlug(slug: string) {
  return PROJECT_ALIASES[slug] ?? slug;
}

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === resolveProjectSlug(slug));
}
