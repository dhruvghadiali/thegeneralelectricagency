import { Loader2 } from "lucide-react";

function ProductDirectoryLoading() {
  return (
    <div className="flex h-full min-h-48 items-center justify-center gap-2 px-6 text-sm text-muted-foreground">
      <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      Loading products...
    </div>
  );
}

export default ProductDirectoryLoading;
