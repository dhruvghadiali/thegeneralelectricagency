import {
  quotationProductDuplicateRequested,
  quotationProductInformationSaved,
  quotationProductInformationUpdated,
} from "@Redux/quotation/quotation.slice";
import { findDuplicateProductIndex } from "@Redux/quotation/product/quotationProduct.utils";

export const checkQuotationProductDuplicate =
  (candidate) => (dispatch, getState) => {
    const { editingProductIndex, productInformation } = getState().quotation;
    const duplicateProductIndex = findDuplicateProductIndex(
      productInformation,
      candidate,
      editingProductIndex,
    );

    if (duplicateProductIndex !== -1) {
      dispatch(quotationProductDuplicateRequested(duplicateProductIndex));
    }

    return duplicateProductIndex;
  };

export const saveQuotationProductInformation =
  (product) => (dispatch, getState) => {
    const { editingProductIndex, productInformation } = getState().quotation;
    const duplicateProductIndex = findDuplicateProductIndex(
      productInformation,
      product,
      editingProductIndex,
    );

    if (duplicateProductIndex !== -1) {
      dispatch(quotationProductDuplicateRequested(duplicateProductIndex));
      return { duplicateProductIndex, saved: false };
    }

    if (editingProductIndex === null) {
      dispatch(quotationProductInformationSaved(product));
    } else {
      dispatch(
        quotationProductInformationUpdated({
          index: editingProductIndex,
          product,
        }),
      );
    }

    return { duplicateProductIndex: -1, saved: true };
  };
