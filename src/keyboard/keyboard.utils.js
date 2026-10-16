export const DESKTOP_KEYBOARD_MEDIA_QUERY = "(min-width: 1024px)";

export function isDesktopKeyboardEnabled() {
  return (
    typeof window === "undefined" ||
    window.matchMedia(DESKTOP_KEYBOARD_MEDIA_QUERY).matches
  );
}

export function withDesktopKeyboardShortcut(handler) {
  return (...args) => {
    if (!isDesktopKeyboardEnabled()) return undefined;

    return handler?.(...args);
  };
}

export function addDesktopKeyboardListener(
  listener,
  { capture = false } = {},
) {
  const mediaQuery = window.matchMedia(DESKTOP_KEYBOARD_MEDIA_QUERY);
  let isListening = false;

  const updateListener = () => {
    if (mediaQuery.matches && !isListening) {
      window.addEventListener("keydown", listener, capture);
      isListening = true;
      return;
    }

    if (!mediaQuery.matches && isListening) {
      window.removeEventListener("keydown", listener, capture);
      isListening = false;
    }
  };

  updateListener();
  mediaQuery.addEventListener("change", updateListener);

  return () => {
    mediaQuery.removeEventListener("change", updateListener);
    if (isListening) {
      window.removeEventListener("keydown", listener, capture);
    }
  };
}

export function isAltShortcut(event, key) {
  const normalizedKey = key.toLowerCase();
  const physicalKeyCode = `key${normalizedKey}`;
  const legacyKeyCode = normalizedKey.toUpperCase().charCodeAt(0);

  return (
    event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    (event.key?.toLowerCase() === normalizedKey ||
      event.code?.toLowerCase() === physicalKeyCode ||
      event.keyCode === legacyKeyCode ||
      event.which === legacyKeyCode)
  );
}
