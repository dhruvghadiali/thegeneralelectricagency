import { useEffect } from "react";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import FormErrorAlert from "@commonComponent/alert/formErrorAlert";
import { PRODUCT_INITIAL_VALUES } from "@Forms/product/product.initialValues";
import { createProduct, updateProduct } from "@Redux/product/product.action";
import { selectProductDialogState } from "@Redux/product/product.selector";
import { productDialogClosed } from "@Redux/product/product.slice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@shadcnComponent/card";
import ProductForm from "@screenComponent/products/productForm";

function ProductDetailsForm() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { productId } = useParams();
  const products = useSelector((state) => state.products.items);
  const { isCreating, createError, isUpdating, updateError } = useSelector(
    selectProductDialogState,
  );
  const isEdit = Boolean(productId);
  const product = isEdit
    ? (location.state?.product ??
      products.find((item) => item.id === productId))
    : PRODUCT_INITIAL_VALUES;

  useEffect(() => {
    dispatch(productDialogClosed());

    return () => dispatch(productDialogClosed());
  }, [dispatch]);

  if (isEdit && !product) {
    return <Navigate to="/products" replace />;
  }

  const saveProduct = async (values) => {
    try {
      if (isEdit) {
        await dispatch(updateProduct({ id: productId, values })).unwrap();
      } else {
        await dispatch(createProduct(values)).unwrap();
      }

      navigate("/products", { replace: true });
    } catch {
      // The product slice exposes a display-ready request error below.
    }
  };

  const title = isEdit ? "Edit product" : "Add product";

  return (
    <main className="mx-auto w-full max-w-6xl space-y-6 pb-8">
      <section className="space-y-5">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-primary">Product catalogue</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Enter the product identity, classification, pricing, tax, and
            discount information.
          </p>
        </div>
      </section>

      <Card className="shadow-none">
        <CardHeader className="border-b">
          <CardTitle>Product details</CardTitle>
          <CardDescription>
            Fields marked with an asterisk must be completed before saving.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormErrorAlert message={isEdit ? updateError : createError} />
          <ProductForm
            key={`${isEdit ? "edit" : "add"}-${product.id ?? "new"}`}
            product={product}
            onSubmit={saveProduct}
            onCancel={() => navigate("/products")}
            submitLabel={isEdit ? "Save changes" : "Add product"}
            isSubmitting={isEdit ? isUpdating : isCreating}
          />
        </CardContent>
      </Card>
    </main>
  );
}

export default ProductDetailsForm;
