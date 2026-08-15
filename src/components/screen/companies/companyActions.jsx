import { Eye } from "lucide-react";

import { Button } from "@/components/ui/button";

function CompanyActions({ company, onView }) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => onView(company)}
      aria-label={`View ${company.name}`}
      title="View company"
    >
      <Eye className="size-4" />
    </Button>
  );
}

export default CompanyActions;
