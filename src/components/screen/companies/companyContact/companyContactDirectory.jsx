import { useDispatch, useSelector } from "react-redux";
import { ContactRound } from "lucide-react";

import DataTable from "@commonComponent/dataTable";
import {
  contactDetailsClosed,
  contactDetailsOpened,
} from "@Redux/companyContact/companyContact.slice";
import { selectSelectedCompanyContact } from "@Redux/companyContact/companyContact.selector";
import { COMPANY_CONTACT_COLUMNS } from "@screenComponent/companies/companyContact/companyContact.columns";
import { useCompanyContactList } from "@screenComponent/companies/companyContact/useCompanyContactList";

import CompanyContactActions from "@screenComponent/companies/companyContact/companyContactActions";
import CompanyContactDetailSheet from "@screenComponent/companies/companyContact/companyContactDetailSheet";
import CompanyContactSummary from "@screenComponent/companies/companyContact/companyContactSummary";

function CompanyContactDirectory() {
  const dispatch = useDispatch();
  const selectedContact = useSelector(selectSelectedCompanyContact);
  const table = useCompanyContactList();

  return (
    <>
      <CompanyContactSummary />

      <DataTable
        columns={COMPANY_CONTACT_COLUMNS}
        rows={table.rows}
        rowKey={(contact) => contact.id}
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
          <CompanyContactActions
            contact={contact}
            onView={(row) => dispatch(contactDetailsOpened(row))}
          />
        )}
        searchPlaceholder="Search contacts or companies..."
        rowNoun="contacts"
        emptyIcon={ContactRound}
        emptyTitle="No contact persons found"
        emptyDescription="Company contact persons will appear here when available."
        filteredEmptyDescription="Try changing your search or filters."
        fillHeight
      />

      <CompanyContactDetailSheet
        contact={selectedContact}
        onClose={() => dispatch(contactDetailsClosed())}
      />
    </>
  );
}

export default CompanyContactDirectory;
