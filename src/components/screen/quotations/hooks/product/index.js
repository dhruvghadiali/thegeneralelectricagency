import useProductDescriptionKeyboardShortcut from "@screenComponent/quotations/hooks/product/useProductDescriptionKeyboardShortcut";
import useProductDirectoryKeyboardShortcut from "@screenComponent/quotations/hooks/product/useProductDirectoryKeyboardShortcut";
import useProductDiscountKeyboardShortcut from "@screenComponent/quotations/hooks/product/useProductDiscountKeyboardShortcut";
import useProductNameKeyboardShortcut from "@screenComponent/quotations/hooks/product/useProductNameKeyboardShortcut";
import useProductQuantityKeyboardShortcut from "@screenComponent/quotations/hooks/product/useProductQuantityKeyboardShortcut";
import useProductSaveKeyboardShortcut from "@screenComponent/quotations/hooks/product/useProductSaveKeyboardShortcut";
import useProductSellingPriceKeyboardShortcut from "@screenComponent/quotations/hooks/product/useProductSellingPriceKeyboardShortcut";

function useProductKeyboardShortcuts({
  productInputRef,
  quantityInputRef,
  sellingPriceInputRef,
  discountInputRef,
  descriptionInputRef,
  saveButtonRef,
  productDirectoryRef,
  hasProductSummary,
  onNavigateToCompanyInformation,
  onOpenProductSummary,
}) {
  const productNameKeyboard = useProductNameKeyboardShortcut({
    productDirectoryRef,
    quantityInputRef,
    hasProductSummary,
    onNavigateToCompanyInformation,
    onOpenProductSummary,
  });
  const handleQuantityKeyDown = useProductQuantityKeyboardShortcut({
    productInputRef,
    sellingPriceInputRef,
  });
  const handleSellingPriceKeyDown = useProductSellingPriceKeyboardShortcut({
    quantityInputRef,
    discountInputRef,
  });
  const handleDiscountKeyDown = useProductDiscountKeyboardShortcut({
    sellingPriceInputRef,
    descriptionInputRef,
  });
  const handleDescriptionKeyDown = useProductDescriptionKeyboardShortcut({
    discountInputRef,
    saveButtonRef,
  });
  const handleSaveKeyDown = useProductSaveKeyboardShortcut({
    descriptionInputRef,
    productInputRef,
  });
  const handleProductOptionKeyDown = useProductDirectoryKeyboardShortcut({
    productInputRef,
    productDirectoryRef,
  });

  return {
    ...productNameKeyboard,
    handleQuantityKeyDown,
    handleSellingPriceKeyDown,
    handleDiscountKeyDown,
    handleDescriptionKeyDown,
    handleSaveKeyDown,
    handleProductOptionKeyDown,
  };
}

export default useProductKeyboardShortcuts;
