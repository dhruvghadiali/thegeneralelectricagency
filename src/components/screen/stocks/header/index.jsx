import { useSelector } from "react-redux";

import { isEmployeeCanManageProducts } from "@Redux/product/product.selector";
import ManageStockButton from "@screenComponent/stocks/header/manageStockButton";
import ReservedStocksButton from "@screenComponent/stocks/header/reservedStocksButton";

function StockHeader({ onManageStock, onReservedStocks }) {
  const canManageStock = useSelector(isEmployeeCanManageProducts);

  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
      {canManageStock && (
        <>
          <ManageStockButton onManageStock={onManageStock} />
          <ReservedStocksButton onReservedStocks={onReservedStocks} />
        </>
      )}
    </header>
  );
}

export default StockHeader;
