export function toCompanyAssignmentUpdatePayload(values = {}) {
  return {
    company: values.companyId?.trim() ?? "",
    company_address: values.companyAddressId?.trim() ?? "",
  };
}
