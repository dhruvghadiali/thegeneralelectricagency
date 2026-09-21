export function normalizeGstin(value) {
  return String(value ?? "").trim().toUpperCase();
}

export function getSharedGstinLedgers(ledgers) {
  const groups = new Map();
  for (const ledger of ledgers) {
    const gstin = normalizeGstin(ledger.gstin);
    if (!gstin || /^(?:[-—–]+|N\/?A|NOT APPLICABLE|NONE|NULL)$/.test(gstin)) continue;
    if (!groups.has(gstin)) groups.set(gstin, []);
    groups.get(gstin).push(ledger);
  }
  const shared = [...groups.entries()].filter(([, rows]) => rows.length > 1)
    .sort(([a], [b]) => a.localeCompare(b));
  return { groupCount: shared.length, ledgers: shared.flatMap(([, rows]) =>
    [...rows].sort((a, b) => a.name.localeCompare(b.name))) };
}
