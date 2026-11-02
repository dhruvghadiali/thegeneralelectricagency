import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, ChevronsUpDown, Loader2, Search, X } from "lucide-react";

import { TABLE_DEFAULTS } from "@Enums";
import { Input } from "@shadcnComponent/input";
import { Button } from "@shadcnComponent/button";
import { fetchSystemCompanies } from "@Redux/company/systemCompanies/systemCompanies.action";
import { selectSystemCompanyOptions } from "@Redux/company/systemCompanies/systemCompanies.selector";
import {
  systemCompaniesReset,
  systemCompanyPageChanged,
  systemCompanySearchChanged,
} from "@Redux/company/systemCompanies/systemCompanies.slice";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";
function ProductCompanySelect({ formik, error }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const {
    companies,
    isLoading,
    loadError,
    page,
    search,
    totalPages,
  } = useSelector(selectSystemCompanyOptions);

  useEffect(() => {
    if (!open) return undefined;

    let request;
    const timeoutId = window.setTimeout(() => {
      request = dispatch(fetchSystemCompanies({ page, search }));
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timeoutId);
      request?.abort();
    };
  }, [dispatch, open, page, search]);

  useEffect(
    () => () => dispatch(systemCompaniesReset()),
    [dispatch],
  );

  const selectCompany = (company) => {
    formik.setFieldValue("agency", company.id, true);
    formik.setFieldValue("agencyName", company.name, false);
    formik.setFieldTouched("agency", true, false);
    dispatch(systemCompanySearchChanged(""));
    setOpen(false);
  };

  const clearCompany = () => {
    formik.setFieldValue("agency", "", true);
    formik.setFieldValue("agencyName", "", false);
    formik.setFieldTouched("agency", true, false);
    dispatch(systemCompanySearchChanged(""));
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) formik.setFieldTouched("agency", true, true);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          id="product-agency"
          type="button"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "product-agency-error" : undefined}
          className="w-full justify-between font-normal aria-invalid:border-destructive aria-invalid:ring-destructive/20"
        >
          <span
            className={
              formik.values.agencyName || formik.values.agency
                ? "truncate"
                : "truncate text-muted-foreground"
            }
          >
            {formik.values.agencyName ||
              formik.values.agency ||
              "Select a company"}
          </span>
          <ChevronsUpDown
            className="size-4 shrink-0 opacity-50"
            aria-hidden="true"
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <div className="border-b p-2">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <Input
              value={search}
              onChange={(event) =>
                dispatch(systemCompanySearchChanged(event.target.value))
              }
              placeholder="Search company name..."
              aria-label="Search company by name"
              className="pl-9"
              autoFocus
            />
          </div>
        </div>

        {(formik.values.agency || formik.values.agencyName) && (
          <div className="border-b p-1">
            <Button
              type="button"
              variant="ghost"
              onClick={clearCompany}
              className="h-auto w-full justify-start gap-2 px-3 py-2 text-muted-foreground"
            >
              <X className="size-4" aria-hidden="true" />
              Clear selection
            </Button>
          </div>
        )}

        <div className="max-h-64 overflow-y-auto p-1">
          {isLoading && companies.length === 0 ? (
            <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Loading companies...
            </div>
          ) : loadError ? (
            <p className="px-3 py-8 text-center text-sm text-destructive">
              {loadError}
            </p>
          ) : companies.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No active company found.
            </p>
          ) : (
            companies.map((company) => (
              <Button
                key={company.id}
                type="button"
                variant="ghost"
                onClick={() => selectCompany(company)}
                className="h-auto w-full justify-start gap-2 px-3 py-2.5 text-left font-normal"
              >
                <Check
                  className={`size-4 shrink-0 ${
                    formik.values.agency === company.id
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                  aria-hidden="true"
                />
                <span className="flex min-w-0 flex-1 flex-col items-start gap-0.5">
                  <span className="w-full truncate">{company.name}</span>
                  {company.addresses.length > 0 && (
                    <span className="w-full truncate text-xs text-muted-foreground">
                      {company.addresses
                        .map((address) => address.address)
                        .filter(Boolean)
                        .join(" • ")}
                    </span>
                  )}
                </span>
              </Button>
            ))
          )}
        </div>

        {page < totalPages && (
          <div className="border-t p-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              disabled={isLoading}
              onClick={() =>
                dispatch(systemCompanyPageChanged(page + 1))
              }
              className="w-full"
            >
              {isLoading && (
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              )}
              {isLoading ? "Loading..." : "Load more companies"}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default ProductCompanySelect;
