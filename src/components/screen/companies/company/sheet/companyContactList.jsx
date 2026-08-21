import CompanyContactItem from "@screenComponent/companies/company/sheet/companyContactItem";

function CompanyContactList({ contacts, addressIndex }) {
  return (
    <div className="p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {contacts.length} {contacts.length === 1 ? "contact" : "contacts"}
      </p>

      {contacts.length > 0 ? (
        <div className="grid gap-2">
          {contacts.map((contact) => (
            <CompanyContactItem
              key={contact.id ?? `${addressIndex}-${contact.mobile}`}
              contact={contact}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
          No contacts assigned to this location.
        </p>
      )}
    </div>
  );
}

export default CompanyContactList;
