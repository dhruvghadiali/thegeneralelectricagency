import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataTable from "@commonComponent/dataTable";
import { ROUTE_BUILDERS } from "@routes/navigate";
import { isEmployeeCanManageCompanies } from "@Redux/company/company.selector";
import { companyDetailsOpened } from "@Redux/company/company.slice";
import CompanyDetailSheet from "@screenComponent/companies/company/sheet/companyDetailSheet";
import CompanyTableActions from "@screenComponent/companies/company/table/companyTableActions";
import { COMPANY_TABLE_CONFIG } from "@screenComponent/companies/company/table/companyTable.config";
import useCompanyTable from "@screenComponent/companies/company/table/useCompanyTable";

function CompanyTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = useCompanyTable();
  const canManage = useSelector(isEmployeeCanManageCompanies);

  const editCompany = (company) =>
    navigate(ROUTE_BUILDERS.companyEdit(company.id), {
      state: { company },
    });

  return (
    <>
      <DataTable
        {...COMPANY_TABLE_CONFIG}
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
          <CompanyTableActions
            company={company}
            canManage={canManage}
            onView={(row) => dispatch(companyDetailsOpened(row))}
            onEdit={editCompany}
          />
        )}
      />

      <CompanyDetailSheet />
    </>
  );
}

export default CompanyTable;
