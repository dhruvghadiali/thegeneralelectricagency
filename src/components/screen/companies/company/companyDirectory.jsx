import { Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import {
  companyDetailsClosed,
  companyDetailsOpened,
} from "@Redux/company/company.slice";
import { selectSelectedCompany } from "@Redux/company/company.selector";
import { COMPANY_COLUMNS } from "@screenComponent/companies/company/company.columns";
import { useCompanyList } from "@screenComponent/companies/company/useCompanyList";

import CompanyActions from "@screenComponent/companies/company/companyActions";
import CompanyDetailSheet from "@screenComponent/companies/company/companyDetailSheet";
import CompanySummary from "@screenComponent/companies/company/companySummary";

function CompanyDirectory() {
  const dispatch = useDispatch();
  const table = useCompanyList();
  const selectedCompany = useSelector(selectSelectedCompany);

  return (
    <>
      <CompanySummary />

      <DataTable
        columns={COMPANY_COLUMNS}
        rows={table.rows}
        rowKey={(company) => company.id}
        search={table.search}
        sort={table.sort}
        columnFilters={table.columnFilters}
        pagination={table.pagination}
        pageItems={table.pageItems}
        rowRange={table.rowRange}
        activeFilterCount={table.activeFilterCount}
        isFiltered={table.isFiltered}
        onSearchChange={table.changeSearch}
        onSearchSubmit={table.submitSearch}
        onSortChange={table.changeSort}
        onColumnFilterChange={table.changeColumnFilter}
        onClearFilters={table.clearFilters}
        onPageChange={table.changePage}
        onLimitChange={table.changeLimit}
        onRetry={table.refresh}
        isLoading={table.isLoading}
        error={table.error}
        rowActions={(company) => (
          <CompanyActions
            company={company}
            onView={(row) => dispatch(companyDetailsOpened(row))}
          />
        )}
        searchPlaceholder="Search by company, email, phone, GST, or PAN..."
        rowNoun="companies"
        emptyIcon={Building2}
        emptyTitle="No companies found"
        emptyDescription="Company profiles will appear here when available."
        filteredEmptyDescription="Try changing your search or filters."
        fillHeight
      />

      <CompanyDetailSheet
        company={selectedCompany}
        onClose={() => dispatch(companyDetailsClosed())}
      />
    </>
  );
}

export default CompanyDirectory;
