import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Check, Copy, Download, QrCode } from 'lucide-react';
import {
  QR_BRAND,
  QR_DESTINATION_URL,
  QR_TRACKING_URL,
  downloadQrPng,
  downloadQrSvg,
  generateQrSvgForDownload,
} from '../lib/qr';
import { navigate } from '../lib/navigate';

type DownloadKind = 'svg' | 'png' | 'png-print' | null;

export const QrGeneratorPage: React.FC = () => {
  const [withLogo, setWithLogo] = useState(true);
  const [previewSvg, setPreviewSvg] = useState<string | null>(null);
  const [busy, setBusy] = useState<DownloadKind>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    generateQrSvgForDownload(QR_TRACKING_URL, { withLogo, moduleSize: 12 })
      .then((svg) => {
        if (!cancelled) {
          setPreviewSvg(svg.replace(/^<\?xml[^>]*>\s*/i, ''));
        }
      })
      .catch(() => {
        if (!cancelled) setError('Could not generate QR preview.');
      });
    return () => {
      cancelled = true;
    };
  }, [withLogo]);

  const runDownload = async (kind: Exclude<DownloadKind, null>) => {
    setBusy(kind);
    setError(null);
    try {
      const opts = { withLogo };
      if (kind === 'svg') await downloadQrSvg('ats-qr-anythingssolution.svg', opts);
      if (kind === 'png') await downloadQrPng('ats-qr-anythingssolution-1024.png', 1024, opts);
      if (kind === 'png-print') await downloadQrPng('ats-qr-anythingssolution-print-2048.png', 2048, opts);
    } catch {
      setError('Download failed. Try again.');
    } finally {
      setBusy(null);
    }
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(QR_TRACKING_URL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError('Could not copy URL.');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/80 px-5 py-3 backdrop-blur-md md:px-10 md:py-3.5">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4">
          <div className="flex items-center gap-4 lg:gap-7">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="shrink-0 cursor-pointer"
              aria-label="Any Things Solution home"
            >
              <img src="/nav-logo-light.png" alt="ATS Any Things Solution" className="h-9 w-auto md:h-11" />
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="hidden items-center gap-2 font-mono-custom text-[11px] uppercase tracking-[0.16em] text-white/70 hover:text-white md:flex"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Home
            </button>
          </div>
          <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/45">
            Tools / QR
          </p>
        </div>
      </header>

      <main className="mx-auto w-full max-w-[1200px] px-6 pb-24 pt-28 md:px-12 md:pb-32 md:pt-32">
        <p className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-brand">
          Production QR system
        </p>
        <h1 className="mt-4 max-w-[18ch] font-syne text-[clamp(2.4rem,6vw,4.5rem)] font-semibold uppercase leading-[0.92] tracking-tight">
          ATS brand QR
        </h1>
        <p className="mt-6 max-w-[36rem] text-[15px] leading-relaxed text-white/55 md:text-[16px]">
          Encodes the tracking URL <span className="text-white/85">{QR_TRACKING_URL}</span>, which
          redirects to the live site. Reprint once — change the destination later without a new code.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Preview */}
          <section className="lg:col-span-5">
            <div className="border border-white/10 bg-white p-6 md:p-8">
              <div className="mx-auto aspect-square w-full max-w-[360px] bg-white">
                {previewSvg ? (
                  <div
                    className="h-full w-full [&_svg]:h-full [&_svg]:w-full"
                    dangerouslySetInnerHTML={{ __html: previewSvg }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-black/30">
                    <QrCode className="h-10 w-10 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
            <p className="mt-4 font-mono-custom text-[10px] uppercase tracking-[0.22em] text-white/40">
              Quiet zone · error correction {withLogo ? 'H' : 'Q'} · square modules
            </p>
          </section>

          {/* Controls */}
          <section className="lg:col-span-7">
            <dl className="grid grid-cols-1 gap-6 border-y border-white/10 py-6 sm:grid-cols-2">
              <div>
                <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Encoded URL
                </dt>
                <dd className="mt-2 break-all text-sm text-white/85">{QR_TRACKING_URL}</dd>
              </div>
              <div>
                <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Redirects to
                </dt>
                <dd className="mt-2 break-all text-sm text-white/85">{QR_DESTINATION_URL}</dd>
              </div>
              <div>
                <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Company
                </dt>
                <dd className="mt-2 text-sm text-white/85">{QR_BRAND.company}</dd>
              </div>
              <div>
                <dt className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                  Contrast
                </dt>
                <dd className="mt-2 text-sm text-white/85">Black modules · white ground</dd>
              </div>
            </dl>

            <label className="mt-8 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={withLogo}
                onChange={(e) => setWithLogo(e.target.checked)}
                className="mt-1 h-4 w-4 accent-brand"
              />
              <span>
                <span className="block text-sm text-white/90">Center logo mark</span>
                <span className="mt-1 block text-[13px] leading-relaxed text-white/45">
                  Small ATS mark on a white pad (~16% of the code). Uses error correction H so
                  scanners still read through the logo.
                </span>
              </span>
            </label>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={copyUrl}
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-5 py-3 font-mono-custom text-[11px] uppercase tracking-[0.22em] text-white/80 transition-colors hover:border-brand hover:text-white"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-brand" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy tracking URL'}
              </button>
              <a
                href={QR_TRACKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/15 bg-white/5 px-5 py-3 font-mono-custom text-[11px] uppercase tracking-[0.22em] text-white/80 transition-colors hover:border-brand hover:text-white"
              >
                Test /qr redirect
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="mt-10">
              <p className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                Download
              </p>
              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <DownloadButton
                  label="SVG"
                  hint="Print · posters · cards"
                  busy={busy === 'svg'}
                  onClick={() => runDownload('svg')}
                />
                <DownloadButton
                  label="PNG 1024"
                  hint="Social · digital"
                  busy={busy === 'png'}
                  onClick={() => runDownload('png')}
                />
                <DownloadButton
                  label="PNG 2048"
                  hint="Print-ready raster"
                  busy={busy === 'png-print'}
                  onClick={() => runDownload('png-print')}
                />
              </div>
            </div>

            {error && (
              <p className="mt-6 font-mono-custom text-[11px] uppercase tracking-[0.18em] text-red-400">
                {error}
              </p>
            )}

            <ul className="mt-12 space-y-3 border-t border-white/10 pt-8 text-[13px] leading-relaxed text-white/45">
              <li>Do not stretch, round, or recolor modules after export.</li>
              <li>Keep a clear quiet zone around the code on print layouts.</li>
              <li>
                To retarget campaigns later, change the <code className="text-white/70">/qr</code>{' '}
                redirect destination — leave the printed QR unchanged.
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
};

const DownloadButton: React.FC<{
  label: string;
  hint: string;
  busy: boolean;
  onClick: () => void;
}> = ({ label, hint, busy, onClick }) => (
  <button
    type="button"
    disabled={busy}
    onClick={onClick}
    className="group flex flex-col items-start gap-2 border border-white/15 bg-white px-5 py-4 text-left text-black transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
  >
    <span className="inline-flex items-center gap-2 font-mono-custom text-[11px] font-bold uppercase tracking-[0.22em]">
      <Download className="h-3.5 w-3.5" />
      {busy ? 'Preparing…' : label}
    </span>
    <span className="text-[12px] text-black/50">{hint}</span>
  </button>
);
