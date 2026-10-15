import { Badge } from "@shadcnComponent/badge";

function QuotationHistoryChangeBadges({ labels = [] }) {
  return (
    <span className="mt-2 flex flex-wrap gap-1.5">
      {labels.map((label) => (
        <Badge
          key={label}
          variant={label === "Initial version" ? "secondary" : "warning"}
        >
          {label}
        </Badge>
      ))}
      {!labels.length && (
        <Badge variant="secondary">No tracked field changes</Badge>
      )}
    </span>
  );
}

export default QuotationHistoryChangeBadges;
