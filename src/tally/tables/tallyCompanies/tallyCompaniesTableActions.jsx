import { Eye } from "lucide-react";
import { Button } from "@shadcnComponent/button";

export default function TallyCompaniesTableActions({ company, onView }) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => onView(company)}
      aria-label={`View ${company.company_name}`}
      title="View company"
    >
      <Eye className="size-4" aria-hidden="true" />
    </Button>
  );
}
