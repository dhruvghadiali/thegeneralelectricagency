import { getIn } from "formik";

import {
  COMPANY_CONTACT_REQUIRED_MESSAGE,
  createdRecordId,
  isSavedContact,
  mutationErrorMessage,
  SAVED_CONTACT_REQUIRED_MESSAGE,
} from "@Forms/company/companyDetails/companyDetails.helpers";
import { EMPTY_COMPANY_CONTACT } from "@Forms/company/companyDetails/companyDetails.initialValues";

const CONTACT_FIELDS = ["contactPersonName", "contactPersonMobileNumber", "contactPersonPosition"];
const contactPathFor = (addressIndex, contactIndex) =>
  `addresses[${addressIndex}].companyEmployees[${contactIndex}]`;

/** Owns adding, editing, saving, and deleting address contact persons. */
export function useCompanyContactOperations({
  formik,
  companyId,
  isEditing,
  onCreateContact,
  onUpdateContact,
  onDeleteContact,
  workflow,
}) {
  const { formState, changeFormState, setSaveError } = workflow;
  const { contactEdit } = formState;

  const hasUnsavedContact = formik.values.addresses.some((address) =>
    (address.companyEmployees ?? []).some((contact) => !contact.id),
  );

  const contactDeleteBlockReason = (addressIndex, contact) => {
    if (!isEditing) return null;
    const contacts = formik.values.addresses[addressIndex]?.companyEmployees ?? [];
    if (contacts.length <= 1) return COMPANY_CONTACT_REQUIRED_MESSAGE;
    if (!contact?.id) return null;
    const remainingSavedContacts =
      contacts.filter(isSavedContact).length - (isSavedContact(contact) ? 1 : 0);
    return remainingSavedContacts < 1 ? SAVED_CONTACT_REQUIRED_MESSAGE : null;
  };

  const validateContact = async (addressIndex, contactIndex) => {
    const contactPath = contactPathFor(addressIndex, contactIndex);
    const fields = CONTACT_FIELDS.map((field) => `${contactPath}.${field}`);
    const errors = await formik.validateForm();
    fields.forEach((field) => formik.setFieldTouched(field, true, false));
    return !fields.some((field) => getIn(errors, field));
  };

  const addContact = (addressIndex) => {
    const address = formik.values.addresses[addressIndex];
    if (isEditing && !address?.id) {
      setSaveError("Save the company address before adding a contact person.");
      return;
    }
    const contactsPath = `addresses[${addressIndex}].companyEmployees`;
    const contacts = getIn(formik.values, contactsPath) ?? [];
    formik.setFieldValue(contactsPath, [...contacts, { ...EMPTY_COMPANY_CONTACT }]);
  };

  const startContactEdit = (contact, addressIndex, contactIndex) => {
    changeFormState({
      saveError: null,
      contactEdit: {
        id: contact.id,
        addressIndex,
        contactIndex,
        snapshot: {
          contactPersonName: contact.contactPersonName,
          contactPersonMobileNumber: contact.contactPersonMobileNumber,
          contactPersonPosition: contact.contactPersonPosition,
        },
      },
    });
  };

  const cancelContactEdit = () => {
    if (!contactEdit) return;
    const contactPath = contactPathFor(contactEdit.addressIndex, contactEdit.contactIndex);
    Object.entries(contactEdit.snapshot).forEach(([field, value]) => {
      formik.setFieldValue(`${contactPath}.${field}`, value, false);
    });
    changeFormState({ contactEdit: null });
  };

  const saveContact = async (contact, addressIndex, contactIndex) => {
    if (!(await validateContact(addressIndex, contactIndex))) return;
    changeFormState({ saveError: null, updatingContactId: contact.id });
    try {
      await onUpdateContact(contact);
      changeFormState({ contactEdit: null });
    } catch (error) {
      setSaveError(mutationErrorMessage(error, "Unable to update the contact person."));
    } finally {
      changeFormState({ updatingContactId: null });
    }
  };

  const saveNewContact = async (contact, addressIndex, contactIndex) => {
    const address = formik.values.addresses[addressIndex];
    if (!address?.id) {
      setSaveError("Save the company address before adding a contact person.");
      return;
    }
    if (!companyId) {
      setSaveError("Company information is unavailable. Reopen the edit form.");
      return;
    }
    if (!(await validateContact(addressIndex, contactIndex))) return;

    const contactPath = contactPathFor(addressIndex, contactIndex);
    const creatingContactKey = `${addressIndex}-${contactIndex}`;
    changeFormState({ saveError: null, creatingContactKey });
    try {
      const createdContact = await onCreateContact(companyId, address.id, contact);
      const contactId = createdRecordId(createdContact, "contact");
      if (!contactId) {
        throw new Error("The contact was saved, but its identifier was not returned. Reload the company before editing it.");
      }
      await formik.setFieldValue(`${contactPath}.id`, contactId, false);
    } catch (error) {
      setSaveError(mutationErrorMessage(error, "Unable to add the contact person."));
    } finally {
      changeFormState({ creatingContactKey: null });
    }
  };

  const removeContact = async (addressIndex, contactIndex) => {
    const contactsPath = `addresses[${addressIndex}].companyEmployees`;
    const contacts = getIn(formik.values, contactsPath) ?? [];
    const contact = contacts[contactIndex];
    const blockedReason = contactDeleteBlockReason(addressIndex, contact);
    if (blockedReason) {
      setSaveError(blockedReason);
      return;
    }
    if (contact?.id) {
      changeFormState({ saveError: null, deletingContactId: contact.id });
      try {
        await onDeleteContact(contact.id);
      } catch (error) {
        setSaveError(mutationErrorMessage(error, "Unable to delete the contact person."));
        changeFormState({ deletingContactId: null });
        return;
      }
      changeFormState({ deletingContactId: null });
    }
    formik.setFieldValue(
      contactsPath,
      contacts.filter((_, index) => index !== contactIndex),
      true,
    );
  };

  return {
    hasUnsavedContact,
    contactDeleteBlockReason,
    addContact,
    startContactEdit,
    cancelContactEdit,
    saveContact,
    saveNewContact,
    removeContact,
  };
}

export default useCompanyContactOperations;
