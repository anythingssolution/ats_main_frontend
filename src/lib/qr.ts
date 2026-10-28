import QRCode from 'qrcode';

/** Stable tracking URL encoded in all printed / shared QR assets. */
export const QR_TRACKING_URL = 'https://anythingssolution.com/qr';

/** Live destination after /qr redirect — change on the server, not in the code. */
export const QR_DESTINATION_URL = 'https://anythingssolution.com/';

export const QR_BRAND = {
  company: 'Any Things Solution',
  short: 'ATS',
  /** High-contrast modules for print + scan reliability */
  fg: '#111111',
  bg: '#FFFFFF',
  accent: '#4eb1ba',
  logoSrc: '/nav-logo.png',
} as const;

export type QrErrorLevel = 'M' | 'Q' | 'H';

export type QrGenerateOptions = {
  /** Include center logo (uses error correction H). */
  withLogo?: boolean;
  /** Module size in SVG/user units; quiet zone is 4 modules. */
  moduleSize?: number;
  errorCorrectionLevel?: QrErrorLevel;
};

const QUIET_ZONE_MODULES = 4;
/** Logo pad as fraction of full QR (including quiet zone). Keep ≤ ~18% for scan safety. */
const LOGO_FRACTION = 0.16;

function resolveLevel(withLogo: boolean, level?: QrErrorLevel): QrErrorLevel {
  if (withLogo) return 'H';
  return level ?? 'Q';
}

/**
 * Build a print-ready SVG string with sharp square modules, quiet zone,
 * and an optional center logo on a white pad.
 */
export async function generateQrSvg(
  text: string = QR_TRACKING_URL,
  options: QrGenerateOptions = {}
): Promise<string> {
  const withLogo = options.withLogo ?? true;
  const moduleSize = options.moduleSize ?? 10;
  const errorCorrectionLevel = resolveLevel(withLogo, options.errorCorrectionLevel);

  const qr = QRCode.create(text, { errorCorrectionLevel });
  const size = qr.modules.size;
  const total = size + QUIET_ZONE_MODULES * 2;
  const dim = total * moduleSize;

  let paths = '';
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (!qr.modules.get(row, col)) continue;
      const x = (col + QUIET_ZONE_MODULES) * moduleSize;
      const y = (row + QUIET_ZONE_MODULES) * moduleSize;
      paths += `M${x} ${y}h${moduleSize}v${moduleSize}h-${moduleSize}z`;
    }
  }

  let logoMarkup = '';
  if (withLogo) {
    const logoBox = dim * LOGO_FRACTION;
    const pad = logoBox * 0.12;
    const inner = logoBox - pad * 2;
    const x = (dim - logoBox) / 2;
    const y = (dim - logoBox) / 2;
    logoMarkup = `
  <rect x="${x}" y="${y}" width="${logoBox}" height="${logoBox}" fill="${QR_BRAND.bg}"/>
  <image
    href="${QR_BRAND.logoSrc}"
    x="${x + pad}"
    y="${y + pad}"
    width="${inner}"
    height="${inner}"
    preserveAspectRatio="xMidYMid meet"
  />`;
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${dim}" height="${dim}" viewBox="0 0 ${dim} ${dim}" role="img" aria-label="QR code for ${QR_BRAND.company}">
  <title>${QR_BRAND.company} QR — ${text}</title>
  <rect width="100%" height="100%" fill="${QR_BRAND.bg}"/>
  <path fill="${QR_BRAND.fg}" d="${paths}"/>${logoMarkup}
</svg>`;
}

/** Embed the logo as a data URL so SVG downloads work offline / in Illustrator. */
async function embedLogoInSvg(svg: string): Promise<string> {
  try {
    const res = await fetch(QR_BRAND.logoSrc);
    if (!res.ok) return svg;
    const blob = await res.blob();
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(blob);
    });
    return svg.replace(`href="${QR_BRAND.logoSrc}"`, `href="${dataUrl}"`);
  } catch {
    return svg;
  }
}

export async function generateQrSvgForDownload(
  text: string = QR_TRACKING_URL,
  options: QrGenerateOptions = {}
): Promise<string> {
  const svg = await generateQrSvg(text, options);
  if (options.withLogo === false) return svg;
  return embedLogoInSvg(svg);
}

/**
 * Rasterize the SVG to a PNG data URL at the given pixel size (square).
 */
export async function generateQrPngDataUrl(
  text: string = QR_TRACKING_URL,
  pixelSize: number,
  options: QrGenerateOptions = {}
): Promise<string> {
  const svg = await generateQrSvgForDownload(text, {
    ...options,
    moduleSize: Math.max(8, Math.round(pixelSize / 45)),
  });
  const blob = new Blob([svg], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  try {
    const img = await loadImage(url);
    const canvas = document.createElement('canvas');
    canvas.width = pixelSize;
    canvas.height = pixelSize;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas unavailable');
    ctx.fillStyle = QR_BRAND.bg;
    ctx.fillRect(0, 0, pixelSize, pixelSize);
    // Smooth scaling keeps the center logo clean at print sizes; modules stay sharp enough at ≥1024px.
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, pixelSize, pixelSize);
    return canvas.toDataURL('image/png');
  } finally {
    URL.revokeObjectURL(url);
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load QR image'));
    img.src = src;
  });
}

export function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export function downloadDataUrl(filename: string, dataUrl: string) {
  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = filename;
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export async function downloadQrSvg(
  filename = 'ats-qr.svg',
  options: QrGenerateOptions = {}
) {
  const svg = await generateQrSvgForDownload(QR_TRACKING_URL, options);
  downloadBlob(filename, new Blob([svg], { type: 'image/svg+xml;charset=utf-8' }));
}

export async function downloadQrPng(
  filename: string,
  pixelSize: number,
  options: QrGenerateOptions = {}
) {
  const dataUrl = await generateQrPngDataUrl(QR_TRACKING_URL, pixelSize, options);
  downloadDataUrl(filename, dataUrl);
}
