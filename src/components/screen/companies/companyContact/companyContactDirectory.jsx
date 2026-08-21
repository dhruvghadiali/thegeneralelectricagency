import { useDispatch, useSelector } from "react-redux";

import DataTable from "@commonComponent/dataTable";
import {
  contactDetailsClosed,
  contactDetailsOpened,
} from "@Redux/companyContact/companyContact.slice";
import { selectSelectedCompanyContact } from "@Redux/companyContact/companyContact.selector";
import {
  COMPANY_CONTACT_TABLE_CONFIG,
  CompanyContactTableActions,
  useCompanyContactTable,
} from "@Tables/companyContact";

import CompanyContactDetailSheet from "@screenComponent/companies/companyContact/companyContactDetailSheet";
import CompanyContactSummary from "@screenComponent/companies/companyContact/companyContactSummary";

function CompanyContactDirectory() {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectSelectedCompanyContact);
  const table = useCompanyContactTable();

  return (
    <>
      <CompanyContactSummary />

      <DataTable
        {...COMPANY_CONTACT_TABLE_CONFIG}
        rows={table.rows}
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
        rowActions={(contact) => (
          <CompanyContactTableActions
            contact={contact}
            onView={(row) => dispatch(contactDetailsOpened(row))}
          />
        )}
      />

      <CompanyContactDetailSheet
        contact={selectedContact}
        onClose={() => dispatch(contactDetailsClosed())}
      />
    </>
  );
}

export default CompanyContactDirectory;
