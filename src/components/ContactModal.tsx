import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Mail, MapPin, Phone, X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6">
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            aria-label="Close contact form"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="site-footer-grid relative flex max-h-[90vh] w-full max-w-[920px] flex-col overflow-hidden border border-white/10 bg-black text-white"
          >
            <div className="gts-film-grain pointer-events-none absolute inset-0" aria-hidden="true" />
            <span className="absolute left-0 top-0 h-full w-[2px] bg-brand" aria-hidden="true" />

            <div className="relative flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5 md:px-8">
              <div>
                <p className="font-mono-custom text-[10px] uppercase tracking-[0.4em] text-white/45">
                  VII — Contact
                </p>
                <h2
                  id="contact-modal-title"
                  className="mt-2 font-syne text-[clamp(1.6rem,4vw,2.6rem)] font-semibold leading-[0.95] tracking-tight"
                >
                  Let&apos;s build the next shift.
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors hover:border-brand hover:bg-brand"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative grid flex-1 grid-cols-1 overflow-y-auto lg:grid-cols-12">
              <div className="border-b border-white/10 px-6 py-6 md:px-8 lg:col-span-5 lg:border-b-0 lg:border-r">
                <p className="max-w-[22rem] text-[15px] leading-relaxed text-white/50">
                  Have a project in mind? Tell us what you want to grow — we&apos;ll map the digital path.
                </p>

                <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
                  {[
                    {
                      icon: Mail,
                      label: 'Email',
                      value: 'anythingssolution@gmail.com',
                      href: 'mailto:anythingssolution@gmail.com',
                    },
                    {
                      icon: Phone,
                      label: 'Phone',
                      value: '+91 123 456 7890',
                      href: 'tel:+911234567890',
                    },
                    { icon: MapPin, label: 'Studio', value: 'India', href: null },
                  ].map((item) => {
                    const Icon = item.icon;
                    const inner = (
                      <>
                        <span className="flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 text-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                            {item.label}
                          </span>
                          <span className="mt-1 block truncate text-sm text-white/80">{item.value}</span>
                        </span>
                      </>
                    );

                    return (
                      <li key={item.label}>
                        {item.href ? (
                          <a href={item.href} className="group flex items-center gap-4 py-4 transition-colors hover:text-white">
                            {inner}
                          </a>
                        ) : (
                          <div className="group flex items-center gap-4 py-4">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>

              <form
                className="px-6 py-6 md:px-8 lg:col-span-7"
                onSubmit={(event) => event.preventDefault()}
              >
                <div className="mb-8 flex items-end justify-between gap-4">
                  <h3 className="font-syne text-xl font-semibold tracking-tight md:text-2xl">Send a message</h3>
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/35">
                    (IV) Inquire
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40">Name</span>
                    <input
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Your name"
                      className="mt-3 w-full border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                    />
                  </label>
                  <label className="block">
                    <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40">Email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="you@studio.com"
                      className="mt-3 w-full border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                    />
                  </label>
                </div>

                <label className="mt-7 block">
                  <span className="font-mono-custom text-[10px] uppercase tracking-[0.28em] text-white/40">Project</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="What do you want to build?"
                    className="mt-3 w-full resize-none border-0 border-b border-white/20 bg-transparent pb-3 text-[15px] text-white placeholder:text-white/25 outline-none transition-colors focus:border-brand"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-8 inline-flex items-center gap-3 bg-white px-8 py-3.5 font-mono-custom text-xs uppercase tracking-[0.28em] text-black transition-transform hover:scale-[1.03] active:scale-95"
                >
                  <span>Send Message</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
