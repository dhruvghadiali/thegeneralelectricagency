import StockHeader from "@screenComponent/stocks/header";
import StockProductTable from "@screenComponent/stocks/table";

function Stocks() {
  return (
    <main className="flex w-full flex-col gap-6 pb-2 roomy:h-full roomy:min-h-0">
      <StockHeader />
      <StockProductTable />
    </main>
  );
}

export default Stocks;
