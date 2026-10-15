function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedProductName({ name, search }) {
  const searchValue = search.trim();

  if (!searchValue) return name;

  const matchingParts = name.split(
    new RegExp(`(${escapeRegExp(searchValue)})`, "gi"),
  );

  return matchingParts.map((part, index) =>
    part.toLocaleLowerCase() === searchValue.toLocaleLowerCase() ? (
      <mark
        key={`${part}-${index}`}
        className="rounded-sm bg-amber-200 px-0.5 text-foreground dark:bg-amber-500/35"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export default HighlightedProductName;
