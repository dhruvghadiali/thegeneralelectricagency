import { getIn } from "formik";

import {
  createdRecordId,
  isSavedAddress,
  isSavedContact,
  mutationErrorMessage,
  SAVED_ADDRESS_REQUIRED_MESSAGE,
  SAVED_CONTACT_REQUIRED_MESSAGE,
} from "@Forms/company/companyDetails/companyDetails.helpers";
import {
  EMPTY_COMPANY_ADDRESS,
  EMPTY_COMPANY_CONTACT,
} from "@Forms/company/companyDetails/companyDetails.initialValues";

const ADDRESS_FIELDS = ["address", "pincode"];

/** Owns adding, editing, saving, and deleting company addresses. */
export function useCompanyAddressOperations({
  formik,
  companyId,
  isEditing,
  onCreateAddress,
  onUpdateAddress,
  onDeleteAddress,
  workflow,
}) {
  const { formState, changeFormState, setSaveError } = workflow;
  const { addressEdit } = formState;

  const hasUnsavedAddress = formik.values.addresses.some((address) => !address.id);

  const addressDeleteBlockReason = (address) => {
    if (!isEditing || !isSavedAddress(address)) return null;
    const savedAddresses = formik.values.addresses.filter(isSavedAddress);
    if (savedAddresses.length <= 1) return SAVED_ADDRESS_REQUIRED_MESSAGE;

    const savedContacts = formik.values.addresses
      .flatMap((item) => item.companyEmployees ?? [])
      .filter(isSavedContact);
    const addressContacts = (address.companyEmployees ?? []).filter(isSavedContact);
    return savedContacts.length - addressContacts.length < 1
      ? SAVED_CONTACT_REQUIRED_MESSAGE
      : null;
  };

  const validateAddress = async (addressIndex) => {
    const addressPath = `addresses[${addressIndex}]`;
    const fields = ADDRESS_FIELDS.map((field) => `${addressPath}.${field}`);
    const errors = await formik.validateForm();
    fields.forEach((field) => formik.setFieldTouched(field, true, false));
    return !fields.some((field) => getIn(errors, field));
  };

  const addAddress = () => {
    setSaveError(null);
    formik.setFieldValue("addresses", [
      ...formik.values.addresses,
      {
        ...EMPTY_COMPANY_ADDRESS,
        companyEmployees: isEditing ? [] : [{ ...EMPTY_COMPANY_CONTACT }],
      },
    ]);
  };

  const startAddressEdit = (address, addressIndex) => {
    changeFormState({
      saveError: null,
      addressEdit: {
        id: address.id,
        addressIndex,
        snapshot: { address: address.address, pincode: address.pincode },
      },
    });
  };

  const cancelAddressEdit = () => {
    if (!addressEdit) return;
    const addressPath = `addresses[${addressEdit.addressIndex}]`;
    Object.entries(addressEdit.snapshot).forEach(([field, value]) => {
      formik.setFieldValue(`${addressPath}.${field}`, value, false);
    });
    changeFormState({ addressEdit: null });
  };

  const saveAddress = async (address, addressIndex) => {
    if (!(await validateAddress(addressIndex))) return;
    changeFormState({ saveError: null, updatingAddressId: address.id });
    try {
      await onUpdateAddress(address);
      changeFormState({ addressEdit: null });
    } catch (error) {
      setSaveError(mutationErrorMessage(error, "Unable to update the company address."));
    } finally {
      changeFormState({ updatingAddressId: null });
    }
  };

  const saveNewAddress = async (address, addressIndex) => {
    if (!(await validateAddress(addressIndex))) return;
    const addressPath = `addresses[${addressIndex}]`;
    changeFormState({ saveError: null, creatingAddressIndex: addressIndex });
    try {
      const createdAddress = await onCreateAddress(companyId, address);
      const addressId = createdRecordId(createdAddress, "address");
      if (!addressId) {
        throw new Error("The address was saved, but its identifier was not returned. Reload the company before adding contacts.");
      }
      await formik.setFieldValue(`${addressPath}.id`, addressId, false);
    } catch (error) {
      setSaveError(mutationErrorMessage(error, "Unable to add the company address."));
    } finally {
      changeFormState({ creatingAddressIndex: null });
    }
  };

  const removeAddress = async (addressIndex) => {
    const address = formik.values.addresses[addressIndex];
    const blockedReason = addressDeleteBlockReason(address);
    if (blockedReason) {
      setSaveError(blockedReason);
      return;
    }
    if (address?.id) {
      changeFormState({ saveError: null, deletingAddressId: address.id });
      try {
        await onDeleteAddress(address.id);
      } catch (error) {
        setSaveError(mutationErrorMessage(error, "Unable to delete the company address."));
        changeFormState({ deletingAddressId: null });
        return;
      }
      changeFormState({ deletingAddressId: null });
    }
    formik.setFieldValue(
      "addresses",
      formik.values.addresses.filter((_, index) => index !== addressIndex),
      true,
    );
  };

  return {
    hasUnsavedAddress,
    addressDeleteBlockReason,
    addAddress,
    startAddressEdit,
    cancelAddressEdit,
    saveAddress,
    saveNewAddress,
    removeAddress,
  };
}

export default useCompanyAddressOperations;
