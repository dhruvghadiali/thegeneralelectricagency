import { RotateCcw, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function CompanyTableActions({
  company,
  canManage,
  onDelete,
  onRestore,
}) {
  const isInactive = company.isActive === false;

  return (
    <div className="flex items-center gap-1">
      {canManage && (
        isInactive ? (
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
            disabled
            onClick={() => onDelete(company)}
            aria-label={`Delete ${company.name}`}
            title="Delete company is disabled"
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
        )
      )}
    </div>
  );
}

export default CompanyTableActions;
