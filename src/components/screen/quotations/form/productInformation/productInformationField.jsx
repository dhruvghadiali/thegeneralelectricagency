import { Label } from "@shadcnComponent/label";

function ProductInformationField({ id, label, error, children }) {
  return (
    <div className="grid content-start gap-2 self-start">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export default ProductInformationField;
