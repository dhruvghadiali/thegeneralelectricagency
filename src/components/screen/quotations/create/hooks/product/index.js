import useProductDescriptionKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductDescriptionKeyboardShortcut";
import useProductDirectoryKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductDirectoryKeyboardShortcut";
import useProductDiscountKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductDiscountKeyboardShortcut";
import useProductNameKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductNameKeyboardShortcut";
import useProductQuantityKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductQuantityKeyboardShortcut";
import useProductSaveKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductSaveKeyboardShortcut";
import useProductSellingPriceKeyboardShortcut from "@screenComponent/quotations/create/hooks/product/useProductSellingPriceKeyboardShortcut";

function useProductKeyboardShortcuts({
  productInputRef,
  quantityInputRef,
  sellingPriceInputRef,
  discountInputRef,
  descriptionInputRef,
  saveButtonRef,
  productDirectoryRef,
}) {
  const productNameKeyboard = useProductNameKeyboardShortcut({
    productDirectoryRef,
    quantityInputRef,
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
