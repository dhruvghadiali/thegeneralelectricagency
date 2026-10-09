export function isAltShortcut(event, key) {
  const normalizedKey = key.toLowerCase();
  const physicalKeyCode = `key${normalizedKey}`;

  return (
    event.altKey &&
    !event.ctrlKey &&
    !event.metaKey &&
    (event.key.toLowerCase() === normalizedKey ||
      event.code.toLowerCase() === physicalKeyCode)
  );
}
