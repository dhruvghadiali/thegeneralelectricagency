import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function CompanyTableActions({
  company,
  canManage = false,
  onView,
  onEdit,
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onView(company)}
        aria-label={`View ${company.name}`}
        title="View company details"
      >
        <Eye className="size-4" aria-hidden="true" />
      </Button>

      {canManage && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => onEdit(company)}
            disabled={!company.id}
            aria-label={`Edit ${company.name}`}
            title="Edit company"
          >
            <Pencil className="size-4" aria-hidden="true" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled
            aria-label={`Delete ${company.name}`}
            title="Delete company (disabled)"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </Button>
        </>
      )}
    </div>
  );
}

export default CompanyTableActions;
