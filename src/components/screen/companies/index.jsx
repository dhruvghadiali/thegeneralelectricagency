import { useDispatch, useSelector } from "react-redux";
import { Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import DataTable from "@/components/common/dataTable";
import { ROLE_PATHS } from "@Enums";
import {
  companyDetailsClosed,
  companyDetailsOpened,
} from "@Redux/company/company.slice";
import { selectSelectedCompany } from "@Redux/company/company.selector";
import { COMPANY_COLUMNS } from "@/components/screen/companies/company.columns";
import { useCompanyList } from "@/components/screen/companies/useCompanyList";

import CompanyActions from "@/components/screen/companies/companyActions";
import CompanyDetailSheet from "@/components/screen/companies/companyDetailSheet";
import CompanyHeader from "@/components/screen/companies/companyHeader";
import CompanySummary from "@/components/screen/companies/companySummary";

function Companies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = useCompanyList();
  const selectedCompany = useSelector(selectSelectedCompany);
  const role = useSelector((state) => state.auth.role);
  const canAddCompany = role === ROLE_PATHS.EMPLOYEE;

  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <CompanyHeader
        canAddCompany={canAddCompany}
        onAddCompany={() => navigate("/companies/new")}
      />
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
    </main>
  );
}

export default Companies;
