import { useCallback, useState } from "react";

function useQuotationPdfDiscountDialog(onConfirm) {
  const [isOpen, setIsOpen] = useState(false);
  const requestDownload = useCallback(() => setIsOpen(true), []);
  const cancelDownload = useCallback(() => setIsOpen(false), []);
  const selectDiscountVisibility = useCallback(
    (showDiscountPercentage) => {
      setIsOpen(false);
      return onConfirm(showDiscountPercentage);
    },
    [onConfirm],
  );
  const downloadWithDiscount = useCallback(
    () => selectDiscountVisibility(true),
    [selectDiscountVisibility],
  );
  const downloadWithoutDiscount = useCallback(
    () => selectDiscountVisibility(false),
    [selectDiscountVisibility],
  );

  return {
    cancelDownload,
    downloadWithDiscount,
    downloadWithoutDiscount,
    isOpen,
    requestDownload,
  };
}

export default useQuotationPdfDiscountDialog;
