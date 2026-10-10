import { Building2, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import { fetchQuotationCompanies } from "@Redux/quotation/quotation.action";
import {
  selectQuotationCompanies,
  selectQuotationCompanyPagination,
  selectQuotationCompanyRequest,
  selectQuotationCompanySearch,
  selectQuotationSelectedCompany,
} from "@Redux/quotation/quotation.selector";
import { Button } from "@shadcnComponent/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function HighlightedCompanyName({ name, search }) {
  const searchValue = search.trim();

  if (!searchValue) return name;

  const matchingParts = name.split(
    new RegExp(`(${escapeRegExp(searchValue)})`, "gi"),
  );

  return matchingParts.map((part, index) =>
    part.toLocaleLowerCase() === searchValue.toLocaleLowerCase() ? (
      <mark
        key={`${part}-${index}`}
        className="rounded-sm bg-amber-200 px-0.5 text-foreground dark:bg-amber-500/35"
      >
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

function QuotationCompanyDirectory({
  directoryRef,
  onCompanySelect,
  onCompanyOptionKeyDown,
}) {
  const dispatch = useDispatch();
  const companies = useSelector(selectQuotationCompanies);
  const pagination = useSelector(selectQuotationCompanyPagination);
  const companySearch = useSelector(selectQuotationCompanySearch);
  const selectedCompany = useSelector(selectQuotationSelectedCompany);
  const { isLoading, error } = useSelector(selectQuotationCompanyRequest);
  const companyCountLabel = pagination.total
    ? `${companies.length} of ${pagination.total} companies`
    : `${companies.length} companies`;

  return (
    <Card
      ref={directoryRef}
      className="min-h-[32rem] overflow-hidden lg:h-full lg:min-h-0"
    >
      <CardHeader className="shrink-0 border-b">
        <CardTitle>Company directory</CardTitle>
        <CardDescription>{companyCountLabel}</CardDescription>
      </CardHeader>

      <CardContent
        className="min-h-0 flex-1 overflow-y-auto px-0"
        aria-live="polite"
      >
        {isLoading ? (
          <div className="flex h-full min-h-48 items-center justify-center gap-2 px-6 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            Loading companies...
          </div>
        ) : error ? (
          <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 px-6 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dispatch(fetchQuotationCompanies())}
            >
              Try again
            </Button>
          </div>
        ) : companies.length === 0 ? (
          <div className="flex h-full min-h-48 flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Building2 className="size-8" aria-hidden="true" />
              <p className="text-sm">No companies found.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => dispatch(fetchQuotationCompanies())}
            >
              Try again
            </Button>
          </div>
        ) : (
          <div className="divide-y" role="listbox" aria-label="Companies">
            {companies.map((company, index) => (
              <Button
                key={company.id ?? `${company.name}-${index}`}
                type="button"
                variant="ghost"
                role="option"
                data-company-option
                aria-selected={selectedCompany?.id === company.id}
                onClick={() => onCompanySelect(company)}
                onKeyDown={(event) =>
                  onCompanyOptionKeyDown(event, index)
                }
                className="h-auto w-full justify-start rounded-none px-6 py-3 text-left aria-selected:bg-accent aria-selected:text-accent-foreground focus-visible:bg-accent focus-visible:text-accent-foreground"
              >
                <span className="min-w-0 truncate font-medium">
                  <HighlightedCompanyName
                    name={company.name || "Unnamed company"}
                    search={companySearch}
                  />
                </span>
              </Button>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default QuotationCompanyDirectory;
