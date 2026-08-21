export const SAVED_ADDRESS_REQUIRED_MESSAGE =
  "At least one saved company address must remain.";
export const SAVED_CONTACT_REQUIRED_MESSAGE =
  "At least one saved company contact must remain for this address.";
export const COMPANY_CONTACT_REQUIRED_MESSAGE =
  "At least one company contact person must remain for this address.";

export function isSavedAddress(address) {
  return Boolean(address?.id);
}

export function isSavedContact(contact) {
  return Boolean(contact?.id && contact.contactPersonMobileNumber?.trim());
}

export function createdRecordId(response, type) {
  const nestedRecord =
    type === "address"
      ? (response?.company_address ?? response?.address)
      : (response?.company_contact ?? response?.contact);

  return (
    response?._id ??
    response?.id ??
    response?.[`${type}_id`] ??
    response?.[`company_${type}_id`] ??
    nestedRecord?._id ??
    nestedRecord?.id ??
    null
  );
}

export function mutationErrorMessage(error, fallback) {
  return typeof error === "string" ? error : (error?.message ?? fallback);
}
