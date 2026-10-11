import { Badge } from "@shadcnComponent/badge";

export function SyncedBy({ user = {} }) {
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ");

  return (
    <div>
      <p className="font-medium">{name || user.username || "Unknown user"}</p>
      <p className="text-xs text-muted-foreground">
        {[user.emp_id, user.username].filter(Boolean).join(" · ") || "—"}
      </p>
    </div>
  );
}

export function CountChange({ beforeCount, afterCount }) {
  const change = (Number(afterCount) || 0) - (Number(beforeCount) || 0);

  return (
    <span
      className={
        change > 0
          ? "font-medium text-emerald-700 dark:text-emerald-400"
          : change < 0
            ? "font-medium text-destructive"
            : "text-muted-foreground"
      }
    >
      {change > 0 ? "+" : ""}
      {change}
    </span>
  );
}

export function SyncResult({ entries = [] }) {
  const successCount = entries.filter(
    (entry) => entry.status === "success",
  ).length;
  const failureCount = entries.filter(
    (entry) => entry.status === "failure",
  ).length;

  return (
    <div className="flex flex-wrap gap-1.5">
      {successCount > 0 && (
        <Badge variant="success">{successCount} successful</Badge>
      )}
      {failureCount > 0 && (
        <Badge variant="destructive">{failureCount} failed</Badge>
      )}
      {entries.length === 0 && <Badge variant="outline">No details</Badge>}
    </div>
  );
}

export function SyncDetails({ entries = [] }) {
  if (entries.length === 0) return "—";

  return (
    <div className="min-w-72 space-y-1.5 py-1">
      {entries.map((entry, index) => {
        const changes = [
          ["inserted", entry.inserted],
          ["updated", entry.updated],
          ["deleted", entry.deleted],
        ]
          .filter(([, count]) => count != null)
          .map(([label, count]) => `${count} ${label}`);

        return (
          <div
            key={`${entry.company_id ?? "entry"}-${index}`}
            className="text-xs"
          >
            <span
              className={
                entry.status === "failure"
                  ? "font-medium text-destructive"
                  : "font-medium text-emerald-700 dark:text-emerald-400"
              }
            >
              {entry.status_code ?? entry.status ?? "Info"}
            </span>
            <span className="text-muted-foreground">
              {" "}
              · {entry.message || "No message"}
            </span>
            {(entry.company_id || changes.length > 0) && (
              <span className="block text-muted-foreground">
                {[entry.company_id, ...changes].filter(Boolean).join(" · ")}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
