import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { employeeCompanyApi } from "@Api";
import { toCompanyAssignmentFormValues } from "@Forms/company/companyAssignment/companyAssignment-frontend.payload";
import {
  activeCompanyListParams,
  companyListRequestOptions,
  findContactAddress,
  findContactCompany,
  FIRST_COMPANY_PAGE,
} from "@Forms/company/companyAssignment/companyAssignment.helpers";
import { contactAssignmentReset } from "@Redux/companyContact/companyContact.slice";
import { fromCompanyListResponse } from "@Tables/company/companyTable.frontend-payload";

export function useCurrentCompanyAssignment({
  contact,
  isInactiveContact,
  changeAssignment,
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!contact) return undefined;
    dispatch(contactAssignmentReset());
    if (isInactiveContact) return undefined;

    const controller = new AbortController();
    changeAssignment({ isChecking: true });

    async function loadCurrentCompany() {
      try {
        const requestOptions = companyListRequestOptions({
          page: FIRST_COMPANY_PAGE,
          search: contact.companyName,
        });
        const response = await employeeCompanyApi.getCompanies(
          activeCompanyListParams(requestOptions),
          { signal: controller.signal },
        );
        const result = fromCompanyListResponse(response, requestOptions);
        const company = findContactCompany(result.items, contact);
        if (!company) {
          throw new Error("Unable to verify the current company contact count.");
        }

        const address = findContactAddress(company, contact);
        changeAssignment({
          ...toCompanyAssignmentFormValues(company, address),
          currentCompany: company,
          currentAddress: address,
          selectedCompanyOption: company,
        });
      } catch (error) {
        if (!controller.signal.aborted) {
          changeAssignment({
            checkError:
              error?.message ?? "Unable to verify the current company.",
          });
        }
      } finally {
        if (!controller.signal.aborted) {
          changeAssignment({ isChecking: false });
        }
      }
    }

    loadCurrentCompany();
    return () => controller.abort();
  }, [changeAssignment, contact, dispatch, isInactiveContact]);
}
