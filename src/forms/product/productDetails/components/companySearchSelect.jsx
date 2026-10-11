import { useState } from "react";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";

import { Input } from "@shadcnComponent/input";
import { Button } from "@shadcnComponent/button";
import { useCompanyOptions } from "@Forms/product/productDetails/hooks/useCompanyOptions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@shadcnComponent/popover";

function CompanySearchSelect({ formik, error, isBusy }) {
  const [open, setOpen] = useState(false);
  const {
    companies,
    isLoading,
    loadError,
    page,
    search,
    setPage,
    setSearch,
    totalPages,
  } = useCompanyOptions(open);

  const selectCompany = (company) => {
    formik.setFieldValue("agency", company.id, true);
    formik.setFieldValue("agencyName", company.name, false);
    formik.setFieldTouched("agency", true, false);
    setSearch("");
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
          disabled={isBusy}
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
          <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="w-[var(--radix-popover-trigger-width)] p-0"
      >
        <div className="border-b p-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search company name..."
              aria-label="Search company by name"
              className="pl-9"
              autoFocus
            />
          </div>
        </div>

        <div className="max-h-64 overflow-y-auto p-1">
          {isLoading && companies.length === 0 ? (
            <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
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
                />
                <span className="truncate">{company.name}</span>
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
              onClick={() => setPage((current) => current + 1)}
              className="w-full"
            >
              {isLoading && <Loader2 className="size-4 animate-spin" />}
              {isLoading ? "Loading..." : "Load more companies"}
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export default CompanySearchSelect;
