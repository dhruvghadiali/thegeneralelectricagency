import { useState } from "react";

export function useTallyComparisonSelection(companies) {
  const [selection, setSelection] = useState({ companies, ids: [] });
  const selectedRowKeys = selection.companies === companies ? selection.ids : [];
  function onRowSelectionChange(company, checked) {
    setSelection((previous) => {
      const ids = new Set(previous.companies === companies ? previous.ids : []);
      if (checked) ids.add(company._id);
      else ids.delete(company._id);
      return { companies, ids: [...ids] };
    });
  }
  return {
    selectedRowKeys,
    onRowSelectionChange,
    onAllRowsSelectionChange: (rows, checked) => {
      setSelection((previous) => {
        const ids = new Set(previous.companies === companies ? previous.ids : []);
        rows.forEach((company) => {
          if (checked) ids.add(company._id);
          else ids.delete(company._id);
        });
        return { companies, ids: [...ids] };
      });
    },
    clearSelection: () => setSelection({ companies, ids: [] }),
  };
}
