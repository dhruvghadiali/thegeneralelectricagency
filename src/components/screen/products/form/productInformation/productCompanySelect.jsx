import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";

import _ from "lodash";

import { TABLE_DEFAULTS } from "@Enums";
import { Input } from "@shadcnComponent/input";
import { Button } from "@shadcnComponent/button";
import { fetchSystemCompanies } from "@Redux/company/systemCompanies/systemCompanies.action";
import { selectSystemCompanyOptions } from "@Redux/company/systemCompanies/systemCompanies.selector";
import {
  systemCompaniesReset,
  systemCompanyPageChanged,
  systemCompanySearchChanged,
  systemCompanySelected,
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
    selectedCompany: storedSelectedCompany,
    totalPages,
  } = useSelector(selectSystemCompanyOptions);
  const selectedCompany =
    _.find(companies, { id: formik.values.agency }) ??
    (storedSelectedCompany?.id === formik.values.agency
      ? storedSelectedCompany
      : null) ??
    (formik.values.agency
      ? {
          id: formik.values.agency,
          name: formik.values.agencyName || formik.values.agency,
          addresses: [],
        }
      : null);
  const companyOptions = selectedCompany
    ? [
        selectedCompany,
        ..._.reject(companies, { id: selectedCompany.id }),
      ]
    : companies;

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
    const isSelected = formik.values.agency === company.id;

    formik.setFieldValue("agency", isSelected ? "" : company.id, true);
    formik.setFieldValue("agencyName", isSelected ? "" : company.name, false);
    formik.setFieldTouched("agency", true, false);
    dispatch(systemCompanySelected(isSelected ? null : company));
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
        className="flex max-h-[min(24rem,var(--radix-popover-content-available-height))] w-[var(--radix-popover-trigger-width)] flex-col overflow-hidden p-0"
      >
        <div className="shrink-0 border-b p-2">
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

        <div
          className="min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain p-1 [scrollbar-gutter:stable]"
          onWheelCapture={(event) => event.stopPropagation()}
        >
          {isLoading && companyOptions.length === 0 ? (
            <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Loading companies...
            </div>
          ) : loadError ? (
            <p className="px-3 py-8 text-center text-sm text-destructive">
              {loadError}
            </p>
          ) : companyOptions.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No active company found.
            </p>
          ) : (
            companyOptions.map((company) => (
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
          <div className="shrink-0 border-t p-2">
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
