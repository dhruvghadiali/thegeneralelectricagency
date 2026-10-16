import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

import CompanyDirectoryList from "@screenComponent/quotations/form/companyInformation/companyDirectory/companyDirectoryList";
import CompanyDirectoryFooter from "@screenComponent/quotations/form/companyInformation/companyDirectory/companyDirectoryFooter";
import CompanyDirectoryStatus from "@screenComponent/quotations/form/companyInformation/companyDirectory/companyDirectoryStatus";
import useQuotationCompanyDirectory from "@screenComponent/quotations/form/companyInformation/companyDirectory/useQuotationCompanyDirectory";

function QuotationCompanyDirectory({
  directoryRef,
  onCompanySelect,
  onCompanyOptionKeyDown,
}) {
  const directory = useQuotationCompanyDirectory();
  const isEmpty = directory.companies.length === 0;

  return (
    <Card
      ref={directoryRef}
      className="hidden min-h-[32rem] gap-0 overflow-hidden pb-0 lg:flex lg:h-full lg:min-h-0"
    >
      <CardHeader className="shrink-0 border-b">
        <CardTitle>Company directory</CardTitle>
        <CardDescription>{directory.companyCountLabel}</CardDescription>
      </CardHeader>

      <CardContent
        className="min-h-0 flex-1 overflow-y-auto px-0"
        aria-live="polite"
      >
        <CompanyDirectoryStatus
          isLoading={directory.isLoading}
          error={directory.error}
          isEmpty={isEmpty}
          onRetry={() => directory.loadCompanies()}
        />

        {!directory.isLoading && !isEmpty && (
          <>
            <CompanyDirectoryList
              companies={directory.companies}
              companySearch={directory.companySearch}
              selectedCompanyId={directory.selectedCompany?.id}
              onCompanySelect={onCompanySelect}
              onCompanyOptionKeyDown={onCompanyOptionKeyDown}
            />
            <CompanyDirectoryFooter
              pagination={directory.pagination}
              error={directory.error}
              hasMoreCompanies={directory.hasMoreCompanies}
              isLoadingMore={directory.isLoadingMore}
              onLoadMore={() =>
                directory.loadCompanies(directory.pagination.page + 1)
              }
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

export default QuotationCompanyDirectory;
