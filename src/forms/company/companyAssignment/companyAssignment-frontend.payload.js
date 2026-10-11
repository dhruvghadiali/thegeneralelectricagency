import { COMPANY_ASSIGNMENT_INITIAL_VALUES } from "@Forms/company/companyAssignment/companyAssignment.initialValues";

export function toCompanyAssignmentFormValues(company, companyAddress) {
  if (!company) return { ...COMPANY_ASSIGNMENT_INITIAL_VALUES };

  return {
    companyId: String(company.id ?? ""),
    companyAddressId: String(companyAddress?.id ?? ""),
  };
}
