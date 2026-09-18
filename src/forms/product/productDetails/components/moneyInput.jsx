import { Input } from "@shadcnComponent/input";

function MoneyInput({ id, field, max, inputProps, onChange, type = "number" }) {
  const fieldProps = inputProps(field, id);
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        ₹
      </span>
      <Input
        id={id}
        type={type}
        min={type === "number" ? "0" : undefined}
        max={type === "number" ? max : undefined}
        step={type === "number" ? "0.01" : undefined}
        inputMode="decimal"
        {...fieldProps}
        onChange={onChange ?? fieldProps.onChange}
        className="pl-7"
      />
    </div>
  );
}

export default MoneyInput;
