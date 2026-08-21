import { Loader2, Save } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import CompanyAddressSelect from "@Forms/company/companyAssignment/components/companyAddressSelect";
import CompanyPicker from "@Forms/company/companyAssignment/components/companyPicker";
import { useCompanyAssignmentForm } from "@Forms/company/companyAssignment/hooks/useCompanyAssignmentForm";

function CompanyAssignmentForm({ contact, onSuccess, popoverContainerRef }) {
  const form = useCompanyAssignmentForm({ contact, onSuccess });
  const { assignment } = form;

  return (
    <section className="mt-6 min-w-0 overflow-hidden rounded-xl border p-4">
      <h3 className="text-sm font-semibold">Company assignment</h3>
      <p className="mt-1 text-xs text-muted-foreground">
        Move this contact person to another company and company address.
      </p>

      {assignment.isChecking ? (
        <p className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Checking current company contacts...
        </p>
      ) : assignment.checkError ? (
        <p className="mt-4 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          {assignment.checkError}
        </p>
      ) : form.reassignmentBlockReason ? (
        <p className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
          {form.reassignmentBlockReason}
        </p>
      ) : (
        <div className="mt-4 grid min-w-0 gap-4">
          <CompanyPicker
            open={assignment.pickerOpen}
            search={assignment.companySearch}
            companies={assignment.companies}
            selectedCompany={form.selectedCompany}
            pagination={assignment.companyPagination}
            isLoading={assignment.isLoadingCompanies}
            error={assignment.fieldErrors.companyId}
            containerRef={popoverContainerRef}
            onOpenChange={form.openCompanyPicker}
            onSearchChange={form.searchCompanies}
            onSelect={form.selectCompany}
            onLoadMore={form.loadMoreCompanies}
          />
          <CompanyAddressSelect
            company={form.selectedCompany}
            value={assignment.companyAddressId}
            error={assignment.fieldErrors.companyAddressId}
            onChange={form.selectCompanyAddress}
          />
          {assignment.saveError && (
            <p className="text-sm text-destructive">{assignment.saveError}</p>
          )}
          <Button
            type="button"
            onClick={form.submitAssignment}
            disabled={!form.hasChanged || assignment.isSaving}
            className="justify-self-end"
          >
            {assignment.isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            Save assignment
          </Button>
        </div>
      )}
    </section>
  );
}

export default CompanyAssignmentForm;
