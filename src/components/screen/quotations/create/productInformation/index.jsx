import { useRef } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";

import {
  selectQuotationProductInformation,
  selectQuotationProductSearch,
  selectQuotationSelectedProduct,
} from "@Redux/quotation/quotation.selector";
import {
  quotationProductInformationSaved,
  quotationProductSearchChanged,
  quotationProductSelected,
} from "@Redux/quotation/quotation.slice";
import QuotationCompanySummaryCard from "@screenComponent/quotations/create/companyInformation/quotationCompanySummaryCard";
import { toQuotationProductFormValues } from "@screenComponent/quotations/create/form/createQuotation-frontend.payload";
import { QUOTATION_PRODUCT_INITIAL_VALUES } from "@screenComponent/quotations/create/form/createQuotation.initialValues";
import { quotationProductValidationSchema } from "@screenComponent/quotations/create/form/createQuotation.validation.schema";
import useProductKeyboardShortcuts from "@screenComponent/quotations/create/hooks/product";
import QuotationProductInformationCard from "@screenComponent/quotations/create/productInformation/quotationProductInformationCard";
import QuotationProductList from "@screenComponent/quotations/create/productInformation/quotationProductList";
import QuotationProductSummaryCard from "@screenComponent/quotations/create/productInformation/quotationProductSummaryCard";

function QuotationProductInformation({ companyInformation }) {
  const dispatch = useDispatch();
  const productSearch = useSelector(selectQuotationProductSearch);
  const selectedProduct = useSelector(selectQuotationSelectedProduct);
  const productInformation = useSelector(selectQuotationProductInformation);
  const productInputRef = useRef(null);
  const quantityInputRef = useRef(null);
  const sellingPriceInputRef = useRef(null);
  const discountInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const saveButtonRef = useRef(null);
  const productDirectoryRef = useRef(null);
  const productFieldRefs = {
    productInputRef,
    quantityInputRef,
    sellingPriceInputRef,
    discountInputRef,
    descriptionInputRef,
    saveButtonRef,
    productDirectoryRef,
  };
  const keyboard = useProductKeyboardShortcuts(productFieldRefs);
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
      dispatch(
        quotationProductInformationSaved({
          ...quotationProductValidationSchema.cast(values),
          productId: selectedProduct?.id ?? null,
        }),
      );
      formik.resetForm({
        values: { ...QUOTATION_PRODUCT_INITIAL_VALUES },
      });

      window.requestAnimationFrame(() => {
        productInputRef.current?.focus();
      });
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

  const selectProduct = (product) => {
    const productValues = toQuotationProductFormValues(product);

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

  return (
    <div className="grid w-full gap-6 lg:h-full lg:min-h-0 lg:grid-cols-[minmax(0,1fr)_minmax(22rem,0.8fr)]">
      <div className="flex min-w-0 flex-col gap-4 lg:min-h-0 lg:overflow-y-auto lg:pr-1">
        <QuotationCompanySummaryCard
          companyName={companyInformation.companyName}
          address={companyInformation.address}
        />
        {productInformation.length > 0 && (
          <QuotationProductSummaryCard products={productInformation} />
        )}
        <QuotationProductInformationCard
          formik={formik}
          fieldError={fieldError}
          fieldRefs={productFieldRefs}
          keyboard={keyboard}
          onProductNameChange={changeProductName}
        />
      </div>
      <QuotationProductList
        directoryRef={productDirectoryRef}
        selectedProduct={selectedProduct}
        onProductSelect={selectProduct}
        onProductOptionKeyDown={keyboard.handleProductOptionKeyDown}
      />
    </div>
  );
}

export default QuotationProductInformation;
