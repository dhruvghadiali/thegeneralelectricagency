import { useFormik } from "formik";
import { useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CREATE_QUOTATION_STEPS } from "@Enums";
import { toQuotationProductFormValues } from "@Redux/quotation/quotation-product-directory.api-response";
import { QUOTATION_PRODUCT_INITIAL_VALUES } from "@screenComponent/quotations/form/quotationForm.initialValues";
import { quotationProductValidationSchema } from "@screenComponent/quotations/form/quotationForm.validation.schema";
import {
  findDirectoryProductByName,
  haveSameProductName,
  toExistingProductFormValues,
} from "@screenComponent/quotations/form/productInformation/quotationProductInformation.utils";
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
  checkQuotationProductDuplicate,
  quotationProductAddAnotherPromptClosed,
  quotationProductAddAnotherPromptOpened,
  quotationProductDeleteCancelled,
  quotationProductDeleteRequested,
  quotationProductDuplicateCancelled,
  quotationProductEditingStarted,
  quotationProductInformationDeleted,
  quotationProductSearchChanged,
  quotationProductSelected,
  quotationProductSummaryClosed,
  quotationProductSummaryOpened,
  quotationStepChanged,
  saveQuotationProductInformation,
} from "@Redux/quotation/quotation.slice";

import useProductKeyboardShortcuts from "@screenComponent/quotations/keyboardShortcuts/productForm";
import useOpenQuotationSummaryKeyboardShortcut from "@screenComponent/quotations/keyboardShortcuts/productSummary/useOpenQuotationSummaryKeyboardShortcut";

function useQuotationProductInformation({ canNavigateToCompanyInformation }) {
  const dispatch = useDispatch();
  const productSearch = useSelector(selectQuotationProductSearch);
  const selectedProduct = useSelector(selectQuotationSelectedProduct);
  const directoryProducts = useSelector(selectQuotationProducts);
  const productInformation = useSelector(selectQuotationProductInformation);
  const isProductSummaryExpanded = useSelector(
    selectQuotationProductSummaryExpanded,
  );
  const editingProductIndex = useSelector(selectQuotationProductEditingIndex);
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
  useOpenQuotationSummaryKeyboardShortcut({
    enabled: productInformation.length > 0,
    onOpen: openQuotationSummary,
  });
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
        haveSameProductName(existingProduct.product, values.product);
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
            ? (existingProduct?.productSource ?? "product")
            : "product",
        hsnCode:
          matchingDirectoryProduct?.hsnCode ??
          (isExistingProductName ? existingProduct?.hsnCode : "") ??
          "",
      };
      const { saved } = dispatch(saveQuotationProductInformation(savedProduct));

      if (!saved) return;

      formik.resetForm({
        values: { ...QUOTATION_PRODUCT_INITIAL_VALUES },
      });
      dispatch(quotationProductAddAnotherPromptOpened());
    },
  });
  const fieldError = (field) =>
    formik.touched[field] && formik.errors[field] ? formik.errors[field] : null;

  const changeProductName = (event) => {
    formik.handleChange(event);
    dispatch(quotationProductSearchChanged(event.target.value));
  };

  const blurProductName = (event) => {
    formik.handleBlur(event);

    if (event.relatedTarget?.closest?.("[data-product-option]")) return;

    const matchingDirectoryProduct = findDirectoryProductByName(
      directoryProducts,
      event.currentTarget.value,
    );
    const duplicateProductIndex = dispatch(
      checkQuotationProductDuplicate({
        product: event.currentTarget.value,
        productId: selectedProduct?.id ?? matchingDirectoryProduct?.id ?? null,
      }),
    );

    if (duplicateProductIndex !== -1) return;

    if (matchingDirectoryProduct) {
      dispatch(quotationProductSelected(matchingDirectoryProduct));
    }
  };

  const selectProduct = (product) => {
    const productValues = toQuotationProductFormValues(product);
    const duplicateProductIndex = dispatch(
      checkQuotationProductDuplicate({
        ...productValues,
        productId: product.id ?? null,
      }),
    );

    if (duplicateProductIndex !== -1) return;

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

  return {
    addAnotherProduct,
    blurProductName,
    cancelDuplicateProduct,
    cancelProductDelete,
    changeProductName,
    deleteProduct,
    editDuplicateProduct,
    editProduct,
    fieldError,
    finishAddingProducts,
    formik,
    isAddAnotherDialogOpen,
    isProductSummaryExpanded,
    keyboard,
    openCompanyInformation,
    openProductInformation,
    openProductSummary,
    openQuotationSummary,
    pendingDeleteProductIndex,
    pendingDuplicateProductIndex,
    productFieldRefs,
    productInformation,
    requestProductDelete,
    selectProduct,
  };
}

export default useQuotationProductInformation;
