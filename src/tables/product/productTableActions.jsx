import { DatabaseZap, Eye, FileText, Pencil, Trash2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";

function ProductTableActions({
  product,
  onView,
  onEdit,
  onDelete,
  onPdf,
  onMigrate,
  canManage = false,
  showPdf = true,
}) {
  return (
    <div className="flex items-center justify-end gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => onView(product)}
        aria-label={`View ${product.name}`}
        title="View product"
      >
        <Eye className="size-4" />
      </Button>
      {canManage && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(product)}
            aria-label={`Edit ${product.name}`}
          >
            <Pencil className="size-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(product)}
            aria-label={`Delete ${product.name}`}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="size-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={product.isMigrateToTally}
            onClick={() => onMigrate?.(product)}
            aria-label={
              product.isMigrateToTally
                ? `${product.name} is already migrated to Tally`
                : `Migrate ${product.name} to Tally`
            }
            title={
              product.isMigrateToTally
                ? "Already migrated to Tally"
                : "Migrate to Tally"
            }
          >
            <DatabaseZap className="size-4" />
          </Button>
        </>
      )}
      {canManage && showPdf && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onPdf(product)}
          aria-label={`Product PDF for ${product.name}`}
          title="Product PDF"
        >
          <FileText className="size-4" />
        </Button>
      )}
    </div>
  );
}

export default ProductTableActions;
