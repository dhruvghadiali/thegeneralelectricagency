import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { Button } from "@shadcnComponent/button";
import { Input } from "@shadcnComponent/input";
import { Label } from "@shadcnComponent/label";
import { Popover, PopoverTrigger } from "@shadcnComponent/popover";
import CompanyPickerContent from "@Forms/company/companyAssignment/components/companyPickerContent";

function CompanyPicker({
  open,
  search,
  companies,
  selectedCompany,
  pagination,
  isLoading,
  error,
  containerRef,
  onOpenChange,
  onSearchChange,
  onSelect,
  onLoadMore,
}) {
  return (
    <div className="grid min-w-0 gap-2">
      <Label htmlFor="company-assignment-company">Company</Label>
      <Popover open={open} onOpenChange={onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="company-assignment-company"
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-invalid={Boolean(error)}
            className="w-full min-w-0 max-w-full justify-between overflow-hidden bg-background font-normal"
          >
            <span className="min-w-0 flex-1 truncate text-left">
              {selectedCompany?.name ?? "Select company"}
            </span>
            <ChevronsUpDown className="size-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <CompanyPickerContent containerRef={containerRef}>
          <div className="border-b p-2">
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              onKeyDown={(event) => event.stopPropagation()}
              placeholder="Search company name..."
              aria-label="Search company by name"
              autoFocus
            />
          </div>
          <div className="max-h-64 overflow-y-auto p-1">
            {isLoading && companies.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">
                Loading companies...
              </p>
            ) : companies.length === 0 ? (
              <p className="p-6 text-center text-sm text-muted-foreground">
                No company found.
              </p>
            ) : (
              companies.map((company) => (
                <Button
                  key={company.id}
                  type="button"
                  variant="ghost"
                  onClick={() => onSelect(company)}
                  className="h-auto w-full justify-start gap-2 px-3 py-2 text-left font-normal"
                >
                  <Check
                    className={`size-4 shrink-0 ${selectedCompany?.id === company.id ? "opacity-100" : "opacity-0"}`}
                  />
                  <span className="truncate">{company.name}</span>
                </Button>
              ))
            )}
          </div>
          {pagination.page < pagination.totalPages && (
            <div className="border-t p-2">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={isLoading}
                onClick={onLoadMore}
                className="w-full"
              >
                {isLoading && <Loader2 className="size-4 animate-spin" />}
                Load more companies
              </Button>
            </div>
          )}
        </CompanyPickerContent>
      </Popover>
      {error && <p className="text-xs font-medium text-destructive">{error}</p>}
    </div>
  );
}

export default CompanyPicker;
