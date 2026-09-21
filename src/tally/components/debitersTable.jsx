import { BookOpen, RotateCw, TriangleAlert } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commonComponent/appTable";
import { Button } from "@shadcnComponent/button";
import { Card } from "@shadcnComponent/card";

const DETAIL_COLUMNS = [
  ["Mailing details", [["mailingName", "Name"], ["address", "Address"], ["state", "State"], ["country", "Country"], ["pincode", "Pincode"]]],
  ["Contact details", [["contactPerson", "Contact"], ["mobile", "Mobile"], ["phone", "Phone"], ["email", "Email"]]],
  ["Tax registration", [["pan", "PAN / IT No."], ["registrationType", "Registration type"], ["gstin", "GSTIN / UIN"]]],
  ["Ledger settings", [["billWise", "Bill-by-bill"], ["creditPeriod", "Credit period"], ["checkCreditDays", "Check credit days"], ["interestCalculation", "Interest calculation"], ["tdsDeductible", "TDS deductible"], ["tcsApplicable", "TCS applicable"]]],
];

function DebitersTableSkeleton() {
  return (
    <div className="divide-y" aria-label="Loading ledgers">
      {Array.from({ length: 5 }, (_, index) => (
        <div key={index} className="flex items-center gap-6 px-4 py-5">
          <span className="h-3 w-2/5 animate-pulse rounded bg-muted" />
          <span className="hidden h-3 w-1/4 animate-pulse rounded bg-muted sm:block" />
          <span className="ml-auto h-3 w-24 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  );
}

function DebitersTableMessage({ error, onRetry, isFiltered, emptyMessage }) {
  const Icon = error ? TriangleAlert : BookOpen;

  return (
    <div className="px-4 py-16 text-center">
      <Icon
        className={
          error
            ? "mx-auto size-8 text-destructive/70"
            : "mx-auto size-8 text-muted-foreground/50"
        }
        aria-hidden="true"
      />
      <p className="mt-3 font-medium">
        {error ? "Could not load Tally ledgers" : "No ledgers found"}
      </p>
      <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
        {error || (isFiltered
          ? "No ledgers match your search. Try another name, group, or balance."
          : emptyMessage || "No ledgers with address, tax, or contact details were found. Make sure the company is open and the connector uses the updated XML request.")}
      </p>
      {error && (
        <Button type="button" variant="outline" onClick={onRetry} className="mt-4">
          <RotateCw className="size-4" />
          Try again
        </Button>
      )}
    </div>
  );
}

function DebitersTable({ debiters, error, isLoading, onRetry, isFiltered, emptyMessage }) {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      {isLoading && debiters.length === 0 ? (
        <DebitersTableSkeleton />
      ) : error ? (
        <DebitersTableMessage error={error} onRetry={onRetry} />
      ) : debiters.length === 0 ? (
        <DebitersTableMessage onRetry={onRetry} isFiltered={isFiltered} emptyMessage={emptyMessage} />
      ) : (
        <div data-lenis-prevent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-56">Ledger name</TableHead>
                <TableHead className="min-w-48">Parent group</TableHead>
                {DETAIL_COLUMNS.map(([title]) => (
                  <TableHead key={title} className="min-w-72">{title}</TableHead>
                ))}
                <TableHead className="min-w-40 text-right">Opening balance</TableHead>
                <TableHead className="min-w-40 text-right">
                  Closing balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={isLoading ? "opacity-60" : undefined}>
              {debiters.map((debiter) => (
                <TableRow key={debiter.id}>
                  <TableCell className="align-top font-medium">
                    {debiter.name}
                    {debiter.alias && <p className="mt-1 text-xs text-muted-foreground">Alias: {debiter.alias}</p>}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {debiter.parent || "—"}
                  </TableCell>
                  {DETAIL_COLUMNS.map(([title, fields]) => (
                    <TableCell key={title} className="align-top">
                      <dl className="space-y-2 text-xs">
                        {fields.map(([key, label]) => (
                          <div key={key}>
                            <dt className="text-muted-foreground">{label}</dt>
                            <dd className="max-w-80 whitespace-pre-line break-words">{debiter[key] || "—"}</dd>
                          </div>
                        ))}
                      </dl>
                    </TableCell>
                  ))}
                  <TableCell className="text-right align-top font-medium tabular-nums">
                    {debiter.openingBalance || "—"}
                  </TableCell>
                  <TableCell className="text-right font-medium tabular-nums">
                    {debiter.closingBalance || "—"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}

export default DebitersTable;
