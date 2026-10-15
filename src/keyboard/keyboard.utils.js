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
