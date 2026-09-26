import { Badge } from "@shadcnComponent/badge";

export function SyncResult({ sync }) {
  const hasFailure = sync.failureCount > 0;

  return (
    <div className="flex flex-wrap gap-1.5">
      {sync.successCount > 0 && (
        <Badge variant="success">{sync.successCount} successful</Badge>
      )}
      {hasFailure && (
        <Badge variant="destructive">{sync.failureCount} failed</Badge>
      )}
      {sync.syncInfo.length === 0 && <Badge variant="outline">No details</Badge>}
    </div>
  );
}

export function SyncDetails({ entries }) {
  if (entries.length === 0) return "—";

  return (
    <div className="min-w-72 space-y-1.5 py-1">
      {entries.map((entry, index) => {
        const changes = [
          entry.inserted ? `${entry.inserted} inserted` : "",
          entry.updated ? `${entry.updated} updated` : "",
          entry.deleted ? `${entry.deleted} deleted` : "",
        ].filter(Boolean);

        return (
          <div key={`${entry.statusCode}-${entry.companyId}-${index}`} className="text-xs">
            <span
              className={
                entry.status === "failure"
                  ? "font-medium text-destructive"
                  : "font-medium text-emerald-700 dark:text-emerald-400"
              }
            >
              {entry.statusCode || entry.status || "Info"}
            </span>
            <span className="text-muted-foreground"> · {entry.message || "No message"}</span>
            {(entry.companyName || entry.companyId || changes.length > 0) && (
              <span className="block truncate text-muted-foreground">
                {[entry.companyName || entry.companyId, ...changes]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
