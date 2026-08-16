import { Boxes } from "lucide-react";

import { Badge } from "@shadcnComponent/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@shadcnComponent/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@shadcnComponent/table";
import { inventory } from "./dashboard.data";

function InventoryTable() {
  return (
    <Card className="gap-0 overflow-hidden py-0 shadow-none">
      <CardHeader className="border-b px-5 py-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div><CardTitle className="text-base">Warehouse stock</CardTitle><CardDescription className="mt-1.5">Live inventory summary by product</CardDescription></div>
          <Badge variant="outline"><Boxes className="mr-1.5 size-3.5" />130 units</Badge>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="divide-y sm:hidden">
          {inventory.map((item) => {
            const low = item.stock <= item.reorder;
            return (
              <article key={item.sku} className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-medium leading-snug">{item.product}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.sku} · {item.category}</p>
                  </div>
                  <Badge className="shrink-0" variant={low ? "warning" : "success"}>{low ? "Low stock" : "In stock"}</Badge>
                </div>
                <div className="grid grid-cols-3 divide-x rounded-lg bg-muted/45 py-3 text-center">
                  <div><p className="text-[11px] text-muted-foreground">Available</p><p className="mt-1 font-semibold">{item.stock}</p></div>
                  <div><p className="text-[11px] text-muted-foreground">Reorder at</p><p className="mt-1 font-semibold">{item.reorder}</p></div>
                  <div><p className="text-[11px] text-muted-foreground">Stock value</p><p className="mt-1 font-semibold">{item.value}</p></div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="hidden overflow-x-auto sm:block">
          <Table><TableHeader><TableRow><TableHead className="pl-5">Product</TableHead><TableHead>Category</TableHead><TableHead>Available</TableHead><TableHead>Status</TableHead><TableHead className="pr-5 text-right">Stock value</TableHead></TableRow></TableHeader>
            <TableBody>{inventory.map((item) => { const low = item.stock <= item.reorder; return <TableRow key={item.sku}><TableCell className="pl-5"><p className="font-medium">{item.product}</p><p className="mt-0.5 text-xs text-muted-foreground">{item.sku}</p></TableCell><TableCell>{item.category}</TableCell><TableCell className="font-medium">{item.stock}</TableCell><TableCell><Badge variant={low ? "warning" : "success"}>{low ? "Low stock" : "In stock"}</Badge></TableCell><TableCell className="pr-5 text-right font-medium">{item.value}</TableCell></TableRow>; })}</TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default InventoryTable;
