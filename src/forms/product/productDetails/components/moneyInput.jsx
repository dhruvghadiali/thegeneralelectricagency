import { Input } from "@shadcnComponent/input";

function MoneyInput({ id, field, max, inputProps, onChange }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
        ₹
      </span>
      <Input
        id={id}
        type="number"
        min="0"
        max={max}
        step="0.01"
        inputMode="decimal"
        {...inputProps(field, id)}
        onChange={onChange}
        className="pl-7"
      />
    </div>
  );
}

export default MoneyInput;
