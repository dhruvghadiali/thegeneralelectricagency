import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { productTableSelectors } from "@Redux/product/product.selector";
import {
  isTallyCollectionProduct,
  toProductInformationFormValues,
} from "@Redux/product/migrateFromTally/migrateFromTally.form-payload";
import {
  migrateFromTallyFormValuesCleared,
  migrateFromTallyFormValuesSet,
} from "@Redux/product/migrateFromTally/migrateFromTally.slice";

import ProductFormCard from "@screenComponent/products/form/productFormCard";

function ProductFormScreen() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { productId } = useParams();
  const products = useSelector(productTableSelectors.selectItems);
  const product =
    location.state?.product ??
    products.find((item) => item.id === productId);

  useEffect(() => {
    if (isTallyCollectionProduct(product)) {
      dispatch(
        migrateFromTallyFormValuesSet(
          toProductInformationFormValues(product),
        ),
      );
    } else {
      dispatch(migrateFromTallyFormValuesCleared());
    }

    return () => dispatch(migrateFromTallyFormValuesCleared());
  }, [dispatch, product]);

  if (!product) {
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  return (
    <main className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 pb-2">
      <ProductFormCard />
    </main>
  );
}

export default ProductFormScreen;
