import { Plus, Trash2 } from "lucide-react";
import { Button } from "@shadcnComponent/button";

export default function TallyComparisonTableActions({ company, kind, selected, onSelect }) {
  const Icon = kind === "new" ? Plus : Trash2;
  const operation = kind === "new" ? "addition" : "deletion";
  const label = `${selected ? "Deselect" : "Select"} ${company.company_name} for ${operation}`;
  return (
    <Button
      type="button"
      variant={selected ? "secondary" : "ghost"}
      size="icon"
      className={kind === "new" ? "text-emerald-700 dark:text-emerald-400" : "text-destructive"}
      aria-label={label}
      title={label}
      aria-pressed={selected}
      onClick={() => onSelect(company, !selected)}
    >
      <Icon className="size-4" aria-hidden="true" />
    </Button>
  );
}
