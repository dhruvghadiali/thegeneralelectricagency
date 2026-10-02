const formatAddresses = (addresses) =>
  addresses
    ?.map(({ address, state, pincode }) => [address, state, pincode].filter(Boolean).join(", "))
    .filter(Boolean)
    .join("\n") || "—";

const formatContacts = (contacts) =>
  contacts
    ?.map(({ name, mobile, position }) => [name, position, mobile].filter(Boolean).join(" · "))
    .filter(Boolean)
    .join("\n") || "—";

export const COMPANY_DETAILS = [
  ["Company name", "name"],
  ["Tally GUID", "guid"],
  ["Master ID", "masterId"],
  ["Ledger group", "parent"],
  ["GSTIN", "gstin"],
  ["PAN", "pan"],
  ["Email", "email"],
  ["Phone", "phone"],
  ["Website", "website"],
  ["Primary address", "address"],
  ["State", "state"],
  ["Pincode", "pinCode"],
  ["Mailing addresses", "addresses", formatAddresses],
  ["Contacts", "contacts", formatContacts],
];
