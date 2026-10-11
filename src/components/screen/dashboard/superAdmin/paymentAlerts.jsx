import { ArrowDownLeft, ArrowUpRight, CalendarClock } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shadcnComponent/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@commonComponent/appTable";
import { paymentAlerts } from "./dashboard.data";

const statusDetails = {
  overdue: { label: "Overdue", variant: "destructive" },
  "due-soon": { label: "Due soon", variant: "warning" },
  scheduled: { label: "Scheduled", variant: "success" },
};

function PaymentAlerts() {
  const attentionCount = paymentAlerts.filter(({ status }) => status !== "scheduled").length;

  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="border-b px-5 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle className="text-base">Payment alerts</CardTitle>
            <CardDescription className="mt-1.5">
              Upcoming supplier payments and client collections
            </CardDescription>
          </div>
          <Badge variant="outline">
            <CalendarClock className="mr-1.5 size-3.5" />
            {attentionCount} require attention
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="overflow-x-auto px-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-5">Company</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Payment date</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead className="pr-5 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentAlerts.map((alert) => {
              const isPayable = alert.direction === "payable";
              const DirectionIcon = isPayable ? ArrowUpRight : ArrowDownLeft;
              const status = statusDetails[alert.status];

              return (
                <TableRow key={alert.id}>
                  <TableCell className="pl-5">
                    <p className="font-medium">{alert.company}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{alert.relationship}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={isPayable ? "rounded-md bg-amber-500/10 p-1.5 text-amber-600" : "rounded-md bg-emerald-500/10 p-1.5 text-emerald-600"}>
                        <DirectionIcon className="size-3.5" />
                      </span>
                      <span>{isPayable ? "Payable" : "Receivable"}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">{alert.amount}</TableCell>
                  <TableCell>{alert.dueDate}</TableCell>
                  <TableCell className={alert.status === "overdue" ? "font-medium text-destructive" : "text-muted-foreground"}>
                    {alert.timing}
                  </TableCell>
                  <TableCell className="pr-5 text-right">
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default PaymentAlerts;
