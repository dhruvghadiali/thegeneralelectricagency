import { Plus } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import PageBreadcrumb from "@commonComponent/pageBreadcrumb";

function ProductHeader({ canManage, onAddProduct }) {
  return (
    <div className="space-y-5">
      <PageBreadcrumb items={[{ label: "Products" }]} />
      <section className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-primary">Product catalogue</p>
          <h2 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            Products
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {canManage
              ? "Manage product codes, categories, agencies, and specifications."
              : "View product codes, categories, agencies, and specifications."}
          </p>
        </div>
        {canManage && (
          <Button onClick={onAddProduct} className="w-full lg:w-auto">
            <Plus className="size-4" />
            Add product
          </Button>
        )}
      </section>
    </div>
  );
}

export default ProductHeader;
