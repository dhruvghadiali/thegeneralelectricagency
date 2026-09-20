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

function DebitersTableSkeleton() {
  return (
    <div className="divide-y" aria-label="Loading debiters">
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

function DebitersTableMessage({ error, onRetry }) {
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
        {error ? "Could not load Tally debiters" : "No debiters found"}
      </p>
      <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
        {error || "Tally did not return any ledgers under Sundry Debtors."}
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

function DebitersTable({ debiters, error, isLoading, onRetry }) {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      {isLoading && debiters.length === 0 ? (
        <DebitersTableSkeleton />
      ) : error ? (
        <DebitersTableMessage error={error} onRetry={onRetry} />
      ) : debiters.length === 0 ? (
        <DebitersTableMessage onRetry={onRetry} />
      ) : (
        <div data-lenis-prevent className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="min-w-56">Ledger name</TableHead>
                <TableHead className="min-w-48">Parent group</TableHead>
                <TableHead className="min-w-40 text-right">
                  Closing balance
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className={isLoading ? "opacity-60" : undefined}>
              {debiters.map((debiter) => (
                <TableRow key={debiter.id}>
                  <TableCell className="font-medium">{debiter.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {debiter.parent || "—"}
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
