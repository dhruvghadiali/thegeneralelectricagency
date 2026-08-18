import { Building2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataTable from "@commonComponent/dataTable";
import { ROLE_PATHS } from "@Enums";
import { deleteCompany } from "@Redux/company/company.action";
import {
  companyDeleteClosed,
  companyDeleteOpened,
  companyDetailsClosed,
  companyDetailsOpened,
} from "@Redux/company/company.slice";
import {
  selectCompanyDeleteState,
  selectSelectedCompany,
} from "@Redux/company/company.selector";
import { COMPANY_COLUMNS } from "@screenComponent/companies/company/company.columns";
import { useCompanyList } from "@screenComponent/companies/company/useCompanyList";

import CompanyActions from "@screenComponent/companies/company/companyActions";
import CompanyDeleteDialog from "@screenComponent/companies/company/companyDeleteDialog";
import CompanyDetailSheet from "@screenComponent/companies/company/companyDetailSheet";
import CompanySummary from "@screenComponent/companies/company/companySummary";

function CompanyDirectory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = useCompanyList();
  const selectedCompany = useSelector(selectSelectedCompany);
  const { companyToDelete, isDeleting, deleteError } = useSelector(
    selectCompanyDeleteState,
  );
  const role = useSelector((state) => state.auth.role);
  const canManageCompany = role === ROLE_PATHS.EMPLOYEE;

  const handleDelete = async () => {
    if (!companyToDelete?.id) return;

    try {
      await dispatch(deleteCompany(companyToDelete.id)).unwrap();
      table.refresh();
    } catch {
      // The rejected thunk stores the display-ready error for the dialog.
    }
  };

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
            canManage={canManageCompany}
            onView={(row) => dispatch(companyDetailsOpened(row))}
            onEdit={(row) =>
              navigate(`/companies/${row.id}/edit`, {
                state: { company: row },
              })
            }
            onDelete={(row) => dispatch(companyDeleteOpened(row))}
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

      <CompanyDeleteDialog
        company={companyToDelete}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={() => dispatch(companyDeleteClosed())}
        onDelete={handleDelete}
      />
    </>
  );
}

export default CompanyDirectory;
