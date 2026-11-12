export function navigate(path: string) {
  if (window.location.pathname + window.location.hash === path) return;
  const hash = path.includes('#') ? path.split('#')[1] : '';
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    window.scrollTo(0, 0);
  }
}
