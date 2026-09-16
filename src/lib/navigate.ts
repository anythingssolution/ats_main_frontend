export function navigate(path: string) {
  if (window.location.pathname + window.location.hash === path) return;
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo(0, 0);
}
