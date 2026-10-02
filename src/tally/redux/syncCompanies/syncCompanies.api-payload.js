const optionalText = (value) => String(value ?? "").trim() || null;

export function fromLocalTallyCompany(company) {
  const payload = {
    company_name: company.name,
    company_id: company.guid,
    company_code: company.masterId,
    company_type: company.parent,
    email: company.email,
    phone_number: company.phone,
    gst_number: company.gstin,
    pan_number: company.pan,
    website: company.website,
  };
  const addresses = company.addresses?.length
    ? company.addresses
    : [{ address: company.address, state: company.state, pincode: company.pinCode }];
  for (let index = 1; index <= 3; index += 1) {
    const address = addresses[index - 1];
    const contact = company.contacts?.[index - 1];
    payload[`address${index}`] = address?.address;
    payload[`state${index}`] = address?.state;
    payload[`pincode${index}`] = address?.pincode;
    payload[`contact_person_name${index}`] = contact?.name;
    payload[`contact_person_mobile_number${index}`] = contact?.mobile;
    payload[`contact_person_position${index}`] = contact?.position;
  }
  return Object.fromEntries(Object.entries(payload).map(([key, value]) => [key, optionalText(value)]));
}

export function toSystemCompanyCreatePayload(company) {
  const fields = ["company_name", "company_id", "company_code", "company_type", "email", "phone_number", "gst_number", "pan_number", "website"];
  for (let index = 1; index <= 3; index += 1) {
    fields.push(`address${index}`, `state${index}`, `pincode${index}`, `contact_person_name${index}`, `contact_person_mobile_number${index}`, `contact_person_position${index}`);
  }
  const payload = Object.fromEntries(fields.map((field) => [field, optionalText(company[field])]));
  const missing = ["company_name", "company_id", "company_code"].filter((field) => !payload[field]);
  if (missing.length) throw new Error(`${payload.company_name || "Company"}: ${missing.join(", ")} required.`);
  return payload;
}
