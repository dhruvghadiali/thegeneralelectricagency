import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function CompanyTableActions({ company, canManage, onView, onEdit, onDelete }) {
  const canModify = canManage && company.isActive;

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(company)}
        aria-label={`View ${company.name}`}
        title="View company"
      >
        <Eye className="size-4" />
      </Button>

      {canModify && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(company)}
            aria-label={`Edit ${company.name}`}
            title="Edit company"
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(company)}
            aria-label={`Delete ${company.name}`}
            title="Delete company"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        </>
      )}
    </div>
  );
}

export default CompanyTableActions;
