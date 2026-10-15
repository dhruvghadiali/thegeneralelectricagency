import _ from "lodash";

import { cn } from "@/lib/utils";
import { Button } from "@shadcnComponent/button";

import HighlightedCompanyName from "@screenComponent/quotations/form/companyInformation/companyDirectory/highlightedCompanyName";

function CompanyDirectoryList({
  companies,
  companySearch,
  selectedCompanyId,
  onCompanySelect,
  onCompanyOptionKeyDown,
}) {
  return (
    <div
      className={cn(
        "divide-y",
        companySearch.trim() &&
          !selectedCompanyId &&
          "[&:not(:focus-within)>[data-company-option]:first-child]:bg-accent [&:not(:focus-within)>[data-company-option]:first-child]:text-accent-foreground",
      )}
      role="listbox"
      aria-label="Companies"
    >
      {companies.map((company, index) => (
        <Button
          key={company.id ?? `${company.name}-${index}`}
          type="button"
          variant="ghost"
          role="option"
          data-company-option
          aria-selected={selectedCompanyId === company.id}
          onClick={() => onCompanySelect(company)}
          onKeyDown={(event) => onCompanyOptionKeyDown(event, index)}
          className="h-auto w-full justify-start rounded-none px-6 py-3 text-left aria-selected:bg-accent aria-selected:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
        >
          <span className="min-w-0 truncate font-medium">
            <HighlightedCompanyName
              name={_.toUpper(company.name || "Unnamed company")}
              search={companySearch}
            />
          </span>
        </Button>
      ))}
    </div>
  );
}

export default CompanyDirectoryList;
