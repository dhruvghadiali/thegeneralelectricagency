import { useNavigate } from "react-router-dom";

import { Button } from "@shadcnComponent/button";
import { ROUTES } from "@routes/navigate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";

function SalesOrderPage() {
  const navigate = useNavigate();

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="max-w-3xl">
        <p className="text-sm font-medium text-primary">Sales orders</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
          Add sales order
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter the customer, product, pricing, and payment information for the
          new sales order.
        </p>
      </section>

      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle>Sales order details</CardTitle>
          <CardDescription>
            The sales order form will be available here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(ROUTES.SALES)}
          >
            Cancel
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}

export default SalesOrderPage;
