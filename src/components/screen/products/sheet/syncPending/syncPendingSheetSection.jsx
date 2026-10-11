import { createElement } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@shadcnComponent/card";

function SyncPendingSheetSection({ icon, title, description, children }) {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="border-b px-4 py-4">
        <div className="flex items-start gap-3">
          <span className="rounded-lg bg-primary/10 p-2 text-primary">
            {createElement(icon, {
              className: "size-4",
              "aria-hidden": true,
            })}
          </span>
          <div>
            <CardTitle className="text-base">{title}</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 py-4">{children}</CardContent>
    </Card>
  );
}

export default SyncPendingSheetSection;
