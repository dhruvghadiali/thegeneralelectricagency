import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import {
  selectCanManageProducts,
  selectSelectedProducts,
} from "@Redux/product/product.selector";

import ProductSummary from "@screenComponent/products/header/productSummary";
import ProductAddButton from "@screenComponent/products/header/productAddButton";
import ProductQuotationButton from "@screenComponent/products/header/productQuotationButton";

function ProductHeader({ onViewQuotation }) {
  const canManage = useSelector(selectCanManageProducts);
  const selectedProducts = useSelector(selectSelectedProducts);
  const navigate = useNavigate();

  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:justify-end">
      <h1 className="sr-only">Products</h1>
      <ProductSummary />
      {canManage && (
        <>
          <ProductQuotationButton
            selectedCount={selectedProducts.length}
            onViewQuotation={onViewQuotation}
          />
          <ProductAddButton onAddProduct={() => navigate(ROUTES.PRODUCT_NEW)} />
        </>
      )}
    </header>
  );
}

export default ProductHeader;
