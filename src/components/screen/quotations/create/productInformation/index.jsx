import { useCallback, useRef } from "react";
import { useFormik } from "formik";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import {
  selectQuotationPendingDeleteProductIndex,
  selectQuotationPendingDuplicateProductIndex,
  selectQuotationProductAddAnotherDialogOpen,
  selectQuotationProductEditingIndex,
  selectQuotationProductInformation,
  selectQuotationProducts,
  selectQuotationProductSearch,
  selectQuotationProductSummaryExpanded,
  selectQuotationSelectedProduct,
} from "@Redux/quotation/quotation.selector";
import {
  quotationProductAddAnotherPromptClosed,
  quotationProductAddAnotherPromptOpened,
  quotationProductDeleteCancelled,
  quotationProductDeleteRequested,
  quotationProductDuplicateCancelled,
  quotationProductDuplicateRequested,
  quotationProductEditingStarted,
  quotationProductInformationDeleted,
  quotationProductInformationSaved,
  quotationProductInformationUpdated,
  quotationProductSearchChanged,
  quotationProductSelected,
  quotationProductSummaryClosed,
  quotationProductSummaryOpened,
  quotationStepChanged,
} from "@Redux/quotation/quotation.slice";
import { CREATE_QUOTATION_STEPS } from "@Enums";
import QuotationCompanySummaryCard from "@screenComponent/quotations/create/companyInformation/quotationCompanySummaryCard";
import { toQuotationProductFormValues } from "@screenComponent/quotations/create/form/createQuotation-frontend.payload";
import { QUOTATION_PRODUCT_INITIAL_VALUES } from "@screenComponent/quotations/create/form/createQuotation.initialValues";
import { quotationProductValidationSchema } from "@screenComponent/quotations/create/form/createQuotation.validation.schema";
import useProductKeyboardShortcuts from "@screenComponent/quotations/hooks/product";
import QuotationProductAddAnotherDialog from "@screenComponent/quotations/dialogs/quotationProductAddAnotherDialog";
import QuotationProductDuplicateDialog from "@screenComponent/quotations/dialogs/quotationProductDuplicateDialog";
import QuotationProductInformationCard from "@screenComponent/quotations/create/productInformation/quotationProductInformationCard";
import QuotationProductList from "@screenComponent/quotations/create/productInformation/quotationProductList";
import QuotationProductSummaryCard from "@screenComponent/quotations/create/productInformation/quotationProductSummaryCard";

function findDuplicateProductIndex(products, candidate, editingProductIndex) {
  const candidateName = _.toLower(_.trim(candidate.product));

  return products.findIndex((product, index) => {
    if (index === editingProductIndex) return false;

    const hasMatchingId =
      candidate.productId !== null &&
      candidate.productId !== undefined &&
      product.productId !== null &&
      product.productId !== undefined &&
      String(candidate.productId) === String(product.productId);
    const hasMatchingName =
      candidateName.length > 0 &&
      candidateName === _.toLower(_.trim(product.product));

    return hasMatchingId || hasMatchingName;
  });
}

function findDirectoryProductByName(products, productName) {
  const normalizedProductName = _.toLower(_.trim(productName));

  if (!normalizedProductName) return null;

  return (
    products.find(
      (product) =>
        _.toLower(_.trim(product.name)) === normalizedProductName,
    ) ?? null
  );
}

function toExistingProductFormValues(product = {}, directoryProducts = []) {
  const directoryProduct = directoryProducts.find(
    (item) => String(item.id) === String(product.productId),
  );

  return {
    product: product.product || directoryProduct?.name || "",
    sellingPrice: String(product.sellingPrice ?? ""),
    quantity: String(product.quantity ?? ""),
    discount: String(product.discount ?? "0"),
    description: product.description ?? directoryProduct?.description ?? "",
  };
}

function QuotationProductInformation({
  companyInformation,
  canNavigateToCompanyInformation = true,
}) {
  const dispatch = useDispatch();
  const productSearch = useSelector(selectQuotationProductSearch);
  const selectedProduct = useSelector(selectQuotationSelectedProduct);
  const directoryProducts = useSelector(selectQuotationProducts);
  const productInformation = useSelector(selectQuotationProductInformation);
  const isProductSummaryExpanded = useSelector(
    selectQuotationProductSummaryExpanded,
  );
  const editingProductIndex = useSelector(
    selectQuotationProductEditingIndex,
  );
  const pendingDeleteProductIndex = useSelector(
    selectQuotationPendingDeleteProductIndex,
  );
  const pendingDuplicateProductIndex = useSelector(
    selectQuotationPendingDuplicateProductIndex,
  );
  const isAddAnotherDialogOpen = useSelector(
    selectQuotationProductAddAnotherDialogOpen,
  );
  const productInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const sellingPriceInputRef = useRef(null);
  const discountInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const saveButtonRef = useRef(null);
  const productDirectoryRef = useRef(null);
  const openCompanyInformation = useCallback(() => {
    if (!canNavigateToCompanyInformation) return;

    dispatch(quotationProductSummaryClosed());
    dispatch(quotationStepChanged(CREATE_QUOTATION_STEPS.COMPANY_INFORMATION));
  }, [canNavigateToCompanyInformation, dispatch]);
  const openProductSummary = useCallback(() => {
    dispatch(quotationProductSummaryOpened());
  }, [dispatch]);
  const openProductInformation = useCallback(() => {
    dispatch(quotationProductSummaryClosed());

    window.requestAnimationFrame(() => {
      productInputRef.current?.focus();
    });
  }, [dispatch]);
  const openQuotationSummary = useCallback(() => {
    dispatch(quotationStepChanged(CREATE_QUOTATION_STEPS.QUOTATION_SUMMARY));
  }, [dispatch]);
  const productFieldRefs = {
    productInputRef,
    quantityInputRef,
    sellingPriceInputRef,
    discountInputRef,
    descriptionInputRef,
    saveButtonRef,
    productDirectoryRef,
  };
  const keyboard = useProductKeyboardShortcuts({
    ...productFieldRefs,
    hasProductSummary: productInformation.length > 0,
    onNavigateToCompanyInformation: openCompanyInformation,
    onOpenProductSummary: openProductSummary,
  });
  const formik = useFormik({
    initialValues: selectedProduct
      ? {
          ...QUOTATION_PRODUCT_INITIAL_VALUES,
          ...toQuotationProductFormValues(selectedProduct),
        }
      : {
          ...QUOTATION_PRODUCT_INITIAL_VALUES,
          product: productSearch,
        },
    validationSchema: quotationProductValidationSchema,
    onSubmit: (values) => {
      const existingProduct =
        editingProductIndex === null
          ? null
          : productInformation[editingProductIndex];
      const isExistingProductName =
        existingProduct &&
        _.toLower(_.trim(existingProduct.product)) ===
          _.toLower(_.trim(values.product));
      const matchingDirectoryProduct =
        selectedProduct ??
        (isExistingProductName
          ? null
          : findDirectoryProductByName(directoryProducts, values.product));
      const savedProduct = {
        ...(existingProduct ?? {}),
        ...quotationProductValidationSchema.cast(values),
        productId:
          matchingDirectoryProduct?.id ??
          (isExistingProductName ? existingProduct?.productId : null),
        productSource: matchingDirectoryProduct
          ? "product"
          : isExistingProductName
            ? existingProduct?.productSource ?? "product"
            : "product",
        hsnCode:
          matchingDirectoryProduct?.hsnCode ??
          (isExistingProductName ? existingProduct?.hsnCode : "") ??
          "",
      };
      const duplicateProductIndex = findDuplicateProductIndex(
        productInformation,
        savedProduct,
        editingProductIndex,
      );

      if (duplicateProductIndex !== -1) return;

      if (editingProductIndex === null) {
        dispatch(quotationProductInformationSaved(savedProduct));
      } else {
        dispatch(
          quotationProductInformationUpdated({
            index: editingProductIndex,
            product: savedProduct,
          }),
        );
      }

      formik.resetForm({
        values: { ...QUOTATION_PRODUCT_INITIAL_VALUES },
      });
      dispatch(quotationProductAddAnotherPromptOpened());
    },
  });
  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field]
      ? formik.errors[field]
      : null;

  const changeProductName = (event) => {
    formik.handleChange(event);
    dispatch(quotationProductSearchChanged(event.target.value));
  };

  const blurProductName = (event) => {
    formik.handleBlur(event);

    if (event.relatedTarget?.closest?.("[data-product-option]")) {
      return;
    }

    const matchingDirectoryProduct = findDirectoryProductByName(
      directoryProducts,
      event.currentTarget.value,
    );

    const duplicateProductIndex = findDuplicateProductIndex(
      productInformation,
      {
        product: event.currentTarget.value,
        productId:
          selectedProduct?.id ?? matchingDirectoryProduct?.id ?? null,
      },
      editingProductIndex,
    );

    if (duplicateProductIndex !== -1) {
      dispatch(quotationProductDuplicateRequested(duplicateProductIndex));
      return;
    }

    if (matchingDirectoryProduct) {
      dispatch(quotationProductSelected(matchingDirectoryProduct));
    }
  };

  const selectProduct = (product) => {
    const productValues = toQuotationProductFormValues(product);
    const duplicateProductIndex = findDuplicateProductIndex(
      productInformation,
      {
        ...productValues,
        productId: product.id ?? null,
      },
      editingProductIndex,
    );

    if (duplicateProductIndex !== -1) {
      dispatch(quotationProductDuplicateRequested(duplicateProductIndex));
      return;
    }

    dispatch(quotationProductSelected(product));
    formik.setValues(
      {
        ...formik.values,
        ...productValues,
      },
      true,
    );
    formik.setFieldTouched("product", true, false);

    window.requestAnimationFrame(() => {
      productInputRef.current?.focus();
      productInputRef.current?.setSelectionRange(
        productValues.product.length,
        productValues.product.length,
      );
    });
  };

  const editProduct = (index) => {
    const product = productInformation[index];

    if (!product) return;

    formik.resetForm({
      values: toExistingProductFormValues(product, directoryProducts),
    });
    dispatch(quotationProductEditingStarted(index));

    window.requestAnimationFrame(() => {
      productInputRef.current?.focus();
    });
  };

  const deleteProduct = (index) => {
    const wasEditingProduct = editingProductIndex === index;

    dispatch(quotationProductInformationDeleted(index));

    if (wasEditingProduct) {
      formik.resetForm({
        values: { ...QUOTATION_PRODUCT_INITIAL_VALUES },
      });
    }

    if (productInformation.length === 1) {
      window.requestAnimationFrame(() => {
        productInputRef.current?.focus();
      });
    }
  };

  const requestProductDelete = (index) => {
    dispatch(quotationProductDeleteRequested(index));
  };

  const cancelProductDelete = () => {
    dispatch(quotationProductDeleteCancelled());
  };

  const cancelDuplicateProduct = () => {
    dispatch(quotationProductDuplicateCancelled());

    window.requestAnimationFrame(() => {
      productInputRef.current?.focus();
    });
  };

  const editDuplicateProduct = () => {
    if (!productInformation[pendingDuplicateProductIndex]) return;

    editProduct(pendingDuplicateProductIndex);
  };

  const addAnotherProduct = () => {
    dispatch(quotationProductAddAnotherPromptClosed());

    window.requestAnimationFrame(() => {
      productInputRef.current?.focus();
    });
  };

  const finishAddingProducts = () => {
    dispatch(quotationProductAddAnotherPromptClosed());
    dispatch(quotationProductSummaryOpened());
  };

  return (
    <>
      <div className="grid w-full gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
        <div className="flex min-w-0 flex-col gap-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
          <QuotationCompanySummaryCard
            companyName={companyInformation.companyName}
            address={companyInformation.address}
            onClick={openCompanyInformation}
            isInteractive={canNavigateToCompanyInformation}
          />
          {productInformation.length > 0 && (
            <QuotationProductSummaryCard
              products={productInformation}
              isExpanded={isProductSummaryExpanded}
              onEdit={editProduct}
              pendingDeleteProductIndex={pendingDeleteProductIndex}
              onDeleteRequest={requestProductDelete}
              onDeleteCancel={cancelProductDelete}
              onDeleteConfirm={deleteProduct}
              onOpenProductSummary={openProductSummary}
              onNavigateToCompanyInformation={openCompanyInformation}
              onNavigateToProductInformation={openProductInformation}
              onOpenQuotationSummary={openQuotationSummary}
            />
          )}
          {!isProductSummaryExpanded && !isAddAnotherDialogOpen && (
            <QuotationProductInformationCard
              formik={formik}
              fieldError={fieldError}
              fieldRefs={productFieldRefs}
              keyboard={keyboard}
              onProductNameChange={changeProductName}
              onProductNameBlur={blurProductName}
            />
          )}
        </div>
        <QuotationProductList
          directoryRef={productDirectoryRef}
          selectedProduct={selectedProduct}
          onProductSelect={selectProduct}
          onProductOptionKeyDown={keyboard.handleProductOptionKeyDown}
        />
      </div>
      <QuotationProductAddAnotherDialog
        open={isAddAnotherDialogOpen}
        onNo={finishAddingProducts}
        onYes={addAnotherProduct}
      />
      <QuotationProductDuplicateDialog
        product={productInformation[pendingDuplicateProductIndex] ?? null}
        onNo={cancelDuplicateProduct}
        onYes={editDuplicateProduct}
      />
    </>
  );
}

export default QuotationProductInformation;
