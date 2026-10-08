import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Check, ChevronsUpDown, Loader2, Search } from "lucide-react";

import { TABLE_DEFAULTS } from "@Enums";
import { fetchQuotationCompanies } from "@Redux/product/quotation/quotation.action";
import {
  selectQuotationCompany,
  selectQuotationCompanyOptions,
} from "@Redux/product/quotation/quotation.selector";
import {
  quotationCompanySelected,
  quotationReset,
} from "@Redux/product/quotation/quotation.slice";
import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { Popover, PopoverTrigger } from "@shadcnComponent/popover";
import CompanyPickerContent from "@screenComponent/products/dialogs/quotation/companyPickerContent";
import { cn } from "@/lib/utils";

function QuotationCompanyPicker({ containerRef, isOpen, products }) {
  const dispatch = useDispatch();
  const {
    items: companies,
    pagination,
    isLoading,
    isLoadingMore,
    error,
  } = useSelector(selectQuotationCompanyOptions);
  const selectedCompany = useSelector(selectQuotationCompany);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(TABLE_DEFAULTS.PAGE);

  useEffect(() => {
    if (!isOpen) return;

    setIsPickerOpen(false);
    setSearch("");
    setDebouncedSearch("");
    setPage(TABLE_DEFAULTS.PAGE);
    dispatch(quotationReset());
  }, [dispatch, isOpen, products]);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPage(TABLE_DEFAULTS.PAGE);
      setDebouncedSearch(search.trim());
    }, TABLE_DEFAULTS.SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const request = dispatch(
      fetchQuotationCompanies({ page, search: debouncedSearch }),
    );

    return () => request.abort();
  }, [debouncedSearch, dispatch, isOpen, page]);

  const selectCompany = (company) => {
    const isSelected = selectedCompany?.id === company.id;
    dispatch(quotationCompanySelected(isSelected ? null : company));
    setIsPickerOpen(false);
    setSearch("");
  };

  return (
    <div className="grid gap-2">
      <Label htmlFor="quotation-company">Select company</Label>
      <Popover open={isPickerOpen} onOpenChange={setIsPickerOpen}>
        <PopoverTrigger asChild>
          <Button
            id="quotation-company"
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={isPickerOpen}
            className="w-full justify-between font-normal"
          >
            <span className="truncate">
              {selectedCompany?.name || "Select a company"}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <CompanyPickerContent
          container={containerRef.current}
          className="w-(--radix-popover-trigger-width) p-0"
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

          <div className="max-h-64 overscroll-contain overflow-y-auto p-1">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 px-3 py-8 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Searching companies...
              </div>
            ) : error ? (
              <p className="px-3 py-8 text-center text-sm text-destructive">
                {error}
              </p>
            ) : companies.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-muted-foreground">
                No company found.
              </p>
            ) : (
              companies.map((company) => {
                const isSelected = selectedCompany?.id === company.id;

                return (
                  <Button
                    key={company.id}
                    type="button"
                    variant="ghost"
                    aria-pressed={isSelected}
                    onClick={() => selectCompany(company)}
                    className="h-auto w-full justify-start gap-2 px-3 py-2.5 text-left font-normal"
                  >
                    <Check
                      className={cn(
                        "size-4 shrink-0",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span className="min-w-0">
                      <span className="block truncate font-medium">
                        {company.name}
                      </span>
                      <span className="block truncate text-xs text-muted-foreground">
                        {isSelected
                          ? "Selected · click to clear"
                          : company.email ||
                            company.phone ||
                            "No contact information"}
                      </span>
                    </span>
                  </Button>
                );
              })
            )}
          </div>

          {pagination.page < pagination.totalPages && (
            <div className="border-t p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isLoadingMore}
                onClick={() => setPage((currentPage) => currentPage + 1)}
                className="w-full"
              >
                {isLoadingMore && <Loader2 className="size-4 animate-spin" />}
                {isLoadingMore ? "Loading..." : "Load more companies"}
              </Button>
            </div>
          )}
        </CompanyPickerContent>
      </Popover>
    </div>
  );
}

export default QuotationCompanyPicker;
