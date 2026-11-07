import { useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { isEmployeeCanManageProducts } from "@Redux/product/product.selector";

import ProductSummary from "@screenComponent/products/header/productSummary";
import ProductAddButton from "@screenComponent/products/header/productAddButton";
import useProductKeyboardShortcut from "@screenComponent/products/keyboardShortcuts/productList/useProductKeyboardShortcut";

function ProductHeader() {
  const canCreate = useSelector(isEmployeeCanManageProducts);
  const navigate = useNavigate();
  const newProductButtonRef = useRef(null);

  useProductKeyboardShortcut(newProductButtonRef, { enabled: canCreate });

  return (
    <header className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
      {canCreate && (
        <ProductAddButton
          buttonRef={newProductButtonRef}
          onAddProduct={() => navigate(ROUTES.PRODUCT_NEW)}
        />
      )}
      <ProductSummary />
    </header>
  );
}

export default ProductHeader;
