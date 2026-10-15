export function fromCompanyContactApiResponse(contact = {}) {
  return {
    id: contact._id ?? contact.id ?? null,
    name: contact.contact_person_name ?? contact.name ?? "",
    mobile: contact.contact_person_mobile_number ?? contact.mobile ?? "",
    position: contact.contact_person_position ?? contact.position ?? "other",
  };
}

export default fromCompanyContactApiResponse;
