import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function scrollToTarget(id: string, smooth = true): boolean {
  const triggerId = id === 'portfolio' ? 'portfolio-trigger' : id;
  const st = ScrollTrigger.getById(triggerId);
  if (st) {
    window.scrollTo({ top: st.start, behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }

  const el = document.getElementById(id);
  if (el) {
    const spacer = el.closest('.pin-spacer') as HTMLElement | null;
    const top = spacer
      ? spacer.getBoundingClientRect().top + window.scrollY
      : el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: smooth ? 'smooth' : 'auto' });
    return true;
  }
  return false;
}

export function navigate(path: string) {
  if (window.location.pathname + window.location.hash === path) {
    const hash = path.includes('#') ? path.split('#')[1] : '';
    if (hash) scrollToTarget(hash, true);
    return;
  }

  const hash = path.includes('#') ? path.split('#')[1] : '';
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));

  if (hash) {
    if (!scrollToTarget(hash, true)) {
      const delays = [50, 150, 300, 600];
      delays.forEach((ms) => {
        setTimeout(() => scrollToTarget(hash, false), ms);
      });
    }
  } else {
    window.scrollTo(0, 0);
  }
}
