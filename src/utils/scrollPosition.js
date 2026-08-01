export function getCurrentScrollY() {
  if (typeof window === "undefined") {
    return 0;
  }

  return window.__lenis?.scroll ?? window.scrollY ?? 0;
}

export function scrollToY(top, options = {}) {
  if (typeof window === "undefined") {
    return;
  }

  if (window.__lenis) {
    window.__lenis.scrollTo(top, {
      duration: 1.05,
      easing: (progress) => Math.min(1, 1.001 - 2 ** (-10 * progress)),
      ...options,
    });
    return;
  }

  window.scrollTo({
    top,
    behavior: "smooth",
  });
}
