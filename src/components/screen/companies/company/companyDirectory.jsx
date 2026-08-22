import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DataTable from "@commonComponent/dataTable";
import { ROLE_PATHS } from "@Enums";
import { deleteCompany, restoreCompany } from "@Redux/company/company.action";
import {
  companyDeleteClosed,
  companyDeleteOpened,
  companyDetailsOpened,
  companyRestoreClosed,
  companyRestoreOpened,
} from "@Redux/company/company.slice";
import {
  selectCompanyDeleteState,
  selectCompanyRestoreState,
} from "@Redux/company/company.selector";
import {
  COMPANY_TABLE_CONFIG,
  CompanyTableActions,
  useCompanyTable,
} from "@Tables/company";

import CompanyDeleteDialog from "@screenComponent/companies/company/dialogs/companyDeleteDialog";
import CompanyRestoreDialog from "@screenComponent/companies/company/dialogs/companyRestoreDialog";
import CompanyDetailSheet from "@screenComponent/companies/company/sheet/companyDetailSheet";

function CompanyDirectory() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const table = useCompanyTable();
  const { companyToDelete, isDeleting, deleteError } = useSelector(
    selectCompanyDeleteState,
  );
  const { companyToRestore, isRestoring, restoreError } = useSelector(
    selectCompanyRestoreState,
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

  const handleRestore = async (values) => {
    if (!companyToRestore?.id) return;

    try {
      await dispatch(
        restoreCompany({ id: companyToRestore.id, values }),
      ).unwrap();
      table.refresh();
    } catch {
      // The rejected thunk stores the display-ready error for the dialog.
    }
  };

  return (
    <>
      <DataTable
        {...COMPANY_TABLE_CONFIG}
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
        rowActions={(company) => (
          <CompanyTableActions
            company={company}
            canManage={canManageCompany}
            onView={(row) => dispatch(companyDetailsOpened(row))}
            onEdit={(row) =>
              navigate(`/companies/${row.id}/edit`, {
                state: { company: row },
              })
            }
            onDelete={(row) => dispatch(companyDeleteOpened(row))}
            onRestore={(row) => dispatch(companyRestoreOpened(row))}
          />
        )}
      />

      <CompanyDetailSheet />

      <CompanyDeleteDialog
        company={companyToDelete}
        isDeleting={isDeleting}
        error={deleteError}
        onClose={() => dispatch(companyDeleteClosed())}
        onDelete={handleDelete}
      />

      <CompanyRestoreDialog
        company={companyToRestore}
        isRestoring={isRestoring}
        error={restoreError}
        onClose={() => dispatch(companyRestoreClosed())}
        onRestore={handleRestore}
      />
    </>
  );
}

export default CompanyDirectory;
