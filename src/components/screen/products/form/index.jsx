import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { ROUTES } from "@routes/navigate";
import { productTableSelectors } from "@Redux/product/getProductList/getProductList.selector";
import { productCreateStateCleared } from "@Redux/product/createProduct/createProduct.slice";
import {
  migrateFromTallyFormValuesCleared,
  migrateFromTallyFormValuesSet,
  migrateFromTallyProductIdSet,
} from "@Redux/product/migrateFromTally/migrateFromTally.slice";
import {
  productUpdateFormValuesSet,
  productUpdateProductIdSet,
  productUpdateStateCleared,
} from "@Redux/product/updateProduct/updateProduct.slice";
import {
  checkIsTallyCollectionProduct,
  toMigrateFromTallyFormValues,
  toMigrateFromTallyProductId,
} from "@Redux/product/migrateFromTally/migrateFromTally.form-payload";
import {
  toProductInformationFormValues,
  toProductInformationProductId,
} from "@Redux/product/updateProduct/updateProduct.form-payload";

import ProductFormCard from "@screenComponent/products/form/productFormCard";

function ProductFormScreen(props) {
  const { initialProductId = null, initialIsTallyCollectionProduct = null } =
    props;

  const dispatch = useDispatch();
  const location = useLocation();
  const { productId: routeProductId } = useParams();
  const products = useSelector(productTableSelectors.selectItems);

  const productId = initialProductId ?? routeProductId ?? null;
  const product = productId
    ? (location.state?.product ??
      products.find((item) => item.id === productId))
    : null;
  const isTallyCollectionProduct = product
    ? checkIsTallyCollectionProduct(product)
    : initialIsTallyCollectionProduct;

  useEffect(() => {
    dispatch(productCreateStateCleared());

    if (isTallyCollectionProduct === true) {
      dispatch(productUpdateStateCleared());
      dispatch(
        migrateFromTallyProductIdSet(toMigrateFromTallyProductId(product)),
      );
      dispatch(
        migrateFromTallyFormValuesSet(toMigrateFromTallyFormValues(product)),
      );
    } else {
      dispatch(migrateFromTallyFormValuesCleared());
      dispatch(
        productUpdateProductIdSet(
          product ? toProductInformationProductId(product) : productId,
        ),
      );
      dispatch(
        productUpdateFormValuesSet(
          product ? toProductInformationFormValues(product) : {},
        ),
      );
    }

    return () => {
      dispatch(productCreateStateCleared());
      dispatch(migrateFromTallyFormValuesCleared());
      dispatch(productUpdateStateCleared());
    };
  }, [dispatch, isTallyCollectionProduct, product, productId]);

  if (productId && !product) {
    return <Navigate to={ROUTES.PRODUCTS} replace />;
  }

  return (
    <main className="mx-auto flex h-full min-h-0 w-full max-w-6xl flex-1 pb-2">
      <ProductFormCard />
    </main>
  );
}

export default ProductFormScreen;
