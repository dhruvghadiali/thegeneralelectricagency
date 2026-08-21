import { Badge } from "@shadcnComponent/badge";
import CompanyAddressCard from "@screenComponent/companies/company/sheet/companyAddressCard";

function CompanyAddressesSection({ addresses = [] }) {
  return (
    <section>
      <div className="flex items-end justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Company addresses</h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Contact persons are grouped under their address.
          </p>
        </div>
        <Badge variant="secondary">
          {addresses.length} {addresses.length === 1 ? "address" : "addresses"}
        </Badge>
      </div>

      {addresses.length > 0 ? (
        <div className="mt-4 grid gap-4">
          {addresses.map((address, addressIndex) => (
            <CompanyAddressCard
              key={address.id ?? addressIndex}
              address={address}
              addressIndex={addressIndex}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
          No addresses are available for this company.
        </p>
      )}
    </section>
  );
}

export default CompanyAddressesSection;
