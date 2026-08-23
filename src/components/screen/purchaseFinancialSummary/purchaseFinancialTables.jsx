import { Badge } from "@shadcnComponent/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commonComponent/appTable";
import { formatCurrency } from "@Tables/product/productTable.utils";

export function SupplierSpendTable({ suppliers }) {
  return (
    <div data-lenis-prevent className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Supplier</TableHead>
            <TableHead className="text-right">Orders</TableHead>
            <TableHead className="text-right">Spend</TableHead>
            <TableHead className="text-right">Outstanding</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier, index) => (
            <TableRow key={supplier.name}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-md bg-muted text-xs font-semibold text-muted-foreground">
                    {index + 1}
                  </span>
                  <span className="whitespace-nowrap font-medium">
                    {supplier.name}
                  </span>
                </div>
              </TableCell>
              <TableCell className="text-right tabular-nums">
                {supplier.purchases}
              </TableCell>
              <TableCell className="text-right font-medium tabular-nums">
                {formatCurrency(supplier.amount)}
              </TableCell>
              <TableCell className="text-right tabular-nums text-amber-700">
                {formatCurrency(supplier.amount - supplier.paid)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function CategorySpendTable({ categories, total }) {
  return (
    <div className="space-y-3">
      {categories.map((category) => {
        const percentage = total ? (category.amount / total) * 100 : 0;

        return (
          <div key={category.category} className="rounded-xl border p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{category.category}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {category.orders} purchase orders
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold tabular-nums">
                  {formatCurrency(category.amount)}
                </p>
                <Badge variant="secondary" className="mt-1">
                  {percentage.toFixed(1)}%
                </Badge>
              </div>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
