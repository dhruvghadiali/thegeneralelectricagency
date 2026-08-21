import { Label } from "@shadcnComponent/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@shadcnComponent/select";

const addressLabel = (address) =>
  `${address.address}${address.pincode ? ` · ${address.pincode}` : ""}`;

function CompanyAddressSelect({ company, value, error, onChange }) {
  const addresses = company?.addresses ?? [];

  return (
    <div className="grid min-w-0 gap-2">
      <Label htmlFor="company-assignment-address">Company address</Label>
      <Select value={value} onValueChange={onChange} disabled={!company}>
        <SelectTrigger
          id="company-assignment-address"
          aria-invalid={Boolean(error)}
          className="min-w-0 max-w-full overflow-hidden bg-background text-left"
        >
          <SelectValue placeholder="Select company address" />
        </SelectTrigger>
        <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
          {addresses.map((address) => (
            <SelectItem key={address.id} value={String(address.id)}>
              {addressLabel(address)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export default CompanyAddressSelect;
