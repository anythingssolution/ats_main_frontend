const HOME_TITLE = 'ATS Tech Agency | Digital Products to Grow & Shift Your Business';
const HOME_DESCRIPTION =
  'ATS is a tech agency that solves business problems with technology. We build digital products, software, and apps that help companies grow and shift.';
const HOME_URL = 'https://anythingssolution.com/';
const HOME_IMAGE = 'https://anythingssolution.com/og-image.png';
const JSON_LD_ID = 'ats-page-jsonld';

type MetaAttr = 'name' | 'property';

function setTag(attr: MetaAttr, key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'canonical';
    document.head.appendChild(link);
  }
  link.href = url;
}

function setJsonLd(data: unknown | null) {
  const existing = document.getElementById(JSON_LD_ID);
  if (existing) existing.remove();
  if (!data) return;
  const script = document.createElement('script');
  script.id = JSON_LD_ID;
  script.type = 'application/ld+json';
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export type PageSeo = {
  title: string;
  description: string;
  url: string;
  image?: string;
  imageAlt?: string;
  keywords?: string;
  jsonLd?: unknown;
};

export function applyPageSeo(seo: PageSeo) {
  document.title = seo.title;
  setTag('name', 'description', seo.description);
  if (seo.keywords) setTag('name', 'keywords', seo.keywords);
  setCanonical(seo.url);

  setTag('property', 'og:title', seo.title);
  setTag('property', 'og:description', seo.description);
  setTag('property', 'og:url', seo.url);
  setTag('property', 'og:image', seo.image ?? HOME_IMAGE);
  if (seo.imageAlt) setTag('property', 'og:image:alt', seo.imageAlt);

  setTag('name', 'twitter:title', seo.title);
  setTag('name', 'twitter:description', seo.description);
  setTag('name', 'twitter:image', seo.image ?? HOME_IMAGE);

  setJsonLd(seo.jsonLd ?? null);
}

export function restoreHomeSeo() {
  applyPageSeo({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: HOME_URL,
    image: HOME_IMAGE,
    imageAlt: 'ATS — Any Things Solution, tech agency',
  });
  setJsonLd(null);
}
