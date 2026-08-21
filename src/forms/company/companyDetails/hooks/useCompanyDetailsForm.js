import { useCompanyAddressOperations } from "@Forms/company/companyDetails/hooks/useCompanyAddressOperations";
import { useCompanyContactOperations } from "@Forms/company/companyDetails/hooks/useCompanyContactOperations";
import { useCompanyFormWorkflow } from "@Forms/company/companyDetails/hooks/useCompanyFormWorkflow";
import { useCompanyProfileForm } from "@Forms/company/companyDetails/hooks/useCompanyProfileForm";

/** Composes the focused hooks into the interface consumed by form components. */
export function useCompanyDetailsForm(props) {
  const { company, companyId, isEditing } = props;
  const resolvedCompanyId = company?.id ?? companyId;
  const workflow = useCompanyFormWorkflow();

  const profileForm = useCompanyProfileForm({
    company,
    isEditing,
    onSubmit: props.onSubmit,
    setSaveError: workflow.setSaveError,
  });

  const addressOperations = useCompanyAddressOperations({
    formik: profileForm.formik,
    companyId: resolvedCompanyId,
    isEditing,
    onCreateAddress: props.onCreateAddress,
    onUpdateAddress: props.onUpdateAddress,
    onDeleteAddress: props.onDeleteAddress,
    workflow,
  });

  const contactOperations = useCompanyContactOperations({
    formik: profileForm.formik,
    companyId: resolvedCompanyId,
    isEditing,
    onCreateContact: props.onCreateContact,
    onUpdateContact: props.onUpdateContact,
    onDeleteContact: props.onDeleteContact,
    workflow,
  });

  const workflowState = workflow.formState;
  const hasPendingRecordMutation =
    [
      workflowState.addressEdit,
      workflowState.contactEdit,
      workflowState.deletingAddressId,
      workflowState.deletingContactId,
      workflowState.updatingAddressId,
      workflowState.updatingContactId,
      workflowState.creatingContactKey,
    ].some(Boolean) || workflowState.creatingAddressIndex !== null;

  return {
    ...profileForm,
    ...workflowState,
    setSaveError: workflow.setSaveError,
    ...addressOperations,
    ...contactOperations,
    hasPendingRecordMutation,
  };
}

export default useCompanyDetailsForm;
