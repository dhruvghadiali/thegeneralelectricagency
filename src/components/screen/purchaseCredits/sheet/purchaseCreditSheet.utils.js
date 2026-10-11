export function purchaseCreditOptionLabel(options, value) {
  return (
    options.find((option) => option.value === value)?.label ?? value ?? "—"
  );
}

export function purchaseCreditReceiptUrl(value = "") {
  const markdownUrl = String(value).match(/^\[[^\]]*\]\(([^)]+)\)$/);
  return markdownUrl?.[1] ?? value;
}
