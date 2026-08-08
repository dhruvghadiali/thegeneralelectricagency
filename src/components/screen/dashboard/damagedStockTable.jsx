import { TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Remove when API will return the data
import { damagedInventory } from "./dashboard.data";

function DamagedStockTable() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="border-b px-5 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><CardTitle className="text-base">Damaged stock</CardTitle><CardDescription className="mt-1.5">Items awaiting inspection or claim</CardDescription></div>
          <Badge variant="destructive"><TriangleAlert className="mr-1.5 size-3.5" />13 units</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-y sm:hidden">
          {damagedInventory.map((item) => (
            <article key={item.sku} className="space-y-3 p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0"><p className="font-medium leading-snug">{item.product}</p><p className="mt-1 text-xs text-muted-foreground">{item.sku}</p></div>
                <Badge className="shrink-0" variant="destructive">{item.quantity} damaged</Badge>
              </div>
              <div className="grid grid-cols-[1fr_auto] gap-4 rounded-lg bg-muted/45 p-3 text-xs">
                <div><p className="text-muted-foreground">Damage reason</p><p className="mt-1 font-medium">{item.reason}</p></div>
                <div className="text-right"><p className="text-muted-foreground">Reported</p><p className="mt-1 font-medium">{item.reported}</p></div>
              </div>
            </article>
          ))}
        </div>
        <div className="hidden overflow-x-auto sm:block">
          <Table><TableHeader><TableRow><TableHead className="pl-5">Product</TableHead><TableHead>Qty.</TableHead><TableHead>Reason</TableHead><TableHead className="pr-5 text-right">Reported</TableHead></TableRow></TableHeader>
            <TableBody>{damagedInventory.map((item) => <TableRow key={item.sku}><TableCell className="pl-5"><p className="font-medium">{item.product}</p><p className="mt-0.5 text-xs text-muted-foreground">{item.sku}</p></TableCell><TableCell className="font-medium">{item.quantity}</TableCell><TableCell>{item.reason}</TableCell><TableCell className="pr-5 text-right text-muted-foreground">{item.reported}</TableCell></TableRow>)}</TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default DamagedStockTable;
