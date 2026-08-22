import { Eye, Pencil, RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function CompanyTableActions({
  company,
  canManage,
  onView,
  onEdit,
  onDelete,
  onRestore,
}) {
  const isInactive = company.isActive === false;

  return (
    <div className="flex items-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onView(company)}
        disabled={isInactive}
        aria-label={`View ${company.name}`}
        title={isInactive ? "Restore company before viewing" : "View company"}
      >
        <Eye className="size-4" />
      </Button>

      {canManage && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(company)}
            disabled={isInactive}
            aria-label={`Edit ${company.name}`}
            title={isInactive ? "Restore company before editing" : "Edit company"}
          >
            <Pencil className="size-4" />
          </Button>
          {isInactive ? (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRestore(company)}
              aria-label={`Restore ${company.name}`}
              title="Restore company"
              className="text-muted-foreground hover:text-primary"
            >
              <RotateCcw className="size-4" />
            </Button>
          ) : (
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
          )}
        </>
      )}
    </div>
  );
}

export default CompanyTableActions;
